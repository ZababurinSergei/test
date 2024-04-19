import {
    clean,
    plotter,
    solvMassives
} from '../../../this/index.mjs'
export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            solvMassives: async (event) => {
                console.log('------------ Начать расчет ---------------')
                solvMassives()
            },
            plotter: async () => {
                console.log('------------ плотер ---------------')
                plotter()
            },
            clean: async () => {
                console.log('------------ очистка ---------------')
                clean()
            }
        });
    });
};

export default {
    description: 'action'
};