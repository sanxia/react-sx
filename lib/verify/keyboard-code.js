import React, { Component } from 'react'
import { SxImage } from '../image/index'
import { SxButton } from '../button/index'
import { SxKeyboard } from '../keyboard/index'


/* ================================================================================
 * 钢琴键盘图片验证码组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxKeyboardCode extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            mode: props.mode,
            tick: new Date().getTime(),
            url: props.url,
            isActivating: props.isActivating,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({isActivating: nextProps.isActivating})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChange = nextState.mode != this.state.mode
        || nextState.tick != this.state.tick
        || nextState.isActivating != this.state.isActivating
        || nextState.isValidate != this.state.isValidate

        isChange = true
        
        return isChange
    }

    getData = ()=>{
        let keyboradData = this.keyboard.getData()
        return keyboradData
    }

    setValidate = (isSuccess)=>{
        this.setState({isValidate: isSuccess})
    }

    refresh = ()=>{
       let newMode = this.state.mode == "C" ? "F" : "C"
       this.setState({mode: newMode})

        let tick = new Date().getTime()
        this.setState({tick: tick, isValidate: false, isActivating: false})

        this.keyboard.reset()
    }

    onRefresh = ()=>{
        this.refresh()

        if(this.props.onRefresh){
            this.props.onRefresh()
        }
    }

    onSelect = (data)=>{
        if(this.state.isActivating) return;

        let isValidate = true

        if(this.props.onSelect){
            isValidate = this.props.onSelect(data)
        }else{
            isValidate = data.musicNames.length >= 5
        }

        this.setState({isValidate: isValidate})
    }

    onCheck = ()=>{
        if(!this.state.isValidate) return;

        this.setState({isActivating: !this.state.isActivating})

        if(this.props.onCheck){
            let keyboradData = this.keyboard.getData()

            this.props.onCheck(keyboradData)
        }
    }

    render = ()=>{
        let url = this.state.url + "?r=" + this.state.tick
        
        return <div className = "sx-box sx-box-c sx-box-rsc sx-box-css sx-verify-keyboard">
            <span title = "刷新" alt = "刷新" className = "sx-verify-keyboard-refresh" onMouseDown = { ()=>this.onRefresh() }></span>

            <div className = "sx-box sx-box-r sx-box-rsc sx-box-csc sx-box-f sx-verify-keyboard-image" onSelectStart = { ()=>{return false} }>
                <SxImage title = "刷新" url = { url }/>
            </div>

            <div className = "sx-box sx-box-csc sx-box-rsc">
                <SxKeyboard ref = { (keyboard)=>this.keyboard = keyboard }
                mode = { this.state.mode }
                isKey = { this.props.isKey }
                isValidate = { !this.state.isActivating }
                onSelect = { (data)=>this.onSelect(data)} />
            </div>

            { this.props.children }

            {
                this.props.isOkButton && 
                <div className = "sx-box sx-box-r sx-box sx-box-csc sx-box-rsc sx-box-f">
                    <SxButton
                    ref = {(checkButton)=>{this.checkButton = checkButton}}
                    title = "确定"
                    activatingTitle = "处理中..."
                    icons = {["", "", "/static/img/loading/04.gif", ""]}
                    isActivating = { this.state.isActivating }
                    isValidate = { this.state.isValidate }
                    onButton = { ()=>this.onCheck() } />
                </div>
            }
        </div>
    }
}

SxKeyboardCode.propTypes = {
    mode: React.PropTypes.string,
    url: React.PropTypes.string,
    isOkButton: React.PropTypes.bool,
    isActivating: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    onRefresh: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onCheck: React.PropTypes.func
};

SxKeyboardCode.defaultProps = {
    mode: "C",
    url: "",
    isOkButton: true,
    isActivating: false,
    isValidate: false,
    onRefresh: null,
    onSelect: null,
    onCheck: null
};

export default SxKeyboardCode
