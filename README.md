# Lemon-aid_Stand
All-in one toolbox for courseware developers

# Helpfully Links
https://www.electronjs.org/docs/tutorial/first-app#installing-electron
https://www.electronforge.io/
https://www.ryadel.com/en/electron-jquery-bootstrap-project-add-npm/
https://css-tricks.com/how-i-created-a-code-beautifier-in-two-days/
https://dev.to/nicolalc/slack-gitkraken-discord-electron-loading-screen-tutorial-3k5n

https://www.tutorialspoint.com/How-to-convert-the-image-into-a-base64-string-using-JavaScript
https://blog.soshace.com/the-ultimate-guide-to-drag-and-drop-image-uploading-with-pure-javascript/

https://webaim.org/resources/contrastchecker/
https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
https://www.npmjs.com/package/color-contrast-checker
https://seballot.github.io/spectrum/#toc0

https://github.com/sindresorhus/electron-store


# Libraries Used
This code is using TinyMCE v5.4.2, Bootstrap v5.0.0-alpha, CodeMirror v5.57.0, Mammoth v1.4.11

# To Do
- Integrate mammoth to input docx to output folder, https://github.com/mwilliamson/mammoth.js -> creating partial files/folders in the same location of doc file
Add a down arrow instead of scroll bar?

- Snippet
    - Refresh/Add newly created note - Done
    - Note about newly added notes, as they maybe out of pagination order - Done
    - Pagination - Went for a Load More button - Done
    - Deleting Note - Done
    - Standard note size - Done
    - Clear Add when new is added - Done
    - CodeMirror Read-only and still highlight - Done
    - Created vs Updated date, load to card - Done
    - View Snippet - Done
    - Copy Snippet - Done
    - Editing Note - Done
    - (un)Fav Note - Done
    - Replace/Remove Tag - Done
    - Export + Import (rebuild tag list) - Done
    - Autobackup notes, to help correct from big errors - Done
    - Search - Done
        - Basic search - Done
        - Search and load more button - Done
    - Filters - Done


    - Trace photoshop Vector mask data (path) to points

- v 0.2.0
    - Refactor to separate js files
    - look at using express to seperate html files
    - Add UI from Lindsey


Bug
- can't edit not twice in row? - Readd event listeners?
- Make sure to clear id attributes/targe for edit window

- Issue with replacing tags, only doing 1 note - Fixed