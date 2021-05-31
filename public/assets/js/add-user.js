const generatePwd = document.getElementById('genpswd');
const password = document.getElementById('in-pswd');
let sentPswd = '';
generatePwd.addEventListener("click", (e) => {
    e.preventDefault()
    password.value = randomPassword(8);
    sentPswd = password.value;
});

function randomPassword(length) {
    let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    let pass = "";
    for (let x = 0; x < length; x++) {
        let i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

const urlParams = new URLSearchParams(window.location.search);
const firstName = urlParams.get('firstName');
const lastName = urlParams.get('lastName');
const address = urlParams.get('address');
const email = urlParams.get('email');
const age = urlParams.get('age');

document.getElementById('fname').value = firstName;
document.getElementById('lname').value = lastName;
document.getElementById('address').value = address;
document.getElementById('up-mail').value = email;
document.getElementById('age').value = age;

const addUser = document.getElementById('addUser');
addUser.addEventListener('click', (e) => {
    e.preventDefault()
    if (password.value !== '') {
        HTTPService.post("http://localhost:3000/", {
            "firstName": firstName,
            "lastName": lastName,
            "Address": address,
            "age": age,
            "mail": email,
            "password": password.value,
            "role": "USER"
        }).then((d) => {
            console.log(d + "assem");
            window.location.href = "http://localhost:3000/";
        })  ``
        const body = `
		Dear <strong>${firstName}</strong>,<br/>
	    Welcome to our company here's your login info,<br/>
		E-mail<strong>: ${email}</strong><br/>
		password<strong>: ${password.value}</strong><br/>
		
		<br/>
		<br/>
		<br/>

		Kind regards,`;

        sendEmail("assem.ali994@gmail.com",
            sentPswd,
            "Login info",
            body
        );
    }
});



