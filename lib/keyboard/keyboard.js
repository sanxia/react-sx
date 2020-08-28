import React, { Component } from 'react'
import SxWhiteKey from './white-key'
import SxBlackKey from './black-key'


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
            musicNames: [],
            musicLocations: [],
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({mode: nextProps.mode})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = nextState.mode != this.state.mode

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
            musicNames: this.state.musicNames,
            musicLocations: this.state.musicLocations,
        }
    }

    reset = ()=>{
        this.setState({musicNames: []})
        this.setState({musicLocations: []})
    }

    onSelect = (data)=>{
        let musicName = data.musicName
        let musicLocation = data.musicLocation

        let newMusicNames = this.state.musicNames
        let newMusicLocations = this.state.musicLocations

        if(this.state.isValidate){
            if(data.isSelected){
                newMusicNames.push(musicName)
                newMusicLocations.push(musicLocation)
            }else{
                newMusicNames = this.state.musicNames.filter((item)=>{
                    return item != musicName
                })

                newMusicLocations = this.state.musicLocations.filter((item)=>{
                    return item != musicLocation
                })
            }

            this.setState({
                musicNames: newMusicNames,
                musicLocations: newMusicLocations
            })
        }

        if(this.props.onSelect){
            this.props.onSelect({
                musicNames: newMusicNames,
                musicLocations: newMusicLocations
            })
        }
    }

    renderKeyboardKeys = ()=>{
        let allKeys = ["C","#C","D","#D","E","F","#F","G","#G","A","#A","B"]
        let keyIndex = 0
        let isBlack = false

        let mode = this.state.mode.toUpperCase()
        if(mode != "C" && mode != "F"){
            mode = "C"
        }

        allKeys.forEach((v,k)=>{
            if(v == mode){
                keyIndex = k
            }
        })

        //非C调
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
            let musicLocation = k
            let isBlack = false

            if(mode != "C"){
                if(k <= 6){
                    musicLocation = k + keyIndex
                }else{
                    musicLocation = k - 7
                }
            }
            
            if(v.split("#").length > 1 || v.split("b").length > 1){
                isBlack = true
            }

            if(isBlack){
                return <SxBlackKey
                key = { k }
                musicName = { v }
                musicLocation = { musicLocation }
                isKey = { this.props.isKey }
                isValidate = { ()=>this.state.isValidate }
                onSelect = { (data)=>this.onSelect(data) } />
            }

            return <SxWhiteKey
            key = { k }
            musicName = { v }
            musicLocation = { musicLocation }
            isKey = { this.props.isKey }
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
