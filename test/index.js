const khbs = require('../index');
const assert = require('assert');
const request = require('supertest');
const koa = require('koa');
const router = require('koa-router')();

describe('koa-kiki-handlebars', function () {
    before(function () {
        let app = new koa();
        app
            .use(khbs())
            .use(router.routes())
            .use(router.allowedMethods());


        router.get('/', function *(next) {
            yield this.render('./test/test.hbs');
        });
        this.app = app;
    });

    it('#ctx.render() is function', function (done) {
        request(this.app.listen()).get('/').expect(200).end(function (error, content) {
            if (error) return done(error);
            let html = content.text;
            done();
        });

    });
});

