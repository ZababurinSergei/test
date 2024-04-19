/////////////
export function getDiMatrix(parameterString, omega) {

    let d = parameterString[0];
    let eps_par = parameterString[1];
    let sigma_par = parameterString[2];
    let mu_par = parameterString[3];
    let eps_perp = parameterString[4];
    let sigma_perp = parameterString[5];
    let mu_perp = parameterString[6];
    let phi_0 = parameterString[7] * Math.PI;
    let q = parameterString[8];
    let sigma_mag_par = parameterString[9];
    let sigma_mag_perp = parameterString[10];
    let z_d = [d, 0];
    let z_eps_par = [eps_par, -sigma_par / omega];
    let z_mu_par = [mu_par, -sigma_mag_par / omega];
    let z_eps_perp = [eps_perp, -sigma_perp / omega];
    let z_mu_perp = [mu_perp, -sigma_mag_perp / omega];

    let skobka_plus = zSum(zMult(z_eps_perp, z_mu_par), zMult(z_eps_par, z_mu_perp));
    let om2_2 = [(omega ** 2) / 2, 0];
    let nu = zSum(zMult(om2_2, skobka_plus), [q ** 2, 0]);

    let skobka_minus = zSum(zMult(z_eps_perp, z_mu_par), zM(zMult(z_eps_par, z_mu_perp)));
    let skobka_minus2 = zMult(skobka_minus, skobka_minus);
    let PS = zMult([(omega ** 4) / 4, 0], skobka_minus2);

    let skobka_megaPlus = zSum(zSum(skobka_plus, zMult(z_eps_perp, z_mu_perp)), zMult(z_eps_par, z_mu_par));
    let VS = zMult([omega ** 2 * q ** 2, 0], skobka_megaPlus);

    let tau2 = zSum(PS, VS);

    let tau = zSqrt(tau2);

    let lambda0_i = zSqrt(zSum(nu, tau[0]));
    let lambda1_i = zSqrt(zSum(nu, tau[1]));

    let lambda1 = zMult([0, 1], lambda0_i[0]);
    let lambda2 = zMult([0, 1], lambda0_i[1]);
    let lambda3 = zMult([0, 1], lambda1_i[0]);
    let lambda4 = zMult([0, 1], lambda1_i[1]);

    let Lambda = [];
    let MatrixSVStrings = [[], [], [], []];

    if (zAbs(zNullIntrpretetor(tau2)) == 0) {
        if (zAbs(zNullIntrpretetor(nu)) == 0) {

            Lambda = [[0, 0], [0, 0], [0, 0], [0, 0]];
            MatrixSVStrings = [[[1, 0], [0, 0], [0, 0], [0, 0]],
                [[0, 0], [1, 0], [0, 0], [0, 0]],
                [[0, 0], [0, 0], [1, 0], [0, 0]],
                [[0, 0], [0, 0], [0, 0], [1, 0]]];
        } else {

            Lambda[0] = lambda1;
            Lambda[1] = lambda1;
            Lambda[2] = lambda2;
            Lambda[3] = lambda2;


// alert(Lambda[0] + '|' + '\n' + Lambda[1] + '|' + '\n' + Lambda[2] + '|' + '\n' + Lambda[3]);

            let me = zMult([0, omega], z_mu_perp);
            let ma = zMult([0, omega], z_mu_par);
            let ee = zMult([0, omega], z_eps_perp);
            let ea = zMult([0, omega], z_eps_par);

            let m11 = [0, 0];
            let m12 = [q, 0];
            let m13 = [0, 0];
            let m14 = zM(me);
            let m21 = [-q, 0];
            let m22 = [0, 0];
            let m23 = ma;
            let m24 = [0, 0];
            let m31 = [0, 0];
            let m32 = ee;
            let m33 = [0, 0];
            let m34 = [q, 0];
            let m41 = zM(ea);
            let m42 = [0, 0];
            let m43 = [-q, 0];
            let m44 = [0, 0];

            let M = [[m11, m12, m13, m14],
                [m21, m22, m23, m24],
                [m31, m32, m33, m34],
                [m41, m42, m43, m44]];

            let new_diagonal_minus = zM(Lambda[0]);
            M[0][0] = new_diagonal_minus;
            M[1][1] = new_diagonal_minus;
            M[2][2] = new_diagonal_minus;
            M[3][3] = new_diagonal_minus;

            let tmpMatr = [[], [], [], []];
            tmpMatr = zSV(M);

//alert(tmpMatr[0] + '\n' + tmpMatr[1] + '\n' + tmpMatr[2] + '\n' + tmpMatr[3]);


            MatrixSVStrings[0] = tmpMatr[0];
            MatrixSVStrings[1] = tmpMatr[1];

            new_diagonal_minus = zM(Lambda[2]);

//alert(new_diagonal_minus);

            M[0][0] = new_diagonal_minus;
            M[1][1] = new_diagonal_minus;
            M[2][2] = new_diagonal_minus;
            M[3][3] = new_diagonal_minus;

//alert(M[0] + '\n' + M[1] + '\n' + M[2] + '\n' + M[3]);

            tmpMatr = zSV(M);

//alert(tmpMatr[0] + '\n' + tmpMatr[1] + '\n' + tmpMatr[2] + '\n' + tmpMatr[3]);

            MatrixSVStrings[2] = tmpMatr[0];
            MatrixSVStrings[3] = tmpMatr[1];
        }
    } else {
        Lambda[0] = lambda1;
        Lambda[1] = lambda2;
        Lambda[2] = lambda3;
        Lambda[3] = lambda4;

        let me = zMult([0, omega], z_mu_perp);
        let ma = zMult([0, omega], z_mu_par);
        let ee = zMult([0, omega], z_eps_perp);
        let ea = zMult([0, omega], z_eps_par);

        let m11 = [0, 0];
        let m12 = [q, 0];
        let m13 = [0, 0];
        let m14 = zM(me);
        let m21 = [-q, 0];
        let m22 = [0, 0];
        let m23 = ma;
        let m24 = [0, 0];
        let m31 = [0, 0];
        let m32 = ee;
        let m33 = [0, 0];
        let m34 = [q, 0];
        let m41 = zM(ea);
        let m42 = [0, 0];
        let m43 = [-q, 0];
        let m44 = [0, 0];

        let M = [[m11, m12, m13, m14],
            [m21, m22, m23, m24],
            [m31, m32, m33, m34],
            [m41, m42, m43, m44]];

        let new_diagonal_minus = [0, 0];
        let tmpMatr = [[], [], [], []];

        for (let i = 0; i < 4; i++) {
            new_diagonal_minus = zM(Lambda[i]);
            M[0][0] = new_diagonal_minus;
            M[1][1] = new_diagonal_minus;
            M[2][2] = new_diagonal_minus;
            M[3][3] = new_diagonal_minus;
            tmpMatr = zSV(M);
            MatrixSVStrings[i] = tmpMatr[0];
        }
    }
/////////////////------------------------------------------------------------------------
    //////////////////////////////////////////////////////////////alert(MatrixSVStrings);
///////////////--------------------------------------------------------------------------

// [[ [0,0],[0,0],[0,0],[0,0] ],
//  [ [0,0],[0,0],[0,0],[0,0] ],
//  [ [0,0],[0,0],[0,0],[0,0] ],
//  [ [0,0],[0,0],[0,0],[0,0] ]];

    let Matrix1_zedLeft = [[[Math.cos(phi_0), 0], [-Math.sin(phi_0), 0], [0, 0], [0, 0]],
        [[Math.sin(phi_0), 0], [Math.cos(phi_0), 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [Math.cos(phi_0), 0], [-Math.sin(phi_0), 0]],
        [[0, 0], [0, 0], [Math.sin(phi_0), 0], [Math.cos(phi_0), 0]]];

    let Matrix2_Beta = zGetTransposedMatrix4(MatrixSVStrings);

    let Matrix3_Mi = [[zExp(zM(zMult(Lambda[0], [d, 0]))), [0, 0], [0, 0], [0, 0]],
        [[0, 0], zExp(zM(zMult(Lambda[1], [d, 0]))), [0, 0], [0, 0]],
        [[0, 0], [0, 0], zExp(zM(zMult(Lambda[2], [d, 0]))), [0, 0]],
        [[0, 0], [0, 0], [0, 0], zExp(zM(zMult(Lambda[3], [d, 0])))]];

    let Matrix4_Beta_1 = zInverseMatrix(Matrix2_Beta);

    let Matrix_zedRight = [[[Math.cos(q * d + phi_0), 0], [-Math.sin(q * d + phi_0), 0], [0, 0], [0, 0]],
        [[Math.sin(q * d + phi_0), 0], [Math.cos(q * d + phi_0), 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [Math.cos(q * d + phi_0), 0], [-Math.sin(q * d + phi_0), 0]],
        [[0, 0], [0, 0], [Math.sin(q * d + phi_0), 0], [Math.cos(q * d + phi_0), 0]]];


    let Matrix5_zedRight_1 = zInverseMatrix(Matrix_zedRight);


    let MatrixDi = zGetMultMatrix4(Matrix1_zedLeft,
        zGetMultMatrix4(Matrix2_Beta,
            zGetMultMatrix4(Matrix3_Mi,
                zGetMultMatrix4(Matrix4_Beta_1,
                    Matrix5_zedRight_1)
            )
        )
    );
    return MatrixDi;
}

///////////////////////////////////


///////////////////////////////////
export function getCoefficients(ParameterMassive, omega) {

    let eps0 = ParameterMassive[0][1];
    let sigma0 = ParameterMassive[0][2];
    let mu0 = ParameterMassive[0][3];

    let r0 = Math.sqrt(eps0 ** 2 + (sigma0 / omega) ** 2);
    let Mult0 = Math.sqrt(mu0 / 2) / r0;
    let ReRho = Mult0 * (eps0 * Math.sqrt(eps0 + r0) + (sigma0 / omega) * Math.sqrt(r0 - eps0));
    let ImRho = Mult0 * (eps0 * Math.sqrt(r0 - eps0) - (sigma0 / omega) * Math.sqrt(r0 + eps0));
    let Rho = [ReRho, ImRho];
    let elem_0 = zMult(zMult([mu0, 0], zT(Rho)), [0.5, 0]);

    let o11 = [0.5, 0];
    let o12 = [0, 0];
    let o13 = [0, 0];
    let o14 = elem_0;
    let o21 = [0, 0];
    let o22 = [0.5, 0];
    let o23 = zM(elem_0);
    let o24 = [0, 0];
    let o31 = [0.5, 0];
    let o32 = [0, 0];
    let o33 = [0, 0];
    let o34 = zM(elem_0);
    let o41 = [0, 0];
    let o42 = [0.5, 0];
    let o43 = elem_0;
    let o44 = [0, 0];

    let OO = [[o11, o12, o13, o14],
        [o21, o22, o23, o24],
        [o31, o32, o33, o34],
        [o41, o42, o43, o44]];

    let D = OO;
    let Di = [[], [], [], []];
    let n = ParameterMassive.length;
    for (let i = 1; i < (n - 1); i++) {
        Di = getDiMatrix(ParameterMassive[i], omega);
        D = zGetMultMatrix4(D, Di);
    }

    let eps_l = ParameterMassive[n - 1][1];
    let sigma_l = ParameterMassive[n - 1][2];
    let mu_l = ParameterMassive[n - 1][3];

    let r_l = Math.sqrt(eps_l ** 2 + (sigma_l / omega) ** 2);
    let Mult_l = Math.sqrt(mu_l / 2) / r_l;
    let ReRh_l = Mult_l * (eps_l * Math.sqrt(eps_l + r_l) + (sigma_l / omega) * Math.sqrt(r_l - eps_l));
    let ImRh_l = Mult_l * (eps_l * Math.sqrt(r_l - eps_l) - (sigma_l / omega) * Math.sqrt(r_l + eps_l));
    let Rh_l = [ReRh_l, ImRh_l];
    let elem_l = zMult(Rh_l, zT([mu_l, 0]));

    let l11 = [1, 0];
    let l12 = [0, 0];
    let l13 = [1, 0];
    let l14 = [0, 0];
    let l21 = [0, 0];
    let l22 = [1, 0];
    let l23 = [0, 0];
    let l24 = [1, 0];
    let l31 = [0, 0];
    let l32 = zM(elem_l);
    let l33 = [0, 0];
    let l34 = elem_l;
    let l41 = elem_l;
    let l42 = [0, 0];
    let l43 = zM(elem_l);
    let l44 = [0, 0];


    let LL = [[l11, l12, l13, l14],
        [l21, l22, l23, l24],
        [l31, l32, l33, l34],
        [l41, l42, l43, l44]];

    let U = zGetMultMatrix4(D, LL);

//вычисляем векторы С
// U
    let t11 = U[0][0];
    let t12 = U[0][1];
    let t13 = [0, 0];
    let t14 = [0, 0];
    let t21 = U[1][0];
    let t22 = U[1][1];
    let t23 = [0, 0];
    let t24 = [0, 0];
    let t31 = [0, 0];
    let t32 = [0, 0];
    let t33 = [1, 0];
    let t34 = [0, 0];
    let t41 = [0, 0];
    let t42 = [0, 0];
    let t43 = [0, 0];
    let t44 = [1, 0];

    let T_1 = [[t11, t12, t13, t14],
        [t21, t22, t23, t24],
        [t31, t32, t33, t34],
        [t41, t42, t43, t44]];

    let T = zInverseMatrix(T_1);

    let r11 = U[2][0];
    let r12 = U[2][1];
    let r13 = [0, 0];
    let r14 = [0, 0];
    let r21 = U[3][0];
    let r22 = U[3][1];
    let r23 = [0, 0];
    let r24 = [0, 0];
    let r31 = [0, 0];
    let r32 = [0, 0];
    let r33 = [1, 0];
    let r34 = [0, 0];
    let r41 = [0, 0];
    let r42 = [0, 0];
    let r43 = [0, 0];
    let r44 = [1, 0];

    let R_0 = [[r11, r12, r13, r14],
        [r21, r22, r23, r24],
        [r31, r32, r33, r34],
        [r41, r42, r43, r44]];

    let R = zGetMultMatrix4(R_0, T);

    let c_xI = [[1, 0], [0, 0], [0, 0], [0, 0]];
    let c_xR = [[0, 0], [0, 0], R[0][0], R[1][0]];
    let c_xT = [T[0][0], T[1][0], [0, 0], [0, 0]];
    let c_yI = [[0, 0], [1, 0], [0, 0], [0, 0]];
    let c_yR = [[0, 0], [0, 0], R[0][1], R[1][1]];
    let c_yT = [T[0][1], T[1][1], [0, 0], [0, 0]];

//Вычисляем векторы А
//OO
//LL

    let OO_1 = zInverseMatrix(OO);

    let a_xI = [zGetMultStrings(OO_1[0], c_xI),
        zGetMultStrings(OO_1[1], c_xI),
        zGetMultStrings(OO_1[2], c_xI),
        zGetMultStrings(OO_1[3], c_xI)];

    let a_xR = [zGetMultStrings(OO_1[0], c_xR),
        zGetMultStrings(OO_1[1], c_xR),
        zGetMultStrings(OO_1[2], c_xR),
        zGetMultStrings(OO_1[3], c_xR)];

    let a_xT = [zGetMultStrings(LL[0], c_xT),
        zGetMultStrings(LL[1], c_xT),
        zGetMultStrings(LL[2], c_xT),
        zGetMultStrings(LL[3], c_xT)];

    let a_yI = [zGetMultStrings(OO_1[0], c_yI),
        zGetMultStrings(OO_1[1], c_yI),
        zGetMultStrings(OO_1[2], c_yI),
        zGetMultStrings(OO_1[3], c_yI)];

    let a_yR = [zGetMultStrings(OO_1[0], c_yR),
        zGetMultStrings(OO_1[1], c_yR),
        zGetMultStrings(OO_1[2], c_yR),
        zGetMultStrings(OO_1[3], c_yR)];

    let a_yT = [zGetMultStrings(LL[0], c_yT),
        zGetMultStrings(LL[1], c_yT),
        zGetMultStrings(LL[2], c_yT),
        zGetMultStrings(LL[3], c_yT)];


    let a_rI = [zSum(a_xI[0], zMult([0, 1], a_yI[0])),
        zSum(a_xI[1], zMult([0, 1], a_yI[1])),
        zSum(a_xI[2], zMult([0, 1], a_yI[2])),
        zSum(a_xI[3], zMult([0, 1], a_yI[3]))];

    let a_rR = [zSum(a_xR[0], zMult([0, 1], a_yR[0])),
        zSum(a_xR[1], zMult([0, 1], a_yR[1])),
        zSum(a_xR[2], zMult([0, 1], a_yR[2])),
        zSum(a_xR[3], zMult([0, 1], a_yR[3]))];

    let a_rT = [zSum(a_xT[0], zMult([0, 1], a_yT[0])),
        zSum(a_xT[1], zMult([0, 1], a_yT[1])),
        zSum(a_xT[2], zMult([0, 1], a_yT[2])),
        zSum(a_xT[3], zMult([0, 1], a_yT[3]))];

    let a_lI = [zSum(a_xI[0], zM(zMult([0, 1], a_yI[0]))),
        zSum(a_xI[1], zM(zMult([0, 1], a_yI[1]))),
        zSum(a_xI[2], zM(zMult([0, 1], a_yI[2]))),
        zSum(a_xI[3], zM(zMult([0, 1], a_yI[3])))];

    let a_lR = [zSum(a_xR[0], zM(zMult([0, 1], a_yR[0]))),
        zSum(a_xR[1], zM(zMult([0, 1], a_yR[1]))),
        zSum(a_xR[2], zM(zMult([0, 1], a_yR[2]))),
        zSum(a_xR[3], zM(zMult([0, 1], a_yR[3])))];

    let a_lT = [zSum(a_xT[0], zM(zMult([0, 1], a_yT[0]))),
        zSum(a_xT[1], zM(zMult([0, 1], a_yT[1]))),
        zSum(a_xT[2], zM(zMult([0, 1], a_yT[2]))),
        zSum(a_xT[3], zM(zMult([0, 1], a_yT[3])))];

    let S_xI = Math.abs(0.25 * zSum(zSum(zMult(a_xI[0], zS(a_xI[3])),
            zM(zMult(a_xI[1], zS(a_xI[2])))),
        zSum(zMult(zS(a_xI[0]), a_xI[3]),
            zM(zMult(zS(a_xI[1]), a_xI[2]))))[0]);

    let S_xR = Math.abs(0.25 * zSum(zSum(zMult(a_xR[0], zS(a_xR[3])),
            zM(zMult(a_xR[1], zS(a_xR[2])))),
        zSum(zMult(zS(a_xR[0]), a_xR[3]),
            zM(zMult(zS(a_xR[1]), a_xR[2]))))[0]);

    let S_xT = Math.abs(0.25 * zSum(zSum(zMult(a_xT[0], zS(a_xT[3])),
            zM(zMult(a_xT[1], zS(a_xT[2])))),
        zSum(zMult(zS(a_xT[0]), a_xT[3]),
            zM(zMult(zS(a_xT[1]), a_xT[2]))))[0]);

    let S_yI = Math.abs(0.25 * zSum(zSum(zMult(a_yI[0], zS(a_yI[3])),
            zM(zMult(a_yI[1], zS(a_yI[2])))),
        zSum(zMult(zS(a_yI[0]), a_yI[3]),
            zM(zMult(zS(a_yI[1]), a_yI[2]))))[0]);

    let S_yR = Math.abs(0.25 * zSum(zSum(zMult(a_yR[0], zS(a_yR[3])),
            zM(zMult(a_yR[1], zS(a_yR[2])))),
        zSum(zMult(zS(a_yR[0]), a_yR[3]),
            zM(zMult(zS(a_yR[1]), a_yR[2]))))[0]);

    let S_yT = Math.abs(0.25 * zSum(zSum(zMult(a_yT[0], zS(a_yT[3])),
            zM(zMult(a_yT[1], zS(a_yT[2])))),
        zSum(zMult(zS(a_yT[0]), a_yT[3]),
            zM(zMult(zS(a_yT[1]), a_yT[2]))))[0]);

    let S_rI = Math.abs(0.25 * zSum(zSum(zMult(a_rI[0], zS(a_rI[3])),
            zM(zMult(a_rI[1], zS(a_rI[2])))),
        zSum(zMult(zS(a_rI[0]), a_rI[3]),
            zM(zMult(zS(a_rI[1]), a_rI[2]))))[0]);

    let S_rR = Math.abs(0.25 * zSum(zSum(zMult(a_rR[0], zS(a_rR[3])),
            zM(zMult(a_rR[1], zS(a_rR[2])))),
        zSum(zMult(zS(a_rR[0]), a_rR[3]),
            zM(zMult(zS(a_rR[1]), a_rR[2]))))[0]);


    let S_rT = Math.abs(0.25 * zSum(zSum(zMult(a_rT[0], zS(a_rT[3])),
            zM(zMult(a_rT[1], zS(a_rT[2])))),
        zSum(zMult(zS(a_rT[0]), a_rT[3]),
            zM(zMult(zS(a_rT[1]), a_rT[2]))))[0]);

    let S_lI = Math.abs(0.25 * zSum(zSum(zMult(a_lI[0], zS(a_lI[3])),
            zM(zMult(a_lI[1], zS(a_lI[2])))),
        zSum(zMult(zS(a_lI[0]), a_lI[3]),
            zM(zMult(zS(a_lI[1]), a_lI[2]))))[0]);

    let S_lR = Math.abs(0.25 * zSum(zSum(zMult(a_lR[0], zS(a_lR[3])),
            zM(zMult(a_lR[1], zS(a_lR[2])))),
        zSum(zMult(zS(a_lR[0]), a_lR[3]),
            zM(zMult(zS(a_lR[1]), a_lR[2]))))[0]);

    let S_lT = Math.abs(0.25 * zSum(zSum(zMult(a_lT[0], zS(a_lT[3])),
            zM(zMult(a_lT[1], zS(a_lT[2])))),
        zSum(zMult(zS(a_lT[0]), a_lT[3]),
            zM(zMult(zS(a_lT[1]), a_lT[2]))))[0]);

//Вычисляем коэффициенты отражения R, прохождения T, поглощения A

    let coefTx = S_xT /
        S_xI;
    let coefTy = S_yT /
        S_yI;
    let coefTr = S_rT /
        S_rI;
    let coefTl = S_lT /
        S_lI;

    let coefRx = S_xR /
        S_xI;
    let coefRy = S_yR /
        S_yI;
    let coefRr = S_rR /
        S_rI;
    let coefRl = S_lR /
        S_lI;

    let coefAx = 1 - (coefRx + coefTx);
    let coefAy = 1 - (coefRy + coefTy);
    let coefAr = 1 - (coefRr + coefTr);
    let coefAl = 1 - (coefRl + coefTl);

    return [coefTx,
        coefTy,
        coefTr,
        coefTl,
        coefRx,
        coefRy,
        coefRr,
        coefRl,
        coefAx,
        coefAy,
        coefAr,
        coefAl];
}

/////////////
