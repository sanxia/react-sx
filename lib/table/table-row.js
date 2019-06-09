import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Immutable from 'immutable'
import { SxButton } from '../button/index'
import SxTableColumn from './table-column'


/* ================================================================================
 * 表行组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxTableRow extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            index: props.index,
            fields: props.fields,
            datas: props.datas,
            isActive: props.isActive
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({index: nextProps.index})
        this.setState({fields: nextProps.fields})
        this.setState({datas: nextProps.datas})
        this.setState({isActive: nextProps.isActive})
    }

    shouldComponentUpdate(nextProps = {}, nextState = {}) {
        let isChanged = true

        isChanged = nextState.index != this.state.index
        || !Immutable.is(Immutable.fromJS(nextState.fields), Immutable.fromJS(this.state.fields))
        || !Immutable.is(Immutable.fromJS(nextState.datas), Immutable.fromJS(this.state.datas))
        || nextState.isActive != this.state.isActive

        return isChanged
    }

    getData(){
        return this.state.datas.get(this.state.index)
    }

    onMouseOver = (e)=>{
        this.setState({isActive: true})
    }

    onMouseOut = (e)=>{
        this.setState({isActive: false})
    }

    onCheck = ()=>{
        if(this.props.onCheck){
            let data = this.getData()
            this.props.onCheck(data)
        }
    }

    onBrowser = ()=>{
        if(this.props.onBrowser){
            let data = this.getData()
            this.props.onBrowser(data)
        }
    }

    renderCheckColumn = ()=>{
        return <div className="sx-box2 sx-box-r sx-box-rsc sx-box-csc">
            <SxButton
            title="选中"
            type = "small"
            isValidate = { true }
            onButton = { ()=>this.onCheck() } />
        </div>
    }

    renderColumns = ()=>{
        let data = this.getData()
        return this.props.fields.map(
            (v, i) =>
            <SxTableColumn
            key = { i }
            isCenter = { v.get('is_center', false)}>
            {
                v.get('onContentRender')(this.state.index, i, v.get('code', ''), data)
            }
            </SxTableColumn>
        )
    }

    render = ()=>{
        let isActive = this.state.isActive
        let isChecked = this.getData().get('__is_checked__', false)
        let isEnabled = this.getData().get('__is_enabled__', true)
        let isFirstRow = this.state.index == 0
        let isLastRow = this.state.index != 0 && this.state.index == this.state.datas.count() - 1 || this.state.datas.count() == 1

        let trClassNames = classNames({
                "sx-table-row": true
            },{
                "sx-table-first-row": isFirstRow
            },{
                "sx-table-last-row": isLastRow
            },{
                "sx-selectable-item": true
            },{
                "sx-disabled-item": !isEnabled && !isChecked && !isActive
            },{
                "sx-selected-item": isChecked && !isActive
            },{
                "sx-active-item": isActive
            }
        )

        return <tr
        className = { trClassNames }
        onMouseOver = { (e)=>this.onMouseOver(e) }
        onMouseOut = { (e)=>this.onMouseOut(e) } >
            {
                this.props.onCheck ?
                <SxTableColumn>
                    { this.renderCheckColumn() }
                </SxTableColumn>
                :
                <SxTableColumn></SxTableColumn>
            }

            { this.renderColumns() }

            <SxTableColumn
            isRight = { true }>
                { this.props.children }
            </SxTableColumn>
        </tr>
    }
}

SxTableRow.propTypes = {
    index: React.PropTypes.number,
    fields: React.PropTypes.array,
    datas: React.PropTypes.array,
    isActive: React.PropTypes.bool
};

SxTableRow.defaultProps = {
    index: 0,
    fields: Immutable.fromJS([]),
    datas: Immutable.fromJS([]),
    isActive: false
};

export default SxTableRow
