import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxSelect } from '../select/index'


/* ================================================================================
 * 无限级联下拉框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxCascade extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            data: Immutable.fromJS(props.data),
            value: Immutable.fromJS(props.value),
            isChange: false,
            isSuccess: false,
            isActive: false
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState( {data: Immutable.fromJS(nextProps.data)} )
        this.setState( {value: Immutable.fromJS(nextProps.value)} )

        //add
        if(this.props.isRequire){
            let values = Immutable.fromJS(nextProps.value).filter((v,k)=> v == "")

            this.onValidate(values.count() == 0)
        }
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = !Immutable.is(nextState.data, this.state.data) 
        || !Immutable.is(nextState.value, this.state.value)
        || nextState.isChange != this.state.isChange
        || nextState.isSuccess != this.state.isSuccess
        || nextState.isActive != this.state.isActive

        return isChanged
    }

    componentDidUpdate = (prevProps, prevState)=>{
        let values = Immutable.fromJS(prevProps.value).filter((v,k)=> v == "")

        this.onValidate(values.count() == 0)
    }

    getValue(){
        return this.state.value.toJS()
    }

    getGroups(){
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
                childs = this.getChilds(index+1, selectItem)
                while(index < this.state.value.count() - 1){
                    index ++
                    groups = childs.count() == 0 ? groups.push(childs) : this.addGroup(groups, childs)
                    
                    selectItem = this.getSelectItem(index, childs)
                    childs = selectItem ? this.getChilds(index+1, selectItem) : Immutable.fromJS([])
                }
            }
        }else{
            if(selectItem){
                childs = this.getChilds(index+1, selectItem)
                while(childs && childs.count() > 0){
                    index ++
                    groups = this.addGroup(groups, childs)

                    selectItem = this.getSelectItem(index, childs)
                    childs = selectItem ? this.getChilds(index+1, selectItem) : null
                }
            }
        }

        return groups
    }

    getRootOptions(){
        let rootOptions = Immutable.fromJS([]).asMutable()

        //选中项处理
        this.state.data.forEach((v,i)=>{
            let isChecked = this.state.value.get(0, "") == "" ? v.get("isChecked") : v.get("value") == this.state.value.get(0, "") 
            if(isChecked){
                v = v.set("isChecked", true)
            }

            rootOptions.push(v)
        })

        return rootOptions
    }

    addGroup(groups, options){
        options = options.map( (v,k) => {
            if(v.has("childs")){
                return v.delete("childs")
            }
            
            return v
        })

        return groups.push(options)  
    }

    getSelectItem(index, items) {
        let currentItems = items.filter((v,k) => {
            let isChecked = this.state.value.count() == 0 ? v.get("isChecked") : v.get("value") == this.state.value.get(index, "")
            if(isChecked) v.set("isChecked", true)

            return isChecked
        })

        if(currentItems.count() > 0) return currentItems.get(0)
            
        return null
    }

    getChilds(index, item) {
        let childs = Immutable.fromJS([])

        if(item.has("childs")){
            childs = item.get("childs").map( (v,k)=>{
                let isChecked = this.state.value.count() == 0 ? v.get("isChecked") : v.get("value") == this.state.value.get(index, "")

                return v.set("isChecked", isChecked)
            })
        }

        return childs
    }

    isValidate(){
        return this.state.isSuccess
    }

    onValidate = (isSuccess)=>{        
        if(this.props.isRequire){
            this.setState({isSuccess: isSuccess})
        }

        if(this.props.onValidate){
            this.props.onValidate(isSuccess)
        }

        return isSuccess
    }

    onBinding = (data)=>{
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

        if(this.props.onBinding){
            if( this.props.onBinding({
                index: data.index,
                value: newValue.toJS()
            }) ){
                this.setState({isChange: true})

                if(newValue.filter((v,k)=>v == "").count() > 0){
                    this.setState({isSuccess: false})
                }

                return true
            }else{
                return false
            }
        }

        return true
    }

    onHeading = (index, data)=>{
        let content = ""
        if(this.props.onHeading){
            content = this.props.onHeading(index, data)
        }

        return content
    }

    onTailing = (index, data)=>{
        let content = ""
        if(this.props.onTailing){
            content = this.props.onTailing(index, data)
        }

        return content
    }

    onMouseOver = (e)=>{
        this.setState({isActive:true})
    }

    onMouseOut = (e)=>{
        this.setState({isActive:false})
    }

    renderSelects = ()=>{
        return this.getGroups().map((v,k)=>
            <SxSelect
            key = { k }
            index = { k }
            caption = { this.props.caption }
            options = { v }
            value = { this.state.value.get(k, "") }
            isDesc = { this.props.isDesc }
            isRequire = { this.props.isRequire }
            onHeading = { ()=> this.onHeading(k, v) }
            onTailing = { ()=> this.onTailing(k, v) }
            onBinding = { (data)=> this.onBinding(data) }
            onValidate = { (isSuccess)=> this.onValidate(isSuccess) }/>
        )
    }

    renderExt = ()=>{
        let content = ""

        let extClass = classNames({
            "sx-cascade-ext": !this.props.isRow,
            "sx-cascade-ext-row": this.props.isRow
        })

        if(this.props.children){
            content = <div className = { extClass }>
                { this.props.children }
            </div>
        }
 
        return content
    }

    render = ()=>{
        let cascadeClass = classNames({
            "sx-cascade": !this.props.isRow,
            "sx-cascade-row": this.props.isRow,
            "sx-cascade-default": (this.state.isSuccess && !this.state.isActive) || !this.state.isChange,
            "sx-cascade-error": this.state.isChange && !this.state.isSuccess,
            "sx-cascade-active": this.state.isActive
        })


        /*"sx-cascade-active": this.state.isSuccess && this.state.isActive*/

        return (
        <div className = { cascadeClass }
        onMouseOver = { (e)=>this.onMouseOver(e) }
        onMouseOut = { (e)=>this.onMouseOut(e) }>

            <div className = "sx-cascade-content">
                { this.renderSelects() }
            </div>

            { this.renderExt() }

        </div>
        )
    }
}

SxCascade.propTypes = {
    caption: React.PropTypes.string,
    data: React.PropTypes.array,
    value: React.PropTypes.array,
    isRow: React.PropTypes.bool,
    isDesc: React.PropTypes.bool,
    isExpand: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    onHeading: React.PropTypes.func,
    onTailing: React.PropTypes.func
};

SxCascade.defaultProps = {
    caption: "",
    data: [],
    value: [],
    isRow: false,
    isDesc: true,
    isExpand: false,
    isRequire: false,
    onHeading: null,
    onTailing: null,
    onBinding: null,
    onValidate: null
};

export default SxCascade
