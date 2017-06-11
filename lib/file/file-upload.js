import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxFile } from './index'
import { utils } from '../util'


/* ================================================================================
 * 文件上传组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
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
            onSelected: React.PropTypes.func,
            onPreview: React.PropTypes.func,
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
            fileTypes: Immutable.fromJS(this.props.fileTypes),
            minSize: this.props.minSize,
            maxSize: this.props.maxSize,
            files: null,
            isDragenter: false,
            isMultiple: this.props.isMultiple,
            isValidate: this.props.isValidate
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({data: Immutable.fromJS(nextProps.data)})
        this.setState({fileTypes: Immutable.fromJS(nextProps.fileTypes)})
        this.setState({minSize: nextProps.minSize})
        this.setState({maxSize: nextProps.maxSize})
        this.setState({isMultiple: nextProps.isMultiple})
        this.setState({isValidate: nextProps.isValidate})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.fileTypes, this.state.fileTypes)
        || !Immutable.is(nextState.data, this.state.data)
        || nextState.minSize != this.state.minSize
        || nextState.maxSize != this.state.maxSize
        || nextState.isDragenter != this.state.isDragenter
        || nextState.isMultiple != this.state.isMultiple
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

    fileCount: function(){
        let count =  this.state.files ? this.state.files.length : 0
        return count
    },

    checkeStatus: function(files){
        let checkStatus = [true, true]
        for(let i=0; i< files.length; i++){
            let file = files[i]
            let size = file.size
            let type = file.type.split('/')[1]

            if(this.state.fileTypes.length > 0){
                if(this.state.fileTypes.filter((v,k)=>{
                    return v == type
                }).count() == 0){
                    checkStatus[0] = false
                    break
                }
            }

            if(this.state.minSize >0 || this.state.maxSize > 0){
                if(this.state.minSize > 0){
                    if(size < this.state.minSize){
                        checkStatus[1] = false
                        break
                    }
                }

                if(this.state.maxSize > 0){
                    if(size > this.state.maxSize){
                        checkStatus[1] = false
                        break
                    }
                }
            }
        }

        return checkStatus
    },

    readBlob: function(file){
        let checkSize = 1 * 1024 * 1024
        let fileLoaded = 0
        let fileSize = file.size
        let reader = new FileReader()

        reader.onload = (e)=>{
            fileLoaded += e.total
            let percent = fileLoaded / fileSize
            if(percent < 1)  {
                this.readChunk(reader, file, fileLoaded, fileLoaded + checkSize + 1)
            } else {
                percent = 1
            }
        }

        this.readChunk(reader, file, 0, checkSize)
    },

    readChunk: function(reader, file, start, end) {
        let blob
        if(file.webkitSlice) {
            blob = file.webkitSlice(start, end + 1)
        } else if(file.mozSlice) {
            blob = file.mozSlice(start, end + 1)
        } else if(file.slice) {
            blob = file.slice(start, end + 1)
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
        for(let i=0; i< totalCount; i++){
            this.uploadFile(i, this.state.files[i], totalCount)
        }
    },

    uploadFiles: function(files){
        this.previewFiles(files)
        if(this.props.isAutoUpload){
            let totalCount = files.length
            for(let i=0; i< totalCount; i++){
                this.uploadFile(i, files[i], totalCount)
            }
        }

        this.setState({files: files})
    },

    uploadFile: function(index, file, totalCount){
        var formData = new FormData()
        formData.append("file", file)
        let data = this.state.data.toJS()
        if(data){
            let propertys = Object.getOwnPropertyNames(data)
            for(let index in propertys){
                formData.append(propertys[index], data[propertys[index]])
            }
        }

        utils.request({
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
        })
    },

    previewFiles: function(files){
        for(let i=0; i< files.length; i++){
            let file = files[i]

            var reader = new FileReader()
            reader.onload = ()=>{
                if(this.props.onPreview){
                    this.props.onPreview(reader.result)
                }
            }
            if(file.type.indexOf("image") > 0){
                reader.readAsDataURL(file)
            }else if(file.type.indexOf("text") > 0){
                reader.readAsText(file)
            }
        }
    },

    onDragenterHandler: function(e){
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            e.dataTransfer.dropEffect = 'copy'
            this.setState({isDragenter: true})
        }
    },

    onDragoverHandler: function(e){
        e.stopPropagation()
        e.preventDefault()

        if(this.state.isValidate){
            e.dataTransfer.dropEffect = 'copy'
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

    onFile: function(files){
        //验证文件大小和类型
        let checkStatus = this.checkeStatus(files)
        if(!checkStatus[0]){
            alert("文件类型不符合要求")
        }else if(!checkStatus[1]){
            alert("文件大小不符合要求")
        }else{
            if(this.props.onSelected){
                if(this.props.onSelected(files)){
                    this.uploadFiles(files)
                }
            }else{
                this.uploadFiles(files)
            }
        }        
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

    getCssClass: function(){
        let cssClass = classNames({
            "sx-file-uplaod": true,
            "sx-file-uplaod-dragenter": this.state.isDragenter,
        })
        return cssClass
    },

    render: function() {
        let cssClass = this.getCssClass()

        return <div ref = "fileUploadBox" className = { cssClass }>
                {
                    this.state.isDragenter
                    ?
                    <span>松开即可上传</span>
                    :
                    <SxFile
                    title = { this.state.title }
                    fileTypes = { this.state.fileTypes.toJS() }
                    backgroundImages = { this.props.backgroundImages }
                    isMultiple = { this.state.isMultiple }
                    isValidate = { this.state.isValidate }
                    onBrowser = { this.onBrowser }
                    onFile = { this.onFile }/>
                }

        </div>
    }
})

export default SxFileUpload
