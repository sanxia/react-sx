import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'


/* ================================================================================
 * 文字图片验证码组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTextCode extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            tick: new Date().getTime(),
            url: props.url
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({url: nextProps.url})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChange = nextState.url != this.state.url
        || nextState.tick != this.state.tick
        
        return isChange
    }

    onRefresh = ()=>{
        if(this.props.onRefresh){
            this.props.onRefresh()
        }

        let tick = new Date().getTime()
        this.setState({"tick": tick})
    }

    render =()=>{
        let url = this.state.url + "?r=" + this.state.tick
        
        return <div
        className = "sx-verify-image"
        onSelectStart = { ()=>{return false} }>
            <SxImage
            title = "刷新"
            url = { url }
            onButton = { ()=>this.onRefresh() }/>
        </div>
    }
}

SxTextCode.propTypes = {
    url: React.PropTypes.string,
    onRefresh: React.PropTypes.func
};

SxTextCode.defaultProps = {
    url: "",
    onRefresh: null,
};

export default SxTextCode
