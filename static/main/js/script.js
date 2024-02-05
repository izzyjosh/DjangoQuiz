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
let question_id = document.getElementById('question_id').value;

document.addEventListener("DOMContentLoaded", function () {
  var storedFormData = localStorage.getItem('form'+question_id);

  if (storedFormData) {
    var formData = JSON.parse(storedFormData);

    let answer = document.querySelector('input[name="options"][value="' + formData.selectedOption + '"]');

    answer.checked = true;
  }

  let form = document.getElementById("myForm"+question_id);

  form.addEventListener('change', function (event) {
    event.preventDefault();

    var selectedOption = document.querySelector('input[name="options"]:checked').value;

    localStorage.setItem('form'+question_id, JSON.stringify({
      selectedOption: selectedOption
    }));
  })
})


const client_answer = []
console.log(localStorage.length)
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i)
  let value = localStorage.getItem(key)
  const val = JSON.parse(value)
  client_answer.push(val.selectedOption)
}
console.log(client_answer)

const quiz_id = document.getElementById("submit").getAttribute("data-id")
const url = `http://localhost:8000/submit/${quiz_id}/`
function submitAnswers() {
  const response = fetch(url,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client_answer),
    })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Submission successful:', data);
    alert(`you scored ${data.answer} out of 4. Congratulations 🎉👏`)

  })
  .catch(error => {
    console.error('Error submitting answers:', error);
  });
}