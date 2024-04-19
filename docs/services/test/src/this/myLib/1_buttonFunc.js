export function clean() {
    document.getElementById("report").innerHTML = ' --- ';
}

export function plotter() {
    var datasetNumber = $("#plotGraph").val();
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
// document.getElementById("report").innerHTML = ' --- ';

    debugger
    var Medium = [];
    Medium = mediumSetting();

/////////////////////////////////////////////
    if (document.getElementById("showMediumToScreen").checked == true) {
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


    var xPointN = Number(document.getElementById("xPointNum").value);
    var w0 = Number(document.getElementById("freq0").value);
    var w1 = Number(document.getElementById("freq1").value);
    var along = document.querySelector('input[name="question"]:checked')?.value;

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

    document.getElementById("report").innerHTML = result / 1000 + ' сек.';
}
