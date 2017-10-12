import React, { Component } from 'react'
import Immutable from 'immutable'
import ClassNames from 'classnames'
import SxBox from '../box/box'
import SxLink from '../link/link'
import SxImage from '../image/image'


/* ================================================================================
 * 音频播放组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
class SxAudio extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            url: props.url,
            imageUrl: props.imageUrl,
            duration: 0,
            currentTime: 0,
            volume: 0.8,
            statusCode: "",
            isActive: false,
            isControl: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({url: nextProps.url})
        this.setState({imageUrl: nextProps.imageUrl})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = nextState.url != this.state.url
        || nextState.imageUrl != this.state.imageUrl
        || nextState.statusCode != this.state.statusCode
        || nextState.isControl != this.state.isControl
        || nextState.isActive != this.state.isActive
        return isChanged
    }

    componentDidMount(){
        let sxAudio = document.querySelector("#sx-audio")
        sxAudio.addEventListener('canplay', ()=>this.onCanPlay(sxAudio))
    }

    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * 注册监听事件
     * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    componentDidUpdate(prevProps, prevState){
        if(this.state.statusCode == "load"){
            if(!this.props.isBufferPlay){
                this.audio.play()
                this.audio.pause()
                this.audio.addEventListener("loadeddata", (e)=>this.onLoadedData(e))
            }else{
                this.play()
            }

            window.addEventListener('keydown', (e)=>this.onKeydown(e), false)
            this.audio.addEventListener("loadstart", (e)=>this.onLoadStart(e))
            this.audio.addEventListener("timeupdate", (e)=>this.onTimeUpdate(e))
            this.audio.addEventListener("seeked", (e)=>this.onSeeked(e))
            this.audio.addEventListener("ended", (e)=>this.onEnded(e))
            this.audio.addEventListener("error", (e)=>this.onError(e))
        }
    }

    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * 取消监听事件
     * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    componentWillUnmount(){
        if(this.state.statusCode != ""){
            this.stop()
            
            if(!this.props.isBufferPlay){
                this.audio.removeEventListener("loadeddata", (e)=>this.onLoadedData(e))
            }

            window.removeEventListener('keydown', (e)=>this.onKeydown(e), false)
            this.audio.removeEventListener("loadstart", (e)=>this.onLoadStart(e))
            this.audio.removeEventListener("timeupdate", (e)=>this.onTimeUpdate(e))
            this.audio.removeEventListener("seeked", (e)=>this.onSeeked(e))
            this.audio.removeEventListener("ended", (e)=>this.onEnded(e))
            this.audio.removeEventListener("error", (e)=>this.onError(e))
        }

        let sxAudio = document.querySelector("#sx-audio")
        sxAudio.removeEventListener('canplay', ()=>this.onCanPlay(sxAudio))
    }

    load(url){
        this.audio.pause()
        this.audio.src = url
        this.audio.load()
        this.audio.play()
    }

    play(){
            if(this.props.onPlay){
                this.props.onPlay()
            }

            if(this.state.statusCode == ""){
                this.setState({statusCode: "load", isControl: true})
            }else{
                 this.setState({statusCode: "play"})
                 this.audio.play()
            }
    }

    pause(){
        if(this.props.onPause){
            this.props.onPause()
        }

        this.setState({statusCode: "pause"})
        this.audio.pause()
    }

    stop(){
        if(this.props.onStop){
            this.props.onStop()
        }

        this.audio.currentTime = 0
        this.audio.pause()
        this.audio.src = ""
    }

    fast(){
        if(!this.audio.ended){
            this.audio.currentTime += 5
            this.audio.play()
        }
    }

    back(){
        this.audio.currentTime -= 5
        this.audio.play()
    }

    mute(){
        if(this.audio.muted){
            this.setVolume(this.state.volume)
            this.audio.muted = false
        }else{
            this.setState({volume: this.audio.volume})
            this.setVolume(0)
            this.audio.muted = true
        }
    }

    setVolume(value){
        this.audio.volume = value
        if(this.props.onVolume){
            this.props.onVolume(value)
        }
    }

    setSeek(value){
        this.audio.currentTime = value / 100 * this.state.duration
        this.audio.play()
    }

    buffered() {
        let buffered = 0
        try {
            buffered = this.audio.buffered.end(0) || 0
            buffered = parseInt(buffered * 1000 + 1) / 1000
            buffered = Math.ceil(buffered)
        } catch(e) {}
        return buffered
    }

    onKeydown(e){
        if (e.keyCode === 32) {
            if (this.audio.paused) {
                this.play()
            } else {
                this.pause()
            }
        }
    }

    onLoadStart(e){
        if(this.props.onLoad){
            this.props.onLoad(e)
        }
    }

    onLoadedData(e){
        let timer = setInterval(()=>{
            let buffered = this.buffered()
            let loadingPer = Math.floor( buffered / parseInt(this.audio.duration) * 100 )
            
            if(this.props.onLoading){
                this.props.onLoading(loadingPer)
            }

            if(buffered < parseInt(this.audio.duration)) {
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
    }

    onCanPlay(data){
        if(this.props.onCanPlay){
            this.props.onCanPlay(data)
        }
    }

    onTimeUpdate(e){
        let currentTime = this.audio.currentTime
        let duration = this.audio.duration

        this.setState({currentTime: currentTime, duration: duration})

        if(duration > 0 && currentTime == duration){
            this.pause()
        }

        if(this.props.onUpdate){
            this.props.onUpdate({
                currentTime: parseInt(currentTime),
                duration: parseInt(duration)
            })
        }
    }

    onSeeked(e){

    }

    onEnded(e){
        if(this.props.onEnd){
            this.props.onEnd(e)
        }
    }

    onError(e){
        if(this.props.onError){
            this.props.onError(e)
        }
    }

    onButton(){
        if(this.state.url != ""){
            let statusCode = ""
            if(this.state.statusCode == ""){
                statusCode = "load"
                this.setState({statusCode: statusCode})
            }else if(this.state.statusCode == "play"){
                statusCode = "pause"
                this.pause()
            }else if(this.state.statusCode == "pause"){
                statusCode = "play"
                this.play()
            }
        }else{
            alert("无音频文件")
        }
    }

    onEnter(){
        if(this.props.onEnter){
            this.props.onEnter(this.state.isControl)
        }
        this.setState({isActive: true})
    }

    onLeave(){
        if(this.props.onLeave){
            this.props.onLeave(this.state.isControl)
        }
        this.setState({isActive: false})
    }

    render(){
        let statusCode = this.state.statusCode

        let audioClass = ClassNames({
            "sx-audio": true,
            "sx-active": this.state.statusCode == "play"
        })

        let coverImageClass = ClassNames({
            "sx-w180": true,
            "sx-h180": true,
            "sx-circle": true,
            "sx-animation-rotate-360": true,
            "sx-animation": true
        })

        return <SxBox
            isRow = { false }
            isCenter = { true }
            isMiddle = { true }
            onEnter = {()=>{this.onEnter()}}
            onLeave = {()=>{this.onLeave()}}
            >
                <div className = { audioClass }>
                    <img id = "sx-audio-cover" className = { coverImageClass } src = { this.state.imageUrl } />

                    <audio id = "sx-audio"
                    ref = { (audio)=> this.audio = audio}
                    src = { this.state.url }
                    crossOrigin = "anonymous"
                    type = "audio/mpeg">
                        您的浏览器不支持音频播放标签
                    </audio>
                
                {
                    statusCode != "play" ?
                    <i onClick = { ()=>this.onButton() } className = "sx-video-play"></i>
                    :
                    statusCode == "play" && this.state.isActive ?
                    <i onClick = { ()=>this.onButton() } className = "sx-video-pause"></i>
                    :
                    ""
                }
                </div>

                { this.props.children }
        </SxBox>
    }
}

SxAudio.defaultProps = {
    url: "",
    imageUrl: "",
    isBufferPlay: true
}

export default SxAudio
