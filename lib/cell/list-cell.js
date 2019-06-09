import React, { Component } from 'react'
import Immutable from 'immutable'
import ClassNames from 'classnames'
import { SxBox } from '../box/index'
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
            data: props.data ? Immutable.fromJS(props.data) : Immutable.fromJS([]),
            isEditing: props.isEditing
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({data: nextProps.data})
        this.setState({isEditing: nextProps.isEditing})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data) || 
        nextState.isEditing != this.state.isEditing

        return isChanged
    }

    renderTitle(){
        let title = ""
        if(this.props.onRenderTitle){
            title = this.props.onRenderTitle()
        }

        return ()=>{
            if(title == ""){
                return ""
            }

            return <dd className = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-w">
                { title }
            </dd>
        }
    }

    renderSubtitle(){
        let subtitle = ""
        if(this.props.onRenderSubtitle){
            subtitle = this.props.onRenderSubtitle()
        }

        return ()=>{
            if(subtitle == ""){
                return ""
            }

            return <dd className = "sx-box sx-box-c sx-box-css sx-box-rsl sx-box-w sx-txt-info">
                { subtitle }
            </dd>
        }
    }

    renderToolbars(){
        let toolbars = []
        if(this.props.onRenderToolbars){
            toolbars = this.props.onRenderToolbars()
        }

        toolbars = Immutable.fromJS(toolbars)
        return toolbars.map( (v,i) => {
            return <li
            key = { i }
            className = "sx-txt-content">
                { v }
            </li>
        })
    }

    renderEditing(){
        let data = Immutable.fromJS(this.props.data)
        let id = data.get("id", "")
        let isChecked = data.get("__is_checked__", false)

        return ()=>{
            if(this.state.isEditing && this.props.onCheck){
                return <SxCheckBox
                    value = { id }
                    isChecked = { isChecked }
                    onCheck = { (value)=>{ this.props.onCheck(this.props.row, this.props,column, this.props.data, value)} } />
            }

            return ""
        }
    }

    renderDetails(){
        let detailsImages = [
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
        ]

        return ()=>{
            if(this.props.onDetails && !this.state.isEditing){
                return <li>
                    <SxImageButton
                    title = "详情"
                    images = { detailsImages }
                    isValidate = { true }
                    onButton = { ()=>{this.props.onDetails(this.props.row, this.props,column, this.props.data)} } />
                </li>
            }

            return ""
        }
    }

    render = ()=>{
        let detailsImages = [
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
            "/static/img/sx/details.png",
        ]

        let title = this.renderTitle()
        let subtitle = this.renderSubtitle()
        let toolbars = this.renderToolbars()
        let editing = this.renderEditing()
        let details = this.renderDetails()

        return <div className = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-f sx-mtb5">
            <dl className = "sx-box sx-box-c sx-box-css sx-box-w sx-box-f">
                { title }

                { subtitle }
            </dl>

            <ul className = "sx-box sx-box-r sx-box-csc">
                { toolbars }

                { editing }
                
                { details }
            </ul>
        </div>
    }
}

SxListCell.propTypes = {
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    data: React.PropTypes.obj,
    isEditing: React.PropTypes.bool,
    onRenderTitle: React.PropTypes.func,
    onRenderSubtitle: React.PropTypes.func,
    onRenderToolbars: React.PropTypes.func,
    onCheck: React.PropTypes.func,
    onDetails: React.PropTypes.func
};

SxListCell.defaultProps = {
    row: 0,
    column: 0,
    data: {},
    isEditing: false,
    onRenderTitle: null,
    onRenderSubtitle: null,
    onRenderToolbars: null,
    onCheck: null,
    onDetails: null
};

export default SxListCell