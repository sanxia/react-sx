import React, { Component } from 'react'
import SxPagingNumber from './paging-number'

/* ================================================================================
 * 分页条尾部组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPagingLast extends Component {
	render = ()=>{
		var ids = []
        let paging = this.props.paging
        let pagingCount = paging.get('paging_count')
        let current = paging.get('paging_index')
        let pagingIndex = current + 1

        if(paging.get('paging_index') < paging.get('paging_count')){
            ids.push(1)
        }

        let content = ids.map(
            (v,i)=> <span key = { i }>
                <SxPagingNumber key = { "next"+i } title = { this.props.next_title } text = { this.props.next_text } pagingIndex = { pagingIndex } { ...this.props } />
                <SxPagingNumber key = { "last"+i } title = { this.props.last_title } text = { this.props.last_text } pagingIndex = { pagingCount } { ...this.props } />
            </span>
        )

        return <span className="sx-paging-indicator">
	       { content }
        </span>
    }
}

export default SxPagingLast
