import React, { Component } from 'react'
import classNames from 'classnames'
import { SxTimer } from '../timer/index'


/* ================================================================================
 * 动态校验码按钮组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxCheckCode extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            isRun: props.isRun,
            isValidate: props.isValidate,
            isActive: false
        }

        this.createMarkup = this.createMarkup.bind(this)
    }

    componentWillReceiveProps = (nextProps)=>{
        if(!this.state.isRun){
            this.setState({title: nextProps.title})
            //this.setState({isValidate: nextProps.isValidate})
        }
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = nextState.title != this.state.title
        || nextState.isRun != this.state.isRun
        || nextState.isActive != this.state.isActive
        || nextState.isValidate != this.state.isValidate

        return isChanged
    }

    createMarkup = (html)=>{
        return {
            __html: html
        }
    }

    isRun = ()=>{
        return this.state.isRun
    }

    setValidate = (isSuccess)=>{
        this.setState({isValidate: isSuccess})
    }

    onMouseOver = ()=>{
        if(!this.state.isRun && this.state.isValidate){
            this.setState({ isActive: true })
        }
    }

    onMouseOut = ()=>{
        if(!this.state.isRun && this.state.isValidate){
            this.setState({ isActive: false })
        }
    }

    onInterval = (count)=>{
        let countInfo = count
        if(count < 10){
            countInfo = "0" + count
        }

        let title = "<span class=\"sx-verify-number\"> " + countInfo + " </span>s<span class=\"sx-verify-info sx-font9\">重新获取</span>"

        this.setState({title: title})
    }

    start = ()=>{
        if(!this.state.isRun && this.state.isValidate){
            this.timer.start()
            this.setState({isRun:true, isValidate: false})
        } 
    }

    onTimeout = ()=>{
        if(this.props.onTimeout){
            if(this.props.onTimeout()){
                this.setState({title:this.props.title, isRun:false})
            }
        }
    }

    onButton = ()=>{
        if(this.props.onButton){
            if(this.props.onButton()){
                if(!this.state.isRun && this.state.isValidate){
                    this.timer.start()
                    this.setState({isRun:true, isValidate: false})
                } 
            }
        }
    }

    getClassName = ()=>{
        let className = classNames({
            "sx-verify": true,
            "sx-verify-valid":  !this.state.isRun && this.state.isValidate,
            "sx-verify-invalid": this.state.isRun || !this.state.isValidate
        })

        return className
    }

    render = ()=>{
        let className = this.getClassName()
        
        return <div>
            <SxTimer
            ref = { (timer) => {this.timer = timer} }
            isAuto = { false }
            duration = { this.props.timeout }
            onInterval = { (count)=>this.onInterval(count) }
            onTimeout = { ()=>this.onTimeout() } />

            <span 
            className = { className }
            dangerouslySetInnerHTML = { this.createMarkup(this.state.title) }
            onMouseOver = { ()=>this.onMouseOver() }
            onMouseOut = { ()=>this.onMouseOut() }
            onClick = { ()=>this.onButton() } >
            </span>
        </div>
    }
}

SxCheckCode.propTypes = {
    title: React.PropTypes.string,
    timeout: React.PropTypes.number,
    isRun: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    onTimeout: React.PropTypes.func,
    onButton: React.PropTypes.func
};

SxCheckCode.defaultProps = {
    title: "获取手机码",
    timeout: 30,
    isRun: false,
    isValidate: false,
    onTimeout: null,
    onButton: null
};

export default SxCheckCode
