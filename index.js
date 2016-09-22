/**
 * Created by wspandihai on 9/21/16.
 */

var render=require('./lib/render');

exports = module.exports = function (options) {
    return render(options).middleware();
};