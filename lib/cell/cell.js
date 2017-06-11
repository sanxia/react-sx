import React, { Component } from 'react'
import classNames from 'classnames'
import SxBox from '../box/box'
import SxImage from '../image/image'
import SxImageButton from '../button/image-button'


/* ================================================================================
 * 单元格组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxCell = React.createClass({
    propTypes: function(){
        return {
            title: React.PropTypes.string,
            subtitle: React.PropTypes.string,
            imageUrl: React.PropTypes.string,
            tag: React.PropTypes.string,
            onLeftCell: React.PropTypes.func,
            onCenterCell: React.PropTypes.func,
            onRightCell: React.PropTypes.func,
            onDetail: React.PropTypes.func
        }
    },
    getDefaultProps: function(){
        return {
            title: "",
            subtitle: "",
            imageUrl: "",
            tag: "",
            onLeftCell: null,
            onCenterCell: null,
            onRightCell: null,
            onDetail: null
        }
    },

    getInitialState: function(){
        return{
            title: this.props.title,
            subtitle: this.props.subtitle,
            imageUrl: this.props.imageUrl,
            tag: this.props.tag
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({title: nextProps.title})
        this.setState({subtitle: nextProps.subtitle})
        this.setState({imageUrl: nextProps.imageUrl})
        this.setState({tag: nextProps.tag})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = nextState.title !== this.state.title
        || nextState.subtitle !== this.state.subtitle
        || nextState.imageUrl !== this.state.imageUrl
        || nextState.tag !== this.state.tag
        
        return isChanged
    },

    renderImage: function(){
        let content = ""
        if(this.props.onImageCell){
            content = this.props.onImageCell(this.state.tag)
        }else if(this.state.imageUrl != ""){
            content = <SxImage width = { 75 } height = { 75 } url = { this.state.imageUrl } />
        }

        content = content == "" ?
            ""
            :
            <SxBox isPadding = {false} >
               { content }
            </SxBox>

        return content
    },

    renderTitle: function(){
        let title = this.state.title == "" ?
        ""
        :
        <span className = "sx-cell-title"> { this.state.title } </span>

        return title
    },

    renderSubtitle: function(){
        let subtitle = this.state.subtitle == "" ?
        ""
        :
        <span className = "sx-cell-subtitle"> { this.state.subtitle } </span>

        return subtitle
    },

    renderContent: function(){
        let isChildren = React.Children.count(this.props.children) > 0

        let content = isChildren ?
        <SxBox className = "sx-cell-content" isMiddle = {true} isPadding = { false }>
            { this.props.children }
        </SxBox>
        :
        ""

        return content
    },

    renderLeft: function(){
        let content = ""
        if(this.props.onLeftCell){
            content = this.props.onLeftCell()
        }

        content = content == "" ?
            ""
            :
            <SxBox className = "sx-cell-left" isCenter = { true } isMiddle = { true } isPadding = {false}>
               { content }
            </SxBox>

        return content
    },

    renderCenter: function(){
        let content = ""
        if(this.props.onCenterCell){
            content = this.props.onCenterCell()
        }

        content = content == "" ?
            ""
            :
            <SxBox className = "sx-cell-center" isMiddle = { true }>
                { content }
            </SxBox>

        return content
    },

    renderRight: function(){
        let content = ""
        if(this.props.onRightCell){
            content = this.props.onRightCell()
        }

        content = content == "" ?
            ""
            :
            <SxBox className = "sx-cell-right" isMiddle = { true }>
                { content }
            </SxBox>

        return content
    },

    onDetailButton: function(){
        if(this.props.onDetail){
            return this.props.onDetail(this.state.tag)
        }

        return false
    },

    render: function() {
        let image = this.renderImage()
        let title = this.renderTitle()
        let subtitle = this.renderSubtitle()
        let content = this.renderContent()
        let leftContent = this.renderLeft()
        let centerContent = this.renderCenter()
        let rightContent = this.renderRight()

        return <SxBox isBetween = { true } isMiddle = { true } isFlex = { true } isTracking = { true }>
            { image }
            <SxBox isRow = { true } isBetween = { true } isPadding = {false} isFlex = { true }>
                <SxBox isRow = { true } isPadding = {false} >
                    <SxBox isRow = { false } >
                        { title }
                        { subtitle }
                        { content }
                    </SxBox>
                    { leftContent }
                </SxBox>
                { centerContent }
                <SxBox isCenter = { true } isMiddle = { true } isPadding = {false} >
                    { rightContent }
                    <SxImageButton images = {["/static/img/sprite/arrow.png"]}
                    isValidate = {true}
                    onButton = { (option)=>{ return this.onDetailButton(option)} } />
                </SxBox>
            </SxBox>
        </SxBox>
    }
})

export default SxCell
