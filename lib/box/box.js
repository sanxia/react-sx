import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * Box容器组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxBox = React.createClass({
    getDefaultProps: function(){
        return {
            isRow: true,
            isReverse: false,
            isLeft: false,
            isCenter: false,
            isRight: false,
            isBetween: false,
            isAround: false,
            isTop: false,
            isMiddle: false,
            isBottom: false,
            isStretch: false,
            isWrap: true,
            isFlex: false,
            isPadding: true,
            isMargin: false,
            isDisabled: false,
            isActive: false,
            isTracking: false,
            onEnter: null,
            onLeave: null,
        }
    },

    getInitialState: function(){
        return {
            isRow: this.props.isRow,
            isReverse: this.props.isReverse,
            isLeft: this.props.isLeft,
            isCenter: this.props.isCenter,
            isRight: this.props.isRight,
            isBetween: this.props.isBetween,
            isAround: this.props.isAround,
            isTop: this.props.isTop,
            isMiddle: this.props.isMiddle,
            isBottom: this.props.isBottom,
            isStretch: this.props.isStretch,
            isWrap: this.props.isWrap,
            isFlex: this.props.isFlex,
            isPadding: this.props.isPadding,
            isMargin: this.props.isMargin,
            isDisabled: this.props.isDisabled,
            isActive: this.props.isActive
        }
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({isRow: nextProps.isRow})
        this.setState({isReverse: nextProps.isReverse})
        this.setState({isLeft: nextProps.isLeft})
        this.setState({isCenter: nextProps.isCenter})
        this.setState({isRight: nextProps.isRight})
        this.setState({isBetween: nextProps.isBetween})
        this.setState({isAround: nextProps.isAround})

        this.setState({isTop: nextProps.isTop})
        this.setState({isMiddle: nextProps.isMiddle})
        this.setState({isBottom: nextProps.isBottom})
        this.setState({isStretch: nextProps.isStretch})

        this.setState({isWrap: nextProps.isWrap})
        this.setState({isFlex: nextProps.isFlex})

        this.setState({isPadding: nextProps.isPadding})
        this.setState({isMargin: nextProps.isMargin})
        this.setState({isDisabled: nextProps.isDisabled})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = true

        return isChanged
    },

    isActive: function(){
        return this.state.isActive
    },

    onMouseEnter: function(e){
        if(this.props.isTracking && !this.state.isDisabled){
            this.setState({isActive: true})
        }

        if(!this.state.isDisabled && this.props.onEnter){
            this.props.onEnter()
        }
    },

    onMouseLeave: function(e){
        if(this.props.isTracking && !this.state.isDisabled){
            this.setState({isActive: false})
        }

        if(!this.state.isDisabled && this.props.onLeave){
            this.props.onLeave()
        }
    },

    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * Flex布局盒子
     * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    renderFlexbox: function(){
        let type = this.props.type
        let cssClass = classNames(
            {
                "sx-box": true,
                "sx-box-r": this.state.isRow,
                "sx-box-rr": this.state.isRow && this.state.isReverse,
                "sx-box-rsl": this.state.isLeft && !this.state.isCenter && !this.state.isRight && !this.state.isBetween && !this.state.isAround,
                "sx-box-rsc": this.state.isCenter && !this.state.isLeft && !this.state.isRight && !this.state.isBetween && !this.state.isAround,
                "sx-box-rsr": this.state.isRight && !this.state.isCenter && !this.props.isLeft && !this.state.isBetween && !this.state.isAround,
                "sx-box-rsb": this.state.isBetween && !this.props.isLeft && !this.state.isCenter && !this.state.isRight && !this.state.isAround,
                "sx-box-rsa": this.state.isAround && !this.props.isLeft && !this.state.isCenter && !this.state.isRight && !this.state.isBetween,
                "sx-box-c": !this.state.isRow,
                "sx-box-cr": !this.state.isRow && this.state.isReverse,
                "sx-box-csl": this.state.isTop && !this.state.isMiddle && !this.state.isBottom && !this.state.isStretch,
                "sx-box-csc": this.state.isMiddle && !this.state.isTop && !this.state.isBottom && !this.state.isStretch,
                "sx-box-csr": this.state.isBottom && !this.state.isTop && !this.props.isMiddle && !this.state.isStretch,
                "sx-box-css": this.state.isStretch && !this.state.isTop && !this.props.isMiddle && !this.state.isBottom,
                "sx-box-w": this.state.isWrap,
                "sx-box-f": this.state.isFlex,
                "sx-box-p": this.state.isPadding,
                "sx-box-m": this.state.isMargin,
                "sx-box-disabled": this.state.isDisabled,
                "sx-box-active": this.state.isActive && !this.state.isDisabled,
            }
        )

        //获取传入的className属性组合起来
        let { className } = this.props
        if(className){
            cssClass = cssClass + " " + className 
        }

        return <div { ...this.props }
            className = { cssClass }
            onMouseEnter = { this.onMouseEnter }
            onMouseLeave = { this.onMouseLeave } >
                { this.props.children }
        </div>
    },

    render: function() {
        return this.renderFlexbox()
    }
})

export default SxBox
