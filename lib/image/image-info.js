import React, { Component } from 'react'
import Immutable from 'immutable'
import SxBox from '../box/box'
import SxLink from '../link/link'


/* ================================================================================
 * 图片信息组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxImageInfo extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            imageUrl: props.imageUrl,
            data: Immutable.fromJS(props.data),
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({imageUrl: nextProps.imageUrl})
        this.setState({data: Immutable.fromJS(nextProps.data)})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data)
        || nextState.title != this.state.title
        || nextState.imageUrl != this.state.imageUrl
        || nextState.isActive != this.state.isActive

        return isChanged
    }

    onButton = ()=>{
        if(this.props.onButton){
            this.props.onButton(this.state.data)
        } 
    }

    renderToolbar = ()=>{
        let content = ""
        if(this.state.isActive && this.props.onToolbar){
            content = this.props.onToolbar(this.state.data)
        }

        return content
    }

    renderIcon = ()=>{
        let content = ""

        if(this.props.onIcon){
            content = this.props.onIcon(this.state.data)
        }

        return content
    }

    render = ()=>{
        let title = this.state.title
        let imageUrl = this.state.imageUrl
        let imageInfoClass = "sx-image-info"

        //获取传入的className属性组合起来
        let { className } = this.props
        if(className != undefined){
            imageInfoClass = imageInfoClass + " " + className 
        }

        return <SxBox
        className = { imageInfoClass }
        isRow = { false }
        isMiddle = { true }
        isTracking = { true }
        onEnter = { ()=>this.setState({isActive: true}) }
        onLeave = { ()=>this.setState({isActive: false}) }>
            { this.renderToolbar() }

            <p className = "sx-image-info-content">
                { this.renderIcon() }

                <SxLink title = { title } isCenter = { true } onLink = { ()=>this.onButton() }>
                    <img alt = { title } src = { imageUrl } />
                </SxLink>

                { this.props.children }
            </p>
        </SxBox>
    }
}

SxImageInfo.propTypes = {
    title: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    data: React.PropTypes.object,
    onToolbar: React.PropTypes.func,
    onIcon: React.PropTypes.func,
    onButton: React.PropTypes.func
};

SxImageInfo.defaultProps = {
    title: "",
    imageUrl: "",
    data: {},
    onToolbar: null,
    onIcon: null,
    onButton: null
};

export default SxImageInfo
