/**
 * Created by wspandihai on 9/21/16.
 */
const hbs = require('handlebars');
const debug = require("debug")("koa-handlebars");
const path = require('path');
const fs = require('fs');

function render(opt) {
    //check this is render
    if (!(this instanceof render)) {
        return new render(opt);
    }
    debug('checked')
    var self = this;
    opt = opt || {};
    opt.root = opt.root || process.cwd();
    self.opt = opt;
    return self;
}

render.prototype.middleware = function () {
    var self = this;
    return function *(next) {

        this.render = renderView;

        yield next;
    }
}

render.prototype.renderView = function (viewPath, local) {

}

render.prototype.readFile = function *(filePath, encoding) {
    encoding = encoding || 'utf8';
    debug('file path %s', filePath)
    if (!path.isAbsolute(filePath) && filePath) {
        filePath = path.resolve(this.opt.root, filePath);
    }
    yield fs.readFile(filePath, {encoding: encoding});
}


module.exports = render;