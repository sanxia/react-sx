import React, { Component } from 'react'
import Immutable from 'immutable'
import SxBox from '../box/box'
import SxLink from '../link/link'
import SxImage from '../image/image'


/* ================================================================================
 * 视频播放组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxVideo = React.createClass({
    propTypes: function(){
        return {
            imageUrl: React.PropTypes.string,
            videoUrl: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number,
            isBufferPlay: React.PropTypes.bool,
            onPlay: React.PropTypes.func,
            onPause: React.PropTypes.func,
            onFinished: React.PropTypes.func,
            onTime: React.PropTypes.func,
            onLoading: React.PropTypes.func,
            onError: React.PropTypes.func,
            onEnter: React.PropTypes.func,
            onLeave: React.PropTypes.func,
        }
    },

    getDefaultProps: function(){
        return {
            imageUrl: "",
            videoUrl: "",
            width: 0,
            height: 0,
            isBufferPlay: true
        }
    },

    getInitialState: function(){
        return {
            imageUrl: this.props.imageUrl,
            videoUrl: this.props.videoUrl,
            width: this.props.width,
            height: this.props.height,
            duration: 0,
            currentTime: 0,
            volume: 0.8,
            actionCode: "",
            isFullScreen: false,
            isActive: false,
            isControl: false,
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({imageUrl: nextProps.imageUrl})
        this.setState({videoUrl: nextProps.videoUrl})
        this.setState({width: nextProps.width})
        this.setState({height: nextProps.height})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = nextState.imageUrl != this.state.imageUrl
        || nextState.videoUrl != this.state.videoUrl
        || nextState.width != this.state.width
        || nextState.height != this.state.height
        || nextState.actionCode != this.state.actionCode
        || nextState.isControl != this.state.isControl
        || nextState.isActive != this.state.isActive
        return isChanged
    },

    componentDidUpdate: function(prevProps, prevState){
        if(this.state.actionCode == "load"){
            if(!this.props.isBufferPlay){
                this.video.play()
                this.video.pause()
                this.video.addEventListener("loadeddata", (e)=>{
                    this.onLoadedData(e)
                })
            }else{
                this.play()
            }

            this.video.addEventListener("timeupdate", (e)=>{
                this.onTimeUpdate(e)
            })

            this.video.addEventListener("seeked", (e)=>{
                this.onSeeked(e)
            })

            this.video.addEventListener("error", (e)=>{
                this.onError(e)
            })
        }
    },

    componentWillUnmount: function(){
        if(this.state.actionCode != ""){
            if(!this.props.isBufferPlay){
                this.video.removeEventListener("loadeddata", (e)=>{
                    this.onLoadedData(e)
                })
            }

            this.video.removeEventListener("timeupdate", (e)=>{
                this.onTimeUpdate(e)
            })

            this.video.removeEventListener("seeked", (e)=>{
                this.onSeeked(e)
            })

            this.video.removeEventListener("error", (e)=>{
                this.onError(e)
            })
        }
    },

    load: function(videoUrl){
        this.video.pause()
        this.video.src = videoUrl
        this.video.load()
        this.video.play()
    },

    play: function(){
        if(this.props.onPlay){
            this.props.onPlay()
        }

        if(this.state.actionCode == ""){
            this.setState({actionCode: "load", isControl: true})
        }else{
            this.setState({actionCode: "play"})
            this.video.play()
        }
    },

    pause: function(){
        if(this.props.onPause){
            this.props.onPause()
        }

        this.setState({actionCode: "pause"})
        this.video.pause()
    },

    stop: function(){
        if(this.props.onStop){
            this.props.onStop()
        }

        this.video.pause()
        this.video.src = ""
    },

    setSeek: function(value){
        this.video.currentTime = value / 100 * this.state.duration
    },

    setVolume: function(value){
        this.video.volume = value
    },

    mute: function(){
        if(this.video.muted){
            this.setVolume(this.state.volume)
            this.video.muted = false
        }else{
            this.setState({volume: this.video.volume})
            this.setVolume(0)
            this.video.muted = true
        }
    },

    buffered: function() {
        let buffered = 0
        try {
            buffered = this.video.buffered.end(0) || 0
            buffered = parseInt(buffered * 1000 + 1) / 1000
            buffered = Math.ceil(buffered)
        } catch(e) {}
        return buffered
    },

    fullScreen: function(){
        if(!this.state.isFullScreen){
            if(this.player.requestFullscreen) {
                this.player.requestFullscreen()
            } else if(this.player.mozRequestFullScreen) {
                this.player.mozRequestFullScreen()
            } else if(this.player.msRequestFullscreen) {
                this.player.msRequestFullscreen()
            } else if(this.player.oRequestFullscreen) {
                this.player.oRequestFullscreen()
            } else if(this.player.webkitRequestFullscreen) {
                this.player.webkitRequestFullScreen()
            } else {
                alert("浏览器版本过低，不支持此操作！")
            }
        }else{
            if(document.exitFullscreen) {
                document.exitFullscreen()
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if(document.msRequestFullscreen) {
                document.msExitFullscreen()
            } else if(document.oRequestFullscreen) {
                document.oCancelFullScreen()
            } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else {
                alert("浏览器版本过低，不支持此操作！")
            }
        }

        this.setState({isFullScreen: !this.state.isFullScreen})
    },

    onLoadedData: function(e){
        let timer = setInterval(()=>{
            let buffered = this.buffered()
            let loadingPer = Math.floor( buffered / parseInt(this.video.duration) * 100 )
            
            if(this.props.onLoading){
                this.props.onLoading(loadingPer)
            }

            if(buffered < parseInt(this.video.duration)) {
                return
            }

            if(this.props.onLoading){
                this.props.onLoading(100)
            }

            if(!this.props.isBufferPlay){
                this.play()
            }

            clearInterval(timer)
        }, 100)
    },

    onTimeUpdate: function(e){
        let currentTime = this.video.currentTime
        let duration = this.video.duration

        this.setState({currentTime: currentTime, duration: duration})

        if(duration > 0 && currentTime == duration){
            this.pause()
        }

        if(this.props.onTime){
            this.props.onTime({
                currentTime: parseInt(currentTime),
                duration: parseInt(duration)
            })
        }
    },

    onSeeked: function(){
        if(this.props.onFinished){
            this.props.onFinished()
        }
    },

    onError: function(e){
        if(this.props.onError){
            this.props.onError(e)
        }
    },

    onButton: function(){
        let actionCode = ""
        if(this.state.actionCode == ""){
            actionCode = "load"
            this.setState({actionCode: actionCode})
        }else if(this.state.actionCode == "play"){
            actionCode = "pause"
            this.pause()
        }else if(this.state.actionCode == "pause"){
            actionCode = "play"
            this.play()
        }
    },

    enter: function(){
        if(this.props.onEnter){
            this.props.onEnter(this.state.isControl)
        }
        this.setState({isActive: true})
    },

    leave: function(){
        if(this.props.onLeave){
            this.props.onLeave(this.state.isControl)
        }
        this.setState({isActive: false})
    },

    render: function(){
        let imageUrl = this.state.imageUrl
        let videoUrl = this.state.videoUrl
        let width = this.state.width + ""
        let height = this.state.height + ""
        let actionCode = this.state.actionCode

        return <SxBox ref = { (player) => { this.player = player} }
            isRow = { false }
            isCenter = { true }
            isMiddle = { true }
            onEnter = {()=>{this.enter()}}
            onLeave = {()=>{this.leave()}}
            >
                <div className = "sx-video">
                {
                    actionCode == "" ?
                    <SxImage url = { imageUrl }
                    width = { width }
                    height = { height }/>
                    :
                    <video webkit-playsinline ref = { (video)=> this.video = video}
                    width = { width }
                    height = { height }
                    objectfit = "fill"
                    ishivideo = "true"
                    isrotate = "false"
                    preload = "true" >
                        <source src = { videoUrl } type = "video/mp4" />
                    </video>
                }

                {
                    actionCode != "play" ?
                    <i onClick = { this.onButton } className = "sx-video-play"></i>
                    :
                    actionCode == "play" && this.state.isActive ?
                    <i onClick = { this.onButton } className = "sx-video-pause"></i>
                    :
                    ""
                }
                </div>

                { this.props.children }
        </SxBox>
    }
})

export default SxVideo
