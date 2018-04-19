import React, { Component } from 'react'
import classNames from 'classnames'
import Immutable from 'immutable'
import { SxButton } from '../button/index'
import SxTableRow from './table-row'


/* ================================================================================
 * 表内容组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTableBody = React.createClass({
    getDefaultProps: function(){
        return {
            fields: Immutable.fromJS([]),
            datas: Immutable.fromJS([]),
            onActionRender: null,
            onCheck: null,
            onBrowser: null,
            onEdit: null,
        }
    },

    getInitialState: function(){
        return {
            fields: this.props.fields,
            datas: this.props.datas
        }
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({fields: nextProps.fields})
        this.setState({datas: nextProps.datas})
    },

    onEdit: function(item){
        if(this.props.onEdit){
            this.props.onEdit(item)
        }
    },

    render: function(){
        return <tbody>
            {
            this.state.datas.map(
                (v,i) => <SxTableRow key = { i }
                index = { i }
                fields = { this.state.fields }
                datas = { this.state.datas }
                onCheck = { this.props.onCheck }
                onBrowser = { this.props.onBrowser } >
                    {
                        this.props.onActionRender != null ? this.props.onActionRender(i, v) : ""
                    }
                    {
                        this.props.onEdit ?
                        <div className="sx-box2 sx-box-r sx-box-rsc sx-box-csc">
                            <SxButton title = "编辑"
                            type = "small"
                            isValidate = { true }
                            onButton = { ()=>this.onEdit(v) } />
                        </div>
                        :
                        ""
                    }
                </SxTableRow>
            )
            }
        </tbody>
    }
})

export default SxTableBody
