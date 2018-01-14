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
