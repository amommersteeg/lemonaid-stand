const remote = require('electron').remote;

document.getElementById("closeBtn").addEventListener("click", function (e) {
               var window = remote.getCurrentWindow();
               window.close();
               console.log(window)
}); 

document.getElementById('aboutVersion').innerHTML = remote.app.getVersion();