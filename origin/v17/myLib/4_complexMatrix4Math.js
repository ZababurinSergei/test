function zGetColumn (M,j) {
return [M[0][j],
        M[1][j],
        M[2][j],
        M[3][j]];
}

function zGetMultStrings(a,b) {
   let res = [0,0];
   for (let i=0; i<4; i++){
        res = zSum ( res, zMult( a[i],b[i] ) );
        }
return res;
}

function zGetMultMatrix4(A,B) {
  let c11 = [0,0];  let c12 = [0,0];  let c13 = [0,0];  let c14 = [0,0];
  let c21 = [0,0];  let c22 = [0,0];  let c23 = [0,0];  let c24 = [0,0];
  let c31 = [0,0];  let c32 = [0,0];  let c33 = [0,0];  let c34 = [0,0];
  let c41 = [0,0];  let c42 = [0,0];  let c43 = [0,0];  let c44 = [0,0];
  let C = [ [c11,c12,c13,c14],
            [c21,c22,c23,c24],
            [c31,c32,c33,c34],
            [c41,c42,c43,c44]];
   for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
             C[i][j] = zGetMultStrings( A[i],zGetColumn( B,j ) );
             }
        }
return C;
}

function zGetTransposedMatrix4(A) {
  let c11 = [0,0];  let c12 = [0,0];  let c13 = [0,0];  let c14 = [0,0];
  let c21 = [0,0];  let c22 = [0,0];  let c23 = [0,0];  let c24 = [0,0];
  let c31 = [0,0];  let c32 = [0,0];  let c33 = [0,0];  let c34 = [0,0];
  let c41 = [0,0];  let c42 = [0,0];  let c43 = [0,0];  let c44 = [0,0];
  let C = [ [c11,c12,c13,c14],
            [c21,c22,c23,c24],
            [c31,c32,c33,c34],
            [c41,c42,c43,c44]];
   for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
             C[j][i] = A[i][j];
             }
        }
return C;
}

function zDeterminant3(A) {
// zDeterminant3(A)
/// матрица с индексами:
/// 11 12 13
/// 21 22 23
/// 31 32 33
/// а детерминант матрицы 3х3 это
/// вот это:
/// 11 * 22 * 33 +
/// 12 * 23 * 31 +
/// 21 * 32 * 13
///
/// минус вот это:
/// 13 * 22 * 31 +
/// 23 * 32 * 11 +
/// 21 * 12 * 33
///
/// а у нас индексы от нуля до двух, поэтому правильно вот так:
///        (
///        A[0][0] * A[1][1] * A[2][2] +
///        A[0][1] * A[1][2] * A[2][0] +
///        A[1][0] * A[2][1] * A[0][2]
///        )
///        -
///        (
///        A[0][2] * A[1][1] * A[2][0] +
///        A[1][2] * A[2][1] * A[0][0] +
///        A[1][0] * A[0][1] * A[2][2]
///        )

  let a1 = zMult( A[0][0],zMult( A[1][1],A[2][2] ) ); 
  let a2 = zMult( A[0][1],zMult( A[1][2],A[2][0] ) ); 
  let a3 = zMult( A[1][0],zMult( A[2][1],A[0][2] ) );

  let b1 = zMult( A[0][2],zMult( A[1][1],A[2][0] ) );
  let b2 = zMult( A[1][2],zMult( A[2][1],A[0][0] ) );
  let b3 = zMult( A[1][0],zMult( A[0][1],A[2][2] ) );

  let s1 =  zSum( a1,zSum( a2,a3 ) );       //   a1 + a2 + a3
  let s2 = zM( zSum( b1,zSum( b2,b3 ) ) ) ; // -(b1 + b2 + b3)
  
return zSum(s1,s2);
}

function zGetAlgebraicComplement(A,k,l) {
  let c11 = [0,0];  let c12 = [0,0];  let c13 = [0,0];
  let c21 = [0,0];  let c22 = [0,0];  let c23 = [0,0];
  let c31 = [0,0];  let c32 = [0,0];  let c33 = [0,0];

  let C =  [[c11,c12,c13],
            [c21,c22,c23],
            [c31,c32,c33]];
   let m = 0;
   let n;
   for (let i=0; i<4; i++){
      if(i !== k){
         n = 0;
         for (let j=0; j<4; j++){
            if(j !== l){
             C[m][n] = A[i][j];
             n++
          }
         }
         m++
      }
   }
return C;
}

function zDeterminant4(A) {
   let j=0;
   Sum = [0,0];
   Tmp = [0,0];
   Minor = [0,0];
   for (let i=0; i<4; i++){
       Minor = zDeterminant3( zGetAlgebraicComplement(A,i,j) );
       Tmp = zMult( A[i][j], Minor );
       if ( (-1)**(i+j)<0 ) {
             Tmp = zM( Tmp );
             }
        Sum = zSum(Sum,Tmp);
        }
return Sum;
}

function zInverseMatrix(A) {
      
  let c11 = [0,0];  let c12 = [0,0];  let c13 = [0,0];  let c14 = [0,0];
  let c21 = [0,0];  let c22 = [0,1];  let c23 = [0,0];  let c24 = [0,0];
  let c31 = [0,0];  let c32 = [0,0];  let c33 = [0,0];  let c34 = [0,0];
  let c41 = [0,0];  let c42 = [0,0];  let c43 = [0,0];  let c44 = [0,0];
  let C = [ [c11,c12,c13,c14],
            [c21,c22,c23,c24],
            [c31,c32,c33,c34],
            [c41,c42,c43,c44]];
  let Minor = [0,0];
  let Det = zDeterminant4(A);
//  if ( zAbs( zNullIntrpretetor( Det ) ) == 0.0 ){                     
//        alert ( 'func "zInverseMatrix" say: determinant = 0 (possible NaN)' );
//        }
  for (let i=0; i<4; i++){
      for (let j=0; j<4; j++){
             Minor = zDeterminant3( zGetAlgebraicComplement(A,i,j) );
             C[i][j] = zMult( Minor,zT( Det ) );                        
             if ( (-1)**(i+j)<0 ) {                                     
                    C[i][j] = zM( C[i][j] );
             }
      }
  }
  C = zGetTransposedMatrix4(C)                                          
return C;
}

function zMaxMatrixElement(A) {
   let zMax = [0,0];
   let indexMax = [0,0];
   for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
             if(zAbs(A[i][j]) > zAbs(zMax) ) {
                   zMax = A[i][j];
                   indexMax = [i,j];
                   }
             }
        }
return [zMax,indexMax];
}

function zNormalizeMatrix(A){
let Norm = zMaxMatrixElement(A);
let Res = [[],[],[],[]];
   for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
             Res[i][j] = zMult(A[i][j],zT(Norm[0]));
             }
        }
return Res;
      }

function subtractingMatrixRows (Str1,Str2,ColumnNum) {
   let StrOut = [[0,0],[0,0],[0,0],[0,0]];
   let C =  zMult( Str2[ColumnNum],  zT( Str1[ColumnNum] ) );
   StrOut[0] = zNullIntrpretetor( zSum( Str2[0], zM( zMult( Str1[0],C ) ) ) );
   StrOut[1] = zNullIntrpretetor( zSum( Str2[1], zM( zMult( Str1[1],C ) ) ) );
   StrOut[2] = zNullIntrpretetor( zSum( Str2[2], zM( zMult( Str1[2],C ) ) ) );
   StrOut[3] = zNullIntrpretetor( zSum( Str2[3], zM( zMult( Str1[3],C ) ) ) );
return StrOut;
}

function zMaxRowElement(R) {
   let zMax = [0,0];
   let indexMax;
   for (let i=0; i<4; i++){
             if(zAbs(R[i]) > zAbs(zMax) ) {
                   zMax = R[i];
                   indexMax = [i];
                   }

        }
return [zMax,indexMax];
}

function zMatrix_minus_lambda_SV(A){
// первая итерация (матрица А)
// находим максимальный элемент и индекс элемента в 4-х строках матрицы A
   let zMax = [0,0];
   let indexMax = [0,0];
   for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
             if(zAbs(A[i][j]) > zAbs(zMax) ) {
                   zMax = A[i][j];
                   indexMax = [i,j];
                   }
             }
        }
  //проверяем максимум на ноль (всё последующее бессмысленно, если максимум ноль)
  if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {
        let d0 = 0;
        d0 = indexMax[1];

  //создаем матрицу tmp1
  let tmp1 = [];
  //ставим на первое место строку с максимальным элементом
  tmp1[0] = A[indexMax[0]];
  // заполняем остальные строки tmp1 оставшимися строками, за вычетом строки матрицы A с максимальным элементом (зануляем столбец)
  let l=0;                     // счетчик строк в матрице tmp1
  for(let i=0;i<4;i++){
        if(i!==indexMax[0]){
           l++;
           tmp1[l] = subtractingMatrixRows (A[indexMax[0]],A[i],indexMax[1]); // строка i, в которой образован ноль
        }
  }
       // вторая итерация (матрица tmp1)
       // находим максимальный элемент и индекс элемента в 3-х строках матрицы tmp1
          zMax = [0,0];
          indexMax = [1,0];
          for (let i=1; i<4; i++){
               for (let j=0; j<4; j++){
                    if(zAbs(tmp1[i][j]) > zAbs(zMax) ) {
                          zMax = tmp1[i][j];
                          indexMax = [i,j];
                          }
                    }
               }
               
       //проверяем максимум на ноль (всё последующее бессмысленно, если максимум ноль)
       if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {
        let d1 = 0;
        d1 = indexMax[1];

       //создаем матрицу tmp2
       let tmp2 = [[],[],[],[]];
      
       //на второе ставим строку с максимальным элементом
       tmp2[1] = tmp1[indexMax[0]];

       let i2 = [0,1,2,3];
       i2[1] = indexMax[0];
       i2[indexMax[0]] = 1;     
       // заполняем остальные строки tmp2 строками, за вычетом строки 1 (зануляем столбец)
       for(let i=0;i<4;i++){
             if(i !== 1){
                tmp2[i] = subtractingMatrixRows (tmp1[i2[1]],tmp1[i2[i]],indexMax[1]); // строка, в которой образован ноль
             }
       }
       // третья итерация (матрица tmp2)
       // находим максимальный элемент и индекс элемента в 2-х строках матрицы tmp2
          zMax = [0,0];
          indexMax = [2,0];
          for (let i=2; i<4; i++){
               for (let j=0; j<4; j++){
                    if(zAbs(tmp2[i][j]) > zAbs(zMax) ) {
                          zMax = tmp2[i][j];
                          indexMax = [i,j];
                          }
                    }
               }
       //проверяем максимум на ноль (всё последующее бессмысленно, если максимум ноль)
       if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {
       let d2 = 0;
       d2 = indexMax[1];

       //создаем матрицу tmp3
       let tmp3 = [];
 
       //на третье место ставим строку с максимальным элементом
       tmp3[2] = tmp2[indexMax[0]];

       let i3 = [0,1,2,3];       
       i3[2] = indexMax[0];
       i3[indexMax[0]] = 2;
      // заполняем остальные строки tmp3 строками, за вычетом строки 2 (зануляем столбец)
      for(let i=0;i<4;i++){
            if(i !== 2){
               tmp3[i] = subtractingMatrixRows (tmp2[i3[2]],tmp2[i3[i]],indexMax[1]); // строка, в которой образован ноль
            }
      }
      // четвертая итерация (матрица tmp3)
      // находим максимальный элемент и индекс элемента в последней строке матрицы tmp3
      zMax = [0,0];
      indexMax = [3,0];
           for (let j=0; j<4; j++){
                if(zAbs(tmp3[3][j]) > zAbs(zMax) ) {
                      zMax = tmp3[3][j];
                      indexMax = [3,j];
                      }
                }
      //проверяем максимум на ноль (всё последующее бессмысленно, если максимум ноль)
      if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {
      let d3 = 0;
      d3 = indexMax[1];
      //создаем матрицу tmp4
      let tmp4 = [];
 
      //на третье место ставим строку с максимальным элементом (строка номер 3, конечно)
      tmp4[3] = tmp3[indexMax[0]];

       let i4 = [0,1,2,3];       
       i4[3] = indexMax[0];
       i4[indexMax[0]] = 3;

      // заполняем остальные строки tmp4 строками, за вычетом строки 3 (зануляем столбец)
      for(let i=0;i<4;i++){
            if(i !== 3){
               tmp4[i] = subtractingMatrixRows (tmp3[i4[3]],tmp3[i4[i]],indexMax[1]); // строка, в которой образован ноль
            }
      }

      
    return [0]; // (нет собственных векторов) d0,d1,d2,d3 - номера столбцов, в которых замечен не ноль
    }
    //(один собственный вектор) d0,d1,d2 - номера столбцов, в которых замечен не ноль (матрица tmp3)
// помогайка //
//                tmp3[0][d0] tmp3[0][d1] tmp3[0][d2] tmp3[0][d3]
//                tmp3[1][d0] tmp3[1][d1] tmp3[1][d2] tmp3[1][d3]
//                tmp3[2][d0] tmp3[2][d1] tmp3[2][d2] tmp3[2][d3]
//                tmp3[3][d0] tmp3[3][d1] tmp3[3][d2] tmp3[3][d3]

//                tmp3[0][d0] ----00----- ----00----- tmp3[0][d3]
//                ----00----- tmp3[1][d1] ----00----- tmp3[1][d3]
//                ----00----- ----00----- tmp3[2][d2] tmp3[2][d3]
//                ----00----- ----00----- ----00----- ----00-----
    let SV = [];
    let d3 = 6 - (d0+d1+d2);

    SV[d0] =  zM(zMult(tmp3[0][d3],zT(tmp3[0][d0]))); 
    SV[d1] =  zM(zMult(tmp3[1][d3],zT(tmp3[1][d1]))); 
    SV[d2] =  zM(zMult(tmp3[2][d3],zT(tmp3[2][d2]))); 
    SV[d3] = [1,0];
   return SV; 
   }
//(два собственных вектора) d0,d1 - номера столбцов, в которых замечен не ноль (матрица tmp2)
   //определи d2,d3: используй две перестановки
   
   let d23 = [0,1,2,3];
   d23[0]  = d0;
   d23[d0] = 0;
   d23[1]  = d1;
   d23[d1] = 1;

   let d2 = d23[2];
   let d3 = d23[3];

// напиши SV2
// помогайка //
//                tmp2[0][d0] tmp2[0][d1] tmp2[0][d2] tmp2[0][d3]
//                tmp2[1][d0] tmp2[1][d1] tmp2[1][d2] tmp2[1][d3]
//                tmp2[2][d0] tmp2[2][d1] tmp2[2][d2] tmp2[2][d3]
//                tmp2[3][d0] tmp2[3][d1] tmp2[3][d2] tmp2[3][d3]

// только в двух строках замечен не ноль (в остальных ноль), и этот "неноль" занулял весь столбец кроме себя
//                tmp2[0][d0] ----00----- tmp2[0][d2] tmp2[0][d3]    ->   x(d0) = - tmp2[0][d2]/tmp2[0][d0]        - tmp2[0][d3]/tmp2[0][d0] 
//                ----00----- tmp2[1][d1] tmp2[1][d2] tmp2[1][d3]    ->   y(d1) = - tmp2[1][d2]/tmp2[1][d1]        - tmp2[1][d3]/tmp2[1][d1]
//                ----00----- ----00----- ----00----- ----00-----    ->   z(d2) =   1                                0
//                ----00----- ----00----- ----00----- ----00-----    ->   t(d3) =   0                                1

//                x(d0) = - tmp2[0][d2]/tmp2[0][d0]        - tmp2[0][d3]/tmp2[0][d0]
//                y(d1) = - tmp2[1][d2]/tmp2[1][d1]        - tmp2[1][d3]/tmp2[1][d1]
//                z(d2) =   1                                0
//                t(d3) =   0                                1

   let SV2 = [[],[]];                                                   // маска "математики" комплексных чисел
                                                                        //: zM( zMult( U,zT( W ) ) )
   SV2[0][d0] =   zM( zMult( tmp2[0][d2],zT( tmp2[0][d0] ) ) );         //- tmp2[0][d2]/tmp2[0][d0];   
   SV2[0][d1] =   zM( zMult( tmp2[1][d2],zT( tmp2[1][d1] ) ) );         //- tmp2[1][d2]/tmp2[1][d1];
   SV2[0][d2] =   [1,0]                  ;                              //  [1,0]                  ;
   SV2[0][d3] =   [0,0]                  ;                              //  [0,0]                  ;
                                                                   
   SV2[1][d0] =   zM( zMult( tmp2[0][d3],zT( tmp2[0][d0] ) ) );         //- tmp2[0][d3]/tmp2[0][d0];
   SV2[1][d1] =   zM( zMult( tmp2[1][d3],zT( tmp2[1][d1] ) ) );         //- tmp2[1][d3]/tmp2[1][d1];
   SV2[1][d2] =   [0,0];                                                //  [0,0];
   SV2[1][d3] =   [1,0];                                                //  [1,0];

  return SV2; 
  }
//(три собственных вектора) d0 - номер столбца, в котором замечен не ноль (матрица tmp1)
//определи d1,d2,d3: используй одну перестановку
   let d23 = [0,1,2,3];
   d23[0]  = d0;
   let d1 = d23[1];
   let d2 = d23[2];
   let d3 = d23[3];

// напиши SV3 (три вектора)
// помогайка //
//                tmp1[0][d0] tmp1[0][d1] tmp1[0][d2] tmp1[0][d3]
//                tmp1[1][d0] tmp1[1][d1] tmp1[1][d2] tmp1[1][d3]
//                tmp1[2][d0] tmp1[2][d1] tmp1[2][d2] tmp1[2][d3]
//                tmp1[3][d0] tmp1[3][d1] tmp1[3][d2] tmp1[3][d3]

// только в одной строке замечен не ноль (в остальных ноль)
//                tmp1[0][d0] tmp1[0][d1] tmp1[0][d2] tmp1[0][d3]    ->   x(d0) = - tmp1[0][d1]/tmp1[0][d0]  -tmp1[0][d2]/tmp1[0][d0]  -tmp1[0][d3]/tmp1[0][d0]
//                ----00----- ----00----- ----00----- ----00-----    ->   y(d1) =   1                         0                        0
//                ----00----- ----00----- ----00----- ----00-----    ->   z(d2) =   0                         1                        0
//                ----00----- ----00----- ----00----- ----00-----    ->   t(d3) =   0                         0                        1

//                 x(d0) = - tmp1[0][d1]/tmp1[0][d0]  -tmp1[0][d2]/tmp1[0][d0]  -tmp1[0][d3]/tmp1[0][d0]
//                 y(d1) =   1                         0                        0
//                 z(d2) =   0                         1                        0
//                 t(d3) =   0                         0                        1

   let SV3 = [[],[],[]];                                                    //: zM( zMult( U,zT( W ) ) )         
   SV3[0][d0] = zM( zMult( tmp1[0][d1],zT( tmp1[0][d0] ) ) );        // - tmp1[0][d1]/tmp1[0][d0]
   SV3[0][d1] = [1,0];
   SV3[0][d2] = [0,0];
   SV3[0][d3] = [0,0];

   SV3[1][d0] = zM( zMult( tmp1[0][d2],zT( tmp1[0][d0] ) ) );        //-tmp1[0][d2]/tmp1[0][d0]
   SV3[1][d1] = [0,0];
   SV3[1][d2] = [1,0];
   SV3[1][d3] = [0,0];

   SV3[2][d0] = zM( zMult( tmp1[0][d3],zT( tmp1[0][d0] ) ) );       //-tmp1[0][d3]/tmp1[0][d0]
   SV3[2][d1] = [0,0];
   SV3[2][d2] = [0,0];
   SV3[2][d3] = [1,0];
   
 return SV3;  
 }
return [4]; //(4 собственных вектора)
}
////++++++++++++++++++++++++++

function zSV(C){

   let A = zNormalizeMatrix(C);
   let zMax = [0,0];
   let indexMax = [0,0];
   for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
             if(zAbs(A[i][j]) > zAbs(zMax) ) {
                   zMax = A[i][j];
                   indexMax = [i,j];
                   }
             }
        }
  if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {

        
        let d0 = 0;
        d0 = indexMax[1];
  let tmp1 = [];
  tmp1[0] = A[indexMax[0]];
  let l=0;                     
  for(let i=0;i<4;i++){
        if(i!==indexMax[0]){
           l++;
           tmp1[l] = subtractingMatrixRows (A[indexMax[0]],A[i],indexMax[1]); 
        }
  }
          zMax = [0,0];
          indexMax = [1,0];
          for (let i=1; i<4; i++){
               for (let j=0; j<4; j++){
                    if(zAbs(tmp1[i][j]) > zAbs(zMax) ) {
                          zMax = tmp1[i][j];
                          indexMax = [i,j];
                          }
                    }
               }
       if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {

             
        let d1 = 0;
        d1 = indexMax[1];
       let tmp2 = [[],[],[],[]];
       tmp2[1] = tmp1[indexMax[0]];
       let i2 = [0,1,2,3];
       i2[1] = indexMax[0];
       i2[indexMax[0]] = 1;     
       for(let i=0;i<4;i++){
             if(i !== 1){
                tmp2[i] = subtractingMatrixRows (tmp1[i2[1]],tmp1[i2[i]],indexMax[1]); 
             }
       }
          zMax = [0,0];
          indexMax = [2,0];
          for (let i=2; i<4; i++){
               for (let j=0; j<4; j++){
                    if(zAbs(tmp2[i][j]) > zAbs(zMax) ) {
                          zMax = tmp2[i][j];
                          indexMax = [i,j];
                          }
                    }
               }


               
       if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {
             
       let d2 = 0;
       d2 = indexMax[1];
       let tmp3 = [];
       tmp3[2] = tmp2[indexMax[0]];
       let i3 = [0,1,2,3];       
       i3[2] = indexMax[0];
       i3[indexMax[0]] = 2;
      for(let i=0;i<4;i++){
            if(i !== 2){
               tmp3[i] = subtractingMatrixRows (tmp2[i3[2]],tmp2[i3[i]],indexMax[1]); 
            }
      }

//      zMax = [0,0];
//      indexMax = [3,0];
//           for (let j=0; j<4; j++){
//                if(zAbs(tmp3[3][j]) > zAbs(zMax) ) {
//                      zMax = tmp3[3][j];
//                      indexMax = [3,j];
//                      }
//               }
//      if ( zAbs( zNullIntrpretetor(zMax) ) !== 0) {
//      let d3 = 0;
//      d3 = indexMax[1];
//      let tmp4 = [];
//      tmp4[3] = tmp3[indexMax[0]];
//       let i4 = [0,1,2,3];       
//       i4[3] = indexMax[0];
//       i4[indexMax[0]] = 3;
//      for(let i=0;i<4;i++){
//            if(i !== 3){
//               tmp4[i] = subtractingMatrixRows (tmp3[i4[3]],tmp3[i4[i]],indexMax[1]); 
//            }
//      }
//    return [[ [0,0],[0,0],[0,0],[0,0] ], 
//            [ [0,0],[0,0],[0,0],[0,0] ],
//            [ [0,0],[0,0],[0,0],[0,0] ],
//            [ [0,0],[0,0],[0,0],[0,0] ]]; // (нет собственных векторов) d0,d1,d2,d3 - номера столбцов, в которых замечен не ноль
//    }

    let SV = [];
    let d3 = 6 - (d0+d1+d2);
    SV[d0] =  zM(zMult(tmp3[0][d3],zT(tmp3[0][d0]))); 
    SV[d1] =  zM(zMult(tmp3[1][d3],zT(tmp3[1][d1]))); 
    SV[d2] =  zM(zMult(tmp3[2][d3],zT(tmp3[2][d2]))); 
    SV[d3] = [1,0];

    return  [ SV ,                      // один собственный вектор
             [ [0,0],[0,0],[0,0],[0,0] ],
             [ [0,0],[0,0],[0,0],[0,0] ],
             [ [0,0],[0,0],[0,0],[0,0] ]];
   }
   let d23 = [0,1,2,3];
   d23[0]  = d0;
   d23[d0] = 0;
   d23[1]  = d1;
   d23[d1] = 1;
   let d2 = d23[2];
   let d3 = d23[3];
   let SV2 = [[],[]];                                                   
                                                                        
   SV2[0][d0] =   zM( zMult( tmp2[0][d2],zT( tmp2[0][d0] ) ) );         
   SV2[0][d1] =   zM( zMult( tmp2[1][d2],zT( tmp2[1][d1] ) ) );         
   SV2[0][d2] =   [1,0]                  ;                              
   SV2[0][d3] =   [0,0]                  ;                              
                                                                   
   SV2[1][d0] =   zM( zMult( tmp2[0][d3],zT( tmp2[0][d0] ) ) );         
   SV2[1][d1] =   zM( zMult( tmp2[1][d3],zT( tmp2[1][d1] ) ) );         
   SV2[1][d2] =   [0,0];                                                
   SV2[1][d3] =   [1,0];                                                

  return  [ SV2[0] ,           // два собственных вектора
            SV2[1] ,
           [ [0,0],[0,0],[0,0],[0,0] ],
           [ [0,0],[0,0],[0,0],[0,0] ]];
  }
   let d23 = [0,1,2,3];
   d23[0]  = d0;
   let d1 = d23[1];
   let d2 = d23[2];
   let d3 = d23[3];
   let SV3 = [[],[],[]];                                                   
   SV3[0][d0] = zM( zMult( tmp1[0][d1],zT( tmp1[0][d0] ) ) );      
   SV3[0][d1] = [1,0];
   SV3[0][d2] = [0,0];
   SV3[0][d3] = [0,0];

   SV3[1][d0] = zM( zMult( tmp1[0][d2],zT( tmp1[0][d0] ) ) );      
   SV3[1][d1] = [0,0];
   SV3[1][d2] = [1,0];
   SV3[1][d3] = [0,0];

   SV3[2][d0] = zM( zMult( tmp1[0][d3],zT( tmp1[0][d0] ) ) );      
   SV3[2][d1] = [0,0];
   SV3[2][d2] = [0,0];
   SV3[2][d3] = [1,0];

 return    [ SV3[0] ,           //(три собственных вектора)
             SV3[1] ,
             SV3[2] ,
            [ [0,0],[0,0],[0,0],[0,0] ]];


 
 }

 
return [[ [1,0],[0,0],[0,0],[0,0] ],
        [ [0,0],[1,0],[0,0],[0,0] ],
        [ [0,0],[0,0],[1,0],[0,0] ],
        [ [0,0],[0,0],[0,0],[1,0] ]]; //(4 собственных вектора)
}

function zAHTUNG_Matrix(A) {
  let C = [[],[],[],[]];
   for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
             C[i][j] = zAHTUNG( A[i][j] );
             }
        }
return C;
}
/////////////////////




