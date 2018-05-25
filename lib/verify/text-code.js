import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'


/* ================================================================================
 * 文字图片验证码组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxTextCode = React.createClass({
    propTypes: function(){
        return {
            url: React.PropTypes.string,
            onRefresh: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            url: "",
            onRefresh: null,
        }
    },

    getInitialState: function(){
        return {
            tick: new Date().getTime(),
            url: this.props.url,
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({url: nextProps.url})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = nextState.url != this.state.url
        || nextState.tick != this.state.tick
        return isChange
    },

    onRefresh: function(){
        if(this.props.onRefresh){
            this.props.onRefresh()
        }

        let tick = new Date().getTime()
        this.setState({"tick": tick})
    },

    render: function() {
        let url = this.state.url + "?r=" + this.state.tick
        
        return <div className = "sx-verify-image" onSelectStart = {()=>{return false}}>
            <SxImage title = "刷新验证码" url = { url } onButton = { this.onRefresh }/>
        </div>
    }
})

export default SxTextCode
