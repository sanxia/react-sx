import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 表头列组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
class SxTableHeaderColumn extends Component {
    getDefaultProps(){
        return {
            isCenter: false
        }
    }
    render() {
        let thClassNames = classNames({
                "grx-table-header-column": true,
                "grx-center": this.props.isCenter
            }
        )
        return <th className = { thClassNames } >
                { this.props.children }
        </th>
    }
}

/* ================================================================================
 * 表列组件
 * author: mliu
 * ================================================================================ */
var SxTableColumn = React.createClass({
    getDefaultProps: function(){
        return {
            isCenter: false,
            isRight: false
        }
    },

    render: function() {
        let tdClassNames = classNames({
                "grx-table-column": true,
                "grx-center": this.props.isCenter && !this.props.isRight,
                "grx-right": this.props.isRight && !this.props.isCenter
            }
        )

        return <td className = { tdClassNames } >
                { this.props.children }
        </td>
    }
})

export default {
    SxTableHeaderColumn,
    SxTableColumn
}
