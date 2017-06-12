import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { util } from '../util'


/* ================================================================================
 * 复选框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
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
            onSelectChange: React.PropTypes.func
        }
    },

    getDefaultProps: function() {
        return{
            title:"",
            value: "",
            isChecked: false,
            onSelectChange: null
        }
    },

    getInitialState: function() {
        return {
            value: this.props.value,
            isChecked: this.props.isChecked
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({value: nextProps.value})
        this.setState({isChecked: nextProps.isChecked})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        /*return nextState.value != this.state.value
        || nextState.isChecked != this.state.isChecked*/
        return true
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

    onSelectChange: function(e) {
        let isChecked = !this.state.isChecked
        if(this.props.onSelectChange){
            let targetValue = e.target.value
            let valueType = typeof this.state.value
            if(valueType == "boolean"){
                targetValue = util.toBool(targetValue)
            }
            if (this.props.onSelectChange({value:targetValue, isChecked:isChecked} )){
                this.setState({isChecked: isChecked})
            }
        }else{
            this.setState({isChecked: isChecked})
        }
    },

    render: function() {
        let className = classNames(
            {
                "sx-radio-option": true,
                "sx-radio-option-default": !this.state.isChecked,
                "sx-radio-option-checked": this.state.isChecked,
                "sx-radio-option-active": false
            }
        )

        let { id } = this.props
        if(id == undefined){
            id = "sx-" + util.getTick()
        }

        return <span className = { className } >
                <input id = { id }
                value = { this.state.value }
                type = "checkbox"
                checked = { this.state.isChecked }
                onChange = { this.onSelectChange } />
                <em>
                    <label htmlFor = { id }> { this.props.title } </label>
                </em>
        </span>
    }
})

export default SxCheckBox
