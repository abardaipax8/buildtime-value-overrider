const core = require('@actions/core')

const path = core.getInput('filePath')
const vals = core.getInput('keyValueObject')

console.log(path)
console.log(vals)