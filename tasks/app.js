
/*
    The application supports for downloading a specific
    network source code and then archive it into 
    compressed-file.

*/
const async = require('async')
const exec = require('child_process').exec
const path = require('path')
const _ = require('lodash')
const fs = require('fs')
const dataPath = path.join(__dirname, 'data')

let configFiles = {
    dev:  'dev.json',
    test: 'test.json',
    pro: 'prod.json',
}

let configContent = {}

async.forEachOf(configFiles, (value, key, callback) => {
    fs.readFile(path.join(dataPath, value), 'utf8', (err, data) => {
        if(err) return callback(err)
        try {
            configContent[key] = JSON.parse(data)
        } catch (e) {
            callback(e)
        }
        callback()
    })
}, (err) => {
    if (err) {
        console.error(err.message)
    }

   _.forIn(configContent, (value, key) => {
       console.log(`${key}: ${JSON.stringify(value)}`)
   } )
})