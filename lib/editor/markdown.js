import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import {SxBox} from '../box'


/* ================================================================================
 * 单行输入框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
class SxMarkdown extends Component{
    constructor(props, context) {
        super(props, context)

        this.editor = null

        this.state = {
            value: props.value,
            height: props.height,
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value})
        this.setState({height: nextProps.height})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = nextState.value != this.state.value
        || nextState.height != this.state.height
        || nextState.isActive != this.state.isActive

        return isChanged
    }

    componentWillMount(){
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState){
        this.setContent(this.state.value)
    }

    componentDidMount(){
        if(!this.editor){
            this.getEditor()
        }
    }

    getContent(){
        let content = ""
        if(this.editor){
            content = this.editor.getMarkdown()
        }
        return content
    }

    setContent(content){
        if(this.editor){
            this.editor.setMarkdown(content)
        }
    }

    getHtml(){
        let content = ""
        if(this.editor){
            content = editormd.$marked(this.editor.getMarkdown())
        }
        return content
    }

    setUploadData(data){
        if(this.editor){
            this.editor.setUploadData(data)
        }
    }

    setFocus(){
        if(this.editor){
            this.editor.focus()
        }
    }

    setHide(){
        if(this.editor){
            this.editor.hide()
        }
    }

    setShow(){
        if(this.editor){
            this.editor.show()
        }
    }

    getEditor(){
        let theThis = this

        $.getScript("/static/js/md/md.js", function() {   
            editormd("sx-markdown", {
                height: theThis.state.height,
                markdown: theThis.state.value,
                placeholder: theThis.props.placeholder,
                lineNumbers: false,
                emoji: true,
                watch: false,
                onload : function(){
                    this.config({
                        lang:{
                            name:"zh-cn"
                        },
                        theme : "default",
                        previewTheme : "dark",
                        editorTheme : "default",
                        disabledKeyMaps : ["Ctrl-B", "F11", "F10"],
                        imageUploadURL : theThis.props.upload.url,
                        imageFormats : theThis.props.upload.formats,
                        imageUpload : theThis.props.upload.isEnabled,
                        toolbarIcons : function() {
                            return ["fullscreen", "|", "bold", "italic", "del", "hr", "|", "link", "table", "image", "emoji", "|", "quote", "code", "code-block", "||", "preview", "publish"]
                        },
                        onpreviewing : function() {

                        },
                        onpreviewed : function() {

                        },
                        onresize: function() {

                        }
                    })

                    this.addKeyMap({
                        "Ctrl-S": function(cm) {
                            alert("Ctrl+S");
                        },
                        "Ctrl-A": function(cm) {
                            alert("Ctrl+A");
                            cm.execCommand("selectAll");
                        }
                    })

                    //设置内容
                    this.setMarkdown(theThis.state.value)

                    //设置文件上传参数
                    if(theThis.props.upload && theThis.props.upload.data){
                        this.setUploadData(theThis.props.upload.data)
                    }

                    this.gotoLine(0)

                    theThis.editor = this
                }
            })
        })
    }

    getValue(){
        return this.state.value
    }

    setValue(value){
        this.setState({value: value})
    }

    onMouseOver(e){     
        this.setState({isActive: true})
    }

    onMouseOut(e){
        this.setState({isActive: false})
    }

    render() {
        let info = this.props.title

        let title = info == "" ? "" : <span dangerouslySetInnerHTML = {{__html: info}} className = "sx-title" onClick = { this.onMouseOver } />
        if( this.props.isRequire && info != "" ){
            info += "<i>*</i>"
            title = <p dangerouslySetInnerHTML = {{__html: info}} className = "sx-title" onClick = { this.onMouseOver } />
        }

        return <div className="sx-box sx-box-c sx-box-rsb ">
            <div className = "sx-box sx-box-c sx-box-css sx-box-w sx-markdown">
                { title }
                <div id = "sx-markdown"></div>
                { this.props.children }
            </div>
        </div>
    }
}

SxMarkdown.propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    height: React.PropTypes.number
}

SxMarkdown.defaultProps = {
    title: "",
    value: "",
    placeholder: "",
    height: 320,
    upload: {
        url: "",
        formats: ["jpg", "jpeg", "png"],
        data: null,
        isEnabled: true   
    }
}

export default SxMarkdown
