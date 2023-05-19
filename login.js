function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "./profile.html";
  }

  function signup(){
    window.location.href = "./signup.html";
  }
  function signin(){
    window.location.href = "./profile.html";
  }