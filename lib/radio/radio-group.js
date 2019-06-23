import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxRadio from './radio'


/* ================================================================================
 * 单选框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxRadioGroup extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: props.value,
            options: Immutable.fromJS(props.options),
            isChanged: false,
            isActive: false,
            isSuccess: false
        }
    }

    componentWillReceiveProps(nextProps){
        //this.checkOption(nextProps.options, nextProps.value)
        this.setState({value: nextProps.value})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = nextState.value != this.state.value
        || !Immutable.is(nextState.options, this.state.options) 
        || nextState.isChanged != this.state.isChanged
        || nextState.isSuccess !== this.state.isSuccess
        || nextState.isActive != this.state.isActive

        return isChanged
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState){

    }

    componentWillMount(){
    }

    componentDidMount(){
        this.checkOption(this.state.options, this.state.value)
    }

    checkOption(options, value){
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
        if(this.props.onBinding){
            this.props.onBinding(checkValue)
        }
    }

    getOptions(value){
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
    }

    getOptionsValue(options){
        options = options.filter( (v,k) => 
            v.get("isChecked") == true
        )

        return options.count() > 0 ? options.first().get("value") : ""
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

            if(this.props.onValidate){
                this.props.onValidate(isSuccess)
            }
        }

        return isSuccess
    }

    onMouseOver = (e)=>{
        this.setState({isActive: true})
    }

    onMouseOut = (e)=>{
        this.setState({isActive: false})

        //let isChecked = this.isChecked()
        //this.onValidate(isChecked)
    }

    onSelect = (value)=>{
        let options = this.getOptions(value)
        let optionValue = this.getOptionsValue(options)

        if(this.props.onSelected){
            this.props.onSelected(optionValue)
        }

        if(this.props.onBinding){
            if(this.props.onBinding(optionValue)){
                this.setState({value:optionValue, options:options, isChanged:true})
                this.onValidate(true)

                return true
            }else{
                return false
            }
        }else{
            this.setState({value:optionValue, options:options, isChanged:true})
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

    renderRadios = ()=>{
        let options = this.state.options.sort((v1,v2) => v1.get("sortorder", 0) < v2.get("sortorder", 0))
        
        return options.map(
            (v,k)=> <SxRadio key = { k }
            title = { v.get("text") }
            value = { v.get("value", "") }
            isChecked = { v.get("isChecked", false) }
            isDisabled = { v.get("isDisabled", false) }
            onSelect = { (value)=>this.onSelect(value) } />
        )
    }

    render = ()=>{
        let groupClass = classNames({
            "sx-radio-box": !this.props.isRow,
            "sx-radio-box-row": this.props.isRow,
            "sx-radio-box-error": this.state.isChanged && !this.state.isSuccess,
            "sx-radio-box-active": this.state.isActive
        })

        let optionsClass = "sx-radio-content"
        let { className } = this.props
        if(className){
            optionsClass = optionsClass + " " + className 
        }

        return <div className = "sx-radio">

            { this.renderTitle() }

            <div className = { groupClass }
            onMouseOver = { (e)=>this.onMouseOver(e) }
            onMouseOut = { (e)=>this.onMouseOut(e) }>

                <span className = { optionsClass } >

                    { this.renderRadios() }

                </span>

                { this.props.children }

            </div>

        </div>
    }
}

SxRadioGroup.propTypes = {
    title: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ]),
    isRow: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    onBinding: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxRadioGroup.defaultProps = {
    title: "",
    options: [],
    value: "",
    isRow: false,
    isRequire: false,
    onBinding: null,
    onSelected: null,
    onValidate: null
};

export default SxRadioGroup
