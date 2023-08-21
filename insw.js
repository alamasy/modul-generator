const xl = require('xlsx')


const wb = xl.readFile('BUP.xls')
const ws = wb.Sheets["Barang"]
const daftarHSBarang = xl.utils.sheet_to_json(ws)

const listHSCode = []

daftarHSBarang.forEach(barang => {
    hsCode = barang["POS TARIF"]

    listHSCode.push(hsCode)
})

console.log(listHSCode.length)
console.log(listHSCode)