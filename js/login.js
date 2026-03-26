var VALID_USER = "admin";
var VALID_PASS = "cafe123";

var btnLogin = document.getElementById("btn-login");
var errorMsg = document.getElementById("error-msg");

function handleLogin() {
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value.trim();

  if (username === VALID_USER && password === VALID_PASS) {
    // Guardar sesión y redirigir a la página principal
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    // Mostrar error con animación shake
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("shake");
    setTimeout(function () {
      errorMsg.classList.remove("shake");
    }, 500);
  }
}

// Click del botón de login
btnLogin.addEventListener("click", handleLogin);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleLogin();
});