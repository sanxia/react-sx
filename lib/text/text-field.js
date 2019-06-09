import React, { Component } from 'react'
import Immutable from 'immutable'
import ClassNames from 'classnames'


/* ================================================================================
 * 单行输入框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTextField extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: props.value,
            rows: props.rows,
            info: props.info,
            titleColor: props.titleColor,
            infoColor: props.infoColor,
            type: props.type,
            isChange: false,
            isSuccess: this.__validate__(props.value),
            isClear: false,
            isActive: false,
            isHide: props.isHide,
            isDisabled: props.isDisabled
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value})
        this.setState({rows: nextProps.rows})
        this.setState({info: nextProps.info})
        this.setState({titleColor: nextProps.titleColor})
        this.setState({infoColor: nextProps.infoColor})
        this.setState({type: nextProps.type})
        this.setState({isHide: nextProps.isHide})
        this.setState({isDisabled: nextProps.isDisabled})

        this.onValidate(nextProps.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
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
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState){
    }

    componentDidMount(){
        this.onValidate(this.state.value)
    }

    forceRefresh(){
        this.forceUpdate()
    }

    isValidate(){
        return this.state.isSuccess
    }

    getValue(){
        return this.state.value
    }

    setValue(value){
        this.setState({value: value})
    }

    onKeyUp(e){
        this.setState({isChange: true})
    }

    onChange(e){
        let value = e.target.value
        let isClear = value.length == 0 ? false : true

        this.setState({value: value, isClear: isClear})

        if(this.props.onBinding){
            this.props.onBinding(value)
        }

        this.onValidate(e.target.value)
    }

    onMouseOver(e){     
        this.setState({isActive: true})
        this.textInput.focus()
    }

    onMouseOut(e){        
        this.setState({isActive: false})
        this.textInput.blur()
    }

    onClear(e){
        let value = ""
        if(this.props.onBinding){
            if(this.props.onBinding(value)){
                this.setState({value: value, isClear: true})
            }
        }else{
            this.setState({value: value, isClear: true})
        }
    }

    onValidate(value) {
        let isSuccess = this.__validate__(value)
        if(isSuccess && this.props.onCondition){
            isSuccess = this.props.onCondition(value)
        }

        this.setState({isSuccess: isSuccess})

        if(this.props.onValidate){            
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    }

    __validate__(value){
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
                pattern = "^[a-zA-Z]*$"
                isSuccess = new RegExp(pattern).test(value)
            }

            if (isSuccess && this.props.isVariable){
                if(value != ""){
                    pattern = "^[a-zA-Z]{1}[a-zA-Z0-9_]*$"
                    isSuccess = new RegExp(pattern).test(value)
                }
            }

            if (isSuccess && this.props.isNumber){
                if(value != ""){
                    pattern = "^\\d+$"
                    isSuccess = new RegExp(pattern).test(value)
                }
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

            if(isSuccess && this.props.isTelphone && this.props.isMobile){
                pattern = "^0?(\\d{2})?0?(\\d{3})?[-]?\\d{7,8}$"
                isSuccess = new RegExp(pattern).test(value)

                if(!isSuccess){
                    pattern = "^0?(\\d{2})?1[3|4|5|6|7|8|9][0-9]\\d{8}$"
                    isSuccess = new RegExp(pattern).test(value)
                }
            }else{
                if(isSuccess && this.props.isTelphone){
                    pattern = "^0?(\\d{2})?0?(\\d{3})?[-]?\\d{7,8}$"
                    isSuccess = new RegExp(pattern).test(value)
                }

                if(isSuccess && this.props.isMobile){
                    pattern = "^0?(\\d{2})?1[3|4|5|6|7|8|9][0-9]\\d{8}$"
                    isSuccess = new RegExp(pattern).test(value)
                    
                    console.log(pattern)
                    console.log(isSuccess)
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
                    isSuccess = new RegExp(pattern, "mg").test(value)
                }
            }
        }
        
        return isSuccess
    }

    getPattern(pattern, minLength, maxLength) {
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
    }

    renderTitle = ()=>{
        let content = ""
        if(this.props.title != ""){
            let title = this.props.title
            if(this.props.isRequire){
                title += "<i>*</i>"
            }

            let titleStyle = {}
            if(this.state.titleColor != ""){
                titleStyle["color"] = this.state.titleColor
            }

            content = <span
            dangerouslySetInnerHTML = {{__html: title}}
            className = "sx-title"
            style = { titleStyle }
            onClick = { ()=>this.onMouseOver() } />
        }

        return content
    }

    renderIcon = ()=>{
        if(this.props.icons.length == 0){
            return ""
        }

        let iconClass = this.props.icons[0]
        if(this.state.isActive){
            if(this.props.icons.length == 2){
                iconClass = this.props.icons[1]
            }
        }

        return <em className = "sx-input-icon">
            <i className = { iconClass } ></i>
        </em>
    }

    renderTextArea = ()=>{
        if(this.state.isDisabled){
            return <textarea
            ref = { (textInput)=>this.textInput = textInput }
            value = { this.state.value }
            rows = { this.state.rows }
            placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
            readonly = "true"
            disabled = "disabled"
            autocomplete = "off" 
            onKeyUp = { (e)=>this.onKeyUp(e) }
            onChange = { (e)=>this.onChange(e) } />
        }

        return <textarea
        ref = { (textInput)=>this.textInput = textInput }
        value = { this.state.value }
        rows = { this.state.rows }
        placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
        autocomplete = "off" 
        onKeyUp = { (e)=>this.onKeyUp(e) }
        onChange = { (e)=>this.onChange(e) } />
    }

    renderTextInput = ()=>{
        let inputType = this.props.isPassword ? "password" : "text"
        if(this.state.isDisabled){
            return <input
            ref = { (textInput)=>this.textInput = textInput }
            value = { this.state.value }
            placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
            type = { inputType }
            readonly = "true"
            disabled = "disabled"
            autocomplete = "off" 
            onKeyUp = { (e)=>this.onKeyUp(e) }
            onChange = { (e)=>this.onChange(e) } />
        }

        return <input
        ref = { (textInput)=>this.textInput = textInput }
        value = { this.state.value }
        placeholder = { this.props.placeholder != "" ? this.props.placeholder : this.props.title }
        type = { inputType }
        autocomplete = "off" 
        onKeyUp = { (e)=>this.onKeyUp(e) }
        onChange = { (e)=>this.onChange(e) } />
    }

    renderClear = ()=>{
        let content = ""
        if(this.state.isClear && this.state.value != "" && !this.state.isDisabled){
            content = <i className = "sx-input-clear"
            title = "清除"
            onClick = { (e)=>this.onClear(e) } />
        }

        return content
    }

    renderExt = ()=>{
        if(!this.state.isChange || !this.props.isExt){
            return ""
        }

        return <em className="sx-input-ext">
        {
            this.state.isSuccess ? this.state.value != "" ? <i className="sx-input-success"></i> : "" : <i className="sx-input-error"></i>
        }
        </em>
    }

    renderInfo = ()=>{
        let content = ""
        let infoStyle = {}
        if(this.state.infoColor != ""){
            infoStyle["color"] = this.state.infoColor
        }

        if(this.state.info != ""){
            content = <div
            dangerouslySetInnerHTML = {{__html: this.state.info}}
            className = "sx-info"
            style = { infoStyle } />
        }

        return content 
    }

    render = ()=>{
        let type = this.state.type
        let inputBoxClass = ClassNames({
            "sx-input": true,
            "sx-hide": this.state.isHide
        })

        if(type != ""){
            type = "sx-" + type
            inputBoxClass = inputBoxClass + " " + type
        }

        let inputContentClass = ClassNames({
            "sx-input-box": true,
            "sx-input-box-error": this.state.isChange && !this.state.isSuccess,
            "sx-input-box-active": (this.state.isSuccess && this.state.isActive) || (!this.state.isChange && this.state.isActive)
        })

        return <div className = { inputBoxClass }>
            { this.renderTitle() }

            <div className = { inputContentClass }
            onMouseOver = { (e)=>this.onMouseOver(e) }
            onMouseOut = { (e)=>this.onMouseOut(e) }>
                { this.renderIcon() }  

                <div className = "sx-input-content">
                {
                    this.state.rows > 1 ? this.renderTextArea(): this.renderTextInput()
                }
                </div>

                { this.renderClear() }

                { this.renderExt() }

                { this.props.children }
            </div>

            { this.renderInfo() }
        </div>
    }

}

SxTextField.propTypes = {
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
    isExt: React.PropTypes.bool,
    isHide: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    onBinding: React.PropTypes.func,
    onCondition: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxTextField.defaultProps = {
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
    isExt: true,
    isHide: false,
    isDisabled: false,
    onBinding: null,
    onCondition: null,
    onValidate: null
};

export default SxTextField
