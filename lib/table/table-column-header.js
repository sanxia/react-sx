import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 表头列组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTableHeaderColumn = React.createClass({
    getDefaultProps: function(){
        return {
            isCenter: false
        }
    },

    render: function() {
        let thClassNames = classNames({
                "sx-table-header-column": true,
                "sx-table-column-center": this.props.isCenter
            }
        )
        return <th className = { thClassNames } >
                { this.props.children }
        </th>
    }
})

export default SxTableHeaderColumn
