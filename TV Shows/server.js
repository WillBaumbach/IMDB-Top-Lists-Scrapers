var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    //All web scraping magic will go here.
    //url we will scrape from.
    url = 'http://www.imdb.com/chart/toptv';
    request(url, function(error, response, html){
        //First check for errors.
        if(!error){
            var $ = cheerio.load(html);
            var title, release, rating, ranking, n;
            var json = {"Movie":[]}
            n=1

            $('.titleColumn').each(function(){
                var data = $(this);
                title = data.children('a').text();
                rating = data.next().children().text();
                json['Movie'].push({"ranking":n, "title":title, "rating":rating});
                n++;
            })

        }

        fs.writeFile('top250TV.json', JSON.stringify(json, null, 4), function(err){
             console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')

    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
