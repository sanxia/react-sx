import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 定时器组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxTimer = React.createClass({
    propTypes: function(){
        return {
            interval: React.PropTypes.number,
            delayCount: React.PropTypes.number,
            duration: React.PropTypes.number,
            onInterval: React.PropTypes.func,
            onTimeout: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            interval: 1000,
            delayCount: 0,
            duration: -1,
            isAuto: false,
            onInterval: null,
            onTimeout: null
        }
    },

    getInitialState: function(){
        return{
            delayHandler: null,
            timerHandler: null,
            duration: this.props.duration,
            count: this.props.duration,
            isRun: false
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({duration: nextProps.duration, count: nextProps.duration})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return false
    },

    componentWillMount: function(){
        if(this.props.isAuto){
            this.start()
        }
    },

    componentWillUnmount: function(){
        if(this.state.delayHandler){
            clearTimeout(this.state.delayHandler)
        }

        if(this.state.timerHandler){
            clearTimeout(this.state.timerHandler)
        }
    },

    start: function(){
        let _this = this
        let duration = this.state.duration
        let delayCount = this.props.delayCount < 0 ? 0 : this.props.delayCount

        let delayHandler = setTimeout((function(duration){
            _this.__run__(duration)
        })(duration), delayCount)

        this.setState({isRun: true, delayHandler: delayHandler})
    },

    reset: function(){
        if(this.state.timerHandler){
            clearInterval(this.state.timerHandler)
            this.setState({timerHandler: null})
        }
    },

    suspend: function(){
        this.reset()
        this.setState({isRun: false})
    },

    resume: function(){
        this.__run__(this.state.count)
        this.setState({isRun: true})
    },

    stop: function(){
        this.reset()
        this.setState({isRun: false, count: 0})
    },

    isRun: function(){
        return this.state.isRun
    },

    __run__: function(count){
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
    },

    onInterval: function(count){
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
    },

    render: function() {
        return React.DOM.noscript()
    }
})

export default SxTimer
