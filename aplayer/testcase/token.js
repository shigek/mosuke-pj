let request = require('request');


let basic = new Buffer('abc123:ssh-secret').toString('base64');
//オプションを定義
var options = {
	url: 'http://localhost:3000/oauth/token',
	method: 'POST',
	headers: {
		Authorization: 'Basic ' + basic
	},
	followOriginalHttpMethod: true,
	json: true,
	form: {
		grant_type: "client_credentials",
	}
}
// or 
// var options = {
// 	url: 'http://localhost:3000/oauth/token',
// 	method: 'POST',
// 	headers: {
// 	},
// 	followOriginalHttpMethod: true,
// 	json: true,
// 	form: {
// 		grant_type: "client_credentials",
//    client_id: "abc123",
//    client_secret: "ssh-secret"
// 	}
// }

//リクエスト送信
request(options, function (error, response, body) {
	if (error) { console.log(error); }
	else { console.log(response.statusCode); console.log(body); } 
})
