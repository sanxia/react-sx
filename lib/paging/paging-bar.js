import React, { Component } from 'react'
import Immutable from 'immutable'
import { SxLink } from '../link/index'
import SxPagingFirst from './paging-first'
import SxPagingBeforeAfter from './paging-before-after'
import SxPagingList from './paging-list'
import SxPagingLast from './paging-last'
import SxPagingInfo from './paging-info'

/* ================================================================================
 * 分页组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPagingBar extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            data: Immutable.fromJS(props.data),
            paging: Immutable.fromJS(props.paging),
            options: Immutable.fromJS(props.options),
            defaultOptions:  Immutable.fromJS(props.defaultOptions),
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        let data = Immutable.fromJS(nextProps.data)
        let paging = Immutable.fromJS(nextProps.paging)
        let options = Immutable.fromJS(nextProps.options)

        this.setState({data: data, paging: paging, options: options})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = !Immutable.is(nextState.data, this.state.data)
        || !Immutable.is(nextState.paging, this.state.paging)
        || !Immutable.is(nextState.options, this.state.options)

        return isChanged
    }

    onPaging = (pagingIndex, data)=>{
        if(this.props.onPaging){
            this.props.onPaging(pagingIndex, data)
        }
    }

    onPagingUrl = (pagingIndex, data)=>{
        if(this.props.onPagingUrl){
            return this.props.onPagingUrl(pagingIndex, data)
        }

        return "###"
    }

    render = ()=>{
        let options = this.state.defaultOptions.merge(this.state.options).toJS()

        return <div className = "sx-box sx-box-rsc sx-bxo-csc sx-box-f sx-paging" >
            <SxPagingFirst { ...options } { ...this.props } onClick = { this.onPaging } />
                
            <SxPagingBeforeAfter key = { "ba" + 1 } isBefore = { true } { ...options } { ...this.props } onClick = { (pagingIndex, data)=>this.onPaging(pagingIndex, data) } />
                
            <SxPagingList { ...options } { ...this.props }  onClick = { (pagingIndex, data)=>this.onPaging(pagingIndex, data) } />
                
            <SxPagingBeforeAfter key = { "ba" + 2 } isBefore = { false } { ...options } { ...this.props } onClick = { (pagingIndex, data)=>this.onPaging(pagingIndex, data) } />
                
            <SxPagingLast { ...options } { ...this.props } onClick = { (pagingIndex, data)=>this.onPaging(pagingIndex, data) } />
                
            <SxPagingInfo { ...options } { ...this.props } onClick = { (pagingIndex, data)=>this.onPaging(pagingIndex, data) } />
        </div>
    }
}

SxPagingBar.defaultProps = {
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
};

export default SxPagingBar
