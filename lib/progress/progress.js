import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxBox } from '../box/index'
import { SxImageButton } from '../button/index'


/* ================================================================================
 * 文件组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxProgress = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            value: React.PropTypes.number,
            option:{
                width: React.PropTypes.number,
                height: React.PropTypes.number,
                padding: React.PropTypes.number,
                thumbWidth: React.PropTypes.number,
                thumbHeight: React.PropTypes.number,
                colors: React.PropTypes.array,
                borderColor: React.PropTypes.string,
                backgroundColor: React.PropTypes.string,
                isDrag: React.PropTypes.bool,
                isHorizontal: React.PropTypes.bool,
            },
            isHide: React.PropTypes.bool,
            onChange: React.PropTypes.func,
        }
    },

    getDefaultProps: function() {
        return{
            title: "",
            value: 0,
            option: {
                width: 100,
                height: 4,
                padding: 5,
                thumbWidth: 10,
                thumbHeight: 10,
                colors: ["#f9f9f9","#5cb85c"],
                borderColor: "",
                backgroundColor: "",
                isDrag: false,
                isHorizontal: true,
            },
            isHide: false,
            onChange: null
        }
    },

    getInitialState: function() {
        return {
            title: this.props.title,
            value: this.props.value,
            option: Immutable.fromJS(this.props.option),
            delta: 0,
            isMove: false,
            isHide: this.props.isHide,
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({value: nextProps.value})
        this.setState({option: Immutable.fromJS(nextProps.option)})
        this.setState({isHide: nextProps.isHide})  
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = nextState.title != this.state.title
        || nextState.value != this.state.value
        || !Immutable.is(nextState.option, this.state.option)
        || nextState.isHide != this.state.isHide

        if(this.state.isMove){
            return false
        }
        return isChange
    },

    componentDidUpdate: function(prevProps, prevState){
    },

    componentDidMount: function(){
        this.refs.progressbar.addEventListener("mousedown", this.onClickDown, false)
        this.refs.thumb.addEventListener("mousedown", this.onThumbDown, false)
        window.document.addEventListener("mousemove", this.onThumbMove)
        window.document.addEventListener("mouseup", this.onThumbUp)
    },

    componentWillUnmount: function(){
        this.refs.progressbar.removeEventListener("mousedown", this.onClickDown, false)
        this.refs.thumb.removeEventListener("mousedown", this.onThumbDown, false)
        window.document.removeEventListener("mousemove", this.onThumbMove)
        window.document.removeEventListener("mouseup", this.onThumbUp)  
    },

    setTitle: function(title){
        this.setState({title: title, isHide: false})
    },

    setValue: function(value){
        if(!this.state.isMove){
            this.setState({value: value, isHide: false})
        }
    },

    setIsHide: function(isHide){
        this.setState({isHide: isHide})
    },

    getProgressClass: function(){
        let cssClass = classNames({
            "sx-progress": true,
            "sx-progress-hide": this.state.isHide,
        })

        return cssClass
    },

    getProgressStyle: function(){
        let isHorizontal = this.state.option.get("isHorizontal", true)
        let style = {}
        let borderColor = this.state.option.get("borderColor")
        let backgroundColor = this.state.option.get("backgroundColor")

        if(isHorizontal){
            style["width"] = this.state.option.get("width") + "px"
            style["height"] = this.state.option.get("height") + "px"
        }else{
            style["width"] = this.state.option.get("height") + "px"
            style["height"] = this.state.option.get("width") + "px"
        }

        let padding = this.state.option.get("padding")
        let thumbHeight = this.state.option.get("thumbHeight")
        padding = padding >= thumbHeight ? thumbHeight : thumbHeight
        style["padding"] = padding + "px" + " " + this.state.option.get("padding") + "px"

        if(borderColor){
            style["border"] = "1px solid #" + borderColor
        }

        if(backgroundColor){
            style["backgroundColor"] = "#" + borderColor
        }

        return style
    },

    getThumbStyle: function(){
        let style = {}
        let isHorizontal = this.state.option.get("isHorizontal", true)
        let width = this.state.option.get("width") - this.state.option.get("thumbWidth")
        if(!this.state.isMove){
            if(isHorizontal){
                style["left"] = (this.state.value / 100 * width ) + "px"
                style["width"] = this.state.option.get("thumbWidth") + "px"
                style["height"] = this.state.option.get("thumbHeight") + "px"
                let offsetTop = (this.state.option.get("height") - this.state.option.get("thumbHeight") ) * 0.5
                style["top"] = offsetTop + "px"
            }else{
                style["bottom"] = (this.state.value / 100 * width ) + "px"
                style["width"] = this.state.option.get("thumbWidth") + "px"
                style["height"] = this.state.option.get("thumbHeight") + "px"
                let offsetLeft = (this.state.option.get("height") * 0.5 + this.state.option.get("thumbWidth") ) * 0.5
                style["left"] = offsetLeft + "px"
            }
        }

        return style
    },

    getIndicatorStyle: function(){
        let style = {}
        let isHorizontal = this.state.option.get("isHorizontal", true)
        if(!this.state.isMove){
            if(isHorizontal){
                style["width"] = this.state.value + "%"
                style["height"] = this.state.option.get("height") + "px"
            }else{
                style["width"] = this.state.option.get("height") + "px"
                style["height"] = this.state.value + "%" 
            }

            style["backgroundColor"] = this.state.option.getIn(["colors", 1])
        }
        return style
    },

    getBackgroundStyle: function(){
        let style = {}
        let isHorizontal = this.state.option.get("isHorizontal", true)
        if(isHorizontal){
            style["width"] = this.state.option.get("width") + "px"
            style["height"] = this.state.option.get("height") + "px"
        }else{
            style["width"] = this.state.option.get("height") + "px"
            style["height"] = this.state.option.get("width") + "px" 
        }

        style["backgroundColor"] = this.state.option.getIn(["colors", 0])
        return style
    },

    onClickDown: function(e){
        let max = this.state.option.get("width")
        let delta = e.offsetX
        let value = Math.round(Math.max(0, delta / max) * 100)

        if(this.props.onChange){
            this.props.onChange(value)
        }
    },

    onThumbDown: function(e){
        e.stopPropagation()
        let isHorizontal = this.state.option.get("isHorizontal", true)
        if(!this.state.option.get("isDrag", false)){
            return false
        }

        let delta = e.clientX - e.target.offsetLeft
        if(!isHorizontal){
            delta = e.clientY - e.target.offsetBottom
        }
        this.setState({delta: delta, isMove: true})
    },

    onThumbMove: function(e){
        let isHorizontal = this.state.option.get("isHorizontal", true)
        if(!this.state.option.get("isDrag", false)){
            return false
        }

        if(this.state.isMove){
            let max = this.state.option.get("width") - this.state.option.get("thumbWidth")
            let delta = e.clientX - this.state.delta
            if(!isHorizontal){
                delta = e.clientY - this.state.delta
            }
            
            if(delta < 0 ){
                delta = 0
            }else if(delta > max){
                delta = max
            }

            let value = Math.max(0, delta / max) * 100
            if(isHorizontal){
                this.refs.thumb.style["left"] = delta + "px"
                this.refs.indicator.style["width"] = value + "%"
            }else{
                this.refs.thumb.style["bottom"] = delta + "px"
                this.refs.indicator.style["height"] = value + "%"
            }

            if(this.props.onChange){
                this.props.onChange(value)
            }
        }
    },

    onThumbUp: function(e){
        if(this.state.isMove){
            this.setState({isMove: false})
        }

        if(!this.state.option.get("isDrag", false)){
            return false
        }
    },

    render: function() {
        let progressClass = this.getProgressClass()
        let progressStyle = this.getProgressStyle()
        let thumbStyle = this.getThumbStyle()
        let indicatorStyle = this.getIndicatorStyle()
        let backgroundStyle = this.getBackgroundStyle()
        let isDrag = this.state.option.get("isDrag", false)

        return <div ref = "progress"
            className = { progressClass }
            style = { progressStyle }>
                <div ref = "progressbar"
                className= "sx-progress-bar"
                style = { backgroundStyle }>
                    <p ref = "indicator"
                    className = "sx-progress-indicator"
                    style = { indicatorStyle } />

                    {
                        isDrag ? 
                        <span ref = "thumb"
                        className = "sx-progress-thumb"
                        style = { thumbStyle } />
                        :
                        <span ref = "thumb" />
                    }
                </div>
                {
                    this.state.title == "" ? 
                    ""
                    :
                    <p className = "sx-progress-text"> { this.state.title } </p>
                }
        </div>
    }
})

export default SxProgress
