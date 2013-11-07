$(document).ready(function(){

	var firstname = '';
	var lastName = '';
	var phone = '';
	var email = '';

	$('#clear').on('click', function(){
		localStorage.clear();
		$('input:text').val(' ');
	});

	$('.clearInput').on('click', function(){
		var fieldId = this.dataset.localitem;
		$('#' + fieldId + '').val(' ');
		localStorage.removeItem('' + fieldId + '');
	});


	function formStorage(){
		firstName = $('#firstname').val();
		localStorage.setItem('firstname', firstName);
		
		lastName = $('#lastname').val();
		localStorage.setItem('lastname', lastName);

		email = $('#email').val();
		localStorage.setItem('email', lastName);

		phone = $('#phone').val();
		localStorage.setItem('phone', phone);
	
	}

	function initLocalStorageControls(){
		var userMessage = '';
		if(Modernizr.localstorage){
			$('#data-dashboard form').show();
			userMessage = "Use the form below to add and display data";
			$('#update-details').on('click', function(){
				formStorage();
			});
		}
		else{
			userMessage = "Sorry, local storage is not available";
			$('#data-dashboard form').hide();
		}

		$('.status-message').text(userMessage);

		firstName = localStorage.getItem('firstname');
		lastName = localStorage.getItem('lastname');
		email = localStorage.getItem('email');
		phone = localStorage.getItem('phone');

		$('#firstname').val(firstName);
		$('#lastname').val(lastName);
		$('#email').val(email);
		$('#phone').val(phone);

	}

	initLocalStorageControls();

});