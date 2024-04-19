export default async (self, actions) => {

    const solvMassives = self.shadowRoot.querySelector('.nk-solv-massives')
    const nkPlotter = self.shadowRoot.querySelector('.nk-plotter')
    const  nkClean = self.shadowRoot.querySelector('.nk-clean')

    return {
        init: async () => {
            solvMassives.addEventListener("click", actions.solvMassives);
            nkPlotter.addEventListener("change", actions.plotter);
            nkClean.addEventListener("click", actions.clean);
        },
        terminate: async () => {
            solvMassives.removeEventListener('click', actions.solvMassives);
            nkPlotter.removeEventListener('change', actions.plotter);
            nkClean.removeEventListener("click", actions.clean);
        }
    }
}