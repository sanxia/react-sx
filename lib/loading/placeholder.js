import React, { Component } from 'react'


/* ================================================================================
 * Loading组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxPlaceholder extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            placeholder: props.placeholder,
            isPending: props.isPending
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({placeholder: nextProps.placeholder})
        this.setState({isPending: nextProps.isPending})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    setPending(isPending){
        this.setState({isPending: isPending})
    }

    renderPlaceholder = ()=>{
        let placeholder = this.state.placeholder

        if(this.props.onPlaceholder != null){
            placeholder = this.props.onPlaceholder()
        }

        return <div className = "sx-placeholder">
            { placeholder }
        </div>
    }

    renderContent = ()=>{
        return <section>
            { this.props.children }
        </section>
    }

    render = ()=>{
        return this.state.isPending ? this.renderPlaceholder() : this.renderContent()
    }
}

SxPlaceholder.propTypes = {
    placeholder: React.PropTypes.string,
    isPending: React.PropTypes.bool,
    onPlaceholder: React.PropTypes.func
};

SxPlaceholder.defaultProps = {
    placeholder: "loading",
    isPending: true,
    onPlaceholder: null
};

export default SxPlaceholder
