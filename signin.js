$(document).ready(function() {
  setTimeout(function() {
    $(".preloader").fadeOut();
  }, 3300)
})

$("#signin").on("click", Signin);

function Signin() {
  let nickname = $("#nickname").val();
  let code = $("#code").val();
  if(code !== "CTB2021") {
    alert("Private Code is Wrong!");
    return;
  } else if (nickname.length < 4) {
    alert("Nickname min 4 character");
    return;
  } else if (nickname.length > 17) {
    alert("Nickname max 17 character")
    return;
  } else {
    localStorage.setItem("user", nickname);
    window.location.href="index.html";
  }
  
}