var Mock = require('mockjs');

module.exports =  function (app) {

	app.get('/verify.js', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(Mock.Random.dataImage('300x200'),'binary');
	});
};
