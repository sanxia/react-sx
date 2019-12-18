import React, { Component } from 'react'
import Immutable from 'immutable'
import ClassNames from 'classnames'
import { SxBox } from '../box/index'
import { util } from '../util'

/* ================================================================================
 * 网格列表组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxListView extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            column: props.column,
            sectionIndex: 0,
            rowIndex: 0,
            isSepratorLine: props.isSepratorLine,
            isSection: props.isSection,
            isEditing: props.isEditing,
            isActive: false
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({column: nextProps.column})
        this.setState({isSepratorLine: nextProps.isSepratorLine})
        this.setState({isSection: nextProps.isSection})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = nextState.column != this.state.column ||
        nextState.sectionIndex != this.state.sectionIndex ||
        nextState.rowIndex != this.state.rowIndex ||
        nextState.isSepratorLine != this.state.isSepratorLine ||
        nextState.isSection != this.state.isSection ||
        nextState.isEditing != this.state.isEditing ||
        nextState.isActive != this.state.isActive

        if(this.props.isRefresh){
            isChanged = true
        }

        return isChanged
    }

    setColumn = (column)=>{
        this.setState({ column: column })
    }

    switchSection = ()=>{
        this.setState({ isSection: !this.state.isSection })
    }

    switchEditing = ()=>{
        this.setState({ isEditing: !this.state.isEditing })
    }

    isEditing = ()=>{
        return this.state.isEditing
    }

    onMouseOverRow = (e, sectionIndex, rowIndex)=>{
        if(this.props.isTracking){
            this.setState({
                sectionIndex: sectionIndex,
                rowIndex: rowIndex,
                isActive: true
            })
        }
    }

    onMouseOutRow = (e)=>{
        if(this.props.isTracking){
            this.setState({
                isActive: false
            })
        }
    }

    onSectionCount = ()=>{
        let sectionCount = 0

        if(this.props.onSectionCount){
            if(typeof this.props.onSectionCount == "function"){
                sectionCount = this.props.onSectionCount()
            }else{
                sectionCount = this.props.onSectionCount
            }

            if(typeof sectionCount == "string"){
                sectionCount = parseInt(sectionCount)
            }
        }

        return sectionCount
    }

    onRowCount = (sectionIndex)=>{
        let rowCount = 0

        if(this.props.onRowCount){
            if(typeof this.props.onRowCount == "function"){
                rowCount = this.props.onRowCount(sectionIndex)
            }else{
                rowCount = this.props.onRowCount
            }

            if(typeof rowCount == "string"){
                rowCount = parseInt(rowCount)
            }
        }

        return rowCount
    }

    onRenderSectionHeader = (sectionIndex)=>{
        if(this.props.onRenderSectionHeader){
            return this.props.onRenderSectionHeader(sectionIndex)
        }

        return null
    }

    onRenderSectionFooter = (sectionIndex)=>{
        if(this.props.onRenderSectionFooter){
            return this.props.onRenderSectionFooter(sectionIndex)
        }

        return null
    }

    renderHeader = ()=>{
        if(this.props.onRenderHeader){
            let header = this.props.onRenderHeader()
            if(header){
                return <div className = "sx-list-header">
                    { header }
                </div>
            }
        }

        return null
    }

    renderDefault = ()=>{
        if(this.props.onRenderDefault){
            let defaultEmpty = this.props.onRenderDefault()
            if(defaultEmpty){
                return <div className = "sx-list-empty">
                    { defaultEmpty }
                </div>
            }
        }

        return null
    }

    renderSections = ()=>{
        let theThis = this
        let sectionCount = this.onSectionCount()

        let sectionHeader = ""
        let sectionFooter = ""
        let sections = Immutable.fromJS([])

        for(var sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++){

            let isDefaultFooter = true
            if(this.props.onRenderSectionHeader){
                isDefaultFooter = false
            }

            let sectionHeaderClass = ClassNames({
                "sx-list-section-header": !isDefaultFooter,
                "sx-list-section-header sx-list-section-header-default": isDefaultFooter
            })

            sectionHeader = theThis.onRenderSectionHeader(sectionIndex)
            sectionFooter = theThis.onRenderSectionFooter(sectionIndex)

            sections = sections.push(<SxBox key = { sectionIndex } isRow = { false } isCenter = { true } isBetween = { true } isPadding = { false } isMargin = { false }>
                {
                    sectionHeader != "" &&
                    <SxBox isRow = { false } isPadding = { false } className = { sectionHeaderClass } >
                        { sectionHeader }
                    </SxBox>
                }

                {
                    theThis.renderRows(sectionIndex)
                }

                {
                    sectionFooter != "" &&
                    <SxBox isRow = { false } isPadding = { false } className = "sx-list-section-footer">
                        { sectionFooter }
                    </SxBox>
                }
            </SxBox>)
        }

        return sections
    }

    renderRows = (...args)=>{
        let sectionIndex = 0
        if(args.length == 1){
            sectionIndex = args[0]
        }

        let rowCount = this.onRowCount(sectionIndex)
        let sectionRows = Immutable.fromJS([])

        for(var rowIndex = 0; rowIndex < rowCount; rowIndex++){
            sectionRows = sectionRows.push(
                this.renderRow(sectionIndex, rowIndex)
            )
        }

        return sectionRows
    }

    renderRowHeader = (sectionIndex, rowIndex)=>{
        let rowHeader = ""

        if(this.props.onRenderRowHeader){
            rowHeader = this.props.onRenderRowHeader(sectionIndex, rowIndex)
        }

        if(rowHeader != ""){
            rowHeader = <SxBox isRow = { true }
            isCenter = { true }
            isPadding = { false }
            className = "sx-list-row-header">
                { rowHeader }
            </SxBox>
        }
        
        return rowHeader
    }

    renderRow = (sectionIndex, rowIndex)=>{
        let keyIndex = (sectionIndex + 1) * 10000 + (rowIndex + 1) * 1000
        let rowHeader = this.renderRowHeader(sectionIndex, rowIndex)
        let rowFooter = this.renderRowFooter(sectionIndex, rowIndex)

        let sectionCount = this.onSectionCount()
        let columns = Immutable.fromJS([])

        let isLastSection = sectionIndex == sectionCount - 1
        
        for(var columnIndex = 0; columnIndex < this.props.column; columnIndex ++){
            columns = columns.push(columnIndex)
        }

        let rowClass = "sx-list-row"

        if(sectionCount > 1 &&
            !isLastSection &&
            this.state.isSepratorLine &&
            !this.props.onRenderCellHeading){
            rowClass += " sx-line-b"
        }

        if(this.props.isAlternate){
            if(rowIndex % 2 == 0){
                rowClass += " sx-list-row-even"
            }else{
                rowClass += " sx-list-row-odd"
            }
        }

        if(this.state.isActive){
            if(this.state.sectionIndex == sectionIndex &&
                this.state.rowIndex == rowIndex){
                rowClass += " sx-list-row-active"
            }
        }

        return <SxBox key = { keyIndex }
        className = { rowClass }
        isRow = { false }
        isCenter = { true }
        isPadding = { false }
        onMouseOver = { (e)=>this.onMouseOverRow(e, sectionIndex, rowIndex) }
        onMouseOut = { (e)=>this.onMouseOutRow(e, sectionIndex, rowIndex) }>

            { rowHeader }

            <SxBox isRow = { true }
            isCenter = { true }
            isStretch = { true }
            isPadding = { false }
            className = "sx-list-row-content">
            {
                columns.map((v, columnIndex)=>{
                    return this.renderCell(sectionIndex, rowIndex, columnIndex)
                })
            }
            </SxBox>

           { rowFooter }
           
        </SxBox>
    }

    renderCellHeading = (sectionIndex, rowIndex, columnIndex)=>{
        if(this.props.onRenderCellHeading){
            return this.props.onRenderCellHeading(sectionIndex, rowIndex, columnIndex)
        }

        return null
    }

    renderCell = (sectionIndex, rowIndex, columnIndex)=>{
        let heading = this.renderCellHeading(sectionIndex, rowIndex, columnIndex)
        let tailing = this.renderCellTailing(sectionIndex, rowIndex, columnIndex)
        
        let sectionCount = this.onSectionCount()
        let rowCount = this.onRowCount(sectionIndex)

        let isFirstRow = rowIndex == 0
        let isLastRow = rowIndex == rowCount - 1
        
        let cellClass = "sx-box sx-box-r sx-box-rsb sx-box-css sx-box-f sx-list-cell"
        let cellContentClass = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-f sx-list-cell-content"

        if(rowCount == 1){
            cellClass += " sx-list-cell-first sx-list-cell-last"
        }else{
            if(isFirstRow){
                cellClass += " sx-list-cell-first"

                if(this.state.isSepratorLine){
                    cellContentClass += " sx-list-cell-line"
                }
            }else if(isLastRow){
                cellClass += " sx-list-cell-last"
            }else{
                if(this.state.isSepratorLine){
                    cellContentClass += " sx-list-cell-line"
                }
            }
        }

        if(this.props.onRenderCell){
            if(this.props.isCellTailingInContent){
                return <div className = { cellClass }>
                    { heading }
                
                    <div className = { cellContentClass }>
                        {
                            this.props.isCellCenter ?
                            <div className = "sx-box sx-box-r sx-box-rsc sx-box-csc sx-box-f">
                                { this.props.onRenderCell(sectionIndex, rowIndex, columnIndex) }
                            </div>
                            :
                            <div className = "sx-box sx-box-r sx-box-rsl sx-box-csc sx-box-f">
                                { this.props.onRenderCell(sectionIndex, rowIndex, columnIndex) }
                            </div>
                        }

                        { tailing }
                    </div>               
                </div> 
            }

            return <div className = { cellClass }>
                { heading }
                
                <div className = { cellContentClass }>
                    {
                        this.props.isCellCenter ?
                        <div className = "sx-box sx-box-r sx-box-rsc sx-box-csc sx-box-f">
                            { this.props.onRenderCell(sectionIndex, rowIndex, columnIndex) }
                        </div>
                        :
                        <div className = "sx-box sx-box-r sx-box-rsl sx-box-csc sx-box-f">
                            { this.props.onRenderCell(sectionIndex, rowIndex, columnIndex) }
                        </div>
                    }
                </div>

                { tailing }            
            </div>
        }

        return null
    }

    renderCellTailing = (sectionIndex, rowIndex, columnIndex)=>{
        let tailing = ""

        if(this.props.onRenderCellTailing){
            tailing = this.props.onRenderCellTailing(sectionIndex, rowIndex, columnIndex)
        }

        return tailing
    }

    renderRowFooter = (sectionIndex, rowIndex)=>{
        let rowFooter = ""

        if(this.props.onRenderRowFooter){
            rowFooter = this.props.onRenderRowFooter(sectionIndex, rowIndex)
        }

        if(rowFooter != ""){
            rowFooter = <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-list-row-footer">
                { rowFooter }
            </SxBox>
        }
 
        return rowFooter
    }

    renderFooter = ()=>{
        if(this.props.onRenderFooter){
            let footer = this.props.onRenderFooter()
            if(footer){
                return <div className = "sx-list-footer">
                    { footer }
                </div>
            }
        }

        return null
    }

    render = ()=>{
        return <SxBox
        className = "sx-list-view"
        isRow = { false }
        isCenter = { true }
        isStretch = { true }
        isFlex = { true }
        isPadding = { false }
        isMargin = { false }>

        { this.renderHeader() }

        {
            this.onSectionCount() == 0 ? this.renderDefault() : this.state.isSection ? this.renderSections() : this.renderRows()
        }

        { this.renderFooter() }

        </SxBox>
    }
}

SxListView.propTypes = {
    column: React.PropTypes.number,
    isCellCenter: React.PropTypes.bool,
    isCellTailingInContent: React.PropTypes.bool,
    isAlternate: React.PropTypes.bool,
    isSepratorLine: React.PropTypes.bool,
    isSection: React.PropTypes.bool,
    isEditing: React.PropTypes.bool,
    isRefresh: React.PropTypes.bool,
    isTracking: React.PropTypes.bool,
    onSectionCount: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.func
    ]),
    onRowCount: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.func
    ]),
    onRenderDefault: React.PropTypes.func,
    onRenderHeader: React.PropTypes.func,
    onRenderSectionHeader: React.PropTypes.func,
    onRenderRowHeader: React.PropTypes.func,
    onRenderCellHeading: React.PropTypes.func,
    onRenderCell: React.PropTypes.func,
    onRenderCellTailing: React.PropTypes.func,
    onRenderRowFooter: React.PropTypes.func,
    onRenderSectionFooter: React.PropTypes.func,
    onRenderFooter: React.PropTypes.func
};

SxListView.defaultProps = {
    column: 1,
    isCellCenter: false,
    isCellTailingInContent: true,
    isAlternate: false,
    isSepratorLine: false,
    isSection: false,
    isEditing: false,
    isRefresh: true,
    isTracking: false,
    onSectionCount: 1,
    onRowCount: 1,
    onRenderDefault: null,
    onRenderHeader: null,
    onRenderSectionHeader: null,
    onRenderRowHeader: null,
    onRenderCellHeading: null,
    onRenderCell: null,
    onRenderCellTailing: null,
    onRenderRowFooter: null,
    onRenderSectionFooter: null,
    onRenderFooter: null
};

export default SxListView