"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const questionInput = document.getElementById("input-question");
const answerInput = document.getElementById("input-answer");
const aInput = document.getElementById("input-a");
const bInput = document.getElementById("input-b");
const cInput = document.getElementById("input-c");
const dInput = document.getElementById("input-d");
const sidebar = document.getElementById(`sidebar`);
const sidebarHeader = document.querySelector(".sidebar-header");
const tableBodyEl = document.getElementById("tbody");

// const questionArr = [];
const LIST_QUESTION = "LIST_QUESTION";
const questionArr = JSON.parse(getFromStorage(LIST_QUESTION, null)) ?? [];

// function validate data
const validateData = function (data) {
  // check empty id
  if (data.id === "") {
    alert("Không để trống ID");
    return 0;
  }
  // check unique id
  for (let i = 0; i < questionArr.length; i++) {
    if (data.id === questionArr[i].id) {
      console.log(questionArr);
      alert("ID phải là giá trị duy nhất");
      return 0;
    }
  }
  // check question
  if (data.question == "") {
    alert("Hãy điền câu hỏi");
    return 0;
  }

  // check answer
  if (data.answer == "") {
    alert("Hãy điền đáp án");
    return 0;
  }

  // check a
  if (data.a == "") {
    alert("Hãy điền câu a");
    return 0;
  }

  // check b
  if (data.b == "") {
    alert("Hãy điền câu b");
    return 0;
  }

  // check c
  if (data.c == "") {
    alert("Hãy điền câu c");
    return 0;
  }

  // check d
  if (data.d == "") {
    alert("Hãy điền câu b");
    return 0;
  }

  return 1;
};

// function render table data
function renderTableData(questionArr) {
  tableBodyEl.innerHTML = "";

  // create questionArr.length rows of pet
  for (let i = 0; i < questionArr.length; i++) {
    const row = document.createElement("tr");
    // row.innerHTML = "<HTML code>";
    row.innerHTML = `<th scope="row">${questionArr[i].id}</th>
    <td>${questionArr[i].answer}</td>
    <td>${questionArr[i].question}</td>
    <td data-number="1">${questionArr[i].a}</td>
    <td>${questionArr[i].b}</td>
    <td>${questionArr[i].c}</td>
    <td>${questionArr[i].d}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteQuestion('${questionArr[i].id}')">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}
renderTableData(questionArr);
// function clear input after submitting
const clearInput = () => {
  idInput.value = "";
  questionInput.value = "";
  answerInput.value = "";
  aInput.value = "Select Type";
  bInput.value = "";
  cInput.value = "";
  dInput.value = "Select Breed";
};

// function delete pet
const deleteQuestion = (questionId) => {
  // Confirm before deleteQuestion
  if (confirm("Are you sure?")) {
    const index = questionArr.findIndex(
      (question) => question.id === questionId
    );
    questionArr.splice(index, 1);
    saveToStorage(LIST_QUESTION, JSON.stringify(questionArr));

    renderTableData(questionArr);
  }
};

// submit button
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    question: questionInput.value,
    answer: answerInput.value,
    a: aInput.value,
    b: bInput.value,
    c: cInput.value,
    d: dInput.value,
  };

  const validate = validateData(data);
  // if validate === true
  if (validate) {
    questionArr.push(data);
    saveToStorage(LIST_QUESTION, JSON.stringify(questionArr));
    clearInput();
    renderTableData(questionArr);
    alert("Submit successfully");
  }
});

// healthy button

sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});
