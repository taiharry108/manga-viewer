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

router.get('/sugg/1', (req, res, next) => {
  // 

  // getSuggestions('http://www.dm5.com/search.ashx?d=1530104913527&t=%E7%81%AB&language=1')
  getSuggestions('http://www.dm5.com/search.ashx?d=1530115604528&t=%E6%88%91&language=1')
    .then((r) => res.send(r));
});

module.exports = router;
