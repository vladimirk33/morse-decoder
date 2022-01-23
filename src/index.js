const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let res = '';
    if (Boolean(expr.replace(/[01*]/g, ''))) {
        for (let i = 0; i < expr.length; i++) {
            if (!Object.values(MORSE_TABLE).includes(expr[i])) {
                res += '*'.repeat(10);
                continue;
            }
            let currCh = Object.entries(MORSE_TABLE).filter(item => item[1] === expr[i])[0][0].replace(/-/g, '11').replace(/\./g, '10');
            let currChLength = currCh.length;
            for (let j = 0; j < (10 - currChLength); j++) {
                currCh = '0' + currCh;
            }
            res += currCh;
        }
    } else {
        let temp = '';
        for (let i = 0; i < expr.length + 1; i++) {
            if (i % 10 === 0 && i != 0) {
                let tempCh = '';
                if (temp[0] === '*') {
                    res += ' ';
                } else {
                    temp = temp.substring(temp.indexOf('1'));
                    for (let j = 0; j < temp.length; j++) {
                        if (j % 2 === 0) {
                            tempCh += `${temp[j]}${temp[j + 1]}`.replace('11', '-').replace('10', '.');
                        }
                    }
                    res += Object.entries(MORSE_TABLE).filter(item => item[0] === tempCh)[0][1];
                }
                temp = '';
            }
            temp += expr[i];
        }
    }
    return res;
}

module.exports = {
    decode
}