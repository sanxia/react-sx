import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxSelect from './select'


/* ================================================================================
 * 下拉框集合组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxSelectGroup = React.createClass({
    propTypes: function(){
        return{
            title: React.PropTypes.string,
            captions: React.PropTypes.array,
            value: React.PropTypes.array,
            options: React.PropTypes.array,
            isDesc: React.PropTypes.bool,
            isRequire: React.PropTypes.bool,
        }
    },

    getDefaultProps: function() {
        return{
            title: "",
            captions: [],
            value: [],
            options: [],
            isDesc: true,
            isRequire: false,
            onBinding: null,
            onValidate: null
        }
    },

    getInitialState: function() {
        return {
            value: Immutable.fromJS(this.props.value),
            options: Immutable.fromJS(this.props.options),
            isChange: false,
            isSuccess: false,
            isActive: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState( {value: Immutable.fromJS(nextProps.value)} )
        this.setState( {options: Immutable.fromJS(nextProps.options)} )

        //接收属性时立即验证value是否有效
        let isSuccess = this.state.isSuccess
        if(this.props.isRequire){
            if(Immutable.fromJS(nextProps.value).filter((v,k)=> v == "").count() > 0){
                isSuccess = false 
            }else{
                isSuccess = true
            }
        }else{
            isSuccess = true
        }

        this.onValidate(isSuccess)
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.value, this.state.value)
        || !Immutable.is(nextState.options, this.state.options)
        || nextState.isChange != this.state.isChange
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isActive != this.state.isActive

        return isChanged
    },

    getValue:function(){
        return this.state.value.toJS();
    },

    isValidate:function(){
        return this.state.isSuccess
    },

    onValidate: function(isSuccess) {
        this.setState({isSuccess: isSuccess})

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
    },

    onBinding: function(data) {
        let newValue = this.state.value.set(data.index, data.value)
        let options = this.state.options.map((v,k)=>{
            return v.map((v,k)=>{
                if(data.index == k){
                    return v.set("isChecked", false)
                }
                return v
            })
        })

        this.setState({isChange: true})
        if(newValue.filter((v,k)=> v == "").count() > 0){
            this.setState({isSuccess: false})
        }else{
            this.setState({isSuccess: true})
        }

        this.setState({options: options, value: newValue})

        //派发绑定数据
        if(this.props.onBinding){
            if(this.props.onBinding(newValue.toJS())){
                return true
            }else{
                return false
            }
        }
       
        return true
    },

    renderSelects: function(){
        let options = this.state.options

        return options.map((v,k)=> <SxSelect
            key = { k }
            index = { k }
            caption = { Immutable.fromJS(this.props.captions).get(k, "") }
            value = { this.state.value.get(k, "") }
            options = { v }
            isDesc = { this.props.isDesc }
            isRequire = { this.props.isRequire }
            onBinding = { this.onBinding }
            onValidate = { this.onValidate } />
        )
    },

    render: function() {
        let title = this.props.title == "" ? "" : <span className = "sx-title">{ this.props.title }</span>

        let className = classNames({
            "sx-cascade": true,
            "sx-cascade-default": (this.state.isSuccess && !this.state.isActive) || !this.state.isChange,
            "sx-cascade-error": this.state.isChange && !this.state.isSuccess,
            "sx-cascade-active": (!this.state.isChange && this.state.isActive) || (this.state.isSuccess && this.state.isActive)
        })

        let selectItems = this.renderSelects()

        return <div className = "sx-select-group">
            { title }

            <div className = { className }
            onMouseOver = { this.onMouseOver }
            onMouseOut = { this.onMouseOut } >
                <div className = "sx-cascade-content">
                    { selectItems }
                </div>
                <div className = "sx-cascade-ext">
                    { this.props.children }
                </div>
            </div>
        </div>
    }
})

export default SxSelectGroup
