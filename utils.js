const xl = require('xlsx');
const axios = require('axios');


/**
 * string, string -> []
 * Function yang mengambil data kolom tertentu pada sebuah sheet
 * @param {sheet, kolom} sheet : object -> nama sheet 
 * @param {kolom} kolom : string -> nama kolom yang ingin diambil datanya
 * @returns 
 * [obj, obj] Sebuah hsCodes dengan isi object
 */
function getDataColumInSheet(sheet, kolom) {
    const result = [];

    const wb = xl.readFile('bup.xlsx');
    const ws = wb.Sheets[sheet];

    const dataSheet = xl.utils.sheet_to_json(ws);

    dataSheet.forEach(obj => {
        temp = obj[kolom];
        result.push(temp);
    });

    return result;


}

/**
 * Fungsi yang memanggil ajax dan mengembalikan nilai berupa object
 * @param {hsCode} hsCode : array -> object
 * @returns Object dari tarif hs code
 */
async function getData(hsCode) {
    try {
        const response = await axios.get(`https://api.insw.go.id/api-prod-ba/ref/hscode/komoditas?hs_code=${hsCode}`, {
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                authorization: "Basic aW5zd18yOmJhYzJiYXM2",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Microsoft Edge\";v=\"115\", \"Chromium\";v=\"115\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                Referer: "https://insw.go.id/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: null,
            method: "GET",
        });

        const html = response.data;
        const data = html.data[0];

        let res = {};
        res["HS Code"] = hsCode; // diisi based on data array pos tarif

        // TARIF
        res["BM"] = data["new_mfn"][0]["bm"][0]["bm"];
        res["PPN"] = data["new_mfn"][0]["ppn"][0]["ppn"];
        res["PPH"] = data["new_mfn"][0]["pph"][0]["pph"];

        // LARTAS
        res["lartas_import"] = data.import_regulation.length ? "1" : "0";
        res["lartas_border"] = data.import_regulation_border.length ? "1" : "0";
        res["lartas_post_border"] = data.import_regulation_post_border.length ? "1" : "0";
        res["lartas_export"] = data.export_regulation.length ? "1" : "0";

        return res;
    } catch (error) {
        console.error("wkwk", error);
    }
}

/**
 * 
 * @param {*} listHSCode : array -> array of object
 * @returns array of object tarif
 */
async function fetchAllData(arr) {
    const janjiku = arr.map(hs => getData(hs));
    const results = await Promise.all(janjiku);

    console.table(results);
    return results;
}

function generateBarangTarif(arr) {
    const res = [];

    const len = arr.length;
    const jenisTarif = ["BM", "PPN", "PPH"];
    const codeFasilitas = ["2", "5", "5"];

    for (let i = 1; i <= len; i++) {

        for (let j = 0; j < jenisTarif.length; j++) {
            const temp = {};
            const tarif = arr[i - 1][jenisTarif[j]];

            temp["NO AJU"] = "123456";
            temp["SERI BARANG"] = i;
            temp["JENIS TARIF"] = jenisTarif[j];
            temp["KODE FASILITAS"] = codeFasilitas[j];
            temp["TARIF"] = tarif;

            res.push(temp);
        }

    }

    return res;

}




module.exports = { fetchAllData, getDataColumInSheet, generateBarangTarif };
