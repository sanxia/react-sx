import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 选项卡内容组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTabContent extends Component{
    constructor(props, context) {
        super(props, context)
    }

    render = ()=>{
    	let classname = classNames({
    		"sx-tabbar-content": true,
    		"sx-tabbar-content-border": this.props.isBorder
    	})

        return <div
        {...this.props}
        className = { classname } >
            {this.props.children}
        </div>
    }
}

SxTabContent.propTypes = {
    isBorder: React.PropTypes.bool
};

SxTabContent.defaultProps = {
    isBorder: true
};

export default SxTabContent