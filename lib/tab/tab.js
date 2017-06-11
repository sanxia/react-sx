import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxTabBar from './tab-bar'


/* ================================================================================
 * 选项卡组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTab = React.createClass({
    getDefaultProps: function(){
        return{
            items: Immutable.fromJS([]),
            selectedIndex: 0
        }
    },

    renderItems: function(){
        return this.props.items.map((v,i) => 
            <SxTabBar key = { i } item = { v } isSelected = { this.props.selectedIndex == i } />
        )
    },

    render: function(){
        let items = this.renderItems()
        return <div className = "sx-tabbar-wrap">
                <ul className = "sx-tabbar">
                    { items }
                </ul>
        </div>
    }
})

export default SxTab
