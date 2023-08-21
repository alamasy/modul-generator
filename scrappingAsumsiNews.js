const axios = require("axios")
const cheerio = require('cheerio')

const url = "https://asumsi.co/post/category/politik/"
const articles = []

axios.get(url)
.then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    let res = {}

   const article = $(".post-card-title")
   
   article.each(function() {
    const link = this.attribs.href
    let judulArr = link.split('/')
    let judul = judulArr[5]

    res = {judul, link}
    articles.push(res)
   })
   
   
}).then(() => {
    articles.forEach(({judul, link}) => {
        // const judul = link.split("/")
        console.log(judul.split("-").join(' '));
        console.log(link);
        console.log("\n");
    });
   })