//REQUIRE ELECTRON
/*const { app, BrowserWindow, Menu } = require ("electron");
const url = require ("url");
const path = require ("path");

let mainWindow 

app.on("ready", () => {
    mainWindow = new BrowserWindow({});
    mainWindow.setMenu(null);
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,"/index.html"),
        protocol: "file",
        slashes: true
    }));
    
});*/


// Declare constants
const btnStartRecord = document.getElementById("btnStartRecord");
const btnStopRecord = document.getElementById("btnStopRecord");
const texto = document.getElementById("texto");
const btnPlayText = document.getElementById("btnPlayText");
const btnDelete = document.getElementById("btnDelete");
const alert = document.getElementById("alert");

// Recognition settings
let recognition = new webkitSpeechRecognition();
recognition.lang = "es-ES";
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = () =>{
    const results = event.results;
    const frase = results[results.length-1][0].transcript;
    texto.value += frase;
}

recognition.onend = (event) => {
    console.log("El micro deja de escuchar");
}

// Botton settings
recognition.onerror = (event) => {
    console.log(event.error);
}

btnStartRecord.addEventListener("click",()=>{
    recognition.start();
});

btnStopRecord.addEventListener("click",()=>{
    recognition.abort();
});

btnPlayText.addEventListener("click", () => {
    leerTexto(texto.value);
})

btnDelete.addEventListener("click", ()=>{
    texto.value = "";
})

// Read and speach settings
function leerTexto(texto){
    const speech = new SpeechSynthesisUtterance();
    speech.text = texto;
    speech.volume = 1;
    speech.rate = 0.5;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// Download settings
function download(){
    var text = document.getElementById("texto").value;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "ArcopistProyect.doc";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    $("#alert").show();
 }
