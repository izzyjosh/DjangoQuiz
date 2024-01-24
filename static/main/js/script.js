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


//submit
const submitButton = document.querySelector("#submit");
const quizId = submitButton.getAttribute("data-id");

async function submitAnswers() {
  var answers = [];
  // reset clock to make sure clock stops counting.
  window.clearInterval(interval);

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    const value = sessionStorage.getItem(key)
    const val = JSON.parse(value)
    answers.push(val.selectedOption)
  }

  // before sumbit, look into question list to find answers
  for (let i = 0; i < Number(num_of_questions); i++) {
    localStorage.getItem('q'+questions_list[i])
    ? (answers[`${i}`] = localStorage.getItem('q' + questions_list[i])): (answers[`${i}`] = "");
  }

  answers["quiz_id"] = quiz_id;

  // the NS_BINDING_ABORT error with firefox seems to be caused by the async behaviour of fetch API
  // when location is changed to /  response is not yet received and binding is aborted.
  // code change is to change it to synchronous action.  change browser to / after receive response from server.
  const response = await(
    fetch("submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify(answers),
    }));

  if (response.ok) {
    const data = await response.json();
    const score = (Number(data.result) / Number(num_of_questions)) * 100;

    if (score >= 50) {
      alert(`Congratulations!!!\n\n\t\tScore: ${score}%`);
    } else {
      alert(`Failed!!!\n\n\t\tScore: ${score}%`);
    }
  } else {
    throw new Error('Request failed: ' + response.statusText);
  }

  localStorage.clear();
  window.location = "/";
}