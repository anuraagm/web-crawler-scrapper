var Crawler = require("node-webcrawler");
var url = require('url');
var scraperjs = require('scraperjs');
       
var c = new Crawler({
    maxConnections : 10,
});
    
c.queue([{
    uri: "http://www.imdb.com/chart/boxoffice", 
    callback: function (error, result) {
        if(result){
            text = result.body;
            //console.log(text);
            scraperjs.StaticScraper.create(this.uri)
            .scrape(function($) {
                return $('td.titleColumn').map(function() {
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
}]);

c.queue([{
    uri: "https://www.rottentomatoes.com/",    
    callback: function (error, result) {
        if(result){
            text = result.body;
            //console.log(text);
            scraperjs.StaticScraper.create(this.uri)
            .scrape(function($) {
                return $('div#homepage-top-box-office.listings a').map(function() {
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
}]); 
