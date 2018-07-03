const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const http = require('https');

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
    httpsAgent: new http.Agent({rejectUnauthorized:false})
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

const getImgBuffer = async (imgURL, referer) => {
  const options = { method: 'GET',
    url: encodeURI(imgURL),
    headers: 
      {
        'referer': referer,
      },
      'responseType': 'arraybuffer'
  }
  let result;
  return await axios(options)
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
    const scripts = $('script');
    const script = scripts.map((i, x) => x.children[0]).filter((i, x) => x && x.data.startsWith('eval')).get(0);
    const text = script.data
    console.log(text)
    const s = eval(text.slice(4));
    eval(s);
    result = newImgs;
  })
  return result
}

const getChapterLinks = async (mangaURL) => {
  let results = {};
  await getHTML(mangaURL)
  .then(({data, url}) => {
    const $ = data;
    const types = [];
    const typesTag = $('.detail-selector.item-4 a');
    typesTag.each((i, ele) => {
        if (i < typesTag.length - 1) {
          let type = $(ele).text();
          types.push(type);
          results[type] = [];
        }
    })

    const listTag = $('.detail-list-1')
    listTag.each((i, ele) => {
      let type = types[i];
      let linkTags = $(ele).find('a');
      $(linkTags).each((i, aEle) => {
        let chapter = $(aEle).text();
        results[type].push({...$(aEle).attr(), vol: chapter});
      })
    })
  })
  return results
}

const getSuggestions = async (url) => {
  // var nowEpoch = Date.now();
  let results = [];
  await getHTML(url)
    .then(({data, url}) => {
      const $ = data;
      const liTags = $('li');

      const links = []
      liTags.each((i, ele) => {
        links.push($(ele).attr().onclick.replace(/(.*)\/(man.*)(\/.*)/, '$2'))
      })

      const leftTags = $('li > a > span[class="left"]');
      const lefts = [];
      const rights = [];
      leftTags.each((i, ele) => {
        lefts.push($(ele).text())
      })


      leftTags.next().each((i, ele) => {
        rights.push($(ele).text())
      })

      for (let k = 0; k < lefts.length; k++) {
        results.push({
          title: lefts[k],
          chapter: rights[k],
          link: links[k]
        })
      }

    })
  return results;
}
module.exports = {getChapterLinks, getImgLinks, getSuggestions, getImgBuffer, downloadImg};