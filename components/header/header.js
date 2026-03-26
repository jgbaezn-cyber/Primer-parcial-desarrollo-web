(function initHeader() {
  var btnLogout = document.getElementById("btn-logout");

  if (btnLogout) {
    btnLogout.addEventListener("click", function () {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }
})();