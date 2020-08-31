import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * 可触摸组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTouch extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            isHovering: false,
            isChecked: props.isChecked,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps(nextProps){
       this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChange = nextState.isHovering != this.state.isHovering
        || nextState.isChecked != this.state.isChecked
        || nextState.isValidate != this.state.isValidate

        return isChange
    }

    onMouseOver(){
        if(this.state.isValidate){
            this.setState({isHovering: true})
        }
    }

    onMouseOut(){
        if(this.state.isValidate){
            this.setState({isHovering: false})
        }
    }

    onTouch(){
        if(!this.state.isValidate){
            return
        }

        let isChecked = !this.state.isChecked

        if(this.props.onTouch){
            if(this.props.onTouch({isChecked: isChecked })){
                this.setState((state)=>{
                    state.isChecked = isChecked
                })
            }
        }else{
            this.setState((state)=>{
                state.isChecked = isChecked
            })
        }

        this.onMouseOut()
    }

    render() {
        let cssClassName = "sx-touch"
        if(this.props.isValidate){
            cssClassName += " sx-cursor-pointer"
        }else{
            cssClassName += " sx-cursor-invalid"
        }
        
        let { className } = this.props
        if(className){
            cssClassName = cssClassName + " " + className 
        }

        return <div
        { ...this.props }
        className = { cssClassName }
        onMouseOver = { ()=>{this.onMouseOver()} }
        onMouseOut = { ()=>{this.onMouseOut()} }
        onClick = { ()=>{this.onTouch()} }>
            { this.props.children }
        </div>
    }
}

SxTouch.propTypes = {
    isChecked: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    onTouch: React.PropTypes.func
};

SxTouch.defaultProps = {
    isChecked: false,
    isValidate: true,
    onTouch: null
};

export default SxTouch
