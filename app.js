$(document).ready(function() {
  setTimeout(function() {
    $(".notice").fadeOut();
  }, 3000)
})

$(".btn-option").on("click", openOption);
function openOption() {
  $(".option").toggleClass("active");
  $(".nickname").text(localStorage.getItem("user"))
}

$(".about-btn").on("click", Modal);

function Modal() {
  $(".about").fadeIn();
  $(".close").on("click", function() {
    $(".about").fadeOut();
  })
}

function Scroll() {
  $("html, body").animate({
    scrollTop: $(".null").offset().top
  }, 0)

}

var firebaseConfig = {
  apiKey: "AIzaSyCaWrZ7NZpjGpRkDTxqFe4-3dRidDC07rQ",
  authDomain: "randomchat-26860.firebaseapp.com",
  databaseURL: "https://randomchat-26860-default-rtdb.firebaseio.com",
  projectId: "randomchat-26860",
  storageBucket: "randomchat-26860.appspot.com",
  messagingSenderId: "400690461347",
  appId: "1:400690461347:web:a305496babf3e5f9cedd16",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var chatRef = firebase.database().ref().child("chat");

$("#post").on("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let nickname = localStorage.getItem("user")
  let message = $("#message").val();
  if(message == "") {
    alert("Pesan tidak boleh kosong");
    return;
  }
  let times = new Date();
  let h = times.getHours();
  let m = times.getMinutes();
  let timePost = h+":"+m;
  insertData(nickname, message, timePost);
  $("#send").on("click", ()=> {
    new Audio("sfx.mp3").play();
  })
  $("#post")[0].reset();
  
}

function insertData(nickname, message, timePost) {
  let newData = chatRef.push();
  newData.set({
    nickname: nickname,
    message: message,
    time: timePost
  })
}

chatRef.on("value", function(getData) {
  let template = "";
  getData.forEach((data)=> {
    var chat = data.val();
    var nickname = ""
    if(chat.nickname == localStorage.getItem("user")) {
      nickname = "You";
    } else {
      nickname = chat.nickname;
    }
    template += `<div class="chat">
        <h5>${nickname}</h5>
        <p>${chat.message}</p>
        <p class="time">${chat.time}</p>
      </div>`;
    $(".chats").html(template);
    Scroll();
  })

})

$("#logout").on("click", logOut);

function logOut() {
  localStorage.removeItem("user");
  window.location.href="signin.html";
}

function fullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } 
}  

$(window).on("click", ()=> {
  fullScreen();
})
