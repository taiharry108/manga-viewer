const express = require('express');
const router = express.Router();
const {getChapterLinks, getImgLinks, getSuggestions} = require('../utils/manga-utils');

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

module.exports = router;
