const https = require('https');
const fs = require('fs');
const http = require('http');
const sslkey = fs.readFileSync('../ssl-key.pem');
const sslcert = fs.readFileSync('../ssl-cert.pem');

http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
      res.end();
}).listen(3000);



const options = {
  key: sslkey,
  cert: sslcert
};

module.exports = (app, httpsPort, httpPort) => {
    https.createServer(options, app).listen(httpsPort);
    http.createServer((req,res)=>{
        res.writeHead(301,{'Location':`https://localhost:${httpsPort}${req.url}`});
        res.end();
    }).listen(httpPort);
};
