function sendEmail(from, to, subject, body) {
	Email.send(
		{
			SecureToken: "eee07fb2-f73f-4c24-9a99-95dedc3831b3",
			From: from,
			To: to,
			Subject: subject,
			Body: body
		})
		.then(message => {
			if (message == "OK") {
				alert("Mail has been sent successfully")
			} else {
				alert(message)
			}
		});
}


//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
class Storage {
	static setUser(value) {
		try {
			localStorage.setItem("user", value);
		} catch (error) {
			console.log(error);
		}
	}

	static getUser() {
		try {
			return JSON.parse(localStorage.getItem("user"));
		} catch (error) {
			console.log(error);
		}
	}

	static clearUser() {
		try {
			localStorage.setItem("user", "");
		} catch (error) {
			console.log(error);
		}
	}
}

class HTTPService {
	static async get(url = '') {
		const response = await fetch(url,
			{
				method: "GET",
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
			});
		return response.json();
	}

	static async post(url = '', data = {}) {
		const response = await fetch(url,
			{
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(data)
			});
		return response.json();
	}
}

redirectUserRole = () => {
	const user = Storage.getUser("user");
	if (user) {
		if (user.role === "ADMIN") {
			if (window.location.href != "http://localhost:3000/pages/admin.html")
				window.location.href = "http://localhost:3000/pages/admin.html";
		} else if (user.role === "USER") {
			if (window.location.href != "http://localhost:3000/pages/user_dashboard.html" && window.location.href != "http://localhost:3000/pages/user_attendance.html")
				window.location.href = "http://localhost:3000/pages/user_dashboard.html";
		}
	} else {
		window.location.href = "http://localhost:3000";
	}
}

signOut = () => {
	Storage.clearUser();
	window.location.href = "http://localhost:3000";
}