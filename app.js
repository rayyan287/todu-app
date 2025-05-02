
const firebaseConfig = {
    apiKey: "AIzaSyCFyC0vtpXVXWfRasdwQXcA-mNl-XkX6Pw",
    authDomain: "tudu-app-223c7.firebaseapp.com",
    projectId: "tudu-app-223c7",
    storageBucket: "tudu-app-223c7.firebasestorage.app",
    messagingSenderId: "792460901896",
    appId: "1:792460901896:web:2b75bfa70fde5721f19bbd"
  };


firebase.initializeApp(firebaseConfig);
var db = firebase.database();


var inputs = document.getElementById("inp");
var text = document.querySelector(".text");


db.ref("tasks").on("value", function(snapshot) {
    text.innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) {
        var task = childSnapshot.val();
        var taskKey = childSnapshot.key;

        var newEle = document.createElement("ul");
        newEle.innerHTML = `${task.text} <i class="fa-solid fa-trash"></i>`;
        text.appendChild(newEle);

        newEle.querySelector("i").addEventListener("click", function () {
            db.ref("tasks/" + taskKey).remove();
        });
    });
});


function Add() {
    if (inputs.value == "") {
        alert("Please Enter Task");
    } else {
        db.ref("tasks").push({
            text: inputs.value
        });
        inputs.value = ""; 
    }
}