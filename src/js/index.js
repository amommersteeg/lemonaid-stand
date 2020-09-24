// Load the required Node dependencies
const mammoth = require("mammoth");
const electron = require('electron');
const {app, dialog, globalShortcut} = electron.remote;
const fs = require('fs');
const path = require("path");


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

LoadJS('./js/pages/word2html.js')
LoadJS('./js/pages/base64.js')
LoadJS('./js/pages/contrast.js')
LoadJS('./js/pages/snippet.js')


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
document.getElementById("mainNavSettings").addEventListener("click", function() { openTab(this, "mainTabSettings")});

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
