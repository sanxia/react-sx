import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 表头列组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTableHeaderColumn extends Component{
    constructor(props, context) {
        super(props, context)
    }

    render = ()=>{
        let thClassNames = classNames({
                "sx-table-header-column": true,
                "sx-table-column-center": this.props.isCenter
            }
        )
        
        return <th className = { thClassNames } >
            { this.props.children }
        </th>
    }
}

SxTableHeaderColumn.propTypes = {
    isCenter: React.PropTypes.bool
};

SxTableHeaderColumn.defaultProps = {
    isCenter: false
};

export default SxTableHeaderColumn
