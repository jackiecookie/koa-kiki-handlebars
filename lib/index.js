const render=require('./render');


 module.exports = function (options) {
    return render(options).middleware();
};