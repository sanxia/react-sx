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

    componentWillReceiveProps = (nextProps)=>{
        this.setState({value: nextProps.value})
        this.setState({color: nextProps.color})
        this.setState({bgColor: nextProps.bgColor})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = this.state.value != nextState.value
        || this.state.color != nextState.color
        || this.state.bgColor != nextState.bgColor

        return isChanged
    }

    getValue = ()=>{
        return this.state.value
    }

    setValue = (value)=>{
        this.setState({value: value})
    }

    onMouseOver = ()=>{
        if(this.props.onOver){
            this.props.onOver()
        }
    }

    onMouseOut = ()=>{
        if(this.props.onOut){
            this.props.onOut()
        }
    }

    getStyleName = ()=>{
        let labelStyleName = {}

        if(this.state.color){
            labelStyleName["color"] = this.state.color
        }

        if(this.state.bgColor){
            labelStyleName["backgroundColor"] = this.state.bgColor
        }

        return labelStyleName
    }
    
    getClassName = ()=>{
        let labelClassName = classNames({
            "sx-label": true
        })

        let { className } = this.props
        if(className){
            labelClassName = labelClassName + " " + className 
        }

        return labelClassName
    }

    render = ()=>{
        let labelStyleName = this.getStyleName()
        let labelClassName = this.getClassName()

        if(this.props.isHtml){
            return <div className = { labelClassName }
            style = { labelStyleName }
            dangerouslySetInnerHTML = {{__html: this.state.value}}
            onMouseOver = { ()=>this.onMouseOver() }
            onMouseOut = { ()=>this.onMouseOut() } />
        }

        return <div className = { labelClassName }
        style = { labelStyleName }
        onMouseOver = { ()=>this.onMouseOver() }
        onMouseOut = { ()=>this.onMouseOut() }>
            { this.state.value }
        </div>
    }
}

SxTextLabel.propTypes = {
    value: React.PropTypes.string,
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,
    isHtml: React.PropTypes.bool
};

SxTextLabel.defaultProps = {
    value: "",
    color: "",
    bgColor: "",
    isHtml: true
}

export default SxTextLabel
