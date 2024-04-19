export function zSum(z0,z1) {
  return [z0[0]+z1[0],
          z0[1]+z1[1]];
}

export function zMult(z0,z1) {

  return [z0[0]*z1[0]-z0[1]*z1[1],
          z0[0]*z1[1]+z0[1]*z1[0]];
}

export function zS(z) {
return [z[0],-z[1]];
}

export function zNullIntrpretetor(z) {
    let NullBoundary = 1.0e-14;// 1.0e-10; //1.0e-6;

    let Re = z[0];
    let Im = z[1];
    
    if ( Math.sqrt(Re**2 + Im**2)< NullBoundary) {
          return [0,0];
          }
return [Re,Im];
}

function zAHTUNG(z){
    let NullBoundary = 1.0e-10;
    let Re = z[0];
    let Im = z[1];
    
    if ( Math.abs(Re)< NullBoundary) {
          Re = 0;
          }
    if ( Math.abs(Im)< NullBoundary) {
          Im = 0;
          }
return [Re,Im];
      }

function zAbs(z) {
return Math.sqrt(z[0]**2 + z[1]**2);
}

function zT(z) {
      let z1 = zS(z);
      let Q = z[0]**2 + z[1]**2;
return [z1[0]/Q, z1[1]/Q];
}

function zM(z) {
return [-z[0],-z[1]];
}

export function zPhi(z) {
return Math.atan2(z[1],z[0]);
}

export function zSqrt(z) {
   let phi = zPhi(z)*0.5;
   let r = Math.sqrt(zAbs(z));
return   [[r*Math.cos(phi), r*Math.sin(phi)],
          [r*Math.cos(phi+Math.PI), r*Math.sin(phi+Math.PI)]];
}

export function zExp(z) {
   let r = Math.exp(z[0]);
return   [r*Math.cos(z[1]),r*Math.sin(z[1])];
}