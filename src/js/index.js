// Load the required Node dependencies
const mammoth = require("mammoth");
const electron = require('electron');
const {app, dialog, globalShortcut} = electron.remote;
const fs = require('fs');
const path = require("path");
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
let settings = {
    snippet: {
        autoBackup: true,
        backupLocation: `${os.homedir() + '/Desktop'}`,  // Node
        numCards: 20,
    }
    
}
let settingDefaults = {};
Object.assign(settingDefaults, settings)

/* * * Load Settings * * */
db.settings = new Datastore({ filename: 'standSettings.db'});
db.settings.loadDatabase(function (err) { 
    db.settings.find({}, function(err, docs){
        if(docs.length > 0){
            let doc = docs[0]
            Object.assign(settings, doc)
        }
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

    db.settings.update({ _id: 1 }, data , {multi: false, upsert: true}, function (err, numAffected) {
        if(numAffected == 1){
            document.getElementById('alertToastBody').innerHTML = "Settings saved";
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
}


/** 
* Load html templates
* Node + JS
* Loads html template from separate files and appends to DOM (index.html), synchronous/blocking
* Set the 'template-target' attribute on the div container to add the template <div template-target="example">
* Set the same 'template-target' in corresponding template tag <template template-target="example">
* @param folderPath location of the template .html files (string)
* @returns nothing
*/
function loadPartials(folderPath){
    const fs = require("fs");
    let files = fs.readdirSync(folderPath)

    files.forEach(file => {
        if(folderPath.substring(0, folderPath.length-1) != "/"){
            folderPath = folderPath + "/"
        }
        let html = fs.readFileSync(folderPath + file)
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        let templates = doc.getElementsByTagName('template')

        Array.from(templates).forEach(template =>{ 
            let target = template.getAttribute('template-target')
                let parent = document.querySelector('[template-target="'+target+'"]')
                if(parent){
                    let clone = template.content.cloneNode(true);
                    parent.appendChild(clone)
                }else{
                    console.error("Can not find template-target " + target )
                }
        })
    })
}

loadPartials('src/partials/') //execute function


/**
* Loads js file
* JS
* loads js files to the DOM in the <head> if they haven't already been loaded
* @param scr String, full link to js file, eg: '/js/file.js'
* @returns promise once js file is loaded
*/
function LoadJS(src){
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
                var link = document.createElement( 'script' );
                link.src = src;
                document.head.appendChild( link );
                link.onload = function() { 
                    resolve(); 
                    //console.log(src + " is loaded");
                };
            }
    } );
}

LoadJS('./js/partials/word2html.js')
LoadJS('./js/partials/base64.js')
LoadJS('./js/partials/contrast.js')
LoadJS('./js/partials/snippet.js')


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

/** Event Listeners for Nav Buttons */
document.getElementById("mainNavHtml2Word").addEventListener("click", function() { openTab(this, "mainTabHtml2Word")
    tinymce.get('tinymce').focus();
});
document.getElementById("mainNavBase64").addEventListener("click", function() { openTab(this, "mainTabBase64")});
document.getElementById("mainNavContrast").addEventListener("click", function() { openTab(this,  "mainTabContrast")});
document.getElementById("mainNavSnippet").addEventListener("click", function() { openTab( this, "mainTabSnippet")});
document.getElementById("mainNavSettings").addEventListener("click", function() { openTab(this, "mainTabSettings")
    loadSettings(settings)  
});

/**
* Opens main tab
* JS
* Loads the tab page, updating the class lists to show active styling
* @param this include the button being clicked
* @param tab string id of the tab to load
* @returns nothing
*/
function openTab(that, tab) {
    let i, tabcontent, tablinks;
    let link = that.id
    tabcontent = document.getElementsByClassName("paneVertical");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('active');
      tabcontent[i].classList.remove('show');
    }
    tablinks = document.getElementsByClassName("navVerticalLink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }
    document.getElementById(link).classList.add('active');
    document.getElementById(tab).classList.add('active');
    document.getElementById(tab).classList.add('show');
}

/** Add shortcut keys the main nav
 *  Node
 */ 
let navLinks = document.getElementById("mainNav").children
for(let i=0; i<navLinks.length; i++){
    let key = 'Ctrl+' + (i+1);
    globalShortcut.register(key, () => {
        navLinks[i].click();
    })
}

/* * * Secondary Nav * * */

/** Allow to cycle through tabs using ctrl+tab
 *  Node
 */
globalShortcut.register("Ctrl+Tab", () => {
    let page = document.getElementsByClassName("paneVertical active")[0]
    let tabs = page.getElementsByClassName("nav-link");

    if(tabs){
        for(let i=0; i<tabs.length; i++){
            if(tabs[i].classList.contains("active")){
                let nextTab = i+1
                if( nextTab == tabs.length){
                    nextTab = 0;
                }
                tabs[nextTab].click()
                break;
            }
        }
    }
})

/** Allow to cycle through tabs the opposite way using ctrl+shift+tab
 *  Node
 */
globalShortcut.register("Ctrl+Shift+Tab", () => {
    let page = document.getElementsByClassName("paneVertical active")[0]
    let tabs = page.getElementsByClassName("nav-link");

    if(tabs){
        for(let i=0; i<tabs.length; i++){
            if(tabs[i].classList.contains("active")){
                let nextTab = i-1
                if( nextTab < 0){
                    nextTab = tabs.length-1;
                }
                tabs[nextTab].click()
                break;
            }
        }
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


document.getElementById('settingsSaveBtn').addEventListener('click', saveSettings)
document.getElementById('settingsLoadDefaults').addEventListener('click', loadSettingDefaults)



