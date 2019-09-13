import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { util } from '../util'


/* ================================================================================
 * 复选框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxCheckBox extends Component{
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
        let isChanged = nextState.value != this.state.value
        || nextState.isChecked != this.state.isChecked
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isDisabled != this.state.isDisabled
        return isChanged
    }

    isValidate(){
        return this.state.isSuccess
    }

    createMarkup(html){
        return {
            __html: html
        }
    }

    getValue(){
        return this.state.value
    }

    isChecked(){
        return this.state.isChecked
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

    onCheck = (e)=>{
        if(this.state.isDisabled){
            return false
        }

        let isChecked = !this.state.isChecked
        let targetValue = e.target.value

        if(typeof this.state.value == "boolean"){
            targetValue = util.toBool(targetValue)
        }

        if(this.props.onCheck){
            if (this.props.onCheck({value:targetValue, isChecked:isChecked})){
                this.setState({isChecked: isChecked})
            }
        }else{
            this.setState({isChecked: isChecked})
        }

        if(this.props.onBinding){
            this.props.onBinding({value:targetValue, isChecked:isChecked})
        }
    }

    renderTitle = (id)=>{
        let content = ""

        if(this.props.title != ""){
            content = <em>
                <label htmlFor = { id }>
                    { this.props.title }
                </label>
            </em>
        }

        return content
    }

    render = ()=>{
        let cssClass = classNames({
            "sx-radio-option": true,
            "sx-radio-option-default": !this.state.isChecked,
            "sx-radio-option-checked": this.state.isChecked,
            "sx-radio-option-active": false,
            "sx-radio-option-err": !this.state.isSuccess,
            "sx-radio-option-invalid": this.state.isDisabled
        })

        //获取传入的className属性组合起来
        let { id, className } = this.props
        if(className){
            cssClass = cssClass + " " + className 
        }

        if(id == undefined){
            id = "sx-" + util.getTick()
            if(this.state.value){
                id = id + "-" + this.state.value
            }
        }

        return <span className = { cssClass } >
            {
                this.state.isDisabled ? 
                <input id = { id }
                value = { this.state.value }
                type = "checkbox"
                checked = { this.state.isChecked }
                readonly = "true"
                disabled = "disabled"
                onChange = { (e)=>this.onCheck(e) } />
                :
                <input id = { id }
                value = { this.state.value }
                type = "checkbox"
                checked = { this.state.isChecked }
                onChange = { (e)=>this.onCheck(e) } />
            }

            { this.renderTitle(id) }

        </span>
    }
}

SxCheckBox.propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ]),
    isChecked: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    onCheck: React.PropTypes.func,
    onBinding: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxCheckBox.defaultProps = {
    title:"",
    value: "",
    isChecked: false,
    isRequire: false,
    isDisabled: false,
    onCheck: null,
    onBinding: null,
    onValidate: null
};

export default SxCheckBox
