// const {clipboard, remote} = require('electron');
// const { app, shell, BrowserWindow, Menu } = require('electron');
const { BrowserWindow } = require('@electron/remote')
const { clipboard } = require("electron");

let indexItems = 0;
let indexPins = 0;
let numItems;
let numPins;

function getNums(){
    let mainWin = BrowserWindow.fromId(2);
    mainWin.webContents.executeJavaScript(
        `document.getElementById('clipboard-id').children.length`
    )
    .then((result) =>{
        numItems = result;
        mainWin.webContents.executeJavaScript(
            `document.getElementById('clipboardPin-id').children.length`
        )
        .then((result) =>{
            numPins = result;
            getClipboard();
        })
    })
}

getNums();

function getClipboard(){
    let mainWin = BrowserWindow.fromId(2);

    if(indexItems >= numItems && numItems > 0){
        indexItems = 0;
        indexPins = 0;
    }else if(indexPins >= numPins && numItems <= 0){
        indexPins = 0;
    }

    if (numItems === 0 && numPins === 0) {
        document.getElementById('clipboard').textContent = "No items in the clipboard.";
    } else if(indexPins < numPins){
        mainWin.webContents.executeJavaScript(
            `document.getElementById('clipboardPin-id').children[${indexPins}].querySelector('p').textContent`
        )
        .then((result) =>{
            document.getElementById('clipboard').textContent = result;
            document.getElementById('clipboard').setAttribute('data-index', indexPins);
            document.getElementById('clipboard').setAttribute('data-type', "pin");
            indexPins++;
        })
    }else{
        if(indexItems < numItems){
            mainWin.webContents.executeJavaScript(
                `document.getElementById('clipboard-id').children[${indexItems}].querySelector('p').textContent`
            )
            .then((result) =>{
                document.getElementById('clipboard').textContent = result;
                document.getElementById('clipboard').setAttribute('data-index', indexItems);
                document.getElementById('clipboard').setAttribute('data-type', "item");
                indexItems++;
            })
        }
    } numItemsnumItems
}


document.addEventListener("keyup", event => {
    let key = event.key;

    if(key == "c" || key == "C"){
        getClipboard();
        // reset timeout
    }else if(key == "Shift" || key =="Control"){
        // add to clipboard and close window
        let text = document.getElementById('clipboard').textContent;
        let index = document.getElementById('clipboard').getAttribute('data-index');
        let type = document.getElementById('clipboard').getAttribute('data-type');
        let mainWin = BrowserWindow.fromId(2);
        if(type == "item"){
            if(index != 0){
                mainWin.webContents.executeJavaScript(
                    `document.getElementById('clipboard-id').children[${index}].remove()`
                )
                .then( ()=> {
                    clipboard.writeText(text);
                    let win = BrowserWindow.getFocusedWindow();
                    win.destroy();
                })
            }else{
                mainWin.webContents.executeJavaScript(
                    `clearInterval(copyIntervalId)`
                )
                .then( ()=> {
                    clipboard.writeText(text);
                    mainWin.webContents.executeJavaScript(
                        `enableClipboardCopy()`
                    ).then( ()=>{
                        let win = BrowserWindow.getFocusedWindow();
                        win.destroy();
                    })
                    
                })
            }
            
        }else if(type =="pin"){
            // stop copying then paste to clipboard then start copying
            mainWin.webContents.executeJavaScript(
                `clearInterval(copyIntervalId)`
            )
            .then( ()=> {
                clipboard.writeText(text);
                mainWin.webContents.executeJavaScript(
                    `enableClipboardCopy()`
                ).then( ()=>{
                    let win = BrowserWindow.getFocusedWindow();
                    win.destroy();
                })
                
            })
        }
        
    }
})
