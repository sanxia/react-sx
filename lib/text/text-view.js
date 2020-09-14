import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 文本展示组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTextView extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: props.value,
            color: props.color,
            bgColor: props.bgColor,
            isActive: props.isActive,
            isTracking: props.isTracking,
            isDisabled: props.isDisabled
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({value: nextProps.value})
        this.setState({color: nextProps.color})
        this.setState({bgColor: nextProps.bgColor})
        this.setState({isDisabled: nextProps.isDisabled})
        this.setState({isActive: nextProps.isActive})
        this.setState({isTracking: nextProps.isTracking})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChange = true
        return isChange
    }

    componentWillUpdate = (nextProps, nextState)=>{
        //alert("text componentWillUpdate this.isValidate(): " + this.isValidate())
    }

    getValue = ()=>{
        return this.state.value
    }

    setValue = (value)=>{
        this.setState({value: value})
    }

    onMouseOver = ()=>{
        if(this.state.isTracking && !this.state.isDisabled){
            this.setState({isActive: true})
        }
    }

    onMouseOut = ()=>{
        if(this.state.isTracking && !this.state.isDisabled){
            this.setState({isActive: false})
        }
    }

    getBodyClassName = ()=>{
        let viewBodyClassName = classNames({
            "sx-view-body": true,
            "sx-view-body-active": this.state.isActive
        })

        let type = this.props.type
        if(type != ""){
            type = "sx-" + type
            viewBodyClassName = viewBodyClassName + " " + type
        }

        if(this.props.isDisabled){
            viewBodyClassName = viewBodyClassName + " " + "sx-disabled"
        }

        return viewBodyClassName
    }
    
    renderHeader = ()=>{
        if(!this.props.title) return null;

        return <span
        className = "sx-view-header"
        onClick = { ()=>this.onMouseOver() }>
            { this.props.title }
            { this.props.isRequire ? <i>*</i> : "" }
        </span>
    }

    renderIcon = ()=>{
        if(this.props.icons.length == 0) return null;

        let iconClassName = this.props.icons[0]
        if(this.state.isActive){
            if(this.props.icons.length == 2){
                iconClassName = this.props.icons[1]
            }
        }

        return <em className = "sx-view-icon">
            <i className = { iconClassName } ></i>
        </em>
    }

    renderContent = ()=>{
        if(!this.state.value) return null;

        let contentStyle = {}
        let contentClassName = classNames({
            "sx-view-content": true
        })

        let { className } = this.props
        if(className){
            contentClassName = contentClassName + " " + className 
        }

        if(this.state.color){
            contentStyle["color"] = this.state.color
        }

        if(this.state.bgColor){
            contentStyle["backgroundColor"] = this.state.bgColor
        }

        if(this.props.isHtml){
            return <div
            dangerouslySetInnerHTML = {{__html: this.state.value}}
            className = { contentClassName }
            style = { contentStyle } />
        }

        return <div
        className = { contentClassName }
        style = { contentStyle }>
            { this.state.value }
        </div>
    }

    render = ()=>{
        let viewBodyClassName = this.getBodyClassName()

        return <div className = "sx-view">
            { this.renderHeader() }

            <div className = { viewBodyClassName }
            onMouseOver = { ()=>this.onMouseOver }
            onMouseOut = { ()=>this.onMouseOut }>
                { this.renderIcon() }

                { this.renderContent() }

                { this.props.children }
            </div>
        </div>
    }
}

SxTextView.propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.string,
    icons: React.PropTypes.array,
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,
    type: React.PropTypes.string,
    isHtml: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    isActive: React.PropTypes.bool,
    isTracking: React.PropTypes.bool
};

SxTextView.defaultProps = {
    title: "",
    value: "",
    icons: [],
    color: "",
    bgColor: "",
    type: "",
    isHtml: true,
    isDisabled: false,
    isActive: false,
    isTracking: false,
};

export default SxTextView
