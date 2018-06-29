const http = require("https");
const fs = require("fs");
const axios = require('axios');

const u = 'https://manhua1018-43-249-37-68.cdndm5.com/t/甜吻蜜痕/甜吻蜜痕_特别篇3/54847776201006120739411424367430188_000.jpg?cid=75034&key=a1c546193a1996bb0cd569da754c20ed&type=1';
const r = 'https://www.manhuaren.com/m75034/'
const downloadImg = (imgURL, referer) => {
  imgURL = encodeURI(imgURL);
  const imgURL2 = imgURL.replace('https://','')
  const idx = imgURL2.indexOf('/');
  const host = imgURL2.slice(0, idx);
  const path = imgURL2.slice(idx)
  const options = {
    "method": "GET",
    "hostname": host,
    "port": null,
    "path": path,
    "headers": {
      "referer": referer,
    }
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      fs.writeFile("test.png", body, 'binary')
    });
  });

  req.end();
}

const downloadImg2 = (imgURL, referer) => {
  imgURL = encodeURI(imgURL);
  const options = { method: 'GET',
    url: imgURL,
    headers: 
      {
        'referer': referer,
      },
      'responseType': 'stream'
  }
  axios(options).then((response) => {
    response.data.pipe(fs.createWriteStream('test2.png'))
  })
}

downloadImg2(u, r)