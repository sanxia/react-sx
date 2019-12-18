import React, { Component } from 'react'
import Immutable from 'immutable'
import SxBox from '../box/box'
import SxWhiteKey from './white-key'
import SxBlackKey from './black-key'
import { util } from '../util'


/* ================================================================================
 * 钢琴键盘
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxKeyboard extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            mode: props.mode,
            musicCodes: [],
            singCodes: [],
            isValidate: props.isValidate,
            onSelect: props.onSelect
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({mode: nextProps.mode})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = nextState.mode != this.state.mode
        //|| nextState.isValidate != this.state.isValidate

        return isChanged
    }

    componentDidUpdate = (prevProps, prevState)=>{

    }

    componentWillUnmount = ()=>{

    }

    getMode = ()=>{
        return this.state.mode
    }

    getData = ()=>{
        return {
            musicCodes: this.state.musicCodes,
            singCodes: this.state.singCodes,
        }
    }

    reset = ()=>{
        this.setState({musicCodes: []})
        this.setState({singCodes: []})
    }

    onSelect = (data)=>{
        let musicCode = data.musicCode
        let singCode = data.singCode

        let newMusicCodes = this.state.musicCodes
        let newSingCodes = this.state.singCodes

        if(this.state.isValidate){
            if(data.isSelected){
                newMusicCodes.push(musicCode)
                newSingCodes.push(singCode)
            }else{
                newMusicCodes = this.state.musicCodes.filter((item)=>{
                    return item != musicCode
                })

                newSingCodes = this.state.singCodes.filter((item)=>{
                    return item != singCode
                })
            }

            this.setState({musicCodes: newMusicCodes})
            this.setState({singCodes: newSingCodes})
        }

        if(this.props.onSelect){
            this.props.onSelect({
                musicCodes: newMusicCodes,
                singCodes: newSingCodes
            })
        }
    }

    renderKeyboardKeys = ()=>{
        let allKeys = ["C","#C","D","#D","E","F","#F","G","#G","A","#A","B"]
        let keyIndex = 0

        let mode = this.state.mode.toUpperCase()
        if(mode != "C" && mode != "F"){
            mode = "C"
        }

        let isBlack = false

        allKeys.forEach((v,k)=>{
            if(v == mode){
                keyIndex = k
            }
        })

        if(mode != "C"){
            let newKeys = []
            for(var i = keyIndex; i < allKeys.length; i ++){
                newKeys.push(allKeys[i])
            }

            for(var j = 0; j < keyIndex; j ++){
                newKeys.push(allKeys[j])
            }

            allKeys = newKeys
        }

        return allKeys.map((v,k)=>{
            let isBlack = false
            let singIndex = k + 1

            if(mode != "C"){
                if(singIndex <= 7){
                    singIndex = singIndex + 5
                }else{
                    singIndex = singIndex - 7
                }
            }
            
            if(v.split("#").length > 1 || v.split("b").length > 1){
                isBlack = true
            }

            if(isBlack){
                return <SxBlackKey key = {k}
                musicCode = { v }
                singCode = { singIndex.toString() }
                isValidate = { ()=>this.state.isValidate }
                onSelect = { (data)=>this.onSelect(data) } />
            }

            return <SxWhiteKey key = { k }
            musicCode = { v }
            singCode = { singIndex.toString() }
            isValidate = { ()=>this.state.isValidate }
            onSelect = { (data)=>this.onSelect(data) } />
        })
    }

    render = ()=>{
        let keyboardClass = "sx-box sx-box-css sx-box-rsb sx-keyboard"
        return <div className = "sx-box sx-box-csc sx-box-rsc sx-box-f">
           <div className = { keyboardClass }>
                { this.renderKeyboardKeys() }
            </div>
        </div>
    }
}

SxKeyboard.propTypes = {
    mode: React.PropTypes.string,
    isValidate: React.PropTypes.bool,
    onSelect: React.PropTypes.func
};

SxKeyboard.defaultProps = {
    mode: "C",
    isValidate: true,
    onSelect: null
}

export default SxKeyboard
