import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Immutable from 'immutable'
import { SxLink } from '../link/index'
import { SxButton } from '../button/index'
import { SxTableHeaderColumn, SxTableColumn } from './table-column'


/* ================================================================================
 * 表行组件
  * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTableRow = React.createClass({
    getDefaultProps: function(){
        return{
            index: 0,
            fields: Immutable.fromJS([]),
            datas: Immutable.fromJS([]),
            isActive: false
        }
    },

    getInitialState: function(){
        return{
            index: this.props.index,
            fields: this.props.fields,
            datas: this.props.datas,
            isActive: this.props.isActive
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({index: nextProps.index})
        this.setState({fields: nextProps.fields})
        this.setState({datas: nextProps.datas})
        this.setState({isActive: nextProps.isActive})
    },

    shouldComponentUpdate: function(nextProps = {}, nextState = {}) {
        let isChanged = true

        isChanged = nextState.index != this.state.index
        || nextState.fields != this.state.fields
        || nextState.datas != this.state.datas
        || nextState.isActive !== this.state.isActive

        return isChanged
    },

    getItem: function(){
        let item = this.state.datas.get(this.state.index)
        return item
    },

    onMouseOver: function(e){
        this.setState({isActive: true})
    },

    onMouseOut: function(e){
        this.setState({isActive: false})
    },

    onCheck: function(){
        if(this.props.onCheck){
            let item = this.getItem()
            this.props.onCheck(item)
        }
    },

    onBrowser: function(){
        if(this.props.onBrowser){
            let item = this.getItem()
            this.props.onBrowser(item)
        }
    },

    renderSelectButton: function(){
        return <SxButton title="选中"
            type = "medium"
            isValidate = { true }
            onButton = { this.onCheck } />
    },

    renderDataColumns: function(){
        return this.props.fields.map(
                (v,i) =>
                i == 0 ?
                <SxTableColumn key = { i } isCenter = { v.get('is_center', false)}>
                {
                    v.get('render', '') != '' ? 
                    v.get('render')(i, v.get('code'), this.getItem()) :
                    <SxLink title="查看" onLink = { this.onBrowser } >
                        {this.getItem().get(v.get('code'))}
                    </SxLink>
                }
                </SxTableColumn>
                :
                <SxTableColumn key = { i } isCenter = { v.get('is_center', false)}>
                {
                    v.get('render', '') != '' ? v.get('render')(i, v.get('code'), this.getItem()) : this.getItem().get(v.get('code'))
                }
                </SxTableColumn>
        )
    },

    render: function() {
        let isActive = this.state.isActive
        let isChecked = this.getItem().get('__is_checked__')
        let isEnabled = this.getItem().get('__is_enabled__')
        let isFirstRow = this.state.index == 0
        let isLastRow = this.state.index != 0 && this.state.index == this.state.datas.count() - 1 || this.state.datas.count() == 1

        let trClassNames = classNames({
                "sx-table-row": true
            },{
                "sx-table-first-row": isFirstRow
            },{
                "sx-table-last-row": isLastRow
            },{
                "sx-selectable-item": true
            },{
                "sx-disabled-item": !isEnabled && !isChecked && !isActive
            },{
                "sx-selected-item": isChecked && !isActive
            },{
                "sx-active-item": isActive
            }
        )

        return <tr className = { trClassNames }
            onMouseOver = { this.onMouseOver }
            onMouseOut = { this.onMouseOut} >
                {
                this.props.onCheck ?
                <SxTableColumn>
                    { this.renderSelectButton() }
                </SxTableColumn>
                :
                <SxTableColumn></SxTableColumn>
                }

                { this.renderDataColumns() }

                <SxTableColumn isRight = { true }>
                    { this.props.children }
                </SxTableColumn>
        </tr>
    }
})

export default SxTableRow
