const hbs = require('handlebars');
const debug = require("debug")("koa-kiki-handlebars");
const path = require('path');
const fs = require('fs');



function readFile(fileName,options) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName,options, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

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
    return async function (ctx, next) {

        ctx.render = async function (viewPath, local) {
            this.type = 'html';
            this.body = await self.renderView(viewPath, local);
        };

        await next();
    }
}

render.prototype.renderView = async function (viewPath, local) {
    let self = this;
    let source = await self.getFile(viewPath);
    let template = hbs.compile(source);
    let result = template(local);
    return result;
}

render.prototype.getFile = async function (filePath, encoding) {
    encoding = encoding || 'utf8';
    debug('file path %s', filePath)
    if (!path.isAbsolute(filePath) && filePath) {
        filePath = path.resolve(this.opt.root, filePath);
    }
    let result = await readFile(filePath, {encoding: encoding});
    return result;
}



render.prototype.registerHelper = function (helpName, fn) {
    if (!helpName || !fn) {
        throw new Error('handlebars registerHelper need helpName and fn')
    }
    hbs.registerHelper(helpName, fn);
    return true;
}

module.exports = render;