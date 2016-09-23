const render=require('./lib/render');

exports = module.exports = function (options) {
    return render(options).middleware();
};