var text = document.getElementById("text");
var upperCase = document.getElementById("upper-case");
var lowerCase = document.getElementById("lower-case");
var properCase = document.getElementById("proper-case");
var sentenceCase = document.getElementById("sentence-case");
var saveTextFile = document.getElementById("save-text-file");
var clear = document.getElementById("clear");
var alternatingText = document.getElementById("alternating-text");
var copy = document.getElementById("copy");
var binary = document.getElementById("binary");
var binaryToText = document.getElementById("binary-to-text");
var reverse = document.getElementById("reverse");
var subscript = document.getElementById("subscript");
var numberToText = document.getElementById("number-to-text");

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
  link.setAttribute("download", "textConverter.txt");
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

binary.addEventListener("click", function () {
  text.value = text.value
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");
});

binaryToText.addEventListener("click", function () {
  var binString = "";

  text.value.split(" ").map(function (bin) {
    binString += String.fromCharCode(parseInt(bin, 2));
  });
  text.value = binString;
});

// hide binary to text button if the text is not binary
text.addEventListener("keyup", function () {
  if (text.value.match(/^[0-1\s]+$/)) {
    binaryToText.style.display = "block";
  } else {
    binaryToText.style.display = "none";
  }
});

reverse.addEventListener("click", function () {
  text.value = text.value.split("").reverse().join("");
});

// convert text into subscript but dont convert the first character of every word
subscript.addEventListener("click", function () {
  var textArray = text.value.toUpperCase().split("");
  var subscript = "₀₁₂₃₄₅₆₇₈₉";
  var subscriptArray = subscript.split("");
  for (var i = 0; i < textArray.length; i++) {
    if (
      textArray[i] >= "0" &&
      textArray[i] <= "9" &&
      textArray[i - 1] !== " " &&
      textArray[i - 1] !== undefined
    ) {
      textArray[i] = subscriptArray[textArray[i]];
    }
  }
  text.value = textArray.join("");
});

// actual  conversion code starts here

var ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
var tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
var teens = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

function convert_trillions(num) {
  if (num >= 1000000000000) {
    return (
      convert_trillions(Math.floor(num / 1000000000000)) +
      " trillion " +
      convert_billions(num % 1000000000000)
    );
  } else {
    return convert_billions(num);
  }
}
function convert_billions(num) {
  if (num >= 1000000000) {
    return (
      convert_billions(Math.floor(num / 1000000000)) +
      " billion " +
      convert_millions(num % 1000000000)
    );
  } else {
    return convert_millions(num);
  }
}

function convert_millions(num) {
  if (num >= 1000000) {
    return (
      convert_millions(Math.floor(num / 1000000)) +
      " million " +
      convert_thousands(num % 1000000)
    );
  } else {
    return convert_thousands(num);
  }
}

function convert_thousands(num) {
  if (num >= 1000) {
    return (
      convert_hundreds(Math.floor(num / 1000)) +
      " thousand " +
      convert_hundreds(num % 1000)
    );
  } else {
    return convert_hundreds(num);
  }
}

function convert_hundreds(num) {
  if (num > 99) {
    return ones[Math.floor(num / 100)] + " hundred " + convert_tens(num % 100);
  } else {
    return convert_tens(num);
  }
}

function convert_tens(num) {
  if (num < 10) return ones[num];
  else if (num >= 10 && num < 20) return teens[num - 10];
  else {
    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  }
}

numberToText.addEventListener("click", function () {
  if (parseInt(text.value) == 0) {
    text.value = "zero";
  } else {
    text.value = convert_trillions(parseInt(text.value));
  }
});
