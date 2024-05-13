var toggleButton = document.getElementById("toggleButton");
var shareBox = document.getElementById("shareBox");

toggleButton.addEventListener("click", function () {
  var displayStyle = window.getComputedStyle(shareBox).display;
  if (displayStyle === "none") {
    shareBox.style.display = "block";
    console.log("block");
  } else {
    shareBox.style.display = "none";
    console.log("none");
  }
});

function submitContent() {
  var textInput = document.getElementById("textInput").value;
  var fileInput = document.getElementById("fileInput");
  var hasText = textInput.length > 0;
  var hasFile =
    fileInput.files.length > 0 && checkFileType(fileInput.files[0].name);

  if (hasText || hasFile) {
    if (hasText) {
      submitText(textInput);
    }
    if (hasFile) {
      submitFile(fileInput);
    }
  } else {
    alert("请输入文本或选择文件后提交！");
  }
}

function submitText(text) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer fastgpt-48qoTU0LXGUzN9a0HdXV3TPFAJBDxHv6zH1MHNqE1vQuSvUVkwUWilCnV8J"
  );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Host", "api.fastgpt.in");
  myHeaders.append("Connection", "keep-alive");

  var raw = JSON.stringify({
    collectionId: "664182d60bc39612d4e3c65d",
    trainingMode: "chunk",
    prompt: "",
    billId: "",
    data: [{ q: text }],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.fastgpt.in/api/core/dataset/data/pushData", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function submitFile(fileInput) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer fastgpt-48qoTU0LXGUzN9a0HdXV3TPFAJBDxHv6zH1MHNqE1vQuSvUVkwUWilCnV8J"
  );
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Host", "api.fastgpt.in");
  myHeaders.append("Connection", "keep-alive");

  var formdata = new FormData();
  formdata.append("file", fileInput.files[0], fileInput.files[0].name);
  formdata.append(
    "data",
    '{"datasetId":"6640e673fcba6b8255c9d877","parentId":null,"trainingType":"chunk","chunkSize":512,"chunkSplitter":"","qaPrompt":"","metadata":{}}'
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "https://api.fastgpt.in/api/proApi/core/dataset/collection/create/file",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function checkFileType(fileName) {
  const validExtensions = ["txt", "md", "csv"];
  const fileExtension = fileName.split(".").pop();
  return validExtensions.includes(fileExtension);
}
