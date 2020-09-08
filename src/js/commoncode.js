
/* Electron Store Code */
//https://github.com/sindresorhus/electron-store
//https://github.com/sindresorhus/conf/pull/124
const Store = require('electron-store');
const store = new Store();

let commonCode = store.get('commonCode');
document.getElementById('test').innerHTML = "Hello";

if( commonCode == undefined){
    console.log("Loading Default Common Code");
    let item1 = `
        <tr id=">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`
        document.getElementById('test').insertAdjacentHTML('beforeend', item1);
    let item2 = `
        <tr id=">
            <td>&#8962;</td>
            <td><pre>&#8962;</pre></td>
            <td>House</td>
            <td>HTML Entity (Decimal)</td>
        </tr>`
        document.getElementById('test').insertAdjacentHTML('beforeend', item2);
        console.log(item2)
        document.getElementById('test').innerHTML = item2;
}else{

}

/*store.set('unicorn', '🦄');
console.log(store.get('unicorn'));*/



/*function fetchJSON(){
    fetch("config.json")
    .then(response => response.json())
    .then(json => {
        let parent = document.querySelector('tbody');
        json.commonCode.forEach( element => {
            let row = `
                <tr id="${element.id}" onclick="copyCode(this)">
                    <td>${element.code}</td>
                    <td><pre class="code"></pre></td>
                    <td>${element.title}</td>
                    <td>${element.comments}</td>
                </tr>
            `
            parent.insertAdjacentHTML('beforeend', row);
            document.getElementById(element.id).querySelector('.code').textContent = codeBeautify(element.code) ;
        })
        
    });
}*/

function codeBeautify(code){
    let settings = {

    }
    return html_beautify(code, settings)
}

// https://stackoverflow.com/questions/48102742/how-to-make-javascript-search-multiple-columns-and-rows-in-a-table
function searchTable() {

    // Declare variables 
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("codeTable");
    var trs = table.tBodies[0].getElementsByTagName("tr");
  
    // Loop through first tbody's rows
    for (var i = 0; i < trs.length; i++) {
  
      // define the row's cells
      var tds = trs[i].getElementsByTagName("td");
  
      // hide the row
      trs[i].style.display = "none";
  
      // loop through row cells
      for (var i2 = 0; i2 < tds.length; i2++) {
  
        // if there's a match
        if (tds[i2].innerHTML.toUpperCase().indexOf(filter) > -1) {
  
          // show the row
          trs[i].style.display = "";
  
          // skip to the next row
          continue;
  
        }
      }
    }
  
  }

function copyCode(that){
    let text = that.querySelector('.code').textContent;
    navigator.clipboard.writeText(text);
}
