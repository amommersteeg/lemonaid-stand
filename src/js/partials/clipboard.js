// Look into using this library https://github.com/sudhakar3697/node-clipboard-event#readme to remove polling
// not working with Linux, refer to API to add feature.
// look at adding image, html, rtf, url;

const { clipboard } = require('electron');

let enableCopy = settingsGlobal.clipboard.enableOnLoad; 
let copyIntervalId;
let lastText;
let lastImage;

if(enableCopy){
    window.clipboardWindow.toggleClipboard(true);
} else {
    window.clipboardWindow.toggleClipboard(false);
}

document.getElementById('clipboardEnable-id').checked = enableCopy;
document.getElementById('clipboardEnable-id').addEventListener("change", (event) =>{
    if(event.currentTarget.checked){
        enableCopy = true;
        enableClipboardCopy();
        window.clipboardWindow.toggleClipboard(true);
    }else{
        enableCopy = false;
        clearInterval(copyIntervalId);
        window.clipboardWindow.toggleClipboard(false);
    }
})
document.getElementById('clipboardClear-id').addEventListener("click", ()=>{
    document.getElementById('clipboard-id').innerHTML = "";
})


function enableClipboardCopy(){
    if(enableCopy){
        lastText = clipboard.readText();
        copyIntervalId = setInterval( () => {
            const text = clipboard.readText();
            // const image = clipboard.readImage();

            if(isTextDiff(lastText, text)){
                let board = document.getElementById('clipboard-id')
                let items = board.childElementCount;
                if(items >= settingsGlobal.clipboard.numItems){
                    board.removeChild(board.lastElementChild);
                }

                lastText = text;
                let card = clipboardComponent();

                board.insertAdjacentHTML('afterbegin', card[0]);
                document.getElementById(card[1]).querySelector('p').textContent = text;
                document.getElementById(card[1]+"-remove").addEventListener('click', (event)=>{
                    let card = event.target.closest('.card');
                    card.remove();
                })
                document.getElementById(card[1]+"-pin").addEventListener('click', (event)=>{
                    let card = event.currentTarget.closest(".card");
                    let parent = card.parentNode;
                    if(parent.id == "clipboard-id"){
                        let pinned = document.getElementById('clipboardPin-id').childElementCount;
                        if(pinned < settingsGlobal.clipboard.numPins){
                            parent.removeChild(card);
                            document.getElementById('clipboardPin-id').appendChild(card);
                            event.currentTarget.classList.add('btn-secondary');
                            event.currentTarget.classList.remove('btn-outline-secondary');
                        }else{
                            document.getElementById('alertToastBody').innerHTML = "There are too many pinned items!";
                            alertToast.show();
                        }
                    }else if(parent.id == "clipboardPin-id"){
                        if(items >= settingsGlobal.clipboard.numItems){
                            board.removeChild(board.lastElementChild);
                        }
                        board.insertBefore(card, board.firstChild);
                        event.currentTarget.classList.remove('btn-secondary');
                        event.currentTarget.classList.add('btn-outline-secondary');
                        
                    }
                })
                document.getElementById(card[1]).addEventListener('click', (event)=>{
                    if(event.target.tagName != "BUTTON" && event.target.tagName != "I"){
                        let text = event.currentTarget.querySelector('p').textContent;
                        clearInterval(copyIntervalId);
                        clipboard.writeText(text);
                        enableClipboardCopy();
                        document.getElementById('alertToastBody').innerHTML = "Copied";
                        alertToast.show();
                    }
                })

                
            }
        }, 1000)
    }    
}
enableClipboardCopy();

function isTextDiff(a, b){
    if(a !== b){
        return true
    }else{
        return false
    }
}

function isImageDiff(a, b){
    if(!a.isEmpty() && !b.isEmpty()){
        if(a.toDataURL() !== b.toDataURL()){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}


function clipboardComponent(){
    let id = 'clipboard' + Date.now();
    let markup = `
        <li class="card m-3" id="${id}">
            <div class="d-flex justify-content-end input-group">
                <button class="btn btn-outline-secondary" type="button" id="${id + '-pin'}"><i class="fas fa-thumbtack"></i></button>
                <button class="btn btn-outline-secondary" type="button" id="${id + '-remove'}"><i class="fas fa-times"></i></button>
            </div>
            <div class="card-body">
                <p class="clipboardItem"></p>
            </div>
        </li>
    `
    return [markup, id];
}
