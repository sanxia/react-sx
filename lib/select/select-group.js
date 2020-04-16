import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxSelect from './select'


/* ================================================================================
 * 下拉框集合组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxSelectGroup extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: Immutable.fromJS(props.value),
            options: Immutable.fromJS(props.options),
            isChange: false,
            isSuccess: false,
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState( {value: Immutable.fromJS(nextProps.value)} )
        this.setState( {options: Immutable.fromJS(nextProps.options)} )

        //接收属性时立即验证value是否有效
        let isSuccess = this.state.isSuccess
        if(this.props.isRequire){
            if(Immutable.fromJS(nextProps.value).filter((v,k)=> v == "").count() > 0){
                isSuccess = false 
            }else{
                isSuccess = true
            }
        }else{
            isSuccess = true
        }

        this.onValidate(isSuccess)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.value, this.state.value)
        || !Immutable.is(nextState.options, this.state.options)
        || nextState.isChange != this.state.isChange
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isActive != this.state.isActive

        return isChanged
    }

    getValue(){
        return this.state.value.toJS();
    }

    isValidate(){
        return this.state.isSuccess
    }

    onValidate = (isSuccess)=>{
        this.setState({isSuccess: isSuccess})

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
    }

    onBinding = (data)=>{
        let newValue = this.state.value.set(data.index, data.value)
        if(data.index == 0){
            //如果是第一个被选择，则其它项都重置为空
            newValue = newValue.map((v,k)=>{
                if(k != 0){
                    return ""
                }else{
                    return v
                }
            })
        }

        let options = this.state.options.map((v,k)=>{
            return v.map((v,k)=>{
                if(data.index == k){
                    return v.set("isChecked", false)
                }
                return v
            })
        })

        this.setState({isChange: true})

        if(newValue.filter((v,k)=> v == "").count() > 0){
            this.setState({isSuccess: false})
        }else{
            this.setState({isSuccess: true})
        }

        this.setState({options: options, value: newValue})

        //派发绑定数据
        if(this.props.onBinding){
            if(this.props.onBinding(newValue.toJS())){
                return true
            }else{
                return false
            }
        }
       
        return true
    }

    renderTitle = ()=>{
        let title = ""
        if(this.props.title != ""){
            title = <span className = "sx-title">{ this.props.title }</span>
            
            if(this.props.isRequire){
                title = <span className = "sx-title">{ this.props.title }<i>*</i></span>
            }
        }

        return title
    }

    renderSelects = ()=>{
        return this.state.options.map(
            (v, k)=> <SxSelect
            key = { k }
            index = { k }
            caption = { Immutable.fromJS(this.props.captions).get(k, "") }
            value = { this.state.value.get(k, "") }
            options = { v }
            isDesc = { this.props.isDesc }
            isRequire = { this.props.isRequire }
            isDisabled = { this.props.isDisabled }
            onBinding = { (data)=>this.onBinding(data) }
            onValidate = { (isSuccess)=>this.onValidate(isSuccess) } />
        )
    }

    render = ()=>{
        let className = classNames({
            "sx-cascade": true,
            "sx-cascade-default": (this.state.isSuccess && !this.state.isActive) || !this.state.isChange,
            "sx-cascade-error": this.state.isChange && !this.state.isSuccess,
            "sx-cascade-active": (!this.state.isChange && this.state.isActive) || (this.state.isSuccess && this.state.isActive)
        })

        return <div className = "sx-select-group">
            { this.renderTitle() }

            <div className = { className }
            onMouseOver = { (e)=>this.onMouseOver(e) }
            onMouseOut = { (e)=>this.onMouseOut(e) } >
                <div className = "sx-cascade-content">
                    { this.renderSelects() }
                </div>

                {
                    React.Children.count > 0 && <div className = "sx-cascade-ext">
                        { this.props.children }
                    </div>
                }
            </div>
        </div>
    }
}

SxSelectGroup.propTypes = {
    title: React.PropTypes.string,
    captions: React.PropTypes.array,
    value: React.PropTypes.array,
    options: React.PropTypes.array,
    isDesc: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool
};

SxSelectGroup.defaultProps = {
    title: "",
    captions: [],
    value: [],
    options: [],
    isDesc: true,
    isRequire: false,
    isDisabled: false,
    onBinding: null,
    onValidate: null
};

export default SxSelectGroup
