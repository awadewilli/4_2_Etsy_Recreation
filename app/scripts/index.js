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

function logData (data){
  console.log(data);
}

var result = fetchJSONP(url,logData).then();

  function addToTemp (data){
    var source   = $("#products").html();
    var template = handlebars.compile(source);

    _.each(result.results,function(){
    var context = {prodName: result.results.title, owner:result.results.title, price:result.results.price, productUrl:result.results.image_url_760x100};
    var html    = template(context);
    console.log(context);
  $('#products').html(html);
});
}
