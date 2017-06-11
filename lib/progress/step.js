import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxBox } from '../box/index'


/* ================================================================================
 * Step组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊
 * ================================================================================ */
var SxStep = React.createClass({
    propTypes: function(){
        return {
            value: React.PropTypes.number,
            titles: React.PropTypes.array
        }
    },

    getDefaultProps: function(){
        return {
            value: 0,
            titles: []
        }
    },

    getInitialState: function(){
        return{
            value: this.props.value < 0 ? 0 : this.props.value,
            titles: Immutable.fromJS(this.props.titles)
        }
    },

    setValue: function(value){
        this.setState({value: value})
    },

    componentWillReceiveProps: function (nextProps){
        this.setState({value: nextProps.value})
        this.setState({titles: Immutable.fromJS(nextProps.titles)})
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.value !== this.state.value
        || nextState.titles !== this.state.titles
    },

    renderSteps: function(){
        return <ul className="sx-step">
        {
            this.state.titles.map((v,k)=>{
                let isPass =  k < this.state.value
                let itemClass = classNames({
                    "sx-step-item": true,
                    "sx-step-pass": isPass,
                    "sx-step-active": this.state.value == k
                })

                let item = <li className={ itemClass }>
                    {
                        this.state.titles.count() == 1 || k == this.state.titles.count() - 1 ? "" : <div className="sx-step-line"></div>
                    }
                    
                    <div className = "sx-step-info">
                        <i className = "sx-step-icon">{ isPass ? "" : k+1 }</i>
                        <h4 className = "sx-step-text">{ v }</h4>
                    </div>
                </li>

            return item
            })
        }
        </ul>
    },

    render: function() {
        let steps = this.renderSteps()
        return <SxBox isCenter = { true } isPadding = { false }>
                { steps }
        </SxBox>
    }
})

export default SxStep
