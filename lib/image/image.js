import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * Image组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxImage = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            info: React.PropTypes.string,
            url: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number,
            tag: React.PropTypes.string,
            onButton: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            title: "",
            info: "",
            url: "",
            width: 0,
            height: 0,
            tag: "",
            onButton: null
        }
    },

    getInitialState: function(){
        return {
            title: this.props.title,
            info: this.props.info,
            url: this.props.url,
            width: this.props.width,
            height: this.props.height,
            tag: this.props.tag
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({info: nextProps.info})
        this.setState({url: nextProps.url})
        this.setState({width: nextProps.width})
        this.setState({height: nextProps.height})
        this.setState({tag: nextProps.tag})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.title != this.state.title
        || nextState.info != this.state.info
        || nextState.url != this.state.url
        || nextState.width != this.state.width
        || nextState.height != this.state.height
        || nextState.tag != this.state.tag
    },

    setTitle: function(newValue){
        this.setState({title: newValue})
    },

    setInfo: function(newValue){
        this.setState({info: newValue})
    },

    getValue: function(){
        return this.state.url
    },

    setUrl: function(newValue){
        this.setState({url: newValue})
    },

    setWidth: function(newValue){
        this.setState({width: newValue})
    },

    setHeight: function(newValue){
        this.setState({height: newValue})
    },

    getTag: function(){
        return this.state.tag
    },

    setTag: function(newValue){
        this.setState({tag: newValue})
    },

    onButton: function(){
        if(this.props.onButton){
            this.props.onButton(this.state.tag)
        }
    },

    render: function() {
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
                onClick = { this.onButton } />

                { info }

                { this.props.children }
        </div>
    }
})

export default SxImage
