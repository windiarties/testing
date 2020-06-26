const pg = require('pg')
const DatabaseConnection = require('../Config/dbp.config.json')
var DB = new pg.Pool(DatabaseConnection.config);
const request = require('request');
const moment = require('moment')
const cheerio = require('cheerio');
var datetime = require('node-datetime');
var tinyreq = require('tinyreq');

var {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');

const dt = {

    coverData: (callback, docs, data) => {
        // example()

        example()

        async function example() {
            var timeout = 60000
            var artist = docs.artist_name.replace(" ", '+')
            var song = docs.song_name.replace(" ", "+")
            var url = 'https://www.youtube.com/results?search_query=' + artist + '+' + song + '+cover&sp=CAM%253D'
            // console.log(artist)
            var driver = new webdriver.Builder().forBrowser('chrome').build();

            await driver.get(url)

            // await driver.setTimeout({ 'pageLoad': 60000 })
            await driver.executeAsyncScript(scrollBottom)
                .then(n => console.log(`scrolled ${n} time(s)`));

            await driver.executeAsyncScript(scrollBottom)
                .then(n => console.log(`scrolled ${n} time(s)`));

            await driver.executeAsyncScript(scrollBottom)
                .then(n => console.log(`scrolled ${n} time(s)`));

            // await driver.manage().timeouts().implicitlyWait(60000)

            let elements = await driver.findElements(By.xpath("/html/body/ytd-app/div/ytd-page-manager/ytd-search/div[1]/ytd-two-column-search-results-renderer/div/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-video-renderer/div/div/div/div/h3/a"))
            // console.log('test', elements)

            var chart = []
            await Promise.all(
                elements.map(async (item, i) => {
                    await item.getAttribute('aria-label').then(function (text) {
                        var judul = text.indexOf(')') !== -1 ? text.slice(0, text.indexOf(')') + 1).replace("'", " ").replace(',', '').trim() : text.indexOf('by') !== -1 ? text.slice(0, text.indexOf('by') - 1).replace(',', '').replace("'", " ").trim() : text.indexOf(']') !== -1 ? text.slice(0, text.indexOf(']') + 1).replace("'", " ").replace(',', '').trim() : '-';
                        var view = text.indexOf('second') !== -1 ? text.slice(text.indexOf('second') + 7, text.length - 5).trim() : text.indexOf('minutes') !== -1 ? text.slice(text.indexOf('minutes') + 7, text.length - 5).trim() : text.indexOf('minute') !== -1 ? text.slice(text.indexOf('minute') + 7, text.length - 5).trim() : '-'
                        var canel = text.indexOf('by') !== -1 ? text.slice(text.indexOf('by') + 2, text.indexOf('ago') - 9).replace("'", " ").replace(',', '').trim() : text.indexOf(')') !== -1 ? text.slice(text.indexOf(')') + 2, text.indexOf('ago') - 9).replace("'", " ").replace(',', '').trim() : text.indexOf(']') !== -1 ? text.slice(text.indexOf(']') + 3, text.indexOf('ago') - 9).replace("'", " ").replace(',', '').trim() : '-';
                        var viewer = view.replace(/,/g, '')
                        var chanel = text.indexOf(-1) !== -1 ? canel.replace('month', '') : canel.replace('year', '')

                        var title = {
                            id: 0,
                            title: judul,
                            views: viewer,
                            chanel: chanel
                        }

                        chart.push(title)

                    });
                })
            )

            // chart.filter((value) =>
            //     value.title.toLowerCase().includes(song) && value.title.toLowerCase().includes('cover') && value.views > 1000
            // )
            // console.log('chart', chart)
            callback(chart)

            await driver.wait(function () {
                return driver.isElementPresent(webdriver.By.xpath("/html/body/ytd-app/div/ytd-page-manager/ytd-search/div[1]/ytd-two-column-search-results-renderer/div/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-video-renderer/div/div/div/div/h3/a"));
            }, 10000).catch(function (e) {
                console.log('Catching Error');
            });

        }

        function scrollBottom() {
            var count = arguments[arguments.length - 2] || 0x7fffffff;
            var callback = arguments[arguments.length - 1];

            /* get the scrollable container */
            var elm = document.elementFromPoint(window.innerWidth - 25, window.innerHeight / 2);
            for (; elm && (++elm.scrollTop, !elm.scrollTop); elm = elm.parentElement);
            elm = elm || document.documentElement;

            /* hook XMLHttpRequest to monitor Ajax requests */
            if (!('idle' in XMLHttpRequest))(function () {
                var n = 0,
                    t = Date.now(),
                    send = XMLHttpRequest.prototype.send;
                var dispose = function () {
                    --n;
                    t = Date.now();
                };
                var loadend = function () {
                    setTimeout(dispose, 1)
                };
                XMLHttpRequest.idle = function () {
                    return n > 0 ? 0 : Date.now() - t;
                };
                XMLHttpRequest.prototype.send = function () {
                    ++n;
                    this.addEventListener('loadend', loadend);
                    send.apply(this, arguments);
                };
            })();

            /* scroll until steady scrollHeight or count of scroll and no pending request */
            var i = 0,
                scrollHeight = -1,
                scrollTop = -1;
            (function scroll() {
                if ((scrollHeight === elm.scrollHeight || i === count) && XMLHttpRequest.idle() > 60)
                    return callback(i);
                scrollTop = elm.scrollTop;
                scrollHeight = elm.scrollHeight;
                if (i < count)
                    i += (elm.scrollTop = 0x7fffffff, scrollTop !== elm.scrollTop);
                setTimeout(scroll, 100);
            })();
        }
    },
    readcoverData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT * FROM cover', function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                // console.log("ini data :" + JSON.stringify(data))

            })

        })

    },
    readartistData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT MAX(id) as id FROM artist', function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                // console.log("ini data :" + JSON.stringify(data))

            })

        })

    },
    readofficialData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT * FROM official_song WHERE cover_views = 8043927', function (err, result) {
                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                // console.log("ini data offc:" + JSON.stringify(data))

            })

        })

    },
    cherioData: (callback, docs) => { //res=lempar data ke client      

        let url = "https://www.youtube.com/results?search_query=" + docs['artis'] + "+" + docs['lagu'] + "+cover&sp=CAM%253D";
        console.log(url)
        request(url, function (err, res, body) {
            if (err && res.statusCode !== 200) throw err;
            let $ = cheerio.load(body)
            var chart = []
            var data = $('#results li .item-section li .yt-lockup')

            // console.log($('head').html())
            console.log(data.length)

            data.map((index, item) => {
                // console.log(item)
                var itemUrl = $(item).attr('data-context-item-id');
                var url = 'https://www.youtube.com/watch?v=' + itemUrl;
                var item = tinyreq(url,
                    function (err, body2) {
                        var $2 = cheerio.load(body2);
                        var title = $2('#eow-title').text();
                        var views = $2('.watch-view-count').text().replace('views', '').replace(/,/g, '').trim();
                        var titleArtist = title.slice(0, title.indexOf('-')).trim();
                        var song = title.slice(title.indexOf('-') + 1, title.length).trim();

                        var version = song.indexOf('(') !== -1 ? song.slice(song.indexOf('('), song.length) : song.indexOf('|') !== -1 ? song.slice(song.indexOf('|'), song.length) : song.indexOf('-') !== -1 ? song.slice(song.indexOf('-'), song.length) : song.indexOf('[') !== -1 ? song.slice(song.indexOf('['), song.length) : '-'

                        var titleSong = song.replace(version, '').trim();

                        var position = index + 1;


                        var vers = version.split('')
                        // console.log(vers)

                        // var published = getPublished($2('#watch-uploader-info').text());

                        var item = {
                            position: position,
                            title: song
                            // 
                        }
                        chart.push(item);
                        // console.log(chart)
                        if (chart.length === data.length) {
                            chart.sort((a, b) => {
                                if (a.position < b.position) {
                                    return -1;
                                } else if (a.position > b.position) {
                                    return 1
                                }

                                return 0
                            });
                            // return res.status(200).json({
                            //     success: true,
                            //     source: url,
                            //     last_updated: last_updated,
                            //     data: chart
                            // });
                        }
                    }
                );
            })

        });
    },
    tambahData: (callback, docs) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            // console.log(docs)
            console.log(docs.length)
            var data = ''
            var chart = []
            var dt = datetime.create();
            var currentdate = dt.format('Y-m-d');
            var id = 1
            // console.log(docs.length)
            if (err) {
                data = err;
            }

            
            // chart = docs.filter((value) => 
            // value.title.toLowerCase().includes(docs.nama) && value.title.toLowerCase().includes('cover') && value.views > 1000
            // )
            
            // console.log(chart)
            let query = "INSERT INTO public.data_cover(create_at, artist_id, title, channel, views) VALUES "

            docs.map((item, i) => {
                // let name = item.filter
                //let password = `$2a$10$lSKij2nfqKrlg8lPwNP5EOEx0FNzGH6zMcbSHxlP.zYmhGQEZKS1S`
                if (i === docs.length - 1) {
                    query += `('${currentdate}', ${item.id}, '${item.title}' , '${item.chanel}', ${item.views});`
                } else {
                    query += `('${currentdate}', ${item.id}, '${item.title}' , '${item.chanel}', ${item.views}),`
                }
            })

            console.log(query)
            // [currentdate, id, element.title, element.channel, element.views]  
            client.query(query, function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }

                // console.log("banyak "+JSON.stringify(data))
                callback(data)
            })

        })


    },
    tambahcover: (callback, docs) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            console.log(docs)
            var data = ''
            var dt = datetime.create();
            var currentdate = dt.format('Y-m-d');

            console.log(docs.length)
            if (err) {
                data = err;
            }
            // for (let i = 0; i < docs.length; i++ ){

            // }

            const query = {
                text: "INSERT INTO public.cover(create_at, artist_name, song_name, title, channel, views, total_views) VALUES ($1, $2, $3, $4, $5, $6, $7);",
                values: [currentdate, docs.artist_name, docs.song_name, docs.title, docs.channel, docs.views, docs.total_views],
            }
            client.query(query, function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }

                // console.log("banyak "+JSON.stringify(data))
                callback(data)
            })

        })

    },
    tambahartis: (callback, docs) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            console.log(docs)
            var data = ''
            var dt = datetime.create();
            var currentdate = dt.format('Y-m-d');

            console.log(currentdate)
            if (err) {
                data = err;
            }

            const query = {
                text: "INSERT INTO public.artistid(artist_name, song_name, total_views, total_cover) VALUES ($1, $2, $3, $4);",
                values: [docs.artist_name, docs.song_name, docs.total_views, docs.total_cover],
            }
            client.query(query, function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }

                // console.log("banyak "+JSON.stringify(data))
                callback(data)
            })

        })

    }
}

module.exports = dt