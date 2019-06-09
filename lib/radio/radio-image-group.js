import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImageButton } from '../button'


/* ================================================================================
 * 单选图片框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxRadioImageGroup extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            options: Immutable.fromJS(props.options),
            value: props.value,
            isChanged: false,
            isSuccess: true,
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps){
        let options = Immutable.fromJS(nextProps.options)
        let checkValue = nextProps.value
        
        if(checkValue == ""){
            checkValue = this.getOptionsValue(options)
        }

        if(checkValue != ""){
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

        let isChecked = checkValue != ""
        this.onValidate(isChecked)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.options, this.state.options)
        || nextState.value != this.state.value
        || nextState.isChanged != this.state.isChanged
        || nextState.isSuccess !== this.state.isSuccess
        || nextState.isActive != this.state.isActive

        return isChanged
    }

    getOptions(value){
        let options = this.state.options
        let optionValue = value.tag

        options = options.map((v, k) => {
            if(v.get("value") == optionValue){
                v = v.set("isChecked", true)
            }else{
                v = v.set("isChecked", false)
            }
            return v
        })

        return options
    }

    getOptionsValue(options){
        let selectItems = options.filter( (v,k) => 
            v.get("isChecked") == true
        )

        return selectItems.count() > 0 ? selectItems.first().get("value") : ""
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
        if(this.props.isTracking){
            this.setState({isActive: true})
        }
    }

    onMouseOut = (e)=>{
        if(this.props.isTracking){
            this.setState({isActive: false})
        }

        let isChecked = this.isChecked()
        this.onValidate(isChecked)
    }

    onSelectChange = (value)=>{
        let options = this.getOptions(value)
        let optionValue = this.getOptionsValue(options)

        if(this.props.onValue){
            if( this.props.onValue(optionValue) ){
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
    }

    renderTitle = ()=>{
        let title = ""

        if(this.props.title != ""){
            title = <span
            className = "sx-title"
            onClick = { (e)=>this.onMouseOver(e) }>
                { this.props.title }
            </span>

            if(this.props.isRequire){
                title = <span
                className = "sx-title"
                onClick = { (e)=>this.onMouseOver(e) }>
                    { this.props.title }<i>*</i>
                </span>
            }
        }

        return title
    }

    renderOptions = ()=>{
        let options = this.state.options.sort((v1,v2) => v1.get("sortorder", 0) < v2.get("sortorder", 0))

        return options.map(
            (v,k)=> <SxImageButton
            key = { k }
            title = { v.get("text") }
            tag = { v.get("value") }
            images = { v.get("images", Immutable.fromJS([])).toJS() }
            isChecked = { v.get("isChecked", false) }
            isTracking = { this.props.isTracking }
            isValidate = { v.get("isValidate", true) }
            onButton = { (value)=>this.onSelectChange(value) } />
        )
    }

    render = ()=>{
        let optionsClass = classNames({
            "sx-radio-imgroup-box": true,
            "sx-radio-imgroup-box-error": this.state.isChanged && !this.state.isSuccess,
            "sx-radio-imgroup-box-active": this.state.isActive
        })

        return <div className = "sx-radio-imgroup">
            { this.renderTitle() }

            <div className = { optionsClass }
            onMouseOver = { (e)=>this.onMouseOver(e) }
            onMouseOut = { (e)=>this.onMouseOut(e) }>
                { this.renderOptions() }
            </div>

        </div>
    }
}

SxRadioImageGroup.propTypes = {
    title: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ]),
    isTracking: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    onValue: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxRadioImageGroup.defaultProps = {
    title: "",
    options: [],
    value: "",
    isTracking: false,
    isRequire: false,
    onValue: null,
    onValidate: null
};

export default SxRadioImageGroup
