import React, { Component } from 'react'


/* ================================================================================
 * 分页条信息组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPagingInfo extends Component {
	render = ()=>{
		let paging = this.props.paging
		let pagingIndex = paging.get('paging_index')
		let pagingCount = paging.get('paging_count')
        let totalRecord = paging.get('total_record')
        let isShowInfo = this.props.is_show_info

        let content = (pagingCount > 1 && isShowInfo) ? <span>第{ pagingIndex }/{ pagingCount }页,共{ totalRecord }条数据</span> : ""

        return <span className="sx-paging-info">
            { content }
        </span>
    }
}

export default SxPagingInfo
