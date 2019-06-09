import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * Image组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxImage extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            info: props.info,
            url: props.url,
            width: props.width,
            height: props.height,
            tag: props.tag
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({info: nextProps.info})
        this.setState({url: nextProps.url})
        this.setState({width: nextProps.width})
        this.setState({height: nextProps.height})
        this.setState({tag: nextProps.tag})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.title != this.state.title
        || nextState.info != this.state.info
        || nextState.url != this.state.url
        || nextState.width != this.state.width
        || nextState.height != this.state.height
        || nextState.tag != this.state.tag
    }

    setTitle(newValue){
        this.setState({title: newValue})
    }

    setInfo(newValue){
        this.setState({info: newValue})
    }

    getValue(){
        return this.state.url
    }

    setUrl(newValue){
        this.setState({url: newValue})
    }

    setWidth(newValue){
        this.setState({width: newValue})
    }

    setHeight(newValue){
        this.setState({height: newValue})
    }

    getTag(){
        return this.state.tag
    }

    setTag(newValue){
        this.setState({tag: newValue})
    }

    onButton = ()=>{
        if(this.props.onButton){
            this.props.onButton(this.state.tag)
        }
    }

    render = ()=>{
        let info =  this.state.info != "" ? <span className = "sx-info">{ this.state.info }</span> : ""
        let { className } = this.props
        if(className){
            className = "sx-image " + className
        }else{
            className = "sx-image"
        }
        
        let style = {}

        if(this.state.width > 0){
            style["width"] = this.state.width + "px"
        }
        if(this.state.width > 0){
            style["height"] = this.state.height + "px"
        }

        if(this.props.onButton){
            style["cursor"] = "pointer"
        }

        return <div className = { className }>
                <img style = { style }
                src = { this.state.url }
                alt = { this.state.title }
                title = { this.state.title }
                onClick = { ()=>this.onButton() } />

                { info }

                { this.props.children }
        </div>
    }
}

SxImage.propTypes = {
    title: React.PropTypes.string,
    info: React.PropTypes.string,
    url: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    tag: React.PropTypes.string,
    onButton: React.PropTypes.func
};

SxImage.defaultProps = {
    title: "",
    info: "",
    url: "",
    width: 0,
    height: 0,
    tag: "",
    onButton: null
};

export default SxImage
