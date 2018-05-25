import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxBox } from '../box/index'


/* ================================================================================
 * Loading组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
 var SxLoadingMessage = React.createClass({
    propTypes: function(){
        return {
            message: React.PropTypes.string,
            isPending: React.PropTypes.bool,
        }
    },

    getDefaultProps: function(){
        return {
            message: "Loading",
            isPending: true
        }
    },

    getInitialState: function(){
        return{
            message: this.props.message,
            isPending: this.props.isPending
        }
    },

    setPending: function(isPending){
        this.setState({isPending: isPending})
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({message: nextProps.message})
        this.setState({isPending: nextProps.isPending})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.message != this.state.message
        || nextState.isPending != this.state.isPending
    },

    render: function() {
        return this.state.isPending ?
        <SxBox isCenter = { true } >
            <span className="sx-loading-icon"></span>
            { this.state.message }
        </SxBox>
        :
        <section>
        </section>
    }
})

export default SxLoadingMessage
