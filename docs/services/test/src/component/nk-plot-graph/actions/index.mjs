export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            solvMassives: async (event) => {
                console.log('------------ Начать расчет ---------------')
            },
            plotter: async () => {
                console.log('------------ плотер ---------------')
            },
            clean: async () => {
                console.log('------------ очистка ---------------')
            }
        });
    });
};

export default {
    description: 'action'
};