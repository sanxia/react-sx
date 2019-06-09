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
            isHovering: false,
            isActivating: false,
            isChecked: false,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({activatingTitle: nextProps.activatingTitle})
        this.setState({isActivating: nextProps.isActivating})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = nextState.title != this.state.title
        || nextState.activatingTitle != this.state.activatingTitle
        || nextState.isHovering != this.state.isHovering
        || nextState.isActivating != this.state.isActivating
        || nextState.isChecked != this.state.isChecked
        || nextState.isValidate != this.state.isValidate
        
        return isChanged
    }

    componentDidUpdate(prevProps, prevState){
        this.onValidate(this.state.isValidate)
    }

    setTitle(value){
        this.setState({title: value})
    }

    setActivatingTitle(value){
        this.setState({activatingTitle: value})
    }

    setActivating(value){
        this.setState({isActivating: value})
    }

    setValidate(value){
        this.setState( { isValidate: value } )
    }

    getCssClass(){
        let type = this.props.type
        let cssClass = classNames({
            "sx-btn": true,
            "sx-btn-default": type == "default",
            "sx-btn-small": type == "small",
            "sx-btn-medium": type == "medium",
            "sx-btn-large": type == "large",
            "sx-btn-selected": this.state.isActivating && this.state.isValidate,
            "sx-btn-active": this.state.isHovering && !this.state.isActivating && this.state.isValidate,
            "sx-btn-valid":  !this.state.isActivating && !this.state.isHovering && this.state.isValidate,
            "sx-btn-invalid": !this.state.isValidate,
        })

        //获取传入的className属性组合起来
        let { className } = this.props
        if(className){
            cssClass = cssClass + " " + className 
        }

        return cssClass
    }

    onMouseOver() {
        if(this.state.isValidate){
            this.setState({ isHovering: true })
        }
    }

    onMouseOut(){
        if(this.state.isValidate){
            this.setState({ isHovering: false })
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
        }else{
            if(this.state.isActivating){
                return
            }
        }

        let isChecked = !this.state.isChecked

        this.setState({isChecked: isChecked})

        if(this.props.onButton){
            this.props.onButton({tag:this.props.tag, isChecked: isChecked})
        }
    }

    renderIcon(){
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

        let content = <em className = "sx-btn-icon">
            <img src = { icon } />
        </em>

        return icon == "" ? "" : content
    }

    renderTitle(icon) {
        let title = this.state.title

        if(this.state.isActivating){
            let activatingTitle = this.state.activatingTitle
            if(activatingTitle == "" && icon == ""){
                activatingTitle = title
            }

            title = activatingTitle
        }

        let content = <span>{ title }</span>

        return title == "" ? "" : content
    }

    renderProgressing(){
        return <div className="xo-box sx-box-r sx-box-rsl sx-box-csb sx-btn-extend">
        </div>
    }

    render() {
        let cssClass = this.getCssClass()

        let icon = this.renderIcon()
        let title = this.renderTitle(icon)
        let progressing = this.renderProgressing()

        return <div { ...this.props }
            className = { cssClass }
            title = { this.state.isActivating ? this.state.activatingTitle : this.state.title }
            onMouseOver = { ()=>{this.onMouseOver()} }
            onMouseOut = { ()=>{this.onMouseOut()} }
            onClick = { ()=>{this.onButton()} } >
                { icon }
                { title }
        </div>
    }
}

SxButton.propTypes = {
    title: React.PropTypes.string,
    activatingTitle: React.PropTypes.string,
    tag: React.PropTypes.string,
    icons: React.PropTypes.array,
    type: React.PropTypes.string,
    isValidate: React.PropTypes.bool,
    onValidate: React.PropTypes.func,
    onButton: React.PropTypes.func
};

SxButton.defaultProps = {
    title: "",
    activatingTitle: "",
    tag: "",
    icons: [],
    type: "default",
    isValidate: false,
    onValidate: null,
    onButton: null
};

export default SxButton
