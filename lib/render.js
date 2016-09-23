/**
 * Created by wspandihai on 9/21/16.
 */
const hbs = require('handlebars');
const debug = require("debug")("koa-handlebars");
const path = require('path');
const fs = require('fs');
const thunkify = require('thunkify');
const readFile = thunkify(fs.readFile);

function render(opt) {
    //check this is render
    if (!(this instanceof render)) {
        return new render(opt);
    }
    debug('checked')
    const self = this;
    opt = opt || {};
    opt.root = opt.root || process.cwd();
    self.opt = opt;
    return self;
}

render.prototype.middleware = function () {
    const self = this;
    return function *(next) {

        this.render = function *(viewPath, local) {
            this.type = 'html';
            this.body = yield self.renderView(viewPath, local);
        };

        yield next;
    }
}

render.prototype.renderView = function *(viewPath, local) {
    const self = this;
    const source = yield self.getFile(viewPath);
    const template = hbs.compile(source);
    const result = template(local);
    return result;
}


render.prototype.getFile = function *(filePath, encoding) {
    encoding = encoding || 'utf8';
    debug('file path %s', filePath)
    if (!path.isAbsolute(filePath) && filePath) {
        filePath = path.resolve(this.opt.root, filePath);
    }
    const result = yield readFile(filePath, {encoding: encoding});
    return result;
}


module.exports = render;