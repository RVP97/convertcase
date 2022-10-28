var text = document.getElementById("text");
var upperCase = document.getElementById("upper-case");
var lowerCase = document.getElementById("lower-case");
var properCase = document.getElementById("proper-case");
var sentenceCase = document.getElementById("sentence-case");
var saveTextFile = document.getElementById("save-text-file");
var clear = document.getElementById("clear");
var alternatingText = document.getElementById("alternating-text");
var copy = document.getElementById("copy");

upperCase.addEventListener("click", function () {
  text.value = text.value.toUpperCase();
});

lowerCase.addEventListener("click", function () {
  text.value = text.value.toLowerCase();
});

properCase.addEventListener("click", function () {
  text.value = text.value.toLowerCase().replace(/^(.)|\s(.)/g, function (text) {
    return text.toUpperCase();
  });
});

sentenceCase.addEventListener("click", function () {
  text.value = text.value
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
});

clear.addEventListener("click", function () {
  text.value = "";
});

saveTextFile.addEventListener("click", function () {
  var data = new Blob([text.value], {
    type: "text/plain",
  });
  var textFile = URL.createObjectURL(data);
  var link = document.createElement("a");
  link.setAttribute("href", textFile);
  link.setAttribute("download", "textFile.txt");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// add alternating case
alternatingText.addEventListener("click", function () {
  var textArray = text.value.toLowerCase().split("");
  for (var i = 0; i < textArray.length; i++) {
    if (i % 2 === 0) {
      textArray[i] = textArray[i].toUpperCase();
    }
  }
  text.value = textArray.join("");
});

// add copy textarea text to clipboard
copy.addEventListener("click", function () {
  navigator.clipboard.writeText(text.value);
  copy.textContent = "Copied!";
  setTimeout(function () {
    copy.textContent = "Copy";
  }, 1000);
});