import {mediumSetting, getCoefficients} from '../index.mjs'
let dset  = window.dset

if(!dset) {
    dset = []
}
export function clean() {
    let self = document.querySelector('nk-test')
    self.shadowRoot.querySelector('#report').innerHTML = ' --- ';
    // document.getElementById("report").innerHTML = ' --- ';
}

export function plotter() {
    let self = document.querySelector('nk-test')
    let datasetNumber = self.shadowRoot.querySelector('#plotGraph')
    datasetNumber = datasetNumber.value
    console.log('datasetNumber', datasetNumber, $.plot)
    debugger
    // var datasetNumber = $("#plotGraph").val();
    var plot = $.plot("#graphWindow", [dset[datasetNumber]], {
        series: {
            lines: {
                show: true
            },
            points: {
                show: true
            }
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        yaxis: {
            min: -0.05,
            max: 1.05
        },
        zoom: {
            interactive: true
        },
        pan: {
            interactive: true,
            enableTouch: true
        }
    });
}

export function solvMassives() {
    const self = document.querySelector('nk-test')
// document.getElementById("report").innerHTML = ' --- ';

    var Medium = [];
    Medium = mediumSetting();
    console.log('===== Medium =====', Medium)
/////////////////////////////////////////////
    const showMediumToScreen = self.shadowRoot.querySelector('#showMediumToScreen')
    if (showMediumToScreen.checked == true) {
        let resume = 'ПАРАМЕТРЫ СЛОИСТОЙ СРЕДЫ \n' + 'количество строк: ' + Medium.length + '\n';
        for (let i = 0; i < Medium.length; i++) {
            resume = resume + '\n' + Medium[i];
        }
        alert(resume);
    }
/////////////////////////////////////////////


    // время счета
    let end, start, result; // создаем пустые переменные
    start = new Date(); // создаем объект Date с текущим временем
    // время счета


    var xPointN = Number(self.shadowRoot.querySelector("#xPointNum").value);
    var w0 = Number(self.shadowRoot.querySelector("#freq0").value);
    var w1 = Number(self.shadowRoot.querySelector("#freq1").value);
    var along = self.shadowRoot.querySelector('input[name="question"]:checked')?.value;

    if (!xPointN > 0) {
        xPointN = 50;
    }
    if (!w0 > 0) {
        w0 = 0.1;
    }
    if (!w1 > 0) {
        w1 = 62.831853;
    }

    var dw = (w1 - w0) / (xPointN)
    var omg = 0;
    console.log('======== dset ==========', dset)
    for (var i = 0; i < 12; i++) {
        dset[i] = [];
    }
    let coefs = [];


    if (along == 'lambda') {
        for (var j = 0; j < xPointN; j++) {
            var x = w0 + dw * j;
            omg = Math.PI * 2 / x; // x - lambda //
            coefs = getCoefficients(Medium, omg);
            for (var i = 0; i < 12; i++) {
                dset[i].push([x, coefs[i]]);
            }
        }

    } else {
        for (var j = 0; j < xPointN; j++) {
            var x = w0 + dw * j;
            omg = x; //
            coefs = getCoefficients(Medium, omg);
            for (var i = 0; i < 12; i++) {
                dset[i].push([x, coefs[i]]);
            }
        }

    }

    end = new Date(); // создаем объект Date с текущим временем
    result = end.getTime() - start.getTime(); // получаем разницу в миллисекундах

    self.shadowRoot.querySelector("#report").innerHTML = result / 1000 + ' сек.';
}
