import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxLink } from '../link'
import { Link } from 'react-router'


/* ================================================================================
 * 选项卡标签组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTabBar extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            item: Immutable.fromJS(props.item),
            isSelected: props.isSelected
        }
    }

    componentWillReceiveProps = (newProps)=>{
        this.setState({item: Immutable.fromJS(newProps.item)})
        this.setState({isSelected: newProps.isSelected})
    }

    renderTabBarContent = (title, path, isSelected)=>{
        if(isSelected){
            return <a>{ title }</a>
        }

        if(this.props.onLink){
            return <SxLink onLink = { ()=>this.props.onLink(this.props.index) }>{ title }</SxLink>
        }

        return <Link to = { path } >{ title }</Link>
    }

    render = ()=>{
        let title = ""
        let onTitle = this.state.item.get('onTitle', null)
        if(onTitle){
            title = onTitle()
        }else{
            title = this.state.item.get('title')
        }
        
        let path = this.state.item.get('path')

        let isSelected = this.state.isSelected
        let tabClassName = classNames({
            "sx-tabbar-item": true,
            "sx-tabbar-active": isSelected
        })

        //path必须以/开头，防止重复Dispatch UPDATE_PATH Event
        if(!/^\/.*$/.test(path)){
            path = "/" + path
        }

        let tabBarContent = this.renderTabBarContent(title, path, isSelected)

        return <li className = { tabClassName } >
            {
                tabBarContent
            }
        </li>
    }
}

SxTabBar.propTypes = {
    item: React.PropTypes.obj,
    isSelected: React.PropTypes.bool
};

SxTabBar.defaultProps = {
    index: 0,
    item: Immutable.fromJS({
        title: "",
        path: "",
        onTitle: null,
        onLink: null
    }),
    isSelected: false
};

export default SxTabBar
