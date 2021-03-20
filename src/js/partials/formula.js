// Reference / symbol array: https://github.com/pesasa/matharray/blob/master/jquery.mathpanel.js
// Reference for more symbols: https://www.symbolab.com/

symbols = {
    configs: {},
    categories: {
        basic: {
            name: 'basic',
            weight: 5,
            icon: '+',
            buttons: [
                {
                    name: 'plus',
                    action: 'cmd',
                    text: '+',
                    icon: '+'
                },
                {
                    name: 'minus',
                    action: 'cmd',
                    text: '-',
                    icon: '–'
                },
                {
                    name: 'frac',
                    action: 'cmd',
                    text: '\\frac',
                    icon: '/'
                },
                {
                    name: 'centerdot',
                    action: 'write',
                    text: '\\cdot',
                    icon: '&sdot;'
                },
                {
                    name: 'plusminus',
                    action: 'cmd',
                    text: '\\pm',
                    icon: '&pm;'
                },
                {
                    name: 'minusplus',
                    action: 'cmd',
                    text: '\\mp',
                    icon: '&#x2213;'
                },
                {
                    name: 'oplus',
                    action: 'cmd',
                    text: '\\oplus',
                    icon: '&oplus;'
                },
                {
                    name: 'otimes',
                    action: 'cmd',
                    text: '\\otimes',
                    icon: '&otimes;'
                },
                {
                    name: 'times',
                    action: 'cmd',
                    text: '\\times',
                    icon: '&times;'
                },
                {
                    name: 'div',
                    action: 'cmd',
                    text: '\\div',
                    icon: '&div;'
                },
                {
                    name: 'asterisk',
                    action: 'cmd',
                    text: '\\ast',
                    icon: '&lowast;'
                },
                {
                    name: 'sqroot',
                    action: 'cmd',
                    text: '\\sqrt',
                    icon: '&radic;'
                },
                {
                    name: '3rdroot',
                    action: 'template',
                    text: '\\nthroot[3]{@@@@}',
                    icon: '&#x221b;',
                    postkeys: 'Left'
                },
                {
                    name: 'nthroot',
                    action: 'template',
                    text: '\\nthroot[]{@@@@}',
                    icon: '<sup>n</sup>&radic;',
                    postkeys: 'Shift-Left Left Right'
                },
                {
                    name: 'sup',
                    action: 'cmd',
                    text: '^',
                    icon: '<span style="font-family: serif; font-style: italic;">x<sup>n</sup></span>'
                },
                {
                    name: 'sub',
                    action: 'cmd',
                    text: '_',
                    icon: '<span style="font-family: serif; font-style: italic;">x<sub>n</sub></span>'
                },
                {
                    name: 'vector',
                    action: 'cmd',
                    text: '\\vec',
                    icon: '<span style="border-top: 1px solid black; line-height: 65%; display: inline-block; font-family: serif; font-style: italic;">x</span>'
                },
                {
                    name: 'bar',
                    action: 'cmd',
                    text: '\\bar',
                    icon: '<span style="border-top: 1px solid black; line-height: 65%; display: inline-block; font-family: serif; font-style: italic;">x</span>'
                },
                {
                    name: 'underline',
                    action: 'cmd',
                    text: '\\underline',
                    icon: '<span style="text-decoration: underline; font-family: serif; font-style: italic;">x</span>'
                }
            ]
        },
        relations: {
            name: 'relations',
            weight: 10,
            icon: '&equiv;',
            buttons: [
                {
                    name: 'equal',
                    action: 'cmd',
                    text: '= ',
                    icon: '='
                },
                {
                    name: 'lessthan',
                    action: 'cmd',
                    text: '\\lt',
                    icon: '&lt;'
                },
                {
                    name: 'greaterthan',
                    action: 'cmd',
                    text: '\\gt',
                    icon: '&gt;'
                },
                {
                    name: 'lessorequalwith',
                    action: 'cmd',
                    text: '\\leq',
                    icon: '&le;'
                },
                {
                    name: 'greaterorequalwith',
                    action: 'cmd',
                    text: '\\geq',
                    icon: '&ge;'
                },
                {
                    name: 'notequal',
                    action: 'cmd',
                    text: '\\neq',
                    icon: '&ne;'
                },
                {
                    name: 'approx',
                    action: 'cmd',
                    text: '\\approx',
                    icon: '&asymp;'
                },
                {
                    name: 'leftimp',
                    action: 'cmd',
                    text: '\\Leftarrow',
                    icon: '&lArr;'
                },
                {
                    name: 'rightimp',
                    action: 'cmd',
                    text: '\\Rightarrow',
                    icon: '&rArr;'
                },
                {
                    name: 'equivalent',
                    action: 'cmd',
                    text: '\\iff',
                    icon: '&hArr;'
                },
                {
                    name: 'divides',
                    action: 'cmd',
                    text: '\\mid',
                    icon: '|'
                },
                {
                    name: 'parallel',
                    action: 'cmd',
                    text: '\\parallel',
                    icon: '&parallel;'
                },
                {
                    name: 'nonparallel',
                    action: 'cmd',
                    text: '\\nparallel',
                    icon: '&nparallel;'
                },
                {
                    name: 'perpendicular',
                    action: 'cmd',
                    text: '\\perp',
                    icon: '&perp;'
                },
                {
                    name: 'sim',
                    action: 'cmd',
                    text: '\\sim',
                    icon: '&sim;'
                },
                {
                    name: 'simeq',
                    action: 'cmd',
                    text: '\\simeq',
                    icon: '&simeq;'
                },
                {
                    name: 'cong',
                    action: 'cmd',
                    text: '\\cong',
                    icon: '&cong;'
                },
                {
                    name: 'equiv',
                    action: 'cmd',
                    text: '\\equiv',
                    icon: '&equiv;'
                }
            ]
        },
        arrows: {
            name: 'arrows',
            weight: 20,
            icon: '<span>&#x2194;</span>',
            buttons: [
                {
                    name: 'leftarrow',
                    action: 'cmd',
                    text: '\\leftarrow',
                    icon: '&#x2190;'
                },
                {
                    name: 'rightarrow',
                    action: 'cmd',
                    text: '\\rightarrow',
                    icon: '&#x2192;'
                },
                {
                    name: 'uparrow',
                    action: 'cmd',
                    text: '\\uparrow',
                    icon: '&#x2191;'
                },
                {
                    name: 'downarrow',
                    action: 'cmd',
                    text: '\\downarrow',
                    icon: '&#x2193;'
                },
                {
                    name: 'nwarrow',
                    action: 'cmd',
                    text: '\\nwarrow',
                    icon: '&#x2196;'
                },
                {
                    name: 'nearrow',
                    action: 'cmd',
                    text: '\\nearrow',
                    icon: '&#x2197;'
                },
                {
                    name: 'searrow',
                    action: 'cmd',
                    text: '\\searrow',
                    icon: '&#x2198;'
                },
                {
                    name: 'swarrow',
                    action: 'cmd',
                    text: '\\swarrow',
                    icon: '&#x2199;'
                },
                {
                    name: 'updownarrow',
                    action: 'cmd',
                    text: '\\updownarrow',
                    icon: '&#x2195;'
                },
                {
                    name: 'leftrightarrow',
                    action: 'cmd',
                    text: '\\leftrightarrow',
                    icon: '&#x2194;'
                },
                {
                    name: 'Leftarrow',
                    action: 'cmd',
                    text: '\\Leftarrow',
                    icon: '&#x21d0;'
                },
                {
                    name: 'Rightarrow',
                    action: 'cmd',
                    text: '\\Rightarrow',
                    icon: '&#x21d2;'
                },
                {
                    name: 'Uparrow',
                    action: 'cmd',
                    text: '\\Uparrow',
                    icon: '&#x21d1;'
                },
                {
                    name: 'Downarrow',
                    action: 'cmd',
                    text: '\\Downarrow',
                    icon: '&#x21d3;'
                },
                {
                    name: 'Updownarrow',
                    action: 'cmd',
                    text: '\\Updownarrow',
                    icon: '&#x21d5'
                },
                {
                    name: 'Leftrightarrow',
                    action: 'cmd',
                    text: '\\Leftrightarrow',
                    icon: '&#x21d4;'
                },
                {
                    name: 'mapsto',
                    action: 'cmd',
                    text: '\\mapsto',
                    icon: '&#8614;'
                }
            ]
        },
        // Not currently working, but works in other tools, https://www.symbolab.com/
        // numbersets: {
        //     name: 'numbersets',
        //     weight: 30,
        //     icon: '&#x2115;',
        //     buttons: [
        //         {
        //             name: 'natural',
        //             action: 'other',
        //             text: '\\mathbb{N}',
        //             icon: '&#x2115;'
        //         },
        //         {
        //             name: 'integers',
        //             action: 'cmd',
        //             text: '\\ZZ',
        //             icon: '&#8484;'
        //         },
        //         {
        //             name: 'rationals',
        //             action: 'cmd',
        //             text: '\\QQ',
        //             icon: '&#8474;'
        //         },
        //         {
        //             name: 'reals',
        //             action: 'cmd',
        //             text: '\\RR',
        //             icon: '&#8477;'
        //         },
        //         {
        //             name: 'complexes',
        //             action: 'cmd',
        //             text: '\\CC',
        //             icon: '&#8450;'
        //         },
        //         {
        //             name: 'hamiltonian',
        //             action: 'cmd',
        //             text: '\\HH',
        //             icon: '&#8461;'
        //         },
        //         {
        //             name: 'primes',
        //             action: 'cmd',
        //             text: '\\PP',
        //             icon: '&#8473;'
        //         }
        //     ]
        // },
        greeks: {
            name: 'greeks',
            weight: 40,
            icon: '&alpha;',
            buttons: [
                {
                    name: 'alpha',
                    action: 'cmd',
                    text: '\\alpha',
                    icon: '&alpha;'
                },
                {
                    name: 'beta',
                    action: 'cmd',
                    text: '\\beta',
                    icon: '&beta;'
                },
                {
                    name: 'gamma',
                    action: 'cmd',
                    text: '\\gamma',
                    icon: '&gamma;'
                },
                {
                    name: 'delta',
                    action: 'cmd',
                    text: '\\delta',
                    icon: '&delta;'
                },
                {
                    name: 'epsilon',
                    action: 'cmd',
                    text: '\\epsilon',
                    icon: '&epsilon;'
                },
                {
                    name: 'zeta',
                    action: 'cmd',
                    text: '\\zeta',
                    icon: '&zeta;'
                },
                {
                    name: 'eta',
                    action: 'cmd',
                    text: '\\eta',
                    icon: '&eta;'
                },
                {
                    name: 'theta',
                    action: 'cmd',
                    text: '\\theta',
                    icon: '&theta;'
                },
                {
                    name: 'vartheta',
                    action: 'cmd',
                    text: '\\vartheta',
                    icon: '&#x03d1;'
                },
                {
                    name: 'iota',
                    action: 'cmd',
                    text: '\\iota',
                    icon: '&iota;'
                },
                {
                    name: 'kappa',
                    action: 'cmd',
                    text: '\\kappa',
                    icon: '&kappa;'
                },
                {
                    name: 'lambda',
                    action: 'cmd',
                    text: '\\lambda',
                    icon: '&lambda;'
                },
                {
                    name: 'mu',
                    action: 'cmd',
                    text: '\\mu',
                    icon: '&mu;'
                },
                {
                    name: 'nu',
                    action: 'cmd',
                    text: '\\nu',
                    icon: '&nu;'
                },
                {
                    name: 'xi',
                    action: 'cmd',
                    text: '\\xi',
                    icon: '&xi;'
                },
                {
                    name: 'pi',
                    action: 'cmd',
                    text: '\\pi',
                    icon: '&pi;'
                },
                {
                    name: 'rho',
                    action: 'cmd',
                    text: '\\rho',
                    icon: '&rho;'
                },
                {
                    name: 'sigma',
                    action: 'cmd',
                    text: '\\sigma',
                    icon: '&sigma;'
                },
                {
                    name: 'varsigma',
                    action: 'cmd',
                    text: '\\varsigma',
                    icon: '&#x03c2;'
                },
                {
                    name: 'tau',
                    action: 'cmd',
                    text: '\\tau',
                    icon: '&tau;'
                },
                {
                    name: 'upsilon',
                    action: 'cmd',
                    text: '\\upsilon',
                    icon: '&upsilon;'
                },
                {
                    name: 'phi',
                    action: 'cmd',
                    text: '\\phi',
                    icon: '&#x1d719;'
                },
                {
                    name: 'varphi',
                    action: 'cmd',
                    text: '\\varphi',
                    icon: '&phi;'
                },
                {
                    name: 'chi',
                    action: 'cmd',
                    text: '\\chi',
                    icon: '&chi;'
                },
                {
                    name: 'psi',
                    action: 'cmd',
                    text: '\\psi',
                    icon: '&psi;'
                },
                {
                    name: 'omega',
                    action: 'cmd',
                    text: '\\omega',
                    icon: '&omega;'
                },
                {
                    name: 'Alpha',
                    action: 'cmd',
                    text: 'A',
                    icon: '&Alpha;'
                },
                {
                    name: 'Beta',
                    action: 'cmd',
                    text: 'B',
                    icon: '&Beta;'
                },
                {
                    name: 'Gamma',
                    action: 'cmd',
                    text: '\\Gamma',
                    icon: '&Gamma;'
                },
                {
                    name: 'Delta',
                    action: 'cmd',
                    text: '\\Delta',
                    icon: '&Delta;'
                },
                {
                    name: 'Epsilon',
                    action: 'cmd',
                    text: 'E',
                    icon: '&Epsilon;'
                },
                {
                    name: 'Zeta',
                    action: 'cmd',
                    text: '\\zeta',
                    icon: '&zeta;'
                },
                {
                    name: 'Eta',
                    action: 'cmd',
                    text: 'H',
                    icon: '&Eta;'
                },
                {
                    name: 'Theta',
                    action: 'cmd',
                    text: '\\Theta',
                    icon: '&Theta;'
                },
                {
                    name: 'Iota',
                    action: 'cmd',
                    text: 'I',
                    icon: '&Iota;'
                },
                {
                    name: 'Kappa',
                    action: 'cmd',
                    text: 'K',
                    icon: '&Kappa;'
                },
                {
                    name: 'Lambda',
                    action: 'cmd',
                    text: '\\Lambda',
                    icon: '&Lambda;'
                },
                {
                    name: 'Mu',
                    action: 'cmd',
                    text: 'M',
                    icon: '&Mu;'
                },
                {
                    name: 'Nu',
                    action: 'cmd',
                    text: 'N',
                    icon: '&Nu;'
                },
                {
                    name: 'Xi',
                    action: 'cmd',
                    text: '\\Xi',
                    icon: '&Xi;'
                },
                {
                    name: 'Pi',
                    action: 'cmd',
                    text: '\\Pi',
                    icon: '&Pi;'
                },
                {
                    name: 'Rho',
                    action: 'cmd',
                    text: 'P',
                    icon: '&Rho;'
                },
                {
                    name: 'Sigma',
                    action: 'cmd',
                    text: '\\Sigma',
                    icon: '&Sigma;'
                },
                {
                    name: 'Tau',
                    action: 'cmd',
                    text: 'T',
                    icon: '&Tau;'
                },
                {
                    name: 'Upsilon',
                    action: 'cmd',
                    text: '\\Upsilon',
                    icon: '&Upsilon;'
                },
                {
                    name: 'Phi',
                    action: 'cmd',
                    text: '\\Phi',
                    icon: '&Phi;'
                },
                {
                    name: 'Chi',
                    action: 'cmd',
                    text: 'X',
                    icon: '&Chi;'
                },
                {
                    name: 'Psi',
                    action: 'cmd',
                    text: '\\Psi',
                    icon: '&Psi;'
                },
                {
                    name: 'Omega',
                    action: 'cmd',
                    text: '\\Omega',
                    icon: '&Omega;'
                }
            ]
        },
        brackets: {
            name: 'backets',
            weight: 50,
            icon: '{&#x25ab;}',
            buttons: [
                {
                    name: 'parentheses',
                    action: 'cmd',
                    text: '(',
                    icon: '(&#x25ab;)'
                },
                {
                    name: 'braces',
                    action: 'cmd',
                    text: '{',
                    icon: '{&#x25ab;}'
                },
                {
                    name: 'squarebackets',
                    action: 'cmd',
                    text: '[',
                    icon: '[&#x25ab;]'
                },
                {
                    name: 'anglebrackets',
                    action: 'cmd',
                    text: '\\langle',
                    icon: '<span style="font-size: 70%;">&#x3008;</span>&#x25ab;<span style="font-size: 70%;">&#x3009;</span>'
                },
                {
                    name: 'abs',
                    action: 'cmd',
                    text: '|',
                    icon: '|&#x25ab;|'
                },
                {
                    name: 'floor',
                    action: 'template',
                    text: '\\lfloor @@@@ \\rfloor',
                    icon: '&lfloor;&#x25ab;&rfloor;',
                    postkeys: 'Left'
                },
                {
                    name: 'leftbrace',
                    action: 'cmd',
                    text: '\\lbrace',
                    icon: '{'
                },
                {
                    name: 'rightbrace',
                    action: 'cmd',
                    text: '\\rbrace',
                    icon: '}'
                },
                {
                    name: 'leftbracket',
                    action: 'cmd',
                    text: '\\lbrack',
                    icon: '['
                },
                {
                    name: 'rightbracket',
                    action: 'cmd',
                    text: '\\rbrack',
                    icon: ']'
                },
                {
                    name: 'leftfloor',
                    action: 'cmd',
                    text: '\\lfloor',
                    icon: '&lfloor;'
                },
                {
                    name: 'rightfloor',
                    action: 'cmd',
                    text: '\\rfloor',
                    icon: '&rfloor;'
                },
                {
                    name: 'leftceil',
                    action: 'cmd',
                    text: '\\lceil',
                    icon: '&lceil;'
                },
                {
                    name: 'rightceil',
                    action: 'cmd',
                    text: '\\rceil',
                    icon: '&rceil;'
                }
            ]
        },
        functions: {
            name: 'functions',
            weight: 60,
            icon: '<span style="font-style: italic;">f(x)</span>',
            buttons: [
                {
                    name: 'sin',
                    action: 'template',
                    text: '\\sin \\left(@@@@\\right)',
                    icon: 'sin',
                    postkeys: 'Left'
                },
                {
                    name: 'cos',
                    action: 'template',
                    text: '\\cos \\left(@@@@\\right)',
                    icon: 'cos',
                    postkeys: 'Left'
                },
                {
                    name: 'tan',
                    action: 'template',
                    text: '\\tan \\left(@@@@\\right)',
                    icon: 'tan',
                    postkeys: 'Left'
                },
                {
                    name: 'arcsin',
                    action: 'template',
                    text: '\\arcsin \\left(@@@@\\right)',
                    icon: '<span style="font-size: 70%;">arcsin</span>',
                    postkeys: 'Left'
                },
                {
                    name: 'arccos',
                    action: 'template',
                    text: '\\arccos \\left(@@@@\\right)',
                    icon: '<span style="font-size: 70%;">arccos</span>',
                    postkeys: 'Left'
                },
                {
                    name: 'arctan',
                    action: 'template',
                    text: '\\arctan \\left(@@@@\\right)',
                    icon: '<span style="font-size: 70%;">arctan</span>',
                    postkeys: 'Left'
                },
                {
                    name: 'log',
                    action: 'template',
                    text: '\\log \\left(@@@@\\right)',
                    icon: 'log',
                    postkeys: 'Left'
                },
                {
                    name: 'ln',
                    action: 'template',
                    text: '\\ln \\left(@@@@\\right)',
                    icon: 'ln',
                    postkeys: 'Left'
                },
                {
                    name: 'lg',
                    action: 'template',
                    text: '\\lg \\left(@@@@\\right)',
                    icon: 'lg',
                    postkeys: 'Left'
                },
                {
                    name: 'min',
                    action: 'template',
                    text: '\\min \\left(@@@@\\right)',
                    icon: 'min',
                    postkeys: 'Left'
                },
                {
                    name: 'max',
                    action: 'template',
                    text: '\\max \\left(@@@@\\right)',
                    icon: 'max',
                    postkeys: 'Left'
                }
            ]
        },
        dots: {
            name: 'dots',
            weight: 70,
            icon: '&#x22ef;',
            buttons: [
                {
                    name: 'cdot',
                    action: 'cmd',
                    text: '\\cdot',
                    icon: '&middot;'
                },
                {
                    name: 'bullet',
                    action: 'cmd',
                    text: '\\bullet',
                    icon: '&bull;'
                },
                {
                    name: 'circ',
                    action: 'cmd',
                    text: '\\circ',
                    icon: '&#x25e6;'
                },
                {
                    name: 'dots',
                    action: 'cmd',
                    text: '\\dots',
                    icon: '&hellip;'
                },
                {
                    name: 'cdots',
                    action: 'cmd',
                    text: '\\cdots',
                    icon: '&#x22ef;'
                },
                {
                    name: 'vdots',
                    action: 'cmd',
                    text: '\\vdots',
                    icon: '&#x22ee;'
                },
                {
                    name: 'ddots',
                    action: 'cmd',
                    text: '\\ddots',
                    icon: '&#x22f1;'
                },
                {
                    name: 'therefore',
                    action: 'cmd',
                    text: '\\therefore',
                    icon: '&there4;'
                },
                {
                    name: 'because',
                    action: 'cmd',
                    text: '\\because',
                    icon: '&because;'
                }
            ]
        },
        bigs: {
            name: 'bigs',
            weight: 73,
            icon: '&Sigma;',
            buttons: [
                {
                    name: 'sum',
                    action: 'cmd',
                    text: '\\sum',
                    icon: '&Sigma;'
                },
                {
                    name: 'product',
                    action: 'cmd',
                    text: '\\prod',
                    icon: '&prod;'
                },
                {
                    name: 'coprod',
                    action: 'cmd',
                    text: '\\coprod',
                    icon: '&#x2210;'
                },
                {
                    name: 'integral',
                    action: 'cmd',
                    text: '\\int',
                    icon: '&int;'
                },
                {
                    name: 'ointegral',
                    action: 'cmd',
                    text: '\\oint',
                    icon: '&#x222e;'
                }
            ]
        },
        logic: {
            name: 'logic',
            weight: 75,
            icon: '&and;',
            buttons: [
                {
                    name: 'and',
                    action: 'cmd',
                    text: '\\land',
                    icon: '&and;'
                },
                {
                    name: 'or',
                    action: 'cmd',
                    text: '\\lor',
                    icon: '&or;'
                },
                {
                    name: 'not',
                    action: 'cmd',
                    text: '\\neg',
                    icon: '&not;'
                },
                {
                    name: 'forall',
                    action: 'cmd',
                    text: '\\forall',
                    icon: '&forall;'
                },
                {
                    name: 'exists',
                    action: 'cmd',
                    text: '\\exists',
                    icon: '&exist;'
                },
                {
                    name: 'notexists',
                    action: 'cmd',
                    text: '\\nexists',
                    icon: '&#x2204;'
                },
                {
                    name: 'top',
                    action: 'cmd',
                    text: '\\top',
                    icon: '&#x22a4;'
                },
                {
                    name: 'bottom',
                    action: 'cmd',
                    text: '\\bot',
                    icon: '&#x22a5;'
                },
                {
                    name: 'vdash',
                    action: 'cmd',
                    text: '\\vdash',
                    icon: '&#x22a2;'
                },
                {
                    name: 'dashv',
                    action: 'cmd',
                    text: '\\dashv',
                    icon: '&#x22a3;'
                },
                {
                    name: 'models',
                    action: 'cmd',
                    text: '\\models',
                    icon: '&#8872;'
                }
            ]
        },
        sets: {
            name: 'sets',
            weight: 80,
            icon: '&#x2286;',
            buttons: [
                {
                    name: 'setminus',
                    action: 'cmd',
                    text: '\\setminus',
                    icon: '\\'
                },
                {
                    name: 'isin',
                    action: 'cmd',
                    text: '\\in',
                    icon: '&isin;'
                },
                {
                    name: 'isni',
                    action: 'cmd',
                    text: '\\ni',
                    icon: '&ni;'
                },
                {
                    name: 'notin',
                    action: 'cmd',
                    text: '\\notin',
                    icon: '&notin;'
                },
                // MathQuill converts \niton to \not \ni, which converts to \neg \ni. This is not wanted!
                //{
                //    name: 'niton',
                //    action: 'cmd',
                //    text: '\\niton',
                //    icon: '&#x220c;'
                //},
                {
                    name: 'empty',
                    action: 'cmd',
                    text: '\\emptyset',
                    icon: '&empty;'
                },
                {
                    name: 'subset',
                    action: 'cmd',
                    text: '\\subset',
                    icon: '&#x2282;'
                },
                {
                    name: 'supset',
                    action: 'cmd',
                    text: '\\supset',
                    icon: '&#x2283;'
                },
                {
                    name: 'subseteq',
                    action: 'cmd',
                    text: '\\subseteq',
                    icon: '&#x2286;'
                },
                {
                    name: 'supseteq',
                    action: 'cmd',
                    text: '\\supseteq',
                    icon: '&#x2287;'
                },
                //{
                //    name: 'nsub',
                //    action: 'cmd',
                //    text: '\\nsub',
                //    icon: '&nsub;'
                //},
                //{
                //    name: 'nsup',
                //    action: 'cmd',
                //    text: '\\nsup',
                //    icon: '&nsup;'
                //},
                //{
                //    name: 'nsube',
                //    action: 'cmd',
                //    text: '\\nsube',
                //    icon: '&nsube;'
                //},
                //{
                //    name: 'nsupe',
                //    action: 'cmd',
                //    text: '\\nsupe',
                //    icon: '&nsupe;'
                //},
                {
                    name: 'union',
                    action: 'cmd',
                    text: '\\cup',
                    icon: '&#x222a;'
                },
                {
                    name: 'intersection',
                    action: 'cmd',
                    text: '\\cap',
                    icon: '&#x2229;'
                }
            ]
        },
        symbols: {
            name: 'symbols',
            weight: 90,
            icon: '&infin;',
            buttons: [
                {
                    name: 'infinity',
                    action: 'cmd',
                    text: '\\infty',
                    icon: '&infin;'
                },
                {
                    name: 'degree',
                    action: 'cmd',
                    text: '\\degree',
                    icon: '&deg;'
                },
                {
                    name: 'nabla',
                    action: 'cmd',
                    text: '\\nabla',
                    icon: '&nabla;'
                },
                {
                    name: 'partial',
                    action: 'cmd',
                    text: '\\part',
                    icon: '&part;'
                },
                {
                    name: 'hbar',
                    action: 'cmd',
                    text: '\\hbar',
                    icon: '&#8463;'
                },
                {
                    name: 'real',
                    action: 'cmd',
                    text: '\\Re',
                    icon: '&real;'
                },
                {
                    name: 'imaginary',
                    action: 'cmd',
                    text: '\\Im',
                    icon: '&image;'
                },
                {
                    name: 'alef',
                    action: 'cmd',
                    text: '\\alef',
                    icon: '&alefsym;'
                },
                {
                    name: 'wp',
                    action: 'cmd',
                    text: '\\wp',
                    icon: '&#8472;'
                },
                {
                    name: 'angle',
                    action: 'cmd',
                    text: '\\angle',
                    icon: '&ang;'
                },
                {
                    name: 'measuredangle',
                    action: 'cmd',
                    text: '\\measuredangle',
                    icon: '&#x2221;'
                },
                {
                    name: 'clubsuit',
                    action: 'cmd',
                    text: '\\clubsuit',
                    icon: '&clubs;'
                },
                {
                    name: 'diamondsuit',
                    action: 'cmd',
                    text: '\\diamondsuit',
                    icon: '&#9826;'
                },
                {
                    name: 'heartsuit',
                    action: 'cmd',
                    text: '\\heartsuit',
                    icon: '&#9825;'
                },
                {
                    name: 'spadesuit',
                    action: 'cmd',
                    text: '\\spadesuit',
                    icon: '&spades;'
                }
            ]
        },
        symbols: {
            name: 'matrix',
            weight: 90,
            icon: '<span>&#x3008;</span>nxn<span>&#x3009;</span>',
            buttons: [
                {
                    name: '[2x2]Matrix',
                    action: 'template',
                    text: `\u005Cbegin{bmatrix}1&2\u005C\u005Cx&y\u005Cend{bmatrix}`,
                    icon: '<span>[2x2]</span>'
                },
                {
                    name: '(2x2)Matrix',
                    action: 'template',
                    text: `\u005Cbegin{pmatrix}1&2\u005C\u005Cx&y\u005Cend{pmatrix}`,
                    icon: '<span>(2x2)</span>'
                },
                {
                    name: '{2x2}Matrix',
                    action: 'template',
                    text: `\u005Cbegin{Bmatrix}1&2\u005C\u005Cx&y\u005Cend{Bmatrix}`,
                    icon: '<span>{2x2}</span>'
                },
                {
                    name: '|2x2|Matrix',
                    action: 'template',
                    text: `\u005Cbegin{vmatrix}1&2\u005C\u005Cx&y\u005Cend{vmatrix}`,
                    icon: '<span>|2x2|</span>'
                },
                {
                    name: '||2x2||Matrix',
                    action: 'template',
                    text: `\u005Cbegin{Vmatrix}1&2\u005C\u005Cx&y\u005Cend{Vmatrix}`,
                    icon: '<span>&#8214;2x2&#8214;</span>'
                }
            ]
        }
    }
}

function initMathPanel(){
    var MQ = MathQuill.getInterface(2);
    var mathSpan = document.getElementById('math');
    var latexSpan = document.getElementById('latex')
    var mathField = MQ.MathField(mathSpan, {
        restrictMismatchedBrackets: true,
        supSubsRequireOperand: true,
        autoCommands: 'pi theta sqrt sum',
        handlers: {
            edit: function() {
                var enteredMath = mathField.latex();
                latexSpan.value = enteredMath;
            }
        }
    });

    latexSpan.addEventListener('input', function(){
        mathField.latex(this.value)
    })

    // Need to get rid of onclick and use addeventlisteners
    // Also need use javascript to enable a the tab list
    // may have to create elements instead of using string literals

    let tabHtml = document.getElementById('formulaList')
    let contentHtml = document.getElementById('formulaTabContent')
    count=0;
    for(const [key, value] of Object.entries(symbols.categories)){
        
        let tabItem = document.createElement("li")
        tabItem.className = "nav-item formula-list"
        let tabLink = document.createElement("a");
        tabLink.setAttribute("data-bs-toggle", "tab" )
        tabLink.setAttribute("href" , "#formula-" + symbols.categories[key].name)
        tabLink.innerHTML = symbols.categories[key].icon
        tabLink.id = "formula-"+symbols.categories[key].name+"-tab"
        if(count == 0 ){
            tabLink.className = "nav-link active"
        }else{
            tabLink.className = "nav-link"
        }
        tabItem.appendChild(tabLink)
        tabHtml.appendChild(tabItem)

        let contentItem = document.createElement("DIV");
        symbols.categories[key].buttons.forEach(button => {
            let contentButton = document.createElement("BUTTON")
            contentButton.setAttribute ("title", button.name )
            contentButton.className = "btn"
            contentButton.innerHTML = button.icon
            contentButton.addEventListener("click", function(){
                    insertSymbol(mathField, button.text , button.action)
                }  
            )
            contentItem.appendChild(contentButton)
        })  
        if(symbols.categories[key].name=="matrix"){
            matrixText =`<div>Shift-space adds a new column, shift-enter a new row.</div>`
            contentItem.insertAdjacentHTML("beforeend", matrixText)
        }

        contentItem.id = "formula-" + symbols.categories[key].name
        if(count == 0 ){
            contentItem.className = "tab-pane fade show active"
        }else{
            contentItem.className = "tab-pane fade"
        }
        contentHtml.appendChild(contentItem)
        count++;
    }
    var triggerTabList = [].slice.call(document.querySelectorAll('#formulaList a'))
    triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', function (event) {
            event.preventDefault()
            tabTrigger.show()
        })
    })
    tabHtml.insertAdjacentHTML("beforeend", '<button style="height:95%" type="button" class="btn btn-primary" id="formulaCopyBtn">Copy Formula</button>')
}

function insertSymbol(mathField, text, action){
    console.log(text)
    if(action == "cmd"){
        mathField.cmd(text)
    }else{
        console.log("other")
        mathField.write(text)
    }
}

function formulaCopyAll(){
    let text = document.getElementById('latex').value;
    navigator.clipboard.writeText(text);
    document.getElementById('alertToastBody').innerHTML = "Formula Copied";
    alertToast.show();
}

initMathPanel()
document.getElementById("formulaCopyBtn").addEventListener("click", formulaCopyAll);
