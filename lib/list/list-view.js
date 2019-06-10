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
            data: props.data ? Immutable.fromJS(props.data) : Immutable.fromJS([]),
            column: props.column,
            sectionField: props.sectionField,
            sectionIndex: 0,
            rowIndex:0,
            isSepratorLine: props.isSepratorLine,
            isSection: props.isSection,
            isEditing: props.isEditing,
            isActive: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({data: Immutable.fromJS(nextProps.data)})
        this.setState({column: nextProps.column})
        this.setState({sectionField: nextProps.sectionField})
        this.setState({isSepratorLine: nextProps.isSepratorLine})
        this.setState({isSection: nextProps.isSection})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data) || 
        nextState.column != this.state.column ||
        nextState.sectionField != this.state.sectionField ||
        nextState.sectionIndex != this.state.sectionIndex ||
        nextState.rowIndex != this.state.rowIndex ||
        nextState.isSepratorLine != this.state.isSepratorLine ||
        nextState.isSection != this.state.isSection ||
        nextState.isEditing != this.state.isEditing ||
        nextState.isActive != this.state.isActive

        return isChanged
    }

    setColumn(column){
        this.setState({ column: column })
    }

    setSectionName(sectionField){
        this.setState({ sectionField: sectionField })
    }

    switchSection(){
        this.setState({ isSection: !this.state.isSection })
    }

    switchEditing(){
        this.setState({ isEditing: !this.state.isEditing })
    }

    isEditing(){
        return this.state.isEditing
    }

    onMouseOverRow = (e, sectionIndex, rowIndex)=>{
        this.setState({
            sectionIndex: sectionIndex,
            rowIndex: rowIndex,
            isActive: true
        })
    }

    onMouseOutRow = (e)=>{
        this.setState({
            isActive: false
        })
    }

    onRenderSectionHeader(sectionIndex, sectionTitle, childs){
        let sectionHeader = ""
        let sectionHeaderTitle = sectionTitle

        if(this.props.onRenderSectionTitle){
            sectionHeaderTitle = this.props.onRenderSectionTitle(sectionIndex, sectionTitle, childs)
        }

        if(this.props.onRenderSectionHeader){
            sectionHeader = this.props.onRenderSectionHeader(sectionIndex, sectionHeaderTitle, childs)
        }else{
            if(sectionHeaderTitle != ""){
                sectionHeader = <span> { sectionHeaderTitle } </span>
            }
        }

        return sectionHeader
    }

    onRenderSectionFooter(sectionIndex, sectionTitle, childs){
        let sectionFooter = ""

        if(this.props.onRenderSectionFooter){
            sectionFooter = this.props.onRenderSectionFooter(sectionIndex, sectionTitle, childs)
        }

        return sectionFooter
    }

    renderSections(){
        let theThis = this
        let data = this.state.data
        let sectionField = this.state.sectionField
        data = data.map( (v,i) => {
            let groupTitle = v.get(sectionField)
            if(sectionField == "creation_date"){
                groupTitle = util.dateToDateString(groupTitle,  "yyyy-MM") 
            }
            let groupKey = groupTitle.replace("-", "")
            return v.set("group", groupKey).set("group_title", groupTitle)
        })

        //分组降序
        let keys = Immutable.fromJS([])
        data = data.groupBy((v,k) => v.get("group"))
        data.map((v, k)=>{
            keys = keys.push(k)
        })

        keys = keys.sort((a,b)=>{
            if (a < b) { return 1 }
            if (a > b) { return -1 }
            if (a === b) { return 0 }
        })

        let sectionHeader = ""
        let sectionFooter = ""
        let groups = Immutable.fromJS([])

        data = keys.forEach((v,k)=>{
            let childs = data.get(v)

            let isDefaultFooter = true
            if(this.props.onRenderSectionHeader){
                isDefaultFooter = false
            }

            let sectionHeaderClass = ClassNames({
                "sx-list-section-header": !isDefaultFooter,
                "sx-list-section-header sx-list-section-header-default": isDefaultFooter
            })

            sectionHeader = theThis.onRenderSectionHeader(k, v, childs)
            sectionFooter = theThis.onRenderSectionFooter(k, v, childs)

            groups = groups.push(<SxBox key = { k } isRow = { false } isCenter = { true } isBetween = { true } isPadding = { false } isMargin = { false }>
                {
                    sectionHeader != "" ?
                    <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = { sectionHeaderClass } >
                        { sectionHeader }
                    </SxBox>
                    :
                    ""
                }

                {
                    theThis.renderRows(k, childs)
                }

                {
                    sectionFooter != "" ?
                    <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-list-section-footer">
                        { sectionFooter }
                    </SxBox>
                    :
                    ""
                }

            </SxBox>)
        })

        return groups
    }

    renderRows(...args){
        let sectionIndex = 0
        let data = this.state.data

        if(args.length == 2){
            sectionIndex = args[0]
            data = args[1]
        }
        
        let groups = Immutable.fromJS([])
        let childs = Immutable.fromJS([])

        data.forEach((v, k) => {
            childs = childs.push(v)
            if(data.count() <= this.state.column){
                if(k == data.count() - 1){
                    groups = groups.push(childs)
                    childs = childs.clear()
                }
            }else{
                if( (k+1) % this.state.column == 0){
                    groups = groups.push(childs)
                    childs = childs.clear()
                }else{
                    if(k == data.count() - 1){
                        groups = groups.push(childs)
                        childs = childs.clear()
                    }
                }
            }
        })

        let groupCount = groups.count()

        return groups.map((v,k)=>{
            return this.renderRow(sectionIndex, k, v, groupCount)
        })
    }

    renderRowHeader(index, childs){
        let rowHeader = ""

        if(this.props.onRenderRowHeader){
            rowHeader = this.props.onRenderRowHeader(index, childs)
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

    renderRow(sectionIndex, rowIndex, childs, groupCount){
        let keyIndex = (sectionIndex + 1) * 1000 + (rowIndex + 1)
        let rowHeader = this.renderRowHeader(rowIndex, childs)
        let rowFooter = this.renderRowFooter(rowIndex, childs)
        let isLastGroup = rowIndex == groupCount - 1
        let rowClass = "sx-list-row"

        if(groupCount > 1 && !isLastGroup && this.state.isSepratorLine && !this.props.onRenderCellHeading){
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
            if(this.state.sectionIndex == sectionIndex && this.state.rowIndex == rowIndex){
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
            isPadding = { false }
            isStretch = { true }
            className = "sx-list-row-content">

            {
                childs.map((v,k)=>{
                    return this.renderCell(rowIndex, k, v, groupCount)
                })
            }

            </SxBox>

           { rowFooter }

        </SxBox>
    }

    renderCellHeading(row, column, item){
        let heading = ""
        if(this.props.onRenderCellHeading){
            heading = this.props.onRenderCellHeading(row, column, item)
        }

        return heading
    }

    renderCell(row, column, item, groupCount){
        let content = ""
        let heading = this.renderCellHeading(row, column, item)
        let tailing = this.renderCellTailing(row, column, item)
        let isFirstGroup = row == 0
        let isLastGroup = row == groupCount - 1
        
        let cellContentClass = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-css sx-box-f sx-list-cell-content"
        if(groupCount > 1 && !isLastGroup && this.state.isSepratorLine){
            cellContentClass += " sx-list-cell-line"
        }

        let cellClass = "sx-box sx-box-r sx-box-rsb sx-box-csc sx-box-f sx-list-cell"
        if(groupCount > 1){
            if(isFirstGroup){
                cellClass += " sx-list-cell-first"
            }else if(isLastGroup){
                cellClass += " sx-list-cell-last"
            }
        }

        if(this.props.onRenderCell){
            content = <div className = { cellClass }>
                { heading }
                
                <div className = { cellContentClass }>
                    <div className = "sx-box sx-box-r sx-box-rsl sx-box-csc sx-box-f">
                        { this.props.onRenderCell(row, column, item) }
                    </div>

                    { tailing }
                </div>               
            </div>
        }

        return content
    }

    renderCellTailing(row, column, item){
        let tailing = ""
        if(this.props.onRenderCellTailing){
            tailing = this.props.onRenderCellTailing(row, column, item)
        }

        return tailing
    }

    renderRowFooter(index, childs){
        let rowFooter = ""

        if(this.props.onRenderRowFooter){
            rowFooter = this.props.onRenderRowFooter(index, childs)
        }

        return rowFooter == "" ?
        ""
        :
        <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-list-row-footer">
            { rowFooter }
        </SxBox>
    }

    render = ()=>{
        return <SxBox
        className = "sx-list"
        isRow = { false }
        isCenter = { true }
        isStretch = { true }
        isFlex = { true }
        isPadding = { false }
        isMargin = { false }>
        {
            this.state.isSection ? this.renderSections() : this.renderRows()
        }
        </SxBox>
    }
}

SxListView.propTypes = {
    data: React.PropTypes.array,
    column: React.PropTypes.number,
    sectionField: React.PropTypes.string,
    isAlternate: React.PropTypes.bool,
    isSepratorLine: React.PropTypes.bool,
    isSection: React.PropTypes.bool,
    isEditing: React.PropTypes.bool,
    onRenderSectionHeader: React.PropTypes.func,
    onRenderSectionTitle: React.PropTypes.func,
    onRenderRowHeader: React.PropTypes.func,
    onRenderCellHeading: React.PropTypes.func,
    onRenderCell: React.PropTypes.func,
    onRenderCellTailing: React.PropTypes.func,
    onRenderRowFooter: React.PropTypes.func,
    onRenderSectionFooter: React.PropTypes.func
};

SxListView.defaultProps = {
    data: null,
    column: 1,
    sectionField: "creation_date",
    isAlternate: false,
    isSepratorLine: false,
    isSection: false,
    isEditing: false,
    onRenderSectionHeader: null,
    onRenderSectionTitle: null,
    onRenderRowHeader: null,
    onRenderCellHeading: null,
    onRenderCell: null,
    onRenderCellTailing: null,
    onRenderRowFooter: null,
    onRenderSectionFooter: null
};

export default SxListView