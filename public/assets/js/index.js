const signUpForm = document.getElementById('signup');

const container = document.getElementById('container');

const signUpButton = document.getElementById('signUp');

const signInButton = document.getElementById('signIn');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const address = document.getElementById('address');
const userMail = document.getElementById('up-mail');
const age = document.getElementById('age');

signUpForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (checkInputs()) {

		const addUserURL = `http://127.0.0.1:3000/pages/add-user.html?firstName=${firstName.value}&&lastName=${lastName.value}&&address=${address.value}&&email=${userMail.value}&&age=${age.value}`;
		const body = `
		Dear <strong>Admin</strong>,<br/>
		New employee is trying to sign up please verify this request,<br/>
		FirstName<strong>: ${firstName.value}</strong><br/>
		LastName<strong>: ${lastName.value}</strong><br/>
		Address<strong>: ${address.value}</strong><br/>
		E-mail<strong>: ${userMail.value}</strong><br/>
		Age<strong>: ${age.value}</strong><br/>
		<br/>

        <a href="${addUserURL}">Add User</a>

		<br/>
		<br/>

		Kind regards,`;

		sendEmail("assem.ali994@gmail.com",
			"assem.ali994@gmail.com",
			"Register New Employee",
			body
		);
		window.location.href = "http://localhost:3000/pages/informing.html";

	}

});

function checkInputs() {
	// trim to remove the whitespaces
	const firstNameValue = firstName.value.trim();
	const lastNameValue = lastName.value.trim();
	const addressValue = address.value.trim();
	const emailValue = userMail.value.trim();
	const ageValue = age.value.trim();

	if (firstNameValue === '') {
		setErrorFor(firstName, 'first name cannot be blank');
	} else {
		setSuccessFor(firstName);
	}
	if (lastNameValue === '') {
		setErrorFor(lastName, 'last name cannot be blank');
	} else {
		setSuccessFor(lastName);
	}
	if (addressValue === '') {
		setErrorFor(address, 'address cannot be blank');
	} else {
		setSuccessFor(address);
	}
	if (ageValue === '') {
		setErrorFor(age, 'age cannot be blank');
	} else {
		setSuccessFor(age);
	}

	if (emailValue === '') {
		setErrorFor(userMail, 'mail cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(userMail, 'Not a valid email');
	} else {
		setSuccessFor(userMail);
	}

	if (
		(firstNameValue !== '') && (lastNameValue !== '') && (addressValue !== '') && (ageValue !== '') && (emailValue !== '') && isEmail(emailValue)
	) {
		return true;
	}

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}




signIn = () => {
	let url = "http://localhost:3000/users";
	const email = $("#signin_email").val();
	const password = $("#signin_password").val();

	url += "?mail=" + email;
	url += "&&password=" + password;
	HTTPService.get(url).then((d) => {
		console.log(d);
		if (d && d.length == 1) {
			Storage.setUser(JSON.stringify(d[0]));
			redirectUserRole();
		} else {
			alert("Please insert a valid credential")
		}
	})
}