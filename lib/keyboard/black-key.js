import React, { Component } from 'react'
import Immutable from 'immutable'
import SxBox from '../box/box'


/* ================================================================================
 * 钢琴键
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxBlackKey extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            musicCode: props.musicCode,
            singCode: props.singCode,
            color: props.color,
            bgColor: props.bgColor,
            isDown: false,
            isActiving: props.isActiving,
            isSelected: props.isSelected,
            isValidate: props.isValidate,
            onSelect: props.onSelect
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({musicCode: nextProps.musicCode})
        this.setState({color: nextProps.color})
        this.setState({bgColor: nextProps.bgColor})
        this.setState({isActiving: nextProps.isActiving})
        this.setState({isSelected: nextProps.isSelected})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = nextState.musicCode != this.state.musicCode
        || nextState.color != this.state.color
        || nextState.bgColor != this.state.bgColor
        || nextState.isDown != this.state.isDown
        || nextState.isActiving != this.state.isActiving
        || nextState.isSelected != this.state.isSelected
        || nextState.isValidate != this.state.isValidate
        return isChanged
    }

    componentDidUpdate = (prevProps, prevState)=>{
    }

    componentWillUnmount = ()=>{
    }

    setSelect = (isSelected)=>{
        this.setState({isSelected: isSelected})
    }

    onMouseEnter = (e)=>{
        if(this.state.isValidate){
            if(this.props.onEnter){
                this.props.onEnter()
            }

            this.setState({isActiving: true})
        }
    }

    onMouseLeave = (e)=>{
        if(this.state.isValidate){
            if(this.props.onLeave){
                this.props.onLeave()
            }

            this.setState({isActiving: false})
        }
    }

    onMouseDown = (e)=>{
        if(this.state.isValidate){
            this.setState({isDown: true})
            this.setState({isActiving: false})
        }
    }

    onMouseUp = (e)=>{
        if(this.state.isValidate){
            if(this.props.onSelect){
                this.props.onSelect({
                    musicCode: this.state.musicCode,
                    singCode: this.props.singCode,
                    isBlack: true,
                    isSelected: !this.state.isSelected
                })
            }

            this.setState({isDown: false})
            this.setState({isSelected: !this.state.isSelected})
        }
    }

    renderBlackKey = ()=>{
        let currentCode = this.state.musicCode.split("#")[1]
        let hightMaps = {
            "C": "D",
            "D": "E",
            "F": "G",
            "G": "A",
            "A": "B"
        }

        let lowerCode  = Immutable.fromJS(hightMaps).get(currentCode)
        let hightKey = this.state.musicCode
        let lowerKey = "b" + lowerCode

        let blackKeyClass = "sx-keyboard-blackkey"
        if(this.state.isDown){
            blackKeyClass = blackKeyClass + " sx-keyboard-blackkey-select"
        }else{
            if(this.state.isActiving){
                blackKeyClass = blackKeyClass + " sx-keyboard-blackkey-activing"
            }else{
                if(this.state.isSelected){
                    blackKeyClass = blackKeyClass + " sx-keyboard-blackkey-select"
                }
            }
        }

        return <div className = { blackKeyClass }
            onMouseEnter = { (e)=>this.onMouseEnter(e) }
            onMouseLeave = { (e)=>this.onMouseLeave(e) }
            onMouseDown = { (e)=>this.onMouseDown(e) }
            onMouseUp = { (e)=>this.onMouseUp(e) } >

            <div className = "sx-box sx-box-c sx-box-csc sx-box-rsc sx-keyboard-blackkey-icon">
                {
                    this.state.isSelected && <div className = "sx-keyboard-blackkey-selected"></div>
                }

                {
                    this.props.isKey && this.state.isSelected && <span className = "sx-keyboard-blackkey-text">{ hightKey }</span>
                }

                {
                    this.props.isKey && this.state.isSelected && <span className = "sx-keyboard-blackkey-text">{ lowerKey }</span>
                }
            </div>

        </div>
    }

    render = ()=>{
        return this.renderBlackKey()
    }
}

SxBlackKey.propTypes = {
    musicCode: React.PropTypes.string,
    singCode: React.PropTypes.string,
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,
    isActiving: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    onSelect: React.PropTypes.func
};

SxBlackKey.defaultProps = {
    musicCode: "C#",
    singCode: "8",
    color: "#333",
    bgColor: "#f9f9f9",
    isActiving: false,
    isSelected: false,
    isValidate: true,
    onSelect: null
}

export default SxBlackKey
