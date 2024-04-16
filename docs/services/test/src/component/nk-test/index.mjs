import { onload, init } from '../../this/index.mjs';

const COMPONENT = 'nk-test';

const INDEX = class extends HTMLElement {
    constructor () {
        super();
        this.controller = {};
        this._isOnload = false;
        init(this).then(self => (self._isOnload = true)).catch(error => console.warn('error', error));
    }

    connectedCallback () {
        onload(this)
            .then(async (self) => {
                const { actions } = await import(`/test/services/test/src/component/nk-test/actions/index.mjs`);
                let { controller } = await import(`/test/services/test/src/component/nk-test/controller/index.mjs`);
                self.controller = await controller(self, await actions(self));
                await self.controller.addEventListener.init();
            })
            .catch(e => console.error('error', e));
    }

    disconnectedCallback () {
        this.controller.addEventListener.terminate();
        console.log(`     🔴 COMPONENTS ${this.tagName} disconnected`);
    }
};

if (customElements.get(COMPONENT) === undefined) {
    customElements.define(COMPONENT, INDEX);
}

export default {
    component: COMPONENT,
    description: `Компонент ${COMPONENT}`
};