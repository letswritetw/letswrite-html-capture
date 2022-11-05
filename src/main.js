const input1 = document.getElementById('videoUserFile');
input1.addEventListener('change', handleFiles, false);
input1.addEventListener('change', handleFilesVideo, false);

const input2 = document.getElementById('imageUserFile');
input2.addEventListener('change', handleFiles, false);
input2.addEventListener('change', handleFilesBase64, false);

const input3 = document.getElementById('videoEnvFile');
input3.addEventListener('change', handleFiles, false);
input3.addEventListener('change', handleFilesVideo, false);

const input4 = document.getElementById('imageEnvFile');
input4.addEventListener('change', handleFiles, false);
input4.addEventListener('change', handleFilesBase64, false);

// 取檔案資訊
function handleFiles(e) {
  const fileData = this.files;
  const data = fileData[0];
  const lastModified = data.lastModified;
  const name = data.name;
  const size = data.size;
  const type = data.type;
  const textarea = document.getElementById(e.target.id + 'Result');
  textarea.value = `
    lastModified: ${lastModified},
    name: ${name},
    size: ${size},
    type: ${type}
  `;
  textarea.classList.remove('hidden');
}

// 轉影片 URL：https://stackoverflow.com/questions/61012790/how-to-read-large-video-files-in-javascript-using-filereader
function handleFilesVideo(e) {
  const fileData = this.files;
  const reader = new FileReader();
  reader.readAsArrayBuffer(fileData[0]);
  reader.addEventListener('load', file => {

    const buffer = file.target.result;
    const videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });
    const url = window.URL.createObjectURL(videoBlob);

    const video = document.getElementById(e.target.id + 'Video');
    video.src = url;
    video.classList.remove('hidden');
  });
}

// 轉圖片 Base64
function handleFilesBase64(e) {
  const fileData = this.files;
  const reader = new FileReader();
  reader.addEventListener('load', file => {
    const img = document.getElementById(e.target.id + 'Image');
    img.src = file.target.result;
    img.classList.remove('hidden');
  });
  reader.readAsDataURL(fileData[0]);
}