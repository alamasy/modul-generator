
function generateBarangTarif(arr) {
    const res = [];

    const len = arr.length;
    const jenisTarif = ["BM", "PPN", "PPH"];
    const codeFasilitas = ["2", "5", "5"];

    for (let i = 1; i <= len; i++) {

        for (let j = 0; j < jenisTarif.length; j++) {
            const temp = {};
            const tarif = arr[i][jenisTarif[j]];

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

const arrrr = ["1234", "1234", "1234", "1234"];

generateBarangTarif(arrrr);