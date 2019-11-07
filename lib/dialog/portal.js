import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SxPortalContent from './portal-content'
import { util } from '../util'


/* ================================================================================
 * 弹出容器
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPortal extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            zindex: 1000
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.portalContent(nextProps)
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        return true
    }

    componentDidUpdate = (prevProps, prevState)=>{
    }

    componentDidMount = ()=>{
        this.portalContent(this.props)
    }

    componentWillUnmount = ()=>{
        if(this.node) {
            ReactDOM.unmountComponentAtNode(this.node)
            document.body.removeChild(this.node)
        }

        this.node = null
    }

    setTitle = (title)=>{
        this.portal.setTitle(title)
    }

    isOpen = ()=>{
        return this.portal.isOpen()
    }

    open = ()=>{
        this.portal.open()
    }

    close = ()=>{
        this.portal.close()
    }

    portalContent = (props)=>{
        if(!this.node) {
            this.node = document.createElement("div")
            this.node.className = "sx-portal"
            document.body.appendChild(this.node)
        }

        ReactDOM.unstable_renderSubtreeIntoContainer(this, <SxPortalContent ref = { (portal)=>{this.portal = portal} } { ...props } />, this.node)
    }

    render = ()=>{
        return React.DOM.noscript()
    }
}

SxPortal.propTypes = {

};

SxPortal.defaultProps = {

};

export default SxPortal
