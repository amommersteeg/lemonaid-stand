document.getElementById("closeBtn").addEventListener("click", function (e) {
    window.screen.closeWindow();
}); 

async function getVersion() {
    document.getElementById('aboutVersion').innerHTML = await window.appVersion.getVersion();
}

getVersion();