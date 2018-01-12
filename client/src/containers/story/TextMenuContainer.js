import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'

import { createStory } from "../../actions/storyActions"
import { createDraft, updateDraft } from "../../actions/draftActions"

import { Editor, getEventRange, getEventTransfer } from 'slate-react'
import { Block, Value } from 'slate'

import initialValue from './initialValue.json'

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'

import { MdFormatBold,
         MdFormatItalic,
         MdFormatUnderlined,
         MdFormatStrikethrough,
         MdCode,
         MdFormatSize
        } from 'react-icons/lib/md/'

const root = document.getElementById('app')

class TextMenu extends React.Component {

  hasMark(type) {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type == type)
  }

  onClickMark(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
  }

  renderMarkButton(type, icon) {
    const isActive = this.hasMark(type)
    const onMouseDown = event => this.onClickMark(event, type)
    switch(icon) {
      case "format_bold":
        return (
          <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className="material-icons"><MdFormatBold /></span>
          </span>
        )
      case "format_underlined":
        return (
          <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className="material-icons"><MdFormatUnderlined /></span>
          </span>
        )
      case "format_italic":
        return (
          <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
            <span className="material-icons"><MdFormatItalic /></span>
          </span>
        )
        case "format_code":
          return (
            <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
              <span className="material-icons"><MdCode /></span>
            </span>
          )
        case "format_heading1":
      return (
        <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
          <MdFormatSize />
        </span>
      )
    }
  }

  render() {
   return ReactDOM.createPortal(
       <div className="menu hover-menu" ref={this.props.menuRef}>
         {this.renderMarkButton('heading1', 'format_heading1')}
         {this.renderMarkButton('bold', 'format_bold')}
         {this.renderMarkButton('italic', 'format_italic')}
         {this.renderMarkButton('underlined', 'format_underlined')}
         {this.renderMarkButton('code', 'format_code')}
       </div>,
       root
    )
  }

}

export default TextMenu
