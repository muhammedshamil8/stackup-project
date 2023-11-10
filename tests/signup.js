document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const username = signupForm.querySelector('input[placeholder="Username"]').value;
    const email = signupForm.querySelector('input[placeholder="Email"]').value;
    const password = signupForm.querySelector('input[placeholder="Password"]').value;
    const reEnterPassword = signupForm.querySelector('input[placeholder="Password Re Enter"]').value;

    // Log form data to the console (you can modify this part)
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Re-entered Password:', reEnterPassword);

    // Add additional logic here, such as sending data to a server
  });
});
