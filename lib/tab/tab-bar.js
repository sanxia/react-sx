import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
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
            item: props.item,
            isSelected: props.isSelected
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({item: newProps.item})
        this.setState({isSelected: newProps.isSelected})
    }

    render = ()=>{
        let title = this.state.item.get('title')
        let path = this.state.item.get('path')
        let isActive = this.state.isSelected
        let tabClassName = classNames({
            "sx-tabbar-active": isActive
        })

        //path必须以/开头，防止重复Dispatch UPDATE_PATH Event
        if(!/^\/.*$/.test(path)){
            path = "/" + path
        }

        return <li className = { tabClassName } >
            {
                isActive ? 
                <a>{title}</a>
                :
                <Link to = { path } >{title}</Link>
            }
        </li>
    }
}

SxTabBar.propTypes = {
    item: React.PropTypes.obj,
    isSelected: React.PropTypes.bool
};

SxTabBar.defaultProps = {
    item: Immutable.fromJS({
        title: "",
        path: ""
    }),
    isSelected: false
};

export default SxTabBar
