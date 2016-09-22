/**
 * Created by wspandihai on 9/21/16.
 */
var hbs=require('handlebars');
var debug = require("debug")("koa-handlebars");


function render(opt) {

}

render.prototype.middleware=function () {
    var self=this;
    return function *(next) {
        yield next;
    }
}

module.exports=render;