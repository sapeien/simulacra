'use strict'

var keys = [
  'hasDefinition',
  'isBoundToParent',
  'hasMutators',
  'marker',
  'replaceAttribute'
]

var keyMap = {}
var i, j

for (i = 0, j = keys.length; i < j; i++)
  keyMap[keys[i]] = '__' + keys[i]

module.exports = keyMap