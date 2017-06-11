import React, { Component } from 'react'
import Immutable from 'immutable'

import _ from 'lodash'
import classNames from 'classnames'
import { SxBox } from '../box/index'
import { SxSelectionBar } from '../other/index'
import { SxPagingBar } from '../paging/index'
import SxTableRow from './table-row'
import { SxTableHeaderColumn, SxTableColumn } from './table-column'
import SxTableBody from './table-body'
import SxTableFooter from './table-footer'


/* ================================================================================
 * 表格组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTable = React.createClass({
    getDefaultProps: function(){
        return{
            fields: Immutable.fromJS([]),
            datas: Immutable.fromJS([]),
            paging: null,
            pagingOptions: null,
            renderAction: null,
            renderEmpty: null,
            onCheck: null,
            onUnCheck: null,
            onCheckAll: null,
            onBrowser: null,
            onEdit: null,
            onPaging: null,
            isShowHeader: true,
            isShowHeaderPaging: true,
            isShowFooterPaging: true,
            isShowFooter: true,
            isDesc: false,
        }
    },

    sortorder: function(fields) {
        //过滤数据
        fields = fields.filter(
            (v,k) => v.get("is_show", true)
        )

        //列内容对齐预处理，是否居中，默认是左对齐
        fields = fields.map(
            (v,k) => {
                return v.set("is_center", v.get("is_center", false))
            }
        )

        //排序
        fields = fields.sort(
            (v1,v2) => this.props.isDesc ? 
            v1.get("sortorder") < v2.get("sortorder") : v1.get("sortorder") > v2.get("sortorder")
        )
        return fields
    },

    isShowCheckColumn: function(){
        return this.props.onCheckAll || this.props.onUnCheck
    },

    renderEmptyTable: function() {
        let emptyContent = "暂无数据"
        if(this.props.renderEmpty){
            emptyContent = this.props.renderEmpty()
        }
        return <div> { emptyContent } </div>
    },

    renderTable: function() {
        let fields = this.sortorder(this.props.fields);
        let datas = this.props.datas
        let paging = this.props.paging
        let isShowHeaderPaging = this.props.paging && this.props.isShowHeaderPaging && parseInt(paging.get("paging_count", 1)) > 1
        let isShowFooterPaging = this.props.paging && this.props.isShowFooterPaging && parseInt(paging.get("paging_count", 1)) > 1
        let columnCount = fields.size + 2
        let hasData = datas.count() > 0

        let tableHeaderColumn = fields.map(
            (v,i) => <SxTableHeaderColumn key = { i } isCenter = { v.get('is_center')} >
                {
                    v.get('column', '') != '' ? v.get('column')(i, v.get('code'), v) : v.get('name')
                }
            </SxTableHeaderColumn>
        )

        let tableHeader = this.props.isShowHeader ? 
                <thead>
                    <tr className = "grx-table-paging-row">
                        <td colSpan = { columnCount } >
                            <SxBox>
                            {
                                isShowHeaderPaging ? 
                                <SxPagingBar
                                data = { this.props.datas }
                                options = { this.props.pagingOptions }
                                paging = { paging }
                                onPaging = { this.props.onPaging } />
                                :
                                ""
                            }
                            </SxBox>
                        </td>
                    </tr>
                    <tr className = "grx-table-title-row">
                        <SxTableHeaderColumn>
                        {
                            this.isShowCheckColumn() ?
                                <SxSelectionBar 
                                onCheckAll = { this.props.onCheckAll }
                                onUnCheck = { this.props.onUnCheck }/>
                            :
                            ""
                        }
                        </SxTableHeaderColumn>

                        { tableHeaderColumn }

                        <SxTableHeaderColumn>
                            { this.props.children }
                        </SxTableHeaderColumn>
                    </tr>
                </thead>
            :
            <thead></thead>

        let tableBody = <SxTableBody 
            fields = { fields }
            datas = { datas }
            renderAction = { this.props.renderAction }
            onCheck = { this.props.onCheck }
            onBrowser = { this.props.onBrowser }
            onEdit = { this.props.onEdit } />

        return (
            <table className = "grx-table">
                {
                    tableHeader
                }

                { tableBody }

                <SxTableFooter columnCount = { columnCount } >
                    <SxBox>
                    {
                        isShowFooterPaging ? 
                        <SxPagingBar
                        data = { this.props.datas }
                        options = { this.props.pagingOptions }
                        paging = { paging }
                        onPaging = { this.props.onPaging } />
                        :
                        ""
                    }
                    </SxBox>
                </SxTableFooter>
            </table>
        )
    },

    render: function() {
        let hasData = this.props.datas.count() > 0
        if(hasData){
            return this.renderTable()
        }

        return this.renderEmptyTable()
    }
})

export default SxTable
