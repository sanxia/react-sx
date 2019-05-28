import React, { Component } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { SxImage } from '../image/index'


/* ================================================================================
 * 图片按钮组件
 * qq group: 582452342
 * email   : 2091938785@qq.com
 * author  : 美丽的地球啊 - mliu
 * ================================================================================ */
class SxImageButton extends Component{
    constructor(props, context) {
        super(props, context)

        this.state = {
            title: props.title,
            tag: props.tag,
            images: Immutable.fromJS(props.images),
            isActive: false,
            isChecked: props.isChecked,
            isValidate: props.isValidate
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({title: nextProps.title})
        this.setState({tag: nextProps.tag})
        this.setState({images: Immutable.fromJS(nextProps.images)})
        this.setState({isChecked: nextProps.isChecked})
        this.setState({isValidate: nextProps.isValidate})
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isChange = nextState.title != this.state.title
        || nextState.tag != this.state.tag
        || !Immutable.is(nextState.images, this.state.images)
        || nextState.isActive != this.state.isActive
        || nextState.isChecked != this.state.isChecked
        || nextState.isValidate != this.state.isValidate

        return isChange
    }

    componentDidUpdate(prevProps, prevState){
        this.onValidate(this.state.isValidate)
    }

    getTitle(){
        return this.state.title
    }

    setTitle(newTitle){
        this.setState({title: newTitle})
    }

    getTag(){
        return this.state.tag
    }

    setTag(newTag){
        this.setState({tag: newTag})
    }

    isChecked(){
        return this.state.isChecked
    }

    setChecked(isChecked){
        this.setState({isChecked: isChecked})
    }

    setValidate(isValidate){
        this.setState( { isValidate: isValidate } )
    }

    getCssClass(){
        let type = this.props.type
        let cssClass = classNames({
            "sx-imgbtn": true,
            "sx-imgbtn-active": this.state.isActive,
            "sx-imgbtn-invalid": !this.state.isValidate,
        })

        let space = this.props.space
        if(space != ""){
            cssClass = cssClass + " sx-space-"+space
        }

        //获取传入的className属性组合起来
        let { className } = this.props
        if(className){
            cssClass = cssClass + " " + className 
        }

        return cssClass
    }

    getImage(){
        // 0: valid | 1: active | 2: selected | 3: invalid
        let images = this.state.images.toJS()
        if(images.length == 0){
            return ""
        }

        //必须四个image元素
        while(images.length < 4){
            images.push(images[0])
        }

        //当前的icon
        let imageUrl = images[0]
        if(this.state.isValidate){
            if(this.state.isActive){
                imageUrl = images[1]
            }else{
                if(this.state.isChecked){
                    imageUrl = images[2]
                }
            }
        }else{
            imageUrl = images[3]
        }

        return imageUrl
    }

    onMouseOver(){
        if(this.state.isValidate){
            this.setState({isActive: true})
        }
    }

    onMouseOut(){
        if(this.state.isValidate){
            this.setState({isActive: false})
        }
    }

    onValidate(isValidate) {        
        if(this.props.onValidate){
            this.props.onValidate(isValidate)
        }

        return isValidate
    }

    onButton(){
        if(!this.state.isValidate){
            return
        }

        if(this.props.onButton){
            if(this.props.onButton({tag: this.state.tag, isChecked: !this.state.isChecked })){
                this.setState({isChecked: !this.state.isChecked})
            }
        }else{
            this.setState({isChecked: !this.state.isChecked})
        }

        this.onMouseOut()
    }

    render() {
        let cssClass = this.getCssClass()
        let imageUrl = this.getImage()

        return <div { ...this.props }
        className = { cssClass }
        onMouseOver = { ()=>{this.onMouseOver()} }
        onMouseOut = { ()=>{this.onMouseOut()} }>
            <img src = { imageUrl }
            title = { this.state.title }
            alt = { this.state.title }
            onClick = { ()=>{this.onButton()} } />
        </div>
    }
}

SxImageButton.propTypes = {
    title: React.PropTypes.string,
    tag: React.PropTypes.string,
    images: React.PropTypes.array,
    isChecked: React.PropTypes.bool,
    space: React.PropTypes.string,
    isValidate: React.PropTypes.bool,
    onButton: React.PropTypes.func
};

SxImageButton.defaultProps = {
    title: "",
    tag: "",
    images: [],
    space: "",
    isChecked: false,
    isValidate: false,
    onButton: null
};

export default SxImageButton
