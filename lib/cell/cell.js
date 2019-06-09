import React, { Component } from 'react'
import classNames from 'classnames'
import SxBox from '../box/box'
import SxImage from '../image/image'
import SxImageButton from '../button/image-button'


/* ================================================================================
 * 单元格组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxCell extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            imageUrl: props.imageUrl,
            tag: props.tag
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({subtitle: nextProps.subtitle})
        this.setState({imageUrl: nextProps.imageUrl})
        this.setState({tag: nextProps.tag})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = nextState.title !== this.state.title
        || nextState.subtitle !== this.state.subtitle
        || nextState.imageUrl !== this.state.imageUrl
        || nextState.tag !== this.state.tag
        
        return isChanged
    }

    renderImage(){
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
    }

    renderTitle(){
        let title = this.state.title == "" ?
        ""
        :
        <span className = "sx-cell-title"> { this.state.title } </span>

        return title
    }

    renderSubtitle(){
        let subtitle = this.state.subtitle == "" ?
        ""
        :
        <span className = "sx-cell-subtitle"> { this.state.subtitle } </span>

        return subtitle
    }

    renderContent(){
        let isChildren = React.Children.count(this.props.children) > 0

        let content = isChildren ?
        <SxBox className = "sx-cell-content" isMiddle = {true} isPadding = { false }>
            { this.props.children }
        </SxBox>
        :
        ""

        return content
    }

    renderLeft(){
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
    }

    renderCenter(){
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
    }

    renderRight(){
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
    }

    onDetail = ()=>{
        if(this.props.onDetail){
            return this.props.onDetail(this.state.tag)
        }

        return false
    }

    render = ()=>{
        return <SxBox isBetween = { true } isMiddle = { true } isFlex = { true } isTracking = { true }>
            { this.renderImage() }

            <SxBox isRow = { true } isBetween = { true } isPadding = {false} isFlex = { true }>
                <SxBox isRow = { true } isPadding = {false} >
                    <SxBox isRow = { false } >
                        { this.renderTitle() }

                        { this.renderSubtitle() }

                        { this.renderContent() }
                    </SxBox>

                    { this.renderLeft() }
                    
                </SxBox>

                { this.renderCenter() }

                <SxBox isCenter = { true } isMiddle = { true } isPadding = {false} >
                    { this.renderRight() }

                    <SxImageButton images = {["/static/img/sx/arrow.png"]}
                    isValidate = { true }
                    onButton = { (option)=>this.onDetail(option) } />
                </SxBox>
            </SxBox>
        </SxBox>
    }
}

SxCell.propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    tag: React.PropTypes.string,
    onLeftCell: React.PropTypes.func,
    onCenterCell: React.PropTypes.func,
    onRightCell: React.PropTypes.func,
    onDetail: React.PropTypes.func
};

SxCell.defaultProps = {
    title: "",
    subtitle: "",
    imageUrl: "",
    tag: "",
    onLeftCell: null,
    onCenterCell: null,
    onRightCell: null,
    onDetail: null
};

export default SxCell
