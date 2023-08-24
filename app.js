const axios = require("axios");
const xl = require('xlsx');

console.log("before open excel file");
// ==========    BUKA FILE EXCEL DAN AMBIL DATA HS CODE   ==========
const wb = xl.readFile('BUP SPPB AJU 010005 A.01 IBT 2023.xls');
const ws = wb.Sheets["Barang"];
const daftarHSBarang = xl.utils.sheet_to_json(ws);

const listHSCode = [];
console.log(listHSCode.length);

daftarHSBarang.forEach(barang => {
    const hsCode = barang["POS TARIF"];

    listHSCode.push(hsCode);
});


console.log(listHSCode.length);

// ==========    PERIKSA LARTAS UNTUK TIAP HS CODE    ==========
const result = [];
listHSCode.forEach(barang => {
    console.log(barang);
});

const url = `https://api.insw.go.id/api-prod-ba/ref/hscode/komoditas?hs_code=70109099`;
axios.get(url, {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Basic aW5zd18yOmJhYzJiYXM2",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Microsoft Edge\";v=\"115\", \"Chromium\";v=\"115\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://insw.go.id/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
}).then(response => {
    console.log("setelah fetvhing data");
    const html = response.data;
    const data = html.data[0];
    let res = {};

    res["lartas_import"] = data.import_regulation.length ? "ada" : "tidak ada";
    res["lartas_border"] = data.import_regulation_border.length ? "ada" : "tidak ada";
    res["lartas_post_border"] = data.import_regulation_post_border.length ? "ada" : "tidak ada";
    res["lartas_export"] = data.export_regulation.length ? "ada" : "tidak ada";

    result.push(res);

}).then(() => {
    console.table(result);

}).catch((err) => {
    console.log("hs code tidak ada anu");
});