import React, { Component } from 'react'
import immutable from 'immutable'
import classNames from 'classnames'
import { SxBox } from '../box/index'


/* ================================================================================
 * Step组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxStep extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: props.value < 0 ? 0 : props.value,
            titles: immutable.fromJS(this.props.titles)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value})
        this.setState({titles: immutable.fromJS(nextProps.titles)})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value
        || nextState.titles !== this.state.titles
    }

    setValue(value){
        this.setState({value: value})
    }

    renderSteps = ()=>{
        return <ul className="sx-step">
        {
            this.state.titles.map((v,k)=>{
                let isPass =  k < this.state.value
                let itemClass = classNames({
                    "sx-step-item": true,
                    "sx-step-pass": isPass,
                    "sx-step-active": this.state.value == k
                })

                return <li key = { k } className = { itemClass }>
                    {
                        this.state.titles.count() == 1 || k == this.state.titles.count() - 1 ? "" : <div className="sx-step-line"></div>
                    }
                    
                    <div className = "sx-step-info">
                        <i className = "sx-step-icon">{ isPass ? "" : k+1 }</i>
                        <h4 className = "sx-step-text">{ v }</h4>
                    </div>
                </li>
            })
        }
        </ul>
    }

    render = ()=>{
        return <SxBox isCenter = { true } isPadding = { false }>
            { this.renderSteps() }
        </SxBox>
    }
}

SxStep.propTypes = {
    value: React.PropTypes.number,
    titles: React.PropTypes.array
};

SxStep.defaultProps = {
    value: 0,
    titles: []
};

export default SxStep
