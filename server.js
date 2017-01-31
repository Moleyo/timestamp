var express = require('express')
var app = express()
var dateFormat = require('dateformat');

app.get('*', function (req, res) {
  var timestamp = {"unix": null, "natural": null};
  var reqDate = null;
  var isString = false;
  var url = req.url.substr(1);
  
  if(url){
    if(isNaN(url)){
      url = url.replace(/%20/g, " ");
      isString = true;
    }
    else{
      url = +url;
    }
    reqDate = new Date(url);
    if(reqDate != "Invalid Date"){
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      if(isString){
        timestamp.unix = reqDate.getTime() / 1000;
        timestamp.natural = dateFormat(reqDate, "mmmm d, yyyy");
      }
      else{
        timestamp.unix = reqDate.getTime();
        timestamp.natural = dateFormat(reqDate * 1000, "mmmm d, yyyy");
      }
    };
  }
  res.end(JSON.stringify(timestamp));
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})