import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { util } from '../util/index'
import { SxBox } from '../box/index'
import { SxImageButton } from '../button/index'


/* ================================================================================
 * 滑动组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxSlider extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            value: props.value,
            currentValue: 0,
            option: Immutable.fromJS(props.option),
            delta: 0,
            isMove: false,
            isHide: props.isHide
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({value: nextProps.value})
        this.setState({option: Immutable.fromJS(nextProps.option)})
        this.setState({isHide: nextProps.isHide})  
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = nextState.title != this.state.title
        || nextState.value != this.state.value
        || !Immutable.is(nextState.option, this.state.option)
        || nextState.isHide != this.state.isHide

        if(this.state.isMove){
            return false
        }
        return isChanged
    }

    componentDidUpdate(prevProps, prevState){
        /*if(this.state.currentValue != this.state.value){
            let v = this.state.currentValue + 1
            this.setState({currentValue: v})
        }*/
    }

    componentDidMount(){
        this.progressbar.addEventListener("mousedown", (e)=>this.onSeek(e), false)
        this.progressbar.addEventListener("touchend", (e)=>this.onSeek(e), false)

        this.thumb.addEventListener("mousedown", (e)=>this.onThumbDown(e), false)
        this.thumb.addEventListener("touchend", (e)=>this.onThumbDown(e), false)

        window.document.addEventListener("mousemove", (e)=>this.onThumbMove(e))
        window.document.addEventListener("mouseup", (e)=>this.onThumbUp(e))
    }

    componentWillUnmountfunction(){
        this.progressbar.removeEventListener("mousedown", (e)=>this.onSeek(e), false)
        this.progressbar.removeEventListener("touchend", (e)=>this.onSeek(e), false)

        this.thumb.removeEventListener("mousedown", (e)=>this.onThumbDown(e), false)
        this.thumb.removeEventListener("touchend", (e)=>this.onThumbDown(e), false)

        window.document.removeEventListener("mousemove", (e)=>this.onThumbMove(e))
        window.document.removeEventListener("mouseup", (e)=>this.onThumbUp(e))  
    }

    setTitle(title){
        this.setState({title: title, isHide: false})
    }

    setValue(value){
        if(!this.state.isMove){
            this.setState({value: value, isHide: false})

            if(this.props.onValue){
                this.props.onValue(value)
            }
        }
    }

    setIsHide(isHide){
        this.setState({isHide: isHide})
    }

    getProgressClass(){
        let cssClass = classNames({
            "sx-progress": true,
            "sx-progress-hide": this.state.isHide,
        })

        return cssClass
    }

    getProgressStyle(){
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
        let thumbHeight = Number(this.state.option.get("thumbHeight")) * 0.5
        padding = padding >= thumbHeight ? padding : thumbHeight
        style["padding"] = padding + "px"

        if(borderColor){
            style["border"] = "1px solid #" + borderColor
        }

        if(backgroundColor){
            style["backgroundColor"] = "#" + borderColor
        }

        return style
    }

    getThumbStyle(){
        let style = {}
        let isHorizontal = this.state.option.get("isHorizontal", true)
        let width = Number(this.state.option.get("width")) - Number(this.state.option.get("thumbWidth"))
        let height = Number(this.state.option.get("height"))
        let thumbWidth = Number(this.state.option.get("thumbWidth"))
        let thumbHeight = Number(this.state.option.get("thumbHeight"))
        if(!this.state.isMove){
            style["width"] = thumbWidth + "px"
            style["height"] = thumbHeight + "px"

            if(isHorizontal){
                style["left"] = (this.state.value / 100 * width ) + "px"
                let offsetTop = (height - thumbHeight) * 0.5
                style["top"] = offsetTop + "px"
            }else{
                style["bottom"] = (this.state.value / 100 * width ) + "px"
                let offsetLeft = (height * 0.5 + thumbWidth) * 0.5
                style["left"] = offsetLeft + "px"
            }
        }

        return style
    }

    getIndicatorStyle(){
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
    }

    getBackgroundStyle(){
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
    }

    onSeek(e){
        if (window.event) {
            e.cancelBubble = true
        } else {
            e.stopPropagation()
        }

        let max = this.state.option.get("width")
        let delta = e.offsetX
        let value = Math.round(Math.max(0, delta / max) * 100)

        if(this.props.onSeek){
            this.props.onSeek(value)
        }

        this.setValue(value)

        util.preventDefault(e)
    }

    onThumbDown(e){
        if (window.event) {
            e.cancelBubble = true
        } else {
            e.stopPropagation()
        }
        
        let isHorizontal = this.state.option.get("isHorizontal", true)
        if(!this.state.option.get("isDrag", false)){
            return false
        }

        let delta = e.clientY - e.target.offsetBottom
        if(isHorizontal){
           delta = e.clientX - e.target.offsetLeft
        }
        this.setState({delta: delta, isMove: true})

        util.preventDefault(e)
    }

    onThumbMove(e){
        if(!this.state.option.get("isDrag", false)){
            return false
        }

        let isHorizontal = this.state.option.get("isHorizontal", true)
        if(this.state.isMove){
            let max = this.state.option.get("width") - this.state.option.get("thumbWidth")
            let delta = e.clientY - this.state.delta
            if(isHorizontal){
                delta = e.clientX - this.state.delta
            }
            
            if(delta < 0 ){
                delta = 0
            }else if(delta > max){
                delta = max
            }

            let value = Math.max(0, delta / max) * 100
            if(isHorizontal){
                this.thumb.style["left"] = delta + "px"
                this.indicator.style["width"] = value + "%"
            }else{
                this.thumb.style["bottom"] = delta + "px"
                this.indicator.style["height"] = value + "%"
            }

            if(this.props.onChange){
                this.props.onChange(value)
            }

            this.setState({currentValue: value})
        }
    }

    onThumbUp(e){
        if(this.state.isMove){
            this.setState({isMove: false})

            if(this.props.onSeek){
                this.props.onSeek(this.state.currentValue)
            }
        }
    }

    render() {
        let progressClass = this.getProgressClass()
        let progressStyle = this.getProgressStyle()
        let thumbStyle = this.getThumbStyle()
        let indicatorStyle = this.getIndicatorStyle()
        let backgroundStyle = this.getBackgroundStyle()
        let isDrag = this.state.option.get("isDrag", false)

        return <div className = { progressClass } style = { progressStyle }>
                
                <div ref = {(progressbar)=>{this.progressbar=progressbar}} className= "sx-progress-bar sx-progress-radius" style = { backgroundStyle } >
                    <p ref = {(indicator)=>{this.indicator=indicator}} className = "sx-progress-indicator sx-progress-radius" style = { indicatorStyle } />

                    {
                        isDrag ? 
                        <span
                        ref = {(thumb)=>{this.thumb=thumb}}
                        className = "sx-progress-thumb"
                        style = { thumbStyle } />
                        :
                        <span ref = {(thumb)=>{this.thumb=thumb}} />
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
}

SxSlider.defaultProps = {
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
    onValue: null,
    onSeek: null,
    onChange: null
}

export default SxSlider
