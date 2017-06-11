import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxSelect } from '../select/index'


/* ================================================================================
 * 无限级联下拉框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxCascade = React.createClass({
    propTypes: function(){
        return{
            caption: React.PropTypes.string,
            data: React.PropTypes.array,
            value: React.PropTypes.array,
            isDesc: React.PropTypes.bool,
            isExpand: React.PropTypes.bool,
            isRequire: React.PropTypes.bool
        }
    },

    getDefaultProps: function() {
        return{
            caption: "",
            data: [],
            value: [],
            isDesc: true,
            isExpand: false,
            isRequire: false,
            onSelectChange: null,
            onValidate: null
        }
    },

    getInitialState: function() {
        return {
            data: Immutable.fromJS(this.props.data),
            value: Immutable.fromJS(this.props.value),
            isChange: false,
            isSuccess: false,
            isActive: false
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState( {data: Immutable.fromJS(nextProps.data)} )
        this.setState( {value: Immutable.fromJS(nextProps.value)} )
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data) 
        || !Immutable.is(nextState.value, this.state.value)
        || nextState.isChange != this.state.isChange
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isActive != this.state.isActive

        return isChanged
    },

    componentDidUpdate: function(prevProps, prevState){
        if(this.props.onValidate){
            this.props.onValidate(this.isValidate())
        }
    },

    getValue:function(){
        return this.state.value.toJS()
    },

    getGroups: function(){
        let groups = Immutable.fromJS([])
        let options = this.getRootOptions()

        groups = this.addGroup(groups, options)

        let index = 0
        let childs = null
        let selectItem = this.getSelectItem(index, options)

        //判断是否展开
        if(this.props.isExpand){
            if(!selectItem){
                 while( index < this.state.value.count() - 1 ){
                    index ++
                    groups = groups.push([])
                 }
            }else{
                childs = this.getChilds(index, selectItem)
                while( index < this.state.value.count() - 1 ){
                    index ++
                    groups = childs.count() == 0 ? groups.push(childs) : this.addGroup(groups, childs)
                    
                    selectItem = this.getSelectItem(index, childs)
                    childs = selectItem ? this.getChilds(index+1, selectItem) : Immutable.fromJS([])
                }
            }
        }else{
            if(selectItem){
                childs = this.getChilds(index, selectItem)
                while(childs && childs.count() > 0){
                    index ++
                    groups = this.addGroup(groups, childs)

                    selectItem = this.getSelectItem(index, childs)
                    childs = selectItem ? this.getChilds(index+1, selectItem) : null
                }
            }
        }

        return groups
    },

    addGroup: function(groups, options){
        options = options.map( (v,k) => {
            if(v.has("childs")){
                return v.delete("childs")
            }
            return v
        })

        return groups.push(options)  
    },

    getRootOptions: function(){
        let rootOptions = Immutable.fromJS([]).asMutable()

        //选中项处理
        this.state.data.forEach((v,i)=>{
            let isChecked = this.state.value.get(0, "") == "" ? v.get("isChecked") : v.get("value") == this.state.value.get(0, "") 
            if(isChecked) v = v.set("isChecked", true)
            rootOptions.push(v)
        })

        return rootOptions
    },

    getSelectItem: function(index, items) {
        let currentItems = items.filter((v,k) => {
            let isChecked = this.state.value.count() == 0 ? v.get("isChecked") : v.get("value") == this.state.value.get(index, "")
            if(isChecked) v.set("isChecked", true)
            return isChecked
        })

        if(currentItems.count() > 0) return currentItems.get(0)
        return null
    },

    getChilds: function(index, item) {
        let childs = Immutable.fromJS([])

        if(item.has("childs")){
            childs = item.get("childs").map( (v,k) => {
                let isChecked = this.state.value.count() == 0 ? v.get("isChecked") : v.get("value") == this.state.value.get(index, "")
                return v.set("isChecked", isChecked)
            })
        }

        return childs
    },

    isValidate:function(){
        return this.state.isSuccess
    },

    onValidate: function(isSuccess) {        
        if(this.props.isRequire){
            this.setState({isSuccess: isSuccess})
        }
        
        if(this.props.onValidate){
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    },

    onMouseOver: function(e){
        this.setState({isActive: true})
    },

    onMouseOut: function(e){
        this.setState({isActive: false})
    },

    onSelectChange: function(data) {
        let isLeaf = data.index == this.state.value.count() - 1
        let newValue = this.state.value.set(data.index, data.value)

        //如果非叶子节点，则将其后的子节点选中值设置为空字符串
        if(!isLeaf){
            newValue = newValue.map((v,k) => {
                if(data.index < k){
                    return ""
                }
                return v
            })
        }

        if(this.props.onSelectChange){
            if ( this.props.onSelectChange({ index: data.index, value: newValue.toJS() }) ){
                this.setState({isChange: true})
                if(newValue.filter((v,k)=> v == "").count() > 0){
                    this.setState({isSuccess: false})
                }
                return true
            }else{
                return false
            }
        }
        return true
    },

    renderCascadeSelectItems: function(){
        let groups = this.getGroups()
        return groups.map((v,k)=>
            <SxSelect ref = { "select" + k }
            key = { k }
            index = { k }
            caption = { this.props.caption }
            options = { v }
            value = { this.state.value.get(k, "") }
            isDesc = { this.props.isDesc }
            isRequire = { this.props.isRequire }
            onSelectChange = { this.onSelectChange }
            onValidate = { this.onValidate } />
        )
    },

    render: function() {
        let className = classNames({
            "sx-cascade": true,
            "sx-cascade-default": (this.state.isSuccess && !this.state.isActive) || !this.state.isChange,
            "sx-cascade-error": this.state.isChange && !this.state.isSuccess,
            "sx-cascade-active": this.state.isSuccess && this.state.isActive
        })

        let selectItems = this.renderCascadeSelectItems()
        return <div className = { className } onMouseOver = { this.onMouseOver } onMouseOut = { this.onMouseOut }>
                <div className = "sx-cascade-content">
                { selectItems }
                </div>

                <div className = "sx-cascade-ext">
                { this.props.children }
                </div>
        </div>
    }
})

export default SxCascade
