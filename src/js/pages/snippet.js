


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
let AUTOBACKUP = false;
let SEARCHPARAM;

/*function loadTooltips(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
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
            console.log(snippetTagify.settings.whitelist)
        }
    });
    db.settings.find({}, function (err, docs) {
        console.log(docs)
    })
});


  

// Get all docs
db.notes.loadDatabase(function (err){
    snippetLoadNotes({}, 0, NUMCARDS)

    if(AUTOBACKUP){
        db.notes.find({}, function (err, docs) {
            let json = {
                "name": "Lemon-Aid Stand Notes - Autobackup",
                "version": app.getVersion(),
                "exportDate": new Date(),
                "notes": docs
            }
            let fileData = JSON.stringify(json)
            let filepath = __dirname + "/Lemon-Aid Stand Note - Autobackup." + Date.now() + ".json"
            fs.writeFile(filepath, fileData, function(err) {
                console.log(err)
                if(err == null){
                    document.getElementById('alertToastBody').innerHTML = "Notes autobacked up";
                    alertToast.show();
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
    console.log("Search Param");
    console.log(searchParam)
    db.notes.find(searchParam).sort({ createdOn: -1 }).skip(skip).limit(limit).exec(function (err, docs) {
        console.log(docs)
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
                        <button type="button" class="btn btn-secondary snippetNoteFav" data-fav=${favData} data-toggle="tooltip" data-placement="bottom" title="${favTooltip}">${favIcon}</button>
                        <button type="button" class="btn btn-secondary snippetNoteEdit" data-toggle="tooltip" data-placement="bottom" title="Edit Note"><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-secondary snippetNoteDelete" data-toggle="tooltip" data-placement="bottom" title="Delete Note"><i class="fas fa-trash"></i></button>
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
            document.getElementById('alertToastBody').innerHTML = "Note deleted";
            alertToast.show();
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
    document.getElementById('alertToastBody').innerHTML = "Code Copied";
    alertToast.show();
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
            document.getElementById('alertToastBody').innerHTML = "Note added";
            alertToast.show();
    
        });

    }else{
        doc.updatedOn = new Date();
        db.notes.update({ _id: parseInt(id) }, doc , {returnUpdatedDocs: true, multi: false}, function (err, numReplaced, affectedDocuments) {
            if(numReplaced){
                document.getElementById('snippetEditModalClose').click();
                document.getElementById('alertToastBody').innerHTML = "Note updated";
                alertToast.show();
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
                document.getElementById('alertToastBody').innerHTML = "Note added to favourites";
                alertToast.show();
            }else{
                item.getElementsByClassName('snippetNoteFav')[0].innerHTML = '<i class="far fa-heart"></i>';
                document.getElementById('alertToastBody').innerHTML = "Note removed from favourites";
                alertToast.show();
            }
            
        }
    });
}

function snippetReplaceTag(){
    let old = snippetReplaceTagify.value[0].value;
    let replacement = document.getElementById('snippetTagReplacement').value;
    console.log(old + " -> " + replacement)
    
    if(replacement == "" && old != ""){
        //console.log("remove tag")
        db.notes.update({ tags: old }, { $pull: { tags: old } }, {multi: true }, function (err, numReplaced) {
            console.log(err)
            console.log(numReplaced)
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
            document.getElementById('alertToastBody').innerHTML = "Tag Removed";
            alertToast.show();
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
                document.getElementById('alertToastBody').innerHTML = "Tag Replaced";
                alertToast.show();
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

    dialog.showSaveDialog(electron.remote.getCurrentWindow(), options)
    .then( results =>{ 
        db.notes.find({}).sort({ createdOn: 1}).exec(function (err, docs) {
            console.log(err)
            console.log(docs)
            let json = {
                "name": "Lemon-Aid Stand Notes",
                "version": app.getVersion(),
                "exportDate": new Date(),
                "notes": docs
            }
            let fileData = JSON.stringify(json)
            fs.writeFile(results.filePath, fileData, function(err) {
                console.log(err)
                if(err == null){
                    document.getElementById('alertToastBody').innerHTML = "Notes exported";
                    alertToast.show();
                }
            }); 
        });
        
    })
}

function snippetImport(){
    dialog.showOpenDialog(electron.remote.getCurrentWindow(),{
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
            console.log(json);
            let tags = [];
            let numNotes = json.notes.length
            let numAdded = 0; 
            json.notes.forEach(note =>{
                db.notes.insert(note, function (err) {
                    console.log(err)
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
                document.getElementById('alertToastBody').innerHTML = `Notes imported, ${numAdded} added, ${numNotes-numAdded} skipped`;
                alertToast.show();
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
    console.log(SEARCHPARAM)
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