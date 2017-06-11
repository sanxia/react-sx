import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxBox } from '../box/index'
import SxLoadingContent from './loading-content'


/* ================================================================================
 * Loading组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
 var SxLoading = React.createClass({
    componentDidMount: function() {
      this.node = document.createElement('div');
      this.node.className = 'sx-loading-wrap';
      document.body.appendChild(this.node);

      this.renderLoading(this.props)
    },

    componentWillReceiveProps: function(nextProps) {
        this.renderLoading(nextProps)
    },

    componentWillUnmount: function() {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
    },

    renderLoading: function(props) {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, <SxLoadingContent {...props} />, this.node)
    },

    render: function () {
        return React.DOM.noscript()
    }
});

export default SxLoading
