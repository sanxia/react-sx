import React, { Component } from 'react'
import _ from 'lodash'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxBox } from '../box/index'
import { SxSelectionBar } from '../other/index'
import { SxPagingBar } from '../paging/index'
import SxTableHeaderColumn from './table-column-header'
import SxTableBody from './table-body'
import SxTableFooter from './table-footer'


/* ================================================================================
 * 表格组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTable extends Component{
    constructor(props, context) {
        super(props, context)
    }

    sortorder(fields) {
        //过滤数据
        fields = fields.filter(
            (v,k) => v.get("is_show", true)
        )

        //列内容对齐预处理，默认左对齐
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
    }

    isShowCheckColumn(){
        return this.props.onCheckAll || this.props.onUnCheck
    }

    renderEmptyTable() {
        let emptyContent = "暂无数据"
        if(this.props.onEmptyRender){
            emptyContent = this.props.onEmptyRender()
        }

        return <div className="sx-box2 sx-box-r sx-box-rsc sx-box-csc sx-m50 sx-p50 sx-txt-info">
            { emptyContent }
        </div>
    }

    renderTable() {
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
                    v.get('renderColumn', '') != '' ? v.get('renderColumn')(i, v.get('code'), v) : v.get('title', '')
                }
            </SxTableHeaderColumn>
        )

        let tableHeader = this.props.isShowHeader ? 
                <thead>
                    <tr className = "sx-table-paging-row">
                        <td colSpan = { columnCount } >
                            <SxBox isCenter = { true } >
                            {
                                isShowHeaderPaging ? 
                                <SxPagingBar
                                data = { this.props.datas }
                                options = { this.props.pagingOptions }
                                paging = { paging }
                                onPaging = { ()=>this.props.onPaging() } />
                                :
                                ""
                            }
                            </SxBox>
                        </td>
                    </tr>
                    <tr className = "sx-table-title-row">
                        <SxTableHeaderColumn>
                        {
                            this.isShowCheckColumn() ?
                                <SxSelectionBar 
                                onCheckAll = { ()=>this.props.onCheckAll() }
                                onUnCheck = { ()=>this.props.onUnCheck() }/>
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
            onActionRender = { ()=>this.props.onActionRender() }
            onCheck = { ()=>this.props.onCheck() }
            onBrowser = { ()=>this.props.onBrowser() }
            onEdit = { ()=>this.props.onEdit() } />

        return <div className = "sx-table-wrap">
            <table className = "sx-table">
                {
                    tableHeader
                }

                { tableBody }

                <SxTableFooter columnCount = { columnCount } >
                    <SxBox isCenter = { true } >
                    {
                        isShowFooterPaging ? 
                        <SxPagingBar
                        data = { this.props.datas }
                        options = { this.props.pagingOptions }
                        paging = { paging }
                        onPaging = { ()=>this.props.onPaging() } />
                        :
                        ""
                    }
                    </SxBox>
                </SxTableFooter>
            </table>
        </div>
    }

    render = ()=>{
        if(this.props.datas.count() > 0){
            return this.renderTable()
        }

        return this.renderEmptyTable()
    }
}

SxTable.propTypes = {
    fields: React.PropTypes.array,
    datas: React.PropTypes.array,
    isShowHeader: React.PropTypes.bool,
    isShowHeaderPaging: React.PropTypes.bool,
    isShowFooterPaging: React.PropTypes.bool,
    isShowFooter: React.PropTypes.bool,
    isDesc: React.PropTypes.bool,
    onActionRender: React.PropTypes.func,
    onEmptyRender: React.PropTypes.func,
    onCheck: React.PropTypes.func,
    onUnCheck: React.PropTypes.func,
    onCheckAll: React.PropTypes.func,
    onBrowser: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onPaging: React.PropTypes.func
};

SxTable.defaultProps = {
    fields: Immutable.fromJS([]),
    datas: Immutable.fromJS([]),
    paging: null,
    pagingOptions: null,
    isShowHeader: true,
    isShowHeaderPaging: false,
    isShowFooterPaging: true,
    isShowFooter: true,
    isDesc: false,
    onActionRender: null,
    onEmptyRender: null,
    onCheck: null,
    onUnCheck: null,
    onCheckAll: null,
    onBrowser: null,
    onEdit: null,
    onPaging: null
};

export default SxTable
