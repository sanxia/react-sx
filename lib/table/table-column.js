import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 表列组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTableColumn extends Component{
    constructor(props, context) {
        super(props, context)
    }

    render = ()=>{
        let tdClassNames = classNames({
            "sx-table-column": true,
            "sx-table-column-center": this.props.isCenter && !this.props.isRight,
            "sx-table-column-right": this.props.isRight && !this.props.isCenter
        })

        return <td className = { tdClassNames } >
            { this.props.children }
        </td>
    }
}

SxTableColumn.propTypes = {
    isCenter: React.PropTypes.bool,
    isRight: React.PropTypes.bool
};

SxTableColumn.defaultProps = {
    isCenter: false,
    isRight: false
};

export default SxTableColumn
