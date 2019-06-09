import React, { Component } from 'react'
import { SxLink } from '../link/index'

/* ================================================================================
 * 分页条前后页组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPagingBeforeAfter extends Component {
	render = ()=>{
		var ids = []
        let paging = this.props.paging
        let pagingCount = paging.get('paging_count')
        let current = paging.get('paging_index')
        let isBefore = this.props.isBefore
		
        let pagingIndex = isBefore ? current - this.props.show_number : current + this.props.show_number
        let title = (isBefore ? this.props.before_title : this.props.after_title) + (this.props.show_number + 1) + this.props.paging_title

        if(isBefore && current > this.props.show_number + 1){
            ids.push(1)
        }else if(!isBefore && current < pagingCount - this.props.show_number){
            ids.push(1)
        }

        var content = ids.map(
            (v,i)=> <SxLink
            key = { "pn"+i }
            title = { title }
            onLink = { (pagingIndex)=>this.props.onClick(pagingIndex, this.props.data) }>
            ..
            </SxLink>
        )

        return <span>
		    { content }
		</span>
    }
}

export default SxPagingBeforeAfter
