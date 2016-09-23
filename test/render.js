const render = require('../lib/render');
const assert = require('assert');
const co = require('co');


describe('render(opt)', function () {

    it('render is function', function () {
        assert.equal(typeof render, 'function')
    });


    it('render(null) is render object', function () {
        const renderObj = render(null);
        assert(renderObj instanceof render);
    })
});


describe('renderObject function', function () {

    before(function () {
        this.renderObj = render({});
    });

    it('#renderView()', function (done) {
        co(this.renderObj.renderView('./test/test.hbs',{title:'test',body:'koa-handlebars'})).then(function (html) {
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

})


