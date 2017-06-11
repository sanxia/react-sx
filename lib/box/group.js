import React, { Component } from 'react'


/* ================================================================================
 * 框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
class SxGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            info: props.info,
        }
    }

    render() {
        let title = this.state.title == "" ? "" : <span className = "sx-title">{ this.state.title }</span>
        if( this.props.isRequire && this.state.title != "" ){
            title = <span className = "sx-title">{ this.state.title }<i>*</i></span>
        }

        let info = this.state.info == "" ? "" : <span className = "sx-info">{ this.state.info }</span>

        return <div className = "sx-group">
                { title }
                <div className = "sx-group-content"> { this.props.children } </div>
                { info }
        </div>
    }
}

SxGroup.propTypes = {
    title: React.PropTypes.string,
    info: React.PropTypes.string,
    isRequire: React.PropTypes.bool,
};

SxGroup.defaultProps = {
    title: "",
    info: "",
    isRequire: false
};

export default SxGroup
