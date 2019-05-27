import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 定时器组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTimer extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            duration: props.duration,
            count: props.duration,
            isRun: false,
            delayHandler: null,
            timerHandler: null
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({duration: nextProps.duration, count: nextProps.duration})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    componentWillMount(){
        if(this.props.isAuto){
            this.start()
        }
    }

    componentWillUnmount(){
        if(this.state.delayHandler){
            clearTimeout(this.state.delayHandler)
        }

        if(this.state.timerHandler){
            clearTimeout(this.state.timerHandler)
        }
    }

    start(){
        let _this = this
        let duration = this.state.duration
        let delayCount = this.props.delayCount < 0 ? 0 : this.props.delayCount

        let delayHandler = setTimeout((function(duration){
            _this.__run__(duration)
        })(duration), delayCount)

        this.setState({isRun: true, delayHandler: delayHandler})
    }

    reset(){
        if(this.state.timerHandler){
            clearInterval(this.state.timerHandler)
            this.setState({timerHandler: null})
        }
    }

    suspend(){
        this.reset()
        this.setState({isRun: false})
    }

    resume(){
        this.__run__(this.state.count)
        this.setState({isRun: true})
    }

    stop(){
        this.reset()
        this.setState({isRun: false, count: 0})
    }

    isRun(){
        return this.state.isRun
    }

    onInterval(count){
        this.setState({count: count})

        if(this.props.onInterval){
            this.props.onInterval(count)
        }

        if(count == 0){
            this.stop()
            if(this.props.onTimeout){
                this.props.onTimeout()
            }
        }
    }

    __run__(count){
        let _this = this

        if(this.state.delayHandler){
            clearTimeout(this.state.delayHandler)
            this.setState({delayHandler: null})
        }

        if(!this.state.timerHandler){
            let timerHandler = setInterval(function(){
                count -= 1
                _this.onInterval(count)
            }, this.props.interval)

            this.setState({timerHandler: timerHandler})
        }
    }

    render() {
        return React.DOM.noscript()
    }
}

SxTimer.propTypes = {
    interval: React.PropTypes.number,
    delayCount: React.PropTypes.number,
    duration: React.PropTypes.number,
    onInterval: React.PropTypes.func,
    onTimeout: React.PropTypes.func
};

SxTimer.defaultProps = {
    interval: 1000,
    delayCount: 0,
    duration: -1,
    isAuto: false,
    onInterval: null,
    onTimeout: null
};

export default SxTimer
