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
var SxCheckBox = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            value: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number,
                React.PropTypes.bool
            ]),
            isChecked: React.PropTypes.bool,
            isDisabled: React.PropTypes.bool,
            onCheck: React.PropTypes.func,
            onBinding: React.PropTypes.func,
            onValidate: React.PropTypes.func
        }
    },

    getDefaultProps: function() {
        return{
            title:"",
            value: "",
            isChecked: false,
            isRequire: false,
            isDisabled: false,
            onCheck: null,
            onBinding: null,
            onValidate: null
        }
    },

    getInitialState: function() {
        return {
            value: this.props.value,
            isChecked: this.props.isChecked,
            isSuccess: this.props.isRequire ? (this.props.isChecked ? true : false) : true,
            isDisabled: this.props.isDisabled
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({value: nextProps.value})
        this.setState({isChecked: nextProps.isChecked})
        this.setState({isDisabled: nextProps.isDisabled})

        this.onValidate(nextProps.isChecked)
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = nextState.value != this.state.value
        || nextState.isChecked != this.state.isChecked
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isDisabled != this.state.isDisabled
        return isChanged
    },

    isValidate:function(){
        return this.state.isSuccess
    },

    onValidate: function(isChecked) {
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
    },

    createMarkup:function(html){
        return {
            __html: html
        }
    },

    getValue:function(){
        return this.state.value
    },

    isChecked:function(){
        return this.state.isChecked
    },

    onCheck: function(e) {
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
    },

    render: function() {
        let className = classNames(
            {
                "sx-radio-option": true,
                "sx-radio-option-default": !this.state.isChecked,
                "sx-radio-option-checked": this.state.isChecked,
                "sx-radio-option-active": false,
                "sx-radio-option-err": !this.state.isSuccess,
                "sx-radio-option-invalid": this.state.isDisabled
            }
        )

        let { id } = this.props
        if(id == undefined){
            id = "sx-" + util.getTick() + "-" + this.state.value
        }

        return <span className = { className } >
            {
                this.state.isDisabled ? 
                <input id = { id }
                value = { this.state.value }
                type = "checkbox"
                checked = { this.state.isChecked }
                readonly = "true"
                disabled = "disabled"
                onChange = { this.onCheck } />
                :
                <input id = { id }
                value = { this.state.value }
                type = "checkbox"
                checked = { this.state.isChecked }
                onChange = { this.onCheck } />
            }
            {
                this.props.title != "" ? 
                <em>
                    <label htmlFor = { id }> { this.props.title } </label>
                </em>
                :
                ""
            }

        </span>
    }
})

export default SxCheckBox
