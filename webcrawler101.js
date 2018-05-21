var Crawler = require("node-webcrawler");
var url = require('url');
var scraperjs = require('scraperjs');
       
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, result, $) {
        // $ is Cheerio by default 
        //a lean implementation of core jQuery designed specifically for the server 
        if(error){
            console.log(error);
        }else{
            console.log($("title").text());
        }
    }
});
 
// Queue just one URL, with default callback 
c.queue('http://www.amazon.com');
 
// Queue a list of URLs 
c.queue(['http://www.google.com/','http://www.yahoo.com']);
 
// Queue URLs with custom callbacks & parameters 
c.queue([{
    uri: 'http://imdb.in',
    jQuery: false,
 
    // The global callback won't be called 
    callback: function (error, result) {
        if(result){
            text = result.body;
            console.log(text);
        }
        if(error){
            console.log(error);
        }else{
            console.log('Grabbed', result.body.length, 'bytes');
        }
    }
}]);
 