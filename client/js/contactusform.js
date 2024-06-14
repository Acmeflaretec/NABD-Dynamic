




const scriptURL2 = 'https://script.google.com/macros/s/AKfycbwhFPqxH9AHkY7OtLatTO23urtQpPo8LChlQHxmQ8SwkYfNg3glWgIakheAPvOiSLY-NA/exec'
const form2 = document.forms['registrationForm2']
const registerButton2 = document.getElementById('registerButton');
const loader2 = document.getElementById('loader');

form2.addEventListener('submit', e => {
	e.preventDefault();
  
  const phoneInput = document.getElementById('phone');
  const phoneNumber = phoneInput.value.trim();
	loader2.style.display = 'block'; // Show loading spinner
	registerButton2.disabled = true; // Disable the button while waiting for response

  if (validatePhoneNumber(phoneNumber)) {

	fetch(scriptURL2, { method: 'POST', body: new FormData(form2)})
		.then(response => {
			loader2.style.display = 'none'; // Hide loading spinner
			registerButton2.disabled = false; // Re-enable the button
			if (response.ok) {
				console.log('Success!', response);
			
				form2.reset();
				setTimeout(() => {
					showAlert("Success! We will connect with you soon.")
				},2000);
			

			} else {
				console.error('Error!', response.statusText);
				showAlert('please try again ')
				loader2.style.display = 'none'; // Hide loading spinner in case of error
				registerButton2.disabled = false; // Re-enable the button
				// You might want to provide user feedback here
			}
		})
		.catch(error => {
			console.error('Error!', error.message);
			// You might want to provide user feedback here
		});
  }else{

    showAlert('Please fill out the phone number field with a valid phone number.');
    loader2.style.display = 'none'; // Hide loading spinner in case of error
				registerButton2.disabled = false; // Re-enable the button
  }
});


// Phone number validation function
function validatePhoneNumber(phoneNumber) {
  // Regular expression to match phone numbers with optional country code
  // It allows for an optional "+" followed by one or more digits for the country code,
  // followed by the remaining digits for the phone number.
  return /^\+?\d{1,3}\d{1,14}$/.test(phoneNumber);
}

// Add event listener to check phone number validity on input change
form2.addEventListener('input', function() {
  const phoneInput = document.getElementById('phone');
  const phoneNumber = phoneInput.value.trim();
  submitButton.disabled = !validatePhoneNumber(phoneNumber);
});

	
	function showAlert(a) {
    alert(a);
}