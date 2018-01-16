import React from 'react'
import Html from 'slate-html-serializer'

const BLOCK_TAGS = {
  p:    'paragraph',
  h2:   'heading1',
  pre:  'code',
  span: 'emoji'
}

const INLINE_TAGS = {
  span: 'emoji'
}

const MARK_TAGS = {
  em:     'italic',
  strong: 'bold',
  u:      'underline'
}

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        object: 'block',
        type:   type,
        nodes:  next(el.childNodes)
      }
    },
    serialize(obj, children) {
      if (obj.object != 'block') return
      switch (obj.type) {
      case 'code': return <pre><code>{children}</code></pre>
      case 'paragraph': return <p>{children}</p>
      case 'heading1': return <h2>{children}</h2>
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
        type:   type,
        nodes:  next(el.childNodes)
      }
    },
    serialize(obj, children) {
      if (obj.object != 'mark') return
      switch (obj.type) {
      case 'bold': return <strong>{children}</strong>
      case 'italic': return <em>{children}</em>
      case 'underline': return <u>{children}</u>
      default: return null
      }
    }
  },
  {
    deserialize(el, next) {
      const type = INLINE_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        kind:  'inline',
        type:  type,
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
      default: return null
      }
    }
  }
]

export const html = new Html({rules})
