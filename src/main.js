var inputElement4 = document.getElementById('videoEnvFile');
inputElement4.addEventListener('change', handleFiles, false);
inputElement4.addEventListener('change', handleFilesVideo, false);

var inputElement5 = document.getElementById('imageEnvFile');
inputElement5.addEventListener('change', handleFiles, false);
inputElement5.addEventListener('change', handleFilesBase64, false);

function handleFiles(e) {
  const fileData = this.files;
  const textarea = e.target.id + 'Result';
  const data = fileData[0];
  document.getElementById(textarea).textContent = data;
  console.log(data);
}

// 轉影片 URL：https://stackoverflow.com/questions/61012790/how-to-read-large-video-files-in-javascript-using-filereader
function handleFilesVideo(e) {
  const fileData = this.files;
  const reader = new FileReader();
  reader.readAsArrayBuffer(fileData[0]);
  reader.addEventListener('load', file => {

    let buffer = file.target.result;
    let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });
    let url = window.URL.createObjectURL(videoBlob);

    const videoSrc = e.target.id + 'Video';
    document.getElementById(videoSrc).src = url;
    document.getElementById(videoSrc).classList.remove('hidden');
  });
}

// 轉圖片 Base64
function handleFilesBase64() {
  const fileData = this.files;
  const reader = new FileReader();
  reader.addEventListener('load', file => {
    console.log(file.target.result);
  });
  reader.readAsDataURL(fileData[0]);
}