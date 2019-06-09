import React, { Component } from 'react'
import SxPagingNumber from './paging-number'

/* ================================================================================
 * 分页条页码列表组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPagingList extends Component {
    render = ()=>{
    	let paging = this.props.paging

    	let count = paging.get('paging_count')
    	let current = paging.get('paging_index')
    	let start = current - this.props.show_number
    	let end = current + this.props.show_number

        var pageNumbers = new Array();
        for(var i = start; i < end; i ++) {
        	if( i == current){
                pageNumbers.push(i)
        	}else if(i > 0 & i <= count) {
                pageNumbers.push(i)
            }
        }

    	var content = pageNumbers.map(
    		(v,i)=> current == v ? 
            count > 1 ? <span className = "sx-paging-current">{v}</span> : ""
            : 
            <SxPagingNumber key = { "p"+i } pagingIndex = { v } {...this.props} />
    	)

    	return <span>
            { content }
        </span>
    }
}

export default SxPagingList
