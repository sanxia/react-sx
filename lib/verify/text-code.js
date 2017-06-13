import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'


/* ================================================================================
 * 文字图片验证码组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTextCode = React.createClass({
    propTypes: function(){
        return {
            option: React.PropTypes.object,
            onRefresh: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            option: null,
            onRefresh: null,
        }
    },

    getInitialState: function(){
        return {
            option: Immutable.fromJS(this.props.option),
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.option, this.state.option)
        return isChange
    },

    onRefresh: function(){
        if(this.props.onRefresh){
            this.props.onRefresh()
        }

        let url = this.state.option.get("url") + "?r=" + new Date().getTime()
        let newOption = this.state.option.set("url", url)
        this.setState({option: newOption})
    },

    render: function() {
        let url = this.state.option.get("url", "")

        return <div className = "sx-verify-image" onSelectStart = {()=>{return false}}>
            <SxImage title = "点击刷新验证码" url = { url } onButton = { this.onRefresh }/>
        </div>
    }
})

export default SxTextCode
