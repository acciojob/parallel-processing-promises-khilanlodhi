//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const loadingdiv = document.getElementById("loading");
const outputdiv = document.getElementById("output");
const errordiv = document.getElementById("error");

function downloadImage(url){
	return new Promise((resolve, reject)=>{
		const img = new Image();
		img.src = url;

		img.onload = ()=> resolve(img);
		img.onerror = ()=> reject(`failed to download : ${url}`);  
	});
}

function downloadImages(urls){
	loadingdiv.style.display = "block";
	outputdiv.innerHTML = "";
	errordiv.innerHTML = "";

	const imagepromises = urls.map(obj => downloadImage(obj.url));  

	Promise.all(imagepromises).then(images => {

		loadingdiv.style.display = "none";

		images.forEach(img => {
			outputdiv.appendChild(img);
		});
	})
	.catch(error=>{
		loadingdiv.style.display = "none";

		errordiv.textContent = error;
	});
}

downloadImages(images);
