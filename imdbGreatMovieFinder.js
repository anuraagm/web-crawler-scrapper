var Crawler = require("node-webcrawler");
var url = require('url');
var scraperjs = require('scraperjs');
       
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback: function (error, result) {
        if(result){
            text = result.body;
            scraperjs.StaticScraper.create(this.uri)
            .scrape(function($) {
                return $(".title a").map(function() {
                    return $(this).text();
                }).get();
            })
            .then(function(titles) {
                console.log(titles);
            })
        }
        if(error){
            console.log(error);
        }else{
            console.log('Grabbed', result.body.length, 'bytes');
        }
    }
});
// Queue URLs 
c.queue(['http://www.imdb.com/']); 