import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxFile } from './index'
import { util } from '../util'

/* ================================================================================
 * 文件上传组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxFileUpload extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            data: Immutable.fromJS(props.data),
            backgroundImages: Immutable.fromJS(props.backgroundImages),
            files: null,
            isDragenter: false,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({title: nextProps.title})
        this.setState({data: Immutable.fromJS(nextProps.data)})
        this.setState({backgroundImages: Immutable.fromJS(nextProps.backgroundImages)})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChange = !Immutable.is(nextState.data, this.state.data) 
        || !Immutable.is(nextState.backgroundImages, this.state.backgroundImages)
        || nextState.isDragenter != this.state.isDragenter
        || nextState.isValidate != this.state.isValidate
        
        return isChange
    }

    componentDidUpdate = (prevProps, prevState)=>{
    }

    componentDidMount = ()=>{
        this.fileUploadBox.addEventListener('dragenter', this.onDragenterHandler, false)
        this.fileUploadBox.addEventListener('dragover', this.onDragoverHandler, false)
        this.fileUploadBox.addEventListener('dragleave', this.onDragleaveHandler, false)
        this.fileUploadBox.addEventListener('drop', this.onDropHandler, false)
    }

    componentWillUnmount = ()=>{
        this.fileUploadBox.removeEventListener('dragenter', this.onDragenterHandler)
        this.fileUploadBox.removeEventListener('dragover', this.onDragoverHandler)
        this.fileUploadBox.removeEventListener('dragleave', this.onDragleaveHandler)
        this.fileUploadBox.removeEventListener('drop', this.onDropHandler)
    }

    getAcceptedFileTypes = ()=>{
        let types = Immutable.fromJS({
            "gif": "image/gif",
            "jpg": "image/jpeg",
            "png": "image/png",
            "bmp": "image/bmp",
            "wma": "audio/x-ms-wma",
            "aac": "audio/mp4",
            "mp3": "audio/mpeg",
            "acp": "audio/x-mei-aac",
            "mpeg": "video/mpg",
            "mp4": "video/mpeg4",
            "wmv": "video/x-ms-wmv",
            "ogg": "application/ogg",
        })

        let acceptedFileTypes = types.filter((v1,k1)=>{
            let isFound = false
                this.props.fileTypes.forEach( (v2,k2)=>{
                    if(k1 == v2){
                        isFound = true
                    }
                })
            return isFound
        })

        return acceptedFileTypes
    }

    fileCount = ()=>{
        let count =  this.state.files ? this.state.files.length : 0

        return count
    }

    checkeStatus = (files)=>{
        let acceptedFileTypes = this.getAcceptedFileTypes()
        let checkStatus = [true, true]

        for(let i = 0; i < files.length; i++){
            let fileData = files[i]
            let size = fileData.size
            let fileType = fileData.type

            //文件类型验证
            if(acceptedFileTypes.count() > 0){
                if(acceptedFileTypes.filter((v,k)=>{
                    return v == fileType
                }).count() == 0){
                    checkStatus[0] = false
                    break
                }
            }

            //文件大小验证
            if(this.props.minSize > 0 || this.props.maxSize > 0){
                if(this.props.minSize > 0){
                    if(size < this.props.minSize){
                        checkStatus[1] = false
                        break
                    }
                }

                if(this.props.maxSize > 0){
                    if(size > this.props.maxSize){
                        checkStatus[1] = false
                        break
                    }
                }
            }
        }

        return checkStatus
    }

    readBlob = (fileData)=>{
        let checkSize = 1 * 1024 * 1024
        let fileLoaded = 0
        let fileSize = fileData.size
        let fileReader = new FileReader()

        fileReader.onload = (e)=>{
            fileLoaded += e.total
            let percent = fileLoaded / fileSize
            if(percent < 1)  {
                this.readChunk(fileReader, fileData, fileLoaded, fileLoaded + checkSize + 1)
            } else {
                percent = 1
            }
        }

        this.readChunk(fileReader, fileData, 0, checkSize)
    }

    readChunk = (fileReader, fileData, start, end)=>{
        let blob
        if(fileData.webkitSlice) {
            blob = fileData.webkitSlice(start, end + 1)
        } else if(fileData.mozSlice) {
            blob = fileData.mozSlice(start, end + 1)
        } else if(fileData.slice) {
            blob = fileData.slice(start, end + 1)
        }
        fileReader.readAsBinaryString(blob)
    }

    paste = (callback, formData)=>{
        var theThis = this;
        /*this.element.addEventListener('paste', function (e) {//处理目标容器（id）的paste事件
            if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) {
                var that = this,
                fileReader =  new FileReader();
                file = e.clipboardData.items[0].getAsFile();//读取e.clipboardData中的数据：Blob对象

                fileReader.onload = function (e) { //fileReader读取完成后，xhr上传
                    var xhr = new XMLHttpRequest(),
                    fd = formData || (new FormData());;
                    xhr.open('POST', theThis.url, true);
                    xhr.onload = function () {
                        callback.call(that, xhr);
                    }
                    fd.append(theThis.imgKey, this.result); // this.result得到图片的base64
                    xhr.send(fd);
                }
                fileReader.readAsDataURL(file);//获取base64编码
            }
        }, false);*/
    }

    upload = ()=>{
        let totalCount = this.state.files.length
        for(let i = 0; i < totalCount; i++){
            this.uploadFile(i, this.state.files[i], totalCount)
        }
    }

    uploadFiles = (files)=>{
        if(this.props.isAutoUpload){
            let totalCount = files.length
            for(let i = 0; i < totalCount; i++){
                this.uploadFile(i, files[i], totalCount)
            }
        }

        this.setState({files: files})
    }

    uploadFile = (index, fileData, totalCount)=>{
        var formData = new FormData()
        formData.append("file", fileData)

        //append form field
        if(this.state.data){
            let data = this.state.data.toJS()
            let propertys = Object.getOwnPropertyNames(data)
            for(let index in propertys){
                formData.append(propertys[index], data[propertys[index]])
            }
        }

        util.request({
            method: "POST",
            url: this.props.url,
            data: formData,
            progress: this.onProgress,
            is_process_data: false,
            content_type: false
        }).done((result)=>{
            this.onFinished({
                index: index,
                count: totalCount,
                result: result
            })
        }).fail((result)=>{
            this.onError({
                index: index,
                count: totalCount,
                result: result
            })
        })
    }

    onDragenterHandler = (e)=>{
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            e.dataTransfer.dropEffect = "copy"
            this.setState({isDragenter: true})
        }
    }

    onDragoverHandler = (e)=>{
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            e.dataTransfer.dropEffect = "copy"
        }
    }

    onDragleaveHandler = (e)=>{
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            this.setState({isDragenter: false})
        }
    }

    onDropHandler = (e)=>{
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            this.setState({isDragenter: false})

            var files = e.dataTransfer.files
            if(files.length > 0){
                let checkStatus = this.checkeStatus(files)
                if(!checkStatus[0]){
                    alert("file type error")
                }else if(!checkStatus[1]){
                    alert("fie size error")
                }else{
                    this.uploadFiles(files)
                }
            }
        }
    }

    onBrowser = ()=>{
        if(this.props.onBrowser){
            if(this.props.onBrowser()){
                if(this.state.isValidate){
                    //this.setState({isValidate: false})
                    return true
                }
            }
        }else{
            if(this.state.isValidate){
                //this.setState({isValidate: false})
                return true
            }
        }
        return false
    }

    onSelected = (files)=>{
        return true
    }

    onFile = (files)=>{
        this.uploadFiles(files)   
    }

    onProgress = (e)=>{
        let value = 0
        if(e.lengthComputable) {
            value = Math.round( (e.loaded / e.total) * 100 )
        }

        if(this.props.onProgress){
            this.props.onProgress(value)
        }
    }

    onFinished = (data)=>{
        if(this.props.onFinished){
            this.props.onFinished(data)
        }

        this.setState({files: null , isValidate: true})
    }

    onError = (data)=>{
        if(this.props.onError){
            this.props.onError(data)
        }

        this.setState({files: null , isValidate: true})
    }

    render = ()=>{
        let { className } = this.props

        let boxClass = classNames({
            "sx-file-uplaod": true,
            "sx-file-uplaod-dragenter": this.state.isDragenter,
        })

        if(className){
            boxClass = boxClass + " " + className
        }

        return <div ref = { (fileUploadBox)=>this.fileUploadBox = fileUploadBox } className = { boxClass }>
            {
                this.state.isDragenter ?
                <span>松开即可上传</span>
                :
                <SxFile ref = { (file)=>{this.file = file} }
                title = { this.state.title }
                fileTypes = { this.props.fileTypes }
                backgroundImages = { this.state.backgroundImages.toJS() }
                isMultiple = { this.props.isMultiple }
                isValidate = { this.state.isValidate }
                onBrowser = { ()=>this.onBrowser() }
                onSelected = { (files)=>this.onSelected(files) }
                onPreview = { (files)=>this.props.onPreview(files) }
                onFile = { (files)=>this.onFile(files) } >
                {
                    this.props.children
                }
                </SxFile>
            }
        </div>
    }
}

SxFileUpload.propTypes = {
    title: React.PropTypes.string,
    fileTypes: React.PropTypes.array,
    minSize: React.PropTypes.number,
    maxSize: React.PropTypes.number,
    url: React.PropTypes.string,
    data: React.PropTypes.object,
    backgroundImages: React.PropTypes.array,
    isMultiple: React.PropTypes.bool,
    isAutoUpload: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    onBrowser: React.PropTypes.func,
    onPreview: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onProgress: React.PropTypes.func,
    onFinished: React.PropTypes.func
};

SxFileUpload.defaultProps = {
    title: "",
    data: null,
    fileTypes: ["jpg","png"],
    backgroundImages: [],
    minSize: 0,
    maxSize: 0,
    url: "",
    isMultiple: false,
    isAutoUpload: true,
    isValidate: true,
    onBrowser: null,
    onPreview: null,
    onSelected: null,
    onProgress: null,
    onFinished: null
};

export default SxFileUpload
