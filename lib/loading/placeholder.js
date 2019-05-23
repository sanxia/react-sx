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
 var SxPlaceholder = React.createClass({
    propTypes: function(){
        return {
            placeholder: React.PropTypes.string,
            isPending: React.PropTypes.bool,
        }
    },

    getDefaultProps: function(){
        return {
            placeholder: "loading",
            isPending: true,
            onPlaceholder: null
        }
    },

    getInitialState: function(){
        return{
            placeholder: this.props.placeholder,
            isPending: this.props.isPending
        }
    },

    setPending: function(isPending){
        this.setState({isPending: isPending})
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({placeholder: nextProps.placeholder})
        this.setState({isPending: nextProps.isPending})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return true
    },

    renderPlaceholder: function(){
        let placeholder = this.state.placeholder
        if(this.props.onPlaceholder != null){
            placeholder = this.props.onPlaceholder()
        }

        return <div className="sx-placeholder">
            { placeholder }
        </div>
    },

    renderContent: function(){
        return <div>
            { this.props.children }
        </div>
    },

    render: function() {
        return this.state.isPending ? this.renderPlaceholder() :  this.renderContent()
    }
})

export default SxPlaceholder
