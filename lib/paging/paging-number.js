import React, { Component } from 'react'
import { SxLink } from '../link/index'


/* ================================================================================
 * 分页页码组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPagingNumber extends Component {
    render = ()=>{
        let pagingIndex = this.props.pagingIndex
        let title = "第"+ pagingIndex + this.props.paging_title
        let content = pagingIndex

        if(this.props.title){
            title = this.props.title
        }

        if(this.props.text){
            content = this.props.text
        }

        return (
        <SxLink
        title = { title }
        onLink = { ()=>this.props.onClick(pagingIndex, this.props.data) } >
            { content } 
        </SxLink>
        )
    }
}

export default SxPagingNumber
