import {store} from './store/index.mjs'

store.set('pathname', '/test/src');

export { init, onload } from './init/index.mjs'
export {store}
export default {
    description: 'all modules for this'
}