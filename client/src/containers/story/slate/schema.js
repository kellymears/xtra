import {Block} from 'slate'

/* always add a trailing paragraph after non-text elements */
export const schema = {
  document: {
    last:      {types: ['paragraph', 'heading1']},
    normalize: (change, reason, {node, child}) => {
      switch (reason) {
      case 'last_child_type_invalid': {
        const paragraph = Block.create('paragraph')
        return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
      }
      default:
        return null
      }
    }
  }
}
