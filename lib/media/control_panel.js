import React, { Component } from 'react'
import Immutable from 'immutable'
import SxBox from '../box/box'
import SxImageButton from '../button/image-button'
import SxProgress from '../progress/progress'
import { util } from '../util'


/* ================================================================================
 * 媒体控制面板
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxControlPanel = React.createClass({
    propTypes: function(){
        return {
            volume: React.PropTypes.number,
            isControls: React.PropTypes.bool,
            isHide: React.PropTypes.bool,
            onVolume: React.PropTypes.func,
            onProgressChanged: React.PropTypes.func,
            onPlay: React.PropTypes.func,
            onPause: React.PropTypes.func,
            onStop: React.PropTypes.func,
        }
    },

    getDefaultProps: function(){
        return {
            volume: 0.8,
            isControls: false,
            isHide: true
        }
    },

    getInitialState: function(){
        return {
            currentTime: 0,
            duration: 0,
            volume: this.props.volume,
            isControls: this.props.isControls,
            isHide: this.props.isHide
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({volume: nextProps.volume})
        this.setState({isControls: nextProps.isControls})
        this.setState({isHide: nextProps.isHide})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = nextState.currentTime != this.state.currentTime
        || nextState.duration != this.state.duration
        || nextState.volume != this.state.volume
        || nextState.isControls != this.state.isControls
        || nextState.isHide != this.state.isHide
        return isChanged
    },

    componentDidUpdate: function(prevProps, prevState){

    },

    componentWillUnmount: function(){

    },

    setHide: function(isHide){
        this.setState({isHide: isHide})
    },

    setPlay: function(){
        if(this.state.isControls){
            this.playbtn.setChecked(true)  
        }

        this.setState({isHide: false})
    },

    setPause: function(){
        if(this.state.isControls){
            this.playbtn.setChecked(false)  
        }
    },

    play: function(){
        if(this.props.onPlay){
            this.props.onPlay()
        }
        if(this.state.isControls){
            this.playbtn.setChecked(true)
        }
    },

    pause: function(){
        if(this.props.onPause){
            this.props.onPause()
        }

        if(this.state.isControls){
            this.playbtn.setChecked(false)
        }
    },

    stop: function(){
        if(this.props.onStop){
            this.props.onStop()
        }
    },

    progressChanged: function(value){
        if(this.props.onProgressChanged){
            this.props.onProgressChanged(value)
        }
    },

    setTime: function(currentTime, duration){
        this.setState({currentTime: currentTime, duration: duration})
    },

    setCurrentTime: function(value){
        this.setState({currentTime: value})
    },

    setDuration: function(value){
        this.setState({duration: value})
    },

    setValue: function(value){
        this.progress.setValue(value)
    },

    mute: function(){
        if(this.video.muted){
            this.video.muted = false
        }else{
            this.video.muted = true
        }
    },

    renderControls: function(){
        let controls = this.state.isControls ? <SxBox>
            <SxImageButton ref = { (playbtn) => {this.playbtn = playbtn} }
            images = {
            ["/static/img/sprite/video_00.png",
            "/static/img/sprite/video_01.png",
            "/static/img/sprite/video_02.png",
            "/static/img/sprite/play_01.png"] 
            }
            isValidate = {true}
            onButton = { (option)=>{ if(option.isChecked){this.pause()}else{this.play()};return true; } } />
            </SxBox>
            :
            ""
        return controls
    },

    render: function(){
        let playTime = util.secondsToPlayTimeString(this.state.currentTime, this.state.duration)
        let totalTime = util.secondsToTimeString(this.state.duration)
        let progressValue = parseInt(this.state.currentTime / this.state.duration * 100)

        let controls = this.renderControls()

        let cssClass = "sx-control-panel"
        if(this.state.isHide){
            cssClass += " sx-control-panel-hide"
        }

        return <SxBox className = { cssClass }
            isRow = { true }
            isCenter = { true }
            isMiddle = { true }
            onEnter = {()=>{}}
            onLeave = {()=>{}}
            >
                { controls }

                <span >{ playTime }</span>

                <SxProgress ref = { (progress) => {this.progress = progress} }
                value = { progressValue }
                option = { {width: 170, height: 4, padding:5, thumbWidth: 8, thumbHeight: 16, isDrag: true} }
                onChange = { (value) => { this.progressChanged(value) } } />

                <span >{ totalTime }</span>
        </SxBox>
    }
})

export default SxControlPanel
