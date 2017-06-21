import {pfUtil} from 'pf-utils.js';

/*
 * <b>&lt;pf-modal-body&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal-body>custom content of mdoal-body</pf-modal-body>
 */

export class PfModalBody extends HTMLElement {

  /*
   * An instance of the element is created or upgraded
   */
  constructor () {
    super();
  }

  /*
   * Called every time the element is inserted into the DOM
   */
  connectedCallback () {
    pfUtil.addClass(this, 'modal-body');
  }

}

window.customElements.define('pf-modal-body', PfModalBody);