
import xml2js from "xml2js"

export default class FileHandler {
    constructor (fileType, text) {
        this.fileType = fileType
        this.text = text
        this.typeHandler = this.typeHandler()
    }

    typeHandler () {
        switch (this.fileType) {
            case 'csv':
                return this.csvHandler()
            case 'json':
                return this.jsonHandler()
            case 'xml':
                return this.xmlHandler()
            default: 
                break
        }
    }   

    csvHandler () {
        const lines = this.text.split('\r\n')
        const headers = lines[0].split(',')
        const data = []

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(',')
            const obj = {}
            if(line.length > 1) {
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = line[j] 
                }
                data.push(obj)
            }
        }

        if (data.length > 0) {
            return data
        } else {
            throw new Error('No data to print')
        }
    }

    jsonHandler () {
        const data = JSON.parse(this.text) 
        return data.clothes 
    }

    xmlHandler () {
        const parseString = xml2js.parseString
        const res = []
        
        let data = parseString(this.text, (err, result) => {
            res.push(result.clothes.garment)
        })
        data = JSON.stringify(res)
        data = JSON.parse(data).flat()

        let itemObject = data.map(item => {   
            return {
                "type": item.type ? item.type[0] : "",
                "size": item.size ? item.size[0] : "",
                "brand": item.brand ? item.brand[0] : "",
                "color": item.color ? item.color[0] : "",
            }
        })

        return itemObject
    }
}