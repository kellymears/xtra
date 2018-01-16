import React from 'react'
import ReactDOM from 'react-dom'

import {Editor, getEventRange, getEventTransfer} from 'slate-react'
import {Block, Value} from 'slate'

import {MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdFormatSize
} from 'react-icons/lib/md/'

const root = document.getElementById('app')

class TextMenu extends React.Component {
  hasMark(type) {
    const {value} = this.props
    return value.activeMarks.some(mark => mark.type == type)
  }

  isNode(type) {
    const {value} = this.props
    return value.blocks.some(block => block.type == type)
  }

  onClickMark(event, type) {
    const {value, onChange} = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    console.log('mark format clicked')
    console.log(change)
    onChange(change)
  }

  onClickNode(event, type) {
    const {value, onChange} = this.props
    event.preventDefault()
    const isNode = value.blocks.some(block => block.type == type)
    const change = value.change().setBlock(isNode ? 'paragraph' : type)
    console.log('node format clicked')
    onChange(change)
  }

  renderButton(type, icon) {
    const isMarkActive = this.hasMark(type)
    const isNodeActive = this.isNode(type)
    const markMouseDown = event => this.onClickMark(event, type)
    const nodeMouseDown = event => this.onClickNode(event, type)
    switch(icon) {
    case 'format_bold':
      return (
        <span className="button" onMouseDown={markMouseDown} data-active={isMarkActive}>
          <span className="material-icons"><MdFormatBold /></span>
        </span>
      )
    case 'format_underlined':
      return (
        <span className="button" onMouseDown={markMouseDown} data-active={isMarkActive}>
          <span className="material-icons"><MdFormatUnderlined /></span>
        </span>
      )
    case 'format_italic':
      return (
        <span className="button" onMouseDown={markMouseDown} data-active={isMarkActive}>
          <span className="material-icons"><MdFormatItalic /></span>
        </span>
      )
    case 'format_code':
      return (
        <span className="button" onMouseDown={nodeMouseDown} data-active={isNodeActive}>
          <span className="material-icons"><MdCode /></span>
        </span>
      )
    case 'format_heading1':
      return (
        <span className="button" onMouseDown={nodeMouseDown} data-active={isNodeActive}>
          <MdFormatSize />
        </span>
      )
    default:
      return (null)
    }
  }

  render() {
    return ReactDOM.createPortal(
      <div className="menu hover-menu" ref={this.props.menuRef}>
        {this.renderButton('heading1', 'format_heading1')}
        {this.renderButton('bold', 'format_bold')}
        {this.renderButton('italic', 'format_italic')}
        {this.renderButton('underlined', 'format_underlined')}
        {this.renderButton('code', 'format_code')}
      </div>,
      root
    )
  }
}

export default TextMenu
