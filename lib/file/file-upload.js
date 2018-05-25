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
var SxFileUpload = React.createClass({
    propTypes: function(){
        return {
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
        }
    },

    getDefaultProps: function() {
        return{
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
        }
    },

    getInitialState: function() {
        return {
            title: this.props.title,
            data: Immutable.fromJS(this.props.data),
            backgroundImages: Immutable.fromJS(this.props.backgroundImages),
            files: null,
            isDragenter: false,
            isValidate: this.props.isValidate
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({data: Immutable.fromJS(nextProps.data)})
        this.setState({backgroundImages: Immutable.fromJS(nextProps.backgroundImages)})
        this.setState({isValidate: nextProps.isValidate})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.data, this.state.data) 
        || !Immutable.is(nextState.backgroundImages, this.state.backgroundImages)
        || nextState.isDragenter != this.state.isDragenter
        || nextState.isValidate != this.state.isValidate
        return isChange
    },

    componentDidUpdate: function(prevProps, prevState){
    },

    componentDidMount: function(){
        this.refs.fileUploadBox.addEventListener('dragenter', this.onDragenterHandler, false)
        this.refs.fileUploadBox.addEventListener('dragover', this.onDragoverHandler, false)
        this.refs.fileUploadBox.addEventListener('dragleave', this.onDragleaveHandler, false)
        this.refs.fileUploadBox.addEventListener('drop', this.onDropHandler, false)
    },

    componentWillUnmount: function(){
        this.refs.fileUploadBox.removeEventListener('dragenter', this.onDragenterHandler)
        this.refs.fileUploadBox.removeEventListener('dragover', this.onDragoverHandler)
        this.refs.fileUploadBox.removeEventListener('dragleave', this.onDragleaveHandler)
        this.refs.fileUploadBox.removeEventListener('drop', this.onDropHandler)
    },

    getAccetpedFileTypes: function(){
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
    },

    fileCount: function(){
        let count =  this.state.files ? this.state.files.length : 0
        return count
    },

    checkeStatus: function(files){
        let acceptedFileTypes = this.getAccetpedFileTypes()
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
    },

    readBlob: function(fileData){
        let checkSize = 1 * 1024 * 1024
        let fileLoaded = 0
        let fileSize = fileData.size
        let reader = new FileReader()

        reader.onload = (e)=>{
            fileLoaded += e.total
            let percent = fileLoaded / fileSize
            if(percent < 1)  {
                this.readChunk(reader, fileData, fileLoaded, fileLoaded + checkSize + 1)
            } else {
                percent = 1
            }
        }

        this.readChunk(reader, fileData, 0, checkSize)
    },

    readChunk: function(reader, fileData, start, end) {
        let blob
        if(fileData.webkitSlice) {
            blob = fileData.webkitSlice(start, end + 1)
        } else if(fileData.mozSlice) {
            blob = fileData.mozSlice(start, end + 1)
        } else if(fileData.slice) {
            blob = fileData.slice(start, end + 1)
        }
        reader.readAsBinaryString(blob)
    },

    paste: function (callback, formData) {
        var thatthat = this;
        /*this.element.addEventListener('paste', function (e) {//处理目标容器（id）的paste事件
            if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) {
                var that = this,
                reader =  new FileReader();
                file = e.clipboardData.items[0].getAsFile();//读取e.clipboardData中的数据：Blob对象

                reader.onload = function (e) { //reader读取完成后，xhr上传
                    var xhr = new XMLHttpRequest(),
                    fd = formData || (new FormData());;
                    xhr.open('POST', thatthat.url, true);
                    xhr.onload = function () {
                        callback.call(that, xhr);
                    }
                    fd.append(thatthat.imgKey, this.result); // this.result得到图片的base64
                    xhr.send(fd);
                }
                reader.readAsDataURL(file);//获取base64编码
            }
        }, false);*/
    },

    upload: function(){
        let totalCount = this.state.files.length
        for(let i = 0; i < totalCount; i++){
            this.uploadFile(i, this.state.files[i], totalCount)
        }
    },

    uploadFiles: function(files){
        if(this.props.isAutoUpload){
            let totalCount = files.length
            for(let i = 0; i < totalCount; i++){
                this.uploadFile(i, files[i], totalCount)
            }
        }

        this.setState({files: files})
    },

    uploadFile: function(index, fileData, totalCount){
        var formData = new FormData()
        formData.append("file", fileData)

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
    },

    onDragenterHandler: function(e){
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            e.dataTransfer.dropEffect = "copy"
            this.setState({isDragenter: true})
        }
    },

    onDragoverHandler: function(e){
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            e.dataTransfer.dropEffect = "copy"
        }
    },

    onDragleaveHandler: function(e){
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            this.setState({isDragenter: false})
        }
    },

    onDropHandler: function(e){
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            this.setState({isDragenter: false})

            var files = e.dataTransfer.files
            if(files.length > 0){
                let checkStatus = this.checkeStatus(files)
                if(!checkStatus[0]){
                    alert("文件类型不符合要求")
                }else if(!checkStatus[1]){
                    alert("文件大小不符合要求")
                }else{
                    this.uploadFiles(files)
                }
            }
        }
    },

    onBrowser: function(){
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
    },

    onSelected: function(files){
        return true
    },

    onFile: function(files){
        this.uploadFiles(files)   
    },

    onProgress: function(e) {
        let value = 0
        if(e.lengthComputable) {
            value = Math.round( (e.loaded / e.total) * 100 )
        }

        if(this.props.onProgress){
            this.props.onProgress(value)
        }
    },

    onFinished: function(data){
        if(this.props.onFinished){
            this.props.onFinished(data)
        }

        this.setState({files: null , isValidate: true})
    },

    onError: function(data){
        if(this.props.onError){
            this.props.onError(data)
        }

        this.setState({files: null , isValidate: true})
    },

    getCssClass: function(){
        let cssClass = classNames({
            "sx-file-uplaod": true,
            "sx-file-uplaod-dragenter": this.state.isDragenter,
        })
        return cssClass
    },

    render: function() {
        let { className } = this.props
        let cssClass = this.getCssClass()
        if(className){
            cssClass = cssClass + " " + className
        }

        return <div ref = "fileUploadBox" className = { cssClass }>
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
                onPreview = { this.props.onPreview }
                onFile = { (files)=>this.onFile(files) } >
                {
                    this.props.children
                }
                </SxFile>
            }
        </div>
    }
})

export default SxFileUpload
