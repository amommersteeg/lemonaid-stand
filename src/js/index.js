// Load the required Node dependencies
const remote = require('@electron/remote/main');
const fs = require('fs');
const Datastore = require('nedb');
const os = require('os');

/* * * Global Variables * * */

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

let db = {};  // database object

// Default settings
let settingsGlobal = {
    darkTheme: false,
    snippet: {
        autoBackup: true,
        backupLocation: `${os.homedir() + '/Downloads'}`,  // Node
        numCards: 20,
    },
    contrast: {
        defaultText: "Lemond-aid Stand is here to help.",
    },
    clipboard: {
        enableOnLoad: true,
        numItems: 10,
        numPins: 5

    },
    apps: [
        {
            id: "word2html",
            title: "Word to HTML",
            icon: "fas fa-file-code",
        },
        {
            id: "contrast",
            title: "Contrast",
            icon: "fas fa-adjust"
        },
        {
            id: "base64",
            title: "Image to Base64",
            icon: "far fa-image"
        },
        {
            id: "snippet",
            title: "Code Snippets",
            icon: "fas fa-table"
        },
        {
            id: "clipboard",
            title: "Clipboard",
            icon: "far fa-clipboard"
        },
    ]

    
}

let settingDefaults = {};
Object.assign(settingDefaults, settingsGlobal)
/* * * Load Settings * * */
fs.closeSync(fs.openSync(__dirname + '/standSettings.db', 'a')) // create the file if it doesn't exist (flag a)
db.settings = new Datastore({ filename: (__dirname + '/standSettings.db')});
db.settings.loadDatabase(function (err) { 
    db.settings.find({}, function(err, docs){
        if(docs.length > 0){
            console.log("Loading settings from file.")
            let doc = docs[0]
            let tempSettings = {
                ...settingsGlobal,
                ...doc

            }
            settingsGlobal.apps.forEach(newApp =>{
                let isNewApp = true;
                for(let i=0; i<tempSettings.apps.length; i++){
                    if(tempSettings.apps[i].id == newApp.id){
                        isNewApp = false;
                        break;
                    }
                }
                if(isNewApp){
                    tempSettings.apps.push(newApp);
                }
            })
            Object.assign(settingsGlobal, tempSettings)
        }    
        loadContent();
    })
});



/**
 * 
 * @param {*} folderPath 
 */
function loadSettings(data){
    let settings = document.querySelectorAll(`[data-settings]`)
    Array.from(settings).forEach(item =>{
        let type = item.type;
        let key = item.getAttribute('data-settings');
        let value = key.split('.').reduce(function(o, key) {
                return o[key];
            }, data);
        if(type == "checkbox"){
            item.checked = value;
        }else if(type == "text"){
            item.value = value;
        }else if(type == "number"){
            item.value = value;
        }
    })

    // Enable SortableJS in settings
    let sortableElem = document.getElementById('sortingApps');
    let sortableList = ""
    settingsGlobal.apps.forEach(app => {
        sortableList = sortableList + `<li class="sortableItem" data-id='${app.id}' data-icon='${app.icon}'>${app.title}</li>`
    })
    sortableElem.innerHTML = sortableList;
    let sortableApp = new Sortable(sortableElem, {

    });

}


/**
 * 
 * @param {*} folderPath 
 */
function saveSettings(){
    let settings = document.querySelectorAll(`[data-settings]`)
    let data = {
        _id: 1,
    }
    try{
        Array.from(settings).forEach(item =>{
            let type = item.type;
            let key = item.getAttribute('data-settings');
            let value = null;
            if(type == "checkbox"){
                value = item.checked;
            }else if(type == "text"){
                value = item.value;
            }else if(type == "number"){
                value = item.value;
            }else if(item.tagName == "OL"){
                list = [];
                if(key == "apps"){
                    item.childNodes.forEach( app => {
                        list.push(
                            {
                                id: app.getAttribute('data-id'),
                                title: app.innerText,
                                icon: app.getAttribute('data-icon')

                            }
                        )
                    })
                }
                value = list;
            }
            var schema = data;                 // a moving reference to internal objects within obj
            var pList = key.split('.');
            var len = pList.length;
            for(var i = 0; i < len-1; i++) {
                var elem = pList[i];
                if( !schema[elem] ) {
                    schema[elem] = {}
                }
                schema = schema[elem];
            }
            schema[pList[len-1]] = value;
        })
    }catch(err){
        console.log(err)
    }
    db.settings.update({ _id: 1 }, data , {multi: false, upsert: true}, function (err, numAffected) {
        if(numAffected == 1){
            Object.assign(settingsGlobal, data)
            document.getElementById('alertToastBody').innerHTML = "Settings saved.";
            alertToast.show();
        }
    })
}

/**
 * 
 * @param {*} folderPath 
 */
function loadSettingDefaults(){
    loadSettings(settingDefaults) 
    document.getElementById('alertToastBody').innerHTML = "Default settings loaded. ";
    alertToast.show();

}


/** 
* Load html template
* Node + JS
* Loads html template from separate files and appends to DOM (index.html), synchronous/blocking
* Set the 'template-target' attribute on the div container to add the template <div template-target="example">
* Set the same 'template-target' in corresponding template tag <template template-target="example">
* @param src string, location of the template .html file name
* @returns nothing
*/
function loadPartial(src){
    const fs = require("fs");
    let html = fs.readFileSync(__dirname + src)
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    let templates = doc.getElementsByTagName('template')

    Array.from(templates).forEach(template =>{ 
        let target = template.getAttribute('template-target')
            let parent = document.querySelector('[template-target="'+target+'"]')
            try{
                if(parent){
                    let clone = template.content.cloneNode(true);
                    parent.appendChild(clone)
                }
            }catch(err){
                console.error(err)
            }
    })
}

/**
* Loads js file
* Node + JS
* loads js files to the DOM in the <head> if they haven't already been loaded
* @param scr String, full link to js file, eg: '/js/file.js'
* @returns promise once js file is loaded
*/
function LoadJS(src){
    filePath = __dirname + src;

    return new Promise( function( resolve, reject ) {
        let scripts = document.getElementsByTagName("script");
        let loaded = false;
        for(let i=0; i<scripts.length; i++){
            if(scripts[i].getAttribute('src') == src){
                loaded = true;
            }
        }
            if(loaded){
                resolve();
                //console.log(src + " is already loaded");
            }else{
                try{
                    var link = document.createElement( 'script' );
                    link.src = filePath;
                    document.head.appendChild( link );
                    link.onload = function() { 
                        resolve(); 
                        //console.log(src + " is loaded");
                    };
                }catch{
                    console.log("Can't find" + src)
                }
                
            }
    } );
}



/* * * Alert Toast * * */

let toastElem = document.getElementById('alertToast');
let alertToast = new bootstrap.Toast(toastElem,
    {
        delay: 2000

    }
);

toastElem.addEventListener('hidden.bs.toast', function () {
    toastElem.classList.remove("active")
})
toastElem.addEventListener('show.bs.toast', function () {
    toastElem.classList.add("active")
})


/* * * Main Nav * * */
// Setup nav
function loadContent(){
    let mainNav = document.getElementById("mainNav");
    let mainTab = document.getElementById("mainTab");
    mainNav.innerHTML = null;
    mainTab.innerHTML = null;
    let numApps=0;

    settingsGlobal.apps.forEach(app => { 
        numApps++;
        let key = "Ctrl+"+numApps
        mainNav.insertAdjacentHTML('beforeend', 
        `<a class="nav-link navVerticalLink" id="${app.id}" href="#" tabindex="-1" data-toggle="tooltip" data-placement="bottom" title="${key}"><i class="${app.icon}"></i></a>`);
        
        mainTab.insertAdjacentHTML('beforeend', 
        `<div class="tab-pane fade paneVertical" id="${app.id}Tab" role="tabpanel" template-target="${app.id}"></div>`)

        document.getElementById(app.id).addEventListener("click", function() { openTab(this, `${app.id + "Tab"}`)});
        // globalShortcut.register(key, () => {
        //     document.getElementById(app.id).click();
        // })
        loadPartial(`/partials/${app.id}.html`)
        LoadJS(`/js/partials/${app.id}.js`)
    })

    // Add settings
    mainNav.insertAdjacentHTML('beforeend', 
        '<a class="nav-link navVerticalLink mt-auto" id="mainNavSettings" href="#" tabindex="-1"><i class="fas fa-cog"></i></a>');

    mainTab.insertAdjacentHTML('beforeend', 
        '<div class="tab-pane fade paneVertical" id="mainTabSettings" role="tabpanel" template-target="settings"></div>');

    document.getElementById("mainNavSettings").addEventListener("click", function() { openTab(this, "mainTabSettings")
        loadSettings(settingsGlobal)
    });
    loadPartial(`/partials/settings.html`)
    document.getElementById('settingsSaveBtn').addEventListener('click', saveSettings)
    document.getElementById('settingsLoadDefaults').addEventListener('click', loadSettingDefaults)

    mainNav.firstElementChild.click();
}

/**
* Opens main tab
* JS
* Loads the tab page, updating the class lists to show active styling
* @param this include the button being clicked
* @param tab string id of the tab to load
* @returns nothing
*/
function openTab(that, tab) {
    let tabContent, tabLink;
    let link = that.id
    tabContent = document.querySelector('.paneVertical.active')
    let positionY = document.getElementById('mainTab').scrollTop;
    if(tabContent){
        tabContent.classList.remove('active');
        tabContent.classList.remove('show');
        localStorage.setItem(tabContent.id, positionY);
    }
    tabLink = document.querySelector('.navVerticalLink.active');
    if(tabLink){
        tabLink.classList.remove('active');
    }
    
    document.getElementById(link).classList.add('active');
    document.getElementById(tab).classList.add('active');
    document.getElementById(tab).classList.add('show');
    document.getElementById('mainTab').scrollTop = localStorage.getItem(tab);
}


/* * * Secondary Nav * * */

/** Allow to cycle through tabs using ctrl+tab
 *  Node
 */
// globalShortcut.register("Ctrl+Tab", () => {
//     let page = document.getElementsByClassName("paneVertical active")[0]
//     let tabs = page.getElementsByClassName("nav-link");

//     if(tabs){
//         for(let i=0; i<tabs.length; i++){
//             if(tabs[i].classList.contains("active")){
//                 let nextTab = i+1
//                 if( nextTab == tabs.length){
//                     nextTab = 0;
//                 }
//                 tabs[nextTab].click()
//                 break;
//             }
//         }
//     }
// })

/** Allow to cycle through tabs the opposite way using ctrl+shift+tab
 *  Node
 */
// globalShortcut.register("Ctrl+Shift+Tab", () => {
//     let page = document.getElementsByClassName("paneVertical active")[0]
//     let tabs = page.getElementsByClassName("nav-link");

//     if(tabs){
//         for(let i=0; i<tabs.length; i++){
//             if(tabs[i].classList.contains("active")){
//                 let nextTab = i-1
//                 if( nextTab < 0){
//                     nextTab = tabs.length-1;
//                 }
//                 tabs[nextTab].click()
//                 break;
//             }
//         }
//     }
// })

// globalShortcut.register("Ctrl+Shift+C", () => {
//     // Loop through the click board starting from pin then top
//     let numItems = document.getElementById('clipboard-id').children.length;
//     let numPins = document.getElementById('clipboardPin-id').children.length;
//     if(numItems > 0 || numPins > 0){
//         if (clipboardWin) {
//             clipboardWin.focus();
//         }else{
//             createClipboardWin();
//         }
//     }
// })


let clipboardWin;
function createClipboardWin(){
    let display = remote.screen.getPrimaryDisplay();
    let screenWidth = display.bounds.width;

    clipboardWin = new remote.BrowserWindow({
      frame: false,
      resizable: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      minimizable: false,
      fullscreenable: false,
      x: screenWidth - 400 + 5,
      y: 5,
      width: 400,
      opacity: 0.8,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        worldSafeExecuteJavaScript: true,
        enableRemoteModule: true,
      }
    })
    clipboardWin.loadFile('src/windows/clipboard.html')
    clipboardWin.on('closed', function() {
        clipboardWin = null;
    })
    clipboardWin.on('blur', function(){
        clipboardWin.close();
    })
  }



document.addEventListener("keydown", event => {
    switch(event.key){
        case "Escape":
            const modal = document.querySelector('.modal.show');
            if(modal) modal.hide();
    }
})


/* * * Shared Functions * * */
function preventDefault(e) {
	e.preventDefault();
  	e.stopPropagation();
}



// Enable Tooltips Globally
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, {
    delay: { "show": 500, "hide": 0 },
    trigger: "hover"
  })
})


