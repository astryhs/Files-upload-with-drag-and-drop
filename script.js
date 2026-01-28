const dropFileZone = document.querySelector(".upload-zone__dragover");
const uploadInput = document.getElementById("upload-form__file");
const filesInfoElement = document.getElementById("file-info");
const filesSentElement = document.getElementById("files-sent");
const fileListElement = document.getElementById("file-list");
const submitButton = document.querySelector(".form-upload__submit");

dropFileZone.addEventListener("dragenter", () => {
  dropFileZone.classList.add("active");
});

dropFileZone.addEventListener("dragleave", () => {
  dropFileZone.classList.remove("active");
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
});

["dragover", "drop"].forEach((event) => {
  document.addEventListener(event, (e) => {
    e.preventDefault();
  });
});

// Массив для хранения всех выбранных файлов
let allFiles = [];

dropFileZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropFileZone.classList.remove("active");
  filesSentElement.style.display = "none";
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    addFiles(files);
    displayFilesInfo(allFiles);
  }
});

function addFiles(newFiles) {
  allFiles = allFiles.concat(Array.from(newFiles));
  saveFilesToInput();
}

function saveFilesToInput() {
  const tempInput = new DataTransfer();
  allFiles.forEach((file) => tempInput.items.add(file));
  uploadInput.files = tempInput.files;
}

uploadInput.addEventListener("change", () => {
  filesSentElement.style.display = "none";
  const files = uploadInput.files;
  if (files.length > 0) {
    addFiles(files);
    displayFilesInfo(allFiles);
  }
});

function displayFilesInfo(files) {
  filesInfoElement.style.display = "block";
  submitButton.style.display = "block";
  fileListElement.innerHTML = "";

  for (const file of files) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>Загружен файл:</span> ${file.name}<br>
      <span>размером:</span> ${file.size} байт<br>
    `;
    fileListElement.append(listItem);
  }
}

function clearUploadInput() {
  allFiles = [];
  const tempInput = new DataTransfer();
  uploadInput.files = tempInput.files;
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const files = allFiles;

  filesSentElement.style.display = "block";
  submitButton.style.display = "none";

  const filesInfo = files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }));

  console.log("Файлы отправлены:", filesInfo);

  clearUploadInput();
  fileListElement.innerHTML = "";
  filesInfoElement.style.display = "none";
  filesSentElement.style.display = "block";
});
