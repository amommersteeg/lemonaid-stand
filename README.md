# Lemon-Aid Stand
All-in one toolbox for courseware developers. 

## Components
* Word (WYSIWYG) to HTML editor
* Convert document files
* Image (jpg or png) to Base 64 Image
* Webaim contrast checker
* Clipboard
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
    * The code has not been commented, sorry :( 
    * Styling of the components still needs to be completed. 
    * There is little to no error checking, so things may not work or crash completely.
    * Every time the app opens it will create a json backup of the Note & Code Snippet Table. Since that app hasn't really undergone testing, this allows for any lost notes to be recovered.

* 0.2.0
    * Refactor code into separate files
    * Adding settings
    * Added loading page
    * Added clipboard app
    * Updated styles on app

* 0.3.0
    * Updated dependencies to newer version
    * Added vite build process

## Roadmap
* Refactor the project's code into better scripts. 
* And more.

### Known Bugs
    * 

## How to develop
* Open terminal in Lemon-aid Stand directory and enter `npm start` 

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
* [TinyMCE](https://www.tiny.cloud/docs/)
* [Bootstrap](https://v5.getbootstrap.com/docs/5.0/getting-started/introduction/)
* [CodeMirror](https://codemirror.net/)
* [Mammoth](https://github.com/mwilliamson/mammoth.js)
* [sortableJs](https://github.com/SortableJS/Sortable)
* [Electron](https://www.electronjs.org/docs)
* [Tagify](https://github.com/yairEO/tagify)
* [nedb](https://github.com/louischatriot/nedb)
* [fontawesome](https://fontawesome.com/icons/)
* [js-beautify](https://github.com/beautify-web/js-beautify)
* [pickr](https://github.com/Simonwep/pickr)
* popper -> bundled with bootstrap 

## Inspirations
https://dev.to/lauthieb/code-notes-an-open-source-code-snippet-manager-to-increase-our-productivity--3l6l

## License
[MIT License](https://github.com/amommersteeg/Lemon-Aid_Stand/blob/master/LICENSE)
