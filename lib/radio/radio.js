import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { util } from '../util'


/* ================================================================================
 * 单选框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxRadio extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: props.value,
            isChecked: props.isChecked,
            isEnabled: props.isEnabled
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value})
        this.setState({isChecked: nextProps.isChecked})
        this.setState({isEnabled: nextProps.isEnabled})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value
        || nextState.isChecked !== this.state.isChecked
        || nextState.isEnabled !== this.state.isEnabled
    }

    getValue(){
        return this.state.value
    }

    isChecked(){
        return this.state.isChecked
    }

    onSelectChange = (e)=>{
        if(!this.state.isEnabled){
            return false
        }

        let isChecked = !this.state.isChecked
        if(this.props.onSelectChange){
            let targetValue = e.target.value
            let valueType = typeof this.state.value

            if(valueType == "boolean"){
                targetValue = util.toBool(targetValue)
            }
            
            if (this.props.onSelectChange({value: targetValue, isChecked: isChecked})){
                this.setState({isChecked: isChecked})
            }
        }else{
            this.setState({isChecked: isChecked})
        }
    }

    render = ()=>{
        let className = classNames({
            "sx-radio-option": true,
            "sx-radio-option-default": !this.state.isChecked,
            "sx-radio-option-checked": this.state.isChecked,
            "sx-radio-option-active": false
        })

        let { id } = this.props
        if(id == undefined){
            id = "sx-" + util.getTick() + "-" + this.state.value
        }

        return <span className = { className } >
            <input
            id = { id }
            value = { this.state.value }
            type = "radio"
            checked = { this.state.isChecked } 
            onChange = { (e)=>this.onSelectChange(e) } />
            <em>
                <label htmlFor = { id }> { this.props.title } </label>
            </em>
        </span>
    }
}

SxRadio.propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
    ]),
    isChecked: React.PropTypes.bool,
    isEnabled: React.PropTypes.bool,
    onSelectChange: React.PropTypes.func
};

SxRadio.defaultProps = {
    title:"",
    value: "",
    isChecked: false,
    isEnabled: true,
    onSelectChange: null
};

export default SxRadio
