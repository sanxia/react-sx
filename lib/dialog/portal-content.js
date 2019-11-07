import React, { Component } from 'react'
import Immutable from 'immutable'
import { util } from '../util'


/* ================================================================================
 * 弹出内容
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPortalContent extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            isOpen: props.isOpen
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({title: nextProps.title})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        return true
    }

    componentDidUpdate = (prevProps, prevState)=>{

    }

    componentDidMount = ()=>{        

    }

    componentWillUnmount = ()=>{

    }

    setTitle = ()=>{
        this.setState({title: this.state.title})
    }

    isOpen = ()=>{
        return this.state.isOpen
    }

    open = ()=>{
        if(!this.state.isOpen){
            this.setState({isOpen: true})
        }
    }

    close = ()=>{
        if(this.state.isOpen){
            this.setState({isOpen: false})
        }
    }

    onClose = ()=>{
        if(this.props.onClose){
            if(this.props.onClose()){
                this.close()
            }
        }
    }

    renderHeader = ()=>{
        if(this.props.isHeader){
            return <div className = "sx-dialog-header">
                <span className = "sx-dialog-header-logo" />
                <div className = "sx-dialog-header-title">
                    { this.state.title }
                </div>
                <span className = "sx-dialog-header-close" title = "关闭" onClick = { ()=>this.onClose() } />
            </div>
        }

        return null
    }

    renderContent = ()=>{
        return <div className = "sx-dialog">
            { this.renderHeader() }

            <div className = "sx-dialog-body">
                { this.props.children }
            </div>

            { this.renderFooter() }
        </div>
    }

    renderFooter = ()=>{
        if(this.props.onRenderFooter){
            return <div className = "sx-dialog-footer">
                { this.props.onRenderFooter() }
            </div>
        }

        return null
    }

    render = ()=>{
        if(this.state.isOpen){
            return <div className = "sx-portal-item">
                <div className = "sx-portal-mask" />

                <div className = "sx-portal-content">
                    { this.renderContent() }
                </div>
            </div>
        }

        return null
    }
}

SxPortalContent.propTypes = {
    isHeader: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func
};

SxPortalContent.defaultProps = {
    isHeader: true,
    isOpen: false,
    onClose: null
}

export default SxPortalContent
