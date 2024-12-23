"use strict";
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");
const sidebar = document.getElementById(`sidebar`);
const sidebarHeader = document.querySelector(".sidebar-header");

const LIST_RESULT = "LIST_RESULT";
let resultArr = JSON.parse(getFromStorage(LIST_RESULT, null)) ?? [];

const saveDinamicDataToFile = function () {
  let fileName = "cancer_result.json";
  var blob = new Blob([JSON.stringify(resultArr)], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, fileName);
};

const readFile = function () {
  const fr = new FileReader();

  try {
    fr.readAsText(fileInput.files[0]);
    fr.addEventListener("load", function () {
      const clientResultArr = JSON.parse(fr.result) ?? [];

      // overide client data with new local data
      resultArr.forEach((localQuest) => {
        const index = clientResultArr.findIndex(
          (clientQuest) => localQuest.id === clientQuest.id
        );
        clientResultArr.splice(index, 1);
      });

      resultArr = resultArr.concat(clientResultArr);
      saveToStorage(LIST_RESULT, JSON.stringify(resultArr));
      alert("Import successfully");
    });
  } catch (err) {
    alert("Please choose the file!");
  }
};
// export btn
exportBtn.addEventListener("click", saveDinamicDataToFile);

// import btn
importBtn.addEventListener("click", readFile);

sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});
