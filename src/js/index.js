const mammoth = require("mammoth");
const electron = require('electron');
const {app, dialog } = electron.remote;
const fs = require('fs');
const path = require("path");


/* Load html templates
* Node + JS
* Loads html template from separate files and appends to DOM (index.html), synchronous/blocking
* Set the 'template-target' attribute on the div container to add the template <div template-target="example">
* Set the same 'template-target' in corresponding template tag <template template-target="example">
* Parameter: location of the template .html files (string)
* Returns: nothing
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


/*
Loads js file
parameters: string, full link to js file, eg: '/js/file.js'
returns: promise once js file is loaded
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


// Global Variables
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




// Load HTML templates
/*const links = document.querySelectorAll('link[rel="import"]');
links.forEach((link) => {
        let template = link.import.querySelector('template');
        let clone = document.importNode(template.content, true);
        let target = clone.querySelector(".template").dataset.tab;
        document.getElementById(target).appendChild(clone);
});*/







let toastElem = document.getElementById('notiToast');
let toast = new bootstrap.Toast(toastElem,
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

/******** Shared Functions   *******/
function preventDefault(e) {
	e.preventDefault();
  	e.stopPropagation();
}

/******** Vertical Navigation Code  ********/


document.getElementById("navVerticalHtmlLink").addEventListener("click", function() { openTab( "navVerticalHtmlLink", "navVerticalHtml")});
document.getElementById("navVerticalBaseLink").addEventListener("click", function() { openTab( "navVerticalBaseLink", "navVerticalBase")});
document.getElementById("navVerticalContrastLink").addEventListener("click", function() { openTab( "navVerticalContrastLink", "navVerticalContrast")});
document.getElementById("navVerticalCommonLink").addEventListener("click", function() { openTab( "navVerticalCommonLink", "navVerticalCommon")});


function openTab(link, tab) {
    var i, tabcontent, tablinks;
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
