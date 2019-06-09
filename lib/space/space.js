import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'


/* ================================================================================
 * SpaceBox组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxSpace extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            width: props.width,
            height: props.height,
            isTop: props.isTop,
            isRight: props.isRight,
            isBottom: props.isBottom,
            isLeft: props.isLeft
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({width: nextProps.width})
        this.setState({height: nextProps.height})
        this.setState({isTop: nextProps.isTop})
        this.setState({isRight: nextProps.isRight})
        this.setState({isBottom: nextProps.isBottom})
        this.setState({isLeft: nextProps.isLeft})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.width !== this.state.width
        || nextState.height !== this.state.height
        || nextState.isTop !== this.state.isTop
        || nextState.isRight !== this.state.isRight
        || nextProps.isBottom !== this.props.isBottom
        || nextProps.isLeft !== this.props.isLeft
    }

    getClassName(){
        let className = classNames({
            "sx-space-t": this.state.isTop,
            "sx-space-r": this.state.isRight,
            "sx-space-b": this.state.isBottom,
            "sx-space-l": this.state.isLeft,
            "sx-space": true,
        })

        return className
    }

    render = ()=>{
        let className = this.getClassName()
        let style = {}

        if(this.state.width > 0){
            style["width"] = this.state.width + "px"
        }

        if(this.state.width > 0){
            style["height"] = this.state.height + "px"
        }

        return <span
        className = { className }
        style = { style }/>
    }
}

SxSpace.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isTop: React.PropTypes.bool,
    isRight: React.PropTypes.bool,
    isBottom: React.PropTypes.bool,
    isLeft: React.PropTypes.bool
};

SxSpace.defaultProps = {
    width: 0,
    height: 0,
    isTop: true,
    isRight: true,
    isBottom: true,
    isLeft: true
};

export default SxSpace
