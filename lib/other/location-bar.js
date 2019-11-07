import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'
import { SxLink } from '../link/index'


/* ================================================================================
 * 位置导航组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxLocationBar extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            locations: Immutable.fromJS(props.locations)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState( {locations: Immutable.fromJS(nextProps.locations) })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChange = !Immutable.is(nextState.locations, this.state.locations)
        return isChange
    }

    render = ()=>{
    	let locations = this.state.locations.filter((v,k)=>{
            return v.get("title", "") != ""
        })

        let count = locations.count()
        let backUrl = ""

        if(count > 1){
            backUrl = locations.getIn([count-2, "url"], "")
        }

    	let locationItems = locations.map((v, k) => {
            let isSeparator = (k != count - 1) && count > 1
            return <SxLocation
            key = { k }
            location = { v }
            separator = { this.props.separator }
            isSeparator = { isSeparator } />
        })

        return (
        <dl className = "sx-location-bar">
            {
                backUrl != ""
                ?
                <dt>
                    <SxLink url = { backUrl } title = "返回">
                        <SxImage title = "返回" url = "/static/img/sx/back.png" />
                    </SxLink>
                </dt>
                :
                ""
            }

            { this.props.children }

            { locationItems }
        </dl>
        )
    }
}

class SxLocation extends Component {
    render = ()=>{
        let title = this.props.location.get("title", "")
        let imageUrl = this.props.location.get("image_url", "")
        let url = this.props.location.get("url", "")

        return <dd>
            {
                imageUrl != "" ?
                <SxLink url = { url } title = { title }>
                    <SxImage title = { title } url = { imageUrl } className = "sx-w30 sx-h30" />
                </SxLink>
                :
                <SxLink url = { url } title = { title }>
                    { title }
                </SxLink>
            }
            
            {
                this.props.isSeparator ?
                <em>
                    { this.props.separator }
                </em>
                :
                ""
            }
        </dd>
    }
}

SxLocationBar.propTypes = {
    separator: React.PropTypes.string,
    locations: React.PropTypes.array.isRequire
};

SxLocationBar.defaultProps = {
    separator: "/",
    locations: []
};

export default SxLocationBar
