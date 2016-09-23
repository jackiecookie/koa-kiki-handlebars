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
    let self = this;
    opt = opt || {};
    opt.root = opt.root || process.cwd();
    self.opt = opt;
    return self;
}

render.prototype.middleware = function () {
    let self = this;
    return function *(next) {

        this.render = function *(viewPath, local) {
            this.type = 'html';
            this.body = yield self.renderView(viewPath, local);
        };

        yield next;
    }
}

render.prototype.renderView = function *(viewPath, local) {
    let self = this;
    let source = yield self.getFile(viewPath);
    let template = hbs.compile(source);
    let result = template(local);
    return result;
}

render.prototype.getFile = function *(filePath, encoding) {
    encoding = encoding || 'utf8';
    debug('file path %s', filePath)
    if (!path.isAbsolute(filePath) && filePath) {
        filePath = path.resolve(this.opt.root, filePath);
    }
    let result = yield readFile(filePath, {encoding: encoding});
    return result;
}

render.prototype.registerHelper=function (helpName,fn) {
    if(!helpName||!fn){
        throw new Error('handlebars registerHelper need helpName and fn')
    }
    hbs.registerHelper(helpName,fn);
    return true;
}

module.exports = render;