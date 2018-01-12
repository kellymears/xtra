import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'

import { Editor, getEventRange, getEventTransfer } from 'slate-react'
import { Block, Value } from 'slate'
import isImage from 'is-image'
import isUrl from 'is-url'

import TextMenu from './TextMenuContainer'
import initialValue from './initialValue.json'

import { createStory } from "../../actions/storyActions"
import { createDraft, updateDraft } from "../../actions/draftActions"

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'

import './StoryCreate.css'

const EMOJIS = [
  '😃', '😬', '😂', '😅', '😆', '😍',
  '😱', '👋', '👏', '👍', '🙌', '👌',
  '🙏', '👻', '🍔', '🍑', '🍆', '🔑',
]

const schema = {
  document: {
    last: { types: ['paragraph'] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    }
  }
}

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

class StoryCreateContainer extends React.Component {

  constructor(props) {
    super(props)
    if(!this.props.draft) {
      this.state = { value: Value.fromJSON(initialValue) }
      this.props.updateDraft(initialValue)
    } else {
      this.state = { value: Value.fromJSON(JSON.parse(this.props.draft)) }
    }
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

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

  onChange = ({ value }) => {
    if (value.document != this.state.value.document) {
      let content = JSON.stringify(value.toJSON())
      this.props.updateDraft(content)
    }
    this.setState({ value })
  }

  onSave = (e) => {
    e.preventDefault()
    let editorState = this.state.value
    let content = JSON.stringify(editorState.toJSON())
    console.log('save called')
    console.log(content)
  }

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
            contentEditable={false}
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

  render() {
   return (
     <form onSubmit={ this.onSave }>
       <TextMenu
         menuRef={this.menuRef}
         value={this.state.value}
         onChange={this.onChange}
       />
       <div className="editor">
         <Editor
           placeholder="Tell me a story 😍👋🎉..."
           value={this.state.value}
           schema={schema}
           onChange={this.onChange}
           renderMark={this.renderMark}
           onDrop={this.onDropOrPaste}
           onPaste={this.onDropOrPaste}
           renderNode={this.renderNode}
         />
       </div>
       <h5>Click a currently supported Emoji to insert:<br/>{this.renderToolbar()}</h5>
       <button className="btn btn-outline-secondary" type="submit">Publish</button>
     </form>
   )
  }

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

const mapStateToProps = (state) => {
  return {
    draft: state.draft.content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDraft: (draft) => dispatch(updateDraft(draft)),
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(StoryCreateContainer)
