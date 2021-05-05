/******** Word to HTML Code ********/
tinymce.init({
    selector: '#tinymce',
    height: "100%",
    scroll: true,
    resize: false,
    auto_focus :'tinymce',

    quickbars_insert_toolbar: '',
    quickbars_selection_toolbar: '',
    plugins: 'print preview paste importcss code searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons', //quickbars

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
    toolbar_mode: 'sliding',
    contextmenu: ' cut copy paste | link ',

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
                codeEditor.focus()
            }, 500);
        }else if(that.id == "nav-word-tab"){
            let content = codeEditor.getDoc().getValue();
            tinymce.get('tinymce').setContent(content);
            tinymce.get('tinymce').focus()
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
    document.getElementById('alertToastBody').innerHTML = "Code Copied";
    alertToast.show();
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




/* pandoc */
var src="# Hello \n\nIt\'s bananas";
var args = ['-f', 'markdown', '-t', 'html5'];

pandoc(src,args)
    .then((res)=>{
        console.log(res);
    }).catch(err=>{
    console.error("oops",err);
});