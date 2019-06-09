import React, { Component } from 'react'
import { SxButton } from '../button/index'


/* ================================================================================
 * 全选／反选组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxSelectionBar extends Component{
    constructor(props, context) {
        super(props, context)
    }

    onCheckAll = ()=>{
        if(this.props.onCheckAll){
            this.props.onCheckAll()
        }
    }

    onUnCheck = ()=>{
        if(this.props.onUnCheck){
            this.props.onUnCheck()
        }
    }

    render = ()=>{
        return (
        <div>
            <SxButton tag = "all"
            title = "全选"
            type = "medium"
            isSpace = { true }
            isValidate = { true }
            onClick = { ()=>this.onCheckAll() }>
                全选
            </SxButton>

            <SxButton tag = "unall"
            title = "反选"
            type = "medium"
            isValidate = { true } 
            onClick = { ()=>this.onUnCheck() }>
                反选
            </SxButton>
        </div>
        )
    }
}

SxSelectionBar.propTypes = {
    onCheckAll: React.PropTypes.func,
    onUnCheck: React.PropTypes.func
};

SxSelectionBar.defaultProps = {
    onCheckAll: null,
    onUnCheck: null
};

export default SxSelectionBar
