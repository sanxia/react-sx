import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 超链接组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxLink extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            url: props.url,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({url: nextProps.url})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = true
        let isChildren = React.Children.count(this.props.children) > 0
        if(!isChildren){
            isChanged = nextState.title !== this.state.title
            || nextState.url !== this.state.url
            || nextState.isValidate !== this.state.isValidate
        }

        return isChanged
    }

    setValidate(value){
        this.setState( { isValidate: value } )
    }
    
    getValue(){
        return this.state.url
    }

    onLink(){
        if(this.state.isValidate){
            if(this.props.onLink){
                this.props.onLink()
            }
        }
    }

    render = ()=>{
        let isLinkUrl = this.state.url.length > 0
        let isLink = this.props.onLink || isLinkUrl

        if(isLink){
            return isLinkUrl ?
            <a title = { this.state.title }
            href = { this.state.url }
            target = { this.props.target }
            { ...this.props }
            onClick = { ()=>this.onLink() } >
                { this.props.children }
            </a>
            :
            <a title = { this.state.title }
            { ...this.props }
            onClick = { ()=>this.onLink() } >
                { this.props.children }
            </a>
        }else{
            return <div { ...this.props } className = "sx-txt-content">
                { this.props.children }
            </div>
        }
    }
}

SxLink.propTypes = {
    title: React.PropTypes.string,
    url: React.PropTypes.string,
    target: React.PropTypes.string,
    onLink: React.PropTypes.func
};

SxLink.defaultProps = {
    title: "",
    url: "",
    target: "",
    isValidate: true,
    onLink: null
};

export default SxLink
