import React, { Component } from 'react'
import classNames from 'classnames'


/* ================================================================================
 * 表脚组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxTableFooter = React.createClass({
    getDefaultProps: function(){
        return {
            columnCount: 1,
        }
    },

    render: function(){
        return <tfoot>
                <tr>
                    <td colSpan = { this.props.columnCount } >
                        { this.props.children }
                    </td>
                </tr>
        </tfoot>
    }
})

export default SxTableFooter
