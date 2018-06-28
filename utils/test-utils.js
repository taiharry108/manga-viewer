const http = require("https");
const fs = require("fs");

const u = 'https://manhua1032-43-249-37-70.cdndm5.com/11/10684/626522/1_5593.png?cid=626522&key=85570a48c0f0e746b8baff2ae39575e6&type=1';
const r = 'https://www.manhuaren.com/m626522'
const downloadImg = (imgURL, referer) => {
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

downloadImg(u, r)