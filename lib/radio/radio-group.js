import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxRadio from './radio'


/* ================================================================================
 * 单选框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxRadioGroup = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            options: React.PropTypes.array,
            value: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number,
                React.PropTypes.bool
            ]),
            isRequire: React.PropTypes.bool,
            onValue: React.PropTypes.func,
            onValidate: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            title: "",
            options: [],
            value: "",
            isRequire: false,
            onValue: null,
            onValidate: null
        }
    },

    getInitialState: function(){
        return {
            options: Immutable.fromJS(this.props.options),
            value: this.props.value,
            isChanged: false,
            isSuccess: false,
            isActive: false,
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.checkOption(nextProps.options, nextProps.value)
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.options, this.state.options)
        || nextState.value != this.state.value
        || nextState.isChanged != this.state.isChanged
        || nextState.isSuccess !== this.state.isSuccess
        || nextState.isActive != this.state.isActive
        return isChanged
    },

    componentWillMount: function(){
        this.checkOption(this.props.options, this.props.value)
    },

    checkOption: function(options, value){
        options = Immutable.fromJS(options)
        let checkValue = value

        if(checkValue == ""){
            checkValue = this.getOptionsValue(options)
        }else{
            options = options.map((v, k) => {
                if(v.get("value") == checkValue){
                    v = v.set("isChecked", true)
                }else{
                    v = v.set("isChecked", false)
                }
                return v
            })
        }

        this.setState({options: options})
        this.setState({value: checkValue})
        this.onValidate(checkValue != "")

        //自动绑定值处理
        if(this.props.onValue){
            this.props.onValue(checkValue)
        }
    },

    getOptions: function(value){
        let options = this.state.options
        let optionValue = value.value

        options = options.map((v, k) => {
            if(v.get("value") == optionValue){
                v = v.set("isChecked", true)
            }else{
                v = v.set("isChecked", false)
            }
            return v
        })
        return options
    },

    getOptionsValue: function(options){
        options = options.filter( (v,k) => 
            v.get("isChecked") == true
        )
        return options.count() > 0 ? options.first().get("value") : ""
    },

    getValue: function(){
        return this.state.value
    },

    isChecked: function(){
        let options = this.state.options.filter( (v,k) => 
            v.get("isChecked") == true
        )
        return options.count() > 0 ? true : false
    },

    isValidate:function(){
        return this.state.isSuccess
    },

    onValidate: function(isSuccess) {
        if(this.props.isRequire){
            this.setState({isSuccess: isSuccess})
        }
        
        if(this.props.onValidate){
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    },

    onMouseOver: function(e){
        this.setState({isActive: true})
    },

    onMouseOut: function(e){
        this.setState({isActive: false})

        let isChecked = this.isChecked()
        this.onValidate(isChecked)
    },

    onSelectChange: function(value) {
        let options = this.getOptions(value)
        let optionValue = this.getOptionsValue(options)

        if(this.props.onValue){
            if(this.props.onValue(optionValue)){
                this.setState({value: optionValue, options: options, isChanged: true})
                this.onValidate(true)
                return true
            }else{
                return false
            }
        }else{
            this.setState({value: optionValue, options: options, isChanged: true})
            this.onValidate(true)
            return true
        }
    },

    renderOptions: function(){
        let options = this.state.options.sort((v1,v2) => v1.get("sortorder", 0) < v2.get("sortorder", 0))
        options = options.map( (v,k) => 
            <SxRadio key = { k }
            title = { v.get("text") }
            value = { v.get("value") }
            isChecked = { v.get("isChecked", false) }
            isEnabled = { v.get("isEnabled", true) }
            onSelectChange = { this.onSelectChange } />
        )

        return options
    },

    render: function(){
        let cssClass = classNames({
            "sx-radio-box": true,
            "sx-radio-box-error": this.state.isChanged && !this.state.isSuccess,
            "sx-radio-box-active": this.state.isActive
        })
        
        let title = this.props.title == "" ? "" : <span className = "sx-title" onClick = { this.onMouseOver }>{ this.props.title }</span>
        if( this.props.isRequire && this.props.title != "" ){
            title = <span className = "sx-title" onClick = { this.onMouseOver }>{ this.props.title }<i>*</i></span>
        }

        let options = this.renderOptions()

        return <div className = "sx-radio">
            { title }
            <div className = { cssClass } onMouseOver = { this.onMouseOver } onMouseOut = { this.onMouseOut }>
                <span className="sx-radio-content">
                    { options }
                </span>
                { this.props.children }
            </div>
        </div>
    }
})

export default SxRadioGroup
