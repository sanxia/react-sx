import React, { Component } from 'react'
import Immutable from 'immutable'
import SxCascade from './cascade'


/* ================================================================================
 * 级联下拉框组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxCascadeGroup extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            data: Immutable.fromJS(props.data),
            value: Immutable.fromJS(props.value),
            isSuccess: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: Immutable.fromJS(nextProps.value)})

        if(this.props.isRequire){
            let values = Immutable.fromJS(nextProps.value).filter((v, k)=> v == "")

            this.onValidate(values.count() == 0)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data)
        || !Immutable.is(nextState.value, this.state.value)
        || nextState.isSuccess != this.state.isSuccess

        return isChanged
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState){
    }

    componentWillMount(){
    }

    componentDidMount(){
        this.onValidate(this.state.isSuccess)
    }

    getValue(){
        return this.state.value.toJS()
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

    onBinding = (data)=>{
        data = Immutable.fromJS(data)

        if(this.props.onBinding){
            if(this.props.onBinding(data.toJS())){
                this.setState({value: data.get("value")})

                return true
            }else{
                return false
            }
        }else{
            this.setState({value: data.get("value")})
            return true
        }

        return true
    }

    renderTitle = ()=>{
        let content = ""

        if(this.props.title != ""){
            content = <span className = "sx-title"
            onClick = { (e)=>this.onMouseOver(e) }>
                { this.props.title }
            </span>

            if(this.props.isRequire){
                content = <span className = "sx-title"
                onClick = { (e)=>this.onMouseOver(e) }>
                    { this.props.title }
                    <i>*</i>
                </span>
            }
        }

        return content
    }

    render = ()=>{
        return (
            <div className = "sx-select-group">

                { this.renderTitle() }

                <SxCascade ref = {(cascade)=>{this.cascade=cascade}}
                    caption = { this.props.caption }
                    data = { this.state.data.toJS() }
                    value = { this.state.value.toJS() }
                    isDesc = { this.props.isDesc }
                    isExpand = { this.props.isExpand }
                    isRequire = { this.props.isRequire }
                    onBinding = { (data)=>this.onBinding(data) }
                    onValidate = { (isSuccess)=>this.onValidate(isSuccess) } >

                    { this.props.children }

                </SxCascade>

            </div>
        )
    }
}

SxCascadeGroup.propTypes = {
    title: React.PropTypes.string,
    caption: React.PropTypes.string,
    data: React.PropTypes.array,
    value: React.PropTypes.array,
    isDesc: React.PropTypes.bool,
    isExpand: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    onValidate: React.PropTypes.func
};

SxCascadeGroup.defaultProps = {
    title: "",
    caption: "",
    data: [],
    value: [],
    isDesc: true,
    isExpand: false,
    isRequire: false,
    onValidate: null
};

export default SxCascadeGroup
