# Lemon-Aid Stand
All-in one toolbox for courseware developers. 

## Components
* Word (WYSIWYG) to HTML editor
* Image (jpg or png) to Base 64 Image
* Webaim contrast checker
* Note & Code Snippet Table

## Details
Lemond-Aid Stand is built using Electron and Node.js. It is been designed to replace common online tools used by courseware developers into a single app. It works completely offline with no more annoying ads.

## Tips
* If there is an error or unexpected results `View > Reload` will reload the app.
* To trace a bug, `Help > Toggle Developer Tools` will open Chromes dev tool window.

## Versions
In the `releases` folder are complied versions for Windows and Mac computers (portable and installable).
* 0.1.0
    * It is the first release, it is a rough code of all the components.
    * The code has not been commits, sorry :( 
    * Styling of the components still needs to be completed. 
    * There is little to no error checking, so things may not work or crash completely.
    * Every time the app opens it will create a json backup of the Note & Code Snippet Table. Since that app hasn't really undergone testing, this allows for any lost notes to be recovered.

## Roadmap
* 0.2.0
    * Refactor the project's code into separate files to allow for better collaboration. 
    * Add styling to the components.
    * Add creating of partial html components when uploading HTML and exporting using Mammoth.
    * And more.

### Known Bugs & To Do's
    * 


## Helpfully Links
### Electron
https://www.electronjs.org/docs/tutorial/first-app#installing-electron
https://www.electronforge.io/
https://www.ryadel.com/en/electron-jquery-bootstrap-project-add-npm/
https://dev.to/nicolalc/slack-gitkraken-discord-electron-loading-screen-tutorial-3k5n

### Image to Base 64
https://www.tutorialspoint.com/How-to-convert-the-image-into-a-base64-string-using-JavaScript
https://blog.soshace.com/the-ultimate-guide-to-drag-and-drop-image-uploading-with-pure-javascript/

### Webaim contrast
https://webaim.org/resources/contrastchecker/
https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o



## Libraries Used
This project is using: 
* [TinyMCE v5.4.2](https://www.tiny.cloud/docs/)
* [Bootstrap v5.0.0-alpha](https://v5.getbootstrap.com/docs/5.0/getting-started/introduction/)
* [CodeMirror v5.57.0](https://codemirror.net/)
* [Mammoth v1.4.11](https://github.com/mwilliamson/mammoth.js/)
* [Electron v10.1.1](https://www.electronjs.org/docs)
* [Tagify v3.18.0](https://github.com/yairEO/tagify)
* [nedb v1.8.0](https://github.com/louischatriot/nedb)
* [fontawesome v5.14.0](https://fontawesome.com/icons/)
* [js-beautify v1.13.0](https://github.com/beautify-web/js-beautify)
* [pickr v1.7.2](https://github.com/Simonwep/pickr)
* popper -> bundled with bootstrap 

## Inspirations
https://dev.to/lauthieb/code-notes-an-open-source-code-snippet-manager-to-increase-our-productivity--3l6l

## License
[MIT License](https://github.com/amommersteeg/Lemon-Aid_Stand/blob/master/LICENSE)