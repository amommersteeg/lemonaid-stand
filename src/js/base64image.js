// https://blog.soshace.com/the-ultimate-guide-to-drag-and-drop-image-uploading-with-pure-javascript/
var // where files are dropped + file selector is opened
	dropRegion = document.getElementById("drop-region"),
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

fakeInput.addEventListener("change", function() {
	var files = fakeInput.files;
	handleFiles(files);
});


function preventDefault(e) {
	e.preventDefault();
  	e.stopPropagation();
}

dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)


function handleDrop(e) {
	var dt = e.dataTransfer,
		files = dt.files;

	handleFiles(files)		
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
  
        reader.addEventListener("load", function () {
            image.src = this.result;
            let item = `
                <div>
                    <img class="image-view" title="${image.name}" src="${image.src}">
                    <p>Name:${image.name}</p>
                    <p>Size:${formatBytes(image.size)}</p>
                    <textarea>${image.src}</textarea>
                    <button class="btn btn-outline-secondary" onclick="imageCopy(this)">Copy Text</button>
                </div>`
            parent.insertAdjacentHTML('beforeend', item);
            document.getElementById('image-message').innerHTML = "";
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

function imageCopy(that){
    let text = that.parentNode.querySelector('textarea').value
    navigator.clipboard.writeText(text);
}