import React, { Component } from 'react'
import Immutable from 'immutable'
import { SxBox } from '../box/index'
import { util } from '../util'


/* ================================================================================
 * 网格列表组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxGrid = React.createClass({
    propTypes: function(){
        return {
            column: React.PropTypes.number,
            data: React.PropTypes.array,
            isSection: React.PropTypes.bool
        }
    },

    getDefaultProps: function(){
        return{
            column: 5,
            data: null,
            isSection: false,
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
            data: this.props.data,
            isSection: this.props.isSection
        }
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({data: nextProps.data})
        this.setState({isSection: nextProps.isSection})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        let isChange = !Immutable.is(Immutable.fromJS(nextState.data),Immutable.fromJS(this.state.data)) || 
        nextState.column != this.state.column || 
        nextState.isSection != this.state.isSection
        return isChange
    },

    setColumn: function(column){
        this.setState( { column: column } )
    },

    switchSection: function(){
        this.setState( { isSection: !this.state.isSection } )
    },

    renderSections: function(){
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
            if(this.props.onRenderSectionHeader){
                sectionHeader = this.props.onRenderSectionHeader(k, v, childs)
            }else{
                sectionHeader = <p> { v } </p>
            }

            if(this.props.onRenderSectionFooter){
                sectionFooter = this.props.onRenderSectionFooter(k, v, childs)
            }

            groups = groups.push(<SxBox isRow = {false} isCenter = {true} isBetween = {true}>
                <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-grid-section-header">
                    { sectionHeader }
                </SxBox>
                {
                    this.renderRows(childs)
                }
                <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-grid-section-footer">
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

        data.forEach( (v,k) => {
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

        return groups.map((v,k)=>{
            return this.renderRow(k, v)
        })
    },

    renderRowHeader: function(index, childs){
        let rowHeader = ""

        if(this.props.onRenderRowHeader){
            rowHeader = this.props.onRenderRowHeader(index, childs)
        }

        return rowHeader == "" ?
        ""
        :
        <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-grid-row-header">
            { rowHeader }
        </SxBox>
    },

    renderRow: function(index, childs){
        let rowHeader = this.renderRowHeader(index, childs)
        let rowFooter = this.renderRowFooter(index, childs)

        return <SxBox isRow = { false } isCenter = {true} isPadding = { false } >
            { rowHeader }

            <SxBox isRow = { true } isCenter = { true } isTop = { true } className = "sx-grid-row-content">
            {
                childs.map((v,k)=>{
                    return this.renderCell(index, k, v)
                })
            }
            </SxBox>

           { rowFooter }
        </SxBox>
    },

    renderCell: function(row, column, item){
        let rowIndex = parseInt(row) + 1
        let columnIndex = parseInt(column) + 1
        let index = rowIndex * columnIndex
        if(this.props.onRenderCell){
            return this.props.onRenderCell(index, item)
        }
    },

    renderRowFooter: function(index, childs){
        let rowFooter = ""

        if(this.props.onRenderRowFooter){
            rowFooter = this.props.onRenderRowFooter(index, childs)
        }

        return rowFooter == "" ?
        ""
        :
        <SxBox isRow = { true } isCenter = { true } isPadding = { false } className = "sx-grid-row-footer">
            { rowFooter }
        </SxBox>
    },

    render: function(){
        return <SxBox isRow = {false} isCenter = {true} isBetween = {true} isPadding = {false}>
            {
                this.state.isSection ? this.renderSections() : this.renderRows()
            }
        </SxBox>
    }
})

export default SxGrid