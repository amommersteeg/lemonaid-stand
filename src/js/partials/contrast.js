/******** WebAim Contrast Code ********/
const contrastBackgroundElement = document.getElementById('contrastBackgroundColor');
let contrastBackgroundColor = "";

const background = new Pickr({
    el: contrastBackgroundElement,
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
    contrastBackgroundColor = pickr.getSelectedColor().toHEXA().toString();
    contrastBackgroundElement.closest('.card').querySelector('input').value = contrastBackgroundColor;
    contrastBackgroundElement.style.backgroundColor = contrastBackgroundColor;
}).on('save', (color, pickr) => {
    contrastBackgroundColor = color.toHEXA().toString();
    contrastBackgroundElement.closest('.card').querySelector('input').value = contrastBackgroundColor;
    contrastBackgroundElement.style.backgroundColor = contrastBackgroundColor;
    pickr.addSwatch(contrastBackgroundColor);
    let contrastCards = document.getElementById('contrastForegroundColors').children

    Array.from(contrastCards).forEach( card => {
        let color = card.querySelector('.contrastColorText').value;
        card.querySelector('.contrastInputText').style.backgroundColor = contrastBackgroundColor;
        let previews = card.querySelectorAll('.contrastPreview')
        previews.forEach(preview => {
            preview.style.backgroundColor = contrastBackgroundColor;
        })
        let ratio = calculateRatio(contrastBackgroundColor, color);
        card.querySelector('.contrastRatio').innerText = ratio
        updateRating(card, ratio)
    })
    pickr.hide();
})

contrastBackgroundElement.parentElement.querySelector('.contrastColorText').addEventListener('change', function(event){
    let color = event.target.value;
    background.setColor(color);
})

const contrastForegroundBtn = document.getElementById('contrastForegroundBtn');

contrastForegroundBtn.addEventListener('click', () => {
    const contrastForegroundContainer = document.getElementById('contrastForegroundColors');
    let id = Date.now()
    let template = `
        <div class="card m-3">
            <div class="input-group">
                <input class="form-control card-header contrastInputText" value="Lemond-aid Stand is here to help.">
                 <button class="btn btn-outline-secondary" type="button" id="${'contrastCard' + id}"><i class="fas fa-times"></i></button>
             </div>
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="contrastColorBox contrastColorBox-foreground mx-2"></div>
                    <input type="text" class="form-control contrastColorText">
                    <p class="card-text px-2 contrastRatioBox">Ratio <span class="contrastRatio"></span></p>
                </div>
                <div class="d-flex mt-3">
                    <div class="card mr-2">
                        <div class="contrastPreview d-flex align-items-center justify-content-center">
                            <h4 class="contrastPreviewText-normal contrastPreviewText-sans">aA</h4><h4 class="contrastPreviewText-normal contrastPreviewText-serif">aA</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Normal Text</h5>
                            <p class="card-text">WCAG AA  &nbsp;&nbsp;&nbsp;<span class="contrastNormalAA"></span></p>
                            <p class="card-text">WCAG AAA &nbsp;<span class="contrastNormalAAA"></span></p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="contrastPreview d-flex align-items-center justify-content-center">
                            <h4 class="contrastPreviewText-large contrastPreviewText-sans">aA</h4><h4 class="contrastPreviewText-large contrastPreviewText-serif">aA</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Large Text</h5>
                            <p class="card-text">WCAG AA &nbsp;&nbsp;&nbsp;<span class="contrastLargeAA"></span></p>
                            <p class="card-text">WCAG AAA &nbsp;<span class="contrastLargeAAA"></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    contrastForegroundContainer.insertAdjacentHTML('afterbegin', template);

    let newElement = contrastForegroundContainer.querySelector('.card').querySelector('.contrastColorBox')
    let card = newElement.closest('.card')

    document.getElementById('contrastCard'+id).addEventListener('click', function(){
        contrastForegroundContainer.removeChild(card);
    })

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
        newElement.parentElement.querySelector('input').value = color;
        newElement.style.backgroundColor = color;

        card.querySelector('.contrastInputText').style.color = color;
        card.querySelector('.contrastInputText').style.backgroundColor = contrastBackgroundColor;

        let ratio = calculateRatio(contrastBackgroundColor, color);
        newElement.parentElement.querySelector('.contrastRatio').innerText = ratio;

       let previews = card.querySelectorAll('.contrastPreview')
        Array.from(previews).forEach(div => {
            div.style.backgroundColor = contrastBackgroundColor;
            div.style.color = color;
        })
        updateRating(card, ratio)


    }).on('save', (color, pickr) => {
        color = color.toHEXA().toString();
        pickr.addSwatch(color);
    
        newElement.parentElement.querySelector('input').value = color;
        newElement.style.backgroundColor = color;

        card.querySelector('.contrastInputText').style.color = color;
        card.querySelector('.contrastInputText').style.backgroundColor = contrastBackgroundColor;

        let ratio = calculateRatio(contrastBackgroundColor, color);
        newElement.parentElement.querySelector('.contrastRatio').innerText = ratio;

       let previews = card.querySelectorAll('.contrastPreview')
        Array.from(previews).forEach(div => {
            div.style.backgroundColor = contrastBackgroundColor;
            div.style.color = color;
        })
        updateRating(card, ratio)
        pickr.hide();
    })

    card.querySelector('.contrastColorText').addEventListener('change', function(event){
        let color = event.target.value;
        pickr.setColor(color);
    })
});
  
contrastForegroundBtn.click();

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
    
    return Math.floor(1/ratio* 100) / 100;
}

function updateRating(container, ratio){

    let normalAA = container.querySelector('.contrastNormalAA');
    let normalAAA = container.querySelector('.contrastNormalAAA');
    let largeAA = container.querySelector('.contrastLargeAA');
    let largeAAA = container.querySelector('.contrastLargeAAA');
    let pass = '<span class="badge rounded-pill bg-success">Pass</span>';
    let fail = '<span class="badge rounded-pill bg-danger">Fail</span>'

    normalAA.innerHTML = `${ratio >= 4.5 ? pass : fail }`
    normalAAA.innerHTML = `${ratio >= 7 ? pass : fail }`
    largeAA.innerHTML = `${ratio >= 3 ? pass : fail }`
    largeAAA.innerHTML = `${ratio >= 4.5 ? pass : fail }`
}