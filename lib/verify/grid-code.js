import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'


/* ================================================================================
 * 网格图片验证码组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxGridCode = React.createClass({
    propTypes: function(){
        return {
            option: React.PropTypes.object,
            onRefresh: React.PropTypes.func
        }
    },

    getDefaultProps: function(){
        return {
            option: null,
            onRefresh: null,
        }
    },

    getInitialState: function(){
        return {
            option: Immutable.fromJS(this.props.option),
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.option, this.state.option)
        return isChange
    },

    onRefresh: function(){
        if(this.props.onRefresh){
            this.props.onRefresh()
        }

        let url = this.state.option.get("url") + "?r=" + new Date().getTime()
        let newOption = this.state.option.set("url", url)
        this.setState({option: newOption})
    },

    getOffsetPosition: function(elem){
        if ( !elem ) return {left:0, top:0}
        var top = 0, left = 0;
        if ( "getBoundingClientRect" in document.documentElement ){
            var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top  = box.top  + (self.pageYOffset || docElem && docElem.scrollTop  || body.scrollTop ) - clientTop,
            left = box.left + (self.pageXOffset || docElem && docElem.scrollLeft || body.scrollLeft) - clientLeft;
        }else{
            do{
                top += elem.offsetTop || 0;
                left += elem.offsetLeft || 0;
                elem = elem.offsetParent;
            } while (elem)
      }
       return {left:left, top:top} 
    },

    onClick: function(e){
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop
        let x = e.pageX || e.clientX + scrollX
        let y = e.pageY || e.clientY + scrollY

        let pos = this.getOffsetPosition(document.getElementById("sx-verify-image"))
        //alert("onClick pos: " + Immutable.fromJS(pos))

        let data = {
            'screenX': e.screenX, 
            'screenY': e.screenY,
            'clientX': e.clientX,
            'clientY': e.clientY,
            'offsetX': e.offsetX,
            'offsetY': e.offsetY,
            'layerX': e.layerX,
            'layerY': e.layerY,
            'x': x,
            'y': y
        }

        //alert("onClick data: " + Immutable.fromJS(data))
    },

    render: function() {
        let url = this.state.option.get("url", "")
        let {id, className} = { ...this.props }

        return <div className = "sx-verify-image" onSelectStart = { ()=>{
            return false
        }} onClick = { this.onClick } >
            <span className = "sx-verify-refresh" alt="刷新" title="刷新" onClick = { this.onRefresh }></span>
            <SxImage title = "验证码" url = { url } />
        </div>
    }
})

export default SxGridCode
