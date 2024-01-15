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
let question_id = document.querySelector("#question_id").value;


document.addEventListener("DOMContentLoaded", function () {
  var storedFormData = sessionStorage.getItem('form'+question_id);

  if (storedFormData) {
    var formData = JSON.parse(storedFormData);

    let answer = document.querySelector('input[name="options"][value="' + formData.selectedOption + '"]');

    answer.checked = true;
    answer.setAttribute('style', "color:blue");

  }

  /* var formElement = document.getElementById('myForm'+form.questiin_id.value);*/
  let form = document.getElementById("myForm"+question_id);

  form.addEventListener('change', function (event) {
    event.preventDefault();

    var selectedOption = document.querySelector('input[name="options"]:checked').value;

    sessionStorage.setItem('form'+question_id, JSON.stringify({
      selectedOption: selectedOption
    }));
    console.log("Form submitted with option: " + selectedOption);

  })


})