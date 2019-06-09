import React, { Component } from 'react'
import Immutable from 'immutable'
import { SxCascade } from '../cascade/index'


/* ================================================================================
 * 日期下拉框组组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxDate extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: Immutable.fromJS(props.value),
            data: this.getData(Immutable.fromJS(props.value))
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: Immutable.fromJS(nextProps.value)})
        this.setState({data: this.getData(Immutable.fromJS(nextProps.value))})

        //add
        if(this.props.onValidate){
            this.props.onValidate(this.isValidate())
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChanged = !Immutable.is(nextState.value, this.state.value)
        || !Immutable.is(nextState.data, this.state.data)
        return true
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.onValidate){
            this.props.onValidate(this.isValidate())
        }
    }

    getData(value) {
        let data = Immutable.fromJS([])
        let currentYear = new Date().getFullYear()
        let maxYear = currentYear
        let minYear = currentYear - 50

        if(this.props.maxYear > 0){
            maxYear = this.props.maxYear
        }

        if(this.props.countYear > 0){
            minYear = maxYear - this.props.countYear
        }

        for(let i = maxYear; i > minYear ; i--){
            data = data.push(Immutable.fromJS({
                text: i + this.props.titles.year,
                value: i,
                sortorder: 1,
                isChecked: false,
                childs:[]
            }))
        }

        let selectedYear = parseInt(value.get(0, 0))
        let selectedMonth = parseInt(value.get(1, 0))
        let selectedDay = parseInt(value.get(2, 0))

        data = data.map( (v,k) => {
            let year = v.get("value")
            if(year == selectedYear){
                for(let i=0; i < 12; i ++){
                    let month = i + 1
                    v = v.setIn(["childs", i], Immutable.fromJS({
                        text: this.getFullText(month) + this.props.titles.month,
                        value: month,
                        sortorder: 1,
                        isChecked: false,
                        childs:[]
                    }))

                    if(month == selectedMonth){
                        let dayCount = this.getDayCount(year, month)
                        for(let j=0; j < dayCount; j++){
                            let day = j + 1
                            v = v.setIn(["childs", i, "childs", j], Immutable.fromJS({
                                text: this.getFullText(day) + this.props.titles.day,
                                value: day,
                                sortorder: 1,
                                isChecked: false
                            }))
                        }
                    }
                }
            }
            return v
        })
        return data
    }

    getFullText(value){
        return value <= 9 ? "0" + value : value
    }

    getDayCount(year, month){
        let dayCount
        if( month == 4 || month == 6 || month == 9 || month == 11 ){
          dayCount = 30
        } else if (month == 2){
            let isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
            dayCount = isLeapYear ? 29 : 28
        } else {
            dayCount = 31 
        }

        return dayCount
    }

    getValue(){
        let value = Immutable.fromJS(this.cascade.getValue())
        let year = value.get(0).length == 0 ? 0 : parseInt(value.get(0, 0))
        let month = value.get(1).length == 0 ? 0 : parseInt(value.get(1, 0))
        let day = value.get(2).length == 0 ? 0 : parseInt(value.get(2, 0))
        return {
            year: year,
            month: month,
            day: day
        }
    }

    isValidate(){
        return this.cascade.isValidate()
    }

    onBinding = (data)=>{
        data = Immutable.fromJS(data)
        let value = Immutable.fromJS(data.get("value"))
        if(this.props.onBinding){
            if(this.props.onBinding(data.toJS())){
                this.setState({value: value, data: this.getData(value)})
                return true
            }else{
                return false
            }
        }else{
            this.setState({value: value, data: this.getData(value)})
            return true
        }
    }

    renderTitle = ()=>{
        let content = ""

        if(this.props.title != ""){
            content = <span className = "sx-title">
                { this.props.title }
            </span>

            if(this.props.isRequire){
                content = <span className = "sx-title">
                    { this.props.title }
                    <i>*</i>
                </span>
            }
        }

        return content
    }

    render = ()=>{
        return <div className = "sx-select-group">
        
            { this.renderTitle() }

            <SxCascade ref = { (cascade)=>this.cascade=cascade }
            caption = { this.props.caption }
            data = { this.state.data.toJS() }
            value = { this.state.value.toJS() }
            isDesc = { this.props.isDesc }
            isExpand = { this.props.isExpand }
            isRequire = { this.props.isRequire }
            onHeading = { this.props.onHeading }
            onTailing = { this.props.onTailing }
            onBinding = { this.onBinding }
            onValidate = { this.props.onValidate }>

                { this.props.children }

            </SxCascade>

        </div>
    }
}

SxDate.propTypes = {
    title: React.PropTypes.string,
    caption: React.PropTypes.string,
    titles: React.PropTypes.shape({
        year: React.PropTypes.string,
        month: React.PropTypes.string,
        day: React.PropTypes.string
    }),
    maxYear: React.PropTypes.number,
    countYear: React.PropTypes.number,
    value: React.PropTypes.arrayOf(React.PropTypes.number),
    isDesc: React.PropTypes.bool,
    isExpand: React.PropTypes.bool,
    isRequire: React.PropTypes.bool,
    onHeading: React.PropTypes.func,
    onTailing: React.PropTypes.func,
    onValidate: React.PropTypes.func
};

SxDate.defaultProps = {
    title: "",
    caption: "",
    titles: {
        year: "年",
        month: "月",
        day: "日"
    },
    maxYear: 0,
    countYear: 0,
    value: [],
    isDesc: true,
    isExpand: false,
    isRequire: false,
    onHeading: null,
    onTailing: null,
    onBinding: null,
    onValidate: null
};

export default SxDate
