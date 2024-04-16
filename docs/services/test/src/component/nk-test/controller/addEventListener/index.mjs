export default async (self, actions) => {

    const solvMassives = self.shadowRoot.querySelector('.solv-massives')

    return {
        init: () => {
            solvMassives.addEventListener("click", actions.solvMassives);
        },
        terminate: () => {
            solvMassives.removeEventListener('click', actions.solvMassives);
        }
    }
}