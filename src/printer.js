export default class Printer {
    constructor (result) {
        this.result = result
        this.sort = this.sort()
        this.print = this.print()
    }

    sort () {
        this.result.sort((a, b) => {
            if (a.size === 'XL') return -10
            if (a.size > b.size) return 1
            if (a.size < b.size) return -1
            if (a.size === b.size) return 0
        })
    }

    print () {
        if (this.result.length > 0) {
            console.table(this.result)
        } else {
            throw new Error('No data to print')
        }      
    }
}
