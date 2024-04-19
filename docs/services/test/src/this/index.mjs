import {store} from './store/index.mjs'

store.set('pathname', {
    pathname: '/test/services/test/src'
});

export { init, onload } from './init/index.mjs'
export {store}

export {
    clean,
    plotter,
    solvMassives,
    mediumSetting,
    giveString,
    zSum,
    zMult,
    zS,
    zNullIntrpretetor,
    zAHTUNG,
    zAbs,
    zT,
    zM,
    zPhi,
    zSqrt,
    zExp,
    zSV,
    zGetAlgebraicComplement,
    zDeterminant3,
    zGetTransposedMatrix4,
    zGetMultMatrix4,
    zGetMultStrings,
    zGetColumn,
    zInverseMatrix,
    zMaxMatrixElement,
    zNormalizeMatrix,
    subtractingMatrixRows,
    zMaxRowElement,
    zMatrix_minus_lambda_SV,
    zAHTUNG_Matrix,
    getDiMatrix,
    getCoefficients
} from './myLib/index.mjs'

export default {
    description: 'all modules for this'
}