import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 文本展示组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTextLabel extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            value: props.value,
            color: props.color,
            bgColor: props.bgColor
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value})
        this.setState({color: nextProps.color})
        this.setState({bgColor: nextProps.bgColor})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = this.state.value != nextState.value
        || this.state.color != nextState.color
        || this.state.bgColor != nextState.bgColor

        return isChanged
    }

    getValue(){
        return this.state.value
    }

    setValue(value){
        this.setState({value: value})
    }

    onMouseOver(){
        if(this.props.onOver){
            this.props.onOver()
        }
    }

    onMouseOut(){
        if(this.props.onOut){
            this.props.onOut()
        }
    }

    render(){
        let styleName = {}
        let color = this.state.color
        let bgColor = this.state.bgColor
        if(color != ""){
            styleName["color"] = color
        }
        if(bgColor != ""){
            styleName["backgroundColor"] = bgColor
        }

        let cssClass = "sx-label"
        let { className } = this.props
        if(className){
            cssClass = cssClass + " " + className 
        }

        return <div className = { cssClass }
        dangerouslySetInnerHTML = {{__html: this.state.value}} style = { styleName }
        onMouseOver = { ()=>this.onMouseOver() }
        onMouseOut = { ()=>this.onMouseOut() }>
        </div>
    }
}

SxTextLabel.defaultProps = {
    value: "",
    color: "",
    bgColor: ""
}

export default SxTextLabel
