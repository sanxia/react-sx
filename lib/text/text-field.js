import React, { Component } from 'react'
import Immutable from 'immutable'
import ClassNames from 'classnames'
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
            isVariable: React.PropTypes.bool,
            isNumber: React.PropTypes.bool,
            isSignedNumber: React.PropTypes.bool,
            isRealNumber: React.PropTypes.bool,
            isSignedRealNumber: React.PropTypes.bool,
            isTelphone: React.PropTypes.bool,
            isMobile: React.PropTypes.bool,
            isEmail: React.PropTypes.bool,
            isIdCard: React.PropTypes.bool,
            isChinese: React.PropTypes.bool,
            isRequire: React.PropTypes.bool,
            isHide: React.PropTypes.bool,
            isDisabled: React.PropTypes.bool,
            onBinding: React.PropTypes.func,
            onCondition: React.PropTypes.func,
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
            isAlphaNumber: false,
            isVariable: false,
            isNumber: false,
            isSignedNumber: false,
            isRealNumber: false,
            isSignedRealNumber: false,
            isTelphone: false,
            isMobile: false,
            isEmail: false,
            isIdCard: false,
            isChinese: false,
            isRequire: false,
            isHide: false,
            isDisabled: false,
            onBinding: null,
            onCondition: null,
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
            isSuccess: this.__validate__(this.props.value),
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

        this.onValidate(nextProps.value)
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = nextState.value != this.state.value
        || nextState.rows != this.state.rows
        || nextState.info != this.state.info
        || nextState.titleColor != this.state.titleColor
        || nextState.infoColor != this.state.infoColor
        || nextState.type != this.state.type
        || nextState.isChange != this.state.isChange
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isClear != this.state.isClear
        || nextState.isActive != this.state.isActive
        || nextState.isHide != this.state.isHide
        || nextState.isDisabled != this.state.isDisabled

        return isChanged
    },

    componentWillUpdate: function(nextProps, nextState) {
    },

    componentDidUpdate: function(prevProps, prevState){
    },

    componentWillMount: function(){
    },

    componentDidMount: function(){
        this.onValidate(this.state.value)
    },

    forceRefresh:function(){
        this.forceUpdate()
    },

    isValidate: function(){
        return this.state.isSuccess
    },

    getValue: function(){
        return this.state.value
    },

    setValue: function(value){
        this.setState({value: value})
    },

    onKeyUp: function(e){
        this.setState({isChange: true})
    },

    onChange: function(e){
        let value = e.target.value
        let isClear = value.length == 0 ? false : true

        this.setState({value: value, isClear: isClear})

        if(this.props.onBinding){
            this.props.onBinding(value)
        }

        this.onValidate(e.target.value)
    },

    onMouseOver: function(e){     
        /*if(timer){
            clearTimeout(timer)
        }*/

        this.setState({isActive: true})
        //this.refs.input.focus()

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
        //this.refs.input.blur()
    },

    onClear: function(e){
        /*
            { this.state.isClear ? <i className = "sx-input-clear" onClick = { this.onClear }></i> : "" }
        */
        let isClear = true
        if(this.props.onBinding){
            if(this.props.onBinding(value)){
                this.setState({value: value, isClear: isClear})
            }
        }else{
            this.setState({value: value, isClear: isClear})
        }
    },

    onValidate: function(value) {
        let isSuccess = this.__validate__(value)
        
        if(isSuccess && this.props.onCondition){
            isSuccess = this.props.onCondition(value)
        }

        this.setState({isSuccess: isSuccess})

        if(this.props.onValidate){            
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    },

    __validate__: function(value){
        let isSuccess = true

        if(this.props.isRequire){
            if(String(value).replace(/\\s+/gm, "").length == 0){
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
                pattern = "^[a-zA-Z]*$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isVariable){
                pattern = "^[a-zA-Z]{1}[a-zA-Z0-9_]*$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isNumber){
                pattern = "^\\d+$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isSignedNumber){
                pattern = "^[+-]?\\d+$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isRealNumber){
                pattern = "^\\d+\.?\\d*$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isSignedRealNumber){
                pattern = "^[+-]?\\d+\.?\\d*$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if(isSuccess){
                if(this.props.isTelphone && this.props.isMobile){
                    pattern = "^0?(\\d{2})?0?(\\d{3})?[-]?\\d{7,8}$"
                    isSuccess = new RegExp(pattern).test(value)

                    if(!isSuccess){
                        pattern = "^0?(\\d{2})?1[3|4|5|6|7|8|9][0-9]\\d{8}$"
                        isSuccess = new RegExp(pattern).test(value)
                    }
                }
            }else{
                if(isSuccess && this.props.isTelphone){
                    pattern = "^0?(\\d{2})?0?(\\d{3})?[-]?\\d{7,8}$"
                    isSuccess = new RegExp(pattern).test(value)
                }

                if(isSuccess && this.props.isMobile){
                    pattern = "^0?(\\d{2})?1[3|4|5|6|7|8|9][0-9]\\d{8}$"
                    isSuccess = new RegExp(pattern).test(value)
                }
            }

            if(isSuccess && this.props.isEmail){
                pattern = "^[a-zA-Z0-9]{1}[a-zA-Z0-9_-]*@[a-zA-Z0-9]{1}[a-zA-Z0-9_-]*(\\.[a-zA-Z]+)+$"
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
                    isSuccess = new RegExp(pattern, "gm").test(value)
                }
            }
        }

        /*if(isSuccess && this.props.onCondition){
            isSuccess = this.props.onCondition(value)
        }

        this.setState({isSuccess: isSuccess})*/
        
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
        let textFieldClass = ClassNames({
            "sx-input": true,
            "sx-hide": this.state.isHide
        })

        if(type != ""){
            type = "sx-" + type
            textFieldClass = textFieldClass + " " + type
        }

        let boxClass = ClassNames({
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
        let txtTitle = this.props.title

        let title = txtTitle == "" ? "" : <span dangerouslySetInnerHTML = {{__html: txtTitle}} className = "sx-title" style = { titleStyle } onClick = { this.onMouseOver } />
        if( this.props.isRequire && txtTitle != "" ){
            txtTitle += "<i>*</i>"
            title = <span dangerouslySetInnerHTML = {{__html: txtTitle}} className = "sx-title" style = { titleStyle } onClick = { this.onMouseOver } />
        }

        return <div className = { textFieldClass }>
            { title }
            <div className = { boxClass } onMouseOver = { this.onMouseOver } onMouseOut = { this.onMouseOut }>
                { icon }       
                <p className = "sx-input-content">
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
                </p>
                { ext }
                { this.props.children }
            </div>
            {
                this.state.info != "" ? <div dangerouslySetInnerHTML = {{__html: this.state.info}} className = "sx-info" style = { infoStyle } /> : ""
            }
        </div>
    }
})

export default SxTextField
