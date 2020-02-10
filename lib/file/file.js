import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImageButton } from '../button/index'

/* ================================================================================
 * 文件组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxFile extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            backgroundImages: Immutable.fromJS(props.backgroundImages),
            isValidate: props.isValidate,
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({title: nextProps.title})
        this.setState({backgroundImages: Immutable.fromJS(nextProps.backgroundImages)})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChange = nextState.title != this.state.title
        || !Immutable.is(nextState.backgroundImages, this.state.backgroundImages)
        || nextState.isValidate != this.state.isValidate
        
        return isChange
    }

    componentDidUpdate = (prevProps, prevState)=>{
    }

    getAcceptedFileTypes = (fileTypeCodes)=>{
        let fileTypes = Immutable.fromJS({
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

        fileTypeCodes = Immutable.fromJS(fileTypeCodes)

        let acceptedFileTypes = fileTypes.filter((v1,k1)=>{
            let isFound = false
                fileTypeCodes.forEach( (v2,k2)=>{
                    if(k1 == v2){
                        isFound = true
                    }
                })
            return isFound
        })

        return acceptedFileTypes
    }

    checkeStatus = (files)=>{
        let acceptedFileTypes = this.getAcceptedFileTypes(this.props.fileTypes)
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

    onBrowser = ()=>{
        if(this.props.onBrowser){
            if(this.props.onBrowser()){
                this.file.click()
            }
        }else{
            this.file.click()
        }
    }

    onPreview = (files)=>{
        //可以预览图片和文本文件
        for(let i = 0; i< files.length; i++){
            let fileData = files[i]
            let fileReader = new FileReader()

            fileReader.onload = ()=>{
                if(this.props.onPreview){
                    this.props.onPreview(fileReader.result)
                }
            }

            if(fileData.type.indexOf("image") > 0){
                fileReader.readAsDataURL(fileData)
            }else if(fileData.type.indexOf("text") > 0){
                fileReader.readAsText(fileData)
            }
        }
    }

    onFileChange = (e)=>{
        let files = this.file.files
        
        let checkStatus = this.checkeStatus(files)
        if(!checkStatus[0]){
            alert("file type error")
        }else if(!checkStatus[1]){
            alert("file size error")
        }else{
            if(this.props.onSelected){
                if(this.props.onSelected(files)){
                    this.onPreview(files)

                    if(this.props.onFile){
                        this.props.onFile(files)
                    }
                }
            }else{
                this.onPreview(files)
                
                if(this.props.onFile){
                    this.props.onFile(files)
                }
            } 
        }
    }

    render = ()=>{
        let accept = this.getAcceptedFileTypes(this.props.fileTypes).join(",")

        return <div className = "sx-file" >
                <SxImageButton
                title = { this.state.title }
                images = { this.state.backgroundImages.toJS() }
                isValidate = { this.state.isValidate }
                onButton = { ()=>this.onBrowser() } />

                { this.props.children }

                {
                    this.props.isMultiple ?
                    <input ref = { (file)=>this.file=file } type = "file" accept = { accept } multiple className = "sx-file-input" onChange = { (e)=>this.onFileChange(e) } />
                    :
                    <input ref = { (file)=>this.file=file } type = "file" accept = { accept } className = "sx-file-input" onChange = { (e)=>this.onFileChange(e) } />
                }
        </div>
    }
}

SxFile.propTypes = {
    title: React.PropTypes.string,
    fileTypes: React.PropTypes.array,
    minSize: React.PropTypes.number,
    maxSize: React.PropTypes.number,
    backgroundImages: React.PropTypes.array,
    isMultiple: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    onBrowser: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onPreview: React.PropTypes.func,
    onFile: React.PropTypes.func
};

SxFile.defaultProps = {
    title: "",
    fileTypes: ["jpg","png"],
    minSize: 0,
    maxSize: 0,
    backgroundImages: ["/static/img/upload-photo.png"],
    isMultiple: false,
    isValidate: true,
    onBrowser: null,
    onSelected: null,
    onFile: null
};

export default SxFile
