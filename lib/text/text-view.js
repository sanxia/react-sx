import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 文本展示组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTextView = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            value: React.PropTypes.string,
            icons: React.PropTypes.array,
            color: React.PropTypes.string,
            bgColor: React.PropTypes.string,
            type: React.PropTypes.string,
            isDisabled: React.PropTypes.bool,
            isActive: React.PropTypes.bool,
            isTracking: React.PropTypes.bool,
        }
    },

    getDefaultProps: function(){
        return {
            title: "",
            value: "",
            icons: [],
            color: "",
            bgColor: "",
            type: "",
            isDisabled: false,
            isActive: false,
            isTracking: false,
        }
    },

    getInitialState: function(){
        return{
            value: this.props.value,
            color: this.props.color,
            bgColor: this.props.bgColor,
            type: this.props.type,
            isDisabled: this.props.isDisabled,
            isActive: this.props.isActive,
            isTracking: this.props.isTracking,
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({value: nextProps.value})
        this.setState({color: nextProps.color})
        this.setState({bgColor: nextProps.bgColor})
        this.setState({type: nextProps.type})
        this.setState({isDisabled: nextProps.isDisabled})
        this.setState({isActive: nextProps.isActive})
        this.setState({isTracking: nextProps.isTracking})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = true
        return isChange
    },

    componentWillUpdate: function(nextProps, nextState) {
        //alert("text componentWillUpdate this.isValidate(): " + this.isValidate())
    },

    getValue: function(){
        return this.state.value
    },

    setValue: function(value){
        this.setState({value: value})
    },

    onMouseOver: function(){
        if(this.state.isTracking && !this.state.isDisabled){
            this.setState({isActive: true})
        }
    },

    onMouseOut: function(){
        if(this.state.isTracking && !this.state.isDisabled){
            this.setState({isActive: false})
        }
    },

    renderIcon: function(){
        let icon = ""
        if(this.props.icons.length == 0){
            return icon
        }

        let iconClass = this.props.icons[0]
        if(this.state.isActive){
            if(this.props.icons.length == 2){
                iconClass = this.props.icons[1]
            }
        }

        return <em className = "sx-view-icon">
            <i className = { iconClass } ></i>
        </em>
    },

    render: function() {
        let boxClass = classNames({
            "sx-view-box": true,
            "sx-view-box-active": this.state.isActive
        })

        let contentClass = classNames({
            "sx-view-content": true
        })

        let type = this.props.type
        if(type != ""){
            type = "sx-" + type
            boxClass = boxClass + " " + type
        }

        if(this.props.isDisabled){
            boxClass = boxClass + " " + "sx-disabled"
        }

        let styleName = {}
        let color = this.state.color
        let bgColor = this.state.bgColor
        if(color != ""){
            styleName["color"] = color
        }
        if(bgColor != ""){
            styleName["backgroundColor"] = bgColor
        }

        let icon = this.renderIcon()
        let title = this.props.title == "" ? "" : <span className = "sx-title" onClick = { this.onMouseOver }>{ this.props.title }</span>
        if( this.props.isRequire && this.props.title != "" ){
            title = <span className = "sx-title" onClick = { this.onMouseOver }>{ this.props.title }<i>*</i></span>
        }

        return <div className = "sx-view">
            { title }
            <div className = { boxClass } onMouseOver = { this.onMouseOver } onMouseOut = { this.onMouseOut }>
                { icon }
                {
                    this.state.value != "" ?
                    <div dangerouslySetInnerHTML = {{__html: this.state.value}}
                    className = { contentClass }
                    style = { styleName } />
                    :
                    ""
                }

                { this.props.children }
            </div>
        </div>
    }
})

export default SxTextView
