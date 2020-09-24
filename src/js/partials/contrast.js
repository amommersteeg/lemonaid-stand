/******** WebAim Contrast Code ********/
const backgroundElement = document.querySelector('#background');

const background = new Pickr({
    el: backgroundElement,
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
    let backgroundColor = pickr.getSelectedColor().toHEXA();
    backgroundElement.querySelector('input').value = backgroundColor;
    backgroundElement.querySelector('div').style.backgroundColor = backgroundColor;
}).on('save', (color, pickr) => {
    let backgroundColor = color.toHEXA().toString();
    pickr.addSwatch(backgroundColor)
    backgroundElement.querySelector('input').value = backgroundColor;
    backgroundElement.querySelector('div').style.backgroundColor = backgroundColor;
    let previewText = document.querySelectorAll('.previewText');
    previewText.forEach(text => {
        text.style.backgroundColor = backgroundColor;
     })
    background.hide();
    let foregroundColors = document.querySelectorAll('.foregroundColors');
    foregroundColors.forEach( colorDiv => {
        let color = colorDiv.querySelector('.colorText').value;
        let ratio = calculateRatio(backgroundColor, color);
        updateRating(colorDiv, ratio)
    })
})

const foregroundContainer = document.querySelector('#foreground')
const foregroundBtn = document.querySelector('#foregroundBtn');

foregroundBtn.addEventListener('click', () => {
    let template = `
        <div class='foregroundColors'>
            <div class="colorBox"></div>
            <input type="text" class="colorText">
            <div class="ratio"></div>
            <p class="previewText previewText--sm">The five boxing wizards jump quickly.</p>
            <div class="contrastRating contrastRating--sm"></div>
            <p class="previewText previewText--lg">The five boxing wizards jump quickly.</p>
            <div class="contrastRating contrastRating--lg"></div>
            <p class="previewText"><i class="fas fa-check-square"></i></p>
            <div class="contrastRating contrastRating--gph"></div>
        </div>`

    foregroundContainer.insertAdjacentHTML('beforeend', template);
    let newElement = foregroundContainer.lastChild;
  
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
        newElement.querySelector('input').value = color;
        newElement.querySelector('div').style.backgroundColor = color;
        let backgroundColor = document.querySelector('#background > input').value;
        let previewText = newElement.querySelectorAll('.previewText');
        previewText.forEach(text => {
            text.style.color = color;
            text.style.backgroundColor = backgroundColor;
        })
        let ratio = calculateRatio(backgroundColor, color);
        updateRating(newElement, ratio)
    }).on('save', (color, pickr) => {
        color = color.toHEXA().toString();
        pickr.addSwatch(color)
        newElement.querySelector('input').value = color;
        let backgroundColor = document.querySelector('#background > input').value;
        newElement.querySelector('div').style.backgroundColor = color;
        let previewText = newElement.querySelectorAll('.previewText');
        previewText.forEach(text => {
            text.style.color = color;
        })
        pickr.hide();
        let ratio = calculateRatio(backgroundColor, color);
        updateRating(newElement, ratio)
    })
});
  
foregroundBtn.click();

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
    
    return ratio;
}

function updateRating(container, ratio){
    let smallText = container.querySelector('.contrastRating--sm');
    let largeText = container.querySelector('.contrastRating--lg');
    let gphText = container.querySelector('.contrastRating--gph');
    let ratioText = container.querySelector('.ratio');

    ratioText.innerHTML = ` 
        ${Math.floor(1/ratio* 100) / 100} : 1 
    `
    smallText.innerHTML = `
        AA-level small text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }<br>
        AAA-level small text: ${ratio < 1/7 ? 'PASS' : 'FAIL' }`;
    largeText.innerHTML = `
        AA-level large text: ${ratio < 1/3 ? 'PASS' : 'FAIL' }<br>
        AAA-level large text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }`;
    gphText.innerHTML = `
     AA-level user interface: ${ratio < 1/3 ? 'PASS' : 'FAIL' }<br>
    `
}