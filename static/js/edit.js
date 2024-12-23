"use strict";
const containerForm = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");
const predictBtn = document.getElementById("predict-btn");
const idInput = document.getElementById("input-id");
const resultinput = document.getElementById("input-result");
const radiusInput = document.getElementById("input-radius");
const textureInput = document.getElementById("input-texture");
const perimeterInput = document.getElementById("input-perimeter");
const areaInput = document.getElementById("input-area");
const smoothnessInput = document.getElementById("input-smoothness");
const compactnessInput = document.getElementById("input-compactness");
const concavityInput = document.getElementById("input-concavity");
const concavePointsInput = document.getElementById("input-concave-points");
const symmetryInput = document.getElementById("input-symmetry");
const fractalDimensionInput = document.getElementById(
  "input-fractal-dimension"
);
const tableBodyEl = document.getElementById("tbody");
const sidebar = document.getElementById(`sidebar`);
const sidebarHeader = document.querySelector(".sidebar-header");

const LIST_RESULT = "LIST_RESULT";
let resultArr = JSON.parse(getFromStorage(LIST_RESULT, null)) ?? [];

let currResult;

function renderTableData(resultArr) {
  tableBodyEl.innerHTML = "";

  // create resultArr.length rows of pet
  for (let i = 0; i < resultArr.length; i++) {
    const row = document.createElement("tr");
    // row.innerHTML = "<HTML code>";
    row.innerHTML = `<th scope="row">${resultArr[i].id}</th>
    <td>${resultArr[i].radius_worst}</td>
    <td>${resultArr[i].texture_worst}</td>
    <td>${resultArr[i].perimeter_worst}</td>
    <td>${resultArr[i].area_worst}</td>
    <td>${resultArr[i].smoothness_worst}</td>
    <td>${resultArr[i].compactness_worst}</td>
    <td>${resultArr[i].concavity_worst}</td>
    <td>${resultArr[i]["concave points_worst"]}</td>
    <td>${resultArr[i].symmetry_worst}</td>
    <td>${resultArr[i].fractal_dimension_worst}</td>
    <td>${resultArr[i].diagnosis}</td>
    <td>
    <button class="btn btn-warning" onclick="startEditQuestion('${resultArr[i].id}')">Edit</button>
    </td>`;

    tableBodyEl.appendChild(row);
  }
}

renderTableData(resultArr);

// startEditQuestion
const startEditQuestion = (resultID) => {
  const currId = parseInt(resultID);
  currResult = resultArr.findIndex((result) => result.id === currId);

  idInput.value = resultArr[currResult].id;
  resultinput.value = resultArr[currResult].diagnosis;
  radiusInput.value = resultArr[currResult].radius_worst;
  textureInput.value = resultArr[currResult].texture_worst;
  perimeterInput.value = resultArr[currResult].perimeter_worst;
  areaInput.value = resultArr[currResult].area_worst;
  smoothnessInput.value = resultArr[currResult].smoothness_worst;
  compactnessInput.value = resultArr[currResult].compactness_worst;
  concavityInput.value = resultArr[currResult].concavity_worst;
  concavePointsInput.value = resultArr[currResult]["concave points_worst"];
  symmetryInput.value = resultArr[currResult].symmetry_worst;
  fractalDimensionInput.value = resultArr[currResult].fractal_dimension_worst;
};

// clear Input
const clearInput = () => {
  idInput.value = "";
  radiusInput.value = "";
  resultinput.value = "";
  textureInput.value = "";
  perimeterInput.value = "";
  areaInput.value = "";
  smoothnessInput.value = "";
  compactnessInput.value = "";
  concavityInput.value = "";
  concavePointsInput.value = "";
  symmetryInput.value = "";
  fractalDimensionInput.value = "";
};

sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});

// submit btn
submitBtn.addEventListener("click", function () {
  if (idInput.value === "") {
    alert("Please select case to edit");
    return;
  }
  resultArr[currResult].id = parseInt(idInput.value);
  resultArr[currResult].diagnosis = resultinput.value;
  resultArr[currResult].radius_worst = parseFloat(radiusInput.value);
  resultArr[currResult].texture_worst = parseFloat(textureInput.value);
  resultArr[currResult].perimeter_worst = parseFloat(perimeterInput.value);
  resultArr[currResult].area_worst = parseFloat(areaInput.value);
  resultArr[currResult].smoothness_worst = parseFloat(smoothnessInput.value);
  resultArr[currResult].compactness_worst = parseFloat(compactnessInput.value);
  resultArr[currResult].concavity_worst = parseFloat(concavityInput.value);
  resultArr[currResult]["concave points_worst"] = parseFloat(
    concavePointsInput.value
  );
  resultArr[currResult].symmetry_worst = parseFloat(symmetryInput.value);
  resultArr[currResult].fractal_dimension_worst = parseFloat(
    fractalDimensionInput.value
  );

  saveToStorage(LIST_RESULT, JSON.stringify(resultArr));
  clearInput();

  alert("Submit successfully");
  renderTableData(resultArr);
  // }
});
predictBtn.addEventListener("click", async function () {
  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Chỉ định định dạng JSON
      },
      body: JSON.stringify(resultArr),
    });

    const data = await response.json();
    tableBodyEl.innerHTML = "";

    // create resultArr.length rows of pet
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement("tr");
      // row.innerHTML = "<HTML code>";
      row.innerHTML = `<th scope="row">${resultArr[i].id}</th>
    <td>${data[i].radius_worst}</td>
    <td>${data[i].texture_worst}</td>
    <td>${data[i].perimeter_worst}</td>
    <td>${data[i].area_worst}</td>
    <td>${data[i].smoothness_worst}</td>
    <td>${data[i].compactness_worst}</td>
    <td>${data[i].concavity_worst}</td>
    <td>${data[i]["concave points_worst"]}</td>
    <td>${data[i].symmetry_worst}</td>
    <td>${data[i].fractal_dimension_worst}</td>
    <td>${data[i].diagnosis}</td>
    <td>
    <button class="btn btn-warning" onclick="startEditQuestion('${resultArr[i].id}')">Edit</button>
    </td>`;

      tableBodyEl.appendChild(row);
    }
    saveToStorage(LIST_RESULT, JSON.stringify(data));
    resultArr = JSON.parse(getFromStorage(LIST_RESULT, null)) ?? [];
    clearInput();

    alert("Submit successfully");
  } catch (error) {
    console.error("Error:", error);
  }
});
