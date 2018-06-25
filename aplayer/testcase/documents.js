let request = require('request');

//オプションを定義
let test = {
	documents: (options) => {
		request(options, (error, response, body) => {
			if (error) { console.log(error); }
			else { console.log(response.statusCode); console.log(body); }
		});
	},
	token: async () => {
		let options = {
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
		request(options, (error, response, body) => {
			if (body.access_token) {
				let accessToken = body.access_token;
				accessToken = '';
				let documents = {
					url: 'http://localhost:3000/documents/sc',
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + accessToken
					},
					followOriginalHttpMethod: true,
					json: true,
					form: {
					}
				}
				test.documents(documents);
			} else {
				console.log(response.statusCode);
				console.log(body);
			}
		});
	}
}
test.token();

