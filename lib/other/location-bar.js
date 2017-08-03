import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'
import { SxLink } from '../link/index'


/* ================================================================================
 * 位置导航组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxLocationBar = React.createClass({
    propTypes: function(){
        return{
            separator: React.PropTypes.string,
            locations: React.PropTypes.array.isRequire
        }
    },

    getDefaultProps: function(){
        return {
            separator: " / ",
            locations: []
        }
    },

    getInitialState: function(){
        return {
            separator: this.props.separator,
            locations: Immutable.fromJS(this.props.locations)
        }
    },

    componentWillReceiveProps: function(nextProps){
        this.setState( {separator: nextProps.separator })
        this.setState( {locations: Immutable.fromJS(nextProps.locations) })
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = nextState.separator != this.state.separator
        || !Immutable.is(nextState.locations, this.state.locations)
        return isChange
    },

    render: function(){
        let separator = this.state.separator
    	let locations = this.state.locations.filter((v,k)=>{
            return v.get("title") != ""
        })
        let count = locations.count()

    	let items = locations.map(
    		(v, k) => {
                let isSeparator = (k != count - 1) && count > 1
                return <SxLocation key = { k } separator = { separator } location = { v } isSeparator = { isSeparator } />
            }
    	)
        return (
            <dl className = "sx-location-bar">
                <dt>当前位置：</dt>
                { this.props.children }
                { items }
            </dl>
        )
    }
})

class SxLocation extends Component {
    render() {
        let isSeparator = this.props.isSeparator
        let title = this.props.location.get('title', '')
        let imageUrl = this.props.location.get('image_url', '')
        let url = this.props.location.get('url', '')
        let separator = this.props.separator

        return <dd>
            {
                imageUrl != '' ?
                <SxLink url = { url } title = { title }>
                    <SxImage title = { title } url = { imageUrl } width = "50" height = "50" />
                </SxLink>
                :
                <SxLink url = { url } title = { title }>
                    { title }
                </SxLink>
            }
            {
                isSeparator ?
                <em>
                    { separator }
                </em>
                :
                ""
            }
        </dd>
    }
}

export default SxLocationBar
