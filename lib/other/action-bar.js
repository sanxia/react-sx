import React, { Component } from 'react'
import Immutable from 'immutable'


/* ================================================================================
 * ActionBar组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxActionBar extends Component{
    constructor(props, context) {
        super(props, context)
    }

    render = ()=>{
        return (
        <div className="btn-group pull-right" role="group" aria-label="...">
            <button type="button"
            className="btn btn-default"
            onClick={ ()=> this.props.onAdd({isOpen: true}) }>
            新增
            </button>

            <div className="btn-group" role="group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    操作
                    <span className="caret"></span>
                </button>

                <ul className="dropdown-menu">
                    <li>
                        <a href="###" onClick = { ()=>this.props.onEnable(this.props.dataItems, false) }>标记删除</a>
                    </li>

                    <li>
                        <a href="###" onClick = { ()=>this.props.onEnable(this.props.dataItems, true) }>标记恢复</a>
                    </li>

                    <li role="separator" className="divider"></li>

                    <li>
                        <a href="#" onClick = { ()=>this.props.onDelete(this.props.dataItems, this.props.paging) }>彻底删除</a>
                    </li>
                    
                    <li>
                        <a href="#" onClick = { ()=>this.props.onDeleteAll() }>清空数据</a>
                    </li>
                </ul>
            </div>
        </div>
        )
    }
}

SxActionBar.propTypes = {
    dataItems: React.PropTypes.array,
    paging: React.PropTypes.obj,
    isValidate: React.PropTypes.bool,
    onAdd: React.PropTypes.func,
    onEnable: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onDeleteAll: React.PropTypes.func
};

SxActionBar.defaultProps = {
    dataItems: Immutable.fromJS([]),
    paging: Immutable.fromJS({}),
    onAdd: null,
    onEnable: null,
    onDelete: null,
    onDeleteAll: null
};

export default SxActionBar
