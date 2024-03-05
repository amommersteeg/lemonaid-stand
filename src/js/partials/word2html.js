const path = require('node:path');
const mammoth = require("mammoth");

/******** Word to HTML Code ********/
tinymce.init({
    selector: '#tinymce',
    height: "100%",
    scroll: true,
    resize: false,
    auto_focus :'tinymce',
    promotion: false,
    plugins: 'preview paste importcss code searchreplace autolink directionality visualblocks visualchars fullscreen image link media table charmap nonbreaking insertdatetime advlist lists wordcount help charmap emoticons', //quickbars
    menubar: 'edit insert view format table tools help',
    menu: {
        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
        view: { title: 'View', items: 'visualaid visualchars visualblocks | spellchecker | fullscreen' },
        insert: { title: 'Insert', items: 'image link inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc' },
        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles | removeformat' },
        table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
        tools: { title: 'Tools', items: 'code wordcount' },
        help: { title: 'Help', items: 'help' }
    },
    toolbar: 'undo redo | bold italic underline strikethrough removeformat| blocks | outdent indent numlist bullist | image link charmap emoticons | fullscreen',
    toolbar_mode: 'sliding',
    contextmenu: ' cut copy paste | link ',
    block_formats: 'Paragraph=p; Blockquote=blockquote; Heading1=h1; Heading2=h2; Heading3=h3; Heading4=h4; Heading5=h5; Heading6=h6',
    setup: function(editor) {
        editor.on('keydown', function(event) {
            switch(event.key){               
                case "Tab": 
                    if(event.ctrlKey && event.shiftKey) {
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
                       
                    } else if(event.ctrlKey) {
                        let page = document.getElementsByClassName("paneVertical active")[0]
                        let tabs = page.getElementsByClassName("nav-link");
        
                        if(tabs){
                            for(let i = 0; i < tabs.length; i++){
                                if(tabs[i].classList.contains("active")){
                                    let nextTab = i + 1;
                                    if( nextTab == tabs.length){
                                        nextTab = 0;
                                    }
                                    tabs[nextTab].click()
                                    break;
                                }
                            }
                        }
                    } 
            }
        });
    },

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
    importcss_append: true
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
});


function copyText(that){
    let panel = document.querySelector('#nav-tabContent > .active')
    if((that.id === (panel.id + "-tab"))){
        if(that.id === "nav-html-tab"){
            let content = tinymce.get('tinymce').getContent();
            let cleanContent = codeBeautify(content)
            codeEditor.getDoc().setValue(cleanContent);
            setTimeout(function(){
                codeEditor.refresh()
                codeEditor.focus()
            }, 500);
        }else if(that.id === "nav-word-tab"){
            let content = codeEditor.getDoc().getValue();
            tinymce.get('tinymce').setContent(content);
            tinymce.get('tinymce').focus()
        } 
    }
}

function codeWrapLine(element){
    let state = codeEditor.getOption("lineWrapping");
    console.log(state)
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

codeWrapLine(document.getElementById("codeWrapLineBtn")); // make linewrap default true

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
    document.getElementById('alertToastBody').innerHTML = "Code Copied";
    alertToast.show();
}

function codeConvertFile(filePath) {
    if(path.extname(filePath) == ".docx" || path.extname(filePath) == ".doc"){
        mammoth.convertToHtml({path: filePath})
        .then(function(result){
            var html = result.value; // The generated HTML
            let cleanHTML = codeBeautify(html)
            codeEditor.getDoc().setValue(cleanHTML);
            setTimeout(function(){
                codeEditor.refresh()
            }, 600);
            copyText(document.getElementById("nav-word-tab"));
            var messages = result.messages;
            document.getElementById('codeUploadMessage').innerHTML = "";
            if(messages.length > 0){
                let messageText = "";
                for(let i=0; i<messages.length; i++){
                    messageText += messages[i] + '\n';
                }
                document.getElementById('codeUploadMessage').innerHTML = messageText;
            }
            document.getElementById('alertToastBody').innerHTML = "File Conversion Complete";
            alertToast.show();
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

codeFakeInput.addEventListener("click", async function(event) {
    const options = {
        title: "Upload Doc file",
        defaultPath : settingsGlobal.snippet.backupLocation,
        properties: ['openFile'],
        filters: [
            {name: 'Doc', extensions: ['doc', 'docx']},
        ]
    
    };
    const filePath = await window.fileDialog.openDialog(options);

    if(filePath) codeConvertFile(filePath);
});

codeUploadRegion.addEventListener('drop', (event) => { 
    preventDefault(event);

    for (const f of event.dataTransfer.files) { 
        codeConvertFile(f.path)
      } 
}); 

const findReplaceClose = document.getElementById("findReplaceClose");

codeUploadRegion.addEventListener('dragover', (event) => event.preventDefault(), false)
codeUploadRegion.addEventListener('dragenter', (event) => event.preventDefault(), false)
codeUploadRegion.addEventListener('dragleave', (event) => event.preventDefault(), false)

document.getElementById("nav-word-tab").addEventListener("click", function(){ 
    copyText(document.getElementById("nav-word-tab"));
    findReplaceClose.click();
});
document.getElementById("nav-upload-tab").addEventListener("click", function(){ 
    findReplaceClose.click();
});
document.getElementById("nav-html-tab").addEventListener("click", function(){ copyText(document.getElementById("nav-html-tab")) });
document.getElementById("codeUndoBtn").addEventListener("click", function(){ codeUndoRedo(true) });
document.getElementById("codeUndoBtn").addEventListener("click", function(){ codeUndoRedo(true) });
document.getElementById("codeRedoBtn").addEventListener("click", function(){ codeUndoRedo(false) });
document.getElementById("codeWrapLineBtn").addEventListener("click", function(){ codeWrapLine(document.getElementById("codeWrapLineBtn")) });
document.getElementById("codeCopyBtn").addEventListener("click", codeCopyAll);


// Find and Replace
const findReplaceModal = document.getElementById('findReplaceModal');
const findReplaceToggle = document.getElementById("findReplaceToggle");
const findReplaceReplace = document.getElementById("findReplaceReplace");
const findReplaceReplaceAll = document.getElementById("findReplaceReplaceAll");
const findReplaceNext = document.getElementById("findReplaceNext");
const findReplacePrevious = document.getElementById("findReplacePrevious");
const findReplaceFindText =  document.getElementById("findReplaceFindText");
const findReplaceReplaceText = document.getElementById("findReplaceReplaceText");
const findReplaceMessage = document.getElementById("findReplaceMessage");
const findReplaceMatchCase = document.getElementById("findReplaceMatchCase");
const findReplaceMatchWhole = document.getElementById("findReplaceMatchWhole");

dragElement(findReplaceModal);

codeEditor.addKeyMap({
    'Ctrl-F': function(cm){
        findReplaceToggle.click();
        
    }
})

findReplaceToggle.addEventListener("click", findSelection);
findReplaceMatchCase.addEventListener("change", resetButtons);
findReplaceMatchWhole.addEventListener("change", resetButtons);
findReplaceFindText.addEventListener("input", resetButtons);
findReplaceFindText.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        find();
    }
});
document.getElementById("findReplaceFind").addEventListener("click", find);
findReplaceNext.addEventListener("click", findNext);
findReplacePrevious.addEventListener("click", findPrevious);
findReplaceReplace.addEventListener("click", replace);
findReplaceReplaceAll.addEventListener("click", replaceAll);
findReplaceClose.addEventListener("click", () => {
    resetInputs();
    resetButtons();
});

let searchCursor;
let queryString;

function dragElement(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(element.id).querySelector(".modal-header")) {
    document.getElementById(element.id).querySelector(".modal-header").onmousedown = dragMouseDown;
  }

  function dragMouseDown(event) {
    event.preventDefault();
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(event) {
    event.preventDefault();
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;

    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function findSelection(){
    const selection = codeEditor.getSelection();
    if(selection) {
        find({selection});
    }
}

function find({selection=""}){
    if(selection) {
        document.getElementById('findReplaceFindText').value = selection;
    }

    let text = escapeRegex(document.getElementById('findReplaceFindText').value);
    const matchCase = findReplaceMatchCase.checked;
    const matchWhole = findReplaceMatchWhole.checked;
    let options = 'g'

    if (!matchCase) {
        options += 'i';
    }

    if (matchWhole) {
        text = `\\b${text}\\b`;
    }

    const query = new RegExp(text, options);
    queryString = query;
    const cursor = codeEditor.getSearchCursor(query, {line:0, ch: 0});
    const editorText = codeEditor.getDoc().getValue();
    const occurrences = ((editorText || '').match(query) || []).length;

    findReplaceMessage.innerText = `${occurrences} matches found.`;
    if (cursor.findNext()) {
       codeEditor.setSelection(cursor.from(), cursor.to());

        findReplaceReplace.disabled = false;
        
        if(occurrences > 1) {
            findReplaceNext.disabled = false;
            findReplacePrevious.disabled = false;
            findReplaceReplaceAll.disabled = false;
        }
        
    }
    searchCursor = cursor;
}

function findNext(){
    if (searchCursor.findNext()) {
        codeEditor.setSelection(searchCursor.from(), searchCursor.to());
    } else {
        codeEditor.setSelection({line: 0, ch: 0});
        searchCursor = codeEditor.getSearchCursor(queryString, {line:0, ch: 0});
    }
}

function findPrevious(){
    if (searchCursor.findPrevious()) {
        codeEditor.setSelection(searchCursor.from(), searchCursor.to());
    } else {
        const lastLine =  codeEditor.lastLine();
        const lastChar = codeEditor.getLine(lastLine).length
        codeEditor.setSelection({line: lastLine, ch: lastChar});
        while(searchCursor.findNext()) {
            codeEditor.setSelection(searchCursor.from(), searchCursor.to());
        }
    }
}

function resetButtons(){
    findReplaceReplace.disabled = true;
    findReplaceReplaceAll.disabled = true;
    findReplaceNext.disabled = true;
    findReplacePrevious.disabled = true;
    findReplaceMessage.innerText = '';
    codeEditor.setSelection({line: 0, ch: 0});
}

function resetInputs(){
    findReplaceFindText.value = "";
    findReplaceReplaceText.value = "";
    codeEditor.setSelection({line: 0, ch: 0});
}

function replace() {
    const text = document.getElementById('findReplaceReplaceText').value;
    searchCursor.replace(text);
    findReplaceMessage.innerText = `Match replaced.`;
}

function replaceAll(){
    let count = 0;
    const text = document.getElementById('findReplaceReplaceText').value;
    codeEditor.setSelection({line: 0, ch: 0});
    searchCursor = codeEditor.getSearchCursor(queryString, {line:0, ch: 0});
    searchCursor.replace(text);
    while(searchCursor.find()) {
        searchCursor.replace(text);
        count++;
    }

    findReplaceMessage.innerText = `${count} matches replaced.`;
}

function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}