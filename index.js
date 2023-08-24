// const xl = require('xlsx');
const { getDataColumInSheet, fetchAllData } = require('./utils');


async function main() {

    // ========    GENERATE SHEET TARIF BARANG    ========

    // Ambil data hs code dari bup
    const hsCodes = getDataColumInSheet("Barang", "POS TARIF");

    // periksa melalui insw
    const daftarTarif = await fetchAllData(hsCodes);



    console.log(daftarTarif);

}

main();