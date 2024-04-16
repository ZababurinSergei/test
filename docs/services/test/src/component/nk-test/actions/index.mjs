export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            solvMassives: async (event) => {
                console.log('------------ Начать расчет ---------------')
            }
        });
    });
};

export default {
    description: 'action'
};