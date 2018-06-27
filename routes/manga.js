const express = require('express');
const router = express.Router();
const {getChapterLinks, getImgLinks} = require('../mangaUtils');

/* GET users listing. */
router.get('/:mangaName', function(req, res, next) {
  const mangaName = req.params.mangaName;
  const mangaURL = 'https://www.manhuaren.com/' + mangaName
  getChapterLinks(mangaURL).then((r) => res.send(r));
  
});

router.get('/ch/:chapterID', function(req, res, next) {
  const chapterID = req.params.chapterID;
  const chapterURL = 'https://www.manhuaren.com/' + chapterID  
  getImgLinks(chapterURL).then((r) => res.send(r));
  
});

module.exports = router;
