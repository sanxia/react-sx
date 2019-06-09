import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxBox } from '../box/index'


/* ================================================================================
 * Loading Message组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxLoadingMessage extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            message: props.message,
            isReverse: props.isReverse,
            isPending: props.isPending
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({message: nextProps.message})
        this.setState({isReverse: nextProps.isReverse})
        this.setState({isPending: nextProps.isPending})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.message != this.state.message
        || nextState.isReverse != this.state.isReverse
        || nextState.isPending != this.state.isPending
    }

    setPending(isPending){
        this.setState({isPending: isPending})
    }

    render = ()=>{
        let content = ""

        if(this.state.isPending){
            content = <SxBox
            isCenter = { !this.state.isReverse }
            isReverse = { this.state.isReverse }
            isPadding = { false }>
                <span>{ this.state.message }</span>
                <span className="sx-loading-icon"></span>
            </SxBox>
        }

        return content
    }
}

SxLoadingMessage.propTypes = {
    message: React.PropTypes.string,
    isReverse: React.PropTypes.bool,
    isPending: React.PropTypes.bool
};

SxLoadingMessage.defaultProps = {
    message: "loading",
    isReverse: false,
    isPending: false
};

export default SxLoadingMessage
