const xl = require('xlsx');
const { getDataColumInSheet, fetchAllData, generateBarangTarif } = require('./utils');


async function main() {
    const res = [];
    // ========    GENERATE SHEET TARIF BARANG    ========

    // Ambil data hs code dari bup
    const hsCodes = getDataColumInSheet("Barang", "POS TARIF");

    // periksa melalui insw
    const daftarTarif = await fetchAllData(hsCodes);
    const daftarTarif2 = generateBarangTarif(daftarTarif);

    // Ubah ke file excel hasil dari kumpulan tarif yang telah di 
    const worksheet = xl.utils.json_to_sheet(daftarTarif);
    const workbook = xl.utils.book_new();
    xl.utils.book_append_sheet(workbook, worksheet, "Tarif");
    xl.utils.sheet_add_aoa(worksheet, [["HS Code", "BM", "PPN", "PPH", "lartas_import", "lartas_border", "lartas_post_border", "lartas_export"]], { origin: "A1" });


    xl.writeFile(workbook, "Tarif.xlsx");

    // Tarif barang
    const worksheet2 = xl.utils.json_to_sheet(daftarTarif2);
    const workbook2 = xl.utils.book_new();
    xl.utils.book_append_sheet(workbook2, worksheet2, "Tarif");
    xl.utils.sheet_add_aoa(worksheet2, [["NO AJU", "SERI BARANG", "JENIS TARIF", "KODE FASILITAS", "TARIF"]], { origin: "A1" });


    xl.writeFile(workbook2, "tarifBarang.xlsx");
}

main();