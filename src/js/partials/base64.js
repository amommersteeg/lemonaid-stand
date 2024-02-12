// Code modified from:
// https://blog.soshace.com/the-ultimate-guide-to-drag-and-drop-image-uploading-with-pure-javascript/


let base64dropRegion = document.getElementById("base64UploadRegion");

// prevent default events
base64dropRegion.addEventListener('dragenter', preventDefault, false)
base64dropRegion.addEventListener('dragleave', preventDefault, false)
base64dropRegion.addEventListener('dragover', preventDefault, false)
base64dropRegion.addEventListener('drop', preventDefault, false)

// Create imaginary input on drop region
var base64FakeInput = document.createElement("input");
base64FakeInput.type = "file";
base64FakeInput.accept = "image/*";
base64FakeInput.multiple = true;
base64dropRegion.addEventListener('click', function() {
	base64FakeInput.click();
});

base64FakeInput.addEventListener("change", function(event) {
    let files = base64FakeInput.files;
    base64HandleFiles(files);
    event.target.value = null;  // clear to allow for same file back to back
});


function base64HandleDrop(event) {
	let data = event.dataTransfer
	let files = data.files;
    base64HandleFiles(files);
    event.target.value = null;	// clear to allow for same file back to back
}

base64dropRegion.addEventListener('drop', base64HandleDrop, false);

function base64HandleFiles(files) {
    document.getElementById('base64UploadMessage').innerHTML = "Processing Image..."
    let len = files.length;
	for (let i = 0; i < len; i++) {
		if (base64ValidateImage(files[i])){
            base64PreviewImage(files[i])
        }
	}
}

function base64ValidateImage(image) {
	// check the type
	var validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
	if (validTypes.indexOf( image.type ) === -1) {
		document.getElementById('base64UploadMessage').innerHTML = "Invalid File Type";
		return false;
	}

	// check the size
	var maxSizeInBytes = 10e6; // 10MB
	if (image.size > maxSizeInBytes) {
		document.getElementById('base64UploadMessage').innerHTML = "Image Too Big";
		return false;
	}
	return true;
}


function base64PreviewImage(image){
    var parent = document.getElementById('base64ImageList');
  
      // Make sure `file.name` matches extensions criteria
      if ( /\.(jpe?g|png|gif)$/i.test(image.name) ) {
        var reader = new FileReader();
  
        reader.addEventListener("load", function (event) {
            image.src = this.result;
            let id = Date.now()

            let item = `
                <div class="card mb-3">
                    <div class="card-header d-flex justify-content-between">
                        <button class="btn btn-outline-secondary" id="${id+"close"}"><i class="fas fa-times"></i></button>
                        <button class="btn btn-outline-secondary" id="${id+"copy"}">Copy Text</button>
                    </div>
                    <img class="base64ImageView" title="${image.name}" src="${image.src}">
                    <div class="card-body">
                        <h5 class="card-title">${image.name}</h5>
                        <p class="card-text"><small class="text-muted">${base64FormatBytes(image.size)}</small></p>
                        <textarea class="form-control">${image.src}</textarea>
                    </div>
                </div>`
            parent.insertAdjacentHTML('afterbegin', item);
            document.getElementById('base64UploadMessage').innerHTML = "";
            document.getElementById(id+"copy").addEventListener('click', function(event){ 
                base64ImageCopy(event.target);
            })
            document.getElementById(id+'close').addEventListener('click', function(event){ 
                let card = event.target.closest('.card');
                parent.removeChild(card)
            })
        });
  
        reader.readAsDataURL(image);
      }else{
        document.getElementById('photo').classList.add('is-invalid');
      }
}

/**
 * Convert the file size with a reasonable unit
 * @param bytes number, file size in bytes
 * @param decimals number, number decimals to return
 * @returns string, formatted file size with unit
 */
//https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function base64FormatBytes(bytes, decimals = 0) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Copies the image text to computers clipboard
function base64ImageCopy(element){
    let parent = element.closest('.card')
    let text = parent.querySelector('textarea').value
    navigator.clipboard.writeText(text);
    document.getElementById('alertToastBody').innerHTML = "Text Copied";
    alertToast.show();
}