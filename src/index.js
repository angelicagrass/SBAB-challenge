import FileReader from './file-reader.js'
import FileHandler from './file-handler.js'
import Printer from './printer.js'

const filePaths = [
    './files/Test File - Clothes.csv', 
    './files/Test File - Clothes.json', 
   './files/Test File - Clothes.xml'
]

const dataArray = []

try {
    for (const filePath of filePaths) {
        const fileReader = new FileReader(filePath)
        const text = await fileReader.readFile()
        const fileType = await fileReader.fileType()
        const fileObject = new FileHandler(fileType, text)
        dataArray.push(fileObject.typeHandler)  
    }
    
    const result = dataArray.flat()
    new Printer(result)
    
} catch (error) {
    console.log(error)    
}





