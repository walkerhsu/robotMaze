const fs = require('fs')
const csv = require('csv')

let map = []
let record = []
const fsPromises = fs.promises

async function loadMap(inputfile , calbak) {
    try {
        const input = await fsPromises.readFile(inputfile)

        const parser = csv.parse({
            delimiter: ','
        })

        parser.on('readable', function () {
            while (record = parser.read()) map.push(record)
        })

        parser.on('error', (err) => console.error(err.message))

        parser.on('end', () => {
            console.log('Map loaded ...')
            calbak(map)
        })

        parser.write(input)

        parser.end()
    } catch (error) {
        console.log('error', error)
    }
}

exports.queryMap = function queryMap(input, calbak) {
    loadMap(input, calbak)
}