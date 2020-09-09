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
const electron = require('electron');
const {app, dialog } = electron.remote;
const fs = require('fs');
const path = require("path");

document.getElementById("navVerticalHtmlLink").addEventListener("click", function() { openTab( "navVerticalHtmlLink", "navVerticalHtml")});
document.getElementById("navVerticalBaseLink").addEventListener("click", function() { openTab( "navVerticalBaseLink", "navVerticalBase")});
document.getElementById("navVerticalContrastLink").addEventListener("click", function() { openTab( "navVerticalContrastLink", "navVerticalContrast")});


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
    plugins: 'print preview paste importcss code searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    mobile: {
        plugins: 'paste importcss code searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap hr nonbreaking insertdatetime advlist lists wordcount  textpattern noneditable help charmap quickbars linkchecker emoticons'
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
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
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
    dialog.showOpenDialog(electron.remote.getCurrentWindow(),{
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