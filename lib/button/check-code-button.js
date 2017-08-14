import React, { Component } from 'react'
import classNames from 'classnames'
import { SxTimer } from '../timer/index'


/* ================================================================================
 * 动态校验码按钮组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxCheckCodeButton = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            timeout: React.PropTypes.number,
            isRun: React.PropTypes.bool,
            isValidate: React.PropTypes.bool,
            onTimeout: React.PropTypes.func
        }
    },

    getDefaultProps: function() {
        return{
            title: "获取验证码",
            timeout: 15,
            isRun: false,
            isValidate: false,
            onButton: null,
            onTimeout: null
        }
    },

    getInitialState: function() {
        return {
            title: this.props.title,
            isRun: this.props.isRun,
            isValidate: this.props.isValidate,
            isActive: false
        }
    },

    componentWillReceiveProps: function (nextProps){
        if(!this.state.isRun){
            this.setState({title: nextProps.title})
            this.setState({isValidate: nextProps.isValidate})
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = nextState.title != this.state.title
        || nextState.isRun != this.state.isRun
        || nextState.isActive != this.state.isActive
        || nextState.isValidate != this.state.isValidate

        return isChanged
    },

    createMarkup:function(html){
        return {
            __html: html
        }
    },

    isRun: function(){
        return this.state.isRun
    },

    setValidate: function(isSuccess){
        this.setState({isValidate: isSuccess})
    },

    getClassName: function(){
        let className = classNames({
            "sx-verify": true,
            "sx-verify-valid":  this.state.isValidate,
            "sx-verify-invalid": !this.state.isValidate
        })

        return className
    },

    onMouseOver: function() {
        if(!this.state.isRun && this.state.isValidate){
            this.setState({ isActive: true })
        }
    },

    onMouseOut: function(){
        if(!this.state.isRun && this.state.isValidate){
            this.setState({ isActive: false })
        }
    },

    onInterval: function(count){
        let title = "稍后<span className=\"sx-verify-number\"> " + count + " </span>秒"
        this.setState({title: title})
    },

    onButton: function(){
        if( !this.state.isRun && this.state.isValidate){
            this.refs.timer.start()
            this.setState({isRun:true, isValidate: false})

            if(this.props.onButton != null){
                this.props.onButton()
            }
        }
    },

    onTimeout: function(){
        if(this.props.onTimeout){
            this.props.onTimeout()
        }
        this.setState({title:this.props.title, isRun:false})
    },

    render: function() {
        let className = this.getClassName()
        
        return <div>
            <SxTimer ref = "timer"
                isAuto = { false }
                duration = { this.props.timeout }
                onInterval = { this.onInterval }
                onTimeout = { this.onTimeout } />

            <span ref = "sx-verify-title"
                className = { className }
                dangerouslySetInnerHTML = {this.createMarkup(this.state.title)}
                onMouseOver = { this.onMouseOver }
                onMouseOut = { this.onMouseOut }
                onClick = { this.onButton } >
            </span>
        </div>
    }
})

export default SxCheckCodeButton
