import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * 按钮组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxButton extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            tooltips: props.tooltips,
            tag: props.tag,
            isActive: false,
            isChecked: false,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({tooltips: nextProps.tooltips})
        this.setState({tag: nextProps.tag})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = nextState.title != this.state.title
        || nextState.tooltips != this.state.tooltips
        || nextState.tag != this.state.tag
        || nextState.isActive != this.state.isActive
        || nextState.isChecked != this.state.isChecked
        || nextState.isValidate != this.state.isValidate
        
        return isChanged
    }

    componentDidUpdate(prevProps, prevState){
        this.onValidate(this.state.isValidate)
    }

    getTitle(){
        return this.state.title
    }

    setTitle(value){
        this.setState({title: value})
    }

    setTooltips(value){
        this.setState({tooltips: value})
    }

    getTag(){
        return this.state.tag
    }

    setTag(newTag){
        this.setState({tag: newTag})
    }

    setValidate(isValidate){
        this.setState( { isValidate: isValidate } )
    }

    onMouseOver() {
        if(this.state.isValidate){
            this.setState({ isActive: true })
        }
    }

    onMouseOut(){
        if(this.state.isValidate){
            this.setState({ isActive: false })
        }
    }

    onValidate(isValidate) {        
        if(this.props.onValidate){
            this.props.onValidate(isValidate)
        }

        return isValidate
    }

    onButton(){
        if(!this.state.isValidate){
            return
        }

        if(this.props.onButton){
            this.props.onButton({tag:this.state.tag, isChecked: !this.state.isChecked})
            this.setState({isChecked: !this.state.isChecked})
        }
    }

    getCssClass(){
        let type = this.props.type
        let cssClass = classNames({
            "sx-btn": true,
            "sx-btn-default": type == "default",
            "sx-btn-small": type == "small",
            "sx-btn-medium": type == "medium",
            "sx-btn-large": type == "large",
            "sx-btn-selected": this.state.isChecked && !this.state.isActive && this.state.isValidate,
            "sx-btn-active": this.state.isActive && this.state.isValidate,
            "sx-btn-valid": !this.state.isActive && this.state.isValidate,
            "sx-btn-invalid": !this.state.isValidate,
        })

        //获取传入的className属性组合起来
        let { className } = this.props
        if(className){
            cssClass = cssClass + " " + className 
        }

        return cssClass
    }

    renderIcon(){
        // 0: valid | 1: active | 2: selected | 3: invalid
        let icons = this.props.icons
        if(icons.length == 0){
            return ""
        }

        //必须四个icon元素
        while(icons.length < 4){
            icons.push(icons[0])
        }

        //当前的icon
        let icon = icons[0]
        if(this.state.isValidate){
            if(this.state.isActive){
                icon = icons[1]
            }else{
                if(this.state.isChecked){
                    icon = icons[2]
                }
            }
        }else{
            icon = icons[3]
        }

        return <em className = "sx-btn-icon">
            <img src = { icon } />
        </em>
    }

    render() {
        let cssClass = this.getCssClass()
        let title = this.state.title
        let tooltips = this.state.tooltips
        let icon = this.renderIcon()

        if(tooltips == ""){
            tooltips = this.state.title
        }

        return <div { ...this.props }
            className = { cssClass }
            title = { tooltips }
            onMouseOver = { ()=>{this.onMouseOver()} }
            onMouseOut = { ()=>{this.onMouseOut()} }
            onClick = { ()=>{this.onButton()} } >
                { icon }
                {
                    title != "" ?
                    <span>{ title }</span>
                    :
                    ""
                }
        </div>
    }
}

SxButton.propTypes = {
    title: React.PropTypes.string,
    tooltips: React.PropTypes.string,
    tag: React.PropTypes.string,
    icons: React.PropTypes.array,
    space: React.PropTypes.string,
    isValidate: React.PropTypes.bool,
    onValidate: React.PropTypes.func,
    onButton: React.PropTypes.func
};

SxButton.defaultProps = {
    title: "",
    tooltips: "",
    tag: "",
    icons: [],
    type: "default",
    space: "",
    isValidate: false,
    onValidate: null,
    onButton: null
};

export default SxButton
