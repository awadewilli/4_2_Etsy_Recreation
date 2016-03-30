console.log("Hello World!");

var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=pokemon&includes=Images,Shop";
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

fetchJSONP(url,logData);

function logData (data){
  console.log(data);


    var source   = $("#products").html();
    var template = handlebars.compile(source);
    console.log(data.results);

    data.results.map(function(item){
      var title = item.title;
      console.log(item);
      var context = {'prodName': item.title, 'owner':item.Shop.shop_name, 'price':item.price, 'productUrl':item.Images[0].url_170x135,'currency':item.currency_code};
      var html    = template(context);
      $('.search-item-wrapper').append(html);

    });
}
