import React, { Component } from 'react'
import Immutable from 'immutable'
import ClassNames from 'classnames'
import { SxBox } from '../box/index'
import { SxImageButton } from '../button/index'
import { SxCheckBox } from '../check/index'
import { util } from '../util'


/* ================================================================================
 * 列表单元格组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxListCell extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            isEditing: props.isEditing,
            isChecked: false
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({isEditing: nextProps.isEditing})
        this.setState({isChecked: nextProps.isChecked})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{        
        let isChanged = nextState.isEditing != this.state.isEditing ||
        nextState.isChecked != this.state.isChecked

        if(this.props.isRefresh){
            isChanged = true
        }

        return isChanged
    }

    onCheck = (data)=>{
        if(this.props.onCheck){
            this.props.onCheck(data)
        }

        this.setState({"isChecked": data.isChecked})
    }

    isEditing = ()=>{
        return this.state.isEditing
    }

    isChecked = ()=>{
        return this.state.isChecked
    }

    renderHeading = ()=>{
        let heading = null

        if(this.props.onRenderHeading){
            heading = this.props.onRenderHeading({
                row:this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(heading){
            return <div className = "sx-list-cell-item-heading">
                { heading }
            </div>
        }

        return null
    }

    renderTitle = ()=>{
        let title = null

        if(this.props.onRenderTitle){
            title = this.props.onRenderTitle({
                row:this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(title){
            return <dt className = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-w">
                { title }
            </dt>
        }

        return null
    }

    renderSubtitle = ()=>{
        let subtitle = null

        if(this.props.onRenderSubtitle){
            subtitle = this.props.onRenderSubtitle({
                row: this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(subtitle){
            return <dd className = "sx-box sx-box-c sx-box-css sx-box-rsl sx-box-w">
                { subtitle }
            </dd>
        }

        return null
    }

    renderContent = ()=>{
        let content = null

        if(this.props.onRenderContent){
            content = this.props.onRenderContent({
                row: this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(content){
            return <dd className = "sx-box sx-box-c sx-box-css sx-box-rsl sx-box-w">
                { content }
            </dd>
        }

        return null
    }

    renderToolbars = ()=>{
        let toolbars = []

        if(this.props.onRenderToolbars){
            toolbars = this.props.onRenderToolbars({
                row:this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        return Immutable.fromJS(toolbars).map( (v,i) => {
            return <span
            key = { i }
            className = "sx-list-cell-item-toolbar sx-txt-content">
                { v }
            </span>
        })
    }

    renderTailing = ()=>{
        let tailing = null

        if(this.props.onRenderTailing){
            tailing = this.props.onRenderTailing({
                row: this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(tailing){
            return <div className = "sx-box sx-box-r sx-box-csc sx-list-cell-item-tailing">
                { tailing }
            </div>
        }

        return null
    }

    renderEditing = ()=>{
        if(!this.state.isEditing) return null;

        let id = this.props.tag
        let isChecked = this.state.isChecked

        return <SxCheckBox
        value = { id }
        isChecked = { isChecked }
        onCheck = { (data)=>this.onCheck(data) } />
    }

    renderBack = ()=>{
        if(!this.props.isBack) return null;

        let backImages = [
            "/static/img/sx/back.png",
            "/static/img/sx/back.png",
            "/static/img/sx/back.png",
            "/static/img/sx/back.png",
        ]
            
        return <SxImageButton
        title = "返回"
        images = { backImages }
        isValidate = { true }
        onButton = { ()=>this.props.onBack({
            row: this.props.row,
            column: this.props.column,
            tag: this.props.tag})
        }/>
    }

    renderDetails = ()=>{
        if(!this.props.isDetails || this.state.isEditing) return null;

        let detailsImages = [
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
        ]
            
        return <SxImageButton
        title = "详情"
        images = { detailsImages }
        isValidate = { true }
        onButton = { ()=>this.props.onDetails({
            row: this.props.row,
            column: this.props.column,
            tag: this.props.tag})
        }/>
    }

    render = ()=>{
        let cellClassName = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-f"
        let { className } = this.props
        if(className){
            cellClassName = cellClassName + " " + className 
        }

        return <div className = { cellClassName }>
            {
                this.props.isBack &&
                <div className = "sx-box sx-box-r sx-box-csc sx-list-cell-item-back">
                    { this.renderBack() }
                </div>
            }

            { this.renderHeading() }

            <dl className = "sx-box sx-box-c sx-box-css sx-box-w sx-box-f sx-list-cell-item-content">
                { this.renderTitle() }

                { this.renderSubtitle() }

                { this.renderContent() }
            </dl>

            { this.renderTailing() }

            {
                (this.state.isEditing || this.props.isDetails) &&
                <div className = "sx-box sx-box-r sx-box-csc sx-list-cell-item-details">
                    { this.renderEditing() }

                    { this.renderDetails() }
                </div>
            }
        </div>
    }
}

SxListCell.propTypes = {
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    tag: React.PropTypes.string,
    isBack: React.PropTypes.bool,
    isDetails: React.PropTypes.bool,
    isEditing: React.PropTypes.bool,
    isRefresh: React.PropTypes.bool,
    onRenderHeading: React.PropTypes.func,
    onRenderTitle: React.PropTypes.func,
    onRenderSubtitle: React.PropTypes.func,
    onRenderContent: React.PropTypes.func,
    onRenderTailing: React.PropTypes.func,
    onCheck: React.PropTypes.func,
    onBack: React.PropTypes.func,
    onDetails: React.PropTypes.func
};

SxListCell.defaultProps = {
    row: 0,
    column: 0,
    tag: "",
    isBack: false,
    isDetails: true,
    isEditing: false,
    isRefresh: true,
    onRenderHeading: null,
    onRenderTitle: null,
    onRenderSubtitle: null,
    onRenderContent: null,
    onRenderTailing: null,
    onCheck: null,
    onBack: null,
    onDetails: null
};

export default SxListCell