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
var mammoth = require("mammoth");
const remote = require('@electron/remote');
const fs = require('fs');
const path = require("path");

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

/******** Word to HTML Code ********/
tinymce.init({
    selector: '#tinymce',
    height: "100%",
    scroll: true,
    resize: false,
    plugins: 'print preview paste importcss code searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons', //quickbars
    mobile: {
        plugins: 'paste importcss code searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap hr nonbreaking insertdatetime advlist lists wordcount  textpattern noneditable help charmap linkchecker emoticons'  //quickbars
    },
    menu: {
        file: { title: 'File', items: 'newdocument | preview | print ' },
        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
        view: { title: 'View', items: 'visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
        insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | blockformats | removeformat' },
        table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
        tools: { title: 'Tools', items: 'code wordcount' },
        help: { title: 'Help', items: 'help' }
    },
    toolbar: 'undo redo | bold italic underline strikethrough removeformat| formatselect | outdent indent | numlist bullist checklist  | charmap emoticons | image link | fullscreen',
    block_formats: 'Paragraph=p; Div =div; Blockquote=blockquote; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6;',
    //quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    toolbar_mode: 'sliding',

    // Create custom templates for regular tasks,
    templates: [
        { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
        { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
        { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',



    // Have not updated from Default Settings
    image_advtab: true,
    image_caption: true,
    link_list: [
        { title: 'My page 1', value: 'http://www.tinymce.com' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
        { title: 'My page 1', value: 'http://www.tinymce.com' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
        { title: 'None', value: '' },
        { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    noneditable_noneditable_class: 'mceNonEditable',
    
});

let codemirrorContainer = document.getElementById('codemirror');

let codeEditor = CodeMirror.fromTextArea(codemirrorContainer, {
    lineNumbers: true,
    mode: 'htmlmixed',
    showCursorWhenSelecting: true,
    styleActiveLine: true,
    foldGutter: true,
    dragDrop : true,
    autoRefresh: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    selfContain: true,
    lineWrapping: false,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
})

function copyText(that){
    let panel = document.querySelector('#nav-tabContent > .active')
    if(!(that.id == (panel.id + "-tab"))){
        if(that.id == "nav-html-tab"){
            let content = tinymce.get('tinymce').getContent();
            let cleanContent = codeBeautify(content)
            codeEditor.getDoc().setValue(cleanContent);
            setTimeout(function(){
                codeEditor.refresh()
            }, 500);
        }else if(that.id == "nav-word-tab"){
            let content = codeEditor.getDoc().getValue();
            tinymce.get('tinymce').setContent(content);
        } 
    }
}

function codeWrapLine(element){
    let state = codeEditor.getOption("lineWrapping");
    if(state){
        codeEditor.setOption("lineWrapping", false);
        element.classList.add('btn-outline-secondary');
        element.classList.remove('btn-secondary', 'active');
    }else{
        codeEditor.setOption("lineWrapping", true);
        element.classList.add('btn-secondary', 'active');
        element.classList.remove('btn-outline-secondary');
    }
}

function codeUndoRedo(flag){
    if(flag == true){
        codeEditor.undo()
    }else{
        codeEditor.redo()
    }
}

function codeBeautify(code){
    let settings = {}
    return html_beautify(code, settings)
}

function codeCopyAll(){
    let text = codeEditor.getDoc().getValue();
    navigator.clipboard.writeText(text);
    document.getElementById('toastBody').innerHTML = "Code Copied";
    toast.show();
}


function codeConvertFile(filePath) {
    if(path.extname(filePath) == ".docx" || path.extname(filePath) == ".doc"){
        mammoth.convertToHtml({path: filePath})
        .then(function(result){
            var html = result.value; // The generated HTML
            //console.log(html);
            let cleanHTML = codeBeautify(html)
            codeEditor.getDoc().setValue(cleanHTML);
            setTimeout(function(){
                codeEditor.refresh()
            }, 600);
            copyText(document.getElementById("nav-word-tab"))
            var messages = result.messages;
            document.getElementById('codeUploadMessage').innerHTML = "";
            if(messages.length > 0){
                let messageText = "";
                for(let i=0; i<messages.length; i++){
                    messageText += messages[i] + '\n';
                }
                document.getElementById('codeUploadMessage').innerHTML = messageText;
            }
            document.getElementById('toastBody').innerHTML = "File Conversion Complete";
            toast.show();
            let htmlTab = document.getElementById('nav-html-tab')
            let tab = new bootstrap.Tab(htmlTab)
            tab.show()
        })
        .done();
    }else{
        document.getElementById('codeUploadMessage').innerHTML = "Error: Must be a .docx or .doc Word file";
    }
}

let codeFakeInput = document.createElement("button");
let codeUploadRegion = document.getElementById("codeUploadRegion")
codeUploadRegion.addEventListener('click', function() {
	codeFakeInput.click();
});

codeFakeInput.addEventListener("click", function(event) {
    remote.dialog.showOpenDialog(remote.getCurrentWindow(),{
        properties: ['openFile'],
        filters: [
            { name: 'Word', extensions: ['docx', 'doc' ]},
        ]
    
    })
    .then(result => {

        // checks if window was closed
        if (result.canceled) {
            console.log("No file selected!")
        } else {
            // convert process
            const filePath = result.filePaths[0];
            codeConvertFile(filePath);
        }
    })
});

codeUploadRegion.addEventListener('drop', (event) => { 
    preventDefault(event);

    for (const f of event.dataTransfer.files) { 
        codeConvertFile(f.path)
      } 
}); 
  
codeUploadRegion.addEventListener('dragover', preventDefault, false)
codeUploadRegion.addEventListener('dragenter', preventDefault, false)
codeUploadRegion.addEventListener('dragleave', preventDefault, false)



document.getElementById("nav-word-tab").addEventListener("click", function(){ copyText(document.getElementById("nav-word-tab")) });
document.getElementById("nav-html-tab").addEventListener("click", function(){ copyText(document.getElementById("nav-html-tab")) });
document.getElementById("codeUndoBtn").addEventListener("click", function(){ codeUndoRedo(true) });
document.getElementById("codeUndoBtn").addEventListener("click", function(){ codeUndoRedo(true) });
document.getElementById("codeRedoBtn").addEventListener("click", function(){ codeUndoRedo(false) });
document.getElementById("codeWrapLineBtn").addEventListener("click", function(){ codeWrapLine(document.getElementById("codeWrapLineBtn")) });
document.getElementById("codeCopyBtn").addEventListener("click", codeCopyAll);
//document.getElementById("codeUploadBtn").addEventListener("click", codeUploadFile);



/******** Image to Base 64 Code ********/
// https://blog.soshace.com/the-ultimate-guide-to-drag-and-drop-image-uploading-with-pure-javascript/
var // where files are dropped + file selector is opened
	dropRegion = document.getElementById("baseUploadRegion"),
	// where images are previewed
	imagePreviewRegion = document.getElementById("image-preview");


// open file selector when clicked on the drop region
var fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image/*";
fakeInput.multiple = true;
dropRegion.addEventListener('click', function() {
	fakeInput.click();
});

fakeInput.addEventListener("change", function(event) {
    var files = fakeInput.files;
    handleFiles(files);
    event.target.value = null;
});


dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)


function handleDrop(e) {
	var dt = e.dataTransfer,
		files = dt.files;

    handleFiles(files);
    e.target.value = null;		
}

dropRegion.addEventListener('drop', handleDrop, false);



function handleFiles(files) {
    document.getElementById('image-message').innerHTML = "Processing Image..."
	for (var i = 0, len = files.length; i < len; i++) {
		if (validateImage(files[i])){
            previewImage(files[i])
        }
			
	}
}

function validateImage(image) {
	// check the type
	var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
	if (validTypes.indexOf( image.type ) === -1) {
		document.getElementById('image-message').innerHTML = "Invalid File Type";
		return false;
	}

	// check the size
	var maxSizeInBytes = 10e6; // 10MB
	if (image.size > maxSizeInBytes) {
		document.getElementById('image-message').innerHTML = "Image Too Big";
		return false;
	}
	return true;
}


function previewImage(image){
    var parent = document.querySelector('#image-preview');
  
      // Make sure `file.name` matches our extensions criteria
      if ( /\.(jpe?g|png|gif)$/i.test(image.name) ) {
        var reader = new FileReader();
  
        reader.addEventListener("load", function (event) {
            image.src = this.result;
            let item = `
                <div>
                    <button class="btn btn-outline-secondary" id="baseImageCloseBtn"><i class="fas fa-times"></i></button>
                    <img class="image-view" title="${image.name}" src="${image.src}">
                    <p>Name:${image.name}</p>
                    <p>Size:${formatBytes(image.size)}</p>
                    <textarea>${image.src}</textarea>
                    <button class="btn btn-outline-secondary" id="baseImageCopyBtn">Copy Text</button>
                </div>`
            parent.insertAdjacentHTML('beforeend', item);
            document.getElementById('image-message').innerHTML = "";
            document.getElementById('baseImageCopyBtn').addEventListener('click', function(event){ 
                imageCopy(event.target);
            })
            document.getElementById('baseImageCloseBtn').addEventListener('click', function(event){ 
                document.getElementById('image-preview').innerHTML = "";
            })
        });
  
        reader.readAsDataURL(image);
      }else{
        document.getElementById('photo').classList.add('is-invalid');
      }
}

//https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes, decimals = 0) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function imageCopy(element){
    let text = element.parentNode.querySelector('textarea').value
    navigator.clipboard.writeText(text);
    document.getElementById('toastBody').innerHTML = "Text Copied";
    toast.show();
}


/******** WebAim Contrast Code ********/
const backgroundElement = document.querySelector('#background');

const background = new Pickr({
    el: backgroundElement,
    useAsButton: true,
    default: 'white',
    theme: 'classic',
    lockOpacity: true,
    padding: 8,
    inline: false,
    autoReposition: false,
    defaultRepresentation: 'HEX',
    position: 'right-end',

    swatches: [],

    components: {
      preview: true,
      opacity: false,
      hue: true,

      interaction: {
        input: true,
        cancel: true,
        save: true
      }
    }
}).on('init', pickr => {
    let backgroundColor = pickr.getSelectedColor().toHEXA();
    backgroundElement.querySelector('input').value = backgroundColor;
    backgroundElement.querySelector('div').style.backgroundColor = backgroundColor;
}).on('save', (color, pickr) => {
    let backgroundColor = color.toHEXA().toString();
    pickr.addSwatch(backgroundColor)
    backgroundElement.querySelector('input').value = backgroundColor;
    backgroundElement.querySelector('div').style.backgroundColor = backgroundColor;
    let previewText = document.querySelectorAll('.previewText');
    previewText.forEach(text => {
        text.style.backgroundColor = backgroundColor;
     })
    background.hide();
    let foregroundColors = document.querySelectorAll('.foregroundColors');
    foregroundColors.forEach( colorDiv => {
        let color = colorDiv.querySelector('.colorText').value;
        let ratio = calculateRatio(backgroundColor, color);
        updateRating(colorDiv, ratio)
    })
})

const foregroundContainer = document.querySelector('#foreground')
const foregroundBtn = document.querySelector('#foregroundBtn');

foregroundBtn.addEventListener('click', () => {
    let template = `
        <div class='foregroundColors'>
            <div class="colorBox"></div>
            <input type="text" class="colorText">
            <div class="ratio"></div>
            <p class="previewText previewText--sm">The five boxing wizards jump quickly.</p>
            <div class="contrastRating contrastRating--sm"></div>
            <p class="previewText previewText--lg">The five boxing wizards jump quickly.</p>
            <div class="contrastRating contrastRating--lg"></div>
            <p class="previewText"><i class="fas fa-check-square"></i></p>
            <div class="contrastRating contrastRating--gph"></div>
        </div>`

    foregroundContainer.insertAdjacentHTML('beforeend', template);
    let newElement = foregroundContainer.lastChild;
  
    const pickr = new Pickr({
        el: newElement,
        useAsButton: true,
        default: 'black',
        theme: 'classic',
        lockOpacity: true,
        padding: 8,
        inline: false,
        autoReposition: false,
        defaultRepresentation: 'HEX',
        position: 'right-end',

        swatches: [],

        components: {
            preview: true,
            opacity: false,
            hue: true,

            interaction: {
                input: true,
                cancel: true,
                save: true
            }
        }
    }).on('init', pickr => {
        let color = pickr.getSelectedColor().toHEXA().toString();
        newElement.querySelector('input').value = color;
        newElement.querySelector('div').style.backgroundColor = color;
        let backgroundColor = document.querySelector('#background > input').value;
        let previewText = newElement.querySelectorAll('.previewText');
        previewText.forEach(text => {
            text.style.color = color;
            text.style.backgroundColor = backgroundColor;
        })
        let ratio = calculateRatio(backgroundColor, color);
        updateRating(newElement, ratio)
    }).on('save', (color, pickr) => {
        color = color.toHEXA().toString();
        pickr.addSwatch(color)
        newElement.querySelector('input').value = color;
        let backgroundColor = document.querySelector('#background > input').value;
        newElement.querySelector('div').style.backgroundColor = color;
        let previewText = newElement.querySelectorAll('.previewText');
        previewText.forEach(text => {
            text.style.color = color;
        })
        pickr.hide();
        let ratio = calculateRatio(backgroundColor, color);
        updateRating(newElement, ratio)
    })
});
  
foregroundBtn.click();

// function from https://stackoverflow.com/a/5624139/3695983
function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
  
// function from https://stackoverflow.com/a/9733420/3695983                     
function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
        ? v / 12.92
        : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}


function calculateRatio(color1, color2){
    const color1rgb = hexToRgb(color1);
    const color2rgb = hexToRgb(color2);

    // calculate the relative luminance
    const color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
    const color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);
    
    // calculate the color contrast ratio
    const ratio = color1luminance > color2luminance 
        ? ((color2luminance + 0.05) / (color1luminance + 0.05))
        : ((color1luminance + 0.05) / (color2luminance + 0.05));
    
    return ratio;
}

function updateRating(container, ratio){
    let smallText = container.querySelector('.contrastRating--sm');
    let largeText = container.querySelector('.contrastRating--lg');
    let gphText = container.querySelector('.contrastRating--gph');
    let ratioText = container.querySelector('.ratio');

    ratioText.innerHTML = ` 
        ${Math.floor(1/ratio* 100) / 100} : 1 
    `
    smallText.innerHTML = `
        AA-level small text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }<br>
        AAA-level small text: ${ratio < 1/7 ? 'PASS' : 'FAIL' }`;
    largeText.innerHTML = `
        AA-level large text: ${ratio < 1/3 ? 'PASS' : 'FAIL' }<br>
        AAA-level large text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }`;
    gphText.innerHTML = `
     AA-level user interface: ${ratio < 1/3 ? 'PASS' : 'FAIL' }<br>
    `
}

/********  Code Snippet Table Code  ************/
/* Data structure 
* undefined will not be saved, empty items need to be set as Null
    Notes [array]
        title (string)
        _id (string based on date/time created)
        description (string)
        createdOn (Date)
        tags (array)
            [string]
        files (array)
            filename (string)
            language (string)
            code (string)
        isFav (boolean)
    
    Tags [array]
        [string]
*/

const NUMCARDS = 4;
let AUTOBACKUP = true;
let SEARCHPARAM;

/*function loadTooltips(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}*/

let snippetTagifyElement = document.getElementById('snippetEditTags')
let snippetTagify = new Tagify(snippetTagifyElement, {
    whitelist: ["Unicode", ],
    maxTags: 5,
    dropdown: {
      maxItems: 10,           
      classname: "tags-look", 
      enabled: 0,    
      closeOnSelect: true  
    }
})


let snippetReplaceTagifyElement = document.getElementById('snippetTagReplaceOld')
let snippetReplaceTagify = new Tagify(snippetReplaceTagifyElement, {
    whitelist: snippetTagify.settings.whitelist,
    maxTags: 1,
    mode: 'single',
    dropdown: {
        maxItems: 10,           
        classname: "tags-look", 
        enabled: 0,    
        closeOnSelect: true  
    }
})

let Datastore = require('nedb');
const { brotliDecompress } = require("zlib");
let db = {};
db.notes = new Datastore({ filename: 'snippetNotes.db'});
db.settings = new Datastore({ filename: 'standSettings.db'});

db.settings.loadDatabase(function (err) {    // Callback is optional
    db.settings.findOne({title: 'tags'}, function (err, doc) {
        if(doc){
            snippetTagify.settings.whitelist = doc.tags;
            snippetReplaceTagify.settings.whitelist = snippetTagify.settings.whitelist;
            snippetLoadFilterTags(doc.tags) 
            // console.log(snippetTagify.settings.whitelist)
        }
    });
    db.settings.find({}, function (err, docs) {
        // console.log(docs)
    })
});


  

// Get all docs
db.notes.loadDatabase(function (err){
    snippetLoadNotes({}, 0, NUMCARDS)

    if(AUTOBACKUP){
        db.notes.find({}, function (err, docs) {
            let json = {
                "name": "Lemon-Aid Stand Notes - Autobackup",
                "version": remote.app.getVersion(),
                "exportDate": new Date(),
                "notes": docs
            }
            let fileData = JSON.stringify(json)
            let filepath = __dirname + "/Lemon-Aid Stand Note - Autobackup." + Date.now() + ".json"
            fs.writeFile(filepath, fileData, function(err) {
                // console.log(err)
                if(err == null){
                    document.getElementById('toastBody').innerHTML = "Notes autobacked up";
                    toast.show();
                }
            }); 
        });
        
    }
})

function snippetLoadFilterTags(tags){
    document.getElementById("snipperTagFilter").innerHTML = "";
    let TagObj = document.createElement("option");
    TagObj.textContent = "Tag - Clear";
    TagObj.value = "tag"
    document.getElementById("snipperTagFilter").appendChild(TagObj);

    tags.forEach( function(item) { 
        let optionObj = document.createElement("option");
        optionObj.textContent = item;
        document.getElementById("snipperTagFilter").appendChild(optionObj);
    });
}

function snippetLoadNotes(searchParam, skip, limit, clearParent=false){
    SEARCHPARAM = searchParam;
    // console.log("Search Param");
    // console.log(searchParam)
    db.notes.find(searchParam).sort({ createdOn: -1 }).skip(skip).limit(limit).exec(function (err, docs) {
        // console.log(docs)
        if(docs.length > 0){
            
            let parent = document.getElementById('snippetNoteList')
            if(clearParent == true){
                parent.innerHTML = "";
            }
            docs.forEach(doc => {
                let listItem = snippetNoteComponent(doc)
                parent.insertAdjacentHTML("beforeend", listItem)
            })
            // enable all codeMirrors
            let textareas = document.getElementsByClassName('snippetFileEditor')
            snippetCreateSnippet(textareas)


            //snippetUpdatePagination(0, '{}')
            db.notes.count(searchParam, function (err, count) {
                if((skip+limit) >= count){
                    document.getElementById('snippetLoadMoreBtn').disabled = true;
                }else{
                    document.getElementById('snippetLoadMoreBtn').disabled = false;
                }
            })

            //enable all events
            let notes = document.getElementsByClassName('card')
            for(let i=0; i<notes.length; i++){
                snippetAddEventListeners(notes[i])
            }
            if(clearParent == false){
                if(parent.getElementsByClassName('card').length > 0){
                    parent.getElementsByClassName('card')[(skip)].focus()
                }
            }
        }
        
    });
}
document.getElementById('snippetLoadMoreBtn').addEventListener('click', snippetLoadMoreNotes)
function snippetLoadMoreNotes(){
    let skip = document.getElementById('snippetNoteList').getElementsByClassName('card').length;
    snippetLoadNotes(SEARCHPARAM, skip, NUMCARDS, false)
}


function snippetTagComponent(tag) {
    return `<span class="badge bg-light text-dark">${tag}</span>`
} 

function snippetFileComponent(file) {
    return `
        <li>
            <div class="d-flex justify-content-between align-items-end mx-1">
                <small class="text-muted snippetFilename">${file.filename}</small>
                <div>
                    <small class="text-muted snippetFileLanguage">${file.language}</small>
                    <div class="btn-group" role="group">
                        <button class="btn btn-link snippetFileView"><i class="far fa-eye"></i></button>
                        <button class="btn btn-link snippetFileCopy"><i class="far fa-copy"></i></button>
                    </div>
                </div>
            </div>
            <textarea class="snippetFileEditor" data-type="${file.language}">${file.code}</textarea>
        </li>
    `
}

function snippetNoteComponent(note) {
    // update if isFav, format createdOn string
    let date = "";
    let tags = "";
    let files = "<p>There are no files pinned with this note.</p>";
    let favIcon = '<i class="far fa-heart"></i>';
    let favTooltip = "Add as Favourite";
    let favData = false;

    if ('tags' in note){
        note.tags.forEach(tag => {
            tags += snippetTagComponent(tag)
        })
    }

    if('files' in note){
        if(note.files.length > 0 ){
            files = "";
            note.files.forEach(file => {
                files += snippetFileComponent(file);
            })
        }
    }

    if('isFav' in note){
        if(note.isFav){
            favIcon = '<i class="fas fa-heart"></i>';
            favTooltip = "Remove as Favourite";
            favData = true;
        }
    }

    if ('updatedOn' in note){
        let updatedOn = new Date(note.updatedOn)
        date = `Updated ${MONTHS[updatedOn.getMonth()]} ${updatedOn.getDate()}, ${updatedOn.getFullYear()}`
    }else{
        if('createdOn' in note){
            let createdOn = new Date(note.createdOn)
            date = `Created ${MONTHS[createdOn.getMonth()]} ${createdOn.getDate()}, ${createdOn.getFullYear()}`
        }
    }
    

    let markup = `
        <li id="${note._id}" class="card my-2" tabindex='-1'>
            <div class="card-body">
                <div class="d-flex flex-row justify-content-between mb-1">
                    <h5 class="card-title snippetNoteTitle">${note.title}</h5>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-secondary snippetNoteFav" data-fav=${favData} data-bs-toggle="tooltip" data-placement="bottom" title="${favTooltip}">${favIcon}</button>
                        <button type="button" class="btn btn-secondary snippetNoteEdit" data-bs-toggle="tooltip" data-placement="bottom" title="Edit Note"><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-secondary snippetNoteDelete" data-bs-toggle="tooltip" data-placement="bottom" title="Delete Note"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            
                <p class="card-text snippetNoteDescription">${note.description}</p>
                <div class="d-flex flex-row" >
                    <div class="d-flex flew-row snippetNoteTags">${tags}</div>
                    <p class="card-text ml-auto"><small class="text-muted snippetNoteDate">${date}</small></p>
                </div>
                
                <hr>
                <ul class="m-1 snippetFiles listNoStyle">${files}</ul>
            </div
        </li>
    `
    return markup
}


function snippetEditFileComponent(file){
    let filename = "";
    let language = "";
    let code = "";

    if(file != null ){
        filename = file.filename
        language = file.language
        code = file.code
    }
    let markup = ` 
        <li class="mb-4">
            <div class="d-flex justify-content-end mb-1">
                <button class="btn btn-outline-secondary btn-sm snippetEditRemove"><i class="fas fa-times"></i></button>
            </div>
            <div class="mb-2 row">
                <label for="snippetEditFilename" class="form-label col-sm-4">Filename</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="snippetEditFilename" placeholder="Add filename with extension" value="${filename}">
                </div>
            </div>
            <div class="mb-2 row">
                <label class="form-label col-sm-4">Language</label>
                <div class="col-sm-8">
                    <select class="form-select form-select-sm snippetEditLanguage" aria-label=".form-select-sm example">
                        <option value="text" ${language == "text" ? "selected" : "" }>Text</option>
                        <option value="htmlmixed" ${language == "htmlmixed" ? "selected" : "" }>HTML</option>
                        <option value="javascript" ${language == "javascript" ? "selected" : "" }>Javascript</option>
                        <option value="css" ${language == "css" ? "selected" : "" }>CSS</option>
                    </select>
                </div>
            </div>
            <textarea class="snippetEditEditor">${code}</textarea>
        </li>
    `
    return markup;
}


function createSnippetEditEditor(textarea, mode="text"){
    CodeMirror.fromTextArea(textarea, {
        mode: mode,
        lineNumbers: true,
        autoRefresh: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
    });
}

function snippetEditLanguageListener(element){
    let language = element.value;
    let editor = element.closest("li").getElementsByClassName('CodeMirror')[0]
    editor.CodeMirror.setOption("mode", language)
}

document.getElementById('snippetDeleteBtn').addEventListener('click', snippetDeleteNote )

function snippetCreateSnippet(textareas){
    for(let i=0; i<textareas.length; i++){
        if(textareas[i].style.display != "none"){
            let mode = textareas[i].getAttribute('data-type')
            CodeMirror.fromTextArea(textareas[i], {
                mode: mode,
                lineNumbers: true,
                autoRefresh: true,
                styleActiveLine: true,
                theme: "default snippet",
                readOnly: true,
            });
        }
    }
}

function snippetDeleteLoad(event){
    let parent = event.target.closest('li')
    let id = parent.getAttribute('id')
    let title = parent.getElementsByClassName('snippetNoteTitle')[0].innerHTML
    document.getElementById('snippetDeleteInner').innerHTML = title;
    document.getElementById('snippetDeleteBtn').setAttribute('data-target', id);
    let deleteModal = new bootstrap.Modal(document.getElementById('snippetDeleteCode'),{})
    deleteModal.show();
}

function snippetDeleteNote(event){
    let id = event.target.getAttribute('data-target')
    db.notes.remove({ _id: parseInt(id) }, {}, function (err, numRemoved) {
        if(numRemoved > 0){
            document.getElementById('snippetNoteList').removeChild(document.getElementById(id));
            document.getElementById('toastBody').innerHTML = "Note deleted";
            toast.show();
        }
    });
}

function snippetViewFile(event){
    let item = event.target.closest('li')
    let editor = item.getElementsByClassName('CodeMirror')[0]
    let code = editor.CodeMirror.getDoc().getValue();
    let language = item.getElementsByClassName('snippetFileLanguage')[0].innerHTML;
    let filename = item.getElementsByClassName('snippetFilename')[0].innerHTML;

    let viewModalElem = document.getElementById('snippetViewCode')
    viewModalElem.getElementsByClassName('snippetFileLanguage')[0].innerHTML = language;
    viewModalElem.getElementsByClassName('snippetFilename')[0].innerHTML = filename;

    snippetViewEditor.setOption("mode", language)
    snippetViewEditor.getDoc().setValue(code);
    setTimeout(function(){
        snippetViewEditor.refresh()
    }, 500);

    let viewModal = new bootstrap.Modal(viewModalElem,{})
    viewModal.show();
}

let snippetViewEditor = CodeMirror.fromTextArea(document.getElementById('snippetViewCodeEditor'), {
    mode: "text",
    lineNumbers: true,
    autoRefresh: true,
    styleActiveLine: true,
    theme: "default snippetView",
    readOnly: true,
});

document.getElementById('snippetViewCopy').addEventListener('click', snippetCopyFile)

function snippetCopyFile(event){
    let item = event.target.closest('li')
    if(item == null){
        item = event.target.closest('.modal-body')
    }
    let editor = item.getElementsByClassName('CodeMirror')[0]
    let code = editor.CodeMirror.getDoc().getValue();
    navigator.clipboard.writeText(code);
    document.getElementById('toastBody').innerHTML = "Code Copied";
    toast.show();
}


function snippetEditRemoveListener(element){
    let parent = element.closest('li')
    let language = parent.getElementsByClassName('snippetEditLanguage')
    language[0].removeEventListener('change', snippetEditLanguageListener)
    let list = document.getElementById('snippetEditFiles')
    list.removeChild(parent);
}

let snippetAddBtns = document.getElementsByClassName('snippetAddBtn')

document.querySelectorAll('.snippetAddBtn').forEach(item => {
    item.addEventListener('click', snippetEditAddNote)
})

document.getElementById('snippetEditAddSnippetBtn').addEventListener('click', () => snippetEditAddFile(null, document.getElementById('snippetEditFiles')) )
document.getElementById('snippetEditSaveBtn').addEventListener('click', () => snippetEditSaveNote() )
document.getElementById('snippetTagReplaceBtn').addEventListener('click', snippetReplaceTag )

function snippetEditSaveNote(){
    let files = [];
    let tags = [];
    let editModalElem = document.getElementById('snippetEditModal')
    let id = editModalElem.getAttribute('data-target')
    let fav = editModalElem.getAttribute('data-fav')
    let isNewDoc = true;

    if(id == null || id == ""){
        id = Date.now()
    }else{
        isNewDoc = false;
    }

    if(fav == null){
        fav = false;
    }
    
    for(let i=0; i<snippetTagify.value.length; i++){
        tags.push(snippetTagify.value[i].value);
    }

    let fileList = document.querySelectorAll('#snippetEditFiles > li')
    for(let i=0; i < fileList.length; i++){
        files.push({
            "filename" : fileList[i].getElementsByTagName('input')[0].value,
            "language" : fileList[i].getElementsByTagName('select')[0].value,
            "code" : fileList[i].getElementsByClassName('CodeMirror')[0].CodeMirror.getDoc().getValue()
        })
    }
    let doc = {
        "title" : document.getElementById('snippetEditTitle').value,
        "description" : document.getElementById('snippetEditDescription').value,
        "tags" : tags,
        "files" : files,
        "isFav" : fav,
    }

    let parent = document.getElementById('snippetNoteList')

    if(isNewDoc){
        doc.createdOn = new Date();
        doc._id = id
        db.notes.insert(doc, function (err, newDoc) {
            //console.log(err);
            let listItem = snippetNoteComponent(newDoc)
            parent.insertAdjacentHTML("afterbegin", listItem);
            document.getElementById(id).insertAdjacentHTML("afterbegin", '<p class="text-center"><i class="fas fa-asterisk"></i> New <i class="fas fa-asterisk"></i></p>');
            document.getElementById(id).focus();
            let textareas = document.getElementById(id).getElementsByClassName('snippetFileEditor')
            snippetCreateSnippet(textareas);
            snippetAddEventListeners(document.getElementById(id))
            document.getElementById('snippetEditModalClose').click();
            document.getElementById('toastBody').innerHTML = "Note added";
            toast.show();
    
        });

    }else{
        doc.updatedOn = new Date();
        db.notes.update({ _id: parseInt(id) }, doc , {returnUpdatedDocs: true, multi: false}, function (err, numReplaced, affectedDocuments) {
            if(numReplaced){
                document.getElementById('snippetEditModalClose').click();
                document.getElementById('toastBody').innerHTML = "Note updated";
                toast.show();
                let listItem = snippetNoteComponent(affectedDocuments)
                parent.insertAdjacentHTML("beforeend", listItem);

                parent.replaceChild(parent.lastChild, document.getElementById(id));
                document.getElementById(id).focus();
                let textareas = document.getElementById(id).getElementsByClassName('snippetFileEditor')
                snippetCreateSnippet(textareas);
                snippetAddEventListeners(document.getElementById(id));
            }
          })
    }
    
    // update tag whitelist
    let oldTagList = snippetTagify.settings.whitelist;
    let newTagList = []
    for(let i=0; i < tags.length; i++ ){
        if(!oldTagList.includes(tags[i])){
            newTagList.push(tags[i])
        }
    }
    if(newTagList.length > 0){
        snippetTagify.settings.whitelist = snippetTagify.settings.whitelist.concat(newTagList)
        snippetReplaceTagify.settings.whitelist = snippetTagify.settings.whitelist;
        snippetLoadFilterTags(snippetTagify.settings.whitelist) 
        db.settings.update({ title: 'tags' }, { 'tags': snippetTagify.settings.whitelist, title:'tags' }, {upsert: true}, function (err) {
            console.log(err)
        });
    }
}

let snippetEditModal = document.getElementById('snippetEditModal')
snippetEditModal.addEventListener('hidden.bs.modal', function (e) {
    document.getElementById('snippetEditTitle').value = "";
    document.getElementById('snippetEditDescription').value = "";
    snippetTagify.removeAllTags();
    document.getElementById('snippetEditFiles').innerHTML = "";
    document.getElementById('snippetEditModal').setAttribute('data-target', '');
})


function snippetEditAddFile(file = null, parent){
    let markup = snippetEditFileComponent(file)
    parent.insertAdjacentHTML('beforeend', markup);
    let lastChild = parent.lastElementChild
    let textareas = lastChild.getElementsByTagName('textarea');
    createSnippetEditEditor(textareas[0], "text");
    let language = lastChild.getElementsByTagName('select');
    language[0].addEventListener("change", () => {snippetEditLanguageListener(language[0]) });
    let snippetEditRemoves = lastChild.getElementsByClassName('snippetEditRemove')
    snippetEditRemoves[0].addEventListener("click", () => {snippetEditRemoveListener(snippetEditRemoves[0]) })
}

function snippetEditAddNote(event){
    let editModalElem = document.getElementById('snippetEditModal')
    document.getElementById('snippetEditModalLabel').innerHTML = "Add Note";
    let parentFilesElem = document.getElementById('snippetEditFiles')
    snippetEditAddFile(null, parentFilesElem);
    // open modal
    let editModal = new bootstrap.Modal(editModalElem,{})
    editModal.show();
}


function snippetEditNote(event){
    let item = event.target.closest('.card')
    let id = parseInt(item.getAttribute('id'))
    db.notes.findOne({ _id: id }, function (err, doc) {
        //console.log(doc)
        let editModalElem = document.getElementById('snippetEditModal')
        editModalElem.setAttribute("data-target", id)
        editModalElem.setAttribute("data-fav", doc.isFav);
        // populate modal
        document.getElementById('snippetEditModalLabel').innerHTML = "Edit Note";
        document.getElementById('snippetEditTitle').value = doc.title;
        document.getElementById('snippetEditDescription').value = doc.description;
        let parentFilesElem = document.getElementById('snippetEditFiles')
        snippetTagify.addTags(doc.tags);
        for(let i=0; i<doc.files.length; i++){
            //console.log(doc.files[i])
            snippetEditAddFile(doc.files[i], parentFilesElem)
        }

        // open modal
        let editModal = new bootstrap.Modal(editModalElem,{})
        editModal.show();

    });
}

function snippetFavNote(event){
    let item = event.target.closest('.card')
    let id = parseInt(item.getAttribute('id'))
    let fav = (item.getElementsByClassName('snippetNoteFav')[0].getAttribute('data-fav') == 'false') // if false toggle it to true, 
    // update doc
    db.notes.update({ _id: id }, { $set: { isFav: fav } }, { multi: false }, function (err, numReplaced) {
        if(numReplaced){
            item.getElementsByClassName('snippetNoteFav')[0].setAttribute('data-fav', fav)
            if(fav){
                item.getElementsByClassName('snippetNoteFav')[0].innerHTML = '<i class="fas fa-heart"></i>';
                document.getElementById('toastBody').innerHTML = "Note added to favourites";
                toast.show();
            }else{
                item.getElementsByClassName('snippetNoteFav')[0].innerHTML = '<i class="far fa-heart"></i>';
                document.getElementById('toastBody').innerHTML = "Note removed from favourites";
                toast.show();
            }
            
        }
    });
}

function snippetReplaceTag(){
    let old = snippetReplaceTagify.value[0].value;
    let replacement = document.getElementById('snippetTagReplacement').value;
    // console.log(old + " -> " + replacement)
    
    if(replacement == "" && old != ""){
        //console.log("remove tag")
        db.notes.update({ tags: old }, { $pull: { tags: old } }, {multi: true }, function (err, numReplaced) {
            // console.log(err)
            // console.log(numReplaced)
            document.getElementById('snippetNoteList').innerHTML = '';
            snippetLoadNotes({}, 0, NUMCARDS)
        });

        db.settings.update({title: 'tags'}, { $pull: { tags: old } }, {}, function (err, numReplaced) {
            //console.log(err)
            if(numReplaced > 0){
                const index = snippetTagify.settings.whitelist .indexOf(old);
                if (index > -1) {
                    snippetTagify.settings.whitelist.splice(index, 1);
                    snippetReplaceTagify.settings.whitelist = snippetTagify.settings.whitelist;
                    snippetLoadFilterTags(snippetTagify.settings.whitelist) 
                }
    
            }
            snippetTagReplaceCloseBtn.click();
            document.getElementById('toastBody').innerHTML = "Tag Removed";
            toast.show();
        });
       
    }else if(replacement != "" && old != "") {
        db.notes.update({ tags: old }, { $addToSet: { tags: replacement } }, {multi: true }, function (err, numReplaced) {
            db.notes.update({ tags: old }, { $pull: { tags: old } }, {multi: true }, function (err) {
                document.getElementById('snippetNoteList').innerHTML = '';
                snippetLoadNotes({}, 0, NUMCARDS)
            });
        });

        db.settings.update({title: 'tags'}, { $pull: { tags: old } }, {}, function (err, numReplaced) {
            const index = snippetTagify.settings.whitelist .indexOf(old);
            if (index > -1) {
                snippetTagify.settings.whitelist.splice(index, 1);
                snippetTagify.settings.whitelist.push(replacement)
                snippetReplaceTagify.settings.whitelist = snippetTagify.settings.whitelist;
                snippetLoadFilterTags(snippetTagify.settings.whitelist) 
            }
            db.settings.update({ title: 'tags' }, { 'tags': snippetTagify.settings.whitelist, title:'tags' }, {z}, function (err) {
                snippetTagReplaceCloseBtn.click();
                document.getElementById('toastBody').innerHTML = "Tag Replaced";
                toast.show();
            })
        })
    }
}

let snippetTagModal = document.getElementById('snippetTagReplace')
snippetTagModal.addEventListener('hidden.bs.modal', function (e) {
    snippetReplaceTagify.removeAllTags();
    document.getElementById('snippetTagReplacement').value = "";
})



function snippetAddEventListeners(item){
    let deleteBtn = item.getElementsByClassName('snippetNoteDelete')[0];
    deleteBtn.addEventListener('click', snippetDeleteLoad)

    let viewSnippets = item.getElementsByClassName('snippetFileView')
    for(let i=0; i<viewSnippets.length; i++){
        viewSnippets[i].addEventListener('click', snippetViewFile)
    }

    let copySnippets = item.getElementsByClassName('snippetFileCopy')
    for(let i=0; i<copySnippets.length; i++){
        copySnippets[i].addEventListener('click', snippetCopyFile)
    }

    let editSnippets = item.getElementsByClassName('snippetNoteEdit')
    for(let i=0; i<editSnippets.length; i++){
        editSnippets[i].addEventListener('click', snippetEditNote)
    }

    let favSnippets = item.getElementsByClassName('snippetNoteFav')
    for(let i=0; i<favSnippets.length; i++){
        favSnippets[i].addEventListener('click', snippetFavNote)
        /*new bootstrap.Tooltip(favSnippets[i], {
            container: 'body'
        })*/
    }
}

document.getElementById('snippetExportBtn').addEventListener('click', snippetExport )
document.getElementById('snippetImportBtn').addEventListener('click', snippetImport )

function snippetExport(){
    const options = {
        title: "Save export file",
        defaultPath : "Lemon-Aid Stand Notes.json",
        buttonLabel : "Save Exported Notes",
        filters :[
            {name: 'JSON', extensions: ['json']},
        ]
    }

    remote.dialog.showSaveDialog(remote.getCurrentWindow(), options)
    .then( results =>{ 
        db.notes.find({}).sort({ createdOn: 1}).exec(function (err, docs) {
            // console.log(err)
            // console.log(docs)
            let json = {
                "name": "Lemon-Aid Stand Notes",
                "version": remote.app.getVersion(),
                "exportDate": new Date(),
                "notes": docs
            }
            let fileData = JSON.stringify(json)
            fs.writeFile(results.filePath, fileData, function(err) {
                // console.log(err)
                if(err == null){
                    document.getElementById('toastBody').innerHTML = "Notes exported";
                    toast.show();
                }
            }); 
        });
        
    })
}

function snippetImport(){
    remote.dialog.showOpenDialog(remote.getCurrentWindow(),{
        title: "Import notes file",
        properties: ['openFile'],
        filters: [
            {name: 'JSON', extensions: ['json']},
        ]
    
    })
    .then( results => {
        fs.readFile(results.filePaths[0], (err, data) => {
            if (err) throw err;
            let json = JSON.parse(data);
            // console.log(json);
            let tags = [];
            let numNotes = json.notes.length
            let numAdded = 0; 
            json.notes.forEach(note =>{
                db.notes.insert(note, function (err) {
                    // console.log(err)
                    if(err == null){
                        numAdded += 1;
                    }
                });
                note.tags.forEach(tag => {
                    if(tags.indexOf(tag) === -1){
                        tags.push(tag)
                    }
                    
                    if(snippetTagify.settings.whitelist.indexOf(tag) === -1){
                        snippetTagify.settings.whitelist.push(tag)
                    }
                });
            });

            db.settings.update({ title: 'tags' }, { 'tags': snippetTagify.settings.whitelist, title:'tags' }, {upsert: true}, function (err) {
                snippetReplaceTagify.settings.whitelist = snippetTagify.settings.whitelist;
                snippetLoadFilterTags(snippetTagify.settings.whitelist) 
                document.getElementById('snippetNoteList').innerHTML = '';
                snippetLoadNotes({}, 0, NUMCARDS)
                document.getElementById('toastBody').innerHTML = `Notes imported, ${numAdded} added, ${numNotes-numAdded} skipped`;
                toast.show();
            })
        });
    })
}
    
document.getElementById('searchBarClear').addEventListener("click", function () {
    let search = SEARCHPARAM
    document.getElementById('searchBar').value = "";
    document.getElementById('searchBarClear').classList.add("d-none")
    if ('$or' in search){
        delete search.$or;
    }
    snippetLoadNotes(search, 0, NUMCARDS, true);
})

document.getElementById('searchBar').addEventListener("input", function (evt) {
    let search = SEARCHPARAM
    value = this.value;
    if(value != "" ){
        document.getElementById('searchBarClear').classList.remove("d-none")
        let regex = new RegExp(value , 'i')
        search.$or = [{ title: {$regex: regex }}, { description: {$regex: regex }}, {"files.language": {$regex: regex}}]
        snippetLoadNotes(search , 0, NUMCARDS, true);
    }else if(value == ""){
        if ('$or' in search){
            delete search.$or;
        }
        document.getElementById('searchBarClear').classList.add("d-none");
        snippetLoadNotes(search, 0, NUMCARDS, true);
    }
});


document.getElementById('snippetFavFilterBtn').addEventListener('click', function(){
    // console.log(SEARCHPARAM)
    let search = SEARCHPARAM
    if(this.getAttribute('data-toggle') == "true"){
        this.setAttribute('data-toggle', "false")
        document.getElementById('snippetFavFilterBtn').getElementsByTagName('i')[0].classList.remove("fas");
        document.getElementById('snippetFavFilterBtn').getElementsByTagName('i')[0].classList.add("far");

        if ('isFav' in search){
            delete search.isFav;
        }

    }else{
        this.setAttribute('data-toggle', "true")
        document.getElementById('snippetFavFilterBtn').getElementsByTagName('i')[0].classList.remove("far");
        document.getElementById('snippetFavFilterBtn').getElementsByTagName('i')[0].classList.add("fas");
        search.isFav = true
        
    }
    snippetLoadNotes(search, 0, NUMCARDS, true)
})

document.getElementById('snipperLanguageFilter').addEventListener('change', function(){
    let value = this.value;
    let search = SEARCHPARAM;

    if(value == "language"){
        if ('files.language' in search){
            delete search["files.language"];
        }

    }else{
        search["files.language"] = value;
    }
    snippetLoadNotes(search, 0, NUMCARDS, true)

})

document.getElementById('snipperTagFilter').addEventListener('change', function(){
    let value = this.value;
    let search = SEARCHPARAM;

    if(value == "tag"){
        if ('tags' in search){
            delete search.tags;
        }

    }else{
        search.tags = value;
    }
    snippetLoadNotes(search, 0, NUMCARDS, true)

})

document.getElementById('snippetFilterClear').addEventListener('click', function(){
    let search = SEARCHPARAM;
    if ('tags' in search){
        delete search.tags;
    }
    if ('files.language' in search){
        delete search["files.language"];
    }
    if ('isFav' in search){
        delete search.isFav;
    }
    document.getElementById('snipperTagFilter').selectedIndex = "0"
    document.getElementById('snipperLanguageFilter').selectedIndex = "0"
    document.getElementById('snippetFavFilterBtn').setAttribute('data-toggle', "false")
    document.getElementById('snippetFavFilterBtn').getElementsByTagName('i')[0].classList.remove("fas");
    document.getElementById('snippetFavFilterBtn').getElementsByTagName('i')[0].classList.add("far");

    snippetLoadNotes(search, 0, NUMCARDS, true)
})
