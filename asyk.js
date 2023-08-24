const axios = require('axios');

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
        res["HS Code"] = "hscode"; // diisi based on data array pos tarif

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
const arr = ["90230000", "85353020"];
const urls = ["https://jsonplaceholder.typicode.com/posts/1", "https://jsonplaceholder.typicode.com/posts/2", "https://jsonplaceholder.typicode.com/posts/3"];

async function fetchData() {
    // const promises = urls.map((url) => axios.get(url));
    const janjiku = arr.map(hs => getData(hs));
    const results = await Promise.all(janjiku);

    console.log(results);
    return results;
}
fetchData();
