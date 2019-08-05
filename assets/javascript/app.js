//Need to create Firebase database
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAPomo8wpIbIusbR9epa3YjKzG0a4WS9QU",
    authDomain: "trainscheduler-d763e.firebaseapp.com",
    databaseURL: "https://trainscheduler-d763e.firebaseio.com",
    projectId: "trainscheduler-d763e",
    storageBucket: "",
    messagingSenderId: "764713174359",
    appId: "1:764713174359:web:fec8ff65c896b2c0"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//need to create variables for inputs
var database = firebase.database();
var name = "";
var destination = "";
var time = "";
var frequency = "";
var trainTotal=0;




//Need to create funtions to append data that has been submitted
database.ref().on("child_added", function(snapshot){
    trainTotal++;


  var firstTrain = moment(snapshot.val().time, "HH:mm").subtract(1, "years");

  var diffTime = moment().diff(moment(firstTrain), "minutes");

  var delta =diffTime%snapshot.val().frequency

  var minAway = snapshot.val().frequency - delta;

  var nextTrain = moment().add(minAway, "minutes");

  nextTrain = moment(nextTrain).format("HH:mm");


    console.log(nextTrain);
    console.log(snapshot);
    console.log(snapshot.val());
    $(".info-table").append($("<tbody>").append($("<tr>")).attr("value", trainTotal).attr("class", "train" + trainTotal));



$(".train" + trainTotal).append($("<td>").text(snapshot.val().name));

$(".train" + trainTotal).append($("<td>").text(snapshot.val().destination));

$(".train" + trainTotal).append($("<td>").text(snapshot.val().frequency));
//next arrival
$(".train" + trainTotal).append($("<td>").text(nextTrain));
//minutes away
$(".train" + trainTotal).append($("<td>").text(minAway));

});




//need to create an onclick for data inputed
$("#submit").on("click", function (event){
event.preventDefault();

name = $("#inputName").val().trim();
destination = $("#inputDestination").val().trim();
time = $("#inputTime").val().trim();
frequency = $("#inputFrequency").val().trim();

if (name === "" || destination === "" || time === "" || frequency === "") {
    alert ("Missing Fields");
} else {
database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    dateInput: firebase.database.ServerValue.TIMESTAMP
})
console.log(name);
}

})