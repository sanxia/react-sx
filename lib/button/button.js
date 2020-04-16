import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * 按钮组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxButton extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            activatingTitle: props.activatingTitle,
            info: props.info,
            isHovering: false,
            isActivating: false,
            isChecked: false,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({title: nextProps.title})
        this.setState({info: nextProps.info})
        this.setState({activatingTitle: nextProps.activatingTitle})
        this.setState({isActivating: nextProps.isActivating})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = nextState.title != this.state.title
        || nextState.activatingTitle != this.state.activatingTitle
        || nextState.info != this.state.info
        || nextState.isHovering != this.state.isHovering
        || nextState.isActivating != this.state.isActivating
        || nextState.isChecked != this.state.isChecked
        || nextState.isValidate != this.state.isValidate
        
        return isChanged
    }

    componentDidUpdate = (prevProps, prevState)=>{
        this.onValidate(this.state.isValidate)
    }

    setTitle = (value)=>{
        this.setState({title: value})
    }

    setActivatingTitle = (value)=>{
        this.setState({activatingTitle: value})
    }

    setActivating = (value)=>{
        this.setState({isActivating: value})
    }

    setValidate = (value)=>{
        this.setState( { isValidate: value } )
    }

    getButtonClass = ()=>{
        let type = this.props.type
        let cssClass = classNames({
            "sx-btn": true,
            "sx-box-r": this.props.isRow,
            "sx-box-c": !this.props.isRow,
            "sx-btn-default": type == "default",
            "sx-btn-simple": type == "simple",
            "sx-btn-small": type == "small",
            "sx-btn-medium": type == "medium",
            "sx-btn-large": type == "large",
            "sx-btn-selected": this.props.isDecorate && this.state.isActivating && this.state.isValidate,
            "sx-btn-active": this.props.isDecorate && this.state.isHovering && !this.state.isActivating && this.state.isValidate,
            "sx-btn-valid":  this.props.isDecorate && !this.state.isActivating && !this.state.isHovering && this.state.isValidate,
            "sx-btn-invalid": this.props.isDecorate &&!this.state.isValidate,
        })

        let { className } = this.props
        if(className){
            cssClass = cssClass + " " + className 
        }

        return cssClass
    }

    onMouseOver = ()=>{
        if(this.state.isValidate){
            this.setState({ isHovering: true })
        }
    }

    onMouseOut = ()=>{
        if(this.state.isValidate){
            this.setState({ isHovering: false })
        }
    }

    onValidate = (isValidate)=>{        
        if(this.props.onValidate){
            this.props.onValidate(isValidate)
        }

        return isValidate
    }

    onButton = ()=>{
        if(!this.state.isValidate || this.state.isActivating){
            return
        }
        
        let isChecked = !this.state.isChecked

        this.setState({isChecked: isChecked})

        if(this.props.onButton){
            this.props.onButton({tag:this.props.tag, isChecked: isChecked})
        }
    }

    renderIcon = ()=>{
        // 0: valid | 1: hover | 2: activating | 3: invalid
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
            if(this.state.isActivating){
                icon = icons[2]
            }else{
                if(this.state.isHovering){
                    icon = icons[1]
                }
            }
        }else{
            icon = icons[3]
        }

        if(icon){
            return <em className = "sx-btn-icon">
                <img src = { icon } />
            </em>
        }

        return null
    }

    renderTitle = (icon)=>{
        let title = this.state.title

        if(this.state.isActivating){
            let activatingTitle = this.state.activatingTitle
            if(!activatingTitle && !icon){
                activatingTitle = title
            }

            title = activatingTitle
        }

        if(title){
            return <span>{ title }</span>
        }

        return null
    }

    render = ()=>{
        let btnClassName = this.getButtonClass()

        let icon = this.renderIcon()
        let title = this.renderTitle(icon)

        return <div { ...this.props }
            className = { btnClassName }
            title = { this.state.info }
            onMouseOver = { ()=>this.onMouseOver() }
            onMouseOut = { ()=>this.onMouseOut() }
            onClick = { ()=>this.onButton() } >
                { icon }
                { title }
        </div>
    }
}

SxButton.propTypes = {
    title: React.PropTypes.string,
    activatingTitle: React.PropTypes.string,
    info: React.PropTypes.string,
    tag: React.PropTypes.string,
    icons: React.PropTypes.array,
    type: React.PropTypes.string,
    isRow: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    isDecorate: React.PropTypes.bool,
    onValidate: React.PropTypes.func,
    onButton: React.PropTypes.func
};

SxButton.defaultProps = {
    title: "",
    activatingTitle: "",
    info: "",
    tag: "",
    icons: [],
    type: "default",
    isRow: true,
    isValidate: false,
    isDecorate: true,
    onValidate: null,
    onButton: null
};

export default SxButton
