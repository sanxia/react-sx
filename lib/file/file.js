import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImageButton } from '../button/index'


/* ================================================================================
 * 文件组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxFile = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            fileTypes: React.PropTypes.array,
            backgroundImages: React.PropTypes.array,
            isMultiple: React.PropTypes.bool,
            isValidate: React.PropTypes.bool,
            onBrowser: React.PropTypes.func,
            onFile: React.PropTypes.func
        }
    },

    getDefaultProps: function() {
        return{
            title: "",
            fileTypes: ["jpg","png"],
            backgroundImages: ["/static/img/upload-photo.png"],
            isMultiple: false,
            isValidate: true,
            onBrowser: null,
            onFile: null
        }
    },

    getInitialState: function() {
        return {
            title: this.props.title,
            fileTypes: Immutable.fromJS(this.props.fileTypes),
            isMultiple: this.props.isMultiple,
            isValidate: this.props.isValidate,
            onBrowser: this.props.onBrowser,
            onFile: this.props.onFile
        }
    },

    getFileTypes: function(){
        let types = {
            "gif": "image/gif",
            "jpg": "image/jpeg",
            "png": "image/png",
            "bmp": "image/bmp",
            "wma": "audio/x-ms-wma",
            "aac": "audio/mp4",
            "mp3": "audio/mp3",
            "acp":"audio/x-mei-aac",
            "mpeg": "video/mpg",
            "mp4": "video/mpeg4",
            "wmv": "video/x-ms-wmv",
            "ogg": "application/ogg",
        }
        let accepts = []
        this.state.fileTypes.forEach((k,v)=>{
            let type = types[k]
            if(type != undefined){
                accepts.push(type)
            }else{
                accepts.push(k)
            }
        })
        return accepts.join(",")
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({fileTypes: Immutable.fromJS(nextProps.fileTypes)})
        this.setState({isMultiple: nextProps.isMultiple})
        this.setState({isValidate: nextProps.isValidate})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.fileTypes, this.state.fileTypes)
        || nextState.isMultiple != this.state.isMultiple
        || nextState.isValidate != this.state.isValidate
        return isChange
    },

    componentDidUpdate: function(prevProps, prevState){
    },

    onFile: function(e){
        let files = this.file.files
        if(this.props.onFile){
            this.props.onFile(files)
        }
    },

    onBrowser: function(){
        if(this.props.onBrowser){
            if(this.props.onBrowser()){
                this.file.click()
            }
        }else{
            this.file.click()
        }
    },

    render: function() {
        let accept = this.getFileTypes()
        return <div className = "sx-file" >
                <SxImageButton className = "sx-file-image"
                title = { this.state.title }
                images = { this.props.backgroundImages }
                isValidate = { this.state.isValidate }
                onButton = { this.onBrowser } />

                {
                    this.state.isMultiple ?
                    <input ref = { (file) => {this.file = file}} type = "file" accept = { accept } multiple className="sx-file-input" onChange = { this.onFile } />
                    :
                    <input ref = { (file) => {this.file = file}} type = "file" accept = { accept } className="sx-file-input" onChange = { this.onFile } />

                }
        </div>
    }
})

export default SxFile
