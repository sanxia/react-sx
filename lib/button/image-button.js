import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'


/* ================================================================================
 * 图片按钮组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxImageButton = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            tag: React.PropTypes.string,
            images: React.PropTypes.array,
            isChecked: React.PropTypes.bool,
            space: React.PropTypes.string,
            isValidate: React.PropTypes.bool,
            onButton: React.PropTypes.func
        }
    },

    getDefaultProps: function() {
        return{
            title: "",
            tag: "",
            images: [],
            space: "",
            isChecked: false,
            isValidate: false,
            onButton: null
        }
    },

    getInitialState: function() {
        return {
            title: this.props.title,
            tag: this.props.tag,
            isActive: false,
            isChecked: this.props.isChecked,
            isValidate: this.props.isValidate
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({tag: nextProps.tag})
        this.setState({isChecked: nextProps.isChecked})
        this.setState({isValidate: nextProps.isValidate})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = nextState.title != this.state.title
        || nextState.tag != this.state.tag
        || nextState.isChecked != this.state.isChecked
        || nextState.isActive != this.state.isActive
        || nextState.isValidate != this.state.isValidate
        return isChange
    },

    componentDidUpdate: function(prevProps, prevState){
        this.onValidate(this.state.isValidate)
    },

    getTitle: function(){
        return this.state.title
    },

    setTitle: function(newTitle){
        this.setState({title: newTitle})
    },

    getTag: function(){
        return this.state.tag
    },

    setTag: function(newTag){
        this.setState({tag: newTag})
    },

    setValidate: function(isValidate){
        this.setState( { isValidate: isValidate } )
    },

    isChecked: function(){
        return this.state.isChecked
    },

    setChecked: function(isChecked){
        this.setState({isChecked: isChecked})
    },

    getCssClass: function(){
        let type = this.props.type
        let cssClass = classNames({
            "sx-imgbtn": true,
            "sx-imgbtn-active": this.state.isActive,
            "sx-imgbtn-invalid": !this.state.isValidate,
        })

        let space = this.props.space
        if(space != ""){
            cssClass = cssClass + " sx-space-"+space
        }

        return cssClass
    },

    getImageUrl: function(){
        // 0: valid | 1: active | 2: selected | 3: invalid
        let images = this.props.images
        let imagesCount = images.length
        if(imagesCount == 0){
            return ""
        }

        //必须四个image元素
        while(images.length != 4){
            images.push(images[0])
        }

        //当前的icon
        let imageUrl = images[0]
        if(this.state.isValidate){
            if(this.state.isActive){
                imageUrl = images[1]
            }else{
                if(this.state.isChecked){
                    imageUrl = images[2]
                }
            }
        }else{
            imageUrl = images[3]
        }

        return imageUrl
    },

    onMouseOver: function(){
        if(this.state.isValidate){
            this.setState({isActive: true})
        }
    },

    onMouseOut: function(){
        if(this.state.isValidate){
            this.setState({isActive: false})
        }
    },

    onValidate: function(isValidate) {        
        if(this.props.onValidate){
            this.props.onValidate(isValidate)
        }

        return isValidate
    },

    onImageClick: function(){
        if(!this.state.isValidate){
            return
        }

        if(this.props.onButton){
            if(this.props.onButton({tag: this.state.tag, isChecked: !this.state.isChecked })){
                this.setState({isChecked: !this.state.isChecked})
            }
        }else{
            this.setState({isChecked: !this.state.isChecked})
        }
        this.onMouseOut()
    },

    render: function() {
        let cssClass = this.getCssClass()
        let url = this.getImageUrl()
        return <p className = { cssClass } >
                <img src = { url }
                title = { this.state.title }
                alt = { this.state.title }
                onMouseOver = { this.onMouseOver } 
                onMouseOut = { this.onMouseOut }
                onClick = { this.onImageClick } />
        </p>
    }
})

export default SxImageButton
