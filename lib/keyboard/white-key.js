import React, { Component } from 'react'


/* ================================================================================
 * 钢琴键
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxWhiteKey extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            musicName: props.musicName,
            color: props.color,
            bgColor: props.bgColor,
            isDown: false,
            isActiving: props.isActiving,
            isSelected: props.isSelected,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState({musicName: nextProps.musicName})
        this.setState({color: nextProps.color})
        this.setState({bgColor: nextProps.bgColor})
        this.setState({isActiving: nextProps.isActiving})
        this.setState({isSelected: nextProps.isSelected})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate = (nextProps, nextState)=>{
        let isChanged = nextState.musicName != this.state.musicName
        || nextState.color != this.state.color
        || nextState.bgColor != this.state.bgColor
        || nextState.isDown != this.state.isDown
        || nextState.isActiving != this.state.isActiving
        || nextState.isSelected != this.state.isSelected
        || nextState.isValidate != this.state.isValidate

        return isChanged
    }

    componentDidUpdate = (prevProps, prevState)=>{
    }

    componentWillUnmount = ()=>{
    }

    setSelect = (isSelected)=>{
        this.setState({isSelected: isSelected})
    }

    onMouseEnter = (e)=>{
        if(!this.state.isValidate) return;

        if(this.props.onEnter){
            this.props.onEnter()
        }

        this.setState({isActiving: true})
    }

    onMouseLeave = (e)=>{
        if(!this.state.isValidate) return;


        if(this.props.onLeave){
            this.props.onLeave()
        }

        this.setState({isActiving: false})
    }

    onMouseDown = (e)=>{
        if(!this.state.isValidate) return;

        this.setState({isDown: true})
        this.setState({isActiving: false})
    }

    onMouseUp = (e)=>{
        if(!this.state.isValidate) return;

        if(this.props.onSelect){
            this.props.onSelect({
                musicName: this.state.musicName,
                musicLocation: this.props.musicLocation,
                isBlack: false,
                isSelected: !this.state.isSelected
            })
        }

        this.setState({isDown: false})
        this.setState({isSelected: !this.state.isSelected})
    }

    renderWhiteKey = ()=>{
        let whiteKeyClass = "sx-box sx-box-c sx-box-csc sx-box-rsc sx-keyboard-whitekey"
    
        if(this.state.isDown){
            whiteKeyClass = whiteKeyClass + " sx-keyboard-whitekey-select"
        }else{
            if(this.state.isActiving){
                whiteKeyClass = whiteKeyClass + " sx-keyboard-whitekey-activing"
            }else{
                if(this.state.isSelected){
                    whiteKeyClass = whiteKeyClass + " sx-keyboard-whitekey-select"
                }
            }
        }

        return <div className = { whiteKeyClass }
            onMouseEnter = { (e)=>this.onMouseEnter(e) }
            onMouseLeave = { (e)=>this.onMouseLeave(e) }
            onMouseDown = { (e)=>this.onMouseDown(e) }
            onMouseUp = { (e)=>this.onMouseUp(e) } >

            <div className = "sx-keyboard-whitekey-icon" />
            {
                this.state.isSelected && <div className = "sx-keyboard-whitekey-selected"></div>
            }

            {
                this.props.isKey && this.state.isSelected && <span className = "sx-box sx-box-c sx-box-csc sx-box-rsc sx-keyboard-whitekey-text">
                    { this.state.musicName }
                </span>
            }
        </div>
    }

    render = ()=>{
        return this.renderWhiteKey()
    }
}

SxWhiteKey.propTypes = {
    musicName: React.PropTypes.string,
    musicLocation: React.PropTypes.number,
    color: React.PropTypes.string,
    bgColor: React.PropTypes.string,
    isActiving: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,
    isValidate: React.PropTypes.bool,
    onSelect: React.PropTypes.func
};

SxWhiteKey.defaultProps = {
    musicName: "C",
    musicLocation: 0,
    color: "#333",
    bgColor: "#f9f9f9",
    isActiving: false,
    isSelected: false,
    isValidate: true,
    onSelect: null
}

export default SxWhiteKey
