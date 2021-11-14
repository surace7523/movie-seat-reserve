const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
populateUI();

let ticketPrice = +movieSelect.value;

//console.log(typeof ticketPrice); tells u the data type
///console.log(typeof ticketPrice);

// container.addEventListener("click", (e) => {
//   console.log(e.target);
// });  // shows you the div selected or clicked

//update total and count

function updateSelectCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  const selectedSeatsCount = selectedSeats.length;
  console.log(seatsIndex);

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //saving to local storage
  //console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate the ui

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectCount();
});

//seat select event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectCount();
  }
});
