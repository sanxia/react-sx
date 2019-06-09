import React, { Component } from 'react'
import Immutable from 'immutable'
import { SxBox } from '../box/index'
import { SxButton } from '../button/index'
import { SxImage } from '../image/index'
import { SxLink } from '../link/index'


/* ================================================================================
 * 管理工具条组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxManageToolbar extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            toolbars: Immutable.fromJS(props.toolbars),
            isValidate: props.isValidate,
            isManage: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState( { toolbars: Immutable.fromJS(nextProps.toolbars) } )
        this.setState( { isValidate: nextProps.isValidate } )
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.toolbars, this.state.toolbars)
        || nextState.isValidate != this.state.isValidate
        || nextState.isManage != this.state.isManage

        return isChange
    }

    setValidate(isValidate){
        this.setState({isValidate: isValidate})
    }

    isManage(){
        return this.state.isManage
    }

    onManage = ()=>{
        if(this.state.isValidate){
            let isManage = !this.state.isManage
            if(this.props.onManage){
                this.props.onManage(isManage)
            }

            this.setState({isManage: isManage})
        }
    }

    renderButtons = ()=>{
        let buttons = Immutable.fromJS([])
        if(this.state.isManage){
            this.state.toolbars.forEach((v,i)=>{
                let title = v.get("title", "")
                let tag = v.get("tag", "")
                let icons = v.get("icons", Immutable.fromJS([])).toJS()
                let isIcon = false

                if(icons.length > 0){
                    isIcon = true
                }

                let isValidate = v.get("isChecked", false)
                /*if(!this.state.isValidate){
                    isValidate = false
                }*/

                let onButton = v.get("onButton", ()=>{})
                let button = <SxLink
                key = { i }
                title = { title }
                tag = { tag }
                className = "sx-mlr5"
                isValidate = { isValidate }
                onLink = { ()=>onButton() }>
                {
                    isIcon ? <SxImage title = { title } url = { icons } /> : title
                }
                </SxLink>

                buttons = buttons.push(button)
            })
        }
 
        return buttons.map((v,k)=> v)
    }

    renderButtons2 = ()=>{
        let buttons = Immutable.fromJS([])

        if(this.state.isManage){
            this.state.toolbars.forEach((v,i)=>{
                let title = v.get("title", "")
                let tag = v.get("tag", "")
                let icons = v.get("icons", Immutable.fromJS([])).toJS()
                let isIcon = false
                if(icons.length > 0){
                    isIcon = true
                }

                let isValidate = v.get("isChecked", false)
                if(!this.state.isValidate){
                    isValidate = false
                }

                let onButton = v.get("onButton", null)
                let button = <SxButton
                key = { i }
                title = { title }
                tag = { tag }
                icons = { icons }
                type = "small"
                className = "sx-mlr5"
                isValidate = { isValidate }
                onButton = { onButton } />

                buttons = buttons.push(button)
            })
        }
 
        return buttons.map((v,k)=> v)
    }

    renderManage = ()=>{
        let isManage = this.state.isManage
        let title = isManage ? "退出" : ""
        let isValidate = true

        if(!this.state.isValidate){
            isValidate = false
        }

        return  this.props.onManage ?
            <SxButton
            title = { title }
            tag = { isManage ? "manage" : "default" }
            icons = {["/static/img/sx/setting.png"]}
            type = "small"
            isValidate = { isValidate }
            onButton = { ()=>this.onManage() } />
            :
            ""
    }

    render = ()=>{ 
    	return (
        <SxBox
        className = "sx-manage-bar"
        isPadding = { false }
        isMargin = { false }
        isRow = { true }
        isCenter = {true}
        isMiddle = {true}>

            { this.renderButtons() }

            { this.renderManage() }

        </SxBox>
        )
    }
}

SxManageToolbar.propTypes = {
    toolbars: React.PropTypes.array,
    isValidate: React.PropTypes.bool
};

SxManageToolbar.defaultProps = {
    toolbars: [],
    isValidate: true
};

export default SxManageToolbar