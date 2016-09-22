const render=require('../lib/render');
const assert=require('assert');


describe('render(opt)',function () {

   it('render is function',function(){
       assert.equal(typeof render,'function')
   });


    it('render(null) is render object',function(){
        const renderObj=render(null);
        assert(renderObj instanceof render);
    })
});



describe('renderObject function',function(){

    before(function () {
        this.renderObj=render({});
    })

    it('#readFile()',function () {
        const file=this.renderObj.readFile('./test/test.hbs');
        assert(!!file,'file empty')
    })
    
})


