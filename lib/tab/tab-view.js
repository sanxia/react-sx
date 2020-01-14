import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import SxTabBar from './tab-bar'
import SxTabContent from './tab-content'


/* ================================================================================
 * 选项卡容器组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTabView extends Component{
    constructor(props, context) {
        super(props, context)
    }

    onTabBarLink = (index)=>{
        if(this.props.onLink){
            this.props.onLink(index)
        }
    }

    renderTabBars = ()=>{
        return this.props.titles.map((v, index) => 
            <SxTabBar
            key = { index }
            index = { index }
            item = { v }
            isSelected = { this.props.selectedIndex == index }
            onLink = { (index)=>this.onTabBarLink(index) } />
        )
    }

    renderTabContent = ()=>{
        if(this.props.onRenderContent){
            return <SxTabContent>
                { this.props.onRenderContent(this.props.selectedIndex) }
            </SxTabContent>
        }

        return null
    }

    render = ()=>{
        let tabBars = this.renderTabBars()
        let tabContent = this.renderTabContent()

        return <div className = "sx-tabbar-view">
            <div className = "sx-tabbar-wrap">
                <ul className = "sx-tabbar">
                    { tabBars }
                </ul>
            </div>

            { tabContent }
        </div>
    }
}

SxTabView.propTypes = {
    titles: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    onRenderContent: React.PropTypes.func,
    onLink: React.PropTypes.func
};

SxTabView.defaultProps = {
    titles: [],
    selectedIndex: 0,
    onRenderContent: null,
    onLink: null
};

export default SxTabView
