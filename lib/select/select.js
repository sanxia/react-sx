import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * 下拉选择框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxSelect extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            index: props.index,
            value: props.value,
            isChange: false,
            isSuccess: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({index: nextProps.index})
        this.setState({value: nextProps.value})

        this.onValidate(nextProps.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(Immutable.fromJS(nextProps.options), Immutable.fromJS(this.props.options))
        || nextState.index != this.state.index
        || nextState.value != this.state.value
        || nextState.isChange !== this.state.isChange
        || nextState.isSuccess !== this.state.isSuccess

        return isChanged
    }

    getValue(){
        let value = this.defaultValue()
        return value
    }

    defaultValue(){
        let options = this.getOptions()

        //如果未提供value，则返回第一个选项的value
        let defaultValue = this.state.value.length == 0 ? options.first().get("value", "") : this.state.value

        return defaultValue
    }

    sortorder(options){
        //排序
        options = options.sort((v1,v2) => {
            return this.props.isDesc ? v1.get("sortorder") < v2.get("sortorder") : v1.get("sortorder") > v2.get("sortorder")
            }
        )

        return options
    }

    getOptions(){
        //选项排序
        let options = this.sortorder(Immutable.fromJS(this.props.options))

        //选中项处理
        let isFound = false
        options = options.map( (v,i)=>{
            if(!isFound){
                let isChecked = this.state.value.toString().length > 0 ? v.get("value") == this.state.value : v.get("isChecked", false)
                if(isChecked){
                    isFound = true
                }

                return v.set("isChecked", isChecked)
            }

            return v.set("isChecked", false)
        })

        if(this.props.caption.length > 0) {
            //添加选择提示项
            let captionItem = {
                text: this.props.caption,
                value: "",
                sortorder: options.count() == 0 ? 0 : this.props.isDesc ? options.first().get("sortorder") + 1 : options.first().get("sortorder") - 1,
                isChecked: !isFound
            }

            options = options.unshift(Immutable.fromJS(captionItem))
        }else{
            //如果无提示项且未有选中项，则默认第一个选中
            if(!isFound) options = options.setIn([0, "isChecked"], true)
        }

        return options
    }

    isValidate(){
        return this.state.isSuccess
    }

    onBinding = (e)=>{
        if(this.props.isDisabled){
            return
        }

        let value = e.target.value

        if(this.props.onSelected){
            this.props.onSelected({index:this.state.index, value:value})
        }

        if(this.props.onBinding){
            if(this.props.onBinding({index:this.state.index, value:value})){
                this.setState({isChange:true, value:value})
                this.onValidate(value)
            }
        }else{
            this.setState({isChange:true, value:value})
            this.onValidate(value)
        }
    }

    onValidate = (value)=>{
        let isSuccess =  this.state.isSuccess
        if(this.props.isRequire){
            isSuccess = value.length == 0 ? false : true
            //this.setState({isSuccess: isSuccess})
        }else{
            isSuccess = true
        }

        this.setState({isSuccess:isSuccess})

        if(this.props.onValidate){
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    }

    renderHeading = ()=>{
        var headingContent = ""

        if(this.props.onHeading){
            headingContent = this.props.onHeading()
        }

        if(headingContent == ""){
            return ""
        }

        return <div className = "sx-box sx-box-r sx-box-csc sx-select-heading">
            { headingContent }
        </div>
    }

    renderOptions = (options)=>{
        return options.map((v,k)=>
            <option
            key = { k }
            value = { v.get("value", "") }>
                { v.get("text", "") }
            </option>
        )
    }

    renderTailing = ()=>{
        var tailContent = ""

        if(this.props.onTailing){
            tailContent = this.props.onTailing()
        }

        if(tailContent == ""){
            return ""
        }

        return <div
        className = "sx-box sx-box-r sx-box-csc sx-select-tailing">
            { tailContent }
        </div>
    }

    render = ()=>{
        let optionDatas = this.getOptions()
        let options = this.renderOptions(optionDatas)
        let heading = this.renderHeading()
        let tailing = this.renderTailing()

        let selectClassName = "sx-select"
        if(this.props.isDisabled){
            selectClassName += " sx-select-disabled"
        }

        return <div className="sx-box sx-box-r sx-box-rsl sx-box-csc sx-select-wrap">
            { heading }

            <select
            { ...this.props }
            className = { selectClassName }
            value = { optionDatas.filter((v,k) => v.get("isChecked")).getIn([0,"value"]) }
            onChange = { (e)=>this.onBinding(e) }>
                { options }
            </select>

            { tailing }
        </div>
    }
}

SxSelect.propTypes = {
    caption: React.PropTypes.string,
    value: React.PropTypes.string,
    options: React.PropTypes.array,
    isDesc: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    onHeading: React.PropTypes.func,
    onTailing: React.PropTypes.func,
    onBinding: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxSelect.defaultProps = {
    index: -1,
    caption: "",
    value: "",
    options: [],
    isDesc: true,
    isRequire: false,
    isDisabled: false,
    onHeading: null,
    onTailing: null,
    onBinding: null,
    onSelected: null,
    onValidate: null
};

export default SxSelect
