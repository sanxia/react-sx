import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import {SxBox} from '../box'


/* ================================================================================
 * 单行输入框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTextField = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            value: React.PropTypes.string,
            rows: React.PropTypes.number,
            placeholder: React.PropTypes.string,
            icons: React.PropTypes.array,
            info: React.PropTypes.string,
            titleColor: React.PropTypes.string,
            infoColor: React.PropTypes.string,
            type: React.PropTypes.string,
            regexp: React.PropTypes.string,
            minLength: React.PropTypes.number,
            maxLength: React.PropTypes.number,
            isPassword: React.PropTypes.bool,
            isAlpha: React.PropTypes.bool,
            isNumber: React.PropTypes.bool,
            isMobile: React.PropTypes.bool,
            isEmail: React.PropTypes.bool,
            isIdCard: React.PropTypes.bool,
            isChinese: React.PropTypes.bool,
            isRequire: React.PropTypes.bool,
            isHide: React.PropTypes.bool,
            isDisabled: React.PropTypes.bool,
            onCondition: React.PropTypes.func,
            onValue: React.PropTypes.func,
            onValidate: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            title: "",
            value: "",
            rows: 1,
            placeholder: "",
            icons: [],
            info: "",
            titleColor: "",
            infoColor: "",
            type: "",
            regexp: "",
            minLength: -1,
            maxLength: -1,
            isPassword: false,
            isAlpha: false,
            isNumber: false,
            isMobile: false,
            isEmail: false,
            isIdCard: false,
            isChinese: false,
            isRequire: false,
            isHide: false,
            isDisabled: false,
            onCondition: null,
            onValue: null,
            onValidate: null
        }
    },

    getInitialState: function(){
        return{
            value: this.props.value,
            rows: this.props.rows,
            info: this.props.info,
            titleColor: this.props.titleColor,
            infoColor: this.props.infoColor,
            type: this.props.type,
            isChange: false,
            isSuccess: false,
            isClear: false,
            isActive: false,
            isHide: this.props.isHide,
            isDisabled: this.props.isDisabled
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({value: nextProps.value})
        this.setState({rows: nextProps.rows})
        this.setState({info: nextProps.info})
        this.setState({titleColor: nextProps.titleColor})
        this.setState({infoColor: nextProps.infoColor})
        this.setState({type: nextProps.type})
        this.setState({isHide: nextProps.isHide})
        this.setState({isDisabled: nextProps.isDisabled})

        let isSuccess = this.onValidate(nextProps.value)
        if(this.props.onValidate){            
            this.props.onValidate(isSuccess)
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = true
        return isChange
    },

    componentWillUpdate: function(nextProps, nextState) {
        //alert("tet componentWillUpdate nextState: " + Immutable.fromJS(nextState))
    },

    componentDidUpdate: function(prevProps, prevState){
        if(this.props.onValidate){            
            this.props.onValidate(this.isValidate())
        }
    },

    componentWillMount: function(){
        //alert("tet componentWillMount state: " + Immutable.fromJS(this.state))
        let isSuccess = this.onValidate(this.state.value)
        this.setState({isSuccess: isSuccess})

        /*let isSuccess = this.onValidate(this.state.value)
        if(this.props.onValidate){            
            this.props.onValidate(isSuccess)
        }*/
    },

    componentDidMount: function(){

    },

    getValue: function(){
        return this.state.value
    },

    setValue: function(value){
        this.setState({value: value})
    },

    isValidate: function(){
        let isSuccess = this.__validate__(this.state.value)
        return isSuccess
    },

    onKeyUp: function(e){
        this.setState({isChange: true})
        let isSuccess = this.onValidate( e.target.value )
    },

    onChange: function(e){
        let value = e.target.value
        let isClear = value.length == 0 ? false : true
        
        if(this.props.onValue){
            this.props.onValue(value)

        }

        this.setState({value: value, isClear: isClear})
    },

    onMouseOver: function(e){     
        /*if(timer){
            clearTimeout(timer)
        }*/

        this.setState({isActive: true})
        this.refs.input.focus()
        /*if(this.state.value.length > 0){
            this.setState({isClear: true})
        } */
    },

    onMouseOut: function(e){
        /*e.stopPropagation();
        timer = (function(t){
            setTimeout(function(){
                t.onMouseOut2()
            }, 1000)
        })(this)*/
        this.setState({isActive: false})
        //this.setState({isClear: false})
        this.refs.input.blur()
    },

    onClear: function(e){
        /*
            { this.state.isClear ? <i className = "sx-input-clear" onClick = { this.onClear }></i> : "" }
        */
        let isClear = true
        if(this.props.onValue){
            if(this.props.onValue(value)){
                this.setState({value: value, isClear: isClear})
            }
        }else{
            this.setState({value: value, isClear: isClear})
        }
    },

    onValidate: function(value) {
        let isSuccess = this.__validate__(value)
        this.setState({isSuccess: isSuccess})
        return isSuccess
    },

    __validate__: function(value){
        let isSuccess = true

        if(this.props.isRequire){
            if(String(value).length == 0){
                return false
            }
        }

        if(isSuccess) {
            let pattern = ""
            if(this.props.regexp.length > 0){
                pattern = "^" + this.props.regexp + "$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isAlpha){
                //pattern = "^\\w+$"
                pattern = "^[a-zA-Z]{1}[a-zA-Z0-9_-]{0,}$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isNumber){
                pattern = "^\\d+$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if(isSuccess && this.props.isMobile){
                pattern = "^0?(\\d{2})?1[3|4|5|6|7|8|9][0-9]\\d{8}$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if(isSuccess && this.props.isEmail){
                pattern = "^[a-zA-Z0-9]{1}[a-zA-Z0-9_-]*@[a-zA-Z0-9]{1}[a-zA-Z0-9_-]+(\\.[a-zA-Z]+)+$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if(isSuccess && this.props.isIdCard){
                pattern = "^\\d{15}$|^\\d{18}$|^\\d{17}(\\d|X|x)$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if(isSuccess && this.props.isChinese){
                pattern = "^[\\u4E00-\\u9FFF]+$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess){
                let minLength = parseInt(this.props.minLength)
                let maxLength = parseInt(this.props.maxLength)
                if(minLength > 0 || maxLength > 0){
                    pattern = this.getPattern(".", minLength, maxLength)
                    isSuccess = new RegExp(pattern).test(value)
                }
            }
        }

        if(isSuccess && this.props.onCondition){
            isSuccess = this.props.onCondition(value)
        }
        
        return isSuccess
    },

    getPattern: function(pattern, minLength, maxLength) {
        if(minLength > 0 && maxLength > 0){
            pattern = pattern + "{" + minLength + "," + maxLength + "}"
        }else if(minLength > 0){
            pattern = pattern + "{" + minLength + ",}"
        }else if(maxLength > 0){
            pattern = pattern + "{0," + maxLength + "}"
        }else{
            pattern = pattern + "*"
        }
        return "^" + pattern + "$"
    },

    renderIcon: function(){
        let icon = ""
        if(this.props.icons.length == 0){
            return icon
        }

        let iconClass = this.props.icons[0]
        if(this.state.isActive){
            if(this.props.icons.length == 2){
                iconClass = this.props.icons[1]
            }
        }

        return <em className = "sx-view-icon">
            <i className = { iconClass } ></i>
        </em>
    },

    rednerExt: function(){
        let ext = ""
        if(!this.state.isChange){
            return ext
        }

        return <em className="sx-input-ext">
        {
            this.state.isSuccess ? this.state.value != "" ? <i className="sx-input-success"></i> : "" : <i className="sx-input-error"></i>
        }
        </em>
        
    },

    render: function() {
        let type = this.state.type
        let textFieldClass = classNames({
            "sx-input": true,
            "sx-hide": this.state.isHide
        })

        if(type != ""){
            type = "sx-" + type
            textFieldClass = textFieldClass + " " + type
        }

        let boxClass = classNames({
            "sx-input-box": true,
            "sx-input-box-error": this.state.isChange && !this.state.isSuccess,
            "sx-input-box-active": (this.state.isSuccess && this.state.isActive) || (!this.state.isChange && this.state.isActive)
        })

        let titleStyle = {}
        if(this.state.titleColor != ""){
            titleStyle["color"] = this.state.titleColor
        }

        let infoStyle = {}
        if(this.state.infoColor != ""){
            infoStyle["color"] = this.state.infoColor
        }

        let inputType = this.props.isPassword ? "password" : "text"
        let icon = this.renderIcon()
        let ext = this.rednerExt()
        let title = this.props.title == "" ? "" : <span className = "sx-title" style = { titleStyle } onClick = { this.onMouseOver }>{ this.props.title }</span>
        if( this.props.isRequire && this.props.title != "" ){
            title = <span className = "sx-title" style = { titleStyle } onClick = { this.onMouseOver }>{ this.props.title }<i>*</i></span>
        }

        return <div className = { textFieldClass }>
            {
                title
            }
            <div className = { boxClass } onMouseOver = { this.onMouseOver } onMouseOut = { this.onMouseOut }>
                { icon }       
                <span className = "sx-input-content">
                    {
                        this.state.isDisabled ?
                        this.state.rows > 1
                        ?
                        <textarea ref = "input"
                            value = { this.state.value }
                            rows = { this.state.rows }
                            placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
                            type = { inputType }
                            readonly = "true"
                            disabled = "disabled"
                            autocomplete = "off" 
                            onKeyUp = { this.onKeyUp }
                            onChange = { this.onChange } />
                        : 
                        <input ref = "input"
                        value = { this.state.value }
                        placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
                        type = { inputType }
                        readonly = "true"
                        disabled = "disabled"
                        autocomplete = "off" 
                        onKeyUp = { this.onKeyUp }
                        onChange = { this.onChange } />
                        :
                        this.state.rows > 1
                        ?
                        <textarea ref = "input"
                            value = { this.state.value }
                            rows = { this.state.rows }
                            placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
                            type = { inputType }
                            autocomplete = "off" 
                            onKeyUp = { this.onKeyUp }
                            onChange = { this.onChange } />
                        : 
                        <input ref = "input"
                        value = { this.state.value }
                        placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
                        type = { inputType }
                        autocomplete = "off" 
                        onKeyUp = { this.onKeyUp }
                        onChange = { this.onChange } />
                    }
                </span>

                { ext }

                { this.props.children }
            </div>
            {
                this.state.info != "" ? <span className = "sx-info" style = { infoStyle }>{ this.state.info }</span> : ""
            }
        </div>
    }
})

export default SxTextField
