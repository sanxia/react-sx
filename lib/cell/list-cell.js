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

    componentWillReceiveProps(nextProps){
        this.setState({isEditing: nextProps.isEditing})
        this.setState({isChecked: nextProps.isChecked})
    }

    shouldComponentUpdate(nextProps, nextState) {        
        let isChanged = nextState.isEditing != this.state.isEditing ||
        nextState.isChecked != this.state.isChecked

        return isChanged
    }

    isEditing(){
        return this.state.isEditing
    }

    isChecked(){
        return this.state.isChecked
    }

    onCheck = (data)=>{
        if(this.props.onCheck){
            this.props.onCheck(data)
        }

        this.setState({"isChecked": data.isChecked})
    }

    renderHeading(){
        let content = ""
        let heading = ""

        if(this.props.onRenderHeading){
            heading = this.props.onRenderHeading({
                row:this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(heading != ""){
            content = <div className = "sx-list-cell-item-heading">
                { heading }
            </div>
        }

        return content
    }

    renderTitle(){
        let content = ""
        let title = ""

        if(this.props.onRenderTitle){
            title = this.props.onRenderTitle({
                row:this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(title != ""){
            content = <dd className = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-w">
                { title }
            </dd>
        }

        return content
    }

    renderSubtitle(){
        let content = ""
        let subtitle = ""

        if(this.props.onRenderSubtitle){
            subtitle = this.props.onRenderSubtitle({
                row:this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(subtitle != ""){
            content = <dd className = "sx-box sx-box-c sx-box-css sx-box-rsl sx-box-w sx-txt-info">
                { subtitle }
            </dd>
        }

        return content
    }

    renderToolbars(){
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

    renderTailing(){
        let content = ""
        let tailing = ""

        if(this.props.onRenderTailing){
            tailing = this.props.onRenderTailing({
                row:this.props.row,
                column: this.props.column,
                tag: this.props.tag
            })
        }

        if(tailing != ""){
            content = <div className = "sx-box sx-box-r sx-box-csc sx-list-cell-item-tailing">
                { tailing }
            </div>
        }

        return content
    }

    renderEditing(){
        let content = ""
        let id = this.props.tag
        let isChecked = this.state.isChecked

        if(this.state.isEditing){
            content =  <SxCheckBox
            value = { id }
            isChecked = { isChecked }
            onCheck = { (data)=>this.onCheck(data) } />
        }

        return content
    }

    renderDetails(){
        let content = ""
        let detailsImages = [
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
        ]

        if(this.props.onDetails && !this.state.isEditing){
            content =  <SxImageButton
                title = "详情"
                images = { detailsImages }
                isValidate = { true }
                onButton = { ()=>this.props.onDetails({
                    row: this.props.row,
                    column: this.props.column,
                    tag: this.props.tag})
                }/>
        }

        return content
    }

    render = ()=>{
        return <div className = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-f sx-mtb5">

            { this.renderHeading() }

            <dl className = "sx-box sx-box-c sx-box-css sx-box-w sx-box-f sx-list-cell-item-content">
                { this.renderTitle() }

                { this.renderSubtitle() }
            </dl>

            { this.renderTailing() }

            <div className = "sx-box sx-box-r sx-box-csc sx-list-cell-item-details">
                { this.renderEditing() }
                
                { this.renderDetails() }
            </div>

        </div>
    }
}

SxListCell.propTypes = {
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    tag: React.PropTypes.string,
    isEditing: React.PropTypes.bool,
    onRenderHeading: React.PropTypes.func,
    onRenderTitle: React.PropTypes.func,
    onRenderSubtitle: React.PropTypes.func,
    onRenderTailing: React.PropTypes.func,
    onCheck: React.PropTypes.func,
    onDetails: React.PropTypes.func
};

SxListCell.defaultProps = {
    row: 0,
    column: 0,
    tag: "",
    isEditing: false,
    onRenderHeading: null,
    onRenderTitle: null,
    onRenderSubtitle: null,
    onRenderTailing: null,
    onCheck: null,
    onDetails: null
};

export default SxListCell