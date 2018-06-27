const request = require("request");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
const https = require('https');

const getHTML = async (url) => {
  const options = { method: 'GET',
    url: url,
    headers: 
      {
        'upgrade-insecure-requests': "1",
        'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
        'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        'referer': "https://www.manhuaren.com/manhua-wodeyingxiongxueyuan/",
        'accept-encoding': "gzip, deflate, br",
        'accept-language': "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,zh-CN;q=0.5",
        'cache-control': "no-cache",
      }
  }
  const instance = axios.create({
    httpsAgent: new https.Agent({rejectUnauthorized:false})
  })

  resp = await instance(options);
  return {data:cheerio.load(resp.data), url:url}
}

const downloadImg = (imgURL, referer, filename) => {
  const options = { method: 'GET',
    url: encodeURI(imgURL),
    headers: 
      {
        'referer': referer,
      },
      'responseType': 'stream'
  }
  axios(options).then((response) => {
    response.data.pipe(fs.createWriteStream(filename))
  })
}

const extractData = ({url, data}) => {
  const $ = data;
  let text = $('script')[8].children[0].data;
  const s = eval(text.slice(4));
  eval(s);
  console.log(newImgs.length)
  newImgs.forEach((imgURL, idx) => downloadImg(imgURL, url, idx + '.png'));
}

const getImgLinks = async (chapterURL) => {
  let result;
  await getHTML(chapterURL).then(({url, data}) => {
    const $ = data;
    let text = $('script')[8].children[0].data;
    const s = eval(text.slice(4));
    eval(s);
    result = newImgs;
  })
  return result
}

const getChapterLinks = async (mangaURL) => {
  let results = [];
  await getHTML(mangaURL)
  .then(({data, url}) => {
    const $ = data;
    const aTags = $('#detail-list-select-1 a');

    for (let k in aTags) {
      let aTag = aTags[k];
      let attribs = aTag.attribs;
      if (attribs !== undefined && Object.keys(attribs).length !== 0) {
        attribs.vol = aTag.children[0].data;
        results.push(attribs);
      }
    }
  })
  return results
}

const getText = (tags, flag) => {
  let results = [];
  let ends = [];
  for (let i = 0; i < tags.length ; i++) {
    let data = tags[i].children[0].data;
    results.push(data === undefined ? '' : data);
    if (flag) {
      let length = tags[i].children.length;
      let data2 = tags[i].children[length-1].data
      ends.push(data2 === undefined ? '' : data2);
    }
  }
  return [results, ends];
}

const allEqual = arr => arr.every( v => v === arr[0] )


const getSuggestions = async (url) => {
  // var nowEpoch = Date.now();
  let results = [];
  await getHTML(url)
    .then(({data, url}) => {
      const $ = data;
      const liTags = $('li');

      let links = []
      for (let k in liTags) {
        let liTag = liTags[k];
        let attribs = liTag.attribs;
        if (attribs !== undefined && Object.keys(attribs).length !== 0) {
          links.push(attribs.onclick);
        }        
      }
      const leftTags = $('li > a > span[class="left"]');
      const rightTags = $('li > a > span[class="right"]');
      const redTags = $('li > a > span > span[class="red"]');
      
      const reds = redTags.contents().map(function() {
        if (this.type == 'text')
          return $(this).text();
      }).get();
      const [lefts, ends] = getText(leftTags, true)
      const [rights, ] = getText(rightTags, false)

      for (let i = 0; i < lefts.length; i++) {

        results.push({
          title:lefts[i] + reds[i] + ends[i],
          chapter: rights[i],
          link: links[i]
        });
      }

    })
  return results;
} 


module.exports = {getChapterLinks, getImgLinks, getSuggestions};