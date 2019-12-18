import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * Box容器组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxBox extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            isRow: props.isRow,
            isReverse: props.isReverse,
            isLeft: props.isLeft,
            isCenter: props.isCenter,
            isRight: props.isRight,
            isBetween: props.isBetween,
            isAround: props.isAround,
            isTop: props.isTop,
            isMiddle: props.isMiddle,
            isBottom: props.isBottom,
            isStretch: props.isStretch,
            isWrap: props.isWrap,
            isFlex: props.isFlex,
            isPadding: props.isPadding,
            isMargin: props.isMargin,
            isDisabled: props.isDisabled,
            isActive: props.isActive
        }
    }

    componentWillReceiveProps(nextProps){
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
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = true

        return isChanged
    }

    isActive(){
        return this.state.isActive
    }

    onMouseEnter = ()=>{
        if(this.props.isTracking && !this.state.isDisabled){
            this.setState({isActive: true})
        }

        if(!this.state.isDisabled && this.props.onEnter){
            this.props.onEnter()
        }
    }

    onMouseLeave = ()=>{
        if(this.props.isTracking && !this.state.isDisabled){
            this.setState({isActive: false})
        }

        if(!this.state.isDisabled && this.props.onLeave){
            this.props.onLeave()
        }
    }

    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * Flex布局盒子
     * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    renderFlexbox = ()=>{
        let type = this.props.type
        let boxClassName = classNames(
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
            boxClassName = boxClassName + " " + className 
        }

        return <div { ...this.props }
            className = { boxClassName }
            onMouseEnter = { ()=>this.onMouseEnter() }
            onMouseLeave = { ()=>this.onMouseLeave() } >
                { this.props.children }
        </div>
    }

    render = ()=>{
        return this.renderFlexbox()
    }
}

SxBox.defaultProps = {
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
    onLeave: null
};

export default SxBox
