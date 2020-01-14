import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxTabBar from './tab-bar'


/* ================================================================================
 * 选项卡组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTab extends Component{
    constructor(props, context) {
        super(props, context)
    }

    renderTabBars = ()=>{
        return this.props.items.map((v,i) => 
            <SxTabBar
            key = { i }
            item = { v }
            isSelected = { this.props.selectedIndex == i } />
        )
    }

    render = ()=>{
        let tabBars = this.renderTabBars()
        return <div className = "sx-tabbar-wrap">
            <ul className = "sx-tabbar">
                { tabBars }
            </ul>
        </div>
    }
}

SxTabBar.propTypes = {
    items: React.PropTypes.array,
    selectedIndex: React.PropTypes.number
};

SxTabBar.defaultProps = {
    items: [],
    selectedIndex: 0
};

export default SxTab
