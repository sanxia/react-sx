import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SxLoadingMessage from './loading-message'
import Immutable from 'immutable'


/* ================================================================================
 * Loading组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxLoading extends Component{
    constructor(props, context) {
        super(props, context)
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.isPending){
            this.clearLoading()
        }else{
            this.startLoading(nextProps)
        }
    }

    componentDidMount() {
        if(this.props.isPending){
            this.startLoading(this.props)
        }
    }

    componentWillUnmount() {
        this.clearLoading()
    }

    startLoading = (props)=>{
        if(!this.node) {
            this.node = document.createElement('div')
            this.node.className = 'sx-loading-wrap'

            document.body.appendChild(this.node)
        }

        ReactDOM.unstable_renderSubtreeIntoContainer(this, <SxLoadingMessage { ...props } />, this.node)
    }

    clearLoading = ()=>{
        if(this.node) {
            ReactDOM.unmountComponentAtNode(this.node)
            document.body.removeChild(this.node)
        }

        this.node = null
    }

    render = ()=>{
        return React.DOM.noscript()
    }
}

export default SxLoading
