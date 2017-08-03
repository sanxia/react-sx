import React, { Component } from 'react'
import Immutable from 'immutable'
import SxBox from '../box/box'
import SxLink from '../link/link'


/* ================================================================================
 * 图片信息组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxImageInfo = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            imageUrl: React.PropTypes.string,
            data: React.PropTypes.object,
            onToolbar: React.PropTypes.func,
            onIcon: React.PropTypes.func,
            onButton: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            title: "",
            imageUrl: "",
            data: {},
            onToolbar: null,
            onIcon: null,
            onButton: null
        }
    },

    getInitialState: function(){
        return {
            title: this.props.title,
            imageUrl: this.props.imageUrl,
            data: Immutable.fromJS(this.props.data),
            isActive: false
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({imageUrl: nextProps.imageUrl})
        this.setState({data: Immutable.fromJS(nextProps.data)})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data)
        || nextState.title != this.state.title
        || nextState.imageUrl != this.state.imageUrl
        || nextState.isActive != this.state.isActive
        return isChanged
    },

    onButton: function(){
        if(this.props.onButton){
            this.props.onButton(this.state.data)
        } 
    },

    renderToolbar: function(){
        if(this.state.isActive && this.props.onToolbar){
            return this.props.onToolbar(this.state.data)
        }

        return ""
    },

    renderIcon: function(){
        if(this.props.onIcon){
            return this.props.onIcon(this.state.data)
        }

        return ""
    },

    render: function(){
        let title = this.state.title
        let imageUrl = this.state.imageUrl
        let toolbar = this.renderToolbar()
        let icon = this.renderIcon()

        return <SxBox
            isRow = { false }
            isCenter = { true }
            isMiddle = { true }
            isTracking = { true }
            onEnter = {()=>{this.setState({isActive: true})}}
            onLeave = {()=>{this.setState({isActive: false})}}
            >
                { toolbar }

                <p className = "sx-image-info">
                    { icon }
                    
                    <SxLink isCenter = { true } onLink = { this.onButton }>
                        <img src = { imageUrl } className = "sx-image-info-image"/>
                    </SxLink>

                    { this.props.children }
                </p>

                <div dangerouslySetInnerHTML = {{__html: title}} />
        </SxBox>
    }
})

export default SxImageInfo
