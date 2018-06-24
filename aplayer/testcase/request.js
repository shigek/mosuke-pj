let request = require('request');

//オプションを定義
var options = {
	url: 'http://localhost:3000/oauth/token',
	method: 'POST',
	headers: {
	},
	followOriginalHttpMethod: true,
	json: true,
	form: {
		grant_type: "client_credentials",
		client_id: "abc123",
		client_secret: "ssh-secret"
	}
}

//リクエスト送信
request(options, function (error, response, body) {
	if (error) { console.log(error); }
	else { console.log(body); } 
})