import React, { Component } from 'react'
import Immutable from 'immutable'
import { SxBox } from '../box/index'
import { SxSpace } from '../space/index'
import { SxButton } from '../button/index'


/* ================================================================================
 * 管理工具条组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxManageToolbar = React.createClass({
    getDefaultProps: function(){
        return{
            data: [],
            isToolbarValidate: false,
            isValidate: true,  
        }
    },

    getInitialState: function(){
        return{
            data: Immutable.fromJS(this.props.data),
            isToolbarValidate: this.props.isToolbarValidate,
            isValidate: this.props.isValidate,
            isManage: false,
        }
    },

    componentWillReceiveProps: function(nextProps){
        this.setState( { data: Immutable.fromJS(nextProps.data) } )
        this.setState( { isToolbarValidate: nextProps.isToolbarValidate } )
        this.setState( { isValidate: nextProps.isValidate } )
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.data, this.state.data)
        || nextState.isToolbarValidate != this.state.isToolbarValidate
        || nextState.isValidate != this.state.isValidate
        || nextState.isManage != this.state.isManage

        return isChange
    },

    setEnabled: function(isValidate){
        this.setState({isValidate: isValidate})
    },

    setManage: function(isManage){
        this.setState({isManage: isManage})
    },

    onManage: function(){
        if(this.state.isValidate){
            let isManage = !this.state.isManage
            if(this.props.onManage){
                this.props.onManage( isManage )
            }
            this.setState({isManage: isManage})
        }
    },

    renderButtons: function(){
        let buttons = Immutable.fromJS([])
        if(this.state.isManage){
            this.state.data.forEach((v,i)=>{
                let title = v.get("title", "")
                let tooltips = v.get("tooltips", "")
                let tag = v.get("tag", "")
                let icons = v.get("icons", Immutable.fromJS([])).toJS()
                let isIcon = false
                if(icons.length > 0){
                    isIcon = true
                }

                let isValidate = v.get("isChecked", this.state.isToolbarValidate)
                if(!this.state.isValidate){
                    isValidate = false
                }
                let onButton = v.get("onButton")
                let button = <SxButton key = { i }
                    title = { title }
                    tooltips = { tooltips }
                    tag = { tag }
                    icons = { icons }
                    type = "small"
                    space = "r5"
                    isValidate = { isValidate }
                    onButton = { onButton } />

                buttons = buttons.push(button)
            })
        }
 
        return buttons.map((v,k)=> v)
    },

    renderManage: function(){
        let isManage = this.state.isManage
        let title = isManage ? "退出" : ""
        let tooltips = isManage ? "退出管理" : "管理"
        let isValidate = true
        if(!this.state.isValidate){
            isValidate = false
        }
        return  this.props.onManage ?
            <SxButton ref = "toggle_manage" 
                title = { title }
                tooltips = { tooltips }
                tag = { isManage ? "manage" : "default" }
                icons = {["sx-icon-setting"]}
                type = "small"
                isValidate = { isValidate }
                onButton = { this.onManage } />
            :
            ""
    },

    render: function(){ 
    	return <SxBox isRow = { true } isCenter = {true} isMiddle = {true}>
            { this.renderButtons() }
            { this.renderManage() }
        </SxBox>
    }
})

export default SxManageToolbar