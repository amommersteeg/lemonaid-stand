//const fs = require('fs');

const fs = require("fs");
let files = fs.readdirSync('src/partials')
files.forEach(file => {
    let html = fs.readFileSync('src/partials/' + file)
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    let templates = doc.getElementsByTagName('template')

    Array.from(templates).forEach(template =>{ 
        let target = template.getAttribute('container-target')
            let parent = document.querySelector('[template-target="'+target+'"]')
            if(parent){
                let clone = template.content.cloneNode(true);
                parent.appendChild(clone)
            }else{
                console.error("Can not find template-target " + target )
            }
    })
})


/*let html = fs.readFileSync('src/pages/word2html.html')
var parser = new DOMParser();
var doc = parser.parseFromString(html, 'text/html');
console.log(doc)*/
// Load templates
/*fetch('/src/pages/word2html.html').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Convert the HTML string into a document object
	var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    console.log(doc)

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});*/