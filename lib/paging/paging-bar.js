import React, { Component } from 'react'
import Immutable from 'immutable'
import { SxLink } from '../link/index'


/* ================================================================================
 * 分页组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxPagingBar = React.createClass({
    getDefaultProps: function() {
        return {
            data: null,
            paging: null,
            options: null,
            defaultOptions: {
                first_text: "<<",
                first_title: "第一页",
                prev_text: "<",
                prev_title: "上一页",
                before_title: "前",
                after_title: "后",
                paging_title: "页",
                next_text: ">",
                next_title: "下一页",
                last_text: ">>",
                last_title: "最后一页",
                show_number: 5,
                is_show_info: false
            },
            onPagingUrl: null,
            onPaging: null
        }
    },

    getInitialState: function(){
        return {
            data: Immutable.fromJS(this.props.data),
            paging: Immutable.fromJS(this.props.paging),
            options: Immutable.fromJS(this.props.options),
            defaultOptions:  Immutable.fromJS(this.props.defaultOptions),
        }
    },

    componentWillReceiveProps: function (nextProps){
        let data = Immutable.fromJS(nextProps.data)
        let paging = Immutable.fromJS(nextProps.paging)
        let options = Immutable.fromJS(nextProps.options)

        this.setState({data: data, paging: paging, options: options})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data)
        || !Immutable.is(nextState.paging, this.state.paging)
        || !Immutable.is(nextState.options, this.state.options)

        return isChanged
    },

    onPaging: function(pagingIndex, data){
        if(this.props.onPaging){
            this.props.onPaging(pagingIndex, data)
        }
    },

    onPagingUrl: function(pagingIndex, data){
        if(this.props.onPagingUrl){
            return this.props.onPagingUrl(pagingIndex, data)
        }
        return "###"
    },

    render: function() {
        let options = this.state.defaultOptions.merge(this.state.options).toJS()
        return <div className = "sx-paging" >
                <SxPagingFirst { ...options } { ...this.props } onClick = {this.onPaging} />
                <SxPagingBeforeAfter key={"ba"+1} isBefore = { true } { ...options } { ...this.props } onClick = {this.onPaging} />
                <SxPagingList { ...options } { ...this.props }  onClick = {this.onPaging} />
                <SxPagingBeforeAfter key={"ba"+2} isBefore = { false } { ...options } { ...this.props } onClick = {this.onPaging} />
                <SxPagingLast { ...options } { ...this.props } onClick = {this.onPaging} />
                <SxPagingInfo { ...options } { ...this.props } onClick = {this.onPaging} />
        </div>
    }
})

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 分页条头组件
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
class SxPagingFirst extends Component {
	render() {
		var ids = []
		let paging = this.props.paging
        let current = paging.get('paging_index')
        let pagingIndex = current - 1

        if(paging.get('paging_index') != 1){
            ids.push(1)
        }

        let html = ids.map(
            (v,i) => 
	        <span>
                <SxPagingNumber key = {"first"+i} title = { this.props.first_title } text = { this.props.first_text } pagingIndex = { 1 } { ...this.props } />
                <SxPagingNumber key = {"prev"+i} title = { this.props.prev_title } text = { this.props.prev_text } pagingIndex = { pagingIndex } { ...this.props } />
            </span>
        )
        
        return <span className="sx-paging-indicator">
	            { html }
        </span>
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 分页条前后页组件
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
class SxPagingBeforeAfter extends Component {
	render() {
		var ids = []
        let isBefore = this.props.isBefore
        let paging = this.props.paging
        let pagingCount = paging.get('paging_count')
        let current = paging.get('paging_index')
		
        let pagingIndex = isBefore ? current - this.props.show_number : current + this.props.show_number
        let title = (isBefore ? this.props.before_title : this.props.after_title) + (this.props.show_number + 1) + this.props.paging_title

        if(isBefore && current > this.props.show_number + 1){
            ids.push(1)
        }else if(!isBefore && current < pagingCount - this.props.show_number){
            ids.push(1)
        }

        var html = ids.map(
            (v,i) => <SxLink key = { "pn"+i } title = { title } onLink = { this.props.onClick.bind(this, pagingIndex, this.props.data) } title = { title } >..</SxLink>
        )

        return <span>
		    { html }
		</span>
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 分页条页码列表组件
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
class SxPagingList extends Component {
    render(){
    	let paging = this.props.paging
    	let count = paging.get('paging_count')
    	let current = paging.get('paging_index')
    	let start = current - this.props.show_number
    	let end = current + this.props.show_number

        var pageIndexs = new Array();
        for(var i = start; i < end; i ++) {
        	if( i == current){
                pageIndexs.push(i)
        	}else if(i > 0 & i <= count) {
                pageIndexs.push(i)
            }
        }

    	var pagingList = pageIndexs.map(
    		(v,i) => 
            current == v ? 
            count > 1 ? <span className = "sx-paging-current">{v}</span> : ""
            : 
            <SxPagingNumber key = { "p"+i } pagingIndex = { v } {...this.props} />
    	)

    	return <span>
            { pagingList }
        </span>
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 分页条尾部组件
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
class SxPagingLast extends Component {
	render() {
		var ids = []
        let paging = this.props.paging
        let pagingCount = paging.get('paging_count')
        let current = paging.get('paging_index')
        let pagingIndex = current + 1

        if(paging.get('paging_index') < paging.get('paging_count')){
            ids.push(1)
        }

        let html = ids.map(
            (v,i) => 
	        <span key = { i }>
                <SxPagingNumber key = { "next"+i } title = { this.props.next_title } text = { this.props.next_text } pagingIndex = { pagingIndex } { ...this.props } />
                <SxPagingNumber key = { "last"+i } title = { this.props.last_title } text = { this.props.last_text } pagingIndex = { pagingCount } { ...this.props } />
            </span>
        )

        return <span className="sx-paging-indicator">
	       {html}
        </span>
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 分页页码组件
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
class SxPagingNumber extends Component {
    render(){
        let pagingIndex = this.props.pagingIndex
        let title = "第"+ pagingIndex + this.props.paging_title
        let text = pagingIndex

        if(this.props.title){
            title = this.props.title
        }

        if(this.props.text){
            text = this.props.text
        }

        return <SxLink title = { title } onLink = { this.props.onClick.bind(this, pagingIndex, this.props.data) } >
            { text } 
        </SxLink>
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 分页条信息组件
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
class SxPagingInfo extends Component {
	render() {
		let paging = this.props.paging
		let pagingIndex = paging.get('paging_index')
		let pagingCount = paging.get('paging_count')
        let totalRecord = paging.get('total_record')
        let isShowInfo = this.props.is_show_info

        let info = (pagingCount > 1 && isShowInfo) ? <span>第{ pagingIndex }/{ pagingCount }页,共{ totalRecord }条数据</span> : ""

        return <span className="sx-paging-info">
            { info }
        </span>
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 从此模块导出分页条组件
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
export default SxPagingBar
