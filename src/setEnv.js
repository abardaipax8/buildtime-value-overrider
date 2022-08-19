const fs = require('fs')
require('dotenv').config()

module.exports.updateEnvFile = (pathToenvFile, keyValMap) => {
    fs.readFile(pathToenvFile, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        var result = parseEnv(data);
        
        for (const keyVal of keyValMap) {
            const key = keyVal.split('=')[0].toUpperCase()
            const val = keyVal.split('=')[1]

            if (result[key]) {
                result[key] = val;
            } else {
                console.log(`Key: ${key}, does not exist in env file!`)
            }
        }
        
        fs.writeFile(pathToenvFile, stringifyToEnvVars(result), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Env vars successfully updated!");
        })
    });
}

function parseEnv(data) {
    const map = {}
    data.split('\n')
        .filter(empty => empty)
        .map(x => {
            const split = x.split('=').map(str => str.trim())
            if (!split[0] || !split[1]) {
                console.log(`Missing values found! data: ${x} `)
            }
            map[split[0].toUpperCase()] = split[1]
        })
    return map
}

function stringifyToEnvVars(map) {
    var data = ''
    Object.entries(map).forEach(([key, val]) => {
        data += `${key.toUpperCase()}=${val}\n`
    })
    return data
}

updateEnvFile('HELLO', 'hahahahah dumbass hahahah')