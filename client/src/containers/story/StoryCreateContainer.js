import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'

import { Block, Value } from 'slate'
import { Editor, getEventRange, getEventTransfer } from 'slate-react'
import isImage from 'is-image'
import isUrl from 'is-url'
import Html from 'slate-html-serializer'

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

/* schema to ensure there is always a trailing paragraph
   following images and embeds */
const schema = {
  document: {
    last: { types: ['paragraph','heading1'] },
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

/* serialization for saving html to database for presentation
and deserialization of html from database in the event of
edits */
const BLOCK_TAGS = {
  p: 'paragraph',
  h1: 'heading1',
  pre: 'code',
  span: 'emoji',
}

const INLINE_TAGS = {
  span: 'emoji'
}

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        object: 'block',
        type: type,
        nodes: next(el.childNodes)
      }
    },
    serialize(obj, children) {
      if (obj.object != 'block') return
      switch (obj.type) {
        case 'code': return <pre><code>{children}</code></pre>
        case 'paragraph': return <p>{children}</p>
        case 'heading1': return <h1>{children}</h1>
        case 'emoji': return <p><span className="emoji">{children}</span></p>
      }
    }
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        object: 'mark',
        type: type,
        nodes: next(el.childNodes)
      }
    },
    serialize(obj, children) {
      if (obj.object != 'mark') return
      switch (obj.type) {
        case 'bold': return <strong>{children}</strong>
        case 'italic': return <em>{children}</em>
        case 'underline': return <u>{children}</u>
      }
    }
  },
  {
    deserialize(el, next) {
      const type = INLINE_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        kind: 'inline',
        type: type,
        nodes: next(el.childNodes)
      }
    },
    serialize(object, children) {
      if (object.kind != 'inline') return
      switch (object.type) {
        case 'link':
          return <a href={object.data.get('href')}>{children}</a>
        case 'emoji':
          return <span className="emoji">{object.data.get('code')}</span>
      }
    }
  }
]

const html = new Html({ rules })

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
      this.state = { value: Value.fromJSON(this.props.draft) }
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
      let content = value.toJSON()
      this.props.updateDraft(content)
    }
    this.setState({ value })
  }

  onSave = (e) => {
    e.preventDefault()
    const storyHTML = html.serialize(this.state.value)
    console.log('save called')
    console.log(storyHTML)
  }

  menuRef = (menu) => {
    this.menu = menu
  }

  /* EMOJI !!! */
  renderEmojiSelector = () => {
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

  /* images!! */
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

  renderWordCount = () => {
    const wordCount = this.state.value.document.text.split(' ').length
    return wordCount
  }

  renderNode = (props) => {
    const { attributes, children, node, isSelected } = props
    switch (node.type) {
      case 'paragraph': {
        return <p {...attributes}>{children}</p>
      }
      case 'heading1': {
        return <h1 {...attributes}>{children}</h1>
      }
      case 'code': {
        return <pre><code {...attributes}>{children}</code></pre>
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
       <h5>Click a currently supported Emoji to insert:<br/>{this.renderEmojiSelector()}</h5>
       <button className="btn btn-outline-secondary" type="submit">Publish</button>
       <br/><br/>
       <p>Word count: {this.renderWordCount()}</p>
     </form>
   )
  }

  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
      case 'italic': return <em>{children}</em>
      case 'underlined': return <u>{children}</u>
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
    createStory: (story) => dispatch(createStory(story)),
    updateDraft: (draft) => dispatch(updateDraft(draft)),
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(StoryCreateContainer)
