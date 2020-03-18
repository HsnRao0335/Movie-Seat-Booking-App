const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// save selected movie and price after reaload

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("SelectedMovieIndex", movieIndex);
  localStorage.setItem("SelectedMoviePrice", moviePrice);
}

// Update count and total
function updateSelectedSeats() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsCount = selectedSeats.length;
  count.innerHTML = selectedSeatsCount;
  total.innerHTML = selectedSeatsCount * ticketPrice;
  //console.log(selectedSeatsCount);

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); // i am doing this to save data at reload continues to next line (LocalStorage)
  //console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //   <-- JSON.strigify converts string to number
}

// Movie select Event
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeats();
});

//Seats click Event Listener
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    //console.log(e.target);
  }

  updateSelectedSeats();
});
