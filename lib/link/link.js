import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 超链接组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxLink = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            url: React.PropTypes.string,
            target: React.PropTypes.string,
            onLink: React.PropTypes.func
        }
    },
    getDefaultProps: function(){
        return {
            title: "",
            url: "",
            target: "",
            onLink: null
        }
    },

    getInitialState: function(){
        return{
            title: this.props.title,
            url: this.props.url
        }
    },

    getValue:function(){
        return this.state.url
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({url: nextProps.url})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = true
        let isChildren = React.Children.count(this.props.children) > 0
        if(!isChildren){
            isChanged = nextState.title !== this.state.title
            || nextState.url !== this.state.url
        }
        return isChanged
    },

    onLink: function(){
        if(this.props.onLink){
            this.props.onLink()
        }
    },

    render: function() {
        let styleName = {}
        let isLink = this.state.url.length > 0

        return isLink ?
            <a title = { this.state.title }
                href = { this.state.url }
                target = { this.props.target }
                { ...this.props }
                onClick = { this.onLink } >
                { this.props.children }
            </a>
            :
            <a title = { this.state.title }
                { ...this.props }
                onClick = { this.onLink } >
                { this.props.children }
            </a>
    }
})

export default SxLink
