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
class SxCheckBoxGroup extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            options: Immutable.fromJS(props.options),
            value: Immutable.fromJS(props.value),
            info: props.info,
            isDisabled: props.isDisabled,
            isChange: false,
            isSuccess: true,
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({options: Immutable.fromJS(nextProps.options)})
        this.setState({value: Immutable.fromJS(nextProps.value)})
        this.setState({info: nextProps.info})
        this.setState({isDisabled: nextProps.isDisabled})

        this.checkOption(nextProps.options, nextProps.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.options, this.state.options)
        || !Immutable.is(nextState.value, this.state.value)
        || nextState.info != this.state.info
        || nextState.isDisabled != this.state.isDisabled
        || nextState.isChange != this.state.isChange
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
    }

    getOptions(value){
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

        let isChecked = this.isChecked()
        this.onValidate(isChecked)
    }

    onCheck = (value)=>{
        let options = this.getOptions(value)
        let optionValues = this.getOptionsValue(options)

        if(this.props.onBinding){
            if( this.props.onBinding({
                value: optionValues.toJS(),
                options: options.toJS(),
                isChecked: value.isChecked })
            ){
                this.setState({value: optionValues, options: options, isChange: true})
                this.onValidate(optionValues.count()>0)

                return true
            }else{
                return false
            }
        }else{
            this.setState({value: optionValues, options: options, isChange: true})
            this.onValidate( optionValues.count()>0 )

            return true
        }
    }

    renderTitle = ()=>{
        let content = ""

        if(this.props.title != ""){
            content = <span
            className = "sx-title"
            onClick = { (e)=>this.onMouseOver(e) }>
                { this.props.title }
            </span>

            if(this.props.isRequire){
                content = <span
                className = "sx-title"
                onClick = { (e)=>this.onMouseOver(e) }>
                    { this.props.title }
                    <i>*</i>
                </span>
            } 
        }

        return content
    }

    renderOptions = ()=>{
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
    }

    renderInfo = ()=>{
        let content = ""

        if(this.state.info != ""){
            content = <span className="sx-info">
                { this.state.info }
            </span>
        }

        return content
    }

    render = ()=>{
        let groupClass = classNames({
            "sx-radio-box": true,
            "sx-radio-box-error": this.state.isChange && !this.state.isSuccess,
            "sx-radio-box-active": this.state.isActive
        })

        return <div className = "sx-radio">
        
            { this.renderTitle() }

            <div className = { groupClass }
            onMouseOver = { (e)=>this.onMouseOver(e) }
            onMouseOut = { (e)=>this.onMouseOut(e) }>

                <span className = "sx-radio-content">
                    { this.renderOptions() }
                </span>

                { this.props.children }

            </div>

            { this.renderInfo() }

        </div>
    }
}

SxCheckBoxGroup.propTypes = {
    title: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.array,
    info: React.PropTypes.string,
    isDisabled: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    onBinding: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxCheckBoxGroup.defaultProps = {
    title: "",
    options: [],
    value: [],
    info: "",
    isDisabled: false,
    isRequire: false,
    onBinding: null,
    onValidate: null
};

export default SxCheckBoxGroup
