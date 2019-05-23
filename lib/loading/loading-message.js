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
            isReverse: React.PropTypes.bool,
            isPending: React.PropTypes.bool,
        }
    },

    getDefaultProps: function(){
        return {
            message: "Loading",
            isReverse: false,
            isPending: true
        }
    },

    getInitialState: function(){
        return{
            message: this.props.message,
            isReverse: this.props.isReverse,
            isPending: this.props.isPending
        }
    },

    setPending: function(isPending){
        this.setState({isPending: isPending})
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({message: nextProps.message})
        this.setState({isReverse: nextProps.isReverse})
        this.setState({isPending: nextProps.isPending})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.message != this.state.message
        || nextState.isReverse != this.state.isReverse
        || nextState.isPending != this.state.isPending
    },

    render: function() {
        return this.state.isPending ?
        <SxBox isCenter = { !this.state.isReverse } isReverse = { this.state.isReverse } isPadding = { false }>
            {
                this.state.message ?
                <span>{ this.state.message }</span>
                :
                ""
            }
            
            <span className="sx-loading-icon"></span>
        </SxBox>
        :
        <section>
        </section>
    }
})

export default SxLoadingMessage
