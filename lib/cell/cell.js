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
        let imageContent = ""

        if(this.props.onImageCell){
            imageContent = this.props.onImageCell(this.state.tag)
        }else if(this.state.imageUrl != ""){
            imageContent = <SxImage width = { 75 } height = { 75 } url = { this.state.imageUrl } />
        }

        if(imageContent != ""){
            content = <SxBox isPadding = {false} >
               { imageContent }
            </SxBox>
        }

        return content
    }

    renderTitle(){
        let content = ""

        if(this.state.title != ""){
            content = <span className = "sx-cell-title">
                { this.state.title }
            </span>
        }

        return content
    }

    renderSubtitle(){
        let content = ""

        if(this.state.subtitle != ""){
            content = <span className = "sx-cell-subtitle">
                { this.state.subtitle }
            </span>
        }

        return content
    }

    renderContent(){
        let content = ""
        let isChildren = React.Children.count(this.props.children) > 0

        if(isChildren){
            content = <SxBox className = "sx-cell-content"
            isMiddle = {true}
            isPadding = { false }>

                { this.props.children }

            </SxBox>
        }

        return content
    }

    renderLeft(){
        let content = ""
        let leftContent = ""

        if(this.props.onRenderLeft){
            leftContent = this.props.onRenderLeft()
        }

        if(leftContent != ""){
            content = <SxBox className = "sx-cell-left"
            isCenter = { true }
            isMiddle = { true }
            isPadding = {false}>

                { leftContent }

            </SxBox>
        }            

        return content
    }

    renderCenter(){
        let content = ""
        let centerContent = ""

        if(this.props.onRenderCenter){
            centerContent = this.props.onRenderCenter()
        }

        if(centerContent != ""){
            content = <SxBox className = "sx-cell-center"
            isMiddle = { true }>

                { centerContent }

            </SxBox>
        }

        return content
    }

    renderRight(){
        let content = ""
        let rightContent = ""

        if(this.props.onRenderRight){
            rightContent = this.props.onRenderRight()
        }

        if(rightContent != ""){
            content = <SxBox className = "sx-cell-right" isMiddle = { true }>

                { rightContent }

            </SxBox>
        }

        return content
    }

    renderDetails(){
        let content = ""

        if(this.props.onDetails){
            <SxImageButton images = {["/static/img/sx/arrow.png"]}
            isValidate = { true }
            onButton = { (data)=>this.onDetails(data) } />
        }

        return content
    }

    onDetails = (data)=>{
        if(this.props.onDetails){
            return this.props.onDetails(this.state.tag)
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

                    { this.renderDetails() }
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
    onRenderLeft: React.PropTypes.func,
    onRenderCenter: React.PropTypes.func,
    onRenderRight: React.PropTypes.func,
    onDetails: React.PropTypes.func
};

SxCell.defaultProps = {
    title: "",
    subtitle: "",
    imageUrl: "",
    tag: "",
    onRenderLeft: null,
    onRenderCenter: null,
    onRenderRight: null,
    onDetails: null
};

export default SxCell
