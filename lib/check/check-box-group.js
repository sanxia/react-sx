import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxCheckBox from './check-box'


/* ================================================================================
 * 复选框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxCheckBoxGroup = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            options: React.PropTypes.array,
            value: React.PropTypes.array,
            info: React.PropTypes.string,
            isDisabled: React.PropTypes.bool,
            isRequire: React.PropTypes.bool,
            onBinding: React.PropTypes.func,
            onValidate: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            title: "",
            options: [],
            value: [],
            info: "",
            isDisabled: false,
            isRequire: false,
            onBinding: null,
            onValidate: null
        }
    },

    getInitialState: function(){
        return {
            options: Immutable.fromJS(this.props.options),
            value: Immutable.fromJS(this.props.value),
            info: this.props.info,
            isDisabled: this.props.isDisabled,
            isChange: false,
            isSuccess: true,
            isActive: false,
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({options: Immutable.fromJS(nextProps.options)})
        this.setState({value: Immutable.fromJS(nextProps.value)})
        this.setState({info: nextProps.info})
        this.setState({isDisabled: nextProps.isDisabled})

        this.checkOption(nextProps.options, nextProps.value)
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.options, this.state.options)
        || !Immutable.is(nextState.value, this.state.value)
        || nextState.info != this.state.info
        || nextState.isDisabled != this.state.isDisabled
        || nextState.isChange != this.state.isChange
        || nextState.isSuccess !== this.state.isSuccess
        || nextState.isActive != this.state.isActive
        return isChanged      
    },

    componentWillUpdate: function(nextProps, nextState) {
    },

    componentDidUpdate: function(prevProps, prevState){
    },

    componentWillMount: function(){
    },

    componentDidMount: function(){
        this.checkOption(this.state.options, this.state.value)
    },

    checkOption: function(options, value){
        options = Immutable.fromJS(options)
        let values = Immutable.fromJS(value)
        let selectedValues = Immutable.fromJS([])

        if(values.count() == 0){
            selectedValues = this.getOptionsValue(options)
        }else{
            values.forEach(function(v1, k1){
                options = options.map((v2, k2) => {
                    if(v2.get("value") == v1){
                        v2 = v2.set("isChecked", true)
                    }
                    return v2
                })
            })

            options.forEach((v,k)=>{
                if(v.get("isChecked")){
                    selectedValues = selectedValues.push(v.get("value"))
                }
            })
        }

        this.setState({options: options})
        this.setState({value: selectedValues})

        let isChecked = selectedValues.count() > 0
        this.onValidate(isChecked)
    },

    getOptions: function(value){
        let options = this.state.options
        let optionValues = this.state.value

        if(value.isChecked){
            if(!optionValues.contains(value.value)){
                optionValues = optionValues.push(value.value)
            }
        }else{
            optionValues = optionValues.filter((v,k) => v != value.value)
        }

        options = options.map((v, k) => {
            if(v.get("value") == value.value){
                v = v.set("isChecked", value.isChecked)
            }
            return v
        })

        optionValues.forEach(function(v1, k2){
            options = options.map((v2, k2) => {
                if(v2.get("value") == v1){
                    v2 = v2.set("isChecked", true)
                }
                return v2
            })
        })

        return options
    },

    getOptionsValue: function(options){
        let optionValues = Immutable.fromJS([])
        options.forEach(function(v, k){
            if(v.get("isChecked")){
                optionValues = optionValues.push(v.get("value"))
            } 
        })
        return optionValues
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

            if(this.props.onValidate){
                this.props.onValidate(isSuccess)
            }
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

    onCheck: function(value) {
        let options = this.getOptions(value)
        let optionValues = this.getOptionsValue(options)

        if(this.props.onBinding){
            if(this.props.onBinding({isChecked: value.isChecked, options: options.toJS(), value: optionValues.toJS()})){
                this.setState({value: optionValues, options: options, isChange: true})
                this.onValidate(optionValues.count()>0)
                return true
            }else{
                return false
            }
        }else{
            this.setState({value: optionValues, options: options, isChange: true})
            this.onValidate(optionValues.count()>0)
            return true
        }
    },

    renderOptions: function(){
        let options = this.state.options.sort((v1,v2) => v1.get("sortorder", 0) < v2.get("sortorder", 0))
        options = options.map((v,k) => 
            <SxCheckBox key = { k }
            title = { v.get("text") }
            value = { v.get("value") }
            isChecked = { v.get("isChecked") }
            isDisabled = { this.state.isDisabled }
            onCheck = { this.onCheck } />
        )

        return options
    },

    render: function(){
        let cssClass = classNames({
            "sx-radio-box": true,
            "sx-radio-box-error": this.state.isChange && !this.state.isSuccess,
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
            {
                this.state.info != "" ? <span className="sx-info">{ this.state.info }</span> : ""
            }
        </div>
    }
})

export default SxCheckBoxGroup
