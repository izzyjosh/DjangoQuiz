// countdown timer
let time = document.querySelector(".time");
function countdownTimer(durationInSeconds) {
  let timer = durationInSeconds;
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    seconds = seconds < 10 ? '0' + seconds: seconds;
    time.innerHTML = `${minutes}:${seconds}`;
    if (--timer < 0) {
      clearInterval(interval);
    }
  },
    1000);
}
countdownTimer(20);


//quiz logic

document.addEventListener("DOMContentLoaded", function () {
  var storedFormData = sessionStorage.getItem('formData');

  if (storedFormData) {
    var formData = JSON.parse(storedFormData);

    document.querySelector('input[name="options"][value="' + formData.selectedOption + '"]').checked = true;

  }

  var formElement = document.getElementById('myForm');

  formElement.addEventListener('submit', function (event) {
    event.preventDefault();

    var selectedOption = document.querySelector('input[name="options"]:checked').value;

    sessionStorage.setItem('formData', JSON.stringify({
      selectedOption: selectedOption
    }));
  console.log("Form submitted with option: " + selectedOption);

  })


})