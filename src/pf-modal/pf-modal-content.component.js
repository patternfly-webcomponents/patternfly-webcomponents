import {pfUtil} from 'pf-utils.js';

/*
 * <b>&lt;pf-modal-content&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal target-selector="#btn-toggle-modal" backdrop keyboard>
 *  <pf-modal-dialog>
 *   <pf-modal-content> practical content of pf-modal </pf-modal-content>
 *  </pf-modal-dialog>
 * </pf-modal>
 */

export class PfModalContent extends HTMLElement {

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
    pfUtil.addClass(this, 'modal-content');
  }

}

window.customElements.define('pf-modal-content', PfModalContent);