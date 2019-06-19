import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { util } from '../util'


/* ================================================================================
 * 单选框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxRadio extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: props.value,
            isChecked: props.isChecked,
            isSuccess: props.isRequire ? (props.isChecked ? true : false) : true,
            isDisabled: props.isDisabled
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value})
        this.setState({isChecked: nextProps.isChecked})
        this.setState({isDisabled: nextProps.isDisabled})

        this.onValidate(nextProps.isChecked)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value
        || nextState.isChecked !== this.state.isChecked
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isDisabled !== this.state.isDisabled
    }

    isValidate(){
        return this.state.isSuccess
    }

    isChecked(){
        return this.state.isChecked
    }

    getValue(){
        return this.state.value
    }

    onValidate(isChecked) {
        let isSuccess = true

        if(this.props.isRequire){
            if(isChecked){
                isSuccess = true
            }else{
                isSuccess = false
            }
            this.setState({isSuccess: isSuccess})
        }

        if(this.props.onValidate){
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    }

    onSelect = (e)=>{
        if(this.state.isDisabled){
            return false
        }

        let isChecked = this.state.isChecked
        let targetValue = e.target.value

        if(typeof this.state.value == "boolean"){
            targetValue = util.toBool(targetValue)
        }

        if(this.props.onSelect){            
            if (this.props.onSelect({value: targetValue, isChecked: isChecked})){
                this.setState({isChecked: isChecked})
            }
        }else{
            this.setState({isChecked: isChecked})
        }

        if(this.props.onBinding){
            this.props.onBinding({value: targetValue, isChecked: isChecked})
        }
    }

    render = ()=>{
        let className = classNames({
            "sx-radio-option": true,
            "sx-radio-option-default": !this.state.isChecked,
            "sx-radio-option-checked": this.state.isChecked,
            "sx-radio-option-active": false,
            "sx-radio-option-err": !this.state.isSuccess,
            "sx-radio-option-invalid": this.state.isDisabled
        })

        let { id } = this.props
        if(id == undefined){
            id = "sx-" + util.getTick() + "-" + this.state.value
        }

        return <span className = { className } >
            <input
            id = { id }
            value = { this.state.value }
            type = "radio"
            checked = { this.state.isChecked } 
            onChange = { (e)=>this.onSelect(e) } />
            <em>
                <label htmlFor = { id }> { this.props.title } </label>
            </em>
        </span>
    }
}

SxRadio.propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ]),
    isChecked: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    onBinding: React.PropTypes.func,
    onValidate: React.PropTypes.func
    
};

SxRadio.defaultProps = {
    title:"",
    value: "",
    isChecked: false,
    isRequire: false,
    isDisabled: false,
    onSelect: null,
    onBinding: null,
    onValidate: null
};

export default SxRadio
