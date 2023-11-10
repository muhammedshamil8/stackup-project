function validateForm() {
  var username = document.forms["loginForm"]["username"].value;
  var password = document.forms["loginForm"]["password"].value;

  if (username === "" || password === "") {
      alert("Both username and password are required!");
      return false;
  }

  window.location.href = "home.html";


  return false;
}
