$(document).ready(function(){

	//When user either clicks "Continue" or presses Enter/Return signUpValidation() is called, to ensure that the form has been properly completed and move on to the verify email step.
	$('#signUpForm').on('submit',  function(e){
		signUpValidation(e);

	});

	$('#signUpForm').keydown(function(event,e){
		if(event.which == 13 ){
			signUpValidation(e);
		}
	});

	//Function to submit the user's sign up information: (by clicking continue button or pressing enter on /join.hml). Then changing the view from the signUpForm to the verify email message/prompt.
	function submitSignUp(e){
		//The e / e.preventDefault prevents the form from submiting and reloading the page. 
		e.preventDefault();
		
		//Getting the email value that the user submitted (to be used in the "Verify your email message")
		var email = $('#email').val();
		//console.log(email);
		
		//storing the email address provided in local storage (so that it can be displayed on the verify email page)
		localStorage.setItem('email', email);

		//hiding sign up form
		$('#signUpForm').hide();

		//accessing the stored email address from local storage
		var storedEmail = localStorage.getItem('email');
		//console.log(storedEmail);

		//using Mustache to display a template Verify Email Address display (which includes the {{email}}). Template: (#verifyEmailTemplate), is stored in a script on join.html
		var person = {email: '' + email +''};
		var template = $('#verifyEmailTemplate').html();
		var html = Mustache.render(template, person);
		$('#verifyEmail').css('padding', '25px');
		$('#verifyEmail').html(html);

	}

	//function ensures that the email address and confirm email match and password and confirm password match. If they do match, then the form is submitted, calling submitSignUp(e);
	function signUpValidation(e){
		//hide any past messages
		$('#emailAlertMessage').hide();
		$('#passwordAlertMessage').hide();

		//email, confirm email, password and confirm password values inputed on signup form
		var email = $('#email').val();
		var emailConfirm = $('#emailConfirm').val();
		var password = $('#password').val();
		var passwordConfirm = $('#passwordConfirm').val();

		//Alert messages to be displayed on signup form if email and/or password doesn't match
		emailAlertMessage = '<p id="emailAlertMessage" class="formValidationMessage">Please confirm that your email addresses and confirm email match<p>';
		passwordAlertMessage = '<p id="passwordAlertMessage" class="formValidationMessage">Please confirm that your password and confirm password match<p>';
		
		if (email != emailConfirm){
			//disable form from submitting
			e.preventDefault();
			//append email alert message to signup form
			$('#email').after(emailAlertMessage);
		}
		else if(password != passwordConfirm){
			//disable form from submitting
			e.preventDefault();
			//append password alert message to signup form
			$('#password').after(passwordAlertMessage)
		}
		else{
			//disable form from submitting
			e.preventDefault();
			//submits form:
			submitSignUp(e);
		}
	};

	//User clicks submit (or presses retun) on email verification page
	$('#verifyEmail').on('click', 'div button', function() {
		console.log('click');
		window.location='join2.html';
		/*for later...once I actually start validating the forms...beyond prototpe
		console.log('click');
		e.preventDefault();
		verifyEmailCode(e);*/
	});

	$('#verifyEmail').on('keydown', 'div button', function() {

		if(event.which == 13 ){
			e.preventDefault();
			window.location='join2.html';
		}
	});


	//confirm that the validation code entered is correct. If so, move on to link cell page (join2.html)

	//LATER ON: use ajax requests (submit user's email and password) to confirm that the information entered is correct (twitter api exercise provides a great example of sending info w/ ajax both ways)
	/*function verifyEmailCode(e){
		//hide any past error message (if applicable)
		console.log('verifyEmailCode');
		$('#verificationErrorMessage').hide();

		//code that the user entered
		var submittedCode = $("#verifyEmailCode input").val();
		//Verification code provided within verification email
		var correctCode = 1234;

		var errorMessage = '<p id="verificationErrorMessage" class="formValidationMessage">Please confirm that your password and confirm password match<p>';

		if(submittedCode == correctCode){
			e.preventDefault();
			window.location.href='join2.html';
		}
		//if code doesn't match, display error message.
		else{
			e.preventDefault();
			$("#verifyEmailCode").after(errorMessage);

		}
	}*/

	$('#signUp2').on('click', function(e){
		e.preventDefault();
		window.location='join3.html';
	});

	$('#signUp2').keydown(function(event,e){
		if(event.which == 13 ){
			e.preventDefault();
			window.location='join3.html';
		}
	});

	$('#signUp3').on('click', function(e){
		e.preventDefault();
		window.location='account_insights.html';
	})

	$('#signUp3').keydown(function(event,e){
		if(event.which == 13 ){
			e.preventDefault();
			window.location='account_insights.html';
		}
	});

});