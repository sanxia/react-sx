import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { Link } from 'react-router'


/* ================================================================================
 * 选项卡标签组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTabBar = React.createClass({
    getDefaultProps: function(){
        return {
            item: Immutable.fromJS({
                title: "",
                path: ""
            }),
            isSelected: false
        }
    },

    getInitialState: function(){
        return {
            item: this.props.item,
            isSelected: this.props.isSelected
        }
    },

    componentWillReceiveProps: function(newProps){
        this.setState({item: newProps.item})
        this.setState({isSelected: newProps.isSelected})
    },

    render: function() {
        let title = this.state.item.get('title')
        let path = this.state.item.get('path')
        let isActive = this.state.isSelected
        let tabClassName = classNames({
            "active": isActive
        })

        //path必须以/开头，防止重复Dispatch UPDATE_PATH Event
        if(!/^\/.*$/.test(path)){
            path = "/" + path
        }

        return <li className = { tabClassName } >
                <Link to = { path } > {title} </Link>
        </li>
    }
})

export default SxTabBar