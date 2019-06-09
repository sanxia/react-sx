import React, { Component } from 'react'
import SxPagingNumber from './paging-number'

/* ================================================================================
 * 分页条头组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPagingFirst extends Component {
    render = ()=>{
        var ids = []
        let paging = this.props.paging
        let current = paging.get('paging_index')
        let pagingIndex = current - 1

        if(paging.get('paging_index') != 1){
            ids.push(1)
        }

        let content = ids.map(
            (v,i)=> <span>
                <SxPagingNumber key = {"first"+i} title = { this.props.first_title } text = { this.props.first_text } pagingIndex = { 1 } { ...this.props } />
                <SxPagingNumber key = {"prev"+i} title = { this.props.prev_title } text = { this.props.prev_text } pagingIndex = { pagingIndex } { ...this.props } />
            </span>
        )
        
        return <span className="sx-paging-indicator">
            { content }
        </span>
    }
}

export default SxPagingFirst
