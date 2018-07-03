const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();
const {downloadImg, getImgBuffer, getChapterLinks, getImgLinks, getSuggestions} = require('../utils/manga-utils');

/* GET users listing. */
router.get('/api/name/:mangaName', (req, res, next) => {
  const mangaName = req.params.mangaName;
  const mangaURL = 'https://www.manhuaren.com/' + mangaName
  getChapterLinks(mangaURL).then((r) => res.send(r));
  
});

router.get('/api/chapter/:chapterID', (req, res, next) => {
  const chapterID = req.params.chapterID;
  const chapterURL = 'https://www.manhuaren.com/' + chapterID
  const result = [];
  getImgLinks(chapterURL).then((r) => {

    res.send(r);
  });
});

router.get('/api/sugg/:query', (req, res, next) => {
  const query = encodeURI(req.params.query);
  console.log(query);
  const url = 'http://www.dm5.com/search.ashx?d=1530153061899&t=' + query + '&language=1'
  console.log(url);
  getSuggestions(url)
    .then((r) => res.send(r));
});

router.post('/api/getImg', (req, res, next) => {

  const u = req.body.imgURL;
  const r = req.body.r;
  console.log(u, r)


  getImgBuffer(u, r).then((response) => {
    const id = uuidv1()
    console.log(id);
    res.send({data:response.data.toString('base64'), id:id});
  })
})


module.exports = router;
