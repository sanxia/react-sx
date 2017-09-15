import React, { Component } from 'react'
import Immutable from 'immutable'
import SxCascade from './cascade'


/* ================================================================================
 * 级联下拉框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxCascadeGroup = React.createClass({
    propTypes: function(){
        return{
            title: React.PropTypes.string,
            caption: React.PropTypes.string,
            data: React.PropTypes.array,
            value: React.PropTypes.array,
            isDesc: React.PropTypes.bool,
            isExpand: React.PropTypes.bool,
            isRequire: React.PropTypes.bool,
            onValidate: React.PropTypes.func
        }
    },

    getDefaultProps: function() {
        return {
            title: "",
            caption: "",
            data: [],
            value: [],
            isDesc: true,
            isExpand: false,
            isRequire: false,
            onValidate: null
        }
    },

    getInitialState: function() {
        return {
            data: Immutable.fromJS(this.props.data),
            value: Immutable.fromJS(this.props.value),
            isSuccess: false,
        }
    },

    componentWillReceiveProps: function (nextProps){
        //this.setState({data: Immutable.fromJS(nextProps.data)})
        this.setState({value: Immutable.fromJS(nextProps.value)})

        //let isSuccess = this.cascade.isValidate()
        //this.onValidate(isSuccess)

        if(this.props.isRequire){
            let isSuccess
            let values = Immutable.fromJS(nextProps.value).filter((v,k)=> v == "")
            if(values.count() > 0){
                isSuccess = false
            }else{
                isSuccess = true
            }

            this.onValidate(isSuccess)
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data)
        || !Immutable.is(nextState.value, this.state.value)
        || nextState.isSuccess != this.state.isSuccess
        return isChanged
    },

    componentWillUpdate: function(nextProps, nextState) {
    },

    componentDidUpdate: function(prevProps, prevState){
        //this.onValidate(this.state.isSuccess)
    },

    componentWillMount: function(){
    },

    componentDidMount: function(){
        this.onValidate(this.state.isSuccess)
    },

    getValue:function(){
        return this.state.value.toJS()
    },

    onValidate: function(isSuccess) {
        //alert("cascade-group onValidate isSuccess: " + isSuccess)
        if(this.props.isRequire){
            this.setState({isSuccess: isSuccess})
        }
        
        if(this.props.onValidate){
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    },

    onBinding: function(data) {
        data = Immutable.fromJS(data)
        if(this.props.onBinding){
            if(this.props.onBinding(data.toJS())){
                this.setState({value: data.get("value")})
                return true
            }else{
                return false
            }
        }else{
            this.setState({value: data.get("value")})
            return true
        }
        return true
    },

    render: function() {
        let title = this.props.title == "" ? "" : <span className = "sx-title" onClick = { this.onMouseOver }>{ this.props.title }</span>
        if( this.props.isRequire && this.props.title != "" ){
            title = <span className = "sx-title" onClick = { this.onMouseOver }>{ this.props.title }<i>*</i></span>
        }

        return (
            <div className = "sx-select-group">
                {
                    title
                }

                <SxCascade ref = {(cascade)=>{this.cascade=cascade}}
                    caption = { this.props.caption }
                    data = { this.state.data.toJS() }
                    value = { this.state.value.toJS() }
                    isDesc = { this.props.isDesc }
                    isExpand = { this.props.isExpand }
                    isRequire = { this.props.isRequire }
                    onBinding = { this.onBinding }
                    onValidate = { this.onValidate } >

                    { this.props.children }

                </SxCascade>
            </div>
        )
    }
})

export default SxCascadeGroup
