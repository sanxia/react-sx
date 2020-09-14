import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImageButton } from '../button'


/* ================================================================================
 * 图片复选框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxCheckBoxImageGroup extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            options: Immutable.fromJS(props.options),
            value: Immutable.fromJS(props.value),
            isDisabled: props.isDisabled,
            isChanged: false,
            isSuccess: true,
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({isDisabled: nextProps.isDisabled})

        this.checkOption(nextProps.options, nextProps.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.options, this.state.options)
        || !Immutable.is(nextState.value, this.state.value)
        || nextState.isDisabled != this.state.isDisabled
        || nextState.isChanged != this.state.isChanged
        || nextState.isSuccess !== this.state.isSuccess
        || nextState.isActive != this.state.isActive
        
        return isChanged
    }

    checkOption(options, value){
        options = Immutable.fromJS(options)
        let checkValue = Immutable.fromJS(value)

        if(checkValue.count() == 0){
            checkValue = this.getOptionsValue(options)
        }else{
            checkValue.forEach(function(v1, k2){
                options = options.map((v2, k2) => {
                    if(v2.get("value") == v1){
                        v2 = v2.set("isChecked", true)
                    }
                    return v2
                })
            })
        }

        this.setState({options: options})
        this.setState({value: checkValue})

        let isChecked = checkValue.count() > 0

        this.onValidate(isChecked)
    }

    getOptions(value){
        let options = this.state.options
        let optionValues = this.state.value

        if(value.isChecked){
            if(!optionValues.contains(value.tag)){
                optionValues = optionValues.push(value.tag)
            }
        }else{
            optionValues = optionValues.filter((v,k) => v != value.tag)
        }

        options = options.map((v, k) => {
            if(v.get("value") == value.tag){
                v = v.set("isChecked", v.isChecked)
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
    }

    getOptionsValue(options){
        let optionValues = Immutable.fromJS([])
        options.forEach(function(v, k){
            if(v.get("isChecked")){
                optionValues = optionValues.push(v.get("value"))
            } 
        })

        return optionValues
    }

    getValue(){
        return this.state.value
    }

    isChecked(){
        let options = this.state.options.filter( (v,k) => 
            v.get("isChecked") == true
        )
        return options.count() > 0 ? true : false
    }

    isValidate(){
        return this.state.isSuccess
    }

    onValidate = (isSuccess)=>{
        if(this.props.isRequire){
            this.setState({isSuccess: isSuccess})
        }
        
        if(this.props.onValidate){
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    }

    onMouseOver = (e)=>{
        this.setState({isActive: true})
    }

    onMouseOut = (e)=>{
        this.setState({isActive: false})

        let isChecked = this.isChecked()

        this.onValidate(isChecked)
    }

    onCheck = (value)=>{
        if(this.state.isDisabled) return true;

        let options = this.getOptions(value)
        let optionValues = this.getOptionsValue(options)

        if(this.props.onBinding){
            if(this.props.onBinding({tag: value.tag, value: optionValues.toJS()})){
                this.setState({value: optionValues, options: options, isChanged: true})
                this.onValidate(true)
                return true
            }else{
                return false
            }
        }else{
            this.setState({value: optionValues, options: options, isChanged: true})
            this.onValidate(true)
            return true
        }
    }

    renderHeader = ()=>{
        if(this.props.title){
            content = <div className = "sx-inpu-header">
                <span
                className = "sx-inpu-title"
                onClick = { (e)=>this.onMouseOver(e) }>
                    { this.props.title }
                </span>

                {
                    this.props.isRequir && <i className = "sx-input-require">*</i>
                }
            </div>
        }

        return null
    }

    renderOptions = ()=>{
        let options = this.state.options.sort((v1,v2) => v1.get("sortorder", 0) < v2.get("sortorder", 0))

        return options.map( (v,k) => 
            <SxImageButton key = { k }
            title = { v.get("text") }
            tag = { v.get("value") }
            images = { v.get("images", Immutable.fromJS([])).toJS() }
            isChecked = { v.get("isChecked") }
            isTracking = { true }
            isValidate = { v.get("isValidate", true) }
            onButton = { (value)=>this.onCheck(value) } />
        )
    }

    render = ()=>{
        let groupClass = classNames({
            "sx-radio-imgroup-box": true,
            "sx-radio-imgroup-box-error": this.state.isChanged && !this.state.isSuccess,
            "sx-radio-imgroup-box-active": this.state.isActive
        })

        return <div className = "sx-radio-imgroup">
            { this.renderHeader() }

            <div className = { groupClass }
            onMouseOver = { (e)=>this.onMouseOver(e) }
            onMouseOut = { (e)=>this.onMouseOut(e) }>
                { this.renderOptions() }
            </div>

        </div>
    }
}

SxCheckBoxImageGroup.propTypes = {
    title: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.array,
    isDisabled: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    onBinding: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxCheckBoxImageGroup.defaultProps = {
    title: "",
    options: [],
    value: [],
    isDisabled: false,
    isRequire: false,
    onBinding: null,
    onValidate: null
};

export default SxCheckBoxImageGroup
