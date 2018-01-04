/**
 * @module src/app
 */

import Geolocation from './components/Geolocation/Geolocation.js';
import {fromTest as testMe} from './components/test'; // also we can use aliases
/**
 * This class is called by the app entry point.
 * It holds the logic initiation.
 * @class main
 */
export default class main {
  /**
   * Inits the whole logic of the app
   * @method init
   * @static
   */
  static init() {
    this.initGeolocation();
    this.test();
  }

  /**
   * Inits the {{#crossLink "components.Geolocation.Geolocation"}}Geolocation{{/crossLink}} component
   * @method initGeolocation
   * @static
   */
  static initGeolocation() {
    (new Geolocation('geolocation')).init();
  }

  static test() {
      console.log(testMe);
  }
}
