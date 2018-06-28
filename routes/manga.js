const express = require('express');
const router = express.Router();
const {downloadImg, getImgBuffer, getChapterLinks, getImgLinks, getSuggestions} = require('../utils/manga-utils');

/* GET users listing. */
router.get('/:mangaName', (req, res, next) => {
  const mangaName = req.params.mangaName;
  const mangaURL = 'https://www.manhuaren.com/' + mangaName
  getChapterLinks(mangaURL).then((r) => res.send(r));
  
});

router.get('/ch/:chapterID', (req, res, next) => {
  const chapterID = req.params.chapterID;
  const chapterURL = 'https://www.manhuaren.com/' + chapterID  
  getImgLinks(chapterURL).then((r) => res.send(r));
  
});

router.get('/sugg/:query', (req, res, next) => {
  const query = encodeURI(req.params.query);
  const url = 'http://www.dm5.com/search.ashx?d=1530153061899&t=' + query + '&language=1'
  console.log(url);
  getSuggestions(url)
    .then((r) => res.send(r));
});

router.get('/img/abc', (req, res, next) => {
  const u = 'https://manhua1032-43-249-37-70.cdndm5.com/11/10684/626522/1_5593.png?cid=626522&key=85570a48c0f0e746b8baff2ae39575e6&type=1';
  const r = 'https://www.manhuaren.com/m626522'

  getImgBuffer(u, r).then((response) => {
    const img = new Buffer(response.data, 'binary')

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    })
    res.end(img);
  })
})

module.exports = router;
