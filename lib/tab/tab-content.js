import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 选项卡内容组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
var SxTabContent = React.createClass({
	getDefaultProps: function(){
        return {
        	isBorder: true
        }
	},

    render: function(){
    	let classname = classNames({
    		"sx-tabbar-content": true,
    		"sx-tabbar-content-border": this.props.isBorder
    	})
        return <div {...this.props} className = { classname } >
                {this.props.children}
        </div>
    }
})

export default SxTabContent