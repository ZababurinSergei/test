export default async (self, actions) => {

    const solvMassives = self.shadowRoot.querySelector('.solv-massives')

    return {
        init: async () => {
            solvMassives.addEventListener("click", actions.solvMassives);
        },
        terminate: async () => {
            solvMassives.removeEventListener('click', actions.solvMassives);
        }
    }
}