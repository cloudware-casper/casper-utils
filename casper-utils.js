/*
  - Copyright (c) 2014-2016 Cloudware S.A. All rights reserved.
  -
  - This file is part of casper-utils.
  -
  - casper-utils is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - casper-utils  is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with casper-utils.  If not, see <http://www.gnu.org/licenses/>.
  -
*/

class CasperLogger {
  constructor () {
      if (window.console.constructor.name !== "CasperLogger") {
        this.console = window.console;
      }
      return new Proxy(this, this);
  }
  get (target, prop) {
    //return Function.prototype.bind.call(this.console[prop], this.console);
    if (typeof this[prop] === "function") {
      return this[prop];
    }
    if (localStorage.casperLoggerActive !== "true") {
      return function(){};
    }
    return Function.prototype.bind.call(this.console[prop], this.console);
  }
  enable () {
    localStorage.setItem("casperLoggerActive", true);
  }
  disable () {
    localStorage.removeItem("casperLoggerActive");
  }
}

window.console = new CasperLogger();


/**
* Casper Browser
*/

class CasperBrowser {
  // Firefox 1.0+
  static get isFirefox () {
    return typeof InstallTrigger !== 'undefined';
  }

  // Internet Explorer 6-11
  static get isIE () {
    return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;
  }

  // Edge 20+
  static get isEdge () {
    return !CasperBrowser.isIE && !!window.StyleMedia;
  }

  // Chrome 1+
  static get isChrome () {
    return !!window.chrome;
  }

  // At least Safari 3+: "[object HTMLElementConstructor]"
  static get isSafari ()  {
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
           navigator.userAgent &&
           navigator.userAgent.indexOf('CriOS') == -1 &&
           navigator.userAgent.indexOf('FxiOS') == -1 &&
           navigator.userAgent.indexOf('Chrome') == -1;
  }

  static get isIos () {
    return navigator && ( (navigator.platform === 'iPad' || navigator.platform === 'iPhone') || new RegExp('\\biPhone\\b|\\biPod\\b').test(window.navigator.userAgent) );
  }
}

window.CasperBrowser = CasperBrowser;