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

import TextMenu from './TextMenuContainer'
import initialValue from './slate/initialValue.json'
import { EMOJIS } from './slate/emojis'
import { schema } from './slate/schema'
import { html } from './slate/serialize'
import { insertImage } from './slate/images'

import { createDraft,
         updateDraft,
         publishDraft } from "../../actions/draftActions"

import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'

import './StoryCreate.css'

const noop = e => e.preventDefault()

class StoryCreateContainer extends React.Component {

  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount() {
    if(!this.props.draft.body) {
      console.log('no draft detected :(')
      this.state = { value: Value.fromJSON(initialValue) }
      this.props.createDraft({
        title: 'Title',
        subtitle: 'Subtitle',
        body: initialValue
      })
    } else {
      this.setState({
        title: this.props.draft.title,
        subtitle: this.props.draft.subtitle,
        value: Value.fromJSON(this.props.draft.body)
      })
    }
  }

  componentDidMount() {
    this.updateMenu()
  }

  componentDidUpdate() {
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

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value})
    this.props.updateDraft({ [e.target.name]: e.target.value })
  }

  onSlateChange = ({ value }) => {
    if (value.document != this.state.value.document)
      this.props.updateDraft({ body: value.toJSON() })
    this.setState({ value })
  }

  onSave(e) {
    e.preventDefault()
    const story = {
      title: this.state.title,
      subtitle: this.state.subtitle,
      author: this.props.profile._id,
      body: html.serialize(this.state.value)
    }
    console.log('save called')
    console.log(story)
    this.props.publishDraft(story)
  }

  menuRef = (menu) => {
    this.menu = menu
  }

  /* EMOJI !!! */
  renderEmojiSelector = () => {
    return (
      <div className="menu toolbar-menu">
        { EMOJIS.map((emoji, i) => {
          const onMouseDown = e => this.onClickEmoji(e, emoji)
          return (
            <span key={i} className="button" onMouseDown={onMouseDown}>
              <span className="material-icons">{emoji}</span>
            </span>
          )
         })
       }
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

    this.onSlateChange(change)

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

  getWordCount = () => {
    const wordCount = this.state.value.document.text.split(' ').length - 1
    return wordCount
  }

  renderNode = (props) => {
    const { attributes, children, node, isSelected } = props
    switch (node.type) {
      case 'paragraph': {
        return <p {...attributes}>{children}</p>
      }
      case 'heading1': {
        return <h2 {...attributes}>{children}</h2>
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

     <form onSubmit={this.onSave}>
       <TextMenu
         menuRef={this.menuRef}
         value={this.state.value}
         onChange={this.onSlateChange}
       />

       <input id="title" type="text" name="title" value={this.state.title} onChange={this.onInputChange} placeholder="Story Title" />
       <br/><br/>
       <input id="subtitle" type="text" name="subtitle" value={this.state.subtitle} onChange={this.onInputChange} placeholder="Story Subtitle" />

       <div className="editor">
         <Editor
           placeholder="Tell me a story 😍👋🎉..."
           value={this.state.value}
           schema={schema}
           onChange={this.onSlateChange}
           renderMark={this.renderMark}
           onDrop={this.onDropOrPaste}
           onPaste={this.onDropOrPaste}
           renderNode={this.renderNode}
         />
       </div>

       <h5>Click a currently supported Emoji to insert:<br/>
       {this.renderEmojiSelector()}</h5>

       <button className="btn btn-outline-secondary" type="submit">Publish</button>
       <br/><br/>

       <p>Word count: {this.getWordCount()}</p>
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
    draft: state.draft,
    profile: state.profile.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDraft: (story) => dispatch(createDraft(story)),
    updateDraft: (draft) => dispatch(updateDraft(draft)),
    publishDraft: (draft) => dispatch(publishDraft(draft))
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(StoryCreateContainer)
