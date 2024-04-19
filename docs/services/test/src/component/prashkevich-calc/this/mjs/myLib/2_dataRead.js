export function giveString(OneStr) {

//интерпретируем данные, введенные пльзователем и записываем это всё в массив (длинной, кратной 11 - количеству переменных)
// исходя из сокращенной записи:
    // [[[[[[[[[[[0];[1];][2];][3];][4];][5];][6];][7];][8];][9];][10];]
    // d; eps; sigma; mu; eps_perp; sigma_perp; mu_perp; phi_0; q; sigma_mag_par; sigma_mag_perp
//    сначала задается строка "вакуум", потом в соответсвии с данными пользователя в этой встроке вносятся изменения:
//    0 - d                                                                                    (увидели ";" - переход к следующему числу)
//    1 - eps               (если это число, то следует его приравнять к №4 "eps_perp")        (увидели ";" - переход к следующему числу)
//    2 - sigma             (если это число, то следует его приравнять к №5 "sigma_perp")      (увидели ";" - переход к следующему числу)
//    3 - mu                (если это число, то следует его приравнять к №6 "mu_perp")         (увидели ";" - переход к следующему числу)
//    4 - eps_perp                                                                             (увидели ";" - переход к следующему числу)
//    5 - sigma_perp                                                                           (увидели ";" - переход к следующему числу)
//    6 - mu_perp                                                                              (увидели ";" - переход к следующему числу)
//    7 - phi_0                                                                                (увидели ";" - переход к следующему числу)
//    8 - q                                                                                    (увидели ";" - переход к следующему числу)
//    9 - sigma_mag_par     (если это число, то следует его приравнять к №10 "sigma_mag_perp") (увидели ";" - переход к следующему числу)
//    10 - sigma_mag_perp  

// приравнивания "одно другому" - чтобы пользователю меньше писать цифр при задании изотропных сред
// если какое-либо значение между ";" не распознается как число (пусто или буквы), то параметр остается "вакуумный"

// упорядоченные параметры среды "вакуум"
//    const eps_par        = 1.0;
//    const sigma_par      = 0.0;
//    const mu_par         = 1.0;
//    const eps_perp       = 1.0;
//    const sigma_perp     = 0.0;
//    const mu_perp        = 1.0;
//    const phi_0          = 0.0;
//    const q              = 0.0;
//    const sigma_mag_par  = 0.0;
//    const sigma_mag_perp = 0.0;

//    const parameterNumber = 11; // считая еще и толщину пластины

// тест функции (пройден)
// ;;;;
// 1;2;3;4;5;6;7;8;9;10;11;12;13;14;
// -1-;-2-;--3;-4;-5;---6;-7;-8;-9=;=10;+11;12;13;14;
//    -1;   -   2;  -3   ;-  4;  -5 ; -6; -7 ;-8  ;-9;10;+11;12;13;14;
// 1;;3;4; ;6;7; ;9; ;11;12;13;14;
// 1;;3;4; ;
// 1;2;3
// ;2;3;4;;;;;;10;;12;13;14;
// 1.3;2.4;3.5;4.555;5.12;6.-2;7.0;8/9;9*4;10;11;12;13;14;
// ;1;2;3;;;;;;9
// ;1;2;3;;;;;;9;
// ;1;2;3
// ;1;2;3;

    let OneStrReturn = [];
    OneStrReturn[0] = 0.0; //'--';//
    OneStrReturn[1] = 1.0; //'--';//
    OneStrReturn[2] = 0.0; //'--';//
    OneStrReturn[3] = 1.0; //'--';//
    OneStrReturn[4] = 1.0; //'--';//
    OneStrReturn[5] = 0.0; //'--';//
    OneStrReturn[6] = 1.0; //'--';//
    OneStrReturn[7] = 0.0; //'--';//
    OneStrReturn[8] = 0.0; //'--';//
    OneStrReturn[9] = 0.0; //'--';//
    OneStrReturn[10] = 0.0; //'--';//

    let SmallWord = '';
    let WordCounter = 0;
    let SimbolTmp = '';

    for (let i = 0; i < OneStr.length; i++) {
        if (OneStr[i] == ';') {
            if (!((String(Number(SmallWord)) === 'NaN') || (SmallWord == ''))) {  // если слово распознается как число, то
                OneStrReturn[WordCounter] = Number(SmallWord);
//    1 - eps               (если это число, то следует его приравнять к №4 "eps_perp")       
//    2 - sigma             (если это число, то следует его приравнять к №5 "sigma_perp")     
//    3 - mu                (если это число, то следует его приравнять к №6 "mu_perp")        
//    9 - sigma_mag_par     (если это число, то следует его приравнять к №10 "sigma_mag_perp")
                if (WordCounter == 1) {
                    OneStrReturn[4] = Number(SmallWord);
                }
                if (WordCounter == 2) {
                    OneStrReturn[5] = Number(SmallWord);
                }
                if (WordCounter == 3) {
                    OneStrReturn[6] = Number(SmallWord);
                }
                if (WordCounter == 9) {
                    OneStrReturn[10] = Number(SmallWord);
                }
            }

//                alert ('номер слова ' + WordCounter + ', слово ' + SmallWord + ', число из слова ' + Number(SmallWord));
            SmallWord = '';
            WordCounter++;
            continue;
        }
        if (WordCounter >= 11) {
            break;
        }

        SimbolTmp = OneStr[i];
        if (OneStr[i] == ' ') {
            SimbolTmp = '';
        }
        if (OneStr[i] == ',') {
            SimbolTmp = '.';
        }

        SmallWord = SmallWord + SimbolTmp;
    }
// последнее слово (в конце строки не встретилось ";")
    if (!((String(Number(SmallWord)) === 'NaN') || (SmallWord == ''))) {  // если слово распознается как число, то
        OneStrReturn[WordCounter] = Number(SmallWord);
        if (WordCounter == 1) {
            OneStrReturn[4] = Number(SmallWord);
        }
        if (WordCounter == 2) {
            OneStrReturn[5] = Number(SmallWord);
        }
        if (WordCounter == 3) {
            OneStrReturn[6] = Number(SmallWord);
        }
        if (WordCounter == 9) {
            OneStrReturn[10] = Number(SmallWord);
        }
    }
    return OneStrReturn;
}// конец функции


export function mediumSetting() {
    const self = document.querySelector('prashkevich-calc')
    let MediumParameters = [];
    let oneString = ''
    MediumParameters.push(giveString(self.shadowRoot.querySelector("#primaryMedium").value));

    var read2 = self.shadowRoot.querySelector("#plateMedium") .value;
    if (read2.length == 0) {
        oneString = giveString('');
        MediumParameters.push(oneString);
    } else {

        let SumWord = '';
        for (let i = 0; i < read2.length; i++) {
            if (read2[i] == '\n') {
                MediumParameters.push(giveString(SumWord));
                SumWord = '';
                continue;
            }
            SumWord = SumWord + read2[i];
        }
        // последнее слово (в конце строки не встретилось "\n")
        MediumParameters.push(giveString(SumWord));

    }

    MediumParameters.push(giveString(self.shadowRoot.querySelector("#finalMedium").value));
    return MediumParameters;
} // конец функции
   