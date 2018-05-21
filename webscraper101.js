var scraperjs = require('scraperjs');
scraperjs.StaticScraper.create('http://www.imdb.com/')
    .scrape(function($) {
        return $(".title a").map(function() {
            return $(this).text();
        }).get();
    })
    .then(function(news) {
        console.log(news);
    })
    