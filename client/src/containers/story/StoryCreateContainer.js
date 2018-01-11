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
import isImage from 'is-image'
import isUrl from 'is-url'

import { MdFormatBold,
         MdFormatItalic,
         MdFormatUnderlined,
         MdFormatStrikethrough,
         MdCode,
         MdFormatSize
        } from 'react-icons/lib/md/'

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'

import './StoryCreate.css'

const initialValue = {
    "document": {
    "nodes": [
      {
        "object": "block",
        "type": "heading1",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text": "Welcome to the Xtra Editor. Select some text, drag and drop an image, or insert some Emoji to get started 🙌"
              }
            ]
          },
        ]
      }
    ]
  }
}

const root = document.getElementById('app')

const EMOJIS = [
  '😃', '😬', '😂', '😅', '😆', '😍',
  '😱', '👋', '👏', '👍', '🙌', '👌',
  '🙏', '👻', '🍔', '🍑', '🍆', '🔑',
]

const noop = e => e.preventDefault()

function insertImage(change, src, target) {
  if (target) {
    change.select(target)
  }
  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src }
  })
}

/**
 * The menu.
 *
 * @type {Component}
 */

class Menu extends React.Component {

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark(type) {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type == type)
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

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

  /**
   * Render.
   *
   * @return {Element}
   */

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


/**
 * The hovering menu example.
 *
 * @type {Component}
 */

class StoryCreateContainer extends React.Component {

  /**
   * Deserialize the raw initial value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(initialValue)
  }

  /**
   * On update, update the menu.
   */

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const { value } = this.state
    const menu = this.menu
    if (!menu) return

    if (value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style')
      return
    }

    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.scrollY - menu.offsetHeight}px`
    menu.style.left = `${rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2}px`
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * Save the `menu` ref.
   *
   * @param {Menu} menu
   */

  menuRef = (menu) => {
    this.menu = menu
  }

  /* EMOJI !!! */

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {EMOJIS.map((emoji, i) => {
          const onMouseDown = e => this.onClickEmoji(e, emoji)
          return (
            <span key={i} className="button" onMouseDown={onMouseDown}>
              <span className="material-icons">{emoji}</span>
            </span>
          )
        })}
      </div>
    )
  }

  onClickEmoji = (e, code) => {
    e.preventDefault()
    const { value } = this.state
    const change = value.change()

    change.insertInline({
      type: 'emoji',
      isVoid: true,
      data: { code }
    })

    this.onChange(change)

  }

  /**
   * Handle drag and drop images
   *
   * @param {onDropOrPaste} onDropOrPaste
   */

   renderNode = (props) => {
    const { attributes, children, node, isSelected } = props
    switch (node.type) {
      case 'paragraph': {
        return <p {...attributes}>{children}</p>
      }
      case 'image': {
        const src = node.data.get('src')
        const className = isSelected ? 'active' : null
        const style = { display: 'block' }
        return (
          <img src={src} className={className} style={style} {...attributes} />
        )
      }
      case 'emoji': {
        const { data } = node
        const code = data.get('code')
        return (
          <span
            className={`emoji ${isSelected ? 'selected' : ''}`}
            {...props.attributes}
            contentEditable={true}
            onDrop={noop}
          >
            {code}
          </span>
        )
      }
    }
  }

  onDropOrPaste = (event, change, editor) => {
    event.preventDefault()
    const target = getEventRange(event, change.value)
    if (!target && event.type == 'drop') return

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type == 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [ mime ] = file.type.split('/')
        if (mime != 'image') continue

        reader.addEventListener('load', () => {
          editor.change((c) => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }

    if (type == 'text') {
      if (!isUrl(text)) return
      if (!isImage(text)) return
      change.call(insertImage, text, target)
    }
  }

  /**
   * Render.
   *
   * @return {Element}
   */

   render() {
     return (
       <div>
         <Menu
           menuRef={this.menuRef}
           value={this.state.value}
           onChange={this.onChange}
         />
         <div className="editor">
           <Editor
             placeholder="Tell me a story 😍👋🎉..."
             value={this.state.value}
             onChange={this.onChange}
             renderMark={this.renderMark}
             onDrop={this.onDropOrPaste}
             onPaste={this.onDropOrPaste}
             renderNode={this.renderNode}
           />
         </div>
         <h5>Currently supported Emoji: {this.renderToolbar()}</h5>
       </div>
     )
   }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
      case 'code': return <code>{children}</code>
      case 'italic': return <em>{children}</em>
      case 'underlined': return <u>{children}</u>
      case 'heading1': return <h1>{children}</h1>
    }
  }
}

export default StoryCreateContainer
