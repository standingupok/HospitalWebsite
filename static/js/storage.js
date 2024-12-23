"use strict";
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

const getFromStorage = function (key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
};
