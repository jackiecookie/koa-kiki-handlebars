const render = require('../lib/render');
const assert = require('assert');
const co = require('co');

describe('render(opt)', function () {

    it('render is function', function () {
        assert.equal(typeof render, 'function')
    });


    it('render(null) is render object', function () {
        let renderObj = render(null);
        assert(renderObj instanceof render);
    })
});

describe('renderObject function', function () {

    before(function () {
        this.renderObj = render({});
    });

    it('#renderView()', function (done) {
        co(this.renderObj.renderView('./test/test.hbs', {title: 'test', body: 'koa-kiki-handlebars'})).then(function (html) {
            if (!!html)done();
            else done('renderView read empty')
        });
    })

    it('#readFile()', function (done) {
        co(this.renderObj.getFile('./test/test.hbs')).then(function (html) {
            if (!!html)done();
            else done('file read empty')
        });

    });

    it('#registerHelper()', function () {
        assert.throws(this.renderObj.registerHelper, Error);
    });

    it('#registerHelper(name,fn)', function () {
        assert.ok(this.renderObj.registerHelper('help',function () {

        }));
    });

})


