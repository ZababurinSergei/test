import {store} from './store/index.mjs'

store.set('pathname', {
    pathname: '/test/services/test/src'
});

export { init, onload } from './init/index.mjs'
export {store}

export {
    clean,
    plotter,
    solvMassives
} from './myLib/index.mjs'

export default {
    description: 'all modules for this'
}