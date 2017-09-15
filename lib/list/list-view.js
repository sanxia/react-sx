import React, { Component } from 'react'
import Immutable from 'immutable'
import ClassNames from 'classnames'
import { SxBox } from '../box/index'
import { util } from '../util'


/* ================================================================================
 * 网格列表组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxListView = React.createClass({
    propTypes: function(){
        return {
            column: React.PropTypes.number,
            data: React.PropTypes.array,
            sepratorLineName: React.PropTypes.string,
            isSepratorLine: React.PropTypes.bool,
            isSection: React.PropTypes.bool,
            isManage: React.PropTypes.bool
        }
    },

    getDefaultProps: function(){
        return{
            column: 1,
            data: null,
            isSepratorLine: false,
            isSection: false,
            isManage: false,
            onRenderSectionHeader: null,
            onRenderRowHeader: null,
            onRenderCell: null,
            onRenderRowFooter: null,
            onRenderSectionFooter: null,
        }
    },

    getInitialState: function(){
        return{
            column: this.props.column,
            data: this.props.data ? Immutable.fromJS(this.props.data) : Immutable.fromJS([]),
            isSepratorLine: this.props.isSepratorLine,
            isSection: this.props.isSection,
            isManage: this.props.isManage
        }
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({column: nextProps.column})
        this.setState({data: Immutable.fromJS(nextProps.data)})
        this.setState({isSepratorLine: nextProps.isSepratorLine})
        this.setState({isSection: nextProps.isSection})
        this.setState({isManage: nextProps.isManage})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.data, this.state.data) || 
        nextState.column != this.state.column ||
        nextState.isSepratorLine != this.state.isSepratorLine ||
        nextState.isSection != this.state.isSection ||
        nextState.isManage != this.state.isManage

        return isChanged
    },

    setColumn: function(column){
        this.setState({ column: column })
    },

    switchSection: function(){
        this.setState({ isSection: !this.state.isSection })
    },

    switchManage: function(){
        this.setState({ isManage: !this.state.isManage })
    },

    onRenderSectionHeader: function(index, value, childs){
        let sectionHeader = ""

        if(this.props.onRenderSectionHeader){
            sectionHeader = this.props.onRenderSectionHeader(index, value, childs)
        }else{
            sectionHeader = <span> { value } </span>
        }

        return sectionHeader
    },

    onRenderSectionFooter: function(index, value, childs){
        let sectionFooter = ""

        if(this.props.onRenderSectionFooter){
            sectionFooter = this.props.onRenderSectionFooter(k, v, childs)
        }

        return sectionFooter
    },

    renderSections: function(){
        let theThis = this
        let data = this.state.data
        data = data.map( (v,i) => {
            let groupTitle = util.dateToDateString(v.get("creation_date"),  "yyyy-MM") 
            let groupKey = groupTitle.replace("-", "")
            return v.set("group", groupKey).set("group_title", groupTitle)
        })

        //分组，降序
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
                "sx-list-section-header-default": isDefaultFooter
            })

            sectionHeader = theThis.onRenderSectionHeader(k, v, childs)
            sectionFooter = theThis.onRenderSectionFooter(k, v, childs)

            groups = groups.push(<SxBox key = { k } isRow = { false } isCenter = { true } isBetween = { true }>
                <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = { sectionHeaderClass } >
                    { sectionHeader }
                </SxBox>
                {
                    theThis.renderRows(childs)
                }
                <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-list-section-footer">
                    { sectionFooter }
                </SxBox>
            </SxBox>)
        })

        return groups
    },

    renderRows: function(...args){
        let data = this.state.data
        if(args.length > 0){
            data = args[0]
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
            return this.renderRow(k, v, groupCount)
        })
    },

    onRenderRowHeader: function(index, childs){
        let rowHeader = ""

        if(this.props.onRenderRowHeader){
            rowHeader = this.props.onRenderRowHeader(index, childs)
        }

        return rowHeader == "" ?
        ""
        :
        <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-list-row-header">
            { rowHeader }
        </SxBox>
    },

    renderRow: function(index, childs, groupCount){
        let rowHeader = this.onRenderRowHeader(index, childs)
        let rowFooter = this.onRenderRowFooter(index, childs)
        let isLastGroup = index == groupCount - 1
        let sepratorLineClass = groupCount > 1 && !isLastGroup &&this.state.isSepratorLine  ? "sx-line-b" : ""

        return <SxBox key = { index } isRow = { false } isCenter = { true } isPadding = { false } className = { sepratorLineClass }>
            { rowHeader }

            <SxBox isRow = { true } isCenter = { true } isStretch = { true } className = "sx-list-row-content">
            {
                childs.map((v,k)=>{
                    return this.onRenderCell(index, k, v)
                })
            }
            </SxBox>

           { rowFooter }
        </SxBox>
    },

    onRenderCell: function(row, column, item){
        if(this.props.onRenderCell){
            return this.props.onRenderCell(row, column, item)
        }
    },

    onRenderRowFooter: function(index, childs){
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
    },

    render: function(){
        return <SxBox className = "sx-list"
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
})

export default SxListView