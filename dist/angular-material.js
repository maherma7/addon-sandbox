/*!
 * AngularJS Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.24
 */
(function( window, angular, undefined ){
"use strict";

(function(){
"use strict";

angular.module('ngMaterial', ["ng","ngAnimate","ngAria","material.core","material.core.animate","material.core.gestures","material.core.interaction","material.core.layout","material.core.meta","material.core.theming.palette","material.core.theming","material.components.autocomplete","material.components.backdrop","material.components.bottomSheet","material.components.button","material.components.card","material.components.checkbox","material.components.chips","material.components.colors","material.components.content","material.components.datepicker","material.components.dialog","material.components.divider","material.components.fabActions","material.components.fabShared","material.components.fabSpeedDial","material.components.fabToolbar","material.components.gridList","material.components.icon","material.components.input","material.components.list","material.components.menu","material.components.menuBar","material.components.navBar","material.components.panel","material.components.progressCircular","material.components.progressLinear","material.components.radioButton","material.components.select","material.components.showHide","material.components.sidenav","material.components.slider","material.components.sticky","material.components.subheader","material.components.swipe","material.components.switch","material.components.tabs","material.components.toast","material.components.toolbar","material.components.tooltip","material.components.truncate","material.components.virtualRepeat","material.components.whiteframe"]);
})();
(function(){
"use strict";

/**
 * Initialization function that validates environment
 * requirements.
 */
DetectNgTouch.$inject = ["$log", "$injector"];
MdCoreConfigure.$inject = ["$provide", "$mdThemingProvider"];
rAFDecorator.$inject = ["$delegate"];
qDecorator.$inject = ["$delegate"];
angular
  .module('material.core', [
    'ngAnimate',
    'material.core.animate',
    'material.core.layout',
    'material.core.interaction',
    'material.core.gestures',
    'material.core.theming'
  ])
  .config(MdCoreConfigure)
  .run(DetectNgTouch);


/**
 * Detect if the ng-Touch module is also being used.
 * Warn if detected.
 * @ngInject
 */
function DetectNgTouch($log, $injector) {
  if ($injector.has('$swipe')) {
    var msg = "" +
      "You are using the ngTouch module. \n" +
      "AngularJS Material already has mobile click, tap, and swipe support... \n" +
      "ngTouch is not supported with AngularJS Material!";
    $log.warn(msg);
  }
}

/**
 * @ngInject
 */
function MdCoreConfigure($provide, $mdThemingProvider) {

  $provide.decorator('$$rAF', ['$delegate', rAFDecorator]);
  $provide.decorator('$q', ['$delegate', qDecorator]);

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink')
    .warnPalette('deep-orange')
    .backgroundPalette('grey');
}

/**
 * @ngInject
 */
function rAFDecorator($delegate) {
  /**
   * Use this to throttle events that come in often.
   * The throttled function will always use the *last* invocation before the
   * coming frame.
   *
   * For example, window resize events that fire many times a second:
   * If we set to use an raf-throttled callback on window resize, then
   * our callback will only be fired once per frame, with the last resize
   * event that happened before that frame.
   *
   * @param {function} callback function to debounce
   */
  $delegate.throttle = function(cb) {
    var queuedArgs, alreadyQueued, queueCb, context;
    return function debounced() {
      queuedArgs = arguments;
      context = this;
      queueCb = cb;
      if (!alreadyQueued) {
        alreadyQueued = true;
        $delegate(function() {
          queueCb.apply(context, Array.prototype.slice.call(queuedArgs));
          alreadyQueued = false;
        });
      }
    };
  };
  return $delegate;
}

/**
 * @ngInject
 */
function qDecorator($delegate) {
  /**
   * Adds a shim for $q.resolve for AngularJS version that don't have it,
   * so we don't have to think about it.
   *
   * via https://github.com/angular/angular.js/pull/11987
   */

  // TODO(crisbeto): this won't be necessary once we drop AngularJS 1.3
  if (!$delegate.resolve) {
    $delegate.resolve = $delegate.when;
  }
  return $delegate;
}

})();
(function(){
"use strict";


MdAutofocusDirective.$inject = ["$parse"];angular.module('material.core')
  .directive('mdAutofocus', MdAutofocusDirective)

  // Support the deprecated md-auto-focus and md-sidenav-focus as well
  .directive('mdAutoFocus', MdAutofocusDirective)
  .directive('mdSidenavFocus', MdAutofocusDirective);

/**
 * @ngdoc directive
 * @name mdAutofocus
 * @module material.core.util
 *
 * @description
 *
 * `[md-autofocus]` provides an optional way to identify the focused element when a `$mdDialog`,
 * `$mdBottomSheet`, `$mdMenu` or `$mdSidenav` opens or upon page load for input-like elements.
 *
 * When one of these opens, it will find the first nested element with the `[md-autofocus]`
 * attribute directive and optional expression. An expression may be specified as the directive
 * value to enable conditional activation of the autofocus.
 *
 * @usage
 *
 * ### Dialog
 * <hljs lang="html">
 * <md-dialog>
 *   <form>
 *     <md-input-container>
 *       <label for="testInput">Label</label>
 *       <input id="testInput" type="text" md-autofocus>
 *     </md-input-container>
 *   </form>
 * </md-dialog>
 * </hljs>
 *
 * ### Bottomsheet
 * <hljs lang="html">
 * <md-bottom-sheet class="md-list md-has-header">
 *  <md-subheader>Comment Actions</md-subheader>
 *  <md-list>
 *    <md-list-item ng-repeat="item in items">
 *
 *      <md-button md-autofocus="$index == 2">
 *        <md-icon md-svg-src="{{item.icon}}"></md-icon>
 *        <span class="md-inline-list-icon-label">{{ item.name }}</span>
 *      </md-button>
 *
 *    </md-list-item>
 *  </md-list>
 * </md-bottom-sheet>
 * </hljs>
 *
 * ### Autocomplete
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-autofocus
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in getMatches(searchText)"
 *       md-item-text="item.display">
 *     <span md-highlight-text="searchText">{{item.display}}</span>
 *   </md-autocomplete>
 * </hljs>
 *
 * ### Sidenav
 * <hljs lang="html">
 * <div layout="row" ng-controller="MyController">
 *   <md-sidenav md-component-id="left" class="md-sidenav-left">
 *     Left Nav!
 *   </md-sidenav>
 *
 *   <md-content>
 *     Center Content
 *     <md-button ng-click="openLeftMenu()">
 *       Open Left Menu
 *     </md-button>
 *   </md-content>
 *
 *   <md-sidenav md-component-id="right"
 *     md-is-locked-open="$mdMedia('min-width: 333px')"
 *     class="md-sidenav-right">
 *     <form>
 *       <md-input-container>
 *         <label for="testInput">Test input</label>
 *         <input id="testInput" type="text"
 *                ng-model="data" md-autofocus>
 *       </md-input-container>
 *     </form>
 *   </md-sidenav>
 * </div>
 * </hljs>
 **/
function MdAutofocusDirective($parse) {
  return {
    restrict: 'A',
    link: {
      pre: preLink
    }
  };

  function preLink(scope, element, attr) {
    var attrExp = attr.mdAutoFocus || attr.mdAutofocus || attr.mdSidenavFocus;

    // Initially update the expression by manually parsing the expression as per $watch source.
    updateExpression($parse(attrExp)(scope));

    // Only watch the expression if it is not empty.
    if (attrExp) {
      scope.$watch(attrExp, updateExpression);
    }

    /**
     * Updates the autofocus class which is used to determine whether the attribute
     * expression evaluates to true or false.
     * @param {string|boolean} value Attribute Value
     */
    function updateExpression(value) {

      // Rather than passing undefined to the jqLite toggle class function we explicitly set the
      // value to true. Otherwise the class will be just toggled instead of being forced.
      if (angular.isUndefined(value)) {
        value = true;
      }

      element.toggleClass('md-autofocus', !!value);
    }
  }

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.colorUtil
 * @description
 * Color Util
 */
angular
  .module('material.core')
  .factory('$mdColorUtil', ColorUtilFactory);

function ColorUtilFactory() {
  /**
   * Converts hex value to RGBA string
   * @param color {string}
   * @returns {string}
   */
  function hexToRgba (color) {
    var hex   = color[ 0 ] === '#' ? color.substr(1) : color,
      dig   = hex.length / 3,
      red   = hex.substr(0, dig),
      green = hex.substr(dig, dig),
      blue  = hex.substr(dig * 2);
    if (dig === 1) {
      red += red;
      green += green;
      blue += blue;
    }
    return 'rgba(' + parseInt(red, 16) + ',' + parseInt(green, 16) + ',' + parseInt(blue, 16) + ',0.1)';
  }

  /**
   * Converts rgba value to hex string
   * @param {string} color
   * @returns {string}
   */
  function rgbaToHex(color) {
    color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    var hex = (color && color.length === 4) ? "#" +
    ("0" + parseInt(color[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(color[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(color[3],10).toString(16)).slice(-2) : '';

    return hex.toUpperCase();
  }

  /**
   * Converts an RGB color to RGBA
   * @param {string} color
   * @returns {string}
   */
  function rgbToRgba (color) {
    return color.replace(')', ', 0.1)').replace('(', 'a(');
  }

  /**
   * Converts an RGBA color to RGB
   * @param {string} color
   * @returns {string}
   */
  function rgbaToRgb (color) {
    return color
      ? color.replace('rgba', 'rgb').replace(/,[^),]+\)/, ')')
      : 'rgb(0,0,0)';
  }

  return {
    rgbaToHex: rgbaToHex,
    hexToRgba: hexToRgba,
    rgbToRgba: rgbToRgba,
    rgbaToRgb: rgbaToRgb
  };
}

})();
(function(){
"use strict";

angular.module('material.core')
.factory('$mdConstant', MdConstantFactory);

/**
 * Factory function that creates the grab-bag $mdConstant service.
 * @ngInject
 */
function MdConstantFactory() {

  var prefixTestEl = document.createElement('div');
  var vendorPrefix = getVendorPrefix(prefixTestEl);
  var isWebkit = /webkit/i.test(vendorPrefix);
  var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;

  /**
   * @param {string} name CSS property name
   * @return {string} the property name supported by the browser
   */
  function vendorProperty(name) {
    // Add a dash between the prefix and name, to be able to transform the string into camelcase.
    var prefixedName = vendorPrefix + '-' + name;
    var ucPrefix = camelCase(prefixedName);
    var lcPrefix = ucPrefix.charAt(0).toLowerCase() + ucPrefix.substring(1);

    return hasStyleProperty(prefixTestEl, name)     ? name     :       // The current browser supports the un-prefixed property
           hasStyleProperty(prefixTestEl, ucPrefix) ? ucPrefix :       // The current browser only supports the prefixed property.
           hasStyleProperty(prefixTestEl, lcPrefix) ? lcPrefix : name; // Some browsers are only supporting the prefix in lowercase.
  }

  function hasStyleProperty(testElement, property) {
    return angular.isDefined(testElement.style[property]);
  }

  /**
   * @param {!string} input value to convert to camelCase
   * @return {string} camelCased version of the input string
   */
  function camelCase(input) {
    return input.replace(SPECIAL_CHARS_REGEXP, function(matches, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    });
  }

  function getVendorPrefix(testElement) {
    var prop, match;
    var vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

    for (prop in testElement.style) {
      if (match = vendorRegex.exec(prop)) {
        return match[0];
      }
    }
  }

  var self = {
    isInputKey : function(e) { return (e.keyCode >= 31 && e.keyCode <= 90); },
    isNumPadKey : function(e) { return (3 === e.location && e.keyCode >= 97 && e.keyCode <= 105); },
    isMetaKey: function(e) { return (e.keyCode >= 91 && e.keyCode <= 93); },
    isFnLockKey: function(e) { return (e.keyCode >= 112 && e.keyCode <= 145); },
    isNavigationKey : function(e) {
      var kc = self.KEY_CODE, NAVIGATION_KEYS =  [kc.SPACE, kc.ENTER, kc.UP_ARROW, kc.DOWN_ARROW];
      return (NAVIGATION_KEYS.indexOf(e.keyCode) != -1);
    },
    hasModifierKey: function(e) {
      return e.ctrlKey || e.metaKey || e.altKey;
    },

    /**
     * Maximum size, in pixels, that can be explicitly set to an element. The actual value varies
     * between browsers, but IE11 has the very lowest size at a mere 1,533,917px. Ideally we could
     * compute this value, but Firefox always reports an element to have a size of zero if it
     * goes over the max, meaning that we'd have to binary search for the value.
     */
    ELEMENT_MAX_PIXELS: 1533917,

    /**
     * Priority for a directive that should run before the directives from ngAria.
     */
    BEFORE_NG_ARIA: 210,

    /**
     * Common Keyboard actions and their associated keycode.
     */
    KEY_CODE: {
      COMMA: 188,
      SEMICOLON : 186,
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT_ARROW : 37,
      UP_ARROW : 38,
      RIGHT_ARROW : 39,
      DOWN_ARROW : 40,
      TAB : 9,
      BACKSPACE: 8,
      DELETE: 46
    },

    /**
     * Vendor prefixed CSS properties to be used to support the given functionality in older browsers
     * as well.
     */
    CSS: {
      /* Constants */
      TRANSITIONEND: 'transitionend' + (isWebkit ? ' webkitTransitionEnd' : ''),
      ANIMATIONEND: 'animationend' + (isWebkit ? ' webkitAnimationEnd' : ''),

      TRANSFORM: vendorProperty('transform'),
      TRANSFORM_ORIGIN: vendorProperty('transformOrigin'),
      TRANSITION: vendorProperty('transition'),
      TRANSITION_DURATION: vendorProperty('transitionDuration'),
      ANIMATION_PLAY_STATE: vendorProperty('animationPlayState'),
      ANIMATION_DURATION: vendorProperty('animationDuration'),
      ANIMATION_NAME: vendorProperty('animationName'),
      ANIMATION_TIMING: vendorProperty('animationTimingFunction'),
      ANIMATION_DIRECTION: vendorProperty('animationDirection')
    },

    /**
     * As defined in core/style/_variables.scss
     *
     * $layout-breakpoint-xs:     600px !default;
     * $layout-breakpoint-sm:     960px !default;
     * $layout-breakpoint-md:     1280px !default;
     * $layout-breakpoint-lg:     1920px !default;
     *
     */
    MEDIA: {
      'xs'        : '(max-width: 599px)'                         ,
      'gt-xs'     : '(min-width: 600px)'                         ,
      'sm'        : '(min-width: 600px) and (max-width: 959px)'  ,
      'gt-sm'     : '(min-width: 960px)'                         ,
      'md'        : '(min-width: 960px) and (max-width: 1279px)' ,
      'gt-md'     : '(min-width: 1280px)'                        ,
      'lg'        : '(min-width: 1280px) and (max-width: 1919px)',
      'gt-lg'     : '(min-width: 1920px)'                        ,
      'xl'        : '(min-width: 1920px)'                        ,
      'landscape' : '(orientation: landscape)'                   ,
      'portrait'  : '(orientation: portrait)'                    ,
      'print' : 'print'
    },

    MEDIA_PRIORITY: [
      'xl',
      'gt-lg',
      'lg',
      'gt-md',
      'md',
      'gt-sm',
      'sm',
      'gt-xs',
      'xs',
      'landscape',
      'portrait',
      'print'
    ]
  };

  return self;
}

})();
(function(){
"use strict";

  angular
    .module('material.core')
    .config(["$provide", function($provide){
       $provide.decorator('$mdUtil', ['$delegate', function ($delegate){
           /**
            * Inject the iterator facade to easily support iteration and accessors
            * @see iterator below
            */
           $delegate.iterator = MdIterator;

           return $delegate;
         }
       ]);
     }]);

  /**
   * iterator is a list facade to easily support iteration and accessors
   *
   * @param items Array list which this iterator will enumerate
   * @param reloop Boolean enables iterator to consider the list as an endless reloop
   */
  function MdIterator(items, reloop) {
    var trueFn = function() { return true; };

    if (items && !angular.isArray(items)) {
      items = Array.prototype.slice.call(items);
    }

    reloop = !!reloop;
    var _items = items || [];

    // Published API
    return {
      items: getItems,
      count: count,

      inRange: inRange,
      contains: contains,
      indexOf: indexOf,
      itemAt: itemAt,

      findBy: findBy,

      add: add,
      remove: remove,

      first: first,
      last: last,
      next: angular.bind(null, findSubsequentItem, false),
      previous: angular.bind(null, findSubsequentItem, true),

      hasPrevious: hasPrevious,
      hasNext: hasNext

    };

    /**
     * Publish copy of the enumerable set
     * @returns {Array|*}
     */
    function getItems() {
      return [].concat(_items);
    }

    /**
     * Determine length of the list
     * @returns {Array.length|*|number}
     */
    function count() {
      return _items.length;
    }

    /**
     * Is the index specified valid
     * @param index
     * @returns {Array.length|*|number|boolean}
     */
    function inRange(index) {
      return _items.length && (index > -1) && (index < _items.length);
    }

    /**
     * Can the iterator proceed to the next item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns {Array.length|*|number|boolean}
     */
    function hasNext(item) {
      return item ? inRange(indexOf(item) + 1) : false;
    }

    /**
     * Can the iterator proceed to the previous item in the list; relative to
     * the specified item.
     *
     * @param item
     * @returns {Array.length|*|number|boolean}
     */
    function hasPrevious(item) {
      return item ? inRange(indexOf(item) - 1) : false;
    }

    /**
     * Get item at specified index/position
     * @param index
     * @returns {*}
     */
    function itemAt(index) {
      return inRange(index) ? _items[index] : null;
    }

    /**
     * Find all elements matching the key/value pair
     * otherwise return null
     *
     * @param val
     * @param key
     *
     * @return array
     */
    function findBy(key, val) {
      return _items.filter(function(item) {
        return item[key] === val;
      });
    }

    /**
     * Add item to list
     * @param item
     * @param index
     * @returns {*}
     */
    function add(item, index) {
      if (!item) return -1;

      if (!angular.isNumber(index)) {
        index = _items.length;
      }

      _items.splice(index, 0, item);

      return indexOf(item);
    }

    /**
     * Remove item from list...
     * @param item
     */
    function remove(item) {
      if (contains(item)){
        _items.splice(indexOf(item), 1);
      }
    }

    /**
     * Get the zero-based index of the target item
     * @param item
     * @returns {*}
     */
    function indexOf(item) {
      return _items.indexOf(item);
    }

    /**
     * Boolean existence check
     * @param item
     * @returns {boolean}
     */
    function contains(item) {
      return item && (indexOf(item) > -1);
    }

    /**
     * Return first item in the list
     * @returns {*}
     */
    function first() {
      return _items.length ? _items[0] : null;
    }

    /**
     * Return last item in the list...
     * @returns {*}
     */
    function last() {
      return _items.length ? _items[_items.length - 1] : null;
    }

    /**
     * Find the next item. If reloop is true and at the end of the list, it will go back to the
     * first item. If given, the `validate` callback will be used to determine whether the next item
     * is valid. If not valid, it will try to find the next item again.
     *
     * @param {boolean} backwards Specifies the direction of searching (forwards/backwards)
     * @param {*} item The item whose subsequent item we are looking for
     * @param {Function=} validate The `validate` function
     * @param {integer=} limit The recursion limit
     *
     * @returns {*} The subsequent item or null
     */
    function findSubsequentItem(backwards, item, validate, limit) {
      validate = validate || trueFn;

      var curIndex = indexOf(item);
      while (true) {
        if (!inRange(curIndex)) return null;

        var nextIndex = curIndex + (backwards ? -1 : 1);
        var foundItem = null;
        if (inRange(nextIndex)) {
          foundItem = _items[nextIndex];
        } else if (reloop) {
          foundItem = backwards ? last() : first();
          nextIndex = indexOf(foundItem);
        }

        if ((foundItem === null) || (nextIndex === limit)) return null;
        if (validate(foundItem)) return foundItem;

        if (angular.isUndefined(limit)) limit = nextIndex;

        curIndex = nextIndex;
      }
    }
  }


})();
(function(){
"use strict";


mdMediaFactory.$inject = ["$mdConstant", "$rootScope", "$window"];angular.module('material.core')
.factory('$mdMedia', mdMediaFactory);

/**
 * @ngdoc service
 * @name $mdMedia
 * @module material.core
 *
 * @description
 * `$mdMedia` is used to evaluate whether a given media query is true or false given the
 * current device's screen / window size. The media query will be re-evaluated on resize, allowing
 * you to register a watch.
 *
 * `$mdMedia` also has pre-programmed support for media queries that match the layout breakpoints:
 *
 *  <table class="md-api-table">
 *    <thead>
 *    <tr>
 *      <th>Breakpoint</th>
 *      <th>mediaQuery</th>
 *    </tr>
 *    </thead>
 *    <tbody>
 *    <tr>
 *      <td>xs</td>
 *      <td>(max-width: 599px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-xs</td>
 *      <td>(min-width: 600px)</td>
 *    </tr>
 *    <tr>
 *      <td>sm</td>
 *      <td>(min-width: 600px) and (max-width: 959px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-sm</td>
 *      <td>(min-width: 960px)</td>
 *    </tr>
 *    <tr>
 *      <td>md</td>
 *      <td>(min-width: 960px) and (max-width: 1279px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-md</td>
 *      <td>(min-width: 1280px)</td>
 *    </tr>
 *    <tr>
 *      <td>lg</td>
 *      <td>(min-width: 1280px) and (max-width: 1919px)</td>
 *    </tr>
 *    <tr>
 *      <td>gt-lg</td>
 *      <td>(min-width: 1920px)</td>
 *    </tr>
 *    <tr>
 *      <td>xl</td>
 *      <td>(min-width: 1920px)</td>
 *    </tr>
 *    <tr>
 *      <td>landscape</td>
 *      <td>landscape</td>
 *    </tr>
 *    <tr>
 *      <td>portrait</td>
 *      <td>portrait</td>
 *    </tr>
 *    <tr>
 *      <td>print</td>
 *      <td>print</td>
 *    </tr>
 *    </tbody>
 *  </table>
 *
 *  See Material Design's <a href="https://material.google.com/layout/responsive-ui.html">Layout - Adaptive UI</a> for more details.
 *
 *  <a href="https://material.io/archive/guidelines/layout/responsive-ui.html#">
 *  <img src="https://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B8olV15J7abPSGFxemFiQVRtb1k/layout_adaptive_breakpoints_01.png" width="100%" height="100%"></img>
 *  </a>
 *
 * @returns {boolean} a boolean representing whether or not the given media query is true or false.
 *
 * @usage
 * <hljs lang="js">
 * app.controller('MyController', function($mdMedia, $scope) {
 *   $scope.$watch(function() { return $mdMedia('lg'); }, function(big) {
 *     $scope.bigScreen = big;
 *   });
 *
 *   $scope.screenIsSmall = $mdMedia('sm');
 *   $scope.customQuery = $mdMedia('(min-width: 1234px)');
 *   $scope.anotherCustom = $mdMedia('max-width: 300px');
 * });
 * </hljs>
 */

/* @ngInject */
function mdMediaFactory($mdConstant, $rootScope, $window) {
  var queries = {};
  var mqls = {};
  var results = {};
  var normalizeCache = {};

  $mdMedia.getResponsiveAttribute = getResponsiveAttribute;
  $mdMedia.getQuery = getQuery;
  $mdMedia.watchResponsiveAttributes = watchResponsiveAttributes;

  return $mdMedia;

  function $mdMedia(query) {
    var validated = queries[query];
    if (angular.isUndefined(validated)) {
      validated = queries[query] = validate(query);
    }

    var result = results[validated];
    if (angular.isUndefined(result)) {
      result = add(validated);
    }

    return result;
  }

  function validate(query) {
    return $mdConstant.MEDIA[query] ||
           ((query.charAt(0) !== '(') ? ('(' + query + ')') : query);
  }

  function add(query) {
    var result = mqls[query];
    if (!result) {
      result = mqls[query] = $window.matchMedia(query);
    }

    result.addListener(onQueryChange);
    return (results[result.media] = !!result.matches);
  }

  function onQueryChange(query) {
    $rootScope.$evalAsync(function() {
      results[query.media] = !!query.matches;
    });
  }

  function getQuery(name) {
    return mqls[name];
  }

  function getResponsiveAttribute(attrs, attrName) {
    for (var i = 0; i < $mdConstant.MEDIA_PRIORITY.length; i++) {
      var mediaName = $mdConstant.MEDIA_PRIORITY[i];
      if (!mqls[queries[mediaName]].matches) {
        continue;
      }

      var normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
      if (attrs[normalizedName]) {
        return attrs[normalizedName];
      }
    }

    // fallback on unprefixed
    return attrs[getNormalizedName(attrs, attrName)];
  }

  function watchResponsiveAttributes(attrNames, attrs, watchFn) {
    var unwatchFns = [];
    attrNames.forEach(function(attrName) {
      var normalizedName = getNormalizedName(attrs, attrName);
      if (angular.isDefined(attrs[normalizedName])) {
        unwatchFns.push(
            attrs.$observe(normalizedName, angular.bind(void 0, watchFn, null)));
      }

      for (var mediaName in $mdConstant.MEDIA) {
        normalizedName = getNormalizedName(attrs, attrName + '-' + mediaName);
        if (angular.isDefined(attrs[normalizedName])) {
          unwatchFns.push(
              attrs.$observe(normalizedName, angular.bind(void 0, watchFn, mediaName)));
        }
      }
    });

    return function unwatch() {
      unwatchFns.forEach(function(fn) { fn(); });
    };
  }

  // Improves performance dramatically
  function getNormalizedName(attrs, attrName) {
    return normalizeCache[attrName] ||
        (normalizeCache[attrName] = attrs.$normalize(attrName));
  }
}

})();
(function(){
"use strict";

angular
  .module('material.core')
  .config(["$provide", function($provide) {
    $provide.decorator('$mdUtil', ['$delegate', function ($delegate) {

      // Inject the prefixer into our original $mdUtil service.
      $delegate.prefixer = MdPrefixer;

      return $delegate;
    }]);
  }]);

function MdPrefixer(initialAttributes, buildSelector) {
  var PREFIXES = ['data', 'x'];

  if (initialAttributes) {
    // The prefixer also accepts attributes as a parameter, and immediately builds a list or selector for
    // the specified attributes.
    return buildSelector ? _buildSelector(initialAttributes) : _buildList(initialAttributes);
  }

  return {
    buildList: _buildList,
    buildSelector: _buildSelector,
    hasAttribute: _hasAttribute,
    removeAttribute: _removeAttribute
  };

  function _buildList(attributes) {
    attributes = angular.isArray(attributes) ? attributes : [attributes];

    attributes.forEach(function(item) {
      PREFIXES.forEach(function(prefix) {
        attributes.push(prefix + '-' + item);
      });
    });

    return attributes;
  }

  function _buildSelector(attributes) {
    attributes = angular.isArray(attributes) ? attributes : [attributes];

    return _buildList(attributes)
      .map(function(item) {
        return '[' + item + ']';
      })
      .join(',');
  }

  function _hasAttribute(element, attribute) {
    element = _getNativeElement(element);

    if (!element) {
      return false;
    }

    var prefixedAttrs = _buildList(attribute);

    for (var i = 0; i < prefixedAttrs.length; i++) {
      if (element.hasAttribute(prefixedAttrs[i])) {
        return true;
      }
    }

    return false;
  }

  function _removeAttribute(element, attribute) {
    element = _getNativeElement(element);

    if (!element) {
      return;
    }

    _buildList(attribute).forEach(function(prefixedAttribute) {
      element.removeAttribute(prefixedAttribute);
    });
  }

  /**
   * Transforms a jqLite or DOM element into a HTML element.
   * This is useful when supporting jqLite elements and DOM elements at
   * same time.
   * @param element {JQLite|Element} Element to be parsed
   * @returns {HTMLElement} Parsed HTMLElement
   */
  function _getNativeElement(element) {
    element =  element[0] || element;

    if (element.nodeType) {
      return element;
    }
  }

}

})();
(function(){
"use strict";

/*
 * This var has to be outside the angular factory, otherwise when
 * there are multiple material apps on the same page, each app
 * will create its own instance of this array and the app's IDs
 * will not be unique.
 */
UtilFactory.$inject = ["$document", "$timeout", "$compile", "$rootScope", "$$mdAnimate", "$interpolate", "$log", "$rootElement", "$window", "$$rAF"];
var nextUniqueId = 0, isIos, isAndroid;

// Support material-tools builds.
if (window.navigator) {
  var userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
  isIos = userAgent.match(/ipad|iphone|ipod/i);
  isAndroid = userAgent.match(/android/i);
}

/**
 * @ngdoc module
 * @name material.core.util
 * @description
 * Util
 */
angular
.module('material.core')
.factory('$mdUtil', UtilFactory);

/**
 * @ngInject
 */
function UtilFactory($document, $timeout, $compile, $rootScope, $$mdAnimate, $interpolate, $log,
                     $rootElement, $window, $$rAF) {
  // Setup some core variables for the processTemplate method
  var startSymbol = $interpolate.startSymbol(),
    endSymbol = $interpolate.endSymbol(),
    usesStandardSymbols = ((startSymbol === '{{') && (endSymbol === '}}'));

  // Polyfill document.contains for IE11.
  document.contains || (document.contains = function (node) {
    return document.body.contains(node);
  });

  /**
   * Checks if the target element has the requested style by key
   * @param {DOMElement|JQLite} target Target element
   * @param {string} key Style key
   * @param {string=} expectedVal Optional expected value
   * @returns {boolean} Whether the target element has the style or not
   */
  var hasComputedStyle = function (target, key, expectedVal) {
    var hasValue = false;

    if (target && target.length) {
      var computedStyles = $window.getComputedStyle(target[0]);
      hasValue = angular.isDefined(computedStyles[key]) &&
        (expectedVal ? computedStyles[key] == expectedVal : true);
    }

    return hasValue;
  };

  function validateCssValue(value) {
    return !value ? '0' :
      hasPx(value) || hasPercent(value) ? value : value + 'px';
  }

  function hasPx(value) {
    return String(value).indexOf('px') > -1;
  }

  function hasPercent(value) {
    return String(value).indexOf('%') > -1;
  }

  var $mdUtil = {
    dom: {},
    isIos: isIos,
    isAndroid: isAndroid,
    now: window.performance && window.performance.now ?
      angular.bind(window.performance, window.performance.now) : Date.now || function() {
      return new Date().getTime();
    },

    /**
     * Cross-version compatibility method to retrieve an option of a ngModel controller,
     * which supports the breaking changes in the AngularJS snapshot (SHA 87a2ff76af5d0a9268d8eb84db5755077d27c84c).
     * @param {!ngModel.NgModelController} ngModelCtrl
     * @param {!string} optionName
     * @returns {string|number|boolean|Object|undefined}
     */
    getModelOption: function (ngModelCtrl, optionName) {
      if (!ngModelCtrl.$options) {
        return;
      }

      var $options = ngModelCtrl.$options;

      // The newer versions of AngularJS introduced a getOption function and made the option values
      // no longer visible on the $options object.
      return $options.getOption ? $options.getOption(optionName) : $options[optionName];
    },

    /**
     * Determines the current 'dir'ectional value based on the value of 'dir'
     * attribute of the element. If that is not defined, it will try to use
     * a 'dir' attribute of the body or html tag.
     *
     * @param {Object=} attrs a hash object with key-value pairs of normalized
     *     attribute names and their corresponding attribute values.
     * @returns {boolean} true if the element's passed in attributes,
     *     the document, or the body indicates RTL mode, false otherwise.
     */
    isRtl: function(attrs) {
      var dir = angular.isDefined(attrs) && attrs.hasOwnProperty('dir') && attrs.dir;

      switch (dir) {
        case 'ltr':
          return false;

        case 'rtl':
          return true;
      }

      return ($document[0].dir === 'rtl' || $document[0].body.dir === 'rtl');
    },

    /**
     * Bi-directional accessor/mutator used to easily update an element's
     * property based on the current 'dir'ectional value.
     */
    bidi: function(element, property, lValue, rValue) {
      var ltr = !this.isRtl();

      // If accessor
      if (arguments.length == 0) return ltr ? 'ltr' : 'rtl';

      // If mutator
      var elem = angular.element(element);

      if (ltr && angular.isDefined(lValue)) {
        elem.css(property, validateCssValue(lValue));
      }
      else if (!ltr && angular.isDefined(rValue)) {
        elem.css(property, validateCssValue(rValue));
      }
    },

    bidiProperty: function (element, lProperty, rProperty, value) {
      var ltr = !this.isRtl();

      var elem = angular.element(element);

      if (ltr && angular.isDefined(lProperty)) {
        elem.css(lProperty, validateCssValue(value));
        elem.css(rProperty, '');
      }
      else if (!ltr && angular.isDefined(rProperty)) {
        elem.css(rProperty, validateCssValue(value));
        elem.css(lProperty, '');
      }
    },

    clientRect: function(element, offsetParent, isOffsetRect) {
      var node = getNode(element);
      offsetParent = getNode(offsetParent || node.offsetParent || document.body);
      var nodeRect = node.getBoundingClientRect();

      // The user can ask for an offsetRect: a rect relative to the offsetParent,
      // or a clientRect: a rect relative to the page
      var offsetRect = isOffsetRect ?
        offsetParent.getBoundingClientRect() :
        {left: 0, top: 0, width: 0, height: 0};
      return {
        left: nodeRect.left - offsetRect.left,
        top: nodeRect.top - offsetRect.top,
        width: nodeRect.width,
        height: nodeRect.height
      };
    },
    offsetRect: function(element, offsetParent) {
      return $mdUtil.clientRect(element, offsetParent, true);
    },

    /**
     * Annoying method to copy nodes to an array, thanks to IE.
     * @param nodes
     * @return {Array}
     */
    nodesToArray: function(nodes) {
      var results = [], i;
      nodes = nodes || [];

      for (i = 0; i < nodes.length; ++i) {
        results.push(nodes.item(i));
      }
      return results;
    },

    /**
     * Determines the absolute position of the viewport.
     * Useful when making client rectangles absolute.
     * @returns {number}
     */
    getViewportTop: function() {
      // If body scrolling is disabled, then use the cached viewport top value, otherwise get it
      // fresh from the $window.
      if ($mdUtil.disableScrollAround._count && $mdUtil.disableScrollAround._viewPortTop) {
        return $mdUtil.disableScrollAround._viewPortTop;
      } else {
        return $window.scrollY || $window.pageYOffset || 0;
      }
    },

    /**
     * Finds the proper focus target by searching the DOM.
     *
     * @param containerEl
     * @param attributeVal
     * @returns {*}
     */
    findFocusTarget: function(containerEl, attributeVal) {
      var AUTO_FOCUS = this.prefixer('md-autofocus', true);
      var elToFocus;

      elToFocus = scanForFocusable(containerEl, attributeVal || AUTO_FOCUS);

      if (!elToFocus && attributeVal != AUTO_FOCUS) {
        // Scan for deprecated attribute
        elToFocus = scanForFocusable(containerEl, this.prefixer('md-auto-focus', true));

        if (!elToFocus) {
          // Scan for fallback to 'universal' API
          elToFocus = scanForFocusable(containerEl, AUTO_FOCUS);
        }
      }

      return elToFocus;

      /**
       * Can target and nested children for specified Selector (attribute)
       * whose value may be an expression that evaluates to True/False.
       */
      function scanForFocusable(target, selector) {
        var elFound, items = target[0].querySelectorAll(selector);

        // Find the last child element with the focus attribute
        if (items && items.length){
          items.length && angular.forEach(items, function(it) {
            it = angular.element(it);

            // Check the element for the md-autofocus class to ensure any associated expression
            // evaluated to true.
            var isFocusable = it.hasClass('md-autofocus');
            if (isFocusable) elFound = it;
          });
        }
        return elFound;
      }
    },

    /**
     * Disables scroll around the passed parent element.
     * @param {Element|angular.JQLite=} element Origin Element (not used)
     * @param {Element|angular.JQLite=} parent Element to disable scrolling within.
     *   Defaults to body if none supplied.
     * @param {Object=} options Object of options to modify functionality
     *   - disableScrollMask Boolean of whether or not to create a scroll mask element or
     *     use the passed parent element.
     */
    disableScrollAround: function(element, parent, options) {
      options = options || {};

      $mdUtil.disableScrollAround._count = Math.max(0, $mdUtil.disableScrollAround._count || 0);
      $mdUtil.disableScrollAround._count++;

      if ($mdUtil.disableScrollAround._restoreScroll) {
        return $mdUtil.disableScrollAround._restoreScroll;
      }

      var body = $document[0].body;
      var restoreBody = disableBodyScroll();
      var restoreElement = disableElementScroll(parent, options);

      return $mdUtil.disableScrollAround._restoreScroll = function() {
        if (--$mdUtil.disableScrollAround._count <= 0) {
          delete $mdUtil.disableScrollAround._viewPortTop;
          restoreBody();
          restoreElement();
          delete $mdUtil.disableScrollAround._restoreScroll;
        }
      };

      /**
       * Creates a virtual scrolling mask to prevent touchmove, keyboard, scrollbar clicking,
       * and wheel events.
       * @param {!Element|!angular.JQLite} elementToDisable
       * @param {Object=} scrollMaskOptions Object of options to modify functionality
       *   - disableScrollMask Boolean of whether or not to create a scroll mask element or
       *     use the passed parent element.
       * @returns {Function}
       */
      function disableElementScroll(elementToDisable, scrollMaskOptions) {
        var scrollMask;
        var wrappedElementToDisable = angular.element(elementToDisable || body);

        if (scrollMaskOptions.disableScrollMask) {
          scrollMask = wrappedElementToDisable;
        } else {
          scrollMask = angular.element(
            '<div class="md-scroll-mask">' +
            '  <div class="md-scroll-mask-bar"></div>' +
            '</div>');
          wrappedElementToDisable.append(scrollMask);
        }

        /**
         * @param {Event} $event
         */
        function preventDefault($event) {
          $event.preventDefault();
        }

        scrollMask.on('wheel touchmove', preventDefault);

        return function restoreElementScroll() {
          scrollMask.off('wheel touchmove', preventDefault);

          if (!scrollMaskOptions.disableScrollMask && scrollMask[0].parentNode) {
            scrollMask[0].parentNode.removeChild(scrollMask[0]);
          }
        };
      }

      // Converts the body to a position fixed block and translate it to the proper scroll position
      function disableBodyScroll() {
        var documentElement = $document[0].documentElement;

        var prevDocumentStyle = documentElement.style.cssText || '';
        var prevBodyStyle = body.style.cssText || '';

        var viewportTop = $mdUtil.getViewportTop();
        $mdUtil.disableScrollAround._viewPortTop = viewportTop;
        var clientWidth = body.clientWidth;
        var hasVerticalScrollbar = body.scrollHeight > body.clientHeight + 1;

        // Scroll may be set on <html> element (for example by overflow-y: scroll)
        // but Chrome is reporting the scrollTop position always on <body>.
        // scrollElement will allow to restore the scrollTop position to proper target.
        var scrollElement = documentElement.scrollTop > 0 ? documentElement : body;

        if (hasVerticalScrollbar) {
          angular.element(body).css({
            position: 'fixed',
            width: '100%',
            top: -viewportTop + 'px'
          });
        }

        if (body.clientWidth < clientWidth) {
          body.style.overflow = 'hidden';
        }

        return function restoreScroll() {
          // Reset the inline style CSS to the previous.
          body.style.cssText = prevBodyStyle;
          documentElement.style.cssText = prevDocumentStyle;

          // The scroll position while being fixed
          scrollElement.scrollTop = viewportTop;
        };
      }

    },

    enableScrolling: function() {
      var restoreFn = this.disableScrollAround._restoreScroll;
      restoreFn && restoreFn();
    },

    floatingScrollbars: function() {
      if (this.floatingScrollbars.cached === undefined) {
        var tempNode = angular.element('<div><div></div></div>').css({
          width: '100%',
          'z-index': -1,
          position: 'absolute',
          height: '35px',
          'overflow-y': 'scroll'
        });
        tempNode.children().css('height', '60px');

        $document[0].body.appendChild(tempNode[0]);
        this.floatingScrollbars.cached = (tempNode[0].offsetWidth == tempNode[0].childNodes[0].offsetWidth);
        tempNode.remove();
      }
      return this.floatingScrollbars.cached;
    },

    /**
     * Mobile safari only allows you to set focus in click event listeners.
     * @param {Element|angular.JQLite} element to focus
     */
    forceFocus: function(element) {
      var node = element[0] || element;

      document.addEventListener('click', function focusOnClick(ev) {
        if (ev.target === node && ev.$focus) {
          node.focus();
          ev.stopImmediatePropagation();
          ev.preventDefault();
          node.removeEventListener('click', focusOnClick);
        }
      }, true);

      var newEvent = document.createEvent('MouseEvents');
      newEvent.initMouseEvent('click', false, true, window, {}, 0, 0, 0, 0,
        false, false, false, false, 0, null);
      newEvent.$material = true;
      newEvent.$focus = true;
      node.dispatchEvent(newEvent);
    },

    /**
     * facade to build md-backdrop element with desired styles
     * NOTE: Use $compile to trigger backdrop postLink function
     */
    createBackdrop: function(scope, addClass) {
      return $compile($mdUtil.supplant('<md-backdrop class="{0}">', [addClass]))(scope);
    },

    /**
     * supplant() method from Crockford's `Remedial Javascript`
     * Equivalent to use of $interpolate; without dependency on
     * interpolation symbols and scope. Note: the '{<token>}' can
     * be property names, property chains, or array indices.
     */
    supplant: function(template, values, pattern) {
      pattern = pattern || /\{([^{}]*)\}/g;
      return template.replace(pattern, function(a, b) {
        var p = b.split('.'),
          r = values;
        try {
          for (var s in p) {
            if (p.hasOwnProperty(s)) {
              r = r[p[s]];
            }
          }
        } catch (e) {
          r = a;
        }
        return (typeof r === 'string' || typeof r === 'number') ? r : a;
      });
    },

    fakeNgModel: function() {
      return {
        $fake: true,
        $setTouched: angular.noop,
        $setViewValue: function(value) {
          this.$viewValue = value;
          this.$render(value);
          this.$viewChangeListeners.forEach(function(cb) {
            cb();
          });
        },
        $isEmpty: function(value) {
          return ('' + value).length === 0;
        },
        $parsers: [],
        $formatters: [],
        $viewChangeListeners: [],
        $render: angular.noop
      };
    },

    /**
     * @param {Function} func original function to be debounced
     * @param {number} wait number of milliseconds to delay (since last debounce reset).
     *  Default value 10 msecs.
     * @param {Object} scope in which to apply the function after debouncing ends
     * @param {boolean} invokeApply should the $timeout trigger $digest() dirty checking
     * @return {Function} A function, that, as long as it continues to be invoked, will not be
     *  triggered. The function will be called after it stops being called for N milliseconds.
     */
    debounce: function(func, wait, scope, invokeApply) {
      var timer;

      return function debounced() {
        var context = scope,
            args = Array.prototype.slice.call(arguments);

        $timeout.cancel(timer);
        timer = $timeout(function() {

          timer = undefined;
          func.apply(context, args);

        }, wait || 10, invokeApply);
      };
    },

    /**
     * The function will not be called unless it has been more than `delay` milliseconds since the
     * last call.
     * @param {Function} func original function to throttle
     * @param {number} delay number of milliseconds to delay
     * @return {Function} a function that can only be triggered every `delay` milliseconds.
     */
    throttle: function throttle(func, delay) {
      var recent;
      return function throttled() {
        var context = this;
        var args = arguments;
        var now = $mdUtil.now();

        if (!recent || (now - recent > delay)) {
          func.apply(context, args);
          recent = now;
        }
      };
    },

    /**
     * Measures the number of milliseconds taken to run the provided callback
     * function. Uses a high-precision timer if available.
     */
    time: function time(cb) {
      var start = $mdUtil.now();
      cb();
      return $mdUtil.now() - start;
    },

    /**
     * Create an implicit getter that caches its `getter()`
     * lookup value
     */
    valueOnUse : function (scope, key, getter) {
      var value = null, args = Array.prototype.slice.call(arguments);
      var params = (args.length > 3) ? args.slice(3) : [];

      Object.defineProperty(scope, key, {
        get: function () {
          if (value === null) value = getter.apply(scope, params);
          return value;
        }
      });
    },

    /**
     * Get a unique ID.
     *
     * @returns {string} an unique numeric string
     */
    nextUid: function() {
      return '' + nextUniqueId++;
    },

    /**
     * Stop watchers and events from firing on a scope without destroying it,
     * by disconnecting it from its parent and its siblings' linked lists.
     * @param {Object} scope to disconnect
     */
    disconnectScope: function disconnectScope(scope) {
      if (!scope) return;

      // we can't destroy the root scope or a scope that has been already destroyed
      if (scope.$root === scope) return;
      if (scope.$$destroyed) return;

      var parent = scope.$parent;
      scope.$$disconnected = true;

      // See Scope.$destroy
      if (parent.$$childHead === scope) parent.$$childHead = scope.$$nextSibling;
      if (parent.$$childTail === scope) parent.$$childTail = scope.$$prevSibling;
      if (scope.$$prevSibling) scope.$$prevSibling.$$nextSibling = scope.$$nextSibling;
      if (scope.$$nextSibling) scope.$$nextSibling.$$prevSibling = scope.$$prevSibling;

      scope.$$nextSibling = scope.$$prevSibling = null;

    },

    /**
     * Undo the effects of disconnectScope().
     * @param {Object} scope to reconnect
     */
    reconnectScope: function reconnectScope(scope) {
      if (!scope) return;

      // we can't disconnect the root node or scope already disconnected
      if (scope.$root === scope) return;
      if (!scope.$$disconnected) return;

      var child = scope;

      var parent = child.$parent;
      child.$$disconnected = false;
      // See Scope.$new for this logic...
      child.$$prevSibling = parent.$$childTail;
      if (parent.$$childHead) {
        parent.$$childTail.$$nextSibling = child;
        parent.$$childTail = child;
      } else {
        parent.$$childHead = parent.$$childTail = child;
      }
    },

    /**
     * Get an element's siblings matching a given tag name.
     *
     * @param {JQLite|angular.element|HTMLElement} element Element to start walking the DOM from
     * @param {string} tagName HTML tag name to match against
     * @returns {Object[]} JQLite
     */
    getSiblings: function getSiblings(element, tagName) {
      var upperCasedTagName = tagName.toUpperCase();
      if (element instanceof angular.element) {
        element = element[0];
      }
      var siblings = Array.prototype.filter.call(element.parentNode.children, function(node) {
        return element !== node && node.tagName.toUpperCase() === upperCasedTagName;
      });
      return siblings.map(function (sibling) {
        return angular.element(sibling);
      });
    },

    /*
     * getClosest replicates jQuery.closest() to walk up the DOM tree until it finds a matching nodeName
     *
     * @param {Node} el Element to start walking the DOM from
     * @param {string|function} validateWith If a string is passed, it will be evaluated against
     * each of the parent nodes' tag name. If a function is passed, the loop will call it with each
     * of the parents and will use the return value to determine whether the node is a match.
     * @param {boolean=} onlyParent Only start checking from the parent element, not `el`.
     * @returns {Node|null} closest matching parent Node or null if not found
     */
    getClosest: function getClosest(el, validateWith, onlyParent) {
      if (angular.isString(validateWith)) {
        var tagName = validateWith.toUpperCase();
        validateWith = function(el) {
          return el.nodeName.toUpperCase() === tagName;
        };
      }

      if (el instanceof angular.element) el = el[0];
      if (onlyParent) el = el.parentNode;
      if (!el) return null;

      do {
        if (validateWith(el)) {
          return el;
        }
      } while (el = el.parentNode);

      return null;
    },

    /**
     * Build polyfill for the Node.contains feature (if needed)
     * @param {Node} node
     * @param {Node} child
     * @returns {Node}
     */
    elementContains: function(node, child) {
      var hasContains = (window.Node && window.Node.prototype && Node.prototype.contains);
      var findFn = hasContains ? angular.bind(node, node.contains) : angular.bind(node, function(arg) {
        // compares the positions of two nodes and returns a bitmask
        return (node === child) || !!(this.compareDocumentPosition(arg) & 16);
      });

      return findFn(child);
    },

    /**
     * Functional equivalent for $element.filter(‘md-bottom-sheet’)
     * useful with interimElements where the element and its container are important...
     *
     * @param {angular.JQLite} element to scan
     * @param {string} nodeName of node to find (e.g. 'md-dialog')
     * @param {boolean=} scanDeep optional flag to allow deep scans; defaults to 'false'.
     * @param {boolean=} warnNotFound optional flag to enable log warnings; defaults to false
     */
    extractElementByName: function(element, nodeName, scanDeep, warnNotFound) {
      var found = scanTree(element);
      if (!found && !!warnNotFound) {
        $log.warn($mdUtil.supplant("Unable to find node '{0}' in element '{1}'.",[nodeName, element[0].outerHTML]));
      }

      return angular.element(found || element);

      /**
       * Breadth-First tree scan for element with matching `nodeName`
       */
      function scanTree(element) {
        return scanLevel(element) || (scanDeep ? scanChildren(element) : null);
      }

      /**
       * Case-insensitive scan of current elements only (do not descend).
       */
      function scanLevel(element) {
        if (element) {
          for (var i = 0, len = element.length; i < len; i++) {
            if (element[i].nodeName.toLowerCase() === nodeName) {
              return element[i];
            }
          }
        }
        return null;
      }

      /**
       * Scan children of specified node
       */
      function scanChildren(element) {
        var found;
        if (element) {
          for (var i = 0, len = element.length; i < len; i++) {
            var target = element[i];
            if (!found) {
              for (var j = 0, numChild = target.childNodes.length; j < numChild; j++) {
                found = found || scanTree([target.childNodes[j]]);
              }
            }
          }
        }
        return found;
      }

    },

    /**
     * Give optional properties with no value a boolean true if attr provided or false otherwise
     */
    initOptionalProperties: function(scope, attr, defaults) {
      defaults = defaults || {};
      angular.forEach(scope.$$isolateBindings, function(binding, key) {
        if (binding.optional && angular.isUndefined(scope[key])) {
          var attrIsDefined = angular.isDefined(attr[binding.attrName]);
          scope[key] = angular.isDefined(defaults[key]) ? defaults[key] : attrIsDefined;
        }
      });
    },

    /**
     * Alternative to $timeout calls with 0 delay.
     * nextTick() coalesces all calls within a single frame
     * to minimize $digest thrashing
     *
     * @param {Function} callback function to be called after the tick
     * @param {boolean=} digest true to call $rootScope.$digest() after callback
     * @param {Object=} scope associated with callback. If the scope is destroyed, the callback will
     *  be skipped.
     * @returns {*}
     */
    nextTick: function(callback, digest, scope) {
      // grab function reference for storing state details
      var nextTick = $mdUtil.nextTick;
      var timeout = nextTick.timeout;
      var queue = nextTick.queue || [];

      // add callback to the queue
      queue.push({scope: scope, callback: callback});

      // set default value for digest
      if (digest == null) digest = true;

      // store updated digest/queue values
      nextTick.digest = nextTick.digest || digest;
      nextTick.queue = queue;

      // either return existing timeout or create a new one
      return timeout || (nextTick.timeout = $timeout(processQueue, 0, false));

      /**
       * Grab a copy of the current queue
       * Clear the queue for future use
       * Process the existing queue
       * Trigger digest if necessary
       */
      function processQueue() {
        var queue = nextTick.queue;
        var digest = nextTick.digest;

        nextTick.queue = [];
        nextTick.timeout = null;
        nextTick.digest = false;

        queue.forEach(function(queueItem) {
          var skip = queueItem.scope && queueItem.scope.$$destroyed;
          if (!skip) {
            queueItem.callback();
          }
        });

        if (digest) $rootScope.$digest();
      }
    },

    /**
     * Processes a template and replaces the start/end symbols if the application has
     * overridden them.
     *
     * @param template The template to process whose start/end tags may be replaced.
     * @returns {*}
     */
    processTemplate: function(template) {
      if (usesStandardSymbols) {
        return template;
      } else {
        if (!template || !angular.isString(template)) return template;
        return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
      }
    },

    /**
     * Scan up dom hierarchy for enabled parent;
     */
    getParentWithPointerEvents: function (element) {
      var parent = element.parent();

      // jqLite might return a non-null, but still empty, parent; so check for parent and length
      while (hasComputedStyle(parent, 'pointer-events', 'none')) {
        parent = parent.parent();
      }

      return parent;
    },

    getNearestContentElement: function (element) {
      var current = element.parent()[0];
      // Look for the nearest parent md-content, stopping at the rootElement.
      while (current && current !== $rootElement[0] && current !== document.body && current.nodeName.toUpperCase() !== 'MD-CONTENT') {
        current = current.parentNode;
      }
      return current;
    },

    /**
     * Checks if the current browser is natively supporting the `sticky` position.
     * @returns {string} supported sticky property name
     */
    checkStickySupport: function() {
      var stickyProp;
      var testEl = angular.element('<div>');
      $document[0].body.appendChild(testEl[0]);

      var stickyProps = ['sticky', '-webkit-sticky'];
      for (var i = 0; i < stickyProps.length; ++i) {
        testEl.css({
          position: stickyProps[i],
          top: 0,
          'z-index': 2
        });

        if (testEl.css('position') == stickyProps[i]) {
          stickyProp = stickyProps[i];
          break;
        }
      }

      testEl.remove();

      return stickyProp;
    },

    /**
     * Parses an attribute value, mostly a string.
     * By default checks for negated values and returns `false´ if present.
     * Negated values are: (native falsy) and negative strings like:
     * `false` or `0`.
     * @param value Attribute value which should be parsed.
     * @param negatedCheck When set to false, won't check for negated values.
     * @returns {boolean}
     */
    parseAttributeBoolean: function(value, negatedCheck) {
      return value === '' || !!value && (negatedCheck === false || value !== 'false' && value !== '0');
    },

    hasComputedStyle: hasComputedStyle,

    /**
     * Returns true if the parent form of the element has been submitted.
     * @param element An AngularJS or HTML5 element.
     * @returns {boolean}
     */
    isParentFormSubmitted: function(element) {
      var parent = $mdUtil.getClosest(element, 'form');
      var form = parent ? angular.element(parent).controller('form') : null;

      return form ? form.$submitted : false;
    },

    /**
     * Animate the requested element's scrollTop to the requested scrollPosition with basic easing.
     * @param {!Element} element The element to scroll.
     * @param {number} scrollEnd The new/final scroll position.
     * @param {number=} duration Duration of the scroll. Default is 1000ms.
     */
    animateScrollTo: function(element, scrollEnd, duration) {
      var scrollStart = element.scrollTop;
      var scrollChange = scrollEnd - scrollStart;
      var scrollingDown = scrollStart < scrollEnd;
      var startTime = $mdUtil.now();

      $$rAF(scrollChunk);

      function scrollChunk() {
        var newPosition = calculateNewPosition();

        element.scrollTop = newPosition;

        if (scrollingDown ? newPosition < scrollEnd : newPosition > scrollEnd) {
          $$rAF(scrollChunk);
        }
      }

      function calculateNewPosition() {
        var easeDuration = duration || 1000;
        var currentTime = $mdUtil.now() - startTime;

        return ease(currentTime, scrollStart, scrollChange, easeDuration);
      }

      function ease(currentTime, start, change, duration) {
        // If the duration has passed (which can occur if our app loses focus due to $$rAF), jump
        // straight to the proper position
        if (currentTime > duration) {
          return start + change;
        }

        var ts = (currentTime /= duration) * currentTime;
        var tc = ts * currentTime;

        return start + change * (-2 * tc + 3 * ts);
      }
    },

    /**
     * Provides an easy mechanism for removing duplicates from an array.
     *
     *    var myArray = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
     *
     *    $mdUtil.uniq(myArray) => [1, 2, 3, 4]
     *
     * @param {Array} array The array whose unique values should be returned.
     * @returns {Array|void} A copy of the array containing only unique values.
     */
    uniq: function(array) {
      if (!array) { return; }

      return array.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
    },

    /**
     * Gets the inner HTML content of the given HTMLElement.
     * Only intended for use with SVG or Symbol elements in IE11.
     * @param {Element} element
     * @returns {string} the inner HTML of the element passed in
     */
    getInnerHTML: function(element) {
      // For SVG or Symbol elements, innerHTML returns `undefined` in IE.
      // Reference: https://stackoverflow.com/q/28129956/633107
      // The XMLSerializer API is supported on IE11 and is the recommended workaround.
      var serializer = new XMLSerializer();

      return Array.prototype.map.call(element.childNodes, function (child) {
        return serializer.serializeToString(child);
      }).join('');
    },

    /**
     * Gets the outer HTML content of the given HTMLElement.
     * Only intended for use with SVG or Symbol elements in IE11.
     * @param {Element} element
     * @returns {string} the outer HTML of the element passed in
     */
    getOuterHTML: function(element) {
      // For SVG or Symbol elements, outerHTML returns `undefined` in IE.
      // Reference: https://stackoverflow.com/q/29888050/633107
      // The XMLSerializer API is supported on IE11 and is the recommended workaround.
      var serializer = new XMLSerializer();
      return serializer.serializeToString(element);
    },

    /**
     * Support: IE 9-11 only
     * documentMode is an IE-only property
     * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
     */
    msie: window.document.documentMode,

    getTouchAction: function() {
      var testEl = document.createElement('div');
      var vendorPrefixes = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];

      for (var i = 0; i < vendorPrefixes.length; i++) {
        var prefix = vendorPrefixes[i];
        var property = prefix ? prefix + 'TouchAction' : 'touchAction';
        if (angular.isDefined(testEl.style[property])) {
          return property;
        }
      }
    },

    /**
     * @param {Event} event the event to calculate the bubble path for
     * @return {EventTarget[]} the set of nodes that this event could bubble up to
     */
    getEventPath: function(event) {
      var path = [];
      var currentTarget = event.target;
      while (currentTarget) {
        path.push(currentTarget);
        currentTarget = currentTarget.parentElement;
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
      if (path.indexOf(window) === -1)
        path.push(window);
      return path;
    },

    /**
     * Gets the string the user has entered and removes Regex identifiers
     * @param {string} term
     * @returns {string} sanitized string
     */
    sanitize: function(term) {
      if (!term) return term;
      return term.replace(/[\\^$*+?.()|{}[]/g, '\\$&');
    }
  };

  // Instantiate other namespace utility methods

  $mdUtil.dom.animator = $$mdAnimate($mdUtil);

  return $mdUtil;

  function getNode(el) {
    return el[0] || el;
  }
}

/**
 * Since removing jQuery from the demos, some code that uses `element.focus()` is broken.
 * We need to add `element.focus()`, because it's testable unlike `element[0].focus`.
 */
angular.element.prototype.focus = angular.element.prototype.focus || function() {
  if (this.length) {
    this[0].focus();
  }
  return this;
};

angular.element.prototype.blur = angular.element.prototype.blur || function() {
  if (this.length) {
    this[0].blur();
  }
  return this;
};

})();
(function(){
"use strict";

// Polyfill angular < 1.4 (provide $animateCss)
angular
  .module('material.core')
  .factory('$$mdAnimate', ["$q", "$timeout", "$mdConstant", "$animateCss", function($q, $timeout, $mdConstant, $animateCss){

     // Since $$mdAnimate is injected into $mdUtil... use a wrapper function
     // to subsequently inject $mdUtil as an argument to the AnimateDomUtils

     return function($mdUtil) {
       return AnimateDomUtils($mdUtil, $q, $timeout, $mdConstant, $animateCss);
     };
   }]);

/**
 * Factory function that requires special injections
 */
function AnimateDomUtils($mdUtil, $q, $timeout, $mdConstant, $animateCss) {
  var self;
  return self = {
    /**
     *
     */
    translate3d : function(target, from, to, options) {
      return $animateCss(target, {
        from: from,
        to: to,
        addClass: options.transitionInClass,
        removeClass: options.transitionOutClass,
        duration: options.duration
      })
      .start()
      .then(function() {
          // Resolve with reverser function...
          return reverseTranslate;
      });

      /**
       * Specific reversal of the request translate animation above...
       */
      function reverseTranslate (newFrom) {
        return $animateCss(target, {
           to: newFrom || from,
           addClass: options.transitionOutClass,
           removeClass: options.transitionInClass,
           duration: options.duration
        }).start();

      }
    },

    /**
     * Listen for transitionEnd event (with optional timeout)
     * Announce completion or failure via promise handlers
     */
    waitTransitionEnd: function (element, opts) {
      var TIMEOUT = 3000; // fallback is 3 secs

      return $q(function(resolve, reject){
        opts = opts || { };

        // If there is no transition is found, resolve immediately
        //
        // NOTE: using $mdUtil.nextTick() causes delays/issues
        if (noTransitionFound(opts.cachedTransitionStyles)) {
          TIMEOUT = 0;
        }

        var timer = $timeout(finished, opts.timeout || TIMEOUT);
        element.on($mdConstant.CSS.TRANSITIONEND, finished);

        /**
         * Upon timeout or transitionEnd, reject or resolve (respectively) this promise.
         * NOTE: Make sure this transitionEnd didn't bubble up from a child
         */
        function finished(ev) {
          if (ev && ev.target !== element[0]) return;

          if (ev) $timeout.cancel(timer);
          element.off($mdConstant.CSS.TRANSITIONEND, finished);

          // Never reject since ngAnimate may cause timeouts due missed transitionEnd events
          resolve();

        }

        /**
         * Checks whether or not there is a transition.
         *
         * @param styles The cached styles to use for the calculation. If null, getComputedStyle()
         * will be used.
         *
         * @returns {boolean} True if there is no transition/duration; false otherwise.
         */
        function noTransitionFound(styles) {
          styles = styles || window.getComputedStyle(element[0]);

          return styles.transitionDuration == '0s' || (!styles.transition && !styles.transitionProperty);
        }

      });
    },

    calculateTransformValues: function (element, originator) {
      var origin = originator.element;
      var bounds = originator.bounds;

      if (origin || bounds) {
        var originBnds = origin ? self.clientRect(origin) || currentBounds() : self.copyRect(bounds);
        var dialogRect = self.copyRect(element[0].getBoundingClientRect());
        var dialogCenterPt = self.centerPointFor(dialogRect);
        var originCenterPt = self.centerPointFor(originBnds);

        return {
          centerX: originCenterPt.x - dialogCenterPt.x,
          centerY: originCenterPt.y - dialogCenterPt.y,
          scaleX: Math.round(100 * Math.min(0.5, originBnds.width / dialogRect.width)) / 100,
          scaleY: Math.round(100 * Math.min(0.5, originBnds.height / dialogRect.height)) / 100
        };
      }
      return {centerX: 0, centerY: 0, scaleX: 0.5, scaleY: 0.5};

      /**
       * This is a fallback if the origin information is no longer valid, then the
       * origin bounds simply becomes the current bounds for the dialogContainer's parent
       */
      function currentBounds() {
        var cntr = element ? element.parent() : null;
        var parent = cntr ? cntr.parent() : null;

        return parent ? self.clientRect(parent) : null;
      }
    },

    /**
     * Calculate the zoom transform from dialog to origin.
     *
     * We use this to set the dialog position immediately;
     * then the md-transition-in actually translates back to
     * `translate3d(0,0,0) scale(1.0)`...
     *
     * NOTE: all values are rounded to the nearest integer
     */
    calculateZoomToOrigin: function (element, originator) {
      var zoomTemplate = "translate3d( {centerX}px, {centerY}px, 0 ) scale( {scaleX}, {scaleY} )";
      var buildZoom = angular.bind(null, $mdUtil.supplant, zoomTemplate);

      return buildZoom(self.calculateTransformValues(element, originator));
    },

    /**
     * Calculate the slide transform from panel to origin.
     * NOTE: all values are rounded to the nearest integer
     */
    calculateSlideToOrigin: function (element, originator) {
      var slideTemplate = "translate3d( {centerX}px, {centerY}px, 0 )";
      var buildSlide = angular.bind(null, $mdUtil.supplant, slideTemplate);

      return buildSlide(self.calculateTransformValues(element, originator));
    },

    /**
     * Enhance raw values to represent valid css stylings...
     */
    toCss : function(raw) {
      var css = { };
      var lookups = 'left top right bottom width height x y min-width min-height max-width max-height';

      angular.forEach(raw, function(value,key) {
        if (angular.isUndefined(value)) return;

        if (lookups.indexOf(key) >= 0) {
          css[key] = value + 'px';
        } else {
          switch (key) {
            case 'transition':
              convertToVendor(key, $mdConstant.CSS.TRANSITION, value);
              break;
            case 'transform':
              convertToVendor(key, $mdConstant.CSS.TRANSFORM, value);
              break;
            case 'transformOrigin':
              convertToVendor(key, $mdConstant.CSS.TRANSFORM_ORIGIN, value);
              break;
            case 'font-size':
              css['font-size'] = value; // font sizes aren't always in px
              break;
          }
        }
      });

      return css;

      function convertToVendor(key, vendor, value) {
        angular.forEach(vendor.split(' '), function (key) {
          css[key] = value;
        });
      }
    },

    /**
     * Convert the translate CSS value to key/value pair(s).
     * @param {string} transform
     * @param {boolean=} addTransition
     * @param {string=} transition
     * @return {Object} object containing CSS translate key/value pair(s)
     */
    toTransformCss: function (transform, addTransition, transition) {
      var css = {};
      angular.forEach($mdConstant.CSS.TRANSFORM.split(' '), function (key) {
        css[key] = transform;
      });

      if (addTransition) {
        transition = transition || "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important";
        css.transition = transition;
      }

      return css;
    },

    /**
     *  Clone the Rect and calculate the height/width if needed
     */
    copyRect: function (source, destination) {
      if (!source) return null;

      destination = destination || {};

      angular.forEach('left top right bottom width height'.split(' '), function (key) {
        destination[key] = Math.round(source[key]);
      });

      destination.width = destination.width || (destination.right - destination.left);
      destination.height = destination.height || (destination.bottom - destination.top);

      return destination;
    },

    /**
     * Calculate ClientRect of element; return null if hidden or zero size
     */
    clientRect: function (element) {
      var bounds = angular.element(element)[0].getBoundingClientRect();
      var isPositiveSizeClientRect = function (rect) {
        return rect && (rect.width > 0) && (rect.height > 0);
      };

      // If the event origin element has zero size, it has probably been hidden.
      return isPositiveSizeClientRect(bounds) ? self.copyRect(bounds) : null;
    },

    /**
     *  Calculate 'rounded' center point of Rect
     */
    centerPointFor: function (targetRect) {
      return targetRect ? {
        x: Math.round(targetRect.left + (targetRect.width / 2)),
        y: Math.round(targetRect.top + (targetRect.height / 2))
      } : { x : 0, y : 0 };
    }

  };
}


})();
(function(){
"use strict";

if (angular.version.minor >= 4) {
  angular.module('material.core.animate', []);
} else {
(function() {
  "use strict";

  var forEach = angular.forEach;

  var WEBKIT = angular.isDefined(document.documentElement.style.WebkitAppearance);
  var TRANSITION_PROP = WEBKIT ? 'WebkitTransition' : 'transition';
  var ANIMATION_PROP = WEBKIT ? 'WebkitAnimation' : 'animation';
  var PREFIX = WEBKIT ? '-webkit-' : '';

  var TRANSITION_EVENTS = (WEBKIT ? 'webkitTransitionEnd ' : '') + 'transitionend';
  var ANIMATION_EVENTS = (WEBKIT ? 'webkitAnimationEnd ' : '') + 'animationend';

  var $$ForceReflowFactory = ['$document', function($document) {
    return function() {
      return $document[0].body.clientWidth + 1;
    };
  }];

  var $$rAFMutexFactory = ['$$rAF', function($$rAF) {
    return function() {
      var passed = false;
      $$rAF(function() {
        passed = true;
      });
      return function(fn) {
        passed ? fn() : $$rAF(fn);
      };
    };
  }];

  var $$AnimateRunnerFactory = ['$q', '$$rAFMutex', function($q, $$rAFMutex) {
    var INITIAL_STATE = 0;
    var DONE_PENDING_STATE = 1;
    var DONE_COMPLETE_STATE = 2;

    function AnimateRunner(host) {
      this.setHost(host);

      this._doneCallbacks = [];
      this._runInAnimationFrame = $$rAFMutex();
      this._state = 0;
    }

    AnimateRunner.prototype = {
      setHost: function(host) {
        this.host = host || {};
      },

      done: function(fn) {
        if (this._state === DONE_COMPLETE_STATE) {
          fn();
        } else {
          this._doneCallbacks.push(fn);
        }
      },

      progress: angular.noop,

      getPromise: function() {
        if (!this.promise) {
          var self = this;
          this.promise = $q(function(resolve, reject) {
            self.done(function(status) {
              status === false ? reject() : resolve();
            });
          });
        }
        return this.promise;
      },

      then: function(resolveHandler, rejectHandler) {
        return this.getPromise().then(resolveHandler, rejectHandler);
      },

      'catch': function(handler) {
        return this.getPromise()['catch'](handler);
      },

      'finally': function(handler) {
        return this.getPromise()['finally'](handler);
      },

      pause: function() {
        if (this.host.pause) {
          this.host.pause();
        }
      },

      resume: function() {
        if (this.host.resume) {
          this.host.resume();
        }
      },

      end: function() {
        if (this.host.end) {
          this.host.end();
        }
        this._resolve(true);
      },

      cancel: function() {
        if (this.host.cancel) {
          this.host.cancel();
        }
        this._resolve(false);
      },

      complete: function(response) {
        var self = this;
        if (self._state === INITIAL_STATE) {
          self._state = DONE_PENDING_STATE;
          self._runInAnimationFrame(function() {
            self._resolve(response);
          });
        }
      },

      _resolve: function(response) {
        if (this._state !== DONE_COMPLETE_STATE) {
          forEach(this._doneCallbacks, function(fn) {
            fn(response);
          });
          this._doneCallbacks.length = 0;
          this._state = DONE_COMPLETE_STATE;
        }
      }
    };

    // Polyfill AnimateRunner.all which is used by input animations
    AnimateRunner.all = function(runners, callback) {
      var count = 0;
      var status = true;
      forEach(runners, function(runner) {
        runner.done(onProgress);
      });

      function onProgress(response) {
        status = status && response;
        if (++count === runners.length) {
          callback(status);
        }
      }
    };

    return AnimateRunner;
  }];

  angular
    .module('material.core.animate', [])
    .factory('$$forceReflow', $$ForceReflowFactory)
    .factory('$$AnimateRunner', $$AnimateRunnerFactory)
    .factory('$$rAFMutex', $$rAFMutexFactory)
    .factory('$animateCss', ['$window', '$$rAF', '$$AnimateRunner', '$$forceReflow', '$$jqLite', '$timeout', '$animate',
                     function($window,   $$rAF,   $$AnimateRunner,   $$forceReflow,   $$jqLite,   $timeout, $animate) {

      function init(element, options) {

        var temporaryStyles = [];
        var node = getDomNode(element);
        var areAnimationsAllowed = node && $animate.enabled();

        var hasCompleteStyles = false;
        var hasCompleteClasses = false;

        if (areAnimationsAllowed) {
          if (options.transitionStyle) {
            temporaryStyles.push([PREFIX + 'transition', options.transitionStyle]);
          }

          if (options.keyframeStyle) {
            temporaryStyles.push([PREFIX + 'animation', options.keyframeStyle]);
          }

          if (options.delay) {
            temporaryStyles.push([PREFIX + 'transition-delay', options.delay + 's']);
          }

          if (options.duration) {
            temporaryStyles.push([PREFIX + 'transition-duration', options.duration + 's']);
          }

          hasCompleteStyles = options.keyframeStyle ||
              (options.to && (options.duration > 0 || options.transitionStyle));
          hasCompleteClasses = !!options.addClass || !!options.removeClass;

          blockTransition(element, true);
        }

        var hasCompleteAnimation = areAnimationsAllowed && (hasCompleteStyles || hasCompleteClasses);

        applyAnimationFromStyles(element, options);

        var animationClosed = false;
        var events, eventFn;

        return {
          close: $window.close,
          start: function() {
            var runner = new $$AnimateRunner();
            waitUntilQuiet(function() {
              blockTransition(element, false);
              if (!hasCompleteAnimation) {
                return close();
              }

              forEach(temporaryStyles, function(entry) {
                var key = entry[0];
                var value = entry[1];
                node.style[camelCase(key)] = value;
              });

              applyClasses(element, options);

              var timings = computeTimings(element);
              if (timings.duration === 0) {
                return close();
              }

              var moreStyles = [];

              if (options.easing) {
                if (timings.transitionDuration) {
                  moreStyles.push([PREFIX + 'transition-timing-function', options.easing]);
                }
                if (timings.animationDuration) {
                  moreStyles.push([PREFIX + 'animation-timing-function', options.easing]);
                }
              }

              if (options.delay && timings.animationDelay) {
                moreStyles.push([PREFIX + 'animation-delay', options.delay + 's']);
              }

              if (options.duration && timings.animationDuration) {
                moreStyles.push([PREFIX + 'animation-duration', options.duration + 's']);
              }

              forEach(moreStyles, function(entry) {
                var key = entry[0];
                var value = entry[1];
                node.style[camelCase(key)] = value;
                temporaryStyles.push(entry);
              });

              var maxDelay = timings.delay;
              var maxDelayTime = maxDelay * 1000;
              var maxDuration = timings.duration;
              var maxDurationTime = maxDuration * 1000;
              var startTime = Date.now();

              events = [];
              if (timings.transitionDuration) {
                events.push(TRANSITION_EVENTS);
              }
              if (timings.animationDuration) {
                events.push(ANIMATION_EVENTS);
              }
              events = events.join(' ');
              eventFn = function(event) {
                event.stopPropagation();
                var ev = event.originalEvent || event;
                var timeStamp = ev.timeStamp || Date.now();
                var elapsedTime = parseFloat(ev.elapsedTime.toFixed(3));
                if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
                  close();
                }
              };
              element.on(events, eventFn);

              applyAnimationToStyles(element, options);

              $timeout(close, maxDelayTime + maxDurationTime * 1.5, false);
            });

            return runner;

            function close() {
              if (animationClosed) return;
              animationClosed = true;

              if (events && eventFn) {
                element.off(events, eventFn);
              }
              applyClasses(element, options);
              applyAnimationStyles(element, options);
              forEach(temporaryStyles, function(entry) {
                node.style[camelCase(entry[0])] = '';
              });
              runner.complete(true);
              return runner;
            }
          }
        };
      }

      function applyClasses(element, options) {
        if (options.addClass) {
          $$jqLite.addClass(element, options.addClass);
          options.addClass = null;
        }
        if (options.removeClass) {
          $$jqLite.removeClass(element, options.removeClass);
          options.removeClass = null;
        }
      }

      function computeTimings(element) {
        var node = getDomNode(element);
        var cs = $window.getComputedStyle(node);
        var tdr = parseMaxTime(cs[prop('transitionDuration')]);
        var adr = parseMaxTime(cs[prop('animationDuration')]);
        var tdy = parseMaxTime(cs[prop('transitionDelay')]);
        var ady = parseMaxTime(cs[prop('animationDelay')]);

        adr *= (parseInt(cs[prop('animationIterationCount')], 10) || 1);
        var duration = Math.max(adr, tdr);
        var delay = Math.max(ady, tdy);

        return {
          duration: duration,
          delay: delay,
          animationDuration: adr,
          transitionDuration: tdr,
          animationDelay: ady,
          transitionDelay: tdy
        };

        function prop(key) {
          return WEBKIT ? 'Webkit' + key.charAt(0).toUpperCase() + key.substr(1)
                        : key;
        }
      }

      function parseMaxTime(str) {
        var maxValue = 0;
        var values = (str || "").split(/\s*,\s*/);
        forEach(values, function(value) {
          // it's always safe to consider only second values and omit `ms` values since
          // getComputedStyle will always handle the conversion for us
          if (value.charAt(value.length - 1) == 's') {
            value = value.substring(0, value.length - 1);
          }
          value = parseFloat(value) || 0;
          maxValue = maxValue ? Math.max(value, maxValue) : value;
        });
        return maxValue;
      }

      var cancelLastRAFRequest;
      var rafWaitQueue = [];
      function waitUntilQuiet(callback) {
        if (cancelLastRAFRequest) {
          cancelLastRAFRequest(); // cancels the request
        }
        rafWaitQueue.push(callback);
        cancelLastRAFRequest = $$rAF(function() {
          cancelLastRAFRequest = null;

          // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.
          // PLEASE EXAMINE THE `$$forceReflow` service to understand why.
          var pageWidth = $$forceReflow();

          // we use a for loop to ensure that if the queue is changed
          // during this looping then it will consider new requests
          for (var i = 0; i < rafWaitQueue.length; i++) {
            rafWaitQueue[i](pageWidth);
          }
          rafWaitQueue.length = 0;
        });
      }

      function applyAnimationStyles(element, options) {
        applyAnimationFromStyles(element, options);
        applyAnimationToStyles(element, options);
      }

      function applyAnimationFromStyles(element, options) {
        if (options.from) {
          element.css(options.from);
          options.from = null;
        }
      }

      function applyAnimationToStyles(element, options) {
        if (options.to) {
          element.css(options.to);
          options.to = null;
        }
      }

      function getDomNode(element) {
        for (var i = 0; i < element.length; i++) {
          if (element[i].nodeType === 1) return element[i];
        }
      }

      function blockTransition(element, bool) {
        var node = getDomNode(element);
        var key = camelCase(PREFIX + 'transition-delay');
        node.style[key] = bool ? '-9999s' : '';
      }

      return init;
    }]);

  /**
   * Older browsers [FF31] expect camelCase
   * property keys.
   * e.g.
   *  animation-duration --> animationDuration
   */
  function camelCase(str) {
    return str.replace(/-[a-z]/g, function(str) {
      return str.charAt(1).toUpperCase();
    });
  }

})();

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.aria
 * @description
 * Aria Expectations for AngularJS Material components.
 */
MdAriaService.$inject = ["$$rAF", "$log", "$window", "$interpolate"];
angular
  .module('material.core')
  .provider('$mdAria', MdAriaProvider);

/**
 * @ngdoc service
 * @name $mdAriaProvider
 * @module material.core.aria
 *
 * @description
 *
 * Modify options of the `$mdAria` service, which will be used by most of the AngularJS Material
 * components.
 *
 * You are able to disable `$mdAria` warnings, by using the following markup.
 *
 * <hljs lang="js">
 *   app.config(function($mdAriaProvider) {
 *     // Globally disables all ARIA warnings.
 *     $mdAriaProvider.disableWarnings();
 *   });
 * </hljs>
 *
 */
function MdAriaProvider() {

  var config = {
    /** Whether we should show ARIA warnings in the console if labels are missing on the element */
    showWarnings: true
  };

  return {
    disableWarnings: disableWarnings,
    $get: ["$$rAF", "$log", "$window", "$interpolate", function($$rAF, $log, $window, $interpolate) {
      return MdAriaService.apply(config, arguments);
    }]
  };

  /**
   * @ngdoc method
   * @name $mdAriaProvider#disableWarnings
   * @description Disables all ARIA warnings generated by AngularJS Material.
   */
  function disableWarnings() {
    config.showWarnings = false;
  }
}

/*
 * @ngInject
 */
function MdAriaService($$rAF, $log, $window, $interpolate) {

  // Load the showWarnings option from the current context and store it inside of a scope variable,
  // because the context will be probably lost in some function calls.
  var showWarnings = this.showWarnings;

  return {
    expect: expect,
    expectAsync: expectAsync,
    expectWithText: expectWithText,
    expectWithoutText: expectWithoutText,
    getText: getText,
    hasAriaLabel: hasAriaLabel,
    parentHasAriaLabel: parentHasAriaLabel
  };

  /**
   * Check if expected attribute has been specified on the target element or child
   * @param element
   * @param attrName
   * @param {optional} defaultValue What to set the attr to if no value is found
   */
  function expect(element, attrName, defaultValue) {

    var node = angular.element(element)[0] || element;

    // if node exists and neither it nor its children have the attribute
    if (node &&
       ((!node.hasAttribute(attrName) ||
        node.getAttribute(attrName).length === 0) &&
        !childHasAttribute(node, attrName))) {

      defaultValue = angular.isString(defaultValue) ? defaultValue.trim() : '';
      if (defaultValue.length) {
        element.attr(attrName, defaultValue);
      } else if (showWarnings) {
        $log.warn('ARIA: Attribute "', attrName, '", required for accessibility, is missing on node:', node);
      }

    }
  }

  function expectAsync(element, attrName, defaultValueGetter) {
    // Problem: when retrieving the element's contents synchronously to find the label,
    // the text may not be defined yet in the case of a binding.
    // There is a higher chance that a binding will be defined if we wait one frame.
    $$rAF(function() {
        expect(element, attrName, defaultValueGetter());
    });
  }

  function expectWithText(element, attrName) {
    var content = getText(element) || "";
    var hasBinding = content.indexOf($interpolate.startSymbol()) > -1;

    if (hasBinding) {
      expectAsync(element, attrName, function() {
        return getText(element);
      });
    } else {
      expect(element, attrName, content);
    }
  }

  function expectWithoutText(element, attrName) {
    var content = getText(element);
    var hasBinding = content.indexOf($interpolate.startSymbol()) > -1;

    if (!hasBinding && !content) {
      expect(element, attrName, content);
    }
  }

  function getText(element) {
    element = element[0] || element;
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    var text = '';

    var node;
    while (node = walker.nextNode()) {
      if (!isAriaHiddenNode(node)) {
        text += node.textContent;
      }
    }

    return text.trim() || '';

    function isAriaHiddenNode(node) {
      while (node.parentNode && (node = node.parentNode) !== element) {
        if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
          return true;
        }
      }
    }
  }

  function childHasAttribute(node, attrName) {
    var hasChildren = node.hasChildNodes(),
        hasAttr = false;

    function isHidden(el) {
      var style = el.currentStyle ? el.currentStyle : $window.getComputedStyle(el);
      return (style.display === 'none');
    }

    if (hasChildren) {
      var children = node.childNodes;
      for (var i=0; i < children.length; i++) {
        var child = children[i];
        if (child.nodeType === 1 && child.hasAttribute(attrName)) {
          if (!isHidden(child)) {
            hasAttr = true;
          }
        }
      }
    }
    return hasAttr;
  }

  /**
   * Check if expected element has aria label attribute
   * @param element
   */
  function hasAriaLabel(element) {
    var node = angular.element(element)[0] || element;

    /* Check if compatible node type (ie: not HTML Document node) */
    if (!node.hasAttribute) {
      return false;
    }

    /* Check label or description attributes */
    return node.hasAttribute('aria-label') || node.hasAttribute('aria-labelledby') || node.hasAttribute('aria-describedby');
  }

  /**
   * Check if expected element's parent has aria label attribute and has valid role and tagName
   * @param element
   * @param {optional} level Number of levels deep search should be performed
   */
  function parentHasAriaLabel(element, level) {
    level = level || 1;
    var node = angular.element(element)[0] || element;
    if (!node.parentNode) {
      return false;
    }
    if (performCheck(node.parentNode)) {
      return true;
    }
    level--;
    if (level) {
      return parentHasAriaLabel(node.parentNode, level);
    }
    return false;

    function performCheck(parentNode) {
      if (!hasAriaLabel(parentNode)) {
        return false;
      }
      /* Perform role blacklist check */
      if (parentNode.hasAttribute('role')) {
        switch (parentNode.getAttribute('role').toLowerCase()) {
          case 'command':
          case 'definition':
          case 'directory':
          case 'grid':
          case 'list':
          case 'listitem':
          case 'log':
          case 'marquee':
          case 'menu':
          case 'menubar':
          case 'note':
          case 'presentation':
          case 'separator':
          case 'scrollbar':
          case 'status':
          case 'tablist':
            return false;
        }
      }
      /* Perform tagName blacklist check */
      switch (parentNode.tagName.toLowerCase()) {
        case 'abbr':
        case 'acronym':
        case 'address':
        case 'applet':
        case 'audio':
        case 'b':
        case 'bdi':
        case 'bdo':
        case 'big':
        case 'blockquote':
        case 'br':
        case 'canvas':
        case 'caption':
        case 'center':
        case 'cite':
        case 'code':
        case 'col':
        case 'data':
        case 'dd':
        case 'del':
        case 'dfn':
        case 'dir':
        case 'div':
        case 'dl':
        case 'em':
        case 'embed':
        case 'fieldset':
        case 'figcaption':
        case 'font':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'hgroup':
        case 'html':
        case 'i':
        case 'ins':
        case 'isindex':
        case 'kbd':
        case 'keygen':
        case 'label':
        case 'legend':
        case 'li':
        case 'map':
        case 'mark':
        case 'menu':
        case 'object':
        case 'ol':
        case 'output':
        case 'pre':
        case 'presentation':
        case 'q':
        case 'rt':
        case 'ruby':
        case 'samp':
        case 'small':
        case 'source':
        case 'span':
        case 'status':
        case 'strike':
        case 'strong':
        case 'sub':
        case 'sup':
        case 'svg':
        case 'tbody':
        case 'td':
        case 'th':
        case 'thead':
        case 'time':
        case 'tr':
        case 'track':
        case 'tt':
        case 'ul':
        case 'var':
          return false;
      }
      return true;
    }
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.compiler
 * @description
 * AngularJS Material template and element compiler.
 */
angular
  .module('material.core')
  .provider('$mdCompiler', MdCompilerProvider);

/**
 * @ngdoc service
 * @name $mdCompilerProvider
 * @module material.core.compiler
 * @description
 * The `$mdCompiler` is able to respect the AngularJS `$compileProvider.preAssignBindingsEnabled`
 * state when using AngularJS versions greater than or equal to 1.5.10 and less than 1.7.0.
 * See the [AngularJS documentation for `$compileProvider.preAssignBindingsEnabled`
 * ](https://code.angularjs.org/1.6.10/docs/api/ng/provider/$compileProvider#preAssignBindingsEnabled)
 * for more information.
 *
 * To enable/disable whether the controllers of dynamic AngularJS Material components
 * (i.e. dialog, panel, toast, bottomsheet) respect the AngularJS
 * `$compileProvider.preAssignBindingsEnabled` flag, call the AngularJS Material method:
 * `$mdCompilerProvider.respectPreAssignBindingsEnabled(boolean)`.
 *
 * This AngularJS Material *flag* doesn't affect directives/components created via regular
 * AngularJS methods. These constitute the majority of AngularJS Material and user-created
 * components. Only dynamic construction of elements such as Dialogs, Panels, Toasts, BottomSheets,
 * etc. may be affected. Invoking `$mdCompilerProvider.respectPreAssignBindingsEnabled(true)`
 * will effect **bindings** in controllers created by AngularJS Material's services like
 * `$mdDialog`, `$mdPanel`, `$mdToast`, or `$mdBottomSheet`.
 *
 * See
 * <a ng-href="#mdcompilerprovider-respectpreassignbindingsenabled-respected">
 *   $mdCompilerProvider.respectPreAssignBindingsEnabled
 * </a>
 * for the details of how the different versions and settings of AngularJS affect this behavior.
 *
 * @usage
 *
 * Respect the AngularJS Compiler Setting
 *
 * <hljs lang="js">
 *   app.config(function($mdCompilerProvider) {
 *     $mdCompilerProvider.respectPreAssignBindingsEnabled(true);
 *   });
 * </hljs>
 *
 * @example
 * Using the default (backwards compatible) values for AngularJS 1.6
 * - AngularJS' `$compileProvider.preAssignBindingsEnabled(false)`
 * - AngularJS Material's `$mdCompilerProvider.respectPreAssignBindingsEnabled(false)`
 * <br><br>
 *
 * <hljs lang="js">
 * $mdDialog.show({
 *   locals: {
 *     myVar: true
 *   },
 *   controller: MyController,
 *   bindToController: true
 * }
 *
 * function MyController() {
 *   // Locals from Angular Material are available. e.g myVar is true.
 * }
 *
 * MyController.prototype.$onInit = function() {
 *   // Bindings are also available in the $onInit lifecycle hook.
 * }
 * </hljs>
 *
 * Recommended Settings for AngularJS 1.6
 * - AngularJS' `$compileProvider.preAssignBindingsEnabled(false)`
 * - AngularJS Material's `$mdCompilerProvider.respectPreAssignBindingsEnabled(true)`
 * <br><br>
 *
 * <hljs lang="js">
 * $mdDialog.show({
 *   locals: {
 *     myVar: true
 *   },
 *   controller: MyController,
 *   bindToController: true
 * }
 *
 * function MyController() {
 *   // No locals from Angular Material are available. e.g myVar is undefined.
 * }
 *
 * MyController.prototype.$onInit = function() {
 *   // Bindings are now available in the $onInit lifecycle hook.
 * }
 * </hljs>
 *
 */
MdCompilerProvider.$inject = ['$compileProvider'];
function MdCompilerProvider($compileProvider) {

  var provider = this;

  /**
   * @ngdoc method
   * @name $mdCompilerProvider#respectPreAssignBindingsEnabled
   *
   * @param {boolean=} respected update the `respectPreAssignBindingsEnabled` state if provided,
   *  otherwise just return the current Material `respectPreAssignBindingsEnabled` state.
   * @returns {boolean|MdCompilerProvider} current value, if used as a getter, or itself (chaining)
   *  if used as a setter.
   *
   * @description
   * Call this method to enable/disable whether Material-specific (dialog/panel/toast/bottomsheet)
   * controllers respect the AngularJS `$compileProvider.preAssignBindingsEnabled` flag. Note that
   * this doesn't affect directives/components created via regular AngularJS methods which
   * constitute most Material and user-created components.
   *
   * If disabled (`false`), the compiler assigns the value of each of the bindings to the
   * properties of the controller object before the constructor of this object is called.
   * The ability to disable this settings is **deprecated** and will be removed in
   * AngularJS Material 1.2.0.
   *
   * If enabled (`true`) the behavior depends on the AngularJS version used:
   *
   * - `<1.5.10`
   *  - Bindings are pre-assigned.
   * - `>=1.5.10 <1.7`
   *  - Respects whatever `$compileProvider.preAssignBindingsEnabled()` reports. If the
   *    `preAssignBindingsEnabled` flag wasn't set manually, it defaults to pre-assigning bindings
   *    with AngularJS `1.5` and to calling the constructor first with AngularJS `1.6`.
   * - `>=1.7`
   *  - The compiler calls the constructor first before assigning bindings and
   *    `$compileProvider.preAssignBindingsEnabled()` no longer exists.
   *
   * Defaults
   * - The default value is `false` in AngularJS 1.6 and earlier.
   *  - It is planned to fix this value to `true` and not allow the `false` value in
   *    AngularJS Material 1.2.0.
   *
   * It is recommended to set this flag to `true` when using AngularJS Material 1.1.x with
   * AngularJS versions >= 1.5.10. The only reason it's not set that way by default is backwards
   * compatibility.
   *
   * By not setting the flag to `true` when AngularJS' `$compileProvider.preAssignBindingsEnabled()`
   * is set to `false` (i.e. default behavior in AngularJS 1.6 or newer), unit testing of
   * Material Dialog/Panel/Toast/BottomSheet controllers using the `$controller` helper
   * is problematic as it always follows AngularJS' `$compileProvider.preAssignBindingsEnabled()`
   * value.
   */
  var respectPreAssignBindingsEnabled = false;
  this.respectPreAssignBindingsEnabled = function(respected) {
    if (angular.isDefined(respected)) {
      respectPreAssignBindingsEnabled = respected;
      return this;
    }

    return respectPreAssignBindingsEnabled;
  };

  /**
   * @private
   * @description
   * This function returns `true` if AngularJS Material-specific (dialog/panel/toast/bottomsheet)
   * controllers have bindings pre-assigned in controller constructors and `false` otherwise.
   *
   * Note that this doesn't affect directives/components created via regular AngularJS methods
   * which constitute most Material and user-created components; their behavior can be checked via
   * `$compileProvider.preAssignBindingsEnabled()` in AngularJS `>=1.5.10 <1.7.0`.
   *
   * @returns {*} current preAssignBindingsEnabled state
   */
  function getPreAssignBindingsEnabled() {
    if (!respectPreAssignBindingsEnabled) {
      // respectPreAssignBindingsEnabled === false
      // We're ignoring the AngularJS `$compileProvider.preAssignBindingsEnabled()` value in this case.
      return true;
    }

    // respectPreAssignBindingsEnabled === true

    // This check is needed because $compileProvider.preAssignBindingsEnabled does not exist prior
    // to AngularJS 1.5.10, is deprecated in AngularJS 1.6.x, and removed in AngularJS 1.7.x.
    if (typeof $compileProvider.preAssignBindingsEnabled === 'function') {
      return $compileProvider.preAssignBindingsEnabled();
    }

    // Flag respected but not present => apply logic based on AngularJS version used.
    if (angular.version.major === 1 && angular.version.minor < 6) {
      // AngularJS <1.5.10
      return true;
    }

    // AngularJS >=1.7.0
    return false;
  }

  this.$get = ["$q", "$templateRequest", "$injector", "$compile", "$controller",
    function($q, $templateRequest, $injector, $compile, $controller) {
      return new MdCompilerService($q, $templateRequest, $injector, $compile, $controller);
    }];

  /**
   * @ngdoc service
   * @name $mdCompiler
   * @module material.core.compiler
   * @description
   * The $mdCompiler service is an abstraction of AngularJS's compiler, that allows developers
   * to easily compile an element with options like in a Directive Definition Object.
   *
   * > The compiler powers a lot of components inside of AngularJS Material.
   * > Like the `$mdPanel` or `$mdDialog`.
   *
   * @usage
   *
   * Basic Usage with a template
   *
   * <hljs lang="js">
   *   $mdCompiler.compile({
   *     templateUrl: 'modal.html',
   *     controller: 'ModalCtrl',
   *     locals: {
   *       modal: myModalInstance;
   *     }
   *   }).then(function (compileData) {
   *     compileData.element; // Compiled DOM element
   *     compileData.link(myScope); // Instantiate controller and link element to scope.
   *   });
   * </hljs>
   *
   * Example with a content element
   *
   * <hljs lang="js">
   *
   *   // Create a virtual element and link it manually.
   *   // The compiler doesn't need to recompile the element each time.
   *   var myElement = $compile('<span>Test</span>')(myScope);
   *
   *   $mdCompiler.compile({
   *     contentElement: myElement
   *   }).then(function (compileData) {
   *     compileData.element // Content Element (same as above)
   *     compileData.link // This does nothing when using a contentElement.
   *   });
   * </hljs>
   *
   * > Content Element is a significant performance improvement when the developer already knows that the
   * > compiled element will be always the same and the scope will not change either.
   *
   * The `contentElement` option also supports DOM elements which will be temporary removed and restored
   * at its old position.
   *
   * <hljs lang="js">
   *   var domElement = document.querySelector('#myElement');
   *
   *   $mdCompiler.compile({
   *     contentElement: myElement
   *   }).then(function (compileData) {
   *     compileData.element // Content Element (same as above)
   *     compileData.link // This does nothing when using a contentElement.
   *   });
   * </hljs>
   *
   * The `$mdCompiler` can also query for the element in the DOM itself.
   *
   * <hljs lang="js">
   *   $mdCompiler.compile({
   *     contentElement: '#myElement'
   *   }).then(function (compileData) {
   *     compileData.element // Content Element (same as above)
   *     compileData.link // This does nothing when using a contentElement.
   *   });
   * </hljs>
   *
   */
  function MdCompilerService($q, $templateRequest, $injector, $compile, $controller) {

    /**
     * @private @const
     * @type {!IQService}
     */
    this.$q = $q;

    /**
     * @private @const
     * @type {!ITemplateRequestService}
     */
    this.$templateRequest = $templateRequest;

    /**
     * @private @const
     * @type {!IInjectorService}
     */
    this.$injector = $injector;

    /**
     * @private @const
     * @type{!ICompileService}
     */
    this.$compile = $compile;

    /**
     * @private @const
     * @type {!IControllerService}
     */
    this.$controller = $controller;
  }

  /**
   * @ngdoc method
   * @name $mdCompiler#compile
   * @description
   *
   * A method to compile a HTML template with the AngularJS compiler.
   * The `$mdCompiler` is wrapper around the AngularJS compiler and provides extra functionality
   * like controller instantiation or async resolves.
   *
   * @param {!Object} options An options object, with the following properties:
   *
   *    - `controller` - `{string|function}` Controller fn that should be associated with
   *         newly created scope or the name of a registered controller if passed as a string.
   *    - `controllerAs` - `{string=}` A controller alias name. If present the controller will be
   *         published to scope under the `controllerAs` name.
   *    - `contentElement` - `{string|Element}`: Instead of using a template, which will be
   *         compiled each time, you can also use a DOM element.<br/>
   *    - `template` - `{string=}` An html template as a string.
   *    - `templateUrl` - `{string=}` A path to an html template.
   *    - `transformTemplate` - `{function(template)=}` A function which transforms the template after
   *        it is loaded. It will be given the template string as a parameter, and should
   *        return a a new string representing the transformed template.
   *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
   *        be injected into the controller. If any of these dependencies are promises, the compiler
   *        will wait for them all to be resolved, or if one is rejected before the controller is
   *        instantiated `compile()` will fail..
   *      * `key` - `{string}`: a name of a dependency to be injected into the controller.
   *      * `factory` - `{string|function}`: If `string` then it is an alias for a service.
   *        Otherwise if function, then it is injected and the return value is treated as the
   *        dependency. If the result is a promise, it is resolved before its value is
   *        injected into the controller.
   *
   * @returns {Object} promise A promise, which will be resolved with a `compileData` object.
   * `compileData` has the following properties:
   *
   *   - `element` - `{Element}`: an uncompiled element matching the provided template.
   *   - `link` - `{function(scope)}`: A link function, which, when called, will compile
   *     the element and instantiate the provided controller (if given).
   *   - `locals` - `{Object}`: The locals which will be passed into the controller once `link` is
   *     called. If `bindToController` is true, they will be copied to the ctrl instead
   */
  MdCompilerService.prototype.compile = function(options) {

    if (options.contentElement) {
      return this._prepareContentElement(options);
    } else {
      return this._compileTemplate(options);
    }

  };

  /**
   * Instead of compiling any template, the compiler just fetches an existing HTML element from the DOM and
   * provides a restore function to put the element back it old DOM position.
   * @param {!Object} options Options to be used for the compiler.
   */
  MdCompilerService.prototype._prepareContentElement = function(options) {

    var contentElement = this._fetchContentElement(options);

    return this.$q.resolve({
      element: contentElement.element,
      cleanup: contentElement.restore,
      locals: {},
      link: function() {
        return contentElement.element;
      }
    });

  };

  /**
   * Compiles a template by considering all options and waiting for all resolves to be ready.
   * @param {!Object} options Compile options
   * @returns {!Object} Compile data with link function.
   */
  MdCompilerService.prototype._compileTemplate = function(options) {

    var self = this;
    var templateUrl = options.templateUrl;
    var template = options.template || '';
    var resolve = angular.extend({}, options.resolve);
    var locals = angular.extend({}, options.locals);
    var transformTemplate = options.transformTemplate || angular.identity;

    // Take resolve values and invoke them.
    // Resolves can either be a string (value: 'MyRegisteredAngularConst'),
    // or an invokable 'factory' of sorts: (value: function ValueGetter($dependency) {})
    angular.forEach(resolve, function(value, key) {
      if (angular.isString(value)) {
        resolve[key] = self.$injector.get(value);
      } else {
        resolve[key] = self.$injector.invoke(value);
      }
    });

    // Add the locals, which are just straight values to inject
    // eg locals: { three: 3 }, will inject three into the controller
    angular.extend(resolve, locals);

    if (templateUrl) {
      resolve.$$ngTemplate = this.$templateRequest(templateUrl);
    } else {
      resolve.$$ngTemplate = this.$q.when(template);
    }


    // Wait for all the resolves to finish if they are promises
    return this.$q.all(resolve).then(function(locals) {

      var template = transformTemplate(locals.$$ngTemplate, options);
      var element = options.element || angular.element('<div>').html(template.trim()).contents();

      return self._compileElement(locals, element, options);
    });

  };

  /**
   * Method to compile an element with the given options.
   * @param {!Object} locals Locals to be injected to the controller if present
   * @param {!JQLite} element Element to be compiled and linked
   * @param {!Object} options Options to be used for linking.
   * @returns {!Object} Compile data with link function.
   */
  MdCompilerService.prototype._compileElement = function(locals, element, options) {
    var self = this;
    var ngLinkFn = this.$compile(element);

    var compileData = {
      element: element,
      cleanup: element.remove.bind(element),
      locals: locals,
      link: linkFn
    };

    function linkFn(scope) {
      locals.$scope = scope;

      // Instantiate controller if the developer provided one.
      if (options.controller) {

        var injectLocals = angular.extend({}, locals, {
          $element: element
        });

        // Create the specified controller instance.
        var ctrl = self._createController(options, injectLocals, locals);

        // Registering extra $destroy listeners should be avoided.
        // Only register the listener if the controller implements a $onDestroy hook.
        if (angular.isFunction(ctrl.$onDestroy)) {
          scope.$on('$destroy', function() {
            // Call the $onDestroy hook if it's present on the controller.
            angular.isFunction(ctrl.$onDestroy) && ctrl.$onDestroy();
          });
        }

        // Unique identifier for AngularJS Route ngView controllers.
        element.data('$ngControllerController', ctrl);
        element.children().data('$ngControllerController', ctrl);

        // Expose the instantiated controller to the compile data
        compileData.controller = ctrl;
      }

      // Invoke the AngularJS $compile link function.
      return ngLinkFn(scope);
    }

    return compileData;

  };

  /**
   * Creates and instantiates a new controller with the specified options.
   * @param {!Object} options Options that include the controller function or string.
   * @param {!Object} injectLocals Locals to to be provided in the controller DI.
   * @param {!Object} locals Locals to be injected to the controller.
   * @returns {!Object} Created controller instance.
   */
  MdCompilerService.prototype._createController = function(options, injectLocals, locals) {
    var ctrl;
    var preAssignBindingsEnabled = getPreAssignBindingsEnabled();
    // The third argument to $controller is considered private and undocumented:
    // https://github.com/angular/angular.js/blob/v1.6.10/src/ng/controller.js#L102-L109.
    // TODO remove the use of this third argument in AngularJS Material 1.2.0.
    // Passing `true` as the third argument causes `$controller` to return a function that
    // gets the controller instance instead of returning the instance directly. When the
    // controller is defined as a function, `invokeCtrl.instance` is the *same instance* as
    // `invokeCtrl()`. However, when the controller is an ES6 class, `invokeCtrl.instance` is a
    // *different instance* from `invokeCtrl()`.
    if (preAssignBindingsEnabled) {
      var invokeCtrl = this.$controller(options.controller, injectLocals, true);

      if (options.bindToController) {
        angular.extend(invokeCtrl.instance, locals);
      }

      // Use the private API callback to instantiate and initialize the specified controller.
      ctrl = invokeCtrl();
    } else {
      // If we don't need to pre-assign bindings, avoid using the private API third argument and
      // related callback.
      ctrl = this.$controller(options.controller, injectLocals);

      if (options.bindToController) {
        angular.extend(ctrl, locals);
      }
    }

    if (options.controllerAs) {
      injectLocals.$scope[options.controllerAs] = ctrl;
    }

    // Call the $onInit hook if it's present on the controller.
    angular.isFunction(ctrl.$onInit) && ctrl.$onInit();

    return ctrl;
  };

  /**
   * Fetches an element removing it from the DOM and using it temporary for the compiler.
   * Elements which were fetched will be restored after use.
   * @param {!Object} options Options to be used for the compilation.
   * @returns {{element: !JQLite, restore: !function}}
   */
  MdCompilerService.prototype._fetchContentElement = function(options) {
    var contentEl = options.contentElement;
    var restoreFn = null;

    if (angular.isString(contentEl)) {
      contentEl = document.querySelector(contentEl);
      restoreFn = createRestoreFn(contentEl);
    } else {
      contentEl = contentEl[0] || contentEl;

      // When the element is visible in the DOM, then we restore it at close of the dialog.
      // Otherwise it will be removed from the DOM after close.
      if (document.contains(contentEl)) {
        restoreFn = createRestoreFn(contentEl);
      } else {
        restoreFn = function() {
          if (contentEl.parentNode) {
            contentEl.parentNode.removeChild(contentEl);
          }
        };
      }
    }

    return {
      element: angular.element(contentEl),
      restore: restoreFn
    };

    function createRestoreFn(element) {
      var parent = element.parentNode;
      var nextSibling = element.nextElementSibling;

      return function() {
        if (!nextSibling) {
          // When the element didn't had any sibling, then it can be simply appended to the
          // parent, because it plays no role, which index it had before.
          parent.appendChild(element);
        } else {
          // When the element had a sibling, which marks the previous position of the element
          // in the DOM, we insert it correctly before the sibling, to have the same index as
          // before.
          parent.insertBefore(element, nextSibling);
        }
      };
    }
  };
}


})();
(function(){
"use strict";


MdGesture.$inject = ["$$MdGestureHandler", "$$rAF", "$timeout", "$mdUtil"];
attachToDocument.$inject = ["$mdGesture", "$$MdGestureHandler", "$mdUtil"];var HANDLERS = {};

/**
 * The state of the current 'pointer'. The pointer represents the state of the current touch.
 * It contains normalized x and y coordinates from DOM events,
 * as well as other information abstracted from the DOM.
 */
var pointer, lastPointer, maxClickDistance = 6;
var forceSkipClickHijack = false, disableAllGestures = false;

/**
 * The position of the most recent click if that click was on a label element.
 * @type {{x: number, y: number}|null}
 */
var lastLabelClickPos = null;

/**
 * Used to attach event listeners once when multiple ng-apps are running.
 * @type {boolean}
 */
var isInitialized = false;

/**
 * @ngdoc module
 * @name material.core.gestures
 * @description
 * AngularJS Material Gesture handling for touch devices.
 * This module replaced the usage of the HammerJS library.
 */
angular
  .module('material.core.gestures', [])
  .provider('$mdGesture', MdGestureProvider)
  .factory('$$MdGestureHandler', MdGestureHandler)
  .run(attachToDocument);

/**
 * @ngdoc service
 * @name $mdGestureProvider
 * @module material.core.gestures
 *
 * @description
 * In some scenarios on mobile devices (without jQuery), the click events should NOT be hijacked.
 * `$mdGestureProvider` is used to configure the Gesture module to ignore or skip click hijacking
 * on mobile devices.
 *
 * You can also change the max click distance, `6px` by default, if you have issues on some touch
 * screens.
 *
 * <hljs lang="js">
 *   app.config(function($mdGestureProvider) {
 *
 *     // For mobile devices without jQuery loaded, do not
 *     // intercept click events during the capture phase.
 *     $mdGestureProvider.skipClickHijack();
 *
 *     // If hijacking clicks, you may want to change the default click distance
 *     $mdGestureProvider.setMaxClickDistance(12);
 *   });
 * </hljs>
 *
 */
function MdGestureProvider() { }

MdGestureProvider.prototype = {

  /**
   * @ngdoc method
   * @name $mdGestureProvider#disableAll
   *
   * @description
   * Disable all gesture detection. This can be beneficial to application performance
   * and memory usage.
   */
  disableAll: function () {
    disableAllGestures = true;
  },

  // Publish access to setter to configure a variable BEFORE the
  // $mdGesture service is instantiated...
  /**
   * @ngdoc method
   * @name $mdGestureProvider#skipClickHijack
   *
   * @description
   * Tell the AngularJS Material Gesture module to skip (or ignore) click hijacking on mobile devices.
   */
  skipClickHijack: function() {
    return forceSkipClickHijack = true;
  },

  /**
   * @ngdoc method
   * @name $mdGestureProvider#setMaxClickDistance
   * @param clickDistance {string} Distance in pixels. I.e. `12px`.
   * @description
   * Set the max distance from the origin of the touch event to trigger touch handlers.
   */
  setMaxClickDistance: function(clickDistance) {
    maxClickDistance = parseInt(clickDistance);
  },

  /**
   * $get is used to build an instance of $mdGesture
   * @ngInject
   */
  $get : ["$$MdGestureHandler", "$$rAF", "$timeout", "$mdUtil", function($$MdGestureHandler, $$rAF, $timeout, $mdUtil) {
       return new MdGesture($$MdGestureHandler, $$rAF, $timeout, $mdUtil);
  }]
};



/**
 * MdGesture factory construction function
 * @ngInject
 */
function MdGesture($$MdGestureHandler, $$rAF, $timeout, $mdUtil) {
  var touchActionProperty = $mdUtil.getTouchAction();
  var hasJQuery = (typeof window.jQuery !== 'undefined') && (angular.element === window.jQuery);

  var self = {
    handler: addHandler,
    register: register,
    isAndroid: $mdUtil.isAndroid,
    isIos: $mdUtil.isIos,
    // On mobile w/out jQuery, we normally intercept clicks. Should we skip that?
    isHijackingClicks: ($mdUtil.isIos || $mdUtil.isAndroid) && !hasJQuery && !forceSkipClickHijack
  };

  if (self.isHijackingClicks) {
    self.handler('click', {
      options: {
        maxDistance: maxClickDistance
      },
      onEnd: checkDistanceAndEmit('click')
    });

    self.handler('focus', {
      options: {
        maxDistance: maxClickDistance
      },
      onEnd: function(ev, pointer) {
        if (pointer.distance < this.state.options.maxDistance && canFocus(ev.target)) {
          this.dispatchEvent(ev, 'focus', pointer);
          ev.target.focus();
        }
      }
    });

    self.handler('mouseup', {
      options: {
        maxDistance: maxClickDistance
      },
      onEnd: checkDistanceAndEmit('mouseup')
    });

    self.handler('mousedown', {
      onStart: function(ev) {
        this.dispatchEvent(ev, 'mousedown');
      }
    });
  }

  function checkDistanceAndEmit(eventName) {
    return function(ev, pointer) {
      if (pointer.distance < this.state.options.maxDistance) {
        this.dispatchEvent(ev, eventName, pointer);
      }
    };
  }

  /**
   * Register an element to listen for a handler.
   * This allows an element to override the default options for a handler.
   * Additionally, some handlers like drag and hold only dispatch events if
   * the domEvent happens inside an element that's registered to listen for these events.
   *
   * @see GestureHandler for how overriding of default options works.
   * @example $mdGesture.register(myElement, 'drag', { minDistance: 20, horizontal: false })
   */
  function register(element, handlerName, options) {
    var handler = HANDLERS[handlerName.replace(/^\$md./, '')];
    if (!handler) {
      throw new Error('Failed to register element with handler ' + handlerName + '. ' +
      'Available handlers: ' + Object.keys(HANDLERS).join(', '));
    }
    return handler.registerElement(element, options);
  }

  /*
   * add a handler to $mdGesture. see below.
   */
  function addHandler(name, definition) {
    var handler = new $$MdGestureHandler(name);
    angular.extend(handler, definition);
    HANDLERS[name] = handler;

    return self;
  }

  /**
   * Register handlers. These listen to touch/start/move events, interpret them,
   * and dispatch gesture events depending on options & conditions. These are all
   * instances of GestureHandler.
   * @see GestureHandler
   */
  return self
    /*
     * The press handler dispatches an event on touchdown/touchend.
     * It's a simple abstraction of touch/mouse/pointer start and end.
     */
    .handler('press', {
      onStart: function (ev, pointer) {
        this.dispatchEvent(ev, '$md.pressdown');
      },
      onEnd: function (ev, pointer) {
        this.dispatchEvent(ev, '$md.pressup');
      }
    })

    /*
     * The hold handler dispatches an event if the user keeps their finger within
     * the same <maxDistance> area for <delay> ms.
     * The hold handler will only run if a parent of the touch target is registered
     * to listen for hold events through $mdGesture.register()
     */
    .handler('hold', {
      options: {
        maxDistance: 6,
        delay: 500
      },
      onCancel: function () {
        $timeout.cancel(this.state.timeout);
      },
      onStart: function (ev, pointer) {
        // For hold, require a parent to be registered with $mdGesture.register()
        // Because we prevent scroll events, this is necessary.
        if (!this.state.registeredParent) return this.cancel();

        this.state.pos = {x: pointer.x, y: pointer.y};
        this.state.timeout = $timeout(angular.bind(this, function holdDelayFn() {
          this.dispatchEvent(ev, '$md.hold');
          this.cancel(); // we're done!
        }), this.state.options.delay, false);
      },
      onMove: function (ev, pointer) {
        // Don't scroll while waiting for hold.
        // If we don't preventDefault touchmove events here, Android will assume we don't
        // want to listen to anymore touch events. It will start scrolling and stop sending
        // touchmove events.
        if (!touchActionProperty && ev.type === 'touchmove') ev.preventDefault();

        // If the user moves greater than <maxDistance> pixels, stop the hold timer
        // set in onStart
        var dx = this.state.pos.x - pointer.x;
        var dy = this.state.pos.y - pointer.y;
        if (Math.sqrt(dx * dx + dy * dy) > this.options.maxDistance) {
          this.cancel();
        }
      },
      onEnd: function () {
        this.onCancel();
      }
    })

    /*
     * The drag handler dispatches a drag event if the user holds and moves his finger greater than
     * <minDistance> px in the x or y direction, depending on options.horizontal.
     * The drag will be cancelled if the user moves his finger greater than <minDistance>*<cancelMultiplier> in
     * the perpendicular direction. Eg if the drag is horizontal and the user moves his finger <minDistance>*<cancelMultiplier>
     * pixels vertically, this handler won't consider the move part of a drag.
     */
    .handler('drag', {
      options: {
        minDistance: 6,
        horizontal: true,
        cancelMultiplier: 1.5
      },
      /**
       * @param {angular.JQLite} element where touch action styles need to be adjusted
       * @param {{horizontal: boolean}=} options object whose horizontal property can specify to
       *  apply 'pan-y' or 'pan-x' touch actions.
       */
      onSetup: function(element, options) {
        if (touchActionProperty) {
          // We check for horizontal to be false, because otherwise we would overwrite the default opts.
          this.oldTouchAction = element[0].style[touchActionProperty];
          element[0].style[touchActionProperty] = options.horizontal ? 'pan-y' : 'pan-x';
        }
      },
      /**
       * @param {angular.JQLite} element where styles need to be cleaned up
       */
      onCleanup: function(element) {
        if (this.oldTouchAction) {
          element[0].style[touchActionProperty] = this.oldTouchAction;
        } else {
          element[0].style[touchActionProperty] = null;
        }
      },
      onStart: function (ev) {
        // For drag, require a parent to be registered with $mdGesture.register()
        if (!this.state.registeredParent) this.cancel();
      },
      onMove: function (ev, pointer) {
        var shouldStartDrag, shouldCancel;
        // Don't scroll while deciding if this touchmove qualifies as a drag event.
        // If we don't preventDefault touchmove events here, Android will assume we don't
        // want to listen to anymore touch events. It will start scrolling and stop sending
        // touchmove events.
        if (!touchActionProperty && ev.type === 'touchmove') ev.preventDefault();

        if (!this.state.dragPointer) {
          if (this.state.options.horizontal) {
            shouldStartDrag = Math.abs(pointer.distanceX) > this.state.options.minDistance;
            shouldCancel = Math.abs(pointer.distanceY) > this.state.options.minDistance * this.state.options.cancelMultiplier;
          } else {
            shouldStartDrag = Math.abs(pointer.distanceY) > this.state.options.minDistance;
            shouldCancel = Math.abs(pointer.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier;
          }

          if (shouldStartDrag) {
            // Create a new pointer representing this drag, starting at this point where the drag started.
            this.state.dragPointer = makeStartPointer(ev);
            updatePointerState(ev, this.state.dragPointer);
            this.dispatchEvent(ev, '$md.dragstart', this.state.dragPointer);

          } else if (shouldCancel) {
            this.cancel();
          }
        } else {
          this.dispatchDragMove(ev);
        }
      },
      // Only dispatch dragmove events every frame; any more is unnecessary
      dispatchDragMove: $$rAF.throttle(function (ev) {
        // Make sure the drag didn't stop while waiting for the next frame
        if (this.state.isRunning) {
          updatePointerState(ev, this.state.dragPointer);
          this.dispatchEvent(ev, '$md.drag', this.state.dragPointer);
        }
      }),
      onEnd: function (ev, pointer) {
        if (this.state.dragPointer) {
          updatePointerState(ev, this.state.dragPointer);
          this.dispatchEvent(ev, '$md.dragend', this.state.dragPointer);
        }
      }
    })

    /*
     * The swipe handler will dispatch a swipe event if, on the end of a touch,
     * the velocity and distance were high enough.
     */
    .handler('swipe', {
      options: {
        minVelocity: 0.65,
        minDistance: 10
      },
      onEnd: function (ev, pointer) {
        var eventType;

        if (Math.abs(pointer.velocityX) > this.state.options.minVelocity &&
          Math.abs(pointer.distanceX) > this.state.options.minDistance) {
          eventType = pointer.directionX == 'left' ? '$md.swipeleft' : '$md.swiperight';
          this.dispatchEvent(ev, eventType);
        }
        else if (Math.abs(pointer.velocityY) > this.state.options.minVelocity &&
          Math.abs(pointer.distanceY) > this.state.options.minDistance) {
          eventType = pointer.directionY == 'up' ? '$md.swipeup' : '$md.swipedown';
          this.dispatchEvent(ev, eventType);
        }
      }
    });
}

/**
 * MdGestureHandler
 * A GestureHandler is an object which is able to dispatch custom dom events
 * based on native dom {touch,pointer,mouse}{start,move,end} events.
 *
 * A gesture will manage its lifecycle through the start,move,end, and cancel
 * functions, which are called by native dom events.
 *
 * A gesture has the concept of 'options' (eg. a swipe's required velocity), which can be
 * overridden by elements registering through $mdGesture.register().
 */
function GestureHandler (name) {
  this.name = name;
  this.state = {};
}

function MdGestureHandler() {
  var hasJQuery =  (typeof window.jQuery !== 'undefined') && (angular.element === window.jQuery);

  GestureHandler.prototype = {
    options: {},
    // jQuery listeners don't work with custom DOMEvents, so we have to dispatch events
    // differently when jQuery is loaded
    dispatchEvent: hasJQuery ?  jQueryDispatchEvent : nativeDispatchEvent,

    // These are overridden by the registered handler
    onSetup: angular.noop,
    onCleanup: angular.noop,
    onStart: angular.noop,
    onMove: angular.noop,
    onEnd: angular.noop,
    onCancel: angular.noop,

    // onStart sets up a new state for the handler, which includes options from the
    // nearest registered parent element of ev.target.
    start: function (ev, pointer) {
      if (this.state.isRunning) return;
      var parentTarget = this.getNearestParent(ev.target);
      // Get the options from the nearest registered parent
      var parentTargetOptions = parentTarget && parentTarget.$mdGesture[this.name] || {};

      this.state = {
        isRunning: true,
        // Override the default options with the nearest registered parent's options
        options: angular.extend({}, this.options, parentTargetOptions),
        // Pass in the registered parent node to the state so the onStart listener can use
        registeredParent: parentTarget
      };
      this.onStart(ev, pointer);
    },
    move: function (ev, pointer) {
      if (!this.state.isRunning) return;
      this.onMove(ev, pointer);
    },
    end: function (ev, pointer) {
      if (!this.state.isRunning) return;
      this.state.isRunning = false;
      this.onEnd(ev, pointer);
    },
    cancel: function (ev, pointer) {
      this.onCancel(ev, pointer);
      this.state = {};
    },

    // Find and return the nearest parent element that has been registered to
    // listen for this handler via $mdGesture.register(element, 'handlerName').
    getNearestParent: function (node) {
      var current = node;
      while (current) {
        if ((current.$mdGesture || {})[this.name]) {
          return current;
        }
        current = current.parentNode;
      }
      return null;
    },

    // Called from $mdGesture.register when an element registers itself with a handler.
    // Store the options the user gave on the DOMElement itself. These options will
    // be retrieved with getNearestParent when the handler starts.
    registerElement: function (element, options) {
      var self = this;
      element[0].$mdGesture = element[0].$mdGesture || {};
      element[0].$mdGesture[this.name] = options || {};
      element.on('$destroy', onDestroy);

      self.onSetup(element, options || {});

      return onDestroy;

      function onDestroy() {
        delete element[0].$mdGesture[self.name];
        element.off('$destroy', onDestroy);

        self.onCleanup(element, options || {});
      }
    }
  };

  return GestureHandler;

  /**
   * Dispatch an event with jQuery
   * TODO: Make sure this sends bubbling events
   *
   * @param srcEvent the original DOM touch event that started this.
   * @param eventType the name of the custom event to send (eg 'click' or '$md.drag')
   * @param eventPointer the pointer object that matches this event.
   */
  function jQueryDispatchEvent(srcEvent, eventType, eventPointer) {
    eventPointer = eventPointer || pointer;
    var eventObj = new angular.element.Event(eventType);

    eventObj.$material = true;
    eventObj.pointer = eventPointer;
    eventObj.srcEvent = srcEvent;

    angular.extend(eventObj, {
      clientX: eventPointer.x,
      clientY: eventPointer.y,
      screenX: eventPointer.x,
      screenY: eventPointer.y,
      pageX: eventPointer.x,
      pageY: eventPointer.y,
      ctrlKey: srcEvent.ctrlKey,
      altKey: srcEvent.altKey,
      shiftKey: srcEvent.shiftKey,
      metaKey: srcEvent.metaKey
    });
    angular.element(eventPointer.target).trigger(eventObj);
  }

  /**
   * NOTE: nativeDispatchEvent is very performance sensitive.
   * @param srcEvent the original DOM touch event that started this.
   * @param eventType the name of the custom event to send (eg 'click' or '$md.drag')
   * @param eventPointer the pointer object that matches this event.
   */
  function nativeDispatchEvent(srcEvent, eventType, eventPointer) {
    eventPointer = eventPointer || pointer;
    var eventObj;

    if (eventType === 'click' || eventType === 'mouseup' || eventType === 'mousedown') {
      if (typeof window.MouseEvent === "function") {
        eventObj = new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
          screenX: Number(srcEvent.screenX),
          screenY: Number(srcEvent.screenY),
          clientX: Number(eventPointer.x),
          clientY: Number(eventPointer.y),
          ctrlKey: srcEvent.ctrlKey,
          altKey: srcEvent.altKey,
          shiftKey: srcEvent.shiftKey,
          metaKey: srcEvent.metaKey,
          button: srcEvent.button,
          buttons: srcEvent.buttons,
          relatedTarget: srcEvent.relatedTarget || null
        });
      } else {
        eventObj = document.createEvent('MouseEvents');
        // This has been deprecated
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
        eventObj.initMouseEvent(
          eventType, true, true, window, srcEvent.detail,
          eventPointer.x, eventPointer.y, eventPointer.x, eventPointer.y,
          srcEvent.ctrlKey, srcEvent.altKey, srcEvent.shiftKey, srcEvent.metaKey,
          srcEvent.button, srcEvent.relatedTarget || null
        );
      }
    } else {
      if (typeof window.CustomEvent === "function") {
        eventObj = new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: {}
        });
      } else {
        // This has been deprecated
        // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/initCustomEvent
        eventObj = document.createEvent('CustomEvent');
        eventObj.initCustomEvent(eventType, true, true, {});
      }
    }
    eventObj.$material = true;
    eventObj.pointer = eventPointer;
    eventObj.srcEvent = srcEvent;
    eventPointer.target.dispatchEvent(eventObj);
  }
}

/**
 * Attach Gestures: hook document and check shouldHijack clicks
 * @ngInject
 */
function attachToDocument($mdGesture, $$MdGestureHandler, $mdUtil) {
  if (disableAllGestures) {
    return;
  }

  if (!isInitialized && $mdGesture.isHijackingClicks) {
    /*
     * If hijack clicks is true, we preventDefault any click that wasn't
     * sent by AngularJS Material. This is because on older Android & iOS, a false, or 'ghost',
     * click event will be sent ~400ms after a touchend event happens.
     * The only way to know if this click is real is to prevent any normal
     * click events, and add a flag to events sent by material so we know not to prevent those.
     *
     * Two exceptions to click events that should be prevented are:
     *  - click events sent by the keyboard (eg form submit)
     *  - events that originate from an Ionic app
     */
    document.addEventListener('click'    , clickHijacker     , true);
    document.addEventListener('mouseup'  , mouseInputHijacker, true);
    document.addEventListener('mousedown', mouseInputHijacker, true);
    document.addEventListener('focus'    , mouseInputHijacker, true);

    isInitialized = true;
  }

  function mouseInputHijacker(ev) {
    var isKeyClick = !ev.clientX && !ev.clientY;

    if (
      !isKeyClick &&
      !ev.$material &&
      !ev.isIonicTap &&
      !isInputEventFromLabelClick(ev) &&
      (ev.type !== 'mousedown' || (!canFocus(ev.target) && !canFocus(document.activeElement)))
    ) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  /**
   * Ignore click events that don't come from AngularJS Material, Ionic, Input Label clicks,
   * or key presses that generate click events. This helps to ignore the ghost tap events on
   * older mobile browsers that get sent after a 300-400ms delay.
   * @param ev MouseEvent or modified MouseEvent with $material, pointer, and other fields
   */
  function clickHijacker(ev) {
    var isKeyClick;
    if ($mdUtil.isIos) {
      isKeyClick = angular.isDefined(ev.webkitForce) && ev.webkitForce === 0;
    } else {
      isKeyClick = ev.clientX === 0 && ev.clientY === 0;
    }
    if (!isKeyClick && !ev.$material && !ev.isIonicTap && !isInputEventFromLabelClick(ev)) {
      ev.preventDefault();
      ev.stopPropagation();
      lastLabelClickPos = null;
    } else {
      lastLabelClickPos = null;
      if (ev.target.tagName.toLowerCase() === 'label') {
        lastLabelClickPos = {x: ev.x, y: ev.y};
      }
    }
  }


  // Listen to all events to cover all platforms.
  var START_EVENTS = 'mousedown touchstart pointerdown';
  var MOVE_EVENTS = 'mousemove touchmove pointermove';
  var END_EVENTS = 'mouseup mouseleave touchend touchcancel pointerup pointercancel';

  angular.element(document)
    .on(START_EVENTS, gestureStart)
    .on(MOVE_EVENTS, gestureMove)
    .on(END_EVENTS, gestureEnd)
    // For testing
    .on('$$mdGestureReset', function gestureClearCache () {
      lastPointer = pointer = null;
    });

  /**
   * When a DOM event happens, run all registered gesture handlers' lifecycle
   * methods which match the DOM event.
   * Eg. when a 'touchstart' event happens, runHandlers('start') will call and
   * run `handler.cancel()` and `handler.start()` on all registered handlers.
   */
  function runHandlers(handlerEvent, event) {
    var handler;
    for (var name in HANDLERS) {
      handler = HANDLERS[name];
      if (handler instanceof $$MdGestureHandler) {

        if (handlerEvent === 'start') {
          // Run cancel to reset any handlers' state
          handler.cancel();
        }
        handler[handlerEvent](event, pointer);
      }
    }
  }

  /*
   * gestureStart vets if a start event is legitimate (and not part of a 'ghost click' from iOS/Android)
   * If it is legitimate, we initiate the pointer state and mark the current pointer's type
   * For example, for a touchstart event, mark the current pointer as a 'touch' pointer, so mouse events
   * won't effect it.
   */
  function gestureStart(ev) {
    // If we're already touched down, abort
    if (pointer) return;

    var now = +Date.now();

    // iOS & old android bug: after a touch event, a click event is sent 350 ms later.
    // If <400ms have passed, don't allow an event of a different type than the previous event
    if (lastPointer && !typesMatch(ev, lastPointer) && (now - lastPointer.endTime < 1500)) {
      return;
    }

    pointer = makeStartPointer(ev);

    runHandlers('start', ev);
  }

  /**
   * If a move event happens of the right type, update the pointer and run all the move handlers.
   * "of the right type": if a mousemove happens but our pointer started with a touch event, do
   * nothing.
   */
  function gestureMove(ev) {
    if (!pointer || !typesMatch(ev, pointer)) return;

    updatePointerState(ev, pointer);
    runHandlers('move', ev);
  }

  /**
   * If an end event happens of the right type, update the pointer, run endHandlers, and save the
   * pointer as 'lastPointer'.
   */
  function gestureEnd(ev) {
    if (!pointer || !typesMatch(ev, pointer)) return;

    updatePointerState(ev, pointer);
    pointer.endTime = +Date.now();

    if (ev.type !== 'pointercancel') {
      runHandlers('end', ev);
    }

    lastPointer = pointer;
    pointer = null;
  }

}

// ********************
// Module Functions
// ********************

/*
 * Initiate the pointer. x, y, and the pointer's type.
 */
function makeStartPointer(ev) {
  var point = getEventPoint(ev);
  var startPointer = {
    startTime: +Date.now(),
    target: ev.target,
    // 'p' for pointer events, 'm' for mouse, 't' for touch
    type: ev.type.charAt(0)
  };
  startPointer.startX = startPointer.x = point.pageX;
  startPointer.startY = startPointer.y = point.pageY;
  return startPointer;
}

/*
 * return whether the pointer's type matches the event's type.
 * Eg if a touch event happens but the pointer has a mouse type, return false.
 */
function typesMatch(ev, pointer) {
  return ev && pointer && ev.type.charAt(0) === pointer.type;
}

/**
 * Gets whether the given event is an input event that was caused by clicking on an
 * associated label element.
 *
 * This is necessary because the browser will, upon clicking on a label element, fire an
 * *extra* click event on its associated input (if any). mdGesture is able to flag the label
 * click as with `$material` correctly, but not the second input click.
 *
 * In order to determine whether an input event is from a label click, we compare the (x, y) for
 * the event to the (x, y) for the most recent label click (which is cleared whenever a non-label
 * click occurs). Unfortunately, there are no event properties that tie the input and the label
 * together (such as relatedTarget).
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
function isInputEventFromLabelClick(event) {
  return lastLabelClickPos
      && lastLabelClickPos.x === event.x
      && lastLabelClickPos.y === event.y;
}

/*
 * Update the given pointer based upon the given DOMEvent.
 * Distance, velocity, direction, duration, etc
 */
function updatePointerState(ev, pointer) {
  var point = getEventPoint(ev);
  var x = pointer.x = point.pageX;
  var y = pointer.y = point.pageY;

  pointer.distanceX = x - pointer.startX;
  pointer.distanceY = y - pointer.startY;
  pointer.distance = Math.sqrt(
    pointer.distanceX * pointer.distanceX + pointer.distanceY * pointer.distanceY
  );

  pointer.directionX = pointer.distanceX > 0 ? 'right' : pointer.distanceX < 0 ? 'left' : '';
  pointer.directionY = pointer.distanceY > 0 ? 'down' : pointer.distanceY < 0 ? 'up' : '';

  pointer.duration = +Date.now() - pointer.startTime;
  pointer.velocityX = pointer.distanceX / pointer.duration;
  pointer.velocityY = pointer.distanceY / pointer.duration;
}

/**
 * Normalize the point where the DOM event happened whether it's touch or mouse.
 * @returns point event obj with pageX and pageY on it.
 */
function getEventPoint(ev) {
  ev = ev.originalEvent || ev; // support jQuery events
  return (ev.touches && ev.touches[0]) ||
    (ev.changedTouches && ev.changedTouches[0]) ||
    ev;
}

/** Checks whether an element can be focused. */
function canFocus(element) {
  return (
    !!element &&
    element.getAttribute('tabindex') !== '-1' &&
    !element.hasAttribute('disabled') &&
    (
      element.hasAttribute('tabindex') ||
      element.hasAttribute('href') ||
      element.isContentEditable ||
      ['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA', 'VIDEO', 'AUDIO'].indexOf(element.nodeName) !== -1
    )
  );
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.interaction
 * @description
 * User interaction detection to provide proper accessibility.
 */
MdInteractionService.$inject = ["$timeout", "$mdUtil", "$rootScope"];
angular
  .module('material.core.interaction', [])
  .service('$mdInteraction', MdInteractionService);


/**
 * @ngdoc service
 * @name $mdInteraction
 * @module material.core.interaction
 *
 * @description
 *
 * Service which keeps track of the last interaction type and validates them for several browsers.
 * The service hooks into the document's body and listens for touch, mouse and keyboard events.
 *
 * The most recent interaction type can be retrieved by calling the `getLastInteractionType` method.
 *
 * Here is an example markup for using the interaction service.
 *
 * <hljs lang="js">
 *   var lastType = $mdInteraction.getLastInteractionType();
 *
 *   if (lastType === 'keyboard') {
 *     // We only restore the focus for keyboard users.
 *     restoreFocus();
 *   }
 * </hljs>
 *
 */
function MdInteractionService($timeout, $mdUtil, $rootScope) {
  this.$timeout = $timeout;
  this.$mdUtil = $mdUtil;
  this.$rootScope = $rootScope;

  // IE browsers can also trigger pointer events, which also leads to an interaction.
  this.pointerEvent = 'MSPointerEvent' in window ? 'MSPointerDown' : 'PointerEvent' in window ? 'pointerdown' : null;
  this.bodyElement = angular.element(document.body);
  this.isBuffering = false;
  this.bufferTimeout = null;
  this.lastInteractionType = null;
  this.lastInteractionTime = null;
  this.inputHandler = this.onInputEvent.bind(this);
  this.bufferedInputHandler = this.onBufferInputEvent.bind(this);

  // Type Mappings for the different events
  // There will be three three interaction types
  // `keyboard`, `mouse` and `touch`
  // type `pointer` will be evaluated in `pointerMap` for IE Browser events
  this.inputEventMap = {
    'keydown': 'keyboard',
    'mousedown': 'mouse',
    'mouseenter': 'mouse',
    'touchstart': 'touch',
    'pointerdown': 'pointer',
    'MSPointerDown': 'pointer'
  };

  // IE PointerDown events will be validated in `touch` or `mouse`
  // Index numbers referenced here: https://msdn.microsoft.com/library/windows/apps/hh466130.aspx
  this.iePointerMap = {
    2: 'touch',
    3: 'touch',
    4: 'mouse'
  };

  this.initializeEvents();
  this.$rootScope.$on('$destroy', this.deregister.bind(this));
}

/**
 * Removes all event listeners created by $mdInteration on the
 * body element.
 */
MdInteractionService.prototype.deregister = function() {

    this.bodyElement.off('keydown mousedown', this.inputHandler);

    if ('ontouchstart' in document.documentElement) {
      this.bodyElement.off('touchstart', this.bufferedInputHandler);
    }

    if (this.pointerEvent) {
      this.bodyElement.off(this.pointerEvent, this.inputHandler);
    }

};

/**
 * Initializes the interaction service, by registering all interaction events to the
 * body element.
 */
MdInteractionService.prototype.initializeEvents = function() {

  this.bodyElement.on('keydown mousedown', this.inputHandler);

  if ('ontouchstart' in document.documentElement) {
    this.bodyElement.on('touchstart', this.bufferedInputHandler);
  }

  if (this.pointerEvent) {
    this.bodyElement.on(this.pointerEvent, this.inputHandler);
  }

};

/**
 * Event listener for normal interaction events, which should be tracked.
 * @param event {MouseEvent|KeyboardEvent|PointerEvent|TouchEvent}
 */
MdInteractionService.prototype.onInputEvent = function(event) {
  if (this.isBuffering) {
    return;
  }

  var type = this.inputEventMap[event.type];

  if (type === 'pointer') {
    type = this.iePointerMap[event.pointerType] || event.pointerType;
  }

  this.lastInteractionType = type;
  this.lastInteractionTime = this.$mdUtil.now();
};

/**
 * Event listener for interaction events which should be buffered (touch events).
 * @param event {TouchEvent}
 */
MdInteractionService.prototype.onBufferInputEvent = function(event) {
  this.$timeout.cancel(this.bufferTimeout);

  this.onInputEvent(event);
  this.isBuffering = true;

  // The timeout of 650ms is needed to delay the touchstart, because otherwise the touch will call
  // the `onInput` function multiple times.
  this.bufferTimeout = this.$timeout(function() {
    this.isBuffering = false;
  }.bind(this), 650, false);

};

/**
 * @ngdoc method
 * @name $mdInteraction#getLastInteractionType
 * @description Retrieves the last interaction type triggered in body.
 * @returns {string|null} Last interaction type.
 */
MdInteractionService.prototype.getLastInteractionType = function() {
  return this.lastInteractionType;
};

/**
 * @ngdoc method
 * @name $mdInteraction#isUserInvoked
 * @description Method to detect whether any interaction happened recently or not.
 * @param {number=} checkDelay Time to check for any interaction to have been triggered.
 * @returns {boolean} Whether there was any interaction or not.
 */
MdInteractionService.prototype.isUserInvoked = function(checkDelay) {
  var delay = angular.isNumber(checkDelay) ? checkDelay : 15;

  // Check for any interaction to be within the specified check time.
  return this.lastInteractionTime >= this.$mdUtil.now() - delay;
};

})();
(function(){
"use strict";

angular.module('material.core')
  .provider('$$interimElement', InterimElementProvider);

/**
 * @ngdoc service
 * @name $$interimElementProvider
 * @module material.core.interimElement
 *
 * @description
 *
 * Factory that constructs `$$interimElement.$service` services.
 * Used internally in material design for elements that appear on screen temporarily.
 * The service provides a promise-like API for interacting with the temporary
 * elements.
 *
 * <hljs lang="js">
 *   app.service('$mdToast', function($$interimElement) {
 *     var $mdToast = $$interimElement(toastDefaultOptions);
 *     return $mdToast;
 *   });
 * </hljs>
 *
 * @param {object=} defaultOptions Options used by default for the `show` method on the service.
 *
 * @returns {$$interimElement.$service}
 */

function InterimElementProvider() {
  InterimElementFactory.$inject = ["$document", "$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$mdUtil", "$mdCompiler", "$mdTheming", "$injector", "$exceptionHandler"];
  createInterimElementProvider.$get = InterimElementFactory;
  return createInterimElementProvider;

  /**
   * Returns a new provider which allows configuration of a new interimElement
   * service. Allows configuration of default options & methods for options,
   * as well as configuration of 'preset' methods (eg dialog.basic(): basic is a preset method)
   */
  function createInterimElementProvider(interimFactoryName) {
    factory.$inject = ["$$interimElement", "$injector"];
    var EXPOSED_METHODS = ['onHide', 'onShow', 'onRemove'];

    var customMethods = {};
    var providerConfig = {
      presets: {}
    };

    var provider = {
      setDefaults: setDefaults,
      addPreset: addPreset,
      addMethod: addMethod,
      $get: factory
    };

    /**
     * all interim elements will come with the 'build' preset
     */
    provider.addPreset('build', {
      methods: ['controller', 'controllerAs', 'resolve', 'multiple',
        'template', 'templateUrl', 'themable', 'transformTemplate', 'parent', 'contentElement']
    });

    return provider;

    /**
     * Save the configured defaults to be used when the factory is instantiated
     */
    function setDefaults(definition) {
      providerConfig.optionsFactory = definition.options;
      providerConfig.methods = (definition.methods || []).concat(EXPOSED_METHODS);
      return provider;
    }

    /**
     * Add a method to the factory that isn't specific to any interim element operations
     */
    function addMethod(name, fn) {
      customMethods[name] = fn;
      return provider;
    }

    /**
     * Save the configured preset to be used when the factory is instantiated
     */
    function addPreset(name, definition) {
      definition = definition || {};
      definition.methods = definition.methods || [];
      definition.options = definition.options || function() { return {}; };

      if (/^cancel|hide|show$/.test(name)) {
        throw new Error("Preset '" + name + "' in " + interimFactoryName + " is reserved!");
      }
      if (definition.methods.indexOf('_options') > -1) {
        throw new Error("Method '_options' in " + interimFactoryName + " is reserved!");
      }
      providerConfig.presets[name] = {
        methods: definition.methods.concat(EXPOSED_METHODS),
        optionsFactory: definition.options,
        argOption: definition.argOption
      };
      return provider;
    }

    function addPresetMethod(presetName, methodName, method) {
      providerConfig.presets[presetName][methodName] = method;
    }

    /**
     * Create a factory that has the given methods & defaults implementing interimElement
     */
    /* @ngInject */
    function factory($$interimElement, $injector) {
      var defaultMethods;
      var defaultOptions;
      var interimElementService = $$interimElement();

      /*
       * publicService is what the developer will be using.
       * It has methods hide(), cancel(), show(), build(), and any other
       * presets which were set during the config phase.
       */
      var publicService = {
        hide: interimElementService.hide,
        cancel: interimElementService.cancel,
        show: showInterimElement,

        // Special internal method to destroy an interim element without animations
        // used when navigation changes causes a $scope.$destroy() action
        destroy : destroyInterimElement
      };


      defaultMethods = providerConfig.methods || [];
      // This must be invoked after the publicService is initialized
      defaultOptions = invokeFactory(providerConfig.optionsFactory, {});

      // Copy over the simple custom methods
      angular.forEach(customMethods, function(fn, name) {
        publicService[name] = fn;
      });

      angular.forEach(providerConfig.presets, function(definition, name) {
        var presetDefaults = invokeFactory(definition.optionsFactory, {});
        var presetMethods = (definition.methods || []).concat(defaultMethods);

        // Every interimElement built with a preset has a field called `$type`,
        // which matches the name of the preset.
        // Eg in preset 'confirm', options.$type === 'confirm'
        angular.extend(presetDefaults, { $type: name });

        // This creates a preset class which has setter methods for every
        // method given in the `.addPreset()` function, as well as every
        // method given in the `.setDefaults()` function.
        //
        // @example
        // .setDefaults({
        //   methods: ['hasBackdrop', 'clickOutsideToClose', 'escapeToClose', 'targetEvent'],
        //   options: dialogDefaultOptions
        // })
        // .addPreset('alert', {
        //   methods: ['title', 'ok'],
        //   options: alertDialogOptions
        // })
        //
        // Set values will be passed to the options when interimElement.show() is called.
        function Preset(opts) {
          this._options = angular.extend({}, presetDefaults, opts);
        }
        angular.forEach(presetMethods, function(name) {
          Preset.prototype[name] = function(value) {
            this._options[name] = value;
            return this;
          };
        });

        // Create shortcut method for one-linear methods
        if (definition.argOption) {
          var methodName = 'show' + name.charAt(0).toUpperCase() + name.slice(1);
          publicService[methodName] = function(arg) {
            var config = publicService[name](arg);
            return publicService.show(config);
          };
        }

        // eg $mdDialog.alert() will return a new alert preset
        publicService[name] = function(arg) {
          // If argOption is supplied, eg `argOption: 'content'`, then we assume
          // if the argument is not an options object then it is the `argOption` option.
          //
          // @example `$mdToast.simple('hello')` // sets options.content to hello
          //                                     // because argOption === 'content'
          if (arguments.length && definition.argOption &&
              !angular.isObject(arg) && !angular.isArray(arg))  {

            return (new Preset())[definition.argOption](arg);

          } else {
            return new Preset(arg);
          }

        };
      });

      return publicService;

      /**
       *
       */
      function showInterimElement(opts) {
        // opts is either a preset which stores its options on an _options field,
        // or just an object made up of options
        opts = opts || { };
        if (opts._options) opts = opts._options;

        return interimElementService.show(
          angular.extend({}, defaultOptions, opts)
        );
      }

      /**
       *  Special method to hide and destroy an interimElement WITHOUT
       *  any 'leave` or hide animations ( an immediate force hide/remove )
       *
       *  NOTE: This calls the onRemove() subclass method for each component...
       *  which must have code to respond to `options.$destroy == true`
       */
      function destroyInterimElement(opts) {
          return interimElementService.destroy(opts);
      }

      /**
       * Helper to call $injector.invoke with a local of the factory name for
       * this provider.
       * If an $mdDialog is providing options for a dialog and tries to inject
       * $mdDialog, a circular dependency error will happen.
       * We get around that by manually injecting $mdDialog as a local.
       */
      function invokeFactory(factory, defaultVal) {
        var locals = {};
        locals[interimFactoryName] = publicService;
        return $injector.invoke(factory || function() { return defaultVal; }, {}, locals);
      }
    }
  }

  /* @ngInject */
  function InterimElementFactory($document, $q, $rootScope, $timeout, $rootElement, $animate,
                                 $mdUtil, $mdCompiler, $mdTheming, $injector, $exceptionHandler) {
    return function createInterimElementService() {
      var SHOW_CANCELLED = false;

      /**
       * @ngdoc service
       * @name $$interimElementProvider.$service
       *
       * @description
       * A service used to control inserting and removing of an element from the DOM.
       * It is used by $mdBottomSheet, $mdDialog, $mdToast, $mdMenu, $mdPanel, and $mdSelect.
       */
      var service;

      var showPromises = []; // Promises for the interim's which are currently opening.
      var hidePromises = []; // Promises for the interim's which are currently hiding.
      var showingInterims = []; // Interim elements which are currently showing up.

      // Publish instance $$interimElement service;
      return service = {
        show: show,
        hide: waitForInterim(hide),
        cancel: waitForInterim(cancel),
        destroy : destroy,
        $injector_: $injector
      };

      /**
       * @ngdoc method
       * @name $$interimElementProvider.$service#show
       * @kind function
       *
       * @description
       * Adds the `$interimElement` to the DOM and returns a special promise that will be resolved
       * or rejected with hide or cancel, respectively.
       *
       * @param {object} options map of options and values
       * @returns {Promise} a Promise that will be resolved when hide() is called or rejected when
       *  cancel() is called.
       */
      function show(options) {
        options = options || {};
        var interimElement = new InterimElement(options || {});

        // When an interim element is currently showing, we have to cancel it.
        // Just hiding it, will resolve the InterimElement's promise, the promise should be
        // rejected instead.
        var hideAction = options.multiple ? $q.resolve() : $q.all(showPromises);

        if (!options.multiple) {
          // Wait for all opening interim's to finish their transition.
          hideAction = hideAction.then(function() {
            // Wait for all closing and showing interim's to be completely closed.
            var promiseArray = hidePromises.concat(showingInterims.map(service.cancel));
            return $q.all(promiseArray);
          });
        }

        var showAction = hideAction.then(function() {

          return interimElement
            .show()
            .then(function () {
              showingInterims.push(interimElement);
            })
            .catch(function (reason) {
              return reason;
            })
            .finally(function() {
              showPromises.splice(showPromises.indexOf(showAction), 1);
            });

        });

        showPromises.push(showAction);

        // In AngularJS 1.6+, exceptions inside promises will cause a rejection. We need to handle
        // the rejection and only log it if it's an error.
        interimElement.deferred.promise.catch(function(fault) {
          if (fault instanceof Error) {
            $exceptionHandler(fault);
          }

          return fault;
        });

        // Return a promise that will be resolved when the interim
        // element is hidden or cancelled...
        return interimElement.deferred.promise;
      }

      /**
       * @ngdoc method
       * @name $$interimElementProvider.$service#hide
       * @kind function
       *
       * @description
       * Removes the `$interimElement` from the DOM and resolves the Promise returned from `show()`.
       *
       * @param {*} reason Data used to resolve the Promise
       * @param {object} options map of options and values
       * @returns {Promise} a Promise that will be resolved after the element has been removed
       *  from the DOM.
       */
      function hide(reason, options) {
        options = options || {};

        if (options.closeAll) {
          // We have to make a shallow copy of the array, because otherwise the map will break.
          return $q.all(showingInterims.slice().reverse().map(closeElement));
        } else if (options.closeTo !== undefined) {
          return $q.all(showingInterims.slice(options.closeTo).map(closeElement));
        }

        // Hide the latest showing interim element.
        return closeElement(showingInterims[showingInterims.length - 1]);

        /**
         * @param {InterimElement} interim element to close
         * @returns {Promise<InterimElement>}
         */
        function closeElement(interim) {
          if (!interim) {
            return $q.when(reason);
          }

          var hideAction = interim
            .remove(reason, false, options || { })
            .catch(function(reason) { return reason; })
            .finally(function() {
              hidePromises.splice(hidePromises.indexOf(hideAction), 1);
            });

          showingInterims.splice(showingInterims.indexOf(interim), 1);
          hidePromises.push(hideAction);

          return interim.deferred.promise;
        }
      }

      /**
       * @ngdoc method
       * @name $$interimElementProvider.$service#cancel
       * @kind function
       *
       * @description
       * Removes the `$interimElement` from the DOM and rejects the Promise returned from `show()`.
       *
       * @param {*} reason Data used to resolve the Promise
       * @param {object} options map of options and values
       * @returns {Promise} Promise that will be resolved after the element has been removed
       *  from the DOM.
       */
      function cancel(reason, options) {
        var interim = showingInterims.pop();
        if (!interim) {
          return $q.when(reason);
        }

        var cancelAction = interim
          .remove(reason, true, options || {})
          .catch(function(reason) { return reason; })
          .finally(function() {
            hidePromises.splice(hidePromises.indexOf(cancelAction), 1);
          });

        hidePromises.push(cancelAction);

        // Since AngularJS 1.6.7, promises will be logged to $exceptionHandler when the promise
        // is not handling the rejection. We create a pseudo catch handler, which will prevent the
        // promise from being logged to the $exceptionHandler.
        return interim.deferred.promise.catch(angular.noop);
      }

      /**
       * Creates a function to wait for at least one interim element to be available.
       * @param callbackFn Function to be used as callback
       * @returns {Function}
       */
      function waitForInterim(callbackFn) {
        return function() {
          var fnArguments = arguments;

          if (!showingInterims.length) {
            // When there are still interim's opening, then wait for the first interim element to
            // finish its open animation.
            if (showPromises.length) {
              return showPromises[0].finally(function () {
                return callbackFn.apply(service, fnArguments);
              });
            }

            return $q.when("No interim elements currently showing up.");
          }

          return callbackFn.apply(service, fnArguments);
        };
      }

      /**
       * @ngdoc method
       * @name $$interimElementProvider.$service#destroy
       * @kind function
       *
       * Special method to quick-remove the interim element without running animations. This is
       * useful when the parent component has been or is being destroyed.
       *
       * Note: interim elements are in "interim containers".
       */
      function destroy(targetEl) {
        var interim = !targetEl ? showingInterims.shift() : null;

        var parentEl = angular.element(targetEl).length && angular.element(targetEl)[0].parentNode;

        if (parentEl) {
          // Try to find the interim in the stack which corresponds to the supplied DOM element.
          var filtered = showingInterims.filter(function(entry) {
            return entry.options.element[0] === parentEl;
          });

          // Note: This function might be called when the element already has been removed,
          // in which case we won't find any matches.
          if (filtered.length) {
            interim = filtered[0];
            showingInterims.splice(showingInterims.indexOf(interim), 1);
          }
        }

        return interim ? interim.remove(SHOW_CANCELLED, false, { '$destroy': true }) :
                         $q.when(SHOW_CANCELLED);
      }

      /*
       * Internal Interim Element Object
       * Used internally to manage the DOM element and related data
       */
      function InterimElement(options) {
        var self, element, showAction = $q.when(true);

        options = configureScopeAndTransitions(options);

        return self = {
          options : options,
          deferred: $q.defer(),
          show    : createAndTransitionIn,
          remove  : transitionOutAndRemove
        };

        /**
         * Compile, link, and show this interim element
         * Use optional autoHided and transition-in effects
         */
        function createAndTransitionIn() {
          return $q(function(resolve, reject) {

            // Trigger onCompiling callback before the compilation starts.
            // This is useful, when modifying options, which can be influenced by developers.
            options.onCompiling && options.onCompiling(options);

            compileElement(options)
              .then(function(compiledData) {
                element = linkElement(compiledData, options);

                // Expose the cleanup function from the compiler.
                options.cleanupElement = compiledData.cleanup;

                showAction = showElement(element, options, compiledData.controller)
                  .then(resolve, rejectAll);
              }).catch(rejectAll);

            function rejectAll(fault) {
              // Force the '$md<xxx>.show()' promise to reject
              self.deferred.reject(fault);

              // Continue rejection propagation
              reject(fault);
            }
          });
        }

        /**
         * After the show process has finished/rejected:
         * - announce 'removing',
         * - perform the transition-out, and
         * - perform optional clean up scope.
         */
        function transitionOutAndRemove(response, isCancelled, opts) {

          // abort if the show() and compile failed
          if (!element) return $q.when(false);

          options = angular.extend(options || {}, opts || {});
          options.cancelAutoHide && options.cancelAutoHide();
          options.element.triggerHandler('$mdInterimElementRemove');

          if (options.$destroy === true) {

            return hideElement(options.element, options).then(function(){
              (isCancelled && rejectAll(response)) || resolveAll(response);
            });

          } else {
            $q.when(showAction).finally(function() {
              hideElement(options.element, options).then(function() {
                isCancelled ? rejectAll(response) : resolveAll(response);
              }, rejectAll);
            });

            return self.deferred.promise;
          }


          /**
           * The `show()` returns a promise that will be resolved when the interim
           * element is hidden or cancelled...
           */
          function resolveAll(response) {
            self.deferred.resolve(response);
          }

          /**
           * Force the '$md<xxx>.show()' promise to reject
           */
          function rejectAll(fault) {
            self.deferred.reject(fault);
          }
        }

        /**
         * Prepare optional isolated scope and prepare $animate with default enter and leave
         * transitions for the new element instance.
         */
        function configureScopeAndTransitions(options) {
          options = options || { };
          if (options.template) {
            options.template = $mdUtil.processTemplate(options.template);
          }

          return angular.extend({
            preserveScope: false,
            cancelAutoHide : angular.noop,
            scope: options.scope || $rootScope.$new(options.isolateScope),

            /**
             * Default usage to enable $animate to transition-in; can be easily overridden via 'options'
             */
            onShow: function transitionIn(scope, element, options) {
              return $animate.enter(element, options.parent);
            },

            /**
             * Default usage to enable $animate to transition-out; can be easily overridden via 'options'
             */
            onRemove: function transitionOut(scope, element) {
              // Element could be undefined if a new element is shown before
              // the old one finishes compiling.
              return element && $animate.leave(element) || $q.when();
            }
          }, options);

        }

        /**
         * Compile an element with a templateUrl, controller, and locals
         */
        function compileElement(options) {

          var compiled = !options.skipCompile ? $mdCompiler.compile(options) : null;

          return compiled || $q(function (resolve) {
              resolve({
                locals: {},
                link: function () {
                  return options.element;
                }
              });
            });
        }

        /**
         *  Link an element with compiled configuration
         */
        function linkElement(compileData, options){
          angular.extend(compileData.locals, options);

          var element = compileData.link(options.scope);

          // Search for parent at insertion time, if not specified
          options.element = element;
          options.parent = findParent(element, options);
          if (options.themable) $mdTheming(element);

          return element;
        }

        /**
         * Search for parent at insertion time, if not specified
         */
        function findParent(element, options) {
          var parent = options.parent;

          // Search for parent at insertion time, if not specified
          if (angular.isFunction(parent)) {
            parent = parent(options.scope, element, options);
          } else if (angular.isString(parent)) {
            parent = angular.element($document[0].querySelector(parent));
          } else {
            parent = angular.element(parent);
          }

          // If parent querySelector/getter function fails, or it's just null,
          // find a default.
          if (!(parent || {}).length) {
            var el;
            if ($rootElement[0] && $rootElement[0].querySelector) {
              el = $rootElement[0].querySelector(':not(svg) > body');
            }
            if (!el) el = $rootElement[0];
            if (el.nodeName == '#comment') {
              el = $document[0].body;
            }
            return angular.element(el);
          }

          return parent;
        }

        /**
         * If auto-hide is enabled, start timer and prepare cancel function
         */
        function startAutoHide() {
          var autoHideTimer, cancelAutoHide = angular.noop;

          if (options.hideDelay) {
            autoHideTimer = $timeout(service.hide, options.hideDelay) ;
            cancelAutoHide = function() {
              $timeout.cancel(autoHideTimer);
            };
          }

          // Cache for subsequent use
          options.cancelAutoHide = function() {
            cancelAutoHide();
            options.cancelAutoHide = undefined;
          };
        }

        /**
         * Show the element ( with transitions), notify complete and start
         * optional auto-Hide
         */
        function showElement(element, options, controller) {
          // Trigger onShowing callback before the `show()` starts
          var notifyShowing = options.onShowing || angular.noop;
          // Trigger onComplete callback when the `show()` finishes
          var notifyComplete = options.onComplete || angular.noop;

          // Necessary for consistency between AngularJS 1.5 and 1.6.
          try {
            notifyShowing(options.scope, element, options, controller);
          } catch (e) {
            return $q.reject(e);
          }

          return $q(function (resolve, reject) {
            try {
              // Start transitionIn
              $q.when(options.onShow(options.scope, element, options, controller))
                .then(function () {
                  notifyComplete(options.scope, element, options);
                  startAutoHide();

                  resolve(element);
                }, reject);

            } catch (e) {
              reject(e.message);
            }
          });
        }

        function hideElement(element, options) {
          var announceRemoving = options.onRemoving || angular.noop;

          return $q(function (resolve, reject) {
            try {
              // Start transitionIn
              var action = $q.when(options.onRemove(options.scope, element, options) || true);

              // Trigger callback *before* the remove operation starts
              announceRemoving(element, action);

              if (options.$destroy) {
                // For $destroy, onRemove should be synchronous
                resolve(element);

                if (!options.preserveScope && options.scope) {
                  // scope destroy should still be be done after the current digest is done
                  action.then(function() { options.scope.$destroy(); });
                }
              } else {
                // Wait until transition-out is done
                action.then(function () {
                  if (!options.preserveScope && options.scope) {
                    options.scope.$destroy();
                  }

                  resolve(element);
                }, reject);
              }
            } catch (e) {
              reject(e.message);
            }
          });
        }

      }
    };
  }
}

})();
(function(){
"use strict";

(function() {
  'use strict';

  var $mdUtil, $interpolate, $log;

  var SUFFIXES = /(-gt)?-(sm|md|lg|print)/g;
  var WHITESPACE = /\s+/g;

  var FLEX_OPTIONS = ['grow', 'initial', 'auto', 'none', 'noshrink', 'nogrow'];
  var LAYOUT_OPTIONS = ['row', 'column'];
  var ALIGNMENT_MAIN_AXIS= ["", "start", "center", "end", "stretch", "space-around", "space-between"];
  var ALIGNMENT_CROSS_AXIS= ["", "start", "center", "end", "stretch"];

  var config = {
    /**
     * Enable directive attribute-to-class conversions
     * Developers can use `<body md-layout-css />` to quickly
     * disable the Layout directives and prohibit the injection of Layout classNames
     */
    enabled: true,

    /**
     * List of mediaQuery breakpoints and associated suffixes
     *
     *   [
     *    { suffix: "sm", mediaQuery: "screen and (max-width: 599px)" },
     *    { suffix: "md", mediaQuery: "screen and (min-width: 600px) and (max-width: 959px)" }
     *   ]
     */
    breakpoints: []
  };

  registerLayoutAPI(angular.module('material.core.layout', ['ng']));

  /**
   *   registerLayoutAPI()
   *
   *   The original AngularJS Material Layout solution used attribute selectors and CSS.
   *
   *  ```html
   *  <div layout="column"> My Content </div>
   *  ```
   *
   *  ```css
   *  [layout] {
   *    box-sizing: border-box;
   *    display:flex;
   *  }
   *  [layout=column] {
   *    flex-direction : column
   *  }
   *  ```
   *
   *  Use of attribute selectors creates significant performance impacts in some
   *  browsers... mainly IE.
   *
   *  This module registers directives that allow the same layout attributes to be
   *  interpreted and converted to class selectors. The directive will add equivalent classes to each element that
   *  contains a Layout directive.
   *
   * ```html
   *   <div layout="column" class="layout layout-column"> My Content </div>
   *```
   *
   *  ```css
   *  .layout {
   *    box-sizing: border-box;
   *    display:flex;
   *  }
   *  .layout-column {
   *    flex-direction : column
   *  }
   *  ```
   */
  function registerLayoutAPI(module){
    var PREFIX_REGEXP = /^((?:x|data)[:\-_])/i;
    var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;

    // NOTE: these are also defined in constants::MEDIA_PRIORITY and constants::MEDIA
    var BREAKPOINTS     = ["", "xs", "gt-xs", "sm", "gt-sm", "md", "gt-md", "lg", "gt-lg", "xl", "print"];
    var API_WITH_VALUES = ["layout", "flex", "flex-order", "flex-offset", "layout-align"];
    var API_NO_VALUES   = ["show", "hide", "layout-padding", "layout-margin"];


    // Build directive registration functions for the standard Layout API... for all breakpoints.
    angular.forEach(BREAKPOINTS, function(mqb) {

      // Attribute directives with expected, observable value(s)
      angular.forEach(API_WITH_VALUES, function(name){
        var fullName = mqb ? name + "-" + mqb : name;
        module.directive(directiveNormalize(fullName), attributeWithObserve(fullName));
      });

      // Attribute directives with no expected value(s)
      angular.forEach(API_NO_VALUES, function(name){
        var fullName = mqb ? name + "-" + mqb : name;
        module.directive(directiveNormalize(fullName), attributeWithoutValue(fullName));
      });

    });

    // Register other, special directive functions for the Layout features:
    module

      .provider('$$mdLayout'     , function() {
        // Publish internal service for Layouts
        return {
          $get : angular.noop,
          validateAttributeValue : validateAttributeValue,
          validateAttributeUsage : validateAttributeUsage,
          /**
           * Easy way to disable/enable the Layout API.
           * When disabled, this stops all attribute-to-classname generations
           */
          disableLayouts  : function(isDisabled) {
            config.enabled =  (isDisabled !== true);
          }
        };
      })

      .directive('mdLayoutCss'        , disableLayoutDirective)
      .directive('ngCloak'            , buildCloakInterceptor('ng-cloak'))

      .directive('layoutWrap'   , attributeWithoutValue('layout-wrap'))
      .directive('layoutNowrap' , attributeWithoutValue('layout-nowrap'))
      .directive('layoutNoWrap' , attributeWithoutValue('layout-no-wrap'))
      .directive('layoutFill'   , attributeWithoutValue('layout-fill'))

      // !! Deprecated attributes: use the `-lt` (aka less-than) notations

      .directive('layoutLtMd'     , warnAttrNotSupported('layout-lt-md', true))
      .directive('layoutLtLg'     , warnAttrNotSupported('layout-lt-lg', true))
      .directive('flexLtMd'       , warnAttrNotSupported('flex-lt-md', true))
      .directive('flexLtLg'       , warnAttrNotSupported('flex-lt-lg', true))

      .directive('layoutAlignLtMd', warnAttrNotSupported('layout-align-lt-md'))
      .directive('layoutAlignLtLg', warnAttrNotSupported('layout-align-lt-lg'))
      .directive('flexOrderLtMd'  , warnAttrNotSupported('flex-order-lt-md'))
      .directive('flexOrderLtLg'  , warnAttrNotSupported('flex-order-lt-lg'))
      .directive('offsetLtMd'     , warnAttrNotSupported('flex-offset-lt-md'))
      .directive('offsetLtLg'     , warnAttrNotSupported('flex-offset-lt-lg'))

      .directive('hideLtMd'       , warnAttrNotSupported('hide-lt-md'))
      .directive('hideLtLg'       , warnAttrNotSupported('hide-lt-lg'))
      .directive('showLtMd'       , warnAttrNotSupported('show-lt-md'))
      .directive('showLtLg'       , warnAttrNotSupported('show-lt-lg'))

      // Determine if
      .config(detectDisabledLayouts);

    /**
     * Converts snake_case to camelCase.
     * Also there is special case for Moz prefix starting with upper case letter.
     * @param name Name to normalize
     */
    function directiveNormalize(name) {
      return name
        .replace(PREFIX_REGEXP, '')
        .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
    }

  }


  /**
    * Detect if any of the HTML tags has a [md-layouts-disabled] attribute;
    * If yes, then immediately disable all layout API features
    *
    * Note: this attribute should be specified on either the HTML or BODY tags
    */
   /**
    * @ngInject
    */
   function detectDisabledLayouts() {
     var isDisabled = !!document.querySelector('[md-layouts-disabled]');
     config.enabled = !isDisabled;
   }

  /**
   * Special directive that will disable ALL Layout conversions of layout
   * attribute(s) to classname(s).
   *
   * <link rel="stylesheet" href="angular-material.min.css">
   * <link rel="stylesheet" href="angular-material.layout.css">
   *
   * <body md-layout-css>
   *  ...
   * </body>
   *
   * Note: Using md-layout-css directive requires the developer to load the Material
   * Layout Attribute stylesheet (which only uses attribute selectors):
   *
   *       `angular-material.layout.css`
   *
   * Another option is to use the LayoutProvider to configure and disable the attribute
   * conversions; this would obviate the use of the `md-layout-css` directive
   *
   */
  function disableLayoutDirective() {
    // Return a 1x-only, first-match attribute directive
    config.enabled = false;

    return {
      restrict : 'A',
      priority : '900'
    };
  }

  /**
   * Tail-hook ngCloak to delay the uncloaking while Layout transformers
   * finish processing. Eliminates flicker with Material.Layouts
   */
  function buildCloakInterceptor(className) {
    return ['$timeout', function($timeout){
      return {
        restrict : 'A',
        priority : -10,   // run after normal ng-cloak
        compile  : function(element) {
          if (!config.enabled) return angular.noop;

          // Re-add the cloak
          element.addClass(className);

          return function(scope, element) {
            // Wait while layout injectors configure, then uncloak
            // NOTE: $rAF does not delay enough... and this is a 1x-only event,
            //       $timeout is acceptable.
            $timeout(function(){
              element.removeClass(className);
            }, 10, false);
          };
        }
      };
    }];
  }


  // *********************************************************************************
  //
  // These functions create registration functions for AngularJS Material Layout attribute directives
  // This provides easy translation to switch AngularJS Material attribute selectors to
  // CLASS selectors and directives; which has huge performance implications
  // for IE Browsers
  //
  // *********************************************************************************

  /**
   * Creates a directive registration function where a possible dynamic attribute
   * value will be observed/watched.
   * @param {string} className attribute name; eg `layout-gt-md` with value ="row"
   */
  function attributeWithObserve(className) {

    return ['$mdUtil', '$interpolate', "$log", function(_$mdUtil_, _$interpolate_, _$log_) {
      $mdUtil = _$mdUtil_;
      $interpolate = _$interpolate_;
      $log = _$log_;

      return {
        restrict: 'A',
        compile: function(element, attr) {
          var linkFn;
          if (config.enabled) {
            // immediately replace static (non-interpolated) invalid values...

            validateAttributeUsage(className, attr, element, $log);

            validateAttributeValue(className,
              getNormalizedAttrValue(className, attr, ""),
              buildUpdateFn(element, className, attr)
            );

            linkFn = translateWithValueToCssClass;
          }

          // Use for postLink to account for transforms after ng-transclude.
          return linkFn || angular.noop;
        }
      };
    }];

    /**
     * Add as transformed class selector(s), then
     * remove the deprecated attribute selector
     */
    function translateWithValueToCssClass(scope, element, attrs) {
      var updateFn = updateClassWithValue(element, className, attrs);
      var unwatch = attrs.$observe(attrs.$normalize(className), updateFn);

      updateFn(getNormalizedAttrValue(className, attrs, ""));
      scope.$on("$destroy", function() { unwatch(); });
    }
  }

  /**
   * Creates a registration function for AngularJS Material Layout attribute directive.
   * This is a `simple` transpose of attribute usage to class usage; where we ignore
   * any attribute value
   */
  function attributeWithoutValue(className) {
    return ['$mdUtil', '$interpolate', "$log", function(_$mdUtil_, _$interpolate_, _$log_) {
      $mdUtil = _$mdUtil_;
      $interpolate = _$interpolate_;
      $log = _$log_;

      return {
        restrict: 'A',
        compile: function(element, attr) {
          var linkFn;
          if (config.enabled) {
            // immediately replace static (non-interpolated) invalid values...

            validateAttributeValue(className,
              getNormalizedAttrValue(className, attr, ""),
              buildUpdateFn(element, className, attr)
            );

            translateToCssClass(null, element);

            // Use for postLink to account for transforms after ng-transclude.
            linkFn = translateToCssClass;
          }

          return linkFn || angular.noop;
        }
      };
    }];

    /**
     * Add as transformed class selector, then
     * remove the deprecated attribute selector
     */
    function translateToCssClass(scope, element) {
      element.addClass(className);
    }
  }



  /**
   * After link-phase, do NOT remove deprecated layout attribute selector.
   * Instead watch the attribute so interpolated data-bindings to layout
   * selectors will continue to be supported.
   *
   * $observe() the className and update with new class (after removing the last one)
   *
   * e.g. `layout="{{layoutDemo.direction}}"` will update...
   *
   * NOTE: The value must match one of the specified styles in the CSS.
   * For example `flex-gt-md="{{size}}`  where `scope.size == 47` will NOT work since
   * only breakpoints for 0, 5, 10, 15... 100, 33, 34, 66, 67 are defined.
   *
   */
  function updateClassWithValue(element, className) {
    var lastClass;

    return function updateClassFn(newValue) {
      var value = validateAttributeValue(className, newValue || "");
      if (angular.isDefined(value)) {
        if (lastClass) element.removeClass(lastClass);
        lastClass = !value ? className : className + "-" + value.trim().replace(WHITESPACE, "-");
        element.addClass(lastClass);
      }
    };
  }

  /**
   * Provide console warning that this layout attribute has been deprecated
   *
   */
  function warnAttrNotSupported(className) {
    var parts = className.split("-");
    return ["$log", function($log) {
      $log.warn(className + "has been deprecated. Please use a `" + parts[0] + "-gt-<xxx>` variant.");
      return angular.noop;
    }];
  }

  /**
   * Centralize warnings for known flexbox issues (especially IE-related issues)
   */
  function validateAttributeUsage(className, attr, element, $log){
    var message, usage, url;
    var nodeName = element[0].nodeName.toLowerCase();

    switch (className.replace(SUFFIXES,"")) {
      case "flex":
        if ((nodeName == "md-button") || (nodeName == "fieldset")){
          // @see https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers
          // Use <div flex> wrapper inside (preferred) or outside

          usage = "<" + nodeName + " " + className + "></" + nodeName + ">";
          url = "https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers";
          message = "Markup '{0}' may not work as expected in IE Browsers. Consult '{1}' for details.";

          $log.warn($mdUtil.supplant(message, [usage, url]));
        }
    }

  }


  /**
   * For the Layout attribute value, validate or replace with default
   * fallback value
   */
  function validateAttributeValue(className, value, updateFn) {
    var origValue = value;

    if (!needsInterpolation(value)) {
      switch (className.replace(SUFFIXES,"")) {
        case 'layout'        :
          if (!findIn(value, LAYOUT_OPTIONS)) {
            value = LAYOUT_OPTIONS[0];    // 'row';
          }
          break;

        case 'flex'          :
          if (!findIn(value, FLEX_OPTIONS)) {
            if (isNaN(value)) {
              value = '';
            }
          }
          break;

        case 'flex-offset' :
        case 'flex-order'    :
          if (!value || isNaN(+value)) {
            value = '0';
          }
          break;

        case 'layout-align'  :
          var axis = extractAlignAxis(value);
          value = $mdUtil.supplant("{main}-{cross}",axis);
          break;

        case 'layout-padding' :
        case 'layout-margin'  :
        case 'layout-fill'    :
        case 'layout-wrap'    :
        case 'layout-nowrap' :
          value = '';
          break;
      }

      if (value != origValue) {
        (updateFn || angular.noop)(value);
      }
    }

    return value ? value.trim() : "";
  }

  /**
   * Replace current attribute value with fallback value
   */
  function buildUpdateFn(element, className, attrs) {
    return function updateAttrValue(fallback) {
      if (!needsInterpolation(fallback)) {
        // Do not modify the element's attribute value; so
        // uses '<ui-layout layout="/api/sidebar.html" />' will not
        // be affected. Just update the attrs value.
        attrs[attrs.$normalize(className)] = fallback;
      }
    };
  }

  /**
   * See if the original value has interpolation symbols:
   * e.g.  flex-gt-md="{{triggerPoint}}"
   */
  function needsInterpolation(value) {
    return (value || "").indexOf($interpolate.startSymbol()) > -1;
  }

  function getNormalizedAttrValue(className, attrs, defaultVal) {
    var normalizedAttr = attrs.$normalize(className);
    return attrs[normalizedAttr] ? attrs[normalizedAttr].trim().replace(WHITESPACE, "-") : defaultVal || null;
  }

  function findIn(item, list, replaceWith) {
    item = replaceWith && item ? item.replace(WHITESPACE, replaceWith) : item;

    var found = false;
    if (item) {
      list.forEach(function(it) {
        it = replaceWith ? it.replace(WHITESPACE, replaceWith) : it;
        found = found || (it === item);
      });
    }
    return found;
  }

  function extractAlignAxis(attrValue) {
    var axis = {
      main : "start",
      cross: "stretch"
    }, values;

    attrValue = (attrValue || "");

    if (attrValue.indexOf("-") === 0 || attrValue.indexOf(" ") === 0) {
      // For missing main-axis values
      attrValue = "none" + attrValue;
    }

    values = attrValue.toLowerCase().trim().replace(WHITESPACE, "-").split("-");
    if (values.length && (values[0] === "space")) {
      // for main-axis values of "space-around" or "space-between"
      values = [values[0]+"-"+values[1],values[2]];
    }

    if (values.length > 0) axis.main  = values[0] || axis.main;
    if (values.length > 1) axis.cross = values[1] || axis.cross;

    if (ALIGNMENT_MAIN_AXIS.indexOf(axis.main) < 0)   axis.main = "start";
    if (ALIGNMENT_CROSS_AXIS.indexOf(axis.cross) < 0) axis.cross = "stretch";

    return axis;
  }


})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.liveannouncer
 * @description
 * AngularJS Material Live Announcer to provide accessibility for Voice Readers.
 */
MdLiveAnnouncer.$inject = ["$timeout"];
angular
  .module('material.core')
  .service('$mdLiveAnnouncer', MdLiveAnnouncer);

/**
 * @ngdoc service
 * @name $mdLiveAnnouncer
 * @module material.core.liveannouncer
 *
 * @description
 *
 * Service to announce messages to supported screenreaders.
 *
 * > The `$mdLiveAnnouncer` service is internally used for components to provide proper accessibility.
 *
 * <hljs lang="js">
 *   module.controller('AppCtrl', function($mdLiveAnnouncer) {
 *     // Basic announcement (Polite Mode)
 *     $mdLiveAnnouncer.announce('Hey Google');
 *
 *     // Custom announcement (Assertive Mode)
 *     $mdLiveAnnouncer.announce('Hey Google', 'assertive');
 *   });
 * </hljs>
 *
 */
function MdLiveAnnouncer($timeout) {
  /** @private @const @type {!angular.$timeout} */
  this._$timeout = $timeout;

  /** @private @const @type {!HTMLElement} */
  this._liveElement = this._createLiveElement();

  /** @private @const @type {!number} */
  this._announceTimeout = 100;
}

/**
 * @ngdoc method
 * @name $mdLiveAnnouncer#announce
 * @description Announces messages to supported screenreaders.
 * @param {string} message Message to be announced to the screenreader
 * @param {'off'|'polite'|'assertive'} politeness The politeness of the announcer element.
 */
MdLiveAnnouncer.prototype.announce = function(message, politeness) {
  if (!politeness) {
    politeness = 'polite';
  }

  var self = this;

  self._liveElement.textContent = '';
  self._liveElement.setAttribute('aria-live', politeness);

  // This 100ms timeout is necessary for some browser + screen-reader combinations:
  // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
  // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
  //   second time without clearing and then using a non-zero delay.
  // (using JAWS 17 at time of this writing).
  self._$timeout(function() {
    self._liveElement.textContent = message;
  }, self._announceTimeout, false);
};

/**
 * Creates a live announcer element, which listens for DOM changes and announces them
 * to the screenreaders.
 * @returns {!HTMLElement}
 * @private
 */
MdLiveAnnouncer.prototype._createLiveElement = function() {
  var liveEl = document.createElement('div');

  liveEl.classList.add('md-visually-hidden');
  liveEl.setAttribute('role', 'status');
  liveEl.setAttribute('aria-atomic', 'true');
  liveEl.setAttribute('aria-live', 'polite');

  document.body.appendChild(liveEl);

  return liveEl;
};

})();
(function(){
"use strict";

/**
 * @ngdoc service
 * @name $$mdMeta
 * @module material.core.meta
 *
 * @description
 *
 * A provider and a service that simplifies meta tags access
 *
 * Note: This is intended only for use with dynamic meta tags such as browser color and title.
 * Tags that are only processed when the page is rendered (such as `charset`, and `http-equiv`)
 * will not work since `$$mdMeta` adds the tags after the page has already been loaded.
 *
 * ```js
 * app.config(function($$mdMetaProvider) {
 *   var removeMeta = $$mdMetaProvider.setMeta('meta-name', 'content');
 *   var metaValue  = $$mdMetaProvider.getMeta('meta-name'); // -> 'content'
 *
 *   removeMeta();
 * });
 *
 * app.controller('myController', function($$mdMeta) {
 *   var removeMeta = $$mdMeta.setMeta('meta-name', 'content');
 *   var metaValue  = $$mdMeta.getMeta('meta-name'); // -> 'content'
 *
 *   removeMeta();
 * });
 * ```
 *
 * @returns {$$mdMeta.$service}
 *
 */
angular.module('material.core.meta', [])
  .provider('$$mdMeta', function () {
    var head = angular.element(document.head);
    var metaElements = {};

    /**
     * Checks if the requested element was written manually and maps it
     *
     * @param {string} name meta tag 'name' attribute value
     * @returns {boolean} returns true if there is an element with the requested name
     */
    function mapExistingElement(name) {
      if (metaElements[name]) {
        return true;
      }

      var element = document.getElementsByName(name)[0];

      if (!element) {
        return false;
      }

      metaElements[name] = angular.element(element);

      return true;
    }

    /**
     * @ngdoc method
     * @name $$mdMeta#setMeta
     *
     * @description
     * Creates meta element with the 'name' and 'content' attributes,
     * if the meta tag is already created than we replace the 'content' value
     *
     * @param {string} name meta tag 'name' attribute value
     * @param {string} content meta tag 'content' attribute value
     * @returns {function} remove function
     *
     */
    function setMeta(name, content) {
      mapExistingElement(name);

      if (!metaElements[name]) {
        var newMeta = angular.element('<meta name="' + name + '" content="' + content + '"/>');
        head.append(newMeta);
        metaElements[name] = newMeta;
      }
      else {
        metaElements[name].attr('content', content);
      }

      return function () {
        metaElements[name].attr('content', '');
        metaElements[name].remove();
        delete metaElements[name];
      };
    }

    /**
     * @ngdoc method
     * @name $$mdMeta#getMeta
     *
     * @description
     * Gets the 'content' attribute value of the wanted meta element
     *
     * @param {string} name meta tag 'name' attribute value
     * @returns {string} content attribute value
     */
    function getMeta(name) {
      if (!mapExistingElement(name)) {
        throw Error('$$mdMeta: could not find a meta tag with the name \'' + name + '\'');
      }

      return metaElements[name].attr('content');
    }

    var module = {
      setMeta: setMeta,
      getMeta: getMeta
    };

    return angular.extend({}, module, {
      $get: function () {
        return module;
      }
    });
  });
})();
(function(){
"use strict";

  /**
   * @ngdoc module
   * @name material.core.componentRegistry
   *
   * @description
   * A component instance registration service.
   * Note: currently this as a private service in the SideNav component.
   */
  ComponentRegistry.$inject = ["$log", "$q"];
  angular.module('material.core')
    .factory('$mdComponentRegistry', ComponentRegistry);

  /*
   * @private
   * @ngdoc factory
   * @name ComponentRegistry
   * @module material.core.componentRegistry
   *
   */
  function ComponentRegistry($log, $q) {

    var self;
    var instances = [];
    var pendings = { };

    return self = {
      /**
       * Used to print an error when an instance for a handle isn't found.
       */
      notFoundError: function(handle, msgContext) {
        $log.error((msgContext || "") + 'No instance found for handle', handle);
      },
      /**
       * Return all registered instances as an array.
       */
      getInstances: function() {
        return instances;
      },

      /**
       * Get a registered instance.
       * @param handle the String handle to look up for a registered instance.
       */
      get: function(handle) {
        if (!isValidID(handle)) return null;

        var i, j, instance;
        for (i = 0, j = instances.length; i < j; i++) {
          instance = instances[i];
          if (instance.$$mdHandle === handle) {
            return instance;
          }
        }
        return null;
      },

      /**
       * Register an instance.
       * @param instance the instance to register
       * @param handle the handle to identify the instance under.
       */
      register: function(instance, handle) {
        if (!handle) return angular.noop;

        instance.$$mdHandle = handle;
        instances.push(instance);
        resolveWhen();

        return deregister;

        /**
         * Remove registration for an instance
         */
        function deregister() {
          var index = instances.indexOf(instance);
          if (index !== -1) {
            instances.splice(index, 1);
          }
        }

        /**
         * Resolve any pending promises for this instance
         */
        function resolveWhen() {
          var dfd = pendings[handle];
          if (dfd) {
            dfd.forEach(function (promise) {
              promise.resolve(instance);
            });
            delete pendings[handle];
          }
        }
      },

      /**
       * Async accessor to registered component instance
       * If not available then a promise is created to notify
       * all listeners when the instance is registered.
       */
      when : function(handle) {
        if (isValidID(handle)) {
          var deferred = $q.defer();
          var instance = self.get(handle);

          if (instance)  {
            deferred.resolve(instance);
          } else {
            if (pendings[handle] === undefined) {
              pendings[handle] = [];
            }
            pendings[handle].push(deferred);
          }

          return deferred.promise;
        }
        return $q.reject("Invalid `md-component-id` value.");
      }

    };

    function isValidID(handle){
      return handle && (handle !== "");
    }

  }

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name $mdButtonInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-button.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the default ripple configuration
   */

  MdButtonInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdButtonInkRipple', MdButtonInkRipple);

  function MdButtonInkRipple($mdInkRipple) {
    return {
      attach: function attachRipple(scope, element, options) {
        options = angular.extend(optionsForElement(element), options);

        return $mdInkRipple.attach(scope, element, options);
      }
    };

    function optionsForElement(element) {
      if (element.hasClass('md-icon-button')) {
        return {
          isMenuItem: element.hasClass('md-menu-item'),
          fitRipple: true,
          center: true
        };
      } else {
        return {
          isMenuItem: element.hasClass('md-menu-item'),
          dimBackground: true
        };
      }
    }
  }
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

    /**
   * @ngdoc service
   * @name $mdCheckboxInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-checkbox.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the defaultripple configuration
   */

  MdCheckboxInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdCheckboxInkRipple', MdCheckboxInkRipple);

  function MdCheckboxInkRipple($mdInkRipple) {
    return {
      attach: attach
    };

    function attach(scope, element, options) {
      return $mdInkRipple.attach(scope, element, angular.extend({
        center: true,
        dimBackground: false,
        fitRipple: true
      }, options));
    }
  }
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name $mdListInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-list.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the defaultripple configuration
   */

  MdListInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdListInkRipple', MdListInkRipple);

  function MdListInkRipple($mdInkRipple) {
    return {
      attach: attach
    };

    function attach(scope, element, options) {
      return $mdInkRipple.attach(scope, element, angular.extend({
        center: false,
        dimBackground: true,
        outline: false,
        rippleSize: 'full'
      }, options));
    }
  }
})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.core.ripple
 * @description
 * Ripple
 */
InkRippleCtrl.$inject = ["$scope", "$element", "rippleOptions", "$window", "$timeout", "$mdUtil", "$mdColorUtil"];
InkRippleDirective.$inject = ["$mdButtonInkRipple", "$mdCheckboxInkRipple"];
angular.module('material.core')
    .provider('$mdInkRipple', InkRippleProvider)
    .directive('mdInkRipple', InkRippleDirective)
    .directive('mdNoInk', attrNoDirective)
    .directive('mdNoBar', attrNoDirective)
    .directive('mdNoStretch', attrNoDirective);

var DURATION = 450;

/**
 * @ngdoc directive
 * @name mdInkRipple
 * @module material.core.ripple
 *
 * @description
 * The `md-ink-ripple` directive allows you to specify the ripple color or if a ripple is allowed.
 *
 * @param {string|boolean} md-ink-ripple A color string `#FF0000` or boolean (`false` or `0`) for
 *  preventing ripple
 *
 * @usage
 * ### String values
 * <hljs lang="html">
 *   <ANY md-ink-ripple="#FF0000">
 *     Ripples in red
 *   </ANY>
 *
 *   <ANY md-ink-ripple="false">
 *     Not rippling
 *   </ANY>
 * </hljs>
 *
 * ### Interpolated values
 * <hljs lang="html">
 *   <ANY md-ink-ripple="{{ randomColor() }}">
 *     Ripples with the return value of 'randomColor' function
 *   </ANY>
 *
 *   <ANY md-ink-ripple="{{ canRipple() }}">
 *     Ripples if 'canRipple' function return value is not 'false' or '0'
 *   </ANY>
 * </hljs>
 */
function InkRippleDirective ($mdButtonInkRipple, $mdCheckboxInkRipple) {
  return {
    controller: angular.noop,
    link:       function (scope, element, attr) {
      attr.hasOwnProperty('mdInkRippleCheckbox')
          ? $mdCheckboxInkRipple.attach(scope, element)
          : $mdButtonInkRipple.attach(scope, element);
    }
  };
}

/**
 * @ngdoc service
 * @name $mdInkRipple
 * @module material.core.ripple
 *
 * @description
 * `$mdInkRipple` is a service for adding ripples to any element.
 *
 * @usage
 * <hljs lang="js">
 * app.factory('$myElementInkRipple', function($mdInkRipple) {
 *   return {
 *     attach: function (scope, element, options) {
 *       return $mdInkRipple.attach(scope, element, angular.extend({
 *         center: false,
 *         dimBackground: true
 *       }, options));
 *     }
 *   };
 * });
 *
 * app.controller('myController', function ($scope, $element, $myElementInkRipple) {
 *   $scope.onClick = function (ev) {
 *     $myElementInkRipple.attach($scope, angular.element(ev.target), { center: true });
 *   }
 * });
 * </hljs>
 */

/**
 * @ngdoc service
 * @name $mdInkRippleProvider
 * @module material.core.ripple
 *
 * @description
  * If you want to disable ink ripples globally, for all components, you can call the
 * `disableInkRipple` method in your app's config.
 *
 *
 * @usage
 * <hljs lang="js">
 * app.config(function ($mdInkRippleProvider) {
 *   $mdInkRippleProvider.disableInkRipple();
 * });
 * </hljs>
 */

function InkRippleProvider () {
  var isDisabledGlobally = false;

  return {
    disableInkRipple: disableInkRipple,
    $get: ["$injector", function($injector) {
      return { attach: attach };

      /**
       * @ngdoc method
       * @name $mdInkRipple#attach
       *
       * @description
       * Attaching given scope, element and options to inkRipple controller
       *
       * @param {object=} scope Scope within the current context
       * @param {object=} element The element the ripple effect should be applied to
       * @param {object=} options (Optional) Configuration options to override the defaultRipple configuration
       * * `center` -  Whether the ripple should start from the center of the container element
       * * `dimBackground` - Whether the background should be dimmed with the ripple color
       * * `colorElement` - The element the ripple should take its color from, defined by css property `color`
       * * `fitRipple` - Whether the ripple should fill the element
       */
      function attach (scope, element, options) {
        if (isDisabledGlobally || element.controller('mdNoInk')) return angular.noop;
        return $injector.instantiate(InkRippleCtrl, {
          $scope:        scope,
          $element:      element,
          rippleOptions: options
        });
      }
    }]
  };

  /**
   * @ngdoc method
   * @name $mdInkRippleProvider#disableInkRipple
   *
   * @description
   * A config-time method that, when called, disables ripples globally.
   */
  function disableInkRipple () {
    isDisabledGlobally = true;
  }
}

/**
 * Controller used by the ripple service in order to apply ripples
 * @ngInject
 */
function InkRippleCtrl ($scope, $element, rippleOptions, $window, $timeout, $mdUtil, $mdColorUtil) {
  this.$window    = $window;
  this.$timeout   = $timeout;
  this.$mdUtil    = $mdUtil;
  this.$mdColorUtil    = $mdColorUtil;
  this.$scope     = $scope;
  this.$element   = $element;
  this.options    = rippleOptions;
  this.mousedown  = false;
  this.ripples    = [];
  this.timeout    = null; // Stores a reference to the most-recent ripple timeout
  this.lastRipple = null;

  $mdUtil.valueOnUse(this, 'container', this.createContainer);

  this.$element.addClass('md-ink-ripple');

  // attach method for unit tests
  ($element.controller('mdInkRipple') || {}).createRipple = angular.bind(this, this.createRipple);
  ($element.controller('mdInkRipple') || {}).setColor = angular.bind(this, this.color);

  this.bindEvents();
}


/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup or mouseleave event)
 */
function autoCleanup (self, cleanupFn) {
  if (self.mousedown || self.lastRipple) {
    self.mousedown = false;
    self.$mdUtil.nextTick(angular.bind(self, cleanupFn), false);
  }
}


/**
 * Returns the color that the ripple should be (either based on CSS or hard-coded)
 * @returns {string}
 */
InkRippleCtrl.prototype.color = function (value) {
  var self = this;

  // If assigning a color value, apply it to background and the ripple color
  if (angular.isDefined(value)) {
    self._color = self._parseColor(value);
  }

  // If color lookup, use assigned, defined, or inherited
  return self._color || self._parseColor(self.inkRipple()) || self._parseColor(getElementColor());

  /**
   * Finds the color element and returns its text color for use as default ripple color
   * @returns {string}
   */
  function getElementColor () {
    var items = self.options && self.options.colorElement ? self.options.colorElement : [];
    var elem =  items.length ? items[ 0 ] : self.$element[ 0 ];

    return elem ? self.$window.getComputedStyle(elem).color : 'rgb(0,0,0)';
  }
};

/**
 * Updating the ripple colors based on the current inkRipple value
 * or the element's computed style color
 */
InkRippleCtrl.prototype.calculateColor = function () {
  return this.color();
};


/**
 * Takes a string color and converts it to RGBA format
 * @param {string} color
 * @param {number} multiplier
 * @returns {string}
 */
InkRippleCtrl.prototype._parseColor = function parseColor (color, multiplier) {
  multiplier = multiplier || 1;
  var colorUtil = this.$mdColorUtil;

  if (!color) return;
  if (color.indexOf('rgba') === 0) return color.replace(/\d?\.?\d*\s*\)\s*$/, (0.1 * multiplier).toString() + ')');
  if (color.indexOf('rgb') === 0) return colorUtil.rgbToRgba(color);
  if (color.indexOf('#') === 0) return colorUtil.hexToRgba(color);

};

/**
 * Binds events to the root element for
 */
InkRippleCtrl.prototype.bindEvents = function () {
  this.$element.on('mousedown', angular.bind(this, this.handleMousedown));
  this.$element.on('mouseup touchend', angular.bind(this, this.handleMouseup));
  this.$element.on('mouseleave', angular.bind(this, this.handleMouseup));
  this.$element.on('touchmove', angular.bind(this, this.handleTouchmove));
};

/**
 * Create a new ripple on every mousedown event from the root element
 * @param event {MouseEvent}
 */
InkRippleCtrl.prototype.handleMousedown = function (event) {
  if (this.mousedown) return;

  // When jQuery is loaded, we have to get the original event
  if (event.hasOwnProperty('originalEvent')) event = event.originalEvent;
  this.mousedown = true;
  if (this.options.center) {
    this.createRipple(this.container.prop('clientWidth') / 2, this.container.prop('clientWidth') / 2);
  } else {

    // We need to calculate the relative coordinates if the target is a sublayer of the ripple element
    if (event.srcElement !== this.$element[0]) {
      var layerRect = this.$element[0].getBoundingClientRect();
      var layerX = event.clientX - layerRect.left;
      var layerY = event.clientY - layerRect.top;

      this.createRipple(layerX, layerY);
    } else {
      this.createRipple(event.offsetX, event.offsetY);
    }
  }
};

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup, touchend or mouseleave event)
 */
InkRippleCtrl.prototype.handleMouseup = function () {
  this.$timeout(function () {
    autoCleanup(this, this.clearRipples);
  }.bind(this));
};

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (by
 * touchmove)
 */
InkRippleCtrl.prototype.handleTouchmove = function () {
  autoCleanup(this, this.deleteRipples);
};

/**
 * Cycles through all ripples and attempts to remove them.
 */
InkRippleCtrl.prototype.deleteRipples = function () {
  for (var i = 0; i < this.ripples.length; i++) {
    this.ripples[ i ].remove();
  }
};

/**
 * Cycles through all ripples and attempts to remove them with fade.
 * Depending on logic within `fadeInComplete`, some removals will be postponed.
 */
InkRippleCtrl.prototype.clearRipples = function () {
  for (var i = 0; i < this.ripples.length; i++) {
    this.fadeInComplete(this.ripples[ i ]);
  }
};

/**
 * Creates the ripple container element
 * @returns {*}
 */
InkRippleCtrl.prototype.createContainer = function () {
  var container = angular.element('<div class="md-ripple-container"></div>');
  this.$element.append(container);
  return container;
};

InkRippleCtrl.prototype.clearTimeout = function () {
  if (this.timeout) {
    this.$timeout.cancel(this.timeout);
    this.timeout = null;
  }
};

InkRippleCtrl.prototype.isRippleAllowed = function () {
  var element = this.$element[0];
  do {
    if (!element.tagName || element.tagName === 'BODY') break;

    if (element && angular.isFunction(element.hasAttribute)) {
      if (element.hasAttribute('disabled')) return false;
      if (this.inkRipple() === 'false' || this.inkRipple() === '0') return false;
    }

  } while (element = element.parentNode);
  return true;
};

/**
 * The attribute `md-ink-ripple` may be a static or interpolated
 * color value OR a boolean indicator (used to disable ripples)
 */
InkRippleCtrl.prototype.inkRipple = function () {
  return this.$element.attr('md-ink-ripple');
};

/**
 * Creates a new ripple and adds it to the container.  Also tracks ripple in `this.ripples`.
 * @param left
 * @param top
 */
InkRippleCtrl.prototype.createRipple = function (left, top) {
  if (!this.isRippleAllowed()) return;

  var ctrl        = this;
  var colorUtil   = ctrl.$mdColorUtil;
  var ripple      = angular.element('<div class="md-ripple"></div>');
  var width       = this.$element.prop('clientWidth');
  var height      = this.$element.prop('clientHeight');
  var x           = Math.max(Math.abs(width - left), left) * 2;
  var y           = Math.max(Math.abs(height - top), top) * 2;
  var size        = getSize(this.options.fitRipple, x, y);
  var color       = this.calculateColor();

  ripple.css({
    left:            left + 'px',
    top:             top + 'px',
    background:      'black',
    width:           size + 'px',
    height:          size + 'px',
    backgroundColor: colorUtil.rgbaToRgb(color),
    borderColor:     colorUtil.rgbaToRgb(color)
  });
  this.lastRipple = ripple;

  // we only want one timeout to be running at a time
  this.clearTimeout();
  this.timeout    = this.$timeout(function () {
    ctrl.clearTimeout();
    if (!ctrl.mousedown) ctrl.fadeInComplete(ripple);
  }, DURATION * 0.35, false);

  if (this.options.dimBackground) this.container.css({ backgroundColor: color });
  this.container.append(ripple);
  this.ripples.push(ripple);
  ripple.addClass('md-ripple-placed');

  this.$mdUtil.nextTick(function () {

    ripple.addClass('md-ripple-scaled md-ripple-active');
    ctrl.$timeout(function () {
      ctrl.clearRipples();
    }, DURATION, false);

  }, false);

  function getSize (fit, x, y) {
    return fit
        ? Math.max(x, y)
        : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }
};



/**
 * After fadeIn finishes, either kicks off the fade-out animation or queues the element for removal on mouseup
 * @param ripple
 */
InkRippleCtrl.prototype.fadeInComplete = function (ripple) {
  if (this.lastRipple === ripple) {
    if (!this.timeout && !this.mousedown) {
      this.removeRipple(ripple);
    }
  } else {
    this.removeRipple(ripple);
  }
};

/**
 * Kicks off the animation for removing a ripple
 * @param ripple {Element}
 */
InkRippleCtrl.prototype.removeRipple = function (ripple) {
  var ctrl  = this;
  var index = this.ripples.indexOf(ripple);
  if (index < 0) return;
  this.ripples.splice(this.ripples.indexOf(ripple), 1);
  ripple.removeClass('md-ripple-active');
  ripple.addClass('md-ripple-remove');
  if (this.ripples.length === 0) this.container.css({ backgroundColor: '' });
  // use a 2-second timeout in order to allow for the animation to finish
  // we don't actually care how long the animation takes
  this.$timeout(function () {
    ctrl.fadeOutComplete(ripple);
  }, DURATION, false);
};

/**
 * Removes the provided ripple from the DOM
 * @param ripple
 */
InkRippleCtrl.prototype.fadeOutComplete = function (ripple) {
  ripple.remove();
  this.lastRipple = null;
};

/**
 * Used to create an empty directive.  This is used to track flag-directives whose children may have
 * functionality based on them.
 *
 * Example: `md-no-ink` will potentially be used by all child directives.
 */
function attrNoDirective () {
  return { controller: angular.noop };
}

})();
(function(){
"use strict";

(function() {
  'use strict';

    /**
   * @ngdoc service
   * @name $mdTabInkRipple
   * @module material.core
   *
   * @description
   * Provides ripple effects for md-tabs.  See $mdInkRipple service for all possible configuration options.
   *
   * @param {object=} scope Scope within the current context
   * @param {object=} element The element the ripple effect should be applied to
   * @param {object=} options (Optional) Configuration options to override the defaultripple configuration
   */

  MdTabInkRipple.$inject = ["$mdInkRipple"];
  angular.module('material.core')
    .factory('$mdTabInkRipple', MdTabInkRipple);

  function MdTabInkRipple($mdInkRipple) {
    return {
      attach: attach
    };

    function attach(scope, element, options) {
      return $mdInkRipple.attach(scope, element, angular.extend({
        center: false,
        dimBackground: true,
        outline: false,
        rippleSize: 'full'
      }, options));
    }
  }
})();

})();
(function(){
"use strict";

angular.module('material.core.theming.palette', [])
.constant('$mdColorPalette', {
  'red': {
    '50': '#ffebee',
    '100': '#ffcdd2',
    '200': '#ef9a9a',
    '300': '#e57373',
    '400': '#ef5350',
    '500': '#f44336',
    '600': '#e53935',
    '700': '#d32f2f',
    '800': '#c62828',
    '900': '#b71c1c',
    'A100': '#ff8a80',
    'A200': '#ff5252',
    'A400': '#ff1744',
    'A700': '#d50000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 A100',
    'contrastStrongLightColors': '400 500 600 700 A200 A400 A700'
  },
  'pink': {
    '50': '#fce4ec',
    '100': '#f8bbd0',
    '200': '#f48fb1',
    '300': '#f06292',
    '400': '#ec407a',
    '500': '#e91e63',
    '600': '#d81b60',
    '700': '#c2185b',
    '800': '#ad1457',
    '900': '#880e4f',
    'A100': '#ff80ab',
    'A200': '#ff4081',
    'A400': '#f50057',
    'A700': '#c51162',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '500 600 A200 A400 A700'
  },
  'purple': {
    '50': '#f3e5f5',
    '100': '#e1bee7',
    '200': '#ce93d8',
    '300': '#ba68c8',
    '400': '#ab47bc',
    '500': '#9c27b0',
    '600': '#8e24aa',
    '700': '#7b1fa2',
    '800': '#6a1b9a',
    '900': '#4a148c',
    'A100': '#ea80fc',
    'A200': '#e040fb',
    'A400': '#d500f9',
    'A700': '#aa00ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200 A400 A700'
  },
  'deep-purple': {
    '50': '#ede7f6',
    '100': '#d1c4e9',
    '200': '#b39ddb',
    '300': '#9575cd',
    '400': '#7e57c2',
    '500': '#673ab7',
    '600': '#5e35b1',
    '700': '#512da8',
    '800': '#4527a0',
    '900': '#311b92',
    'A100': '#b388ff',
    'A200': '#7c4dff',
    'A400': '#651fff',
    'A700': '#6200ea',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200'
  },
  'indigo': {
    '50': '#e8eaf6',
    '100': '#c5cae9',
    '200': '#9fa8da',
    '300': '#7986cb',
    '400': '#5c6bc0',
    '500': '#3f51b5',
    '600': '#3949ab',
    '700': '#303f9f',
    '800': '#283593',
    '900': '#1a237e',
    'A100': '#8c9eff',
    'A200': '#536dfe',
    'A400': '#3d5afe',
    'A700': '#304ffe',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200 A400'
  },
  'blue': {
    '50': '#e3f2fd',
    '100': '#bbdefb',
    '200': '#90caf9',
    '300': '#64b5f6',
    '400': '#42a5f5',
    '500': '#2196f3',
    '600': '#1e88e5',
    '700': '#1976d2',
    '800': '#1565c0',
    '900': '#0d47a1',
    'A100': '#82b1ff',
    'A200': '#448aff',
    'A400': '#2979ff',
    'A700': '#2962ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100',
    'contrastStrongLightColors': '500 600 700 A200 A400 A700'
  },
  'light-blue': {
    '50': '#e1f5fe',
    '100': '#b3e5fc',
    '200': '#81d4fa',
    '300': '#4fc3f7',
    '400': '#29b6f6',
    '500': '#03a9f4',
    '600': '#039be5',
    '700': '#0288d1',
    '800': '#0277bd',
    '900': '#01579b',
    'A100': '#80d8ff',
    'A200': '#40c4ff',
    'A400': '#00b0ff',
    'A700': '#0091ea',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '600 700 800 900 A700',
    'contrastStrongLightColors': '600 700 800 A700'
  },
  'cyan': {
    '50': '#e0f7fa',
    '100': '#b2ebf2',
    '200': '#80deea',
    '300': '#4dd0e1',
    '400': '#26c6da',
    '500': '#00bcd4',
    '600': '#00acc1',
    '700': '#0097a7',
    '800': '#00838f',
    '900': '#006064',
    'A100': '#84ffff',
    'A200': '#18ffff',
    'A400': '#00e5ff',
    'A700': '#00b8d4',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '700 800 900',
    'contrastStrongLightColors': '700 800 900'
  },
  'teal': {
    '50': '#e0f2f1',
    '100': '#b2dfdb',
    '200': '#80cbc4',
    '300': '#4db6ac',
    '400': '#26a69a',
    '500': '#009688',
    '600': '#00897b',
    '700': '#00796b',
    '800': '#00695c',
    '900': '#004d40',
    'A100': '#a7ffeb',
    'A200': '#64ffda',
    'A400': '#1de9b6',
    'A700': '#00bfa5',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700'
  },
  'green': {
    '50': '#e8f5e9',
    '100': '#c8e6c9',
    '200': '#a5d6a7',
    '300': '#81c784',
    '400': '#66bb6a',
    '500': '#4caf50',
    '600': '#43a047',
    '700': '#388e3c',
    '800': '#2e7d32',
    '900': '#1b5e20',
    'A100': '#b9f6ca',
    'A200': '#69f0ae',
    'A400': '#00e676',
    'A700': '#00c853',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700'
  },
  'light-green': {
    '50': '#f1f8e9',
    '100': '#dcedc8',
    '200': '#c5e1a5',
    '300': '#aed581',
    '400': '#9ccc65',
    '500': '#8bc34a',
    '600': '#7cb342',
    '700': '#689f38',
    '800': '#558b2f',
    '900': '#33691e',
    'A100': '#ccff90',
    'A200': '#b2ff59',
    'A400': '#76ff03',
    'A700': '#64dd17',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '700 800 900',
    'contrastStrongLightColors': '700 800 900'
  },
  'lime': {
    '50': '#f9fbe7',
    '100': '#f0f4c3',
    '200': '#e6ee9c',
    '300': '#dce775',
    '400': '#d4e157',
    '500': '#cddc39',
    '600': '#c0ca33',
    '700': '#afb42b',
    '800': '#9e9d24',
    '900': '#827717',
    'A100': '#f4ff81',
    'A200': '#eeff41',
    'A400': '#c6ff00',
    'A700': '#aeea00',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '900',
    'contrastStrongLightColors': '900'
  },
  'yellow': {
    '50': '#fffde7',
    '100': '#fff9c4',
    '200': '#fff59d',
    '300': '#fff176',
    '400': '#ffee58',
    '500': '#ffeb3b',
    '600': '#fdd835',
    '700': '#fbc02d',
    '800': '#f9a825',
    '900': '#f57f17',
    'A100': '#ffff8d',
    'A200': '#ffff00',
    'A400': '#ffea00',
    'A700': '#ffd600',
    'contrastDefaultColor': 'dark'
  },
  'amber': {
    '50': '#fff8e1',
    '100': '#ffecb3',
    '200': '#ffe082',
    '300': '#ffd54f',
    '400': '#ffca28',
    '500': '#ffc107',
    '600': '#ffb300',
    '700': '#ffa000',
    '800': '#ff8f00',
    '900': '#ff6f00',
    'A100': '#ffe57f',
    'A200': '#ffd740',
    'A400': '#ffc400',
    'A700': '#ffab00',
    'contrastDefaultColor': 'dark'
  },
  'orange': {
    '50': '#fff3e0',
    '100': '#ffe0b2',
    '200': '#ffcc80',
    '300': '#ffb74d',
    '400': '#ffa726',
    '500': '#ff9800',
    '600': '#fb8c00',
    '700': '#f57c00',
    '800': '#ef6c00',
    '900': '#e65100',
    'A100': '#ffd180',
    'A200': '#ffab40',
    'A400': '#ff9100',
    'A700': '#ff6d00',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '800 900',
    'contrastStrongLightColors': '800 900'
  },
  'deep-orange': {
    '50': '#fbe9e7',
    '100': '#ffccbc',
    '200': '#ffab91',
    '300': '#ff8a65',
    '400': '#ff7043',
    '500': '#ff5722',
    '600': '#f4511e',
    '700': '#e64a19',
    '800': '#d84315',
    '900': '#bf360c',
    'A100': '#ff9e80',
    'A200': '#ff6e40',
    'A400': '#ff3d00',
    'A700': '#dd2c00',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100 A200',
    'contrastStrongLightColors': '500 600 700 800 900 A400 A700'
  },
  'brown': {
    '50': '#efebe9',
    '100': '#d7ccc8',
    '200': '#bcaaa4',
    '300': '#a1887f',
    '400': '#8d6e63',
    '500': '#795548',
    '600': '#6d4c41',
    '700': '#5d4037',
    '800': '#4e342e',
    '900': '#3e2723',
    'A100': '#d7ccc8',
    'A200': '#bcaaa4',
    'A400': '#8d6e63',
    'A700': '#5d4037',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100 A200',
    'contrastStrongLightColors': '300 400'
  },
  'grey': {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    'A100': '#ffffff',
    'A200': '#000000',
    'A400': '#303030',
    'A700': '#616161',
    'contrastDefaultColor': 'dark',
    'contrastLightColors': '600 700 800 900 A200 A400 A700'
  },
  'blue-grey': {
    '50': '#eceff1',
    '100': '#cfd8dc',
    '200': '#b0bec5',
    '300': '#90a4ae',
    '400': '#78909c',
    '500': '#607d8b',
    '600': '#546e7a',
    '700': '#455a64',
    '800': '#37474f',
    '900': '#263238',
    'A100': '#cfd8dc',
    'A200': '#b0bec5',
    'A400': '#78909c',
    'A700': '#455a64',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 A100 A200',
    'contrastStrongLightColors': '400 500 700'
  }
});

})();
(function(){
"use strict";

(function(angular) {
  'use strict';
/**
 * @ngdoc module
 * @name material.core.theming
 * @description
 * Theming
 */
detectDisabledThemes.$inject = ["$mdThemingProvider"];
ThemingDirective.$inject = ["$mdTheming", "$interpolate", "$parse", "$mdUtil", "$q", "$log"];
ThemableDirective.$inject = ["$mdTheming"];
ThemingProvider.$inject = ["$mdColorPalette", "$$mdMetaProvider"];
generateAllThemes.$inject = ["$injector", "$mdTheming"];
angular.module('material.core.theming', ['material.core.theming.palette', 'material.core.meta'])
  .directive('mdTheme', ThemingDirective)
  .directive('mdThemable', ThemableDirective)
  .directive('mdThemesDisabled', disableThemesDirective)
  .provider('$mdTheming', ThemingProvider)
  .config(detectDisabledThemes)
  .run(generateAllThemes);

/**
 * Detect if the HTML or the BODY tags has a [md-themes-disabled] attribute
 * If yes, then immediately disable all theme stylesheet generation and DOM injection
 */
/**
 * @ngInject
 */
function detectDisabledThemes($mdThemingProvider) {
  var isDisabled = !!document.querySelector('[md-themes-disabled]');
  $mdThemingProvider.disableTheming(isDisabled);
}

/**
 * @ngdoc service
 * @name $mdThemingProvider
 * @module material.core.theming
 *
 * @description Provider to configure the `$mdTheming` service.
 *
 * ### Default Theme
 * The `$mdThemingProvider` uses by default the following theme configuration:
 *
 * - Primary Palette: `Blue`
 * - Accent Palette: `Pink`
 * - Warn Palette: `Deep-Orange`
 * - Background Palette: `Grey`
 *
 * If you don't want to use the `md-theme` directive on the elements itself, you may want to overwrite
 * the default theme.<br/>
 * This can be done by using the following markup.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     $mdThemingProvider
 *       .theme('default')
 *       .primaryPalette('blue')
 *       .accentPalette('teal')
 *       .warnPalette('red')
 *       .backgroundPalette('grey');
 *   });
 * </hljs>
 *

 * ### Dynamic Themes
 *
 * By default, if you change a theme at runtime, the `$mdTheming` service will not detect those changes.<br/>
 * If you have an application, which changes its theme on runtime, you have to enable theme watching.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Enable theme watching.
 *     $mdThemingProvider.alwaysWatchTheme(true);
 *   });
 * </hljs>
 *
 * ### Custom Theme Styles
 *
 * Sometimes you may want to use your own theme styles for some custom components.<br/>
 * You are able to register your own styles by using the following markup.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Register our custom stylesheet into the theming provider.
 *     $mdThemingProvider.registerStyles(STYLESHEET);
 *   });
 * </hljs>
 *
 * The `registerStyles` method only accepts strings as value, so you're actually not able to load an external
 * stylesheet file into the `$mdThemingProvider`.
 *
 * If it's necessary to load an external stylesheet, we suggest using a bundler, which supports including raw content,
 * like [raw-loader](https://github.com/webpack/raw-loader) for `webpack`.
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Register your custom stylesheet into the theming provider.
 *     $mdThemingProvider.registerStyles(require('../styles/my-component.theme.css'));
 *   });
 * </hljs>
 *
 * ### Browser color
 *
 * Enables browser header coloring
 * for more info please visit:
 * https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/theme-color
 *
 * Options parameter: <br/>
 * `theme`   - A defined theme via `$mdThemeProvider` to use the palettes from. Default is `default` theme. <br/>
 * `palette` - Can be any one of the basic material design palettes, extended defined palettes and 'primary',
 *             'accent', 'background' and 'warn'. Default is `primary`. <br/>
 * `hue`     - The hue from the selected palette. Default is `800`<br/>
 *
 * <hljs lang="js">
 *   myAppModule.config(function($mdThemingProvider) {
 *     // Enable browser color
 *     $mdThemingProvider.enableBrowserColor({
 *       theme: 'myTheme', // Default is 'default'
 *       palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
 *       hue: '200' // Default is '800'
 *     });
 *   });
 * </hljs>
 */

/**
 * Some Example Valid Theming Expressions
 * =======================================
 *
 * Intention group expansion: (valid for primary, accent, warn, background)
 *
 * {{primary-100}} - grab shade 100 from the primary palette
 * {{primary-100-0.7}} - grab shade 100, apply opacity of 0.7
 * {{primary-100-contrast}} - grab shade 100's contrast color
 * {{primary-hue-1}} - grab the shade assigned to hue-1 from the primary palette
 * {{primary-hue-1-0.7}} - apply 0.7 opacity to primary-hue-1
 * {{primary-color}} - Generates .md-hue-1, .md-hue-2, .md-hue-3 with configured shades set for each hue
 * {{primary-color-0.7}} - Apply 0.7 opacity to each of the above rules
 * {{primary-contrast}} - Generates .md-hue-1, .md-hue-2, .md-hue-3 with configured contrast (ie. text) color shades set for each hue
 * {{primary-contrast-0.7}} - Apply 0.7 opacity to each of the above rules
 *
 * Foreground expansion: Applies rgba to black/white foreground text
 *
 * {{foreground-1}} - used for primary text
 * {{foreground-2}} - used for secondary text/divider
 * {{foreground-3}} - used for disabled text
 * {{foreground-4}} - used for dividers
 */

// In memory generated CSS rules; registered by theme.name
var GENERATED = { };

// In memory storage of defined themes and color palettes (both loaded by CSS, and user specified)
var PALETTES;

// Text Colors on light and dark backgrounds
// @see https://material.io/archive/guidelines/style/color.html#color-usability
var DARK_FOREGROUND = {
  name: 'dark',
  '1': 'rgba(0,0,0,0.87)',
  '2': 'rgba(0,0,0,0.54)',
  '3': 'rgba(0,0,0,0.38)',
  '4': 'rgba(0,0,0,0.12)'
};
var LIGHT_FOREGROUND = {
  name: 'light',
  '1': 'rgba(255,255,255,1.0)',
  '2': 'rgba(255,255,255,0.7)',
  '3': 'rgba(255,255,255,0.5)',
  '4': 'rgba(255,255,255,0.12)'
};

var DARK_SHADOW = '1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)';
var LIGHT_SHADOW = '';

var DARK_CONTRAST_COLOR = colorToRgbaArray('rgba(0,0,0,0.87)');
var LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgba(255,255,255,0.87)');
var STRONG_LIGHT_CONTRAST_COLOR = colorToRgbaArray('rgb(255,255,255)');

var THEME_COLOR_TYPES = ['primary', 'accent', 'warn', 'background'];
var DEFAULT_COLOR_TYPE = 'primary';

// A color in a theme will use these hues by default, if not specified by user.
var LIGHT_DEFAULT_HUES = {
  'accent': {
    'default': 'A200',
    'hue-1': 'A100',
    'hue-2': 'A400',
    'hue-3': 'A700'
  },
  'background': {
    'default': '50',
    'hue-1': 'A100',
    'hue-2': '100',
    'hue-3': '300'
  }
};

var DARK_DEFAULT_HUES = {
  'background': {
    'default': 'A400',
    'hue-1': '800',
    'hue-2': '900',
    'hue-3': 'A200'
  }
};
THEME_COLOR_TYPES.forEach(function(colorType) {
  // Color types with unspecified default hues will use these default hue values
  var defaultDefaultHues = {
    'default': '500',
    'hue-1': '300',
    'hue-2': '800',
    'hue-3': 'A100'
  };
  if (!LIGHT_DEFAULT_HUES[colorType]) LIGHT_DEFAULT_HUES[colorType] = defaultDefaultHues;
  if (!DARK_DEFAULT_HUES[colorType]) DARK_DEFAULT_HUES[colorType] = defaultDefaultHues;
});

var VALID_HUE_VALUES = [
  '50', '100', '200', '300', '400', '500', '600',
  '700', '800', '900', 'A100', 'A200', 'A400', 'A700'
];

var themeConfig = {
  disableTheming : false,   // Generate our themes at run time; also disable stylesheet DOM injection
  generateOnDemand : false, // Whether or not themes are to be generated on-demand (vs. eagerly).
  registeredStyles : [],    // Custom styles registered to be used in the theming of custom components.
  nonce : null              // Nonce to be added as an attribute to the generated themes style tags.
};

/**
 *
 */
function ThemingProvider($mdColorPalette, $$mdMetaProvider) {
  ThemingService.$inject = ["$rootScope", "$mdUtil", "$q", "$log"];
  PALETTES = { };
  var THEMES = { };

  var themingProvider;

  var alwaysWatchTheme = false;
  var defaultTheme = 'default';

  // Load JS Defined Palettes
  angular.extend(PALETTES, $mdColorPalette);

  // Default theme defined in core.js

  /**
   * Adds `theme-color` and `msapplication-navbutton-color` meta tags with the color parameter
   * @param {string} color Hex value of the wanted browser color
   * @returns {function} Remove function of the meta tags
   */
  var setBrowserColor = function (color) {
    // Chrome, Firefox OS and Opera
    var removeChrome = $$mdMetaProvider.setMeta('theme-color', color);
    // Windows Phone
    var removeWindows = $$mdMetaProvider.setMeta('msapplication-navbutton-color', color);

    return function () {
      removeChrome();
      removeWindows();
    };
  };

  /**
   * @ngdoc method
   * @name $mdThemingProvider#enableBrowserColor
   * @description
   * Enables browser header coloring. For more info please visit
   * <a href="https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/theme-color">
   *   Web Fundamentals</a>.
   * @param {object=} options Options for the browser color, which include:<br/>
   * - `theme` - `{string}`: A defined theme via `$mdThemeProvider` to use the palettes from. Default is `default` theme. <br/>
   * - `palette` - `{string}`:  Can be any one of the basic material design palettes, extended defined palettes, or `primary`,
   *  `accent`, `background`, and `warn`. Default is `primary`.<br/>
   * - `hue` -  `{string}`: The hue from the selected palette. Default is `800`.<br/>
   * @returns {function} Function that removes the browser coloring when called.
   */
  var enableBrowserColor = function (options) {
    options = angular.isObject(options) ? options : {};

    var theme = options.theme || 'default';
    var hue = options.hue || '800';

    var palette = PALETTES[options.palette] ||
      PALETTES[THEMES[theme].colors[options.palette || 'primary'].name];

    var color = angular.isObject(palette[hue]) ? palette[hue].hex : palette[hue];
    if (color.substr(0, 1) !== '#') color = '#' + color;

    return setBrowserColor(color);
  };

  return themingProvider = {
    definePalette: definePalette,
    extendPalette: extendPalette,
    theme: registerTheme,

    /**
     * return a read-only clone of the current theme configuration
     */
    configuration : function() {
      return angular.extend({ }, themeConfig, {
        defaultTheme : defaultTheme,
        alwaysWatchTheme : alwaysWatchTheme,
        registeredStyles : [].concat(themeConfig.registeredStyles)
      });
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#disableTheming
     * @description
     * An easier way to disable theming without having to use `.constant("$MD_THEME_CSS","");`.
     * This disables all dynamic theme style sheet generations and injections.
     * @param {boolean=} isDisabled Disable all dynamic theme style sheet generations and injections
     *  if `true` or `undefined`.
     */
    disableTheming: function(isDisabled) {
      themeConfig.disableTheming = angular.isUndefined(isDisabled) || !!isDisabled;
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#registerStyles
     * @param {string} styles The styles to be appended to AngularJS Material's built in theme CSS.
     */
    registerStyles: function(styles) {
      themeConfig.registeredStyles.push(styles);
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#setNonce
     * @param {string} nonceValue The nonce to be added as an attribute to the theme style tags.
     * Setting a value allows the use of CSP policy without using the `'unsafe-inline'` directive.
     * The string must already be base64 encoded. You can use `btoa(string)` to do this encoding.
     * In your CSP's `style-src`, you would then add an entry for `'nonce-nonceValue'`.
     */
    setNonce: function(nonceValue) {
      themeConfig.nonce = nonceValue;
    },

    generateThemesOnDemand: function(onDemand) {
      themeConfig.generateOnDemand = onDemand;
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#setDefaultTheme
     * @param {string} theme Default theme name to be applied to elements. Default value is `default`.
     */
    setDefaultTheme: function(theme) {
      defaultTheme = theme;
    },

    /**
     * @ngdoc method
     * @name $mdThemingProvider#alwaysWatchTheme
     * @param {boolean} alwaysWatch Whether or not to always watch themes for changes and re-apply
     * classes when they change. Default is `false`. Enabling can reduce performance.
     */
    alwaysWatchTheme: function(alwaysWatch) {
      alwaysWatchTheme = alwaysWatch;
    },

    enableBrowserColor: enableBrowserColor,

    $get: ThemingService,
    _LIGHT_DEFAULT_HUES: LIGHT_DEFAULT_HUES,
    _DARK_DEFAULT_HUES: DARK_DEFAULT_HUES,
    _PALETTES: PALETTES,
    _THEMES: THEMES,
    _parseRules: parseRules,
    _rgba: rgba
  };

  /**
   * @ngdoc method
   * @name $mdThemingProvider#definePalette
   * @description
   * In the event that you need to define a custom color palette, you can use this function to
   * make it available to your theme for use in its intention groups.<br>
   * Note that you must specify all hues in the definition map.
   * @param {string} name Name of palette being defined
   * @param {object} map Palette definition that includes hue definitions and contrast colors:
   * - `'50'` - `{string}`: HEX color
   * - `'100'` - `{string}`: HEX color
   * - `'200'` - `{string}`: HEX color
   * - `'300'` - `{string}`: HEX color
   * - `'400'` - `{string}`: HEX color
   * - `'500'` - `{string}`: HEX color
   * - `'600'` - `{string}`: HEX color
   * - `'700'` - `{string}`: HEX color
   * - `'800'` - `{string}`: HEX color
   * - `'900'` - `{string}`: HEX color
   * - `'A100'` - `{string}`: HEX color
   * - `'A200'` - `{string}`: HEX color
   * - `'A400'` - `{string}`: HEX color
   * - `'A700'` - `{string}`: HEX color
   * - `'contrastDefaultColor'` - `{string}`: `light` or `dark`
   * - `'contrastDarkColors'` - `{string[]}`: Hues which should use dark contrast colors (i.e. raised button text).
   *  For example: `['50', '100', '200', '300', '400', 'A100']`.
   * - `'contrastLightColors'` - `{string[]}`: Hues which should use light contrast colors (i.e. raised button text).
   *  For example: `['500', '600', '700', '800', '900', 'A200', 'A400', 'A700']`.
   */
  function definePalette(name, map) {
    map = map || {};
    PALETTES[name] = checkPaletteValid(name, map);
    return themingProvider;
  }

  /**
   * @ngdoc method
   * @name $mdThemingProvider#extendPalette
   * @description
   * Sometimes it is easier to extend an existing color palette and then change a few properties,
   * rather than defining a whole new palette.
   * @param {string} name Name of palette being extended
   * @param {object} map Palette definition that includes optional hue definitions and contrast colors:
   * - `'50'` - `{string}`: HEX color
   * - `'100'` - `{string}`: HEX color
   * - `'200'` - `{string}`: HEX color
   * - `'300'` - `{string}`: HEX color
   * - `'400'` - `{string}`: HEX color
   * - `'500'` - `{string}`: HEX color
   * - `'600'` - `{string}`: HEX color
   * - `'700'` - `{string}`: HEX color
   * - `'800'` - `{string}`: HEX color
   * - `'900'` - `{string}`: HEX color
   * - `'A100'` - `{string}`: HEX color
   * - `'A200'` - `{string}`: HEX color
   * - `'A400'` - `{string}`: HEX color
   * - `'A700'` - `{string}`: HEX color
   * - `'contrastDefaultColor'` - `{string}`: `light` or `dark`
   * - `'contrastDarkColors'` - `{string[]}`: Hues which should use dark contrast colors (i.e. raised button text).
   *  For example: `['50', '100', '200', '300', '400', 'A100']`.
   * - `'contrastLightColors'` - `{string[]}`: Hues which should use light contrast colors (i.e. raised button text).
   *  For example: `['500', '600', '700', '800', '900', 'A200', 'A400', 'A700']`.
   *  @returns {object} A new object which is a copy of the given palette, `name`,
   *    with variables from `map` overwritten.
   */
  function extendPalette(name, map) {
    return checkPaletteValid(name,  angular.extend({}, PALETTES[name] || {}, map));
  }

  // Make sure that palette has all required hues
  function checkPaletteValid(name, map) {
    var missingColors = VALID_HUE_VALUES.filter(function(field) {
      return !map[field];
    });
    if (missingColors.length) {
      throw new Error("Missing colors %1 in palette %2!"
                      .replace('%1', missingColors.join(', '))
                      .replace('%2', name));
    }

    return map;
  }

  /**
   * @ngdoc method
   * @name $mdThemingProvider#theme
   * @description
   * Register a theme (which is a collection of color palettes); i.e. `warn`, `accent`,
   * `background`, and `primary`.<br>
   * Optionally inherit from an existing theme.
   * @param {string} name Name of theme being registered
   * @param {string=} inheritFrom Existing theme name to inherit from
   */
  function registerTheme(name, inheritFrom) {
    if (THEMES[name]) return THEMES[name];

    inheritFrom = inheritFrom || 'default';

    var parentTheme = typeof inheritFrom === 'string' ? THEMES[inheritFrom] : inheritFrom;
    var theme = new Theme(name);

    if (parentTheme) {
      angular.forEach(parentTheme.colors, function(color, colorType) {
        theme.colors[colorType] = {
          name: color.name,
          // Make sure a COPY of the hues is given to the child color,
          // not the same reference.
          hues: angular.extend({}, color.hues)
        };
      });
    }
    THEMES[name] = theme;

    return theme;
  }

  function Theme(name) {
    var self = this;
    self.name = name;
    self.colors = {};

    self.dark = setDark;
    setDark(false);

    function setDark(isDark) {
      isDark = arguments.length === 0 ? true : !!isDark;

      // If no change, abort
      if (isDark === self.isDark) return;

      self.isDark = isDark;

      self.foregroundPalette = self.isDark ? LIGHT_FOREGROUND : DARK_FOREGROUND;
      self.foregroundShadow = self.isDark ? DARK_SHADOW : LIGHT_SHADOW;

      // Light and dark themes have different default hues.
      // Go through each existing color type for this theme, and for every
      // hue value that is still the default hue value from the previous light/dark setting,
      // set it to the default hue value from the new light/dark setting.
      var newDefaultHues = self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES;
      var oldDefaultHues = self.isDark ? LIGHT_DEFAULT_HUES : DARK_DEFAULT_HUES;
      angular.forEach(newDefaultHues, function(newDefaults, colorType) {
        var color = self.colors[colorType];
        var oldDefaults = oldDefaultHues[colorType];
        if (color) {
          for (var hueName in color.hues) {
            if (color.hues[hueName] === oldDefaults[hueName]) {
              color.hues[hueName] = newDefaults[hueName];
            }
          }
        }
      });

      return self;
    }

    THEME_COLOR_TYPES.forEach(function(colorType) {
      var defaultHues = (self.isDark ? DARK_DEFAULT_HUES : LIGHT_DEFAULT_HUES)[colorType];
      self[colorType + 'Palette'] = function setPaletteType(paletteName, hues) {
        var color = self.colors[colorType] = {
          name: paletteName,
          hues: angular.extend({}, defaultHues, hues)
        };

        Object.keys(color.hues).forEach(function(name) {
          if (!defaultHues[name]) {
            throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4"
              .replace('%1', name)
              .replace('%2', self.name)
              .replace('%3', paletteName)
              .replace('%4', Object.keys(defaultHues).join(', '))
            );
          }
        });
        Object.keys(color.hues).map(function(key) {
          return color.hues[key];
        }).forEach(function(hueValue) {
          if (VALID_HUE_VALUES.indexOf(hueValue) == -1) {
            throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5"
              .replace('%1', hueValue)
              .replace('%2', self.name)
              .replace('%3', colorType)
              .replace('%4', paletteName)
              .replace('%5', VALID_HUE_VALUES.join(', '))
            );
          }
        });
        return self;
      };

      self[colorType + 'Color'] = function() {
        var args = Array.prototype.slice.call(arguments);
        // eslint-disable-next-line no-console
        console.warn('$mdThemingProviderTheme.' + colorType + 'Color() has been deprecated. ' +
                     'Use $mdThemingProviderTheme.' + colorType + 'Palette() instead.');
        return self[colorType + 'Palette'].apply(self, args);
      };
    });
  }

  /**
   * @ngdoc service
   * @name $mdTheming
   * @module material.core.theming
   * @description
   * Service that makes an element apply theming related <b>classes</b> to itself.
   *
   * For more information on the hue objects, their default values, as well as valid hue values, please visit <a ng-href="Theming/03_configuring_a_theme#specifying-custom-hues-for-color-intentions">the custom hues section of Configuring a Theme</a>.
   *
   * <hljs lang="js">
   * // Example component directive that we want to apply theming classes to.
   * app.directive('myFancyDirective', function($mdTheming) {
   *   return {
   *     restrict: 'AE',
   *     link: function(scope, element, attrs) {
   *       // Initialize the service using our directive's element
   *       $mdTheming(element);
   *
   *       $mdTheming.defineTheme('myTheme', {
   *         primary: 'blue',
   *         primaryHues: {
   *           default: '500',
   *           hue-1: '300',
   *           hue-2: '900',
   *           hue-3: 'A100'
   *         },
   *         accent: 'pink',
   *         accentHues: {
   *           default: '600',
   *           hue-1: '300',
   *           hue-2: '200',
   *           hue-3: 'A500'
   *         },
   *         warn: 'red',
   *         // It's not necessary to specify all hues in the object.
   *         warnHues: {
   *           default: '200',
   *           hue-3: 'A100'
   *         },
   *         // It's not necessary to specify custom hues at all.
   *         background: 'grey',
   *         dark: true
   *       });
   *       // Your directive's custom code here.
   *     }
   *   };
   * });
   * </hljs>
   * @param {element=} element Element that will have theming classes applied to it.
   */

  /**
   * @ngdoc property
   * @name $mdTheming#THEMES
   * @description
   * Property to get all the themes defined
   * @returns {object} All the themes defined with their properties.
   */

  /**
   * @ngdoc property
   * @name $mdTheming#PALETTES
   * @description
   * Property to get all the palettes defined
   * @returns {object} All the palettes defined with their colors.
   */

  /**
   * @ngdoc method
   * @name $mdTheming#registered
   * @description
   * Determine is specified theme name is a valid, registered theme
   * @param {string} themeName the theme to check if registered
   * @returns {boolean} whether the theme is registered or not
   */

  /**
   * @ngdoc method
   * @name $mdTheming#defaultTheme
   * @description
   * Returns the default theme
   * @returns {string} The default theme
   */

  /**
   * @ngdoc method
   * @name $mdTheming#generateTheme
   * @description
   * Lazy generate themes - by default, every theme is generated when defined.
   * You can disable this in the configuration section using the
   * `$mdThemingProvider.generateThemesOnDemand(true);`
   *
   * The theme name that is passed in must match the name of the theme that was defined as part of
   * the configuration block.
   *
   * @param {string} name theme name to generate
   */

  /**
   * @ngdoc method
   * @name $mdTheming#setBrowserColor
   * @description
   * Enables browser header coloring. For more info please visit
   * <a href="https://developers.google.com/web/fundamentals/design-and-ui/browser-customization/theme-color">
   *   Web Fundamentals</a>.
   * @param {object=} options Options for the browser color, which include:<br/>
   * - `theme` - `{string}`: A defined theme via `$mdThemeProvider` to use the palettes from.
   *    Default is `default` theme. <br/>
   * - `palette` - `{string}`:  Can be any one of the basic material design palettes, extended
   *    defined palettes, or `primary`, `accent`, `background`, and `warn`. Default is `primary`.
   * <br/>
   * - `hue` -  `{string}`: The hue from the selected palette. Default is `800`.<br/>
   * @returns {function} Function that removes the browser coloring when called.
   */

  /**
   * @ngdoc method
   * @name $mdTheming#defineTheme
   * @description
   * Dynamically define a theme by using an options object that contains palette names.
   *
   * @param {string} name Theme name to define
   * @param {object} options Theme definition options
   *
   * Options are:<br/>
   * - `primary` - `{string}`: The name of the primary palette to use in the theme.<br/>
   * - `primaryHues` - `{object=}`: Override hues for primary palette.<br/>
   * - `accent` - `{string}`: The name of the accent palette to use in the theme.<br/>
   * - `accentHues` - `{object=}`: Override hues for accent palette.<br/>
   * - `warn` - `{string}`: The name of the warn palette to use in the theme.<br/>
   * - `warnHues` - `{object=}`: Override hues for warn palette.<br/>
   * - `background` - `{string}`: The name of the background palette to use in the theme.<br/>
   * - `backgroundHues` - `{object=}`: Override hues for background palette.<br/>
   * - `dark` - `{boolean}`: Indicates if it's a dark theme.<br/>
   * @returns {Promise<string>} A resolved promise with the new theme name.
   */

  /* @ngInject */
  function ThemingService($rootScope, $mdUtil, $q, $log) {
    // Allow us to be invoked via a linking function signature.
    var applyTheme = function (scope, el) {
      if (el === undefined) { el = scope; scope = undefined; }
      if (scope === undefined) { scope = $rootScope; }
      applyTheme.inherit(el, el);
    };

    Object.defineProperty(applyTheme, 'THEMES', {
      get: function () {
        return angular.extend({}, THEMES);
      }
    });
    Object.defineProperty(applyTheme, 'PALETTES', {
      get: function () {
        return angular.extend({}, PALETTES);
      }
    });
    Object.defineProperty(applyTheme, 'ALWAYS_WATCH', {
      get: function () {
        return alwaysWatchTheme;
      }
    });
    applyTheme.inherit = inheritTheme;
    applyTheme.registered = registered;
    applyTheme.defaultTheme = function() { return defaultTheme; };
    applyTheme.generateTheme = function(name) { generateTheme(THEMES[name], name, themeConfig.nonce); };
    applyTheme.defineTheme = function(name, options) {
      options = options || {};

      var theme = registerTheme(name);

      if (options.primary) {
        theme.primaryPalette(options.primary, options.primaryHues);
      }
      if (options.accent) {
        theme.accentPalette(options.accent, options.accentHues);
      }
      if (options.warn) {
        theme.warnPalette(options.warn, options.warnHues);
      }
      if (options.background) {
        theme.backgroundPalette(options.background, options.backgroundHues);
      }
      if (options.dark){
        theme.dark();
      }

      this.generateTheme(name);

      return $q.resolve(name);
    };
    applyTheme.setBrowserColor = enableBrowserColor;

    return applyTheme;

    /**
     * Determine is specified theme name is a valid, registered theme
     */
    function registered(themeName) {
      if (themeName === undefined || themeName === '') return true;
      return applyTheme.THEMES[themeName] !== undefined;
    }

    /**
     * Get theme name for the element, then update with Theme CSS class
     */
    function inheritTheme (el, parent) {
      var ctrl = parent.controller('mdTheme') || el.data('$mdThemeController');
      var scope = el.scope();

      updateThemeClass(lookupThemeName());

      if (ctrl) {
        var watchTheme = alwaysWatchTheme ||
                         ctrl.$shouldWatch ||
                         $mdUtil.parseAttributeBoolean(el.attr('md-theme-watch'));

        if (watchTheme || ctrl.isAsyncTheme) {
          var clearNameWatcher = function () {
            if (unwatch) {
              unwatch();
              unwatch = undefined;
            }
          };

          var unwatch = ctrl.registerChanges(function(name) {
            updateThemeClass(name);

            if (!watchTheme) {
              clearNameWatcher();
            }
          });

          if (scope) {
            scope.$on('$destroy', clearNameWatcher);
          } else {
            el.on('$destroy', clearNameWatcher);
          }
        }
      }

      /**
       * Find the theme name from the parent controller or element data
       */
      function lookupThemeName() {
        // As a few components (dialog) add their controllers later, we should also watch for a controller init.
        return ctrl && ctrl.$mdTheme || (defaultTheme === 'default' ? '' : defaultTheme);
      }

      /**
       * Remove old theme class and apply a new one
       * NOTE: if not a valid theme name, then the current name is not changed
       */
      function updateThemeClass(theme) {
        if (!theme) return;
        if (!registered(theme)) {
          $log.warn('Attempted to use unregistered theme \'' + theme + '\'. ' +
                    'Register it with $mdThemingProvider.theme().');
        }

        var oldTheme = el.data('$mdThemeName');
        if (oldTheme) el.removeClass('md-' + oldTheme +'-theme');
        el.addClass('md-' + theme + '-theme');
        el.data('$mdThemeName', theme);
        if (ctrl) {
          el.data('$mdThemeController', ctrl);
        }
      }
    }

  }
}

function ThemingDirective($mdTheming, $interpolate, $parse, $mdUtil, $q, $log) {
  return {
    priority: 101, // has to be more than 100 to be before interpolation (issue on IE)
    link: {
      pre: function(scope, el, attrs) {
        var registeredCallbacks = [];

        var startSymbol = $interpolate.startSymbol();
        var endSymbol = $interpolate.endSymbol();

        var theme = attrs.mdTheme.trim();

        var hasInterpolation =
          theme.substr(0, startSymbol.length) === startSymbol &&
          theme.lastIndexOf(endSymbol) === theme.length - endSymbol.length;

        var oneTimeOperator = '::';
        var oneTimeBind = attrs.mdTheme
            .split(startSymbol).join('')
            .split(endSymbol).join('')
            .trim()
            .substr(0, oneTimeOperator.length) === oneTimeOperator;

        var getTheme = function () {
          var interpolation = $interpolate(attrs.mdTheme)(scope);
          return $parse(interpolation)(scope) || interpolation;
        };

        var ctrl = {
          isAsyncTheme: angular.isFunction(getTheme()) || angular.isFunction(getTheme().then),
          registerChanges: function (cb, context) {
            if (context) {
              cb = angular.bind(context, cb);
            }

            registeredCallbacks.push(cb);

            return function () {
              var index = registeredCallbacks.indexOf(cb);

              if (index > -1) {
                registeredCallbacks.splice(index, 1);
              }
            };
          },
          $setTheme: function (theme) {
            if (!$mdTheming.registered(theme)) {
              $log.warn('attempted to use unregistered theme \'' + theme + '\'');
            }

            ctrl.$mdTheme = theme;

            // Iterating backwards to support unregistering during iteration
            // http://stackoverflow.com/a/9882349/890293
            // we don't use `reverse()` of array because it mutates the array and we don't want it
            // to get re-indexed
            for (var i = registeredCallbacks.length; i--;) {
              registeredCallbacks[i](theme);
            }
          },
          $shouldWatch: $mdUtil.parseAttributeBoolean(el.attr('md-theme-watch')) ||
                        $mdTheming.ALWAYS_WATCH ||
                        (hasInterpolation && !oneTimeBind)
        };

        el.data('$mdThemeController', ctrl);

        var setParsedTheme = function (theme) {
          if (typeof theme === 'string') {
            return ctrl.$setTheme(theme);
          }

          $q.when(angular.isFunction(theme) ?  theme() : theme)
            .then(function(name) {
              ctrl.$setTheme(name);
            });
        };

        setParsedTheme(getTheme());

        var unwatch = scope.$watch(getTheme, function(theme) {
          if (theme) {
            setParsedTheme(theme);

            if (!ctrl.$shouldWatch) {
              unwatch();
            }
          }
        });
      }
    }
  };
}

/**
 * Special directive that will disable ALL runtime Theme style generation and DOM injection
 *
 * <link rel="stylesheet" href="angular-material.min.css">
 * <link rel="stylesheet" href="angular-material.themes.css">
 *
 * <body md-themes-disabled>
 *  ...
 * </body>
 *
 * Note: Using md-themes-css directive requires the developer to load external
 * theme stylesheets; e.g. custom themes from Material-Tools:
 *
 *       `angular-material.themes.css`
 *
 * Another option is to use the ThemingProvider to configure and disable the attribute
 * conversions; this would obviate the use of the `md-themes-css` directive
 *
 */
function disableThemesDirective() {
  themeConfig.disableTheming = true;

  // Return a 1x-only, first-match attribute directive
  return {
    restrict : 'A',
    priority : '900'
  };
}

function ThemableDirective($mdTheming) {
  return $mdTheming;
}

function parseRules(theme, colorType, rules) {
  checkValidPalette(theme, colorType);

  rules = rules.replace(/THEME_NAME/g, theme.name);
  var themeNameRegex = new RegExp('\\.md-' + theme.name + '-theme', 'g');
  var simpleVariableRegex = /'?"?\{\{\s*([a-zA-Z]+)-(A?\d+|hue-[0-3]|shadow|default)-?(\d\.?\d*)?(contrast)?\s*\}\}'?"?/g;

  // find and replace simple variables where we use a specific hue, not an entire palette
  // eg. "{{primary-100}}"
  // \(' + THEME_COLOR_TYPES.join('\|') + '\)'
  rules = rules.replace(simpleVariableRegex, function(match, colorType, hue, opacity, contrast) {
    if (colorType === 'foreground') {
      if (hue == 'shadow') {
        return theme.foregroundShadow;
      } else {
        return theme.foregroundPalette[hue] || theme.foregroundPalette['1'];
      }
    }

    // `default` is also accepted as a hue-value, because the background palettes are
    // using it as a name for the default hue.
    if (hue.indexOf('hue') === 0 || hue === 'default') {
      hue = theme.colors[colorType].hues[hue];
    }

    return rgba((PALETTES[ theme.colors[colorType].name ][hue] || '')[contrast ? 'contrast' : 'value'], opacity);
  });

  // Matches '{{ primary-color }}', etc
  var hueRegex = new RegExp('(\'|")?{{\\s*([a-zA-Z]+)-(color|contrast)-?(\\d\\.?\\d*)?\\s*}}("|\')?','g');
  var generatedRules = [];

  // For each type, generate rules for each hue (ie. default, md-hue-1, md-hue-2, md-hue-3)
  angular.forEach(['default', 'hue-1', 'hue-2', 'hue-3'], function(hueName) {
    var newRule = rules
      .replace(hueRegex, function(match, _, matchedColorType, hueType, opacity) {
        var color = theme.colors[matchedColorType];
        var palette = PALETTES[color.name];
        var hueValue = color.hues[hueName];
        return rgba(palette[hueValue][hueType === 'color' ? 'value' : 'contrast'], opacity);
      });
    if (hueName !== 'default') {
      newRule = newRule.replace(themeNameRegex, '.md-' + theme.name + '-theme.md-' + hueName);
    }

    // Don't apply a selector rule to the default theme, making it easier to override
    // styles of the base-component
    if (theme.name == 'default') {
      var themeRuleRegex = /((?:\s|>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)\.md-default-theme((?:\s|>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)/g;

      newRule = newRule.replace(themeRuleRegex, function(match, start, end) {
        return match + ', ' + start + end;
      });
    }
    generatedRules.push(newRule);
  });

  return generatedRules;
}

var rulesByType = {};

// Generate our themes at run time given the state of THEMES and PALETTES
function generateAllThemes($injector, $mdTheming) {
  var head = document.head;
  var firstChild = head ? head.firstElementChild : null;
  var themeCss = !themeConfig.disableTheming && $injector.has('$MD_THEME_CSS') ? $injector.get('$MD_THEME_CSS') : '';

  // Append our custom registered styles to the theme stylesheet.
  themeCss += themeConfig.registeredStyles.join('');

  if (!firstChild) return;
  if (themeCss.length === 0) return; // no rules, so no point in running this expensive task

  // Expose contrast colors for palettes to ensure that text is always readable
  angular.forEach(PALETTES, sanitizePalette);

  // MD_THEME_CSS is a string generated by the build process that includes all the themable
  // components as templates

  // Break the CSS into individual rules
  var rules = themeCss
                  .split(/\}(?!(\}|'|"|;))/)
                  .filter(function(rule) { return rule && rule.trim().length; })
                  .map(function(rule) { return rule.trim() + '}'; });

  THEME_COLOR_TYPES.forEach(function(type) {
    rulesByType[type] = '';
  });

  // Sort the rules based on type, allowing us to do color substitution on a per-type basis
  rules.forEach(function(rule) {
    // First: test that if the rule has '.md-accent', it goes into the accent set of rules
    for (var i = 0, type; type = THEME_COLOR_TYPES[i]; i++) {
      if (rule.indexOf('.md-' + type) > -1) {
        return rulesByType[type] += rule;
      }
    }

    // If no eg 'md-accent' class is found, try to just find 'accent' in the rule and guess from
    // there
    for (i = 0; type = THEME_COLOR_TYPES[i]; i++) {
      if (rule.indexOf(type) > -1) {
        return rulesByType[type] += rule;
      }
    }

    // Default to the primary array
    return rulesByType[DEFAULT_COLOR_TYPE] += rule;
  });

  // If themes are being generated on-demand, quit here. The user will later manually
  // call generateTheme to do this on a theme-by-theme basis.
  if (themeConfig.generateOnDemand) return;

  angular.forEach($mdTheming.THEMES, function(theme) {
    if (!GENERATED[theme.name] && !($mdTheming.defaultTheme() !== 'default' && theme.name === 'default')) {
      generateTheme(theme, theme.name, themeConfig.nonce);
    }
  });


  // *************************
  // Internal functions
  // *************************

  // The user specifies a 'default' contrast color as either light or dark,
  // then explicitly lists which hues are the opposite contrast (eg. A100 has dark, A200 has light)
  function sanitizePalette(palette, name) {
    var defaultContrast = palette.contrastDefaultColor;
    var lightColors = palette.contrastLightColors || [];
    var strongLightColors = palette.contrastStrongLightColors || [];
    var darkColors = palette.contrastDarkColors || [];

    // These colors are provided as space-separated lists
    if (typeof lightColors === 'string') lightColors = lightColors.split(' ');
    if (typeof strongLightColors === 'string') strongLightColors = strongLightColors.split(' ');
    if (typeof darkColors === 'string') darkColors = darkColors.split(' ');

    // Cleanup after ourselves
    delete palette.contrastDefaultColor;
    delete palette.contrastLightColors;
    delete palette.contrastStrongLightColors;
    delete palette.contrastDarkColors;

    // Change { 'A100': '#fffeee' } to { 'A100': { value: '#fffeee', contrast:DARK_CONTRAST_COLOR }
    angular.forEach(palette, function(hueValue, hueName) {
      if (angular.isObject(hueValue)) return; // Already converted
      // Map everything to rgb colors
      var rgbValue = colorToRgbaArray(hueValue);
      if (!rgbValue) {
        throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected."
                        .replace('%1', hueValue)
                        .replace('%2', palette.name)
                        .replace('%3', hueName));
      }

      palette[hueName] = {
        hex: palette[hueName],
        value: rgbValue,
        contrast: getContrastColor()
      };
      function getContrastColor() {
        if (defaultContrast === 'light') {
          if (darkColors.indexOf(hueName) > -1) {
            return DARK_CONTRAST_COLOR;
          } else {
            return strongLightColors.indexOf(hueName) > -1 ? STRONG_LIGHT_CONTRAST_COLOR
              : LIGHT_CONTRAST_COLOR;
          }
        } else {
          if (lightColors.indexOf(hueName) > -1) {
            return strongLightColors.indexOf(hueName) > -1 ? STRONG_LIGHT_CONTRAST_COLOR
              : LIGHT_CONTRAST_COLOR;
          } else {
            return DARK_CONTRAST_COLOR;
          }
        }
      }
    });
  }
}

function generateTheme(theme, name, nonce) {
  var head = document.head;
  var firstChild = head ? head.firstElementChild : null;

  if (!GENERATED[name]) {
    // For each theme, use the color palettes specified for
    // `primary`, `warn` and `accent` to generate CSS rules.
    THEME_COLOR_TYPES.forEach(function(colorType) {
      var styleStrings = parseRules(theme, colorType, rulesByType[colorType]);
      while (styleStrings.length) {
        var styleContent = styleStrings.shift();
        if (styleContent) {
          var style = document.createElement('style');
          style.setAttribute('md-theme-style', '');
          if (nonce) {
            style.setAttribute('nonce', nonce);
          }
          style.appendChild(document.createTextNode(styleContent));
          head.insertBefore(style, firstChild);
        }
      }
    });

    GENERATED[theme.name] = true;
  }

}


function checkValidPalette(theme, colorType) {
  // If theme attempts to use a palette that doesnt exist, throw error
  if (!PALETTES[ (theme.colors[colorType] || {}).name ]) {
    throw new Error(
      "You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3"
                    .replace('%1', theme.name)
                    .replace('%2', colorType)
                    .replace('%3', Object.keys(PALETTES).join(', '))
    );
  }
}

function colorToRgbaArray(clr) {
  if (angular.isArray(clr) && clr.length == 3) return clr;
  if (/^rgb/.test(clr)) {
    return clr.replace(/(^\s*rgba?\(|\)\s*$)/g, '').split(',').map(function(value, i) {
      return i == 3 ? parseFloat(value, 10) : parseInt(value, 10);
    });
  }
  if (clr.charAt(0) == '#') clr = clr.substring(1);
  if (!/^([a-fA-F0-9]{3}){1,2}$/g.test(clr)) return;

  var dig = clr.length / 3;
  var red = clr.substr(0, dig);
  var grn = clr.substr(dig, dig);
  var blu = clr.substr(dig * 2);
  if (dig === 1) {
    red += red;
    grn += grn;
    blu += blu;
  }
  return [parseInt(red, 16), parseInt(grn, 16), parseInt(blu, 16)];
}

function rgba(rgbArray, opacity) {
  if (!rgbArray) return "rgb('0,0,0')";

  if (rgbArray.length == 4) {
    rgbArray = angular.copy(rgbArray);
    opacity ? rgbArray.pop() : opacity = rgbArray.pop();
  }
  return opacity && (typeof opacity == 'number' || (typeof opacity == 'string' && opacity.length)) ?
    'rgba(' + rgbArray.join(',') + ',' + opacity + ')' :
    'rgb(' + rgbArray.join(',') + ')';
}


})(window.angular);

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.autocomplete
 */
/*
 * @see js folder for autocomplete implementation
 */
angular.module('material.components.autocomplete', [
  'material.core',
  'material.components.icon',
  'material.components.virtualRepeat'
]);

})();
(function(){
"use strict";


MdAutocompleteCtrl.$inject = ["$scope", "$element", "$mdUtil", "$mdConstant", "$mdTheming", "$window", "$animate", "$rootElement", "$attrs", "$q", "$log", "$mdLiveAnnouncer"];angular
    .module('material.components.autocomplete')
    .controller('MdAutocompleteCtrl', MdAutocompleteCtrl);

var ITEM_HEIGHT   = 48,
    MAX_ITEMS     = 5,
    MENU_PADDING  = 8,
    INPUT_PADDING = 2, // Padding provided by `md-input-container`
    MODE_STANDARD = 'standard',
    MODE_VIRTUAL = 'virtual';

function MdAutocompleteCtrl ($scope, $element, $mdUtil, $mdConstant, $mdTheming, $window,
                             $animate, $rootElement, $attrs, $q, $log, $mdLiveAnnouncer) {

  // Internal Variables.
  var ctrl                 = this,
      itemParts            = $scope.itemsExpr.split(/ in /i),
      itemExpr             = itemParts[ 1 ],
      elements             = null,
      cache                = {},
      noBlur               = false,
      selectedItemWatchers = [],
      hasFocus             = false,
      fetchesInProgress    = 0,
      enableWrapScroll     = null,
      inputModelCtrl       = null,
      debouncedOnResize    = $mdUtil.debounce(onWindowResize),
      mode                 = MODE_VIRTUAL; // default

  /**
   * The root document element. This is used for attaching a top-level click handler to
   * close the options panel when a click outside said panel occurs. We use `documentElement`
   * instead of body because, when scrolling is disabled, some browsers consider the body element
   * to be completely off the screen and propagate events directly to the html element.
   * @type {!Object} angular.JQLite
   */
  ctrl.documentElement = angular.element(document.documentElement);

  // Public Exported Variables with handlers
  defineProperty('hidden', handleHiddenChange, true);

  // Public Exported Variables
  ctrl.scope = $scope;
  ctrl.parent = $scope.$parent;
  ctrl.itemName = itemParts[0];
  ctrl.matches = [];
  ctrl.loading = false;
  ctrl.hidden = true;
  ctrl.index = -1;
  ctrl.activeOption = null;
  ctrl.id = $mdUtil.nextUid();
  ctrl.isDisabled = null;
  ctrl.isRequired = null;
  ctrl.isReadonly = null;
  ctrl.hasNotFound = false;
  ctrl.selectedMessage = $scope.selectedMessage || 'selected';

  // Public Exported Methods
  ctrl.keydown = keydown;
  ctrl.blur = blur;
  ctrl.focus = focus;
  ctrl.clear = clearValue;
  ctrl.select = select;
  ctrl.listEnter = onListEnter;
  ctrl.listLeave = onListLeave;
  ctrl.focusInput = focusInputElement;
  ctrl.getCurrentDisplayValue = getCurrentDisplayValue;
  ctrl.registerSelectedItemWatcher = registerSelectedItemWatcher;
  ctrl.unregisterSelectedItemWatcher = unregisterSelectedItemWatcher;
  ctrl.notFoundVisible = notFoundVisible;
  ctrl.loadingIsVisible = loadingIsVisible;
  ctrl.positionDropdown = positionDropdown;

  /**
   * Report types to be used for the $mdLiveAnnouncer
   * @enum {number} Unique flag id.
   */
  var ReportType = {
    Count: 1,
    Selected: 2
  };

  return init();

  // initialization methods

  /**
   * Initialize the controller, setup watchers, gather elements
   */
  function init () {

    $mdUtil.initOptionalProperties($scope, $attrs, {
      searchText: '',
      selectedItem: null,
      clearButton: false,
      disableVirtualRepeat: false,
    });

    $mdTheming($element);
    configureWatchers();
    $mdUtil.nextTick(function () {

      gatherElements();
      moveDropdown();

      // Touch devices often do not send a click event on tap. We still want to focus the input
      // and open the options pop-up in these cases.
      $element.on('touchstart', focusInputElement);

      // Forward all focus events to the input element when autofocus is enabled
      if ($scope.autofocus) {
        $element.on('focus', focusInputElement);
      }
      if ($scope.inputAriaDescribedBy) {
        elements.input.setAttribute('aria-describedby', $scope.inputAriaDescribedBy);
      }
      if (!$scope.floatingLabel) {
        if ($scope.inputAriaLabel) {
          elements.input.setAttribute('aria-label', $scope.inputAriaLabel);
        } else if ($scope.inputAriaLabelledBy) {
          elements.input.setAttribute('aria-labelledby', $scope.inputAriaLabelledBy);
        } else if ($scope.placeholder) {
          // If no aria-label or aria-labelledby references are defined, then just label using the
          // placeholder.
          elements.input.setAttribute('aria-label', $scope.placeholder);
        }
      }
    });
  }

  function updateModelValidators() {
    if (!$scope.requireMatch || !inputModelCtrl) return;

    inputModelCtrl.$setValidity('md-require-match', !!$scope.selectedItem || !$scope.searchText);
  }

  /**
   * Calculates the dropdown's position and applies the new styles to the menu element
   * @returns {*}
   */
  function positionDropdown () {
    if (!elements) {
      return $mdUtil.nextTick(positionDropdown, false, $scope);
    }

    var dropdownHeight = ($scope.dropdownItems || MAX_ITEMS) * ITEM_HEIGHT;
    var hrect  = elements.wrap.getBoundingClientRect(),
        vrect  = elements.snap.getBoundingClientRect(),
        root   = elements.root.getBoundingClientRect(),
        top    = vrect.bottom - root.top,
        bot    = root.bottom - vrect.top,
        left   = hrect.left - root.left,
        width  = hrect.width,
        offset = getVerticalOffset(),
        position = $scope.dropdownPosition,
        styles, enoughBottomSpace, enoughTopSpace;
    var bottomSpace = root.bottom - vrect.bottom - MENU_PADDING + $mdUtil.getViewportTop();
    var topSpace = vrect.top - MENU_PADDING;

    // Automatically determine dropdown placement based on available space in viewport.
    if (!position) {
      enoughTopSpace = topSpace > dropdownHeight;
      enoughBottomSpace = bottomSpace > dropdownHeight;
      if (enoughBottomSpace) {
        position = 'bottom';
      } else if (enoughTopSpace) {
        position = 'top';
      } else {
        position = topSpace > bottomSpace ? 'top' : 'bottom';
      }
    }
    // Adjust the width to account for the padding provided by `md-input-container`
    if ($attrs.mdFloatingLabel) {
      left += INPUT_PADDING;
      width -= INPUT_PADDING * 2;
    }
    styles = {
      left:     left + 'px',
      minWidth: width + 'px',
      maxWidth: Math.max(hrect.right - root.left, root.right - hrect.left) - MENU_PADDING + 'px'
    };

    if (position === 'top') {
      styles.top       = 'auto';
      styles.bottom    = bot + 'px';
      styles.maxHeight = Math.min(dropdownHeight, topSpace) + 'px';
    } else {
      bottomSpace = root.bottom - hrect.bottom - MENU_PADDING + $mdUtil.getViewportTop();

      styles.top       = (top - offset) + 'px';
      styles.bottom    = 'auto';
      styles.maxHeight = Math.min(dropdownHeight, bottomSpace) + 'px';
    }

    elements.$.scrollContainer.css(styles);
    $mdUtil.nextTick(correctHorizontalAlignment, false, $scope);

    /**
     * Calculates the vertical offset for floating label examples to account for ngMessages
     * @returns {number}
     */
    function getVerticalOffset () {
      var offset = 0;
      var inputContainer = $element.find('md-input-container');
      if (inputContainer.length) {
        var input = inputContainer.find('input');
        offset = inputContainer.prop('offsetHeight');
        offset -= input.prop('offsetTop');
        offset -= input.prop('offsetHeight');
        // add in the height left up top for the floating label text
        offset += inputContainer.prop('offsetTop');
      }
      return offset;
    }

    /**
     * Makes sure that the menu doesn't go off of the screen on either side.
     */
    function correctHorizontalAlignment () {
      var dropdown = elements.scrollContainer.getBoundingClientRect(),
          styles   = {};
      if (dropdown.right > root.right) {
        styles.left = (hrect.right - dropdown.width) + 'px';
      }
      elements.$.scrollContainer.css(styles);
    }
  }

  /**
   * Moves the dropdown menu to the body tag in order to avoid z-index and overflow issues.
   */
  function moveDropdown () {
    if (!elements.$.root.length) return;
    $mdTheming(elements.$.scrollContainer);
    elements.$.scrollContainer.detach();
    elements.$.root.append(elements.$.scrollContainer);
    if ($animate.pin) $animate.pin(elements.$.scrollContainer, $rootElement);
  }

  /**
   * Sends focus to the input element.
   */
  function focusInputElement () {
    elements.input.focus();
  }

  /**
   * Update the activeOption based on the selected item in the listbox.
   * The activeOption is used in the template to set the aria-activedescendant attribute, which
   * enables screen readers to properly handle visual focus within the listbox and announce the
   * item's place in the list. I.e. "List item 3 of 50". Anytime that `ctrl.index` changes, this
   * function needs to be called to update the activeOption.
   */
  function updateActiveOption() {
    var selectedOption = elements.scroller.querySelector('.selected');
    if (selectedOption) {
      ctrl.activeOption = selectedOption.id;
    } else {
      ctrl.activeOption = null;
    }
  }

  /**
   * Sets up any watchers used by autocomplete
   */
  function configureWatchers () {
    var wait = parseInt($scope.delay, 10) || 0;

    $attrs.$observe('disabled', function (value) { ctrl.isDisabled = $mdUtil.parseAttributeBoolean(value, false); });
    $attrs.$observe('required', function (value) { ctrl.isRequired = $mdUtil.parseAttributeBoolean(value, false); });
    $attrs.$observe('readonly', function (value) { ctrl.isReadonly = $mdUtil.parseAttributeBoolean(value, false); });

    $scope.$watch('searchText', wait ? $mdUtil.debounce(handleSearchText, wait) : handleSearchText);
    $scope.$watch('selectedItem', selectedItemChange);

    angular.element($window).on('resize', debouncedOnResize);

    $scope.$on('$destroy', cleanup);
  }

  /**
   * Removes any events or leftover elements created by this controller
   */
  function cleanup () {
    if (!ctrl.hidden) {
      $mdUtil.enableScrolling();
    }

    angular.element($window).off('resize', debouncedOnResize);

    if (elements){
      var items = ['ul', 'scroller', 'scrollContainer', 'input'];
      angular.forEach(items, function(key){
        elements.$[key].remove();
      });
    }
  }

  /**
   * Event handler to be called whenever the window resizes.
   */
  function onWindowResize() {
    if (!ctrl.hidden) {
      positionDropdown();
    }
  }

  /**
   * Gathers all of the elements needed for this controller
   */
  function gatherElements () {

    var snapWrap = gatherSnapWrap();

    elements = {
      main:  $element[0],
      scrollContainer: $element[0].querySelector('.md-virtual-repeat-container, .md-standard-list-container'),
      scroller: $element[0].querySelector('.md-virtual-repeat-scroller, .md-standard-list-scroller'),
      ul:    $element.find('ul')[0],
      input: $element.find('input')[0],
      wrap:  snapWrap.wrap,
      snap:  snapWrap.snap,
      root:  document.body,
    };

    elements.li   = elements.ul.getElementsByTagName('li');
    elements.$    = getAngularElements(elements);
    mode = elements.scrollContainer.classList.contains('md-standard-list-container') ? MODE_STANDARD : MODE_VIRTUAL;
    inputModelCtrl = elements.$.input.controller('ngModel');
  }

  /**
   * Gathers the snap and wrap elements
   *
   */
  function gatherSnapWrap() {
    var element;
    var value;
    for (element = $element; element.length; element = element.parent()) {
      value = element.attr('md-autocomplete-snap');
      if (angular.isDefined(value)) break;
    }

    if (element.length) {
      return {
        snap: element[0],
        wrap: (value.toLowerCase() === 'width') ? element[0] : $element.find('md-autocomplete-wrap')[0]
      };
    }

    var wrap = $element.find('md-autocomplete-wrap')[0];
    return {
      snap: wrap,
      wrap: wrap
    };
  }

  /**
   * Gathers angular-wrapped versions of each element
   * @param elements
   * @returns {{}}
   */
  function getAngularElements (elements) {
    var obj = {};
    for (var key in elements) {
      if (elements.hasOwnProperty(key)) obj[ key ] = angular.element(elements[ key ]);
    }
    return obj;
  }

  // event/change handlers

  /**
   * @param {Event} $event
   */
  function preventDefault($event) {
    $event.preventDefault();
  }

  /**
   * @param {Event} $event
   */
  function stopPropagation($event) {
    $event.stopPropagation();
  }

  /**
   * Handles changes to the `hidden` property.
   * @param {boolean} hidden true to hide the options pop-up, false to show it.
   * @param {boolean} oldHidden the previous value of hidden
   */
  function handleHiddenChange (hidden, oldHidden) {
    var scrollContainerElement;

    if (elements) {
      scrollContainerElement = angular.element(elements.scrollContainer);
    }
    if (!hidden && oldHidden) {
      positionDropdown();

      // Report in polite mode, because the screen reader should finish the default description of
      // the input element.
      reportMessages(true, ReportType.Count | ReportType.Selected);

      if (elements) {
        $mdUtil.disableScrollAround(elements.scrollContainer);
        enableWrapScroll = disableElementScrollEvents(elements.wrap);
        if ($mdUtil.isIos) {
          ctrl.documentElement.on('touchend', handleTouchOutsidePanel);
          if (scrollContainerElement) {
            scrollContainerElement.on('touchstart touchmove touchend', stopPropagation);
          }
        }
        ctrl.index = getDefaultIndex();
        $mdUtil.nextTick(function() {
          updateActiveOption();
          updateScroll();
        });
      }
    } else if (hidden && !oldHidden) {
      if ($mdUtil.isIos) {
        ctrl.documentElement.off('touchend', handleTouchOutsidePanel);
        if (scrollContainerElement) {
          scrollContainerElement.off('touchstart touchmove touchend', stopPropagation);
        }
      }
      $mdUtil.enableScrolling();

      if (enableWrapScroll) {
        enableWrapScroll();
        enableWrapScroll = null;
      }
    }
  }

  /**
   * Handling touch events that bubble up to the document is required for closing the dropdown
   * panel on touch outside of the options pop-up panel on iOS.
   * @param {Event} $event
   */
  function handleTouchOutsidePanel($event) {
    ctrl.hidden = true;
    // iOS does not blur the pop-up for touches on the scroll mask, so we have to do it.
    doBlur(true);
  }

  /**
   * Disables scrolling for a specific element.
   * @param {!string|!DOMElement} element to disable scrolling
   * @return {Function} function to call to re-enable scrolling for the element
   */
  function disableElementScrollEvents(element) {
    var elementToDisable = angular.element(element);
    elementToDisable.on('wheel touchmove', preventDefault);

    return function() {
      elementToDisable.off('wheel touchmove', preventDefault);
    };
  }

  /**
   * When the user mouses over the dropdown menu, ignore blur events.
   */
  function onListEnter () {
    noBlur = true;
  }

  /**
   * When the user's mouse leaves the menu, blur events may hide the menu again.
   */
  function onListLeave () {
    if (!hasFocus && !ctrl.hidden) elements.input.focus();
    noBlur = false;
    ctrl.hidden = shouldHide();
  }

  /**
   * Handles changes to the selected item.
   * @param selectedItem
   * @param previousSelectedItem
   */
  function selectedItemChange (selectedItem, previousSelectedItem) {

    updateModelValidators();

    if (selectedItem) {
      getDisplayValue(selectedItem).then(function (val) {
        $scope.searchText = val;
        handleSelectedItemChange(selectedItem, previousSelectedItem);
      });
    } else if (previousSelectedItem && $scope.searchText) {
      getDisplayValue(previousSelectedItem).then(function(displayValue) {
        // Clear the searchText, when the selectedItem is set to null.
        // Do not clear the searchText, when the searchText isn't matching with the previous
        // selected item.
        if (angular.isString($scope.searchText)
          && displayValue.toString().toLowerCase() === $scope.searchText.toLowerCase()) {
          $scope.searchText = '';
        }
      });
    }

    if (selectedItem !== previousSelectedItem) {
      announceItemChange();
    }
  }

  /**
   * Use the user-defined expression to announce changes each time a new item is selected
   */
  function announceItemChange () {
    angular.isFunction($scope.itemChange) &&
      $scope.itemChange(getItemAsNameVal($scope.selectedItem));
  }

  /**
   * Use the user-defined expression to announce changes each time the search text is changed
   */
  function announceTextChange () {
    angular.isFunction($scope.textChange) && $scope.textChange();
  }

  /**
   * Calls any external watchers listening for the selected item.  Used in conjunction with
   * `registerSelectedItemWatcher`.
   * @param selectedItem
   * @param previousSelectedItem
   */
  function handleSelectedItemChange (selectedItem, previousSelectedItem) {
    selectedItemWatchers.forEach(function (watcher) {
      watcher(selectedItem, previousSelectedItem);
    });
  }

  /**
   * Register a function to be called when the selected item changes.
   * @param cb
   */
  function registerSelectedItemWatcher (cb) {
    if (selectedItemWatchers.indexOf(cb) === -1) {
      selectedItemWatchers.push(cb);
    }
  }

  /**
   * Unregister a function previously registered for selected item changes.
   * @param cb
   */
  function unregisterSelectedItemWatcher (cb) {
    var i = selectedItemWatchers.indexOf(cb);
    if (i !== -1) {
      selectedItemWatchers.splice(i, 1);
    }
  }

  /**
   * Handles changes to the searchText property.
   * @param {string} searchText
   * @param {string} previousSearchText
   */
  function handleSearchText (searchText, previousSearchText) {
    ctrl.index = getDefaultIndex();

    // do nothing on init
    if (searchText === previousSearchText) return;

    updateModelValidators();

    getDisplayValue($scope.selectedItem).then(function (val) {
      // clear selected item if search text no longer matches it
      if (searchText !== val) {
        $scope.selectedItem = null;

        // trigger change event if available
        if (searchText !== previousSearchText) {
          announceTextChange();
        }

        // cancel results if search text is not long enough
        if (!isMinLengthMet()) {
          ctrl.matches = [];

          setLoading(false);
          reportMessages(true, ReportType.Count);

        } else {
          handleQuery();
        }
      }
    });

  }

  /**
   * Handles input blur event, determines if the dropdown should hide.
   */
  function blur($event) {
    hasFocus = false;

    if (!noBlur) {
      ctrl.hidden = shouldHide();
      evalAttr('ngBlur', { $event: $event });
    }
  }

  /**
   * Force blur on input element
   * @param {boolean} forceBlur
   */
  function doBlur(forceBlur) {
    if (forceBlur) {
      noBlur = false;
      hasFocus = false;
    }
    elements.input.blur();
  }

  /**
   * Handles input focus event, determines if the dropdown should show.
   */
  function focus($event) {
    hasFocus = true;

    if (isSearchable() && isMinLengthMet()) {
      handleQuery();
    }

    ctrl.hidden = shouldHide();

    evalAttr('ngFocus', { $event: $event });
  }

  /**
   * Handles keyboard input.
   * @param event
   */
  function keydown (event) {
    switch (event.keyCode) {
      case $mdConstant.KEY_CODE.DOWN_ARROW:
        if (ctrl.loading || hasSelection()) return;
        event.stopPropagation();
        event.preventDefault();
        ctrl.index = ctrl.index + 1 > ctrl.matches.length - 1 ? 0 : Math.min(ctrl.index + 1, ctrl.matches.length - 1);
        $mdUtil.nextTick(updateActiveOption);
        updateScroll();
        break;
      case $mdConstant.KEY_CODE.UP_ARROW:
        if (ctrl.loading || hasSelection()) return;
        event.stopPropagation();
        event.preventDefault();
        ctrl.index = ctrl.index - 1 < 0 ? ctrl.matches.length - 1 : Math.max(0, ctrl.index - 1);
        $mdUtil.nextTick(updateActiveOption);
        updateScroll();
        break;
      case $mdConstant.KEY_CODE.TAB:
        // If we hit tab, assume that we've left the list so it will close
        onListLeave();

        if (ctrl.hidden || ctrl.loading || ctrl.index < 0 || ctrl.matches.length < 1) return;
        select(ctrl.index);
        break;
      case $mdConstant.KEY_CODE.ENTER:
        if (ctrl.hidden || ctrl.loading || ctrl.index < 0 || ctrl.matches.length < 1) return;
        if (hasSelection()) return;
        event.stopImmediatePropagation();
        event.preventDefault();
        select(ctrl.index);
        break;
      case $mdConstant.KEY_CODE.ESCAPE:
        event.preventDefault(); // Prevent browser from always clearing input
        if (!shouldProcessEscape()) return;
        event.stopPropagation();

        clearSelectedItem();
        if ($scope.searchText && hasEscapeOption('clear')) {
          clearSearchText();
        }

        // Manually hide (needed for mdNotFound support)
        ctrl.hidden = true;

        if (hasEscapeOption('blur')) {
          // Force the component to blur if they hit escape
          doBlur(true);
        }

        break;
      default:
    }
  }

  // getters

  /**
   * Returns the minimum length needed to display the dropdown.
   * @returns {*}
   */
  function getMinLength () {
    return angular.isNumber($scope.minLength) ? $scope.minLength : 1;
  }

  /**
   * Returns the display value for an item.
   * @param {*} item
   * @returns {*}
   */
  function getDisplayValue (item) {
    return $q.when(getItemText(item) || item).then(function(itemText) {
      if (itemText && !angular.isString(itemText)) {
        $log.warn('md-autocomplete: Could not resolve display value to a string. ' +
          'Please check the `md-item-text` attribute.');
      }

      return itemText;
    });

    /**
     * Getter function to invoke user-defined expression (in the directive)
     * to convert your object to a single string.
     * @param {*} item
     * @returns {string|null}
     */
    function getItemText (item) {
      return (item && $scope.itemText) ? $scope.itemText(getItemAsNameVal(item)) : null;
    }
  }

  /**
   * Returns the locals object for compiling item templates.
   * @param {*} item
   * @returns {Object|undefined}
   */
  function getItemAsNameVal (item) {
    if (!item) {
      return undefined;
    }

    var locals = {};
    if (ctrl.itemName) {
      locals[ ctrl.itemName ] = item;
    }

    return locals;
  }

  /**
   * Returns the default index based on whether or not autoselect is enabled.
   * @returns {number} 0 if autoselect is enabled, -1 if not.
   */
  function getDefaultIndex () {
    return $scope.autoselect ? 0 : -1;
  }

  /**
   * Sets the loading parameter and updates the hidden state.
   * @param value {boolean} Whether or not the component is currently loading.
   */
  function setLoading(value) {
    if (ctrl.loading !== value) {
      ctrl.loading = value;
    }

    // Always refresh the hidden variable as something else might have changed
    ctrl.hidden = shouldHide();
  }

  /**
   * Determines if the menu should be hidden.
   * @returns {boolean} true if the menu should be hidden
   */
  function shouldHide () {
    return !shouldShow();
  }

  /**
   * Determines whether the autocomplete is able to query within the current state.
   * @returns {boolean} true if the query can be run
   */
  function isSearchable() {
    if (ctrl.loading && !hasMatches()) {
      // No query when query is in progress.
      return false;
    } else if (hasSelection()) {
      // No query if there is already a selection
      return false;
    }
    else if (!hasFocus) {
      // No query if the input does not have focus
      return false;
    }
    return true;
  }

  /**
   * @returns {boolean} if the escape keydown should be processed, return true.
   *  Otherwise return false.
   */
  function shouldProcessEscape() {
    return hasEscapeOption('blur') || !ctrl.hidden || ctrl.loading || hasEscapeOption('clear') && $scope.searchText;
  }

  /**
   * @param {string} option check if this option is set
   * @returns {boolean} if the specified escape option is set, return true. Return false otherwise.
   */
  function hasEscapeOption(option) {
    return !$scope.escapeOptions || $scope.escapeOptions.toLowerCase().indexOf(option) !== -1;
  }

  /**
   * Determines if the menu should be shown.
   * @returns {boolean} true if the menu should be shown
   */
  function shouldShow() {
    if (ctrl.isReadonly) {
      // Don't show if read only is set
      return false;
    } else if (!isSearchable()) {
      // Don't show if a query is in progress, there is already a selection,
      // or the input is not focused.
      return false;
    }
    return (isMinLengthMet() && hasMatches()) || notFoundVisible();
  }

  /**
   * @returns {boolean} true if the search text has matches.
   */
  function hasMatches() {
    return ctrl.matches.length ? true : false;
  }

  /**
   * @returns {boolean} true if the autocomplete has a valid selection.
   */
  function hasSelection() {
    return ctrl.scope.selectedItem ? true : false;
  }

  /**
   * @returns {boolean} true if the loading indicator is, or should be, visible.
   */
  function loadingIsVisible() {
    return ctrl.loading && !hasSelection();
  }

  /**
   * @returns {*} the display value of the current item.
   */
  function getCurrentDisplayValue () {
    return getDisplayValue(ctrl.matches[ ctrl.index ]);
  }

  /**
   * Determines if the minimum length is met by the search text.
   * @returns {*} true if the minimum length is met by the search text
   */
  function isMinLengthMet () {
    return ($scope.searchText || '').length >= getMinLength();
  }

  // actions

  /**
   * Defines a public property with a handler and a default value.
   * @param {string} key
   * @param {Function} handler function
   * @param {*} defaultValue default value
   */
  function defineProperty (key, handler, defaultValue) {
    Object.defineProperty(ctrl, key, {
      get: function () { return defaultValue; },
      set: function (newValue) {
        var oldValue = defaultValue;
        defaultValue        = newValue;
        handler(newValue, oldValue);
      }
    });
  }

  /**
   * Selects the item at the given index.
   * @param {number} index to select
   */
  function select (index) {
    // force form to update state for validation
    $mdUtil.nextTick(function () {
      getDisplayValue(ctrl.matches[ index ]).then(function (val) {
        var ngModel = elements.$.input.controller('ngModel');
        $mdLiveAnnouncer.announce(val + ' ' + ctrl.selectedMessage, 'assertive');
        ngModel.$setViewValue(val);
        ngModel.$render();
      }).finally(function () {
        $scope.selectedItem = ctrl.matches[ index ];
        setLoading(false);
      });
    }, false);
  }

  /**
   * Clears the searchText value and selected item.
   * @param {Event} $event
   */
  function clearValue ($event) {
    if ($event) {
      $event.stopPropagation();
    }
    clearSelectedItem();
    clearSearchText();
  }

  /**
   * Clears the selected item
   */
  function clearSelectedItem () {
    // Reset our variables
    ctrl.index = -1;
    $mdUtil.nextTick(updateActiveOption);
    ctrl.matches = [];
  }

  /**
   * Clears the searchText value
   */
  function clearSearchText () {
    // Set the loading to true so we don't see flashes of content.
    // The flashing will only occur when an async request is running.
    // So the loading process will stop when the results had been retrieved.
    setLoading(true);

    $scope.searchText = '';

    // Normally, triggering the change / input event is unnecessary, because the browser detects it properly.
    // But some browsers are not detecting it properly, which means that we have to trigger the event.
    // Using the `input` is not working properly, because for example IE11 is not supporting the `input` event.
    // The `change` event is a good alternative and is supported by all supported browsers.
    var eventObj = document.createEvent('CustomEvent');
    eventObj.initCustomEvent('change', true, true, { value: '' });
    elements.input.dispatchEvent(eventObj);

    // For some reason, firing the above event resets the value of $scope.searchText if
    // $scope.searchText has a space character at the end, so we blank it one more time and then
    // focus.
    elements.input.blur();
    $scope.searchText = '';
    elements.input.focus();
  }

  /**
   * Fetches the results for the provided search text.
   * @param searchText
   */
  function fetchResults (searchText) {
    var items = $scope.$parent.$eval(itemExpr),
        term  = searchText.toLowerCase(),
        isList = angular.isArray(items),
        isPromise = !!items.then; // Every promise should contain a `then` property

    if (isList) onResultsRetrieved(items);
    else if (isPromise) handleAsyncResults(items);

    function handleAsyncResults(items) {
      if (!items) return;

      items = $q.when(items);
      fetchesInProgress++;
      setLoading(true);

      $mdUtil.nextTick(function () {
          items
            .then(onResultsRetrieved)
            .finally(function(){
              if (--fetchesInProgress === 0) {
                setLoading(false);
              }
            });
      },true, $scope);
    }

    function onResultsRetrieved(matches) {
      cache[term] = matches;

      // Just cache the results if the request is now outdated.
      // The request becomes outdated, when the new searchText has changed during the result fetching.
      if ((searchText || '') !== ($scope.searchText || '')) {
        return;
      }

      handleResults(matches);
    }
  }


  /**
   * Reports given message types to supported screen readers.
   * @param {boolean} isPolite Whether the announcement should be polite.
   * @param {!number} types Message flags to be reported to the screen reader.
   */
  function reportMessages(isPolite, types) {
    var politeness = isPolite ? 'polite' : 'assertive';
    var messages = [];

    if (types & ReportType.Selected && ctrl.index !== -1) {
      messages.push(getCurrentDisplayValue());
    }

    if (types & ReportType.Count) {
      messages.push($q.resolve(getCountMessage()));
    }

    $q.all(messages).then(function(data) {
      $mdLiveAnnouncer.announce(data.join(' '), politeness);
    });
  }

  /**
   * @returns {string} the ARIA message for how many results match the current query.
   */
  function getCountMessage () {
    switch (ctrl.matches.length) {
      case 0:
        return 'There are no matches available.';
      case 1:
        return 'There is 1 match available.';
      default:
        return 'There are ' + ctrl.matches.length + ' matches available.';
    }
  }

  /**
   * Makes sure that the focused element is within view.
   */
  function updateScroll () {
    if (!elements.li[0]) return;
    if (mode === MODE_STANDARD) {
      updateStandardScroll();
    } else {
      updateVirtualScroll();
    }
  }

  function updateVirtualScroll() {
    // elements in virtual scroll have consistent heights
    var optionHeight = elements.li[0].offsetHeight,
        top = optionHeight * Math.max(0, ctrl.index),
        bottom = top + optionHeight,
        containerHeight = elements.scroller.clientHeight,
        scrollTop = elements.scroller.scrollTop;

    if (top < scrollTop) {
      scrollTo(top);
    } else if (bottom > scrollTop + containerHeight) {
      scrollTo(bottom - containerHeight);
    }
  }

  function updateStandardScroll() {
    // elements in standard scroll have variable heights
    var selected =  elements.li[Math.max(0, ctrl.index)];
    var containerHeight = elements.scrollContainer.offsetHeight,
        top = selected && selected.offsetTop || 0,
        bottom = top + selected.clientHeight,
        scrollTop = elements.scrollContainer.scrollTop;

    if (top < scrollTop) {
      scrollTo(top);
    } else if (bottom > scrollTop + containerHeight) {
      scrollTo(bottom - containerHeight);
    }
  }

  function isPromiseFetching() {
    return fetchesInProgress !== 0;
  }

  function scrollTo (offset) {
    if (mode === MODE_STANDARD) {
      elements.scrollContainer.scrollTop = offset;
    } else {
      elements.$.scrollContainer.controller('mdVirtualRepeatContainer').scrollTo(offset);
    }
  }

  function notFoundVisible () {
    var textLength = (ctrl.scope.searchText || '').length;

    return ctrl.hasNotFound && !hasMatches() && (!ctrl.loading || isPromiseFetching()) && textLength >= getMinLength() && (hasFocus || noBlur) && !hasSelection();
  }

  /**
   * Starts the query to gather the results for the current searchText.  Attempts to return cached
   * results first, then forwards the process to `fetchResults` if necessary.
   */
  function handleQuery () {
    var searchText = $scope.searchText || '';
    var term = searchText.toLowerCase();

    // If caching is enabled and the current searchText is stored in the cache
    if (!$scope.noCache && cache[term]) {
      // The results should be handled as same as a normal un-cached request does.
      handleResults(cache[term]);
    } else {
      fetchResults(searchText);
    }

    ctrl.hidden = shouldHide();
  }

  /**
   * Handles the retrieved results by showing them in the autocompletes dropdown.
   * @param results Retrieved results
   */
  function handleResults(results) {
    ctrl.matches = results;
    ctrl.hidden  = shouldHide();

    // If loading is in progress, then we'll end the progress. This is needed for example,
    // when the `clear` button was clicked, because there we always show the loading process, to prevent flashing.
    if (ctrl.loading) setLoading(false);

    if ($scope.selectOnMatch) selectItemOnMatch();

    positionDropdown();
    reportMessages(true, ReportType.Count);
  }

  /**
   * If there is only one matching item and the search text matches its display value exactly,
   * automatically select that item.  Note: This function is only called if the user uses the
   * `md-select-on-match` flag.
   */
  function selectItemOnMatch () {
    var searchText = $scope.searchText,
        matches    = ctrl.matches,
        item       = matches[ 0 ];
    if (matches.length === 1) getDisplayValue(item).then(function (displayValue) {
      var isMatching = searchText === displayValue;
      if ($scope.matchInsensitive && !isMatching) {
        isMatching = searchText.toLowerCase() === displayValue.toLowerCase();
      }

      if (isMatching) {
        select(0);
      }
    });
  }

  /**
   * Evaluates an attribute expression against the parent scope.
   * @param {String} attr Name of the attribute to be evaluated.
   * @param {Object?} locals Properties to be injected into the evaluation context.
   */
 function evalAttr(attr, locals) {
    if ($attrs[attr]) {
      $scope.$parent.$eval($attrs[attr], locals || {});
    }
  }

}

})();
(function(){
"use strict";


MdAutocomplete.$inject = ["$$mdSvgRegistry"];angular
    .module('material.components.autocomplete')
    .directive('mdAutocomplete', MdAutocomplete);

/**
 * @ngdoc directive
 * @name mdAutocomplete
 * @module material.components.autocomplete
 *
 * @description
 * `<md-autocomplete>` is a special input component with a drop-down of all possible matches to a
 *     custom query. This component allows you to provide real-time suggestions as the user types
 *     in the input area.
 *
 * To start, you will need to specify the required parameters and provide a template for your
 *     results. The content inside `md-autocomplete` will be treated as a template.
 *
 * In more complex cases, you may want to include other content such as a message to display when
 *     no matches were found.  You can do this by wrapping your template in `md-item-template` and
 *     adding a tag for `md-not-found`.  An example of this is shown below.
 *
 * To reset the displayed value you must clear both values for `md-search-text` and
 * `md-selected-item`.
 *
 * ### Validation
 *
 * You can use `ng-messages` to include validation the same way that you would normally validate;
 *     however, if you want to replicate a standard input with a floating label, you will have to
 *     do the following:
 *
 * - Make sure that your template is wrapped in `md-item-template`
 * - Add your `ng-messages` code inside of `md-autocomplete`
 * - Add your validation properties to `md-autocomplete` (ie. `required`)
 * - Add a `name` to `md-autocomplete` (to be used on the generated `input`)
 *
 * There is an example below of how this should look.
 *
 * ### Snapping Drop-Down
 *
 * You can cause the autocomplete drop-down to snap to an ancestor element by applying the
 *     `md-autocomplete-snap` attribute to that element. You can also snap to the width of
 *     the `md-autocomplete-snap` element by setting the attribute's value to `width`
 *     (ie. `md-autocomplete-snap="width"`).
 *
 * ### Notes
 *
 * **Autocomplete Dropdown Items Rendering**
 *
 * The `md-autocomplete` uses the the <a ng-href="api/directive/mdVirtualRepeat">
 *   mdVirtualRepeat</a> directive for displaying the results inside of the dropdown.<br/>
 *
 * > When encountering issues regarding the item template please take a look at the
 *   <a ng-href="api/directive/mdVirtualRepeatContainer">VirtualRepeatContainer</a> documentation.
 *
 * **Autocomplete inside of a Virtual Repeat**
 *
 * When using the `md-autocomplete` directive inside of a
 * <a ng-href="api/directive/mdVirtualRepeatContainer">VirtualRepeatContainer</a> the dropdown items
 * might not update properly, because caching of the results is enabled by default.
 *
 * The autocomplete will then show invalid dropdown items, because the Virtual Repeat only updates
 * the scope bindings rather than re-creating the `md-autocomplete`. This means that the previous
 * cached results will be used.
 *
 * > To avoid such problems, ensure that the autocomplete does not cache any results via
 * `md-no-cache="true"`:
 *
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-no-cache="true"
 *       md-selected-item="selectedItem"
 *       md-items="item in items"
 *       md-search-text="searchText"
 *       md-item-text="item.display">
 *     <span>{{ item.display }}</span>
 *   </md-autocomplete>
 * </hljs>
 *
 *
 * @param {expression} md-items An expression in the format of `item in results` to iterate over
 *     matches for your search.<br/><br/>
 *     The `results` expression can be also a function, which returns the results synchronously
 *     or asynchronously (per Promise).
 * @param {expression=} md-selected-item-change An expression to be run each time a new item is
 *     selected.
 * @param {expression=} md-search-text-change An expression to be run each time the search text
 *     updates.
 * @param {expression=} md-search-text A model to bind the search query text to.
 * @param {object=} md-selected-item A model to bind the selected item to.
 * @param {expression=} md-item-text An expression that will convert your object to a single string.
 * @param {string=} placeholder Placeholder text that will be forwarded to the input.
 * @param {boolean=} md-no-cache Disables the internal caching that happens in autocomplete.
 * @param {boolean=} ng-disabled Determines whether or not to disable the input field.
 * @param {boolean=} md-require-match When set to true, the autocomplete will add a validator,
 *     which will evaluate to false, when no item is currently selected.
 * @param {number=} md-min-length Specifies the minimum length of text before autocomplete will
 *     make suggestions.
 * @param {number=} md-delay Specifies the amount of time (in milliseconds) to wait before looking
 *     for results.
 * @param {boolean=} md-clear-button Whether the clear button for the autocomplete input should show
 *     up or not. When `md-floating-label` is set, defaults to false, defaults to true otherwise.
 * @param {boolean=} md-autofocus If true, the autocomplete will be automatically focused when a
 *     `$mdDialog`, `$mdBottomsheet` or `$mdSidenav`, which contains the autocomplete, is opening.
 *     <br/><br/>
 *     Also the autocomplete will immediately focus the input element.
 * @param {boolean=} md-no-asterisk When present, asterisk will not be appended to the floating
 *     label.
 * @param {boolean=} md-autoselect If set to true, the first item will be automatically selected
 *     in the dropdown upon open.
 * @param {string=} md-input-name The name attribute given to the input element to be used with
 *     FormController.
 * @param {string=} md-menu-class This class will be applied to the dropdown menu for styling.
 * @param {string=} md-menu-container-class This class will be applied to the parent container
 *     of the dropdown panel.
 * @param {string=} md-input-class This will be applied to the input for styling. This attribute
 *     is only valid when a `md-floating-label` is defined.
 * @param {string=} md-floating-label This will add a floating label to autocomplete and wrap it in
 *     `md-input-container`.
 * @param {string=} md-select-on-focus When present the input's text will be automatically selected
 *     on focus.
 * @param {string=} md-input-id An ID to be added to the input element.
 * @param {number=} md-input-minlength The minimum length for the input's value for validation.
 * @param {number=} md-input-maxlength The maximum length for the input's value for validation.
 * @param {boolean=} md-select-on-match When set, autocomplete will automatically select
 *     the item if the search text is an exact match. <br/><br/>
 *     An exact match is when only one match is displayed.
 * @param {boolean=} md-match-case-insensitive When set and using `md-select-on-match`, autocomplete
 *     will select on case-insensitive match.
 * @param {string=} md-escape-options Override escape key logic. Default is `blur clear`.<br/>
 *     Options: `blur`, `clear`, `none`.
 * @param {string=} md-dropdown-items Specifies the maximum amount of items to be shown in
 *     the dropdown.<br/><br/>
 *     When the dropdown doesn't fit into the viewport, the dropdown will shrink
 *     as much as possible.
 * @param {string=} md-dropdown-position Overrides the default dropdown position. Options: `top`,
 *    `bottom`.
 * @param {string=} input-aria-describedby A space-separated list of element IDs. This should
 *     contain the IDs of any elements that describe this autocomplete. Screen readers will read the
 *     content of these elements at the end of announcing that the autocomplete has been selected
 *     and describing its current state. The descriptive elements do not need to be visible on the
 *     page.
 * @param {string=} input-aria-labelledby A space-separated list of element IDs. The ideal use case
 *     is that this would contain the ID of a `<label>` element that is associated with this
 *     autocomplete. This will only have affect when `md-floating-label` is not defined.<br><br>
 *     For `<label id="state">US State</label>`, you would set this to
 *     `input-aria-labelledby="state"`.
 * @param {string=} input-aria-label A label that will be applied to the autocomplete's input.
 *    This will be announced by screen readers before the placeholder.
 *    This will only have affect when `md-floating-label` is not defined. If you define both
 *    `input-aria-label` and `input-aria-labelledby`, then `input-aria-label` will take precedence.
 * @param {string=} md-selected-message Attribute to specify the text that the screen reader will
 *    announce after a value is selected. Default is: "selected". If `Alaska` is selected in the
 *    options panel, it will read "Alaska selected". You will want to override this when your app
 *    is running in a non-English locale.
 * @param {boolean=} ng-trim If set to false, the search text will be not trimmed automatically.
 *     Defaults to true.
 * @param {string=} ng-pattern Adds the pattern validator to the ngModel of the search text.
 *     See the [ngPattern Directive](https://docs.angularjs.org/api/ng/directive/ngPattern)
 *     for more details.
 * @param {string=} md-mode Specify the repeat mode for suggestion lists. Acceptable values include
 *     `virtual` (md-virtual-repeat) and `standard` (ng-repeat). See the
 *     `Specifying Repeat Mode` example for mode details. Default is `virtual`.
 *
 * @usage
 * ### Basic Example
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in getMatches(searchText)"
 *       md-item-text="item.display">
 *     <span md-highlight-text="searchText">{{item.display}}</span>
 *   </md-autocomplete>
 * </hljs>
 *
 * ### Example with "not found" message
 * <hljs lang="html">
 * <md-autocomplete
 *     md-selected-item="selectedItem"
 *     md-search-text="searchText"
 *     md-items="item in getMatches(searchText)"
 *     md-item-text="item.display">
 *   <md-item-template>
 *     <span md-highlight-text="searchText">{{item.display}}</span>
 *   </md-item-template>
 *   <md-not-found>
 *     No matches found.
 *   </md-not-found>
 * </md-autocomplete>
 * </hljs>
 *
 * In this example, our code utilizes `md-item-template` and `md-not-found` to specify the
 *     different parts that make up our component.
 *
 * ### Clear button for the input
 * By default, the clear button is displayed when there is input. This aligns with the spec's
 * [Search Pattern](https://material.io/archive/guidelines/patterns/search.html#search-in-app-search).
 * In floating label mode, when `md-floating-label="My Label"` is applied, the clear button is not
 * displayed by default (see the spec's
 * [Autocomplete Text Field](https://material.io/archive/guidelines/components/text-fields.html#text-fields-layout)).
 *
 * Nevertheless, developers are able to explicitly toggle the clear button for all autocomplete
 * components with `md-clear-button`.
 *
 * <hljs lang="html">
 *   <md-autocomplete ... md-clear-button="true"></md-autocomplete>
 *   <md-autocomplete ... md-clear-button="false"></md-autocomplete>
 * </hljs>
 *
 * In previous versions, the clear button was always hidden when the component was disabled.
 * This changed in `1.1.5` to give the developer control of this behavior. This example
 * will hide the clear button only when the component is disabled.
 *
 * <hljs lang="html">
 *   <md-autocomplete ... ng-disabled="disabled" md-clear-button="!disabled"></md-autocomplete>
 * </hljs>
 *
 * ### Example with validation
 * <hljs lang="html">
 * <form name="autocompleteForm">
 *   <md-autocomplete
 *       required
 *       md-input-name="autocomplete"
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in getMatches(searchText)"
 *       md-item-text="item.display">
 *     <md-item-template>
 *       <span md-highlight-text="searchText">{{item.display}}</span>
 *     </md-item-template>
 *     <div ng-messages="autocompleteForm.autocomplete.$error">
 *       <div ng-message="required">This field is required</div>
 *     </div>
 *   </md-autocomplete>
 * </form>
 * </hljs>
 *
 * In this example, our code utilizes `md-item-template` and `ng-messages` to specify
 *     input validation for the field.
 *
 * ### Asynchronous Results
 * The autocomplete items expression also supports promises, which will resolve with the query
 * results.
 *
 * <hljs lang="js">
 *   function AppController($scope, $http) {
 *     $scope.query = function(searchText) {
 *       return $http
 *         .get(BACKEND_URL + '/items/' + searchText)
 *         .then(function(data) {
 *           // Map the response object to the data object.
 *           return data;
 *         });
 *     };
 *   }
 * </hljs>
 *
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in query(searchText)">
 *     <md-item-template>
 *       <span md-highlight-text="searchText">{{item}}</span>
 *     </md-item-template>
 * </md-autocomplete>
 * </hljs>
 *
 * ### Specifying Repeat Mode
 * You can use `md-mode` to specify whether to use standard or virtual lists for
 * rendering autocomplete options.
 * The `md-mode` accepts two values:
 * - `virtual` (default) Uses `md-virtual-repeat` to render list items. Virtual
 *    mode requires you to have consistent heights for all suggestions.
 * - `standard` uses `ng-repeat` to render list items. This allows you to have
 *    options of varying heights.
 *
 * Note that using 'standard' mode will require you to address any list
 * performance issues (e.g. pagination) separately within your application.
 *
 * <hljs lang="html">
 *   <md-autocomplete
 *       md-selected-item="selectedItem"
 *       md-search-text="searchText"
 *       md-items="item in getMatches(searchText)"
 *       md-item-text="item.display"
 *       md-mode="standard">
 *     <span md-highlight-text="searchText">{{item.display}}</span>
 *   </md-autocomplete>
 * </hljs>
 */
function MdAutocomplete ($$mdSvgRegistry) {
  var REPEAT_STANDARD = 'standard';
  var REPEAT_VIRTUAL = 'virtual';
  var REPEAT_MODES = [REPEAT_STANDARD, REPEAT_VIRTUAL];

  /** get a valid repeat mode from an md-mode attribute string. */
  function getRepeatMode(modeStr) {
    if (!modeStr) { return REPEAT_VIRTUAL; }
    modeStr = modeStr.toLowerCase();
    return  REPEAT_MODES.indexOf(modeStr) > -1 ? modeStr : REPEAT_VIRTUAL;
  }

  return {
    controller:   'MdAutocompleteCtrl',
    controllerAs: '$mdAutocompleteCtrl',
    scope:        {
      inputName:          '@mdInputName',
      inputMinlength:     '@mdInputMinlength',
      inputMaxlength:     '@mdInputMaxlength',
      searchText:         '=?mdSearchText',
      selectedItem:       '=?mdSelectedItem',
      itemsExpr:          '@mdItems',
      itemText:           '&mdItemText',
      placeholder:        '@placeholder',
      inputAriaDescribedBy: '@?inputAriaDescribedby',
      inputAriaLabelledBy: '@?inputAriaLabelledby',
      inputAriaLabel:     '@?inputAriaLabel',
      noCache:            '=?mdNoCache',
      requireMatch:       '=?mdRequireMatch',
      selectOnMatch:      '=?mdSelectOnMatch',
      matchInsensitive:   '=?mdMatchCaseInsensitive',
      itemChange:         '&?mdSelectedItemChange',
      textChange:         '&?mdSearchTextChange',
      minLength:          '=?mdMinLength',
      delay:              '=?mdDelay',
      autofocus:          '=?mdAutofocus',
      floatingLabel:      '@?mdFloatingLabel',
      autoselect:         '=?mdAutoselect',
      menuClass:          '@?mdMenuClass',
      menuContainerClass: '@?mdMenuContainerClass',
      inputClass:         '@?mdInputClass',
      inputId:            '@?mdInputId',
      escapeOptions:      '@?mdEscapeOptions',
      dropdownItems:      '=?mdDropdownItems',
      dropdownPosition:   '@?mdDropdownPosition',
      clearButton:        '=?mdClearButton',
      selectedMessage:    '@?mdSelectedMessage',
      mdMode: '=?mdMode'
    },
    compile: function(tElement, tAttrs) {
      var attributes = ['md-select-on-focus', 'md-no-asterisk', 'ng-trim', 'ng-pattern'];
      var input = tElement.find('input');

      attributes.forEach(function(attribute) {
        var attrValue = tAttrs[tAttrs.$normalize(attribute)];

        if (attrValue !== null) {
          input.attr(attribute, attrValue);
        }
      });

      return function(scope, element, attrs, ctrl) {
        // Retrieve the state of using a md-not-found template by using our attribute, which will
        // be added to the element in the template function.
        ctrl.hasNotFound = !!element.attr('md-has-not-found');

        // By default the inset autocomplete should show the clear button when not explicitly
        // overwritten or in floating label mode.
        if (!angular.isDefined(attrs.mdClearButton) && !scope.floatingLabel) {
          scope.clearButton = true;
        }

        scope.mdMode = getRepeatMode(attrs.mdMode);

        // Stop click events from bubbling up to the document and triggering a flicker of the
        // options panel while still supporting ng-click to be placed on md-autocomplete.
        element.on('click touchstart touchend', function(event) {
          event.stopPropagation();
        });
      };
    },
    template: function (element, attr) {
      var noItemsTemplate = getNoItemsTemplate(),
          itemTemplate    = getItemTemplate(),
          leftover        = element.html(),
          tabindex        = attr.tabindex;

      // Set our attribute for the link function above which runs later.
      // We will set an attribute, because otherwise the stored variables will be trashed when
      // removing the element is hidden while retrieving the template. For example when using ngIf.
      if (noItemsTemplate) element.attr('md-has-not-found', true);

      // Always set our tabindex of the autocomplete directive to -1, because our input
      // will hold the actual tabindex.
      element.attr('tabindex', '-1');

      return '\
        <md-autocomplete-wrap\
            ng-class="{ \'md-whiteframe-z1\': !floatingLabel, \
                        \'md-menu-showing\': !$mdAutocompleteCtrl.hidden, \
                        \'md-show-clear-button\': !!clearButton }">\
          ' + getInputElement() + '\
          ' + getClearButton() + '\
          <md-progress-linear\
              class="' + (attr.mdFloatingLabel ? 'md-inline' : '') + '"\
              ng-if="$mdAutocompleteCtrl.loadingIsVisible()"\
              md-mode="indeterminate"></md-progress-linear>\
          ' + getContainer(attr.mdMenuContainerClass, attr.mdMode) + '\
            <ul class="md-autocomplete-suggestions"\
                ng-class="::menuClass"\
                id="ul-{{$mdAutocompleteCtrl.id}}"\
                ng-mouseup="$mdAutocompleteCtrl.focusInput()"\
                role="listbox">\
              <li class="md-autocomplete-suggestion" ' + getRepeatType(attr.mdMode) + ' ="item in $mdAutocompleteCtrl.matches"\
                  ng-class="{ selected: $index === $mdAutocompleteCtrl.index }"\
                  ng-attr-id="{{\'md-option-\' + $mdAutocompleteCtrl.id + \'-\' + $index}}"\
                  ng-click="$mdAutocompleteCtrl.select($index)"\
                  role="option"\
                  aria-setsize="{{$mdAutocompleteCtrl.matches.length}}"\
                  aria-posinset="{{$index+1}}"\
                  aria-selected="{{$index === $mdAutocompleteCtrl.index ? true : false}}" \
                  md-extra-name="$mdAutocompleteCtrl.itemName">\
                  ' + itemTemplate + '\
                  </li>' + noItemsTemplate + '\
            </ul>\
          '  + getContainerClosingTags(attr.mdMode) + '\
        </md-autocomplete-wrap>';

      function getItemTemplate() {
        var templateTag = element.find('md-item-template').detach(),
            html = templateTag.length ? templateTag.html() : element.html();
        if (!templateTag.length) element.empty();
        return '<md-autocomplete-parent-scope md-autocomplete-replace>' + html +
               '</md-autocomplete-parent-scope>';
      }

      function getNoItemsTemplate() {
        var templateTag = element.find('md-not-found').detach(),
            template = templateTag.length ? templateTag.html() : '';
        return template
            ? '<li ng-if="$mdAutocompleteCtrl.notFoundVisible()" class="md-autocomplete-suggestion"\
                         md-autocomplete-parent-scope>' + template + '</li>'
            : '';
      }

      function getContainer(menuContainerClass, repeatMode) {
        // prepend a space if needed
        menuContainerClass = menuContainerClass ? ' ' + menuContainerClass : '';

        if (isVirtualRepeatDisabled(repeatMode)) {
          return '\
            <div \
                ng-hide="$mdAutocompleteCtrl.hidden"\
                class="md-standard-list-container md-autocomplete-suggestions-container md-whiteframe-z1' + menuContainerClass + '"\
                ng-class="{ \'md-not-found\': $mdAutocompleteCtrl.notFoundVisible() }"\
                ng-mouseenter="$mdAutocompleteCtrl.listEnter()"\
                ng-mouseleave="$mdAutocompleteCtrl.listLeave()"\
                role="presentation">\
              <div class="md-standard-list-scroller" role="presentation">';
        }

        return '\
          <md-virtual-repeat-container\
              md-auto-shrink\
              md-auto-shrink-min="1"\
              ng-hide="$mdAutocompleteCtrl.hidden"\
              class="md-virtual-repeat-container md-autocomplete-suggestions-container md-whiteframe-z1' + menuContainerClass + '"\
              ng-class="{ \'md-not-found\': $mdAutocompleteCtrl.notFoundVisible() }"\
              ng-mouseenter="$mdAutocompleteCtrl.listEnter()"\
              ng-mouseleave="$mdAutocompleteCtrl.listLeave()"\
              role="presentation">';
      }

      function getContainerClosingTags(repeatMode) {
        return isVirtualRepeatDisabled(repeatMode) ?
            '   </div>\
              </div>\
            </div>' : '</md-virtual-repeat-container>';
      }

      function getRepeatType(repeatMode) {
        return isVirtualRepeatDisabled(repeatMode)  ?
          'ng-repeat' : 'md-virtual-repeat';
      }

      function isVirtualRepeatDisabled(repeatMode) {
        // ensure we have a valid repeat mode
        var correctedRepeatMode = getRepeatMode(repeatMode);
        return correctedRepeatMode !== REPEAT_VIRTUAL;
      }

      function getInputElement () {
        if (attr.mdFloatingLabel) {
          return '\
            <md-input-container ng-if="floatingLabel">\
              <label>{{floatingLabel}}</label>\
              <input type="text"\
                ' + (tabindex != null ? 'tabindex="' + tabindex + '"' : '') + '\
                id="{{inputId || \'fl-input-\' + $mdAutocompleteCtrl.id}}"\
                name="{{inputName || \'fl-input-\' + $mdAutocompleteCtrl.id }}"\
                ng-class="::inputClass"\
                autocomplete="off"\
                ng-required="$mdAutocompleteCtrl.isRequired"\
                ng-readonly="$mdAutocompleteCtrl.isReadonly"\
                ng-minlength="inputMinlength"\
                ng-maxlength="inputMaxlength"\
                ng-disabled="$mdAutocompleteCtrl.isDisabled"\
                ng-model="$mdAutocompleteCtrl.scope.searchText"\
                ng-model-options="{ allowInvalid: true }"\
                ng-mousedown="$mdAutocompleteCtrl.focusInput()"\
                ng-keydown="$mdAutocompleteCtrl.keydown($event)"\
                ng-blur="$mdAutocompleteCtrl.blur($event)"\
                ng-focus="$mdAutocompleteCtrl.focus($event)"\
                aria-label="{{floatingLabel}}"\
                ng-attr-aria-autocomplete="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'list\'}}"\
                ng-attr-role="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'combobox\'}}"\
                aria-haspopup="{{!$mdAutocompleteCtrl.isDisabled}}"\
                aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"\
                ng-attr-aria-owns="{{$mdAutocompleteCtrl.hidden || $mdAutocompleteCtrl.isDisabled ? undefined : \'ul-\' + $mdAutocompleteCtrl.id}}"\
                ng-attr-aria-activedescendant="{{!$mdAutocompleteCtrl.hidden && $mdAutocompleteCtrl.activeOption ? $mdAutocompleteCtrl.activeOption : undefined}}">\
              <div md-autocomplete-parent-scope md-autocomplete-replace>' + leftover + '</div>\
            </md-input-container>';
        } else {
          return '\
            <input type="text"\
              ' + (tabindex != null ? 'tabindex="' + tabindex + '"' : '') + '\
              id="{{inputId || \'input-\' + $mdAutocompleteCtrl.id}}"\
              name="{{inputName || \'input-\' + $mdAutocompleteCtrl.id }}"\
              ng-class="::inputClass"\
              ng-if="!floatingLabel"\
              autocomplete="off"\
              ng-required="$mdAutocompleteCtrl.isRequired"\
              ng-disabled="$mdAutocompleteCtrl.isDisabled"\
              ng-readonly="$mdAutocompleteCtrl.isReadonly"\
              ng-minlength="inputMinlength"\
              ng-maxlength="inputMaxlength"\
              ng-model="$mdAutocompleteCtrl.scope.searchText"\
              ng-mousedown="$mdAutocompleteCtrl.focusInput()"\
              ng-keydown="$mdAutocompleteCtrl.keydown($event)"\
              ng-blur="$mdAutocompleteCtrl.blur($event)"\
              ng-focus="$mdAutocompleteCtrl.focus($event)"\
              placeholder="{{placeholder}}"\
              aria-label="{{placeholder}}"\
              ng-attr-aria-autocomplete="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'list\'}}"\
              ng-attr-role="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'combobox\'}}"\
              aria-haspopup="{{!$mdAutocompleteCtrl.isDisabled}}"\
              aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"\
              ng-attr-aria-owns="{{$mdAutocompleteCtrl.hidden || $mdAutocompleteCtrl.isDisabled ? undefined : \'ul-\' + $mdAutocompleteCtrl.id}}"\
              ng-attr-aria-activedescendant="{{!$mdAutocompleteCtrl.hidden && $mdAutocompleteCtrl.activeOption ? $mdAutocompleteCtrl.activeOption : undefined}}">';
        }
      }

      function getClearButton() {
        return '' +
          '<button ' +
              'type="button" ' +
              'aria-label="Clear Input" ' +
              'tabindex="0" ' +
              'ng-if="clearButton && $mdAutocompleteCtrl.scope.searchText" ' +
              'ng-click="$mdAutocompleteCtrl.clear($event)">' +
            '<md-icon md-svg-src="' + $$mdSvgRegistry.mdClose + '"></md-icon>' +
          '</button>';
        }
    }
  };
}

})();
(function(){
"use strict";


MdAutocompleteItemScopeDirective.$inject = ["$compile", "$mdUtil"];angular
  .module('material.components.autocomplete')
  .directive('mdAutocompleteParentScope', MdAutocompleteItemScopeDirective);

function MdAutocompleteItemScopeDirective($compile, $mdUtil) {
  return {
    restrict: 'AE',
    compile: compile,
    terminal: true,
    transclude: 'element'
  };

  function compile(tElement, tAttr, transclude) {
    return function postLink(scope, element, attr) {
      var ctrl = scope.$mdAutocompleteCtrl;
      var newScope = ctrl.parent.$new();
      var itemName = ctrl.itemName;

      // Watch for changes to our scope's variables and copy them to the new scope
      watchVariable('$index', '$index');
      watchVariable('item', itemName);

      // Ensure that $digest calls on our scope trigger $digest on newScope.
      connectScopes();

      // Link the element against newScope.
      transclude(newScope, function(clone) {
        element.after(clone);
      });

      /**
       * Creates a watcher for variables that are copied from the parent scope
       * @param variable
       * @param alias
       */
      function watchVariable(variable, alias) {
        newScope[alias] = scope[variable];

        scope.$watch(variable, function(value) {
          $mdUtil.nextTick(function() {
            newScope[alias] = value;
          });
        });
      }

      /**
       * Creates watchers on scope and newScope that ensure that for any
       * $digest of scope, newScope is also $digested.
       */
      function connectScopes() {
        var scopeDigesting = false;
        var newScopeDigesting = false;

        scope.$watch(function() {
          if (newScopeDigesting || scopeDigesting) {
            return;
          }

          scopeDigesting = true;
          scope.$$postDigest(function() {
            if (!newScopeDigesting) {
              newScope.$digest();
            }

            scopeDigesting = newScopeDigesting = false;
          });
        });

        newScope.$watch(function() {
          newScopeDigesting = true;
        });
      }
    };
  }
}
})();
(function(){
"use strict";


MdHighlightCtrl.$inject = ["$scope", "$element", "$attrs", "$mdUtil"];angular
    .module('material.components.autocomplete')
    .controller('MdHighlightCtrl', MdHighlightCtrl);

function MdHighlightCtrl ($scope, $element, $attrs, $mdUtil) {
  this.$scope = $scope;
  this.$element = $element;
  this.$attrs = $attrs;
  this.$mdUtil = $mdUtil;

  // Cache the Regex to avoid rebuilding each time.
  this.regex = null;
}

MdHighlightCtrl.prototype.init = function(unsafeTermFn, unsafeContentFn) {

  this.flags = this.$attrs.mdHighlightFlags || '';

  this.unregisterFn = this.$scope.$watch(function($scope) {
    return {
      term: unsafeTermFn($scope),
      contentText: unsafeContentFn($scope)
    };
  }.bind(this), this.onRender.bind(this), true);

  this.$element.on('$destroy', this.unregisterFn);
};

/**
 * Triggered once a new change has been recognized and the highlighted
 * text needs to be updated.
 */
MdHighlightCtrl.prototype.onRender = function(state, prevState) {

  var contentText = state.contentText;

  /* Update the regex if it's outdated, because we don't want to rebuilt it constantly. */
  if (this.regex === null || state.term !== prevState.term) {
    this.regex = this.createRegex(state.term, this.flags);
  }

  /* If a term is available apply the regex to the content */
  if (state.term) {
    this.applyRegex(contentText);
  } else {
    this.$element.text(contentText);
  }

};

/**
 * Decomposes the specified text into different tokens (whether match or not).
 * Breaking down the string guarantees proper XSS protection due to the native browser
 * escaping of unsafe text.
 */
MdHighlightCtrl.prototype.applyRegex = function(text) {
  var tokens = this.resolveTokens(text);

  this.$element.empty();

  tokens.forEach(function (token) {

    if (token.isMatch) {
      var tokenEl = angular.element('<span class="highlight">').text(token.text);

      this.$element.append(tokenEl);
    } else {
      this.$element.append(document.createTextNode(token));
    }

  }.bind(this));

};

  /**
 * Decomposes the specified text into different tokens by running the regex against the text.
 */
MdHighlightCtrl.prototype.resolveTokens = function(string) {
  var tokens = [];
  var lastIndex = 0;

  // Use replace here, because it supports global and single regular expressions at same time.
  string.replace(this.regex, function(match, index) {
    appendToken(lastIndex, index);

    tokens.push({
      text: match,
      isMatch: true
    });

    lastIndex = index + match.length;
  });

  // Append the missing text as a token.
  appendToken(lastIndex);

  return tokens;

  function appendToken(from, to) {
    var targetText = string.slice(from, to);
    targetText && tokens.push(targetText);
  }
};

/** Creates a regex for the specified text with the given flags. */
MdHighlightCtrl.prototype.createRegex = function(term, flags) {
  var startFlag = '', endFlag = '';
  var regexTerm = this.$mdUtil.sanitize(term);

  if (flags.indexOf('^') >= 0) startFlag = '^';
  if (flags.indexOf('$') >= 0) endFlag = '$';

  return new RegExp(startFlag + regexTerm + endFlag, flags.replace(/[$^]/g, ''));
};

})();
(function(){
"use strict";


MdHighlight.$inject = ["$interpolate", "$parse"];angular
    .module('material.components.autocomplete')
    .directive('mdHighlightText', MdHighlight);

/**
 * @ngdoc directive
 * @name mdHighlightText
 * @module material.components.autocomplete
 *
 * @description
 * The `md-highlight-text` directive allows you to specify text that should be highlighted within
 *     an element.  Highlighted text will be wrapped in `<span class="highlight"></span>` which can
 *     be styled through CSS.  Please note that child elements may not be used with this directive.
 *
 * @param {string} md-highlight-text A model to be searched for
 * @param {string=} md-highlight-flags A list of flags (loosely based on JavaScript RexExp flags).
 * #### **Supported flags**:
 * - `g`: Find all matches within the provided text
 * - `i`: Ignore case when searching for matches
 * - `$`: Only match if the text ends with the search term
 * - `^`: Only match if the text begins with the search term
 *
 * @usage
 * <hljs lang="html">
 * <input placeholder="Enter a search term..." ng-model="searchTerm" type="text" />
 * <ul>
 *   <li ng-repeat="result in results" md-highlight-text="searchTerm" md-highlight-flags="i">
 *     {{result.text}}
 *   </li>
 * </ul>
 * </hljs>
 */

function MdHighlight ($interpolate, $parse) {
  return {
    terminal: true,
    controller: 'MdHighlightCtrl',
    compile: function mdHighlightCompile(tElement, tAttr) {
      var termExpr = $parse(tAttr.mdHighlightText);
      var unsafeContentExpr = $interpolate(tElement.html());

      return function mdHighlightLink(scope, element, attr, ctrl) {
        ctrl.init(termExpr, unsafeContentExpr);
      };
    }
  };
}

})();
(function(){
"use strict";

/*
 * @ngdoc module
 * @name material.components.backdrop
 * @description Backdrop
 */

/**
 * @ngdoc directive
 * @name mdBackdrop
 * @module material.components.backdrop
 *
 * @restrict E
 *
 * @description
 * `<md-backdrop>` is a backdrop element used by other components, such as dialog and bottom sheet.
 * Apply class `opaque` to make the backdrop use the theme backdrop color.
 *
 */

angular
  .module('material.components.backdrop', ['material.core'])
  .directive('mdBackdrop', ["$mdTheming", "$mdUtil", "$animate", "$rootElement", "$window", "$log", "$$rAF", "$document", function BackdropDirective($mdTheming, $mdUtil, $animate, $rootElement, $window, $log, $$rAF, $document) {
    var ERROR_CSS_POSITION = '<md-backdrop> may not work properly in a scrolled, static-positioned parent container.';

    return {
      restrict: 'E',
      link: postLink
    };

    function postLink(scope, element, attrs) {
      // backdrop may be outside the $rootElement, tell ngAnimate to animate regardless
      if ($animate.pin) $animate.pin(element, $rootElement);

      var bodyStyles;

      $$rAF(function() {
        // If body scrolling has been disabled using mdUtil.disableBodyScroll(),
        // adjust the 'backdrop' height to account for the fixed 'body' top offset.
        // Note that this can be pretty expensive and is better done inside the $$rAF.
        bodyStyles = $window.getComputedStyle($document[0].body);

        if (bodyStyles.position === 'fixed') {
          var resizeHandler = $mdUtil.debounce(function(){
            bodyStyles = $window.getComputedStyle($document[0].body);
            resize();
          }, 60, null, false);

          resize();
          angular.element($window).on('resize', resizeHandler);

          scope.$on('$destroy', function() {
            angular.element($window).off('resize', resizeHandler);
          });
        }

        // Often $animate.enter() is used to append the backDrop element
        // so let's wait until $animate is done...
        var parent = element.parent();

        if (parent.length) {
          if (parent[0].nodeName === 'BODY') {
            element.css('position', 'fixed');
          }

          var styles = $window.getComputedStyle(parent[0]);

          if (styles.position === 'static') {
            // backdrop uses position:absolute and will not work properly with parent position:static (default)
            $log.warn(ERROR_CSS_POSITION);
          }

          // Only inherit the parent if the backdrop has a parent.
          $mdTheming.inherit(element, parent);
        }
      });

      function resize() {
        var viewportHeight = parseInt(bodyStyles.height, 10) + Math.abs(parseInt(bodyStyles.top, 10));
        element.css('height', viewportHeight + 'px');
      }
    }

  }]);

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.bottomSheet
 * @description
 * BottomSheet
 */
MdBottomSheetDirective.$inject = ["$mdBottomSheet"];
MdBottomSheetProvider.$inject = ["$$interimElementProvider"];
angular
  .module('material.components.bottomSheet', [
    'material.core',
    'material.components.backdrop'
  ])
  .directive('mdBottomSheet', MdBottomSheetDirective)
  .provider('$mdBottomSheet', MdBottomSheetProvider);

/* @ngInject */
function MdBottomSheetDirective($mdBottomSheet) {
  return {
    restrict: 'E',
    link : function postLink(scope, element) {
      element.addClass('_md');     // private md component indicator for styling

      // When navigation force destroys an interimElement, then
      // listen and $destroy() that interim instance...
      scope.$on('$destroy', function() {
        $mdBottomSheet.destroy();
      });
    }
  };
}


/**
 * @ngdoc service
 * @name $mdBottomSheet
 * @module material.components.bottomSheet
 *
 * @description
 * `$mdBottomSheet` opens a bottom sheet over the app and provides a simple promise API.
 *
 * ## Restrictions
 *
 * - The bottom sheet's template must have an outer `<md-bottom-sheet>` element.
 * - Add the `md-grid` class to the bottom sheet for a grid layout.
 * - Add the `md-list` class to the bottom sheet for a list layout.
 *
 * @usage
 * <hljs lang="html">
 * <div ng-controller="MyController">
 *   <md-button ng-click="openBottomSheet()">
 *     Open a Bottom Sheet!
 *   </md-button>
 * </div>
 * </hljs>
 * <hljs lang="js">
 * var app = angular.module('app', ['ngMaterial']);
 * app.controller('MyController', function($scope, $mdBottomSheet) {
 *   $scope.openBottomSheet = function() {
 *     $mdBottomSheet.show({
 *       template: '<md-bottom-sheet>' +
 *       'Hello! <md-button ng-click="closeBottomSheet()">Close</md-button>' +
 *       '</md-bottom-sheet>'
 *     })
 *
 *     // Fires when the hide() method is used
 *     .then(function() {
 *       console.log('You clicked the button to close the bottom sheet!');
 *     })
 *
 *     // Fires when the cancel() method is used
 *     .catch(function() {
 *       console.log('You hit escape or clicked the backdrop to close.');
 *     });
 *   };
 *
 *   $scope.closeBottomSheet = function($scope, $mdBottomSheet) {
 *     $mdBottomSheet.hide();
 *   }
 *
 * });
 * </hljs>
 *
 * ### Custom Presets
 * Developers are also able to create their own preset, which can be easily used without repeating
 * their options each time.
 *
 * <hljs lang="js">
 *   $mdBottomSheetProvider.addPreset('testPreset', {
 *     options: function() {
 *       return {
 *         template:
 *           '<md-bottom-sheet>' +
 *             'This is a custom preset' +
 *           '</md-bottom-sheet>',
 *         controllerAs: 'bottomSheet',
 *         bindToController: true,
 *         clickOutsideToClose: true,
 *         escapeToClose: true
 *       };
 *     }
 *   });
 * </hljs>
 *
 * After you create your preset during the config phase, you can easily access it.
 *
 * <hljs lang="js">
 *   $mdBottomSheet.show(
 *     $mdBottomSheet.testPreset()
 *   );
 * </hljs>
 */

 /**
 * @ngdoc method
 * @name $mdBottomSheet#show
 *
 * @description
 * Show a bottom sheet with the specified options.
 *
 * <em><b>Note:</b> You should <b>always</b> provide a `.catch()` method in case the user hits the
 * `esc` key or clicks the background to close. In this case, the `cancel()` method will
 * automatically be called on the bottom sheet which will `reject()` the promise. See the @usage
 * section above for an example.
 *
 * Newer versions of Angular will throw a `Possibly unhandled rejection` exception if you forget
 * this.</em>
 *
 * @param {object} optionsOrPreset Either provide an `$mdBottomSheetPreset` defined during the config phase or
 * an options object, with the following properties:
 *
 *   - `templateUrl` - `{string=}`: The url of an html template file that will
 *   be used as the content of the bottom sheet. Restrictions: the template must
 *   have an outer `md-bottom-sheet` element.
 *   - `template` - `{string=}`: Same as templateUrl, except this is an actual
 *   template string.
 *   - `scope` - `{object=}`: the scope to link the template / controller to. If none is specified, it will create a new child scope.
 *     This scope will be destroyed when the bottom sheet is removed unless `preserveScope` is set to true.
 *   - `preserveScope` - `{boolean=}`: whether to preserve the scope when the element is removed. Default is false
 *   - `controller` - `{string=}`: The controller to associate with this bottom sheet.
 *   - `locals` - `{string=}`: An object containing key/value pairs. The keys will
 *   be used as names of values to inject into the controller. For example,
 *   `locals: {three: 3}` would inject `three` into the controller with the value
 *   of 3.
 *   - `clickOutsideToClose` - `{boolean=}`: Whether the user can click outside the bottom sheet to
 *     close it. Default true.
 *   - `bindToController` - `{boolean=}`: When set to true, the locals will be bound to the controller instance.
 *   - `disableBackdrop` - `{boolean=}`: When set to true, the bottomsheet will not show a backdrop.
 *   - `escapeToClose` - `{boolean=}`: Whether the user can press escape to close the bottom sheet.
 *     Default true.
 *   - `isLockedOpen` - `{boolean=}`: Disables all default ways of closing the bottom sheet. **Note:** this will override
 *     the `clickOutsideToClose` and `escapeToClose` options, leaving only the `hide` and `cancel`
 *     methods as ways of closing the bottom sheet. Defaults to false.
 *   - `resolve` - `{object=}`: Similar to locals, except it takes promises as values
 *   and the bottom sheet will not open until the promises resolve.
 *   - `controllerAs` - `{string=}`: An alias to assign the controller to on the scope.
 *   - `parent` - `{element=}`: The element to append the bottom sheet to. The `parent` may be a `function`, `string`,
 *   `object`, or null. Defaults to appending to the body of the root element (or the root element) of the application.
 *   e.g. angular.element(document.getElementById('content')) or "#content"
 *   - `disableParentScroll` - `{boolean=}`: Whether to disable scrolling while the bottom sheet is open.
 *     Default true.
 *
 * @returns {promise} A promise that can be resolved with `$mdBottomSheet.hide()` or
 * rejected with `$mdBottomSheet.cancel()`.
 */

/**
 * @ngdoc method
 * @name $mdBottomSheet#hide
 *
 * @description
 * Hide the existing bottom sheet and resolve the promise returned from
 * `$mdBottomSheet.show()`. This call will close the most recently opened/current bottom sheet (if
 * any).
 *
 * <em><b>Note:</b> Use a `.then()` on your `.show()` to handle this callback.</em>
 *
 * @param {*=} response An argument for the resolved promise.
 *
 */

/**
 * @ngdoc method
 * @name $mdBottomSheet#cancel
 *
 * @description
 * Hide the existing bottom sheet and reject the promise returned from
 * `$mdBottomSheet.show()`.
 *
 * <em><b>Note:</b> Use a `.catch()` on your `.show()` to handle this callback.</em>
 *
 * @param {*=} response An argument for the rejected promise.
 *
 */

function MdBottomSheetProvider($$interimElementProvider) {
  // how fast we need to flick down to close the sheet, pixels/ms
  bottomSheetDefaults.$inject = ["$animate", "$mdConstant", "$mdUtil", "$mdTheming", "$mdBottomSheet", "$rootElement", "$mdGesture", "$log"];
  var CLOSING_VELOCITY = 0.5;
  var PADDING = 80; // same as css

  return $$interimElementProvider('$mdBottomSheet')
    .setDefaults({
      methods: ['disableParentScroll', 'escapeToClose', 'clickOutsideToClose'],
      options: bottomSheetDefaults
    });

  /* @ngInject */
  function bottomSheetDefaults($animate, $mdConstant, $mdUtil, $mdTheming, $mdBottomSheet, $rootElement,
                               $mdGesture, $log) {
    var backdrop;

    return {
      themable: true,
      onShow: onShow,
      onRemove: onRemove,
      disableBackdrop: false,
      escapeToClose: true,
      clickOutsideToClose: true,
      disableParentScroll: true,
      isLockedOpen: false
    };


    function onShow(scope, element, options, controller) {

      element = $mdUtil.extractElementByName(element, 'md-bottom-sheet');

      // prevent tab focus or click focus on the bottom-sheet container
      element.attr('tabindex', '-1');

      // Once the md-bottom-sheet has `ng-cloak` applied on his template the opening animation will not work properly.
      // This is a very common problem, so we have to notify the developer about this.
      if (element.hasClass('ng-cloak')) {
        var message = '$mdBottomSheet: using `<md-bottom-sheet ng-cloak>` will affect the bottom-sheet opening animations.';
        $log.warn(message, element[0]);
      }

      if (options.isLockedOpen) {
        options.clickOutsideToClose = false;
        options.escapeToClose = false;
      } else {
        options.cleanupGestures = registerGestures(element, options.parent);
      }

      if (!options.disableBackdrop) {
        // Add a backdrop that will close on click
        backdrop = $mdUtil.createBackdrop(scope, "md-bottom-sheet-backdrop md-opaque");

        // Prevent mouse focus on backdrop; ONLY programmatic focus allowed.
        // This allows clicks on backdrop to propagate to the $rootElement and
        // ESC key events to be detected properly.
        backdrop[0].tabIndex = -1;

        if (options.clickOutsideToClose) {
          backdrop.on('click', function() {
            $mdUtil.nextTick($mdBottomSheet.cancel, true);
          });
        }

        $mdTheming.inherit(backdrop, options.parent);

        $animate.enter(backdrop, options.parent, null);
      }

      $mdTheming.inherit(element, options.parent);

      if (options.disableParentScroll) {
        options.restoreScroll = $mdUtil.disableScrollAround(element, options.parent);
      }

      return $animate.enter(element, options.parent, backdrop)
        .then(function() {
          var focusable = $mdUtil.findFocusTarget(element) || angular.element(
            element[0].querySelector('button') ||
            element[0].querySelector('a') ||
            element[0].querySelector($mdUtil.prefixer('ng-click', true))
          ) || backdrop;

          if (options.escapeToClose) {
            options.rootElementKeyupCallback = function(e) {
              if (e.keyCode === $mdConstant.KEY_CODE.ESCAPE) {
                $mdUtil.nextTick($mdBottomSheet.cancel, true);
              }
            };

            $rootElement.on('keyup', options.rootElementKeyupCallback);
            focusable && focusable.focus();
          }
        });

    }

    function onRemove(scope, element, options) {
      if (!options.disableBackdrop) $animate.leave(backdrop);

      return $animate.leave(element).then(function() {
        if (options.disableParentScroll) {
          options.restoreScroll();
          delete options.restoreScroll;
        }

        options.cleanupGestures && options.cleanupGestures();
      });
    }

    /**
     * Adds the drag gestures to the bottom sheet.
     * @param {angular.JQLite} element where CSS transitions will be applied
     * @param {angular.JQLite} parent used for registering gesture listeners
     * @return {Function} function that removes gesture listeners that were set up by
     *  registerGestures()
     */
    function registerGestures(element, parent) {
      var deregister = $mdGesture.register(parent, 'drag', { horizontal: false });
      parent.on('$md.dragstart', onDragStart)
        .on('$md.drag', onDrag)
        .on('$md.dragend', onDragEnd);

      return function cleanupGestures() {
        deregister();
        parent.off('$md.dragstart', onDragStart);
        parent.off('$md.drag', onDrag);
        parent.off('$md.dragend', onDragEnd);
      };

      function onDragStart() {
        // Disable transitions on transform so that it feels fast
        element.css($mdConstant.CSS.TRANSITION_DURATION, '0ms');
      }

      function onDrag(ev) {
        var transform = ev.pointer.distanceY;
        if (transform < 5) {
          // Slow down drag when trying to drag up, and stop after PADDING
          transform = Math.max(-PADDING, transform / 2);
        }
        element.css($mdConstant.CSS.TRANSFORM, 'translate3d(0,' + (PADDING + transform) + 'px,0)');
      }

      function onDragEnd(ev) {
        if (ev.pointer.distanceY > 0 &&
            (ev.pointer.distanceY > 20 || Math.abs(ev.pointer.velocityY) > CLOSING_VELOCITY)) {
          var distanceRemaining = element.prop('offsetHeight') - ev.pointer.distanceY;
          var transitionDuration = Math.min(distanceRemaining / ev.pointer.velocityY * 0.75, 500);
          element.css($mdConstant.CSS.TRANSITION_DURATION, transitionDuration + 'ms');
          $mdUtil.nextTick($mdBottomSheet.cancel, true);
        } else {
          element.css($mdConstant.CSS.TRANSITION_DURATION, '');
          element.css($mdConstant.CSS.TRANSFORM, '');
        }
      }
    }

  }

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.button
 * @description
 *
 * Button
 */
MdButtonDirective.$inject = ["$mdButtonInkRipple", "$mdTheming", "$mdAria", "$mdInteraction"];
MdAnchorDirective.$inject = ["$mdTheming"];
angular
    .module('material.components.button', ['material.core'])
    .directive('mdButton', MdButtonDirective)
    .directive('a', MdAnchorDirective);


/**
 * @private
 * @restrict E
 *
 * @description
 * `a` is an anchor directive used to inherit theme colors for md-primary, md-accent, etc.
 *
 * @usage
 *
 * <hljs lang="html">
 *  <md-content md-theme="myTheme">
 *    <a href="#chapter1" class="md-accent"></a>
 *  </md-content>
 * </hljs>
 */
function MdAnchorDirective($mdTheming) {
  return {
    restrict : 'E',
    link : function postLink(scope, element) {
      // Make sure to inherit theme so stand-alone anchors
      // support theme colors for md-primary, md-accent, etc.
      $mdTheming(element);
    }
  };
}


/**
 * @ngdoc directive
 * @name mdButton
 * @module material.components.button
 *
 * @restrict E
 *
 * @description
 * `<md-button>` is a button directive with optional ink ripples (default enabled).
 *
 * If you supply a `href` or `ng-href` attribute, it will become an `<a>` element. Otherwise, it
 * will become a `<button>` element. As per the
 * [Material Design specifications](https://material.google.com/style/color.html#color-color-palette)
 * the FAB button background is filled with the accent color [by default]. The primary color palette
 * may be used with the `md-primary` class.
 *
 * Developers can also change the color palette of the button, by using the following classes
 * - `md-primary`
 * - `md-accent`
 * - `md-warn`
 *
 * See for example
 *
 * <hljs lang="html">
 *   <md-button class="md-primary">Primary Button</md-button>
 * </hljs>
 *
 * Button can be also raised, which means that they will use the current color palette to fill the button.
 *
 * <hljs lang="html">
 *   <md-button class="md-accent md-raised">Raised and Accent Button</md-button>
 * </hljs>
 *
 * It is also possible to disable the focus effect on the button, by using the following markup.
 *
 * <hljs lang="html">
 *   <md-button class="md-no-focus">No Focus Style</md-button>
 * </hljs>
 *
 * @param {string=} aria-label Adds alternative text to button for accessibility, useful for icon buttons.
 * If no default text is found, a warning will be logged.
 * @param {boolean=} md-no-ink If present, disable ink ripple effects.
 * @param {string=} md-ripple-size Overrides the default ripple size logic. Options: `full`, `partial`, `auto`.
 * @param {expression=} ng-disabled Disable the button when the expression is truthy.
 * @param {expression=} ng-blur Expression evaluated when focus is removed from the button.
 *
 * @usage
 *
 * Regular buttons:
 *
 * <hljs lang="html">
 *  <md-button> Flat Button </md-button>
 *  <md-button href="http://google.com"> Flat link </md-button>
 *  <md-button class="md-raised"> Raised Button </md-button>
 *  <md-button ng-disabled="true"> Disabled Button </md-button>
 *  <md-button>
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *    Register Now
 *  </md-button>
 * </hljs>
 *
 * FAB buttons:
 *
 * <hljs lang="html">
 *  <md-button class="md-fab" aria-label="FAB">
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *  </md-button>
 *  <!-- mini-FAB -->
 *  <md-button class="md-fab md-mini" aria-label="Mini FAB">
 *    <md-icon md-svg-src="your/icon.svg"></md-icon>
 *  </md-button>
 *  <!-- Button with SVG Icon -->
 *  <md-button class="md-icon-button" aria-label="Custom Icon Button">
 *    <md-icon md-svg-icon="path/to/your.svg"></md-icon>
 *  </md-button>
 * </hljs>
 */
function MdButtonDirective($mdButtonInkRipple, $mdTheming, $mdAria, $mdInteraction) {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: getTemplate,
    link: postLink
  };

  function isAnchor(attr) {
    return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref) || angular.isDefined(attr.ngLink) || angular.isDefined(attr.uiSref);
  }

  function getTemplate(element, attr) {
    if (isAnchor(attr)) {
      return '<a class="md-button" ng-transclude></a>';
    } else {
      // If buttons don't have type="button", they will submit forms automatically.
      var btnType = (typeof attr.type === 'undefined') ? 'button' : attr.type;
      return '<button class="md-button" type="' + btnType + '" ng-transclude></button>';
    }
  }

  function postLink(scope, element, attr) {
    $mdTheming(element);
    $mdButtonInkRipple.attach(scope, element);

    // Use async expect to support possible bindings in the button label
    $mdAria.expectWithoutText(element, 'aria-label');

    // For anchor elements, we have to set tabindex manually when the element is disabled.
    // We don't do this for md-nav-bar anchors as the component manages its own tabindex values.
    if (isAnchor(attr) && angular.isDefined(attr.ngDisabled) &&
        !element.hasClass('_md-nav-button')) {
      scope.$watch(attr.ngDisabled, function(isDisabled) {
        element.attr('tabindex', isDisabled ? -1 : 0);
      });
    }

    // disabling click event when disabled is true
    element.on('click', function(e){
      if (attr.disabled === true) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    if (!element.hasClass('md-no-focus')) {

      element.on('focus', function() {

        // Only show the focus effect when being focused through keyboard interaction or programmatically
        if (!$mdInteraction.isUserInvoked() || $mdInteraction.getLastInteractionType() === 'keyboard') {
          element.addClass('md-focused');
        }

      });

      element.on('blur', function() {
        element.removeClass('md-focused');
      });
    }

  }

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.card
 *
 * @description
 * Card components.
 */
mdCardDirective.$inject = ["$mdTheming"];
angular.module('material.components.card', [
    'material.core'
  ])
  .directive('mdCard', mdCardDirective);


/**
 * @ngdoc directive
 * @name mdCard
 * @module material.components.card
 *
 * @restrict E
 *
 * @description
 * The `<md-card>` directive is a container element used within `<md-content>` containers.
 *
 * An image included as a direct descendant will fill the card's width. If you want to avoid this,
 * you can add the `md-image-no-fill` class to the parent element. The `<md-card-content>`
 * container will wrap text content and provide padding. An `<md-card-footer>` element can be
 * optionally included to put content flush against the bottom edge of the card.
 *
 * Action buttons can be included in an `<md-card-actions>` element, similar to `<md-dialog-actions>`.
 * You can then position buttons using layout attributes.
 *
 * Card is built with:
 * * `<md-card-header>` - Header for the card, holds avatar, text and squared image
 *  - `<md-card-avatar>` - Card avatar
 *    - `md-user-avatar` - Class for user image
 *    - `<md-icon>`
 *  - `<md-card-header-text>` - Contains elements for the card description
 *    - `md-title` - Class for the card title
 *    - `md-subhead` - Class for the card sub header
 * * `<img>` - Image for the card
 * * `<md-card-title>` - Card content title
 *  - `<md-card-title-text>`
 *    - `md-headline` - Class for the card content title
 *    - `md-subhead` - Class for the card content sub header
 *  - `<md-card-title-media>` - Squared image within the title
 *    - `md-media-sm` - Class for small image
 *    - `md-media-md` - Class for medium image
 *    - `md-media-lg` - Class for large image
 *    - `md-media-xl` - Class for extra large image
 * * `<md-card-content>` - Card content
 * * `<md-card-actions>` - Card actions
 *  - `<md-card-icon-actions>` - Icon actions
 *
 * Cards have constant width and variable heights; where the maximum height is limited to what can
 * fit within a single view on a platform, but it can temporarily expand as needed.
 *
 * @usage
 * ### Card with optional footer
 * <hljs lang="html">
 * <md-card>
 *  <img src="card-image.png" class="md-card-image" alt="image caption">
 *  <md-card-content>
 *    <h2>Card headline</h2>
 *    <p>Card content</p>
 *  </md-card-content>
 *  <md-card-footer>
 *    Card footer
 *  </md-card-footer>
 * </md-card>
 * </hljs>
 *
 * ### Card with actions
 * <hljs lang="html">
 * <md-card>
 *  <img src="card-image.png" class="md-card-image" alt="image caption">
 *  <md-card-content>
 *    <h2>Card headline</h2>
 *    <p>Card content</p>
 *  </md-card-content>
 *  <md-card-actions layout="row" layout-align="end center">
 *    <md-button>Action 1</md-button>
 *    <md-button>Action 2</md-button>
 *  </md-card-actions>
 * </md-card>
 * </hljs>
 *
 * ### Card with header, image, title actions and content
 * <hljs lang="html">
 * <md-card>
 *   <md-card-header>
 *     <md-card-avatar>
 *       <img class="md-user-avatar" src="avatar.png"/>
 *     </md-card-avatar>
 *     <md-card-header-text>
 *       <span class="md-title">Title</span>
 *       <span class="md-subhead">Sub header</span>
 *     </md-card-header-text>
 *   </md-card-header>
 *   <img ng-src="card-image.png" class="md-card-image" alt="image caption">
 *   <md-card-title>
 *     <md-card-title-text>
 *       <span class="md-headline">Card headline</span>
 *       <span class="md-subhead">Card subheader</span>
 *     </md-card-title-text>
 *   </md-card-title>
 *   <md-card-actions layout="row" layout-align="start center">
 *     <md-button>Action 1</md-button>
 *     <md-button>Action 2</md-button>
 *     <md-card-icon-actions>
 *       <md-button class="md-icon-button" aria-label="icon">
 *         <md-icon md-svg-icon="icon"></md-icon>
 *       </md-button>
 *     </md-card-icon-actions>
 *   </md-card-actions>
 *   <md-card-content>
 *     <p>
 *      Card content
 *     </p>
 *   </md-card-content>
 * </md-card>
 * </hljs>
 */
function mdCardDirective($mdTheming) {
  return {
    restrict: 'E',
    link: function ($scope, $element, attr) {
      $element.addClass('_md');     // private md component indicator for styling
      $mdTheming($element);
    }
  };
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.checkbox
 * @description Checkbox module!
 */
MdCheckboxDirective.$inject = ["inputDirective", "$mdAria", "$mdConstant", "$mdTheming", "$mdUtil", "$mdInteraction"];
angular
  .module('material.components.checkbox', ['material.core'])
  .directive('mdCheckbox', MdCheckboxDirective);

/**
 * @ngdoc directive
 * @name mdCheckbox
 * @module material.components.checkbox
 * @restrict E
 *
 * @description
 * The checkbox directive is used like the normal
 * [angular checkbox](https://docs.angularjs.org/api/ng/input/input%5Bcheckbox%5D).
 *
 * As per the [Material Design spec](https://material.io/archive/guidelines/style/color.html#color-color-palette)
 * the checkbox is in the accent color by default. The primary color palette may be used with
 * the `md-primary` class.
 *
 * @param {expression} ng-model Assignable angular expression to data-bind to.
 * @param {string=} name Property name of the form under which the control is published.
 * @param {expression=} ng-true-value The value to which the expression should be set when selected.
 * @param {expression=} ng-false-value The value to which the expression should be set when not
 *    selected.
 * @param {expression=} ng-change Expression to be executed when the model value changes.
 * @param {boolean=} md-no-ink If present, disable ink ripple effects.
 * @param {string=} aria-label Adds label to checkbox for accessibility.
 *    Defaults to checkbox's text. If no default text is found, a warning will be logged.
 * @param {expression=} md-indeterminate This determines when the checkbox should be rendered as
 *    'indeterminate'. If a truthy expression or no value is passed in the checkbox renders in the
 *    md-indeterminate state. If falsy expression is passed in it just looks like a normal unchecked
 *    checkbox. The indeterminate, checked, and unchecked states are mutually exclusive. A box
 *    cannot be in any two states at the same time. Adding the 'md-indeterminate' attribute
 *    overrides any checked/unchecked rendering logic. When using the 'md-indeterminate' attribute
 *    use 'ng-checked' to define rendering logic instead of using 'ng-model'.
 * @param {expression=} ng-checked If this expression evaluates as truthy, the 'md-checked' css
 *    class is added to the checkbox and it will appear checked.
 *
 * @usage
 * <hljs lang="html">
 * <md-checkbox ng-model="isChecked" aria-label="Finished?">
 *   Finished ?
 * </md-checkbox>
 *
 * <md-checkbox md-no-ink ng-model="hasInk" aria-label="No Ink Effects">
 *   No Ink Effects
 * </md-checkbox>
 *
 * <md-checkbox ng-disabled="true" ng-model="isDisabled" aria-label="Disabled">
 *   Disabled
 * </md-checkbox>
 *
 * </hljs>
 *
 */
function MdCheckboxDirective(inputDirective, $mdAria, $mdConstant, $mdTheming, $mdUtil, $mdInteraction) {
  inputDirective = inputDirective[0];

  return {
    restrict: 'E',
    transclude: true,
    require: ['^?mdInputContainer', '?ngModel', '?^form'],
    priority: $mdConstant.BEFORE_NG_ARIA,
    template:
      '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox>' +
        '<div class="md-icon"></div>' +
      '</div>' +
      '<div ng-transclude class="md-label"></div>',
    compile: compile
  };

  // **********************************************************
  // Private Methods
  // **********************************************************

  function compile (tElement, tAttrs) {
    tAttrs.$set('tabindex', tAttrs.tabindex || '0');
    tAttrs.$set('type', 'checkbox');
    tAttrs.$set('role', tAttrs.type);

    return  {
      pre: function(scope, element) {
        // Attach a click handler during preLink, in order to immediately stop propagation
        // (especially for ng-click) when the checkbox is disabled.
        element.on('click', function(e) {
          if (this.hasAttribute('disabled')) {
            e.stopImmediatePropagation();
          }
        });
      },
      post: postLink
    };

    function postLink(scope, element, attr, ctrls) {
      var isIndeterminate;
      var containerCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1] || $mdUtil.fakeNgModel();
      var formCtrl = ctrls[2];

      if (containerCtrl) {
        var isErrorGetter = containerCtrl.isErrorGetter || function() {
          return ngModelCtrl.$invalid && (ngModelCtrl.$touched || (formCtrl && formCtrl.$submitted));
        };

        containerCtrl.input = element;

        scope.$watch(isErrorGetter, containerCtrl.setInvalid);
      }

      $mdTheming(element);

      // Redirect focus events to the root element, because IE11 is always focusing the container element instead
      // of the md-checkbox element. This causes issues when using ngModelOptions: `updateOnBlur`
      element.children().on('focus', function() {
        element.focus();
      });

      if ($mdUtil.parseAttributeBoolean(attr.mdIndeterminate)) {
        setIndeterminateState();
        scope.$watch(attr.mdIndeterminate, setIndeterminateState);
      }

      if (attr.ngChecked) {
        scope.$watch(scope.$eval.bind(scope, attr.ngChecked), function(value) {
          ngModelCtrl.$setViewValue(value);
          ngModelCtrl.$render();
        });
      }

      $$watchExpr('ngDisabled', 'tabindex', {
        true: '-1',
        false: attr.tabindex
      });

      $mdAria.expectWithText(element, 'aria-label');

      // Reuse the original input[type=checkbox] directive from AngularJS core.
      // This is a bit hacky as we need our own event listener and own render
      // function.
      inputDirective.link.pre(scope, {
        on: angular.noop,
        0: {}
      }, attr, [ngModelCtrl]);

      element.on('click', listener)
        .on('keypress', keypressHandler)
        .on('focus', function() {
          if ($mdInteraction.getLastInteractionType() === 'keyboard') {
            element.addClass('md-focused');
          }
        })
        .on('blur', function() {
          element.removeClass('md-focused');
        });

      ngModelCtrl.$render = render;

      function $$watchExpr(expr, htmlAttr, valueOpts) {
        if (attr[expr]) {
          scope.$watch(attr[expr], function(val) {
            if (valueOpts[val]) {
              element.attr(htmlAttr, valueOpts[val]);
            }
          });
        }
      }

      /**
       * @param {KeyboardEvent} ev 'keypress' event to handle
       */
      function keypressHandler(ev) {
        var keyCode = ev.which || ev.keyCode;
        var submit, form;

        ev.preventDefault();
        switch (keyCode) {
          case $mdConstant.KEY_CODE.SPACE:
            element.addClass('md-focused');
            listener(ev);
            break;
          case $mdConstant.KEY_CODE.ENTER:
            // Match the behavior of the native <input type="checkbox">.
            // When the enter key is pressed while focusing a native checkbox inside a form,
            // the browser will trigger a `click` on the first non-disabled submit button/input
            // in the form. Note that this is different from text inputs, which
            // will directly submit the form without needing a submit button/input to be present.
            form = $mdUtil.getClosest(ev.target, 'form');
            if (form) {
              submit = form.querySelector('button[type="submit"]:enabled, input[type="submit"]:enabled');
              if (submit) {
                submit.click();
              }
            }
            break;
        }
      }

      function listener(ev) {
        // skipToggle boolean is used by the switch directive to prevent the click event
        // when releasing the drag. There will be always a click if releasing the drag over the checkbox
        if (element[0].hasAttribute('disabled') || scope.skipToggle) {
          return;
        }

        scope.$apply(function() {
          // Toggle the checkbox value...
          var viewValue = attr.ngChecked && attr.ngClick ? attr.checked : !ngModelCtrl.$viewValue;

          ngModelCtrl.$setViewValue(viewValue, ev && ev.type);
          ngModelCtrl.$render();
        });
      }

      function render() {
        // Cast the $viewValue to a boolean since it could be undefined
        element.toggleClass('md-checked', !!ngModelCtrl.$viewValue && !isIndeterminate);
      }

      function setIndeterminateState(newValue) {
        isIndeterminate = newValue !== false;
        if (isIndeterminate) {
          element.attr('aria-checked', 'mixed');
        }
        element.toggleClass('md-indeterminate', isIndeterminate);
      }
    }
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.chips
 */
/*
 * @see js folder for chips implementation
 */
angular.module('material.components.chips', [
  'material.core',
  'material.components.autocomplete'
]);

})();
(function(){
"use strict";


MdChipCtrl.$inject = ["$scope", "$element", "$mdConstant", "$timeout", "$mdUtil"];angular
  .module('material.components.chips')
  .controller('MdChipCtrl', MdChipCtrl);

/**
 * Controller for the MdChip component. Responsible for handling keyboard
 * events and editing the chip if needed.
 *
 * @param $scope
 * @param $element
 * @param $mdConstant
 * @param $timeout
 * @param $mdUtil
 * @constructor
 */
function MdChipCtrl ($scope, $element, $mdConstant, $timeout, $mdUtil) {
  /**
   * @type {$scope}
   */
  this.$scope = $scope;

  /**
   * @type {$element}
   */
  this.$element = $element;

  /**
   * @type {$mdConstant}
   */
  this.$mdConstant = $mdConstant;

  /**
   * @type {$timeout}
   */
  this.$timeout = $timeout;

  /**
   * @type {$mdUtil}
   */
  this.$mdUtil = $mdUtil;

  /**
   * @type {boolean}
   */
  this.isEditing = false;

  /**
   * @type {MdChipsCtrl}
   */
  this.parentController = undefined;

  /**
   * @type {boolean}
   */
  this.enableChipEdit = false;
}


/**
 * @param {MdChipsCtrl} controller
 */
MdChipCtrl.prototype.init = function(controller) {
  this.parentController = controller;
  this.enableChipEdit = this.parentController.enableChipEdit;

  if (this.enableChipEdit) {
    this.$element.on('keydown', this.chipKeyDown.bind(this));
    this.$element.on('dblclick', this.chipMouseDoubleClick.bind(this));
    this.getChipContent().addClass('_md-chip-content-edit-is-enabled');
  }
};


/**
 * @return {Object} first element with the md-chip-content class
 */
MdChipCtrl.prototype.getChipContent = function() {
  var chipContents = this.$element[0].getElementsByClassName('md-chip-content');
  return angular.element(chipContents[0]);
};


/**
 * When editing the chip, if the user modifies the existing contents, we'll get a span back and
 * need to ignore text elements as they only contain blank space.
 * `children()` ignores text elements.
 *
 * When editing the chip, if the user deletes the contents and then enters some new content
 * we'll only get a text element back.
 * @return {Object} jQuery object representing the content element of the chip
 */
MdChipCtrl.prototype.getContentElement = function() {
  var contentElement = angular.element(this.getChipContent().children()[0]);
  if (!contentElement || contentElement.length === 0) {
    contentElement = angular.element(this.getChipContent().contents()[0]);
  }
  return contentElement;
};


/**
 * @return {number} index of this chip
 */
MdChipCtrl.prototype.getChipIndex = function() {
  return parseInt(this.$element.attr('index'));
};


/**
 * Update the chip's contents, focus the chip if it's selected, and exit edit mode.
 * If the contents were updated to be empty, remove the chip and re-focus the input element.
 */
MdChipCtrl.prototype.goOutOfEditMode = function() {
  if (!this.isEditing) {
    return;
  }

  this.isEditing = false;
  this.$element.removeClass('_md-chip-editing');
  this.getChipContent()[0].contentEditable = 'false';
  var chipIndex = this.getChipIndex();

  var content = this.getContentElement().text();
  if (content) {
    this.parentController.updateChipContents(chipIndex, content);

    this.$mdUtil.nextTick(function() {
      if (this.parentController.selectedChip === chipIndex) {
        this.parentController.focusChip(chipIndex);
      }
    }.bind(this));
  } else {
    this.parentController.removeChipAndFocusInput(chipIndex);
  }
};


/**
 * Given an HTML element. Selects contents of it.
 * @param {Element} node
 */
MdChipCtrl.prototype.selectNodeContents = function(node) {
  var range, selection;
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};


/**
 * Presents an input element to edit the contents of the chip.
 */
MdChipCtrl.prototype.goInEditMode = function() {
  this.isEditing = true;
  this.$element.addClass('_md-chip-editing');
  this.getChipContent()[0].contentEditable = 'true';
  this.getChipContent().on('blur', function() {
    this.goOutOfEditMode();
  }.bind(this));

  this.selectNodeContents(this.getChipContent()[0]);
};


/**
 * Handles the keydown event on the chip element. If enable-chip-edit attribute is
 * set to true, space or enter keys can trigger going into edit mode. Enter can also
 * trigger submitting if the chip is already being edited.
 * @param {KeyboardEvent} event
 */
MdChipCtrl.prototype.chipKeyDown = function(event) {
  if (!this.isEditing &&
    (event.keyCode === this.$mdConstant.KEY_CODE.ENTER ||
      event.keyCode === this.$mdConstant.KEY_CODE.SPACE)) {
    event.preventDefault();
    this.goInEditMode();
  } else if (this.isEditing && event.keyCode === this.$mdConstant.KEY_CODE.ENTER) {
    event.preventDefault();
    this.goOutOfEditMode();
  }
};


/**
 * Enter edit mode if we're not already editing and the enable-chip-edit attribute is enabled.
 */
MdChipCtrl.prototype.chipMouseDoubleClick = function() {
  if (this.enableChipEdit && !this.isEditing) {
    this.goInEditMode();
  }
};

})();
(function(){
"use strict";


MdChip.$inject = ["$mdTheming", "$mdUtil", "$compile", "$timeout"];angular
  .module('material.components.chips')
  .directive('mdChip', MdChip);

/**
 * @ngdoc directive
 * @name mdChip
 * @module material.components.chips
 *
 * @description
 * `<md-chip>` is a component used within `<md-chips>`. It is responsible for rendering an
 * individual chip.
 *
 *
 * @usage
 * <hljs lang="html">
 *   <md-chips>
 *     <md-chip>{{$chip}}</md-chip>
 *   </md-chips>
 * </hljs>
 *
 */

/**
 * MDChip Directive Definition
 *
 * @param $mdTheming
 * @param $mdUtil
 * @param $compile
 * @param $timeout
 * @ngInject
 */
function MdChip($mdTheming, $mdUtil, $compile, $timeout) {
  return {
    restrict: 'E',
    require: ['^?mdChips', 'mdChip'],
    link: postLink,
    controller: 'MdChipCtrl'
  };

  function postLink(scope, element, attr, ctrls) {
    var chipsController = ctrls.shift();
    var chipController = ctrls.shift();
    var chipContentElement = angular.element(element[0].querySelector('.md-chip-content'));

    $mdTheming(element);

    if (chipsController) {
      chipController.init(chipsController);

      // When a chip is blurred, make sure to unset (or reset) the selected chip so that tabbing
      // through elements works properly
      chipContentElement.on('blur', function() {
        chipsController.resetSelectedChip();
        chipsController.$scope.$applyAsync();
      });
    }

    // Use $timeout to ensure we run AFTER the element has been added to the DOM so we can focus it.
    $timeout(function() {
      if (!chipsController) {
        return;
      }

      if (chipsController.shouldFocusLastChip) {
        chipsController.focusLastChipThenInput();
      }
    });
  }
}

})();
(function(){
"use strict";


MdChipRemove.$inject = ["$timeout"];angular
    .module('material.components.chips')
    .directive('mdChipRemove', MdChipRemove);

/**
 * @ngdoc directive
 * @name mdChipRemove
 * @restrict A
 * @module material.components.chips
 *
 * @description
 * Indicates that the associated element should be used as the delete button template for all chips.
 * The associated element must be a child of `md-chips`.
 *
 * The provided button template will be appended to each chip and will remove the associated chip
 * on click.
 *
 * The button is not styled or themed based on the theme set on the `md-chips` component. A theme
 * class and custom icon can be specified in your template.
 *
 * You can also specify the `type` of the button in your template.
 *
 * @usage
 * ### With Standard Chips
 * <hljs lang="html">
 *   <md-chips ...>
 *     <button md-chip-remove class="md-primary" type="button" aria-label="Remove {{$chip}}">
 *       <md-icon md-svg-icon="md-close"></md-icon>
 *     </button>
 *   </md-chips>
 * </hljs>
 *
 * ### With Object Chips
 * <hljs lang="html">
 *   <md-chips ...>
 *     <button md-chip-remove class="md-primary" type="button" aria-label="Remove {{$chip.name}}">
 *       <md-icon md-svg-icon="md-close"></md-icon>
 *     </button>
 *   </md-chips>
 * </hljs>
 */


/**
 * MdChipRemove Directive Definition.
 *
 * @param $timeout
 * @returns {{restrict: string, require: string[], link: Function, scope: boolean}}
 * @constructor
 */
function MdChipRemove ($timeout) {
  return {
    restrict: 'A',
    require: '^mdChips',
    scope: false,
    link: postLink
  };

  function postLink(scope, element, attr, ctrl) {
    element.on('click', function(event) {
      scope.$apply(function() {
        ctrl.removeChip(scope.$$replacedScope.$index);
      });
    });

    // Child elements aren't available until after a $timeout tick as they are hidden by an
    // `ng-if`. see http://goo.gl/zIWfuw
    $timeout(function() {
      element.attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
      element.find('button').attr('tabindex', '-1');
    });
  }
}

})();
(function(){
"use strict";


MdChipTransclude.$inject = ["$compile"];angular
    .module('material.components.chips')
    .directive('mdChipTransclude', MdChipTransclude);

function MdChipTransclude ($compile) {
  return {
    restrict: 'EA',
    terminal: true,
    link: link,
    scope: false
  };
  function link (scope, element, attr) {
    var ctrl = scope.$parent.$mdChipsCtrl,
        newScope = ctrl.parent.$new(false, ctrl.parent);
    newScope.$$replacedScope = scope;
    newScope.$chip = scope.$chip;
    newScope.$index = scope.$index;
    newScope.$mdChipsCtrl = ctrl;

    var newHtml = ctrl.$scope.$eval(attr.mdChipTransclude);

    element.html(newHtml);
    $compile(element.contents())(newScope);
  }
}

})();
(function(){
"use strict";

/**
 * The default chip append delay.
 *
 * @type {number}
 */
MdChipsCtrl.$inject = ["$scope", "$attrs", "$mdConstant", "$log", "$element", "$timeout", "$mdUtil", "$mdLiveAnnouncer", "$exceptionHandler"];
var DEFAULT_CHIP_APPEND_DELAY = 300;

angular
    .module('material.components.chips')
    .controller('MdChipsCtrl', MdChipsCtrl);

/**
 * Controller for the MdChips component. Responsible for adding to and
 * removing from the list of chips, marking chips as selected, and binding to
 * the models of various input components.
 *
 * @param $scope
 * @param $attrs
 * @param $mdConstant
 * @param $log
 * @param $element
 * @param $timeout
 * @param $mdUtil
 * @param $mdLiveAnnouncer
 * @param $exceptionHandler
 * @constructor
 */
function MdChipsCtrl ($scope, $attrs, $mdConstant, $log, $element, $timeout, $mdUtil,
                      $mdLiveAnnouncer, $exceptionHandler) {
  /** @type {Function} **/
  this.$timeout = $timeout;

  /** @type {Object} */
  this.$mdConstant = $mdConstant;

  /** @type {angular.$scope} */
  this.$scope = $scope;

  /** @type {angular.$scope} */
  this.parent = $scope.$parent;

  /** @type {$mdUtil} */
  this.$mdUtil = $mdUtil;

  /** @type {$log} */
  this.$log = $log;

  /** @type {$mdLiveAnnouncer} */
  this.$mdLiveAnnouncer = $mdLiveAnnouncer;

  /** @type {$exceptionHandler} */
  this.$exceptionHandler = $exceptionHandler;

  /** @type {$element} */
  this.$element = $element;

  /** @type {$attrs} */
  this.$attrs = $attrs;

  /** @type {angular.NgModelController} */
  this.ngModelCtrl = null;

  /** @type {angular.NgModelController} */
  this.userInputNgModelCtrl = null;

  /** @type {MdAutocompleteCtrl} */
  this.autocompleteCtrl = null;

  /** @type {Element} */
  this.userInputElement = null;

  /** @type {Array.<Object>} */
  this.items = [];

  /** @type {number} */
  this.selectedChip = -1;

  /** @type {string} */
  this.enableChipEdit = $mdUtil.parseAttributeBoolean($attrs.mdEnableChipEdit);

  /** @type {string} */
  this.addOnBlur = $mdUtil.parseAttributeBoolean($attrs.mdAddOnBlur);

  /**
   * The text to be used as the aria-label for the input.
   * @type {string}
   */
  this.inputAriaLabel = 'Chips input.';

  /**
   * Label text to describe the chips container. Used to give context and instructions to screen
   * reader users when the chips container is selected.
   * @type {string}
   */
  this.containerHint = 'Chips container. Use arrow keys to select chips.';

  /**
   * Label text to describe the chips container when it is empty. Used to give context and
   * instructions to screen reader users when the chips container is selected and it contains
   * no chips.
   * @type {string}
   */
  this.containerEmptyHint =
    'Chips container. Enter the text area, then type text, and press enter to add a chip.';

  /**
   * Hidden hint text for how to delete a chip. Used to give context to screen readers.
   * @type {string}
   */
  this.deleteHint = 'Press delete to remove this chip.';

  /**
   * Hidden label for the delete button. Used to give context to screen readers.
   * @type {string}
   */
  this.deleteButtonLabel = 'Remove';

  /**
   * Model used by the input element.
   * @type {string}
   */
  this.chipBuffer = '';

  /**
   * Whether to use the transformChip expression to transform the chip buffer
   * before appending it to the list.
   * @type {boolean}
   */
  this.useTransformChip = false;

  /**
   * Whether to use the onAdd expression to notify of chip additions.
   * @type {boolean}
   */
  this.useOnAdd = false;

  /**
   * Whether to use the onRemove expression to notify of chip removals.
   * @type {boolean}
   */
  this.useOnRemove = false;

  /**
   * The ID of the chips wrapper which is used to build unique IDs for the chips and the aria-owns
   * attribute.
   *
   * Defaults to '_md-chips-wrapper-' plus a unique number.
   *
   * @type {string}
   */
  this.wrapperId = '';

  /**
   * Array of unique numbers which will be auto-generated any time the items change, and is used to
   * create unique IDs for the aria-owns attribute.
   *
   * @type {Array<number>}
   */
  this.contentIds = [];

  /**
   * The index of the chip that should have it's `tabindex` property set to `0` so it is selectable
   * via the keyboard.
   *
   * @type {number|null}
   */
  this.ariaTabIndex = null;

  /**
   * After appending a chip, the chip will be focused for this number of milliseconds before the
   * input is refocused.
   *
   * **Note:** This is **required** for compatibility with certain screen readers in order for
   * them to properly allow keyboard access.
   *
   * @type {number}
   */
  this.chipAppendDelay = DEFAULT_CHIP_APPEND_DELAY;

  /**
   * Collection of functions to call to un-register watchers
   *
   * @type {Array}
   */
  this.deRegister = [];

  /**
   * The screen reader will announce the chip content followed by this message when a chip is added.
   * @type {string}
   */
  this.addedMessage = 'added';

  /**
   * The screen reader will announce the chip content followed by this message when a chip is
   * removed.
   * @type {string}
   */
  this.removedMessage = 'removed';

  this.init();
}

/**
 * Initializes variables and sets up watchers
 */
MdChipsCtrl.prototype.init = function() {
  var ctrl = this;

  // Set the wrapper ID
  this.wrapperId = '_md-chips-wrapper-' + this.$mdUtil.nextUid();

  // If we're using static chips, then we need to initialize a few things.
  if (!this.$element.attr('ng-model')) {
    this.setupStaticChips();
  }

  // Setup a watcher which manages the role and aria-owns attributes.
  // This is never called for static chips since items is not defined.
  this.deRegister.push(
    this.$scope.$watchCollection('$mdChipsCtrl.items', function() {
      // Make sure our input and wrapper have the correct ARIA attributes
      ctrl.setupInputAria();
      ctrl.setupWrapperAria();
    })
  );

  this.deRegister.push(
    this.$attrs.$observe('mdChipAppendDelay', function(newValue) {
      ctrl.chipAppendDelay = parseInt(newValue) || DEFAULT_CHIP_APPEND_DELAY;
    })
  );
};

/**
 * Destructor for cleanup
 */
MdChipsCtrl.prototype.$onDestroy = function $onDestroy() {
  var $destroyFn;
  while (($destroyFn = this.deRegister.pop())) {
    $destroyFn.call(this);
  }
};

/**
 * If we have an input, ensure it has the appropriate ARIA attributes.
 */
MdChipsCtrl.prototype.setupInputAria = function() {
  var input = this.$element.find('input');

  // If we have no input, just return
  if (!input) {
    return;
  }

  input.attr('role', 'textbox');
  input.attr('aria-multiline', true);
  if (this.inputAriaDescribedBy) {
    input.attr('aria-describedby', this.inputAriaDescribedBy);
  }
  if (this.inputAriaLabelledBy) {
    input.attr('aria-labelledby', this.inputAriaLabelledBy);
    input.removeAttr('aria-label');
  } else {
    input.attr('aria-label', this.inputAriaLabel);
  }
};

/**
 * Ensure our wrapper has the appropriate ARIA attributes.
 */
MdChipsCtrl.prototype.setupWrapperAria = function() {
  var ctrl = this,
      wrapper = this.$element.find('md-chips-wrap');

  if (this.items && this.items.length) {
    // Dynamically add the listbox role on every change because it must be removed when there are
    // no items.
    wrapper.attr('role', 'listbox');

    // Generate some random (but unique) IDs for each chip
    this.contentIds = this.items.map(function() {
      return ctrl.wrapperId + '-chip-' + ctrl.$mdUtil.nextUid();
    });

    // Use the contentIDs above to generate the aria-owns attribute
    wrapper.attr('aria-owns', this.contentIds.join(' '));
    wrapper.attr('aria-label', this.containerHint);
  } else {
    // If we have no items, then the role and aria-owns attributes MUST be removed
    wrapper.removeAttr('role');
    wrapper.removeAttr('aria-owns');
    wrapper.attr('aria-label', this.containerEmptyHint);
  }
};

/**
 * Apply specific roles and aria attributes for static chips
 */
MdChipsCtrl.prototype.setupStaticChips = function() {
  var ctrl = this, i, staticChips;
  var wrapper = this.$element.find('md-chips-wrap');

  this.$timeout(function() {
    wrapper.attr('role', 'list');
    staticChips = wrapper[0].children;
    for (i = 0; i < staticChips.length; i++) {
      staticChips[i].setAttribute('role', 'listitem');
      staticChips[i].setAttribute('aria-setsize', staticChips.length);
    }
    if (ctrl.inputAriaDescribedBy) {
      wrapper.attr('aria-describedby', ctrl.inputAriaDescribedBy);
    }
    if (ctrl.inputAriaLabelledBy) {
      wrapper.attr('aria-labelledby', ctrl.inputAriaLabelledBy);
      wrapper.removeAttr('aria-label');
    } else {
      wrapper.attr('aria-label', ctrl.inputAriaLabel);
    }
  }, 10);
};

/**
 * Handles the keydown event on the input element: by default <enter> appends
 * the buffer to the chip list, while backspace removes the last chip in the
 * list if the current buffer is empty.
 * @param {jQuery.Event|KeyboardEvent} event
 */
MdChipsCtrl.prototype.inputKeydown = function(event) {
  var chipBuffer = this.getChipBuffer();

  // If we have an autocomplete, and it handled the event, we have nothing to do
  if (this.autocompleteCtrl && event.isDefaultPrevented && event.isDefaultPrevented()) {
    return;
  }

  if (event.keyCode === this.$mdConstant.KEY_CODE.BACKSPACE) {
    // Only select and focus the previous chip, if the current caret position of the
    // input element is at the beginning.
    if (this.getCursorPosition(event.target) !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (this.items.length) {
      this.selectAndFocusChipSafe(this.items.length - 1);
    }

    return;
  }

  // By default <enter> appends the buffer to the chip list.
  if (!this.separatorKeys || this.separatorKeys.length < 1) {
    this.separatorKeys = [this.$mdConstant.KEY_CODE.ENTER];
  }

  // Support additional separator key codes in an array of `md-separator-keys`.
  if (this.separatorKeys.indexOf(event.keyCode) !== -1) {
    if ((this.autocompleteCtrl && this.requireMatch) || !chipBuffer) return;
    event.preventDefault();

    // Only append the chip and reset the chip buffer if the max chips limit isn't reached.
    if (this.hasMaxChipsReached()) return;

    this.appendChip(chipBuffer.trim());
    this.resetChipBuffer();

    return false;
  }
};

/**
 * Returns the cursor position of the specified input element.
 * @param {HTMLInputElement} element relevant input element
 * @returns {Number} Cursor Position of the input.
 */
MdChipsCtrl.prototype.getCursorPosition = function(element) {
  /*
   * Figure out whether the current input for the chips buffer is valid for using
   * the selectionStart / end property to retrieve the cursor position.
   * Some browsers do not allow the use of those attributes, on different input types.
   */
  try {
    if (element.selectionStart === element.selectionEnd) {
      return element.selectionStart;
    }
  } catch (e) {
    if (!element.value) {
      return 0;
    }
  }
};


/**
 * Updates the content of the chip at given index
 * @param {number} chipIndex
 * @param {string} chipContents
 */
MdChipsCtrl.prototype.updateChipContents = function(chipIndex, chipContents) {
  if (chipIndex >= 0 && chipIndex < this.items.length) {
    this.items[chipIndex] = chipContents;
    this.updateNgModel(true);
  }
};


/**
 * @return {boolean} true if a chip is currently being edited. False otherwise.
 */
MdChipsCtrl.prototype.isEditingChip = function() {
  return !!this.$element[0].querySelector('._md-chip-editing');
};

/**
 * @param {string|Object} chip contents of a single chip
 * @returns {boolean} true if the chip is an Object, false otherwise.
 * @private
 */
MdChipsCtrl.prototype._isChipObject = function(chip) {
  return angular.isObject(chip);
};

/**
 * @returns {boolean} true if chips can be removed, false otherwise.
 */
MdChipsCtrl.prototype.isRemovable = function() {
  // Return false if we have static chips
  if (!this.ngModelCtrl) {
    return false;
  }

  return this.readonly ? this.removable :
         angular.isDefined(this.removable) ? this.removable : true;
};

/**
 * Handles the keydown event on the chip elements: backspace removes the selected chip, arrow
 * keys switch which chip is active.
 * @param {KeyboardEvent} event
 */
MdChipsCtrl.prototype.chipKeydown = function (event) {
  if (this.getChipBuffer()) return;
  if (this.isEditingChip()) return;

  switch (event.keyCode) {
    case this.$mdConstant.KEY_CODE.BACKSPACE:
    case this.$mdConstant.KEY_CODE.DELETE:
      if (this.selectedChip < 0) return;
      event.preventDefault();
      // Cancel the delete action only after the event cancel. Otherwise the page will go back.
      if (!this.isRemovable()) return;
      this.removeAndSelectAdjacentChip(this.selectedChip, event);
      break;
    case this.$mdConstant.KEY_CODE.LEFT_ARROW:
      event.preventDefault();
      // By default, allow selection of -1 which will focus the input; if we're readonly, don't go
      // below 0.
      if (this.selectedChip < 0 || (this.readonly && this.selectedChip === 0)) {
        this.selectedChip = this.items.length;
      }
      if (this.items.length) this.selectAndFocusChipSafe(this.selectedChip - 1);
      break;
    case this.$mdConstant.KEY_CODE.RIGHT_ARROW:
      event.preventDefault();
      this.selectAndFocusChipSafe(this.selectedChip + 1);
      break;
    case this.$mdConstant.KEY_CODE.ESCAPE:
    case this.$mdConstant.KEY_CODE.TAB:
      if (this.selectedChip < 0) return;
      event.preventDefault();
      this.onFocus();
      break;
  }
};

/**
 * Get the input's placeholder - uses `placeholder` when list is empty and `secondary-placeholder`
 * when the list is non-empty. If `secondary-placeholder` is not provided, `placeholder` is used
 * always.
 * @returns {string}
 */
MdChipsCtrl.prototype.getPlaceholder = function() {
  // Allow `secondary-placeholder` to be blank.
  var useSecondary = (this.items && this.items.length &&
      (this.secondaryPlaceholder === '' || this.secondaryPlaceholder));
  return useSecondary ? this.secondaryPlaceholder : this.placeholder;
};

/**
 * Removes chip at {@code index} and selects the adjacent chip.
 * @param {number} index adjacent chip to select
 * @param {Event=} event
 */
MdChipsCtrl.prototype.removeAndSelectAdjacentChip = function(index, event) {
  var self = this;
  var selIndex = self.getAdjacentChipIndex(index);
  var wrap = this.$element[0].querySelector('md-chips-wrap');
  var chip = this.$element[0].querySelector('md-chip[index="' + index + '"]');

  self.removeChip(index, event);

  // The double-timeout is currently necessary to ensure that the DOM has finalized and the select()
  // will find the proper chip since the selection is index-based.
  //
  // TODO: Investigate calling from within chip $scope.$on('$destroy') to reduce/remove timeouts
  self.$timeout(function() {
    self.$timeout(function() {
      self.selectAndFocusChipSafe(selIndex);
    });
  });
};

/**
 * Sets the selected chip index to -1.
 */
MdChipsCtrl.prototype.resetSelectedChip = function() {
  this.selectedChip = -1;
  this.ariaTabIndex = null;
};

/**
 * Gets the index of an adjacent chip to select after deletion. Adjacency is
 * determined as the next chip in the list, unless the target chip is the
 * last in the list, then it is the chip immediately preceding the target. If
 * there is only one item in the list, -1 is returned (select none).
 * The number returned is the index to select AFTER the target has been removed.
 * If the current chip is not selected, then -1 is returned to select none.
 * @param {number} index
 * @returns {number}
 */
MdChipsCtrl.prototype.getAdjacentChipIndex = function(index) {
  var len = this.items.length - 1;
  return (len === 0) ? -1 :
      (index === len) ? index - 1 : index;
};

/**
 * Append the contents of the buffer to the chip list. This method will first
 * call out to the md-transform-chip method, if provided.
 * @param {string} newChip chip buffer contents that will be used to create the new chip
 */
MdChipsCtrl.prototype.appendChip = function(newChip) {
  this.shouldFocusLastChip = !this.addOnBlur;
  if (this.useTransformChip && this.transformChip) {
    var transformedChip = this.transformChip({'$chip': newChip});

    // Check to make sure the chip is defined before assigning it, otherwise, we'll just assume
    // they want the string version.
    if (angular.isDefined(transformedChip)) {
      newChip = transformedChip;
    }
  }

  // If items contains an identical object to newChip, do not append
  if (angular.isObject(newChip)) {
    var identical = this.items.some(function(item) {
      return angular.equals(newChip, item);
    });
    if (identical) return;
  }

  // Check for a null (but not undefined), or existing chip and cancel appending
  if (newChip == null || this.items.indexOf(newChip) + 1) return;

  // Append the new chip onto our list
  var length = this.items.push(newChip);
  var index = length - 1;

  this.updateNgModel();

  // Tell screen reader users that the chip was successfully added.
  // TODO add a way for developers to specify which field of the object should be announced here.
  var chipContent = angular.isObject(newChip) ? '' : newChip;
  this.$mdLiveAnnouncer.announce(chipContent + ' ' + this.addedMessage, 'assertive');

  // If the md-on-add attribute is specified, send a chip addition event
  if (this.useOnAdd && this.onAdd) {
    this.onAdd({ '$chip': newChip, '$index': index });
  }
};

/**
 * Sets whether to use the md-transform-chip expression. This expression is
 * bound to scope and controller in {@code MdChipsDirective} as
 * {@code transformChip}. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useTransformChipExpression = function() {
  this.useTransformChip = true;
};

/**
 * Sets whether to use the md-on-add expression. This expression is
 * bound to scope and controller in {@code MdChipsDirective} as
 * {@code onAdd}. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useOnAddExpression = function() {
  this.useOnAdd = true;
};

/**
 * Sets whether to use the md-on-remove expression. This expression is
 * bound to scope and controller in {@code MdChipsDirective} as
 * {@code onRemove}. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useOnRemoveExpression = function() {
  this.useOnRemove = true;
};

/**
 * Sets whether to use the md-on-select expression. This expression is
 * bound to scope and controller in {@code MdChipsDirective} as
 * {@code onSelect}. Due to the nature of directive scope bindings, the
 * controller cannot know on its own/from the scope whether an expression was
 * actually provided.
 */
MdChipsCtrl.prototype.useOnSelectExpression = function() {
  this.useOnSelect = true;
};

/**
 * Gets the input buffer. The input buffer can be the model bound to the
 * default input item {@code this.chipBuffer}, the {@code selectedItem}
 * model of an {@code md-autocomplete}, or, through some magic, the model
 * bound to any input or text area element found within a
 * {@code md-input-container} element.
 * @return {string} the input buffer
 */
MdChipsCtrl.prototype.getChipBuffer = function() {
  var chipBuffer =  !this.userInputElement ? this.chipBuffer :
                     this.userInputNgModelCtrl ? this.userInputNgModelCtrl.$viewValue :
                     this.userInputElement[0].value;

  // Ensure that the chip buffer is always a string. For example, the input element buffer
  // might be falsy.
  return angular.isString(chipBuffer) ? chipBuffer : '';
};

/**
 * Resets the input buffer for either the internal input or user provided input element.
 */
MdChipsCtrl.prototype.resetChipBuffer = function() {
  if (this.userInputElement) {
    if (this.userInputNgModelCtrl) {
      this.userInputNgModelCtrl.$setViewValue('');
      this.userInputNgModelCtrl.$render();
    } else {
      this.userInputElement[0].value = '';
    }
  } else {
    this.chipBuffer = '';
  }
};

/**
 * @returns {boolean} true if the max chips limit has been reached, false otherwise.
 */
MdChipsCtrl.prototype.hasMaxChipsReached = function() {
  if (angular.isString(this.maxChips)) this.maxChips = parseInt(this.maxChips, 10) || 0;

  return this.maxChips > 0 && this.items.length >= this.maxChips;
};

/**
 * Updates the validity properties for the ngModel.
 *
 * TODO add the md-max-chips validator to this.ngModelCtrl.validators so that the validation will
 * be performed automatically.
 */
MdChipsCtrl.prototype.validateModel = function() {
  this.ngModelCtrl.$setValidity('md-max-chips', !this.hasMaxChipsReached());
  this.ngModelCtrl.$validate(); // rerun any registered validators
};

/**
 * Function to handle updating the model, validation, and change notification when a chip
 * is added, removed, or changed.
 * @param {boolean=} skipValidation true to skip calling validateModel()
 */
MdChipsCtrl.prototype.updateNgModel = function(skipValidation) {
  if (!skipValidation) {
    this.validateModel();
  }
  // This will trigger ng-change to fire, even in cases where $setViewValue() would not.
  angular.forEach(this.ngModelCtrl.$viewChangeListeners, function(listener) {
    try {
      listener();
    } catch (e) {
      this.$exceptionHandler(e);
    }
  });
};

/**
 * Removes the chip at the given index.
 * @param {number} index of chip to remove
 * @param {Event=} event optionally passed to the onRemove callback
 */
MdChipsCtrl.prototype.removeChip = function(index, event) {
  var removed = this.items.splice(index, 1);

  this.updateNgModel();
  this.ngModelCtrl.$setDirty();

  // Tell screen reader users that the chip was successfully removed.
  // TODO add a way for developers to specify which field of the object should be announced here.
  var chipContent = angular.isObject(removed[0]) ? '' : removed[0];
  this.$mdLiveAnnouncer.announce(chipContent + ' ' + this.removedMessage, 'assertive');

  if (removed && removed.length && this.useOnRemove && this.onRemove) {
    this.onRemove({ '$chip': removed[0], '$index': index, '$event': event });
  }
};

/**
 * @param {number} index location of chip to remove
 * @param {Event=} $event
 */
MdChipsCtrl.prototype.removeChipAndFocusInput = function (index, $event) {
  this.removeChip(index, $event);

  if (this.autocompleteCtrl) {
    // Always hide the autocomplete dropdown before focusing the autocomplete input.
    // Wait for the input to move horizontally, because the chip was removed.
    // This can lead to an incorrect dropdown position.
    this.autocompleteCtrl.hidden = true;
    this.$mdUtil.nextTick(this.onFocus.bind(this));
  } else {
    this.onFocus();
  }

};
/**
 * Selects the chip at `index`,
 * @param {number} index location of chip to select and focus
 */
MdChipsCtrl.prototype.selectAndFocusChipSafe = function(index) {
  // If we have no chips, or are asked to select a chip before the first, just focus the input
  if (!this.items.length || index === -1) {
    return this.focusInput();
  }

  // If we are asked to select a chip greater than the number of chips...
  if (index >= this.items.length) {
    if (this.readonly) {
      // If we are readonly, jump back to the start (because we have no input)
      index = 0;
    } else {
      // If we are not readonly, we should attempt to focus the input
      return this.onFocus();
    }
  }

  index = Math.max(index, 0);
  index = Math.min(index, this.items.length - 1);

  this.selectChip(index);
  this.focusChip(index);
};

/**
 * Focus last chip, then focus the input. This is needed for screen reader support.
 */
MdChipsCtrl.prototype.focusLastChipThenInput = function() {
  var ctrl = this;

  ctrl.shouldFocusLastChip = false;

  ctrl.focusChip(this.items.length - 1);

  ctrl.$timeout(function() {
    ctrl.focusInput();
  }, ctrl.chipAppendDelay);
};

/**
 * Focus the input element.
 */
MdChipsCtrl.prototype.focusInput = function() {
  this.selectChip(-1);
  this.onFocus();
};

/**
 * Marks the chip at the given index as selected.
 * @param {number} index location of chip to select
 */
MdChipsCtrl.prototype.selectChip = function(index) {
  if (index >= -1 && index <= this.items.length) {
    this.selectedChip = index;

    // Fire the onSelect if provided
    if (this.useOnSelect && this.onSelect) {
      this.onSelect({'$chip': this.items[index] });
    }
  } else {
    this.$log.warn('Selected Chip index out of bounds; ignoring.');
  }
};

/**
 * Selects the chip at {@code index} and gives it focus.
 * @param {number} index location of chip to select and focus
 * @deprecated use MdChipsCtrl.selectAndFocusChipSafe. Will be removed in 1.2.
 */
MdChipsCtrl.prototype.selectAndFocusChip = function(index) {
  this.selectChip(index);
  if (index !== -1) {
    this.focusChip(index);
  }
};

/**
 * Call {@code focus()} on the chip at {@code index}
 * @param {number} index location of chip to focus
 */
MdChipsCtrl.prototype.focusChip = function(index) {
  var chipContent = this.$element[0].querySelector(
    'md-chip[index="' + index + '"] .md-chip-content'
  );

  this.ariaTabIndex = index;

  chipContent.focus();
};

/**
 * Configures the required interactions with the ngModel Controller.
 * Specifically, set {@code this.items} to the {@code NgModelController#$viewValue}.
 * @param {NgModelController} ngModelCtrl
 */
MdChipsCtrl.prototype.configureNgModel = function(ngModelCtrl) {
  this.ngModelCtrl = ngModelCtrl;

  var self = this;

  // in chips the meaning of $isEmpty changes
  ngModelCtrl.$isEmpty = function(value) {
    return !value || value.length === 0;
  };

  ngModelCtrl.$render = function() {
    // model is updated. do something.
    self.items = self.ngModelCtrl.$viewValue;
  };
};

MdChipsCtrl.prototype.onFocus = function () {
  var input = this.$element[0].querySelector('input');
  input && input.focus();
  this.resetSelectedChip();
};

MdChipsCtrl.prototype.onInputFocus = function () {
  this.inputHasFocus = true;

  // Make sure we have the appropriate ARIA attributes
  this.setupInputAria();

  // Make sure we don't have any chips selected
  this.resetSelectedChip();
};

MdChipsCtrl.prototype.onInputBlur = function () {
  this.inputHasFocus = false;

  if (this.shouldAddOnBlur()) {
    this.appendChip(this.getChipBuffer().trim());
    this.resetChipBuffer();
  }
};

/**
 * Configure event bindings on input element.
 * @param {angular.element} inputElement
 */
MdChipsCtrl.prototype.configureInput = function configureInput(inputElement) {
  // Find the NgModelCtrl for the input element
  var ngModelCtrl = inputElement.controller('ngModel');
  var ctrl = this;

  if (ngModelCtrl) {

    // sync touched-state from inner input to chips-element
    this.deRegister.push(
      this.$scope.$watch(
        function() {
          return ngModelCtrl.$touched;
        },
        function(isTouched) {
          isTouched && ctrl.ngModelCtrl.$setTouched();
        }
      )
    );

    // sync dirty-state from inner input to chips-element
    this.deRegister.push(
      this.$scope.$watch(
        function() {
          return ngModelCtrl.$dirty;
        },
        function(isDirty) {
          isDirty && ctrl.ngModelCtrl.$setDirty();
        }
      )
    );
  }
};

/**
 * Configure event bindings on a user-provided input element.
 * @param {angular.element} inputElement
 */
MdChipsCtrl.prototype.configureUserInput = function(inputElement) {
  this.userInputElement = inputElement;

  // Find the NgModelCtrl for the input element
  var ngModelCtrl = inputElement.controller('ngModel');
  // `.controller` will look in the parent as well.
  if (ngModelCtrl !== this.ngModelCtrl) {
    this.userInputNgModelCtrl = ngModelCtrl;
  }

  var scope = this.$scope;
  var ctrl = this;

  // Run all of the events using evalAsync because a focus may fire a blur in the same digest loop
  var scopeApplyFn = function(event, fn) {
    scope.$evalAsync(angular.bind(ctrl, fn, event));
  };

  // Bind to keydown and focus events of input
  inputElement
      .attr({ tabindex: 0 })
      .on('keydown', function(event) { scopeApplyFn(event, ctrl.inputKeydown); })
      .on('focus', function(event) { scopeApplyFn(event, ctrl.onInputFocus); })
      .on('blur', function(event) { scopeApplyFn(event, ctrl.onInputBlur); });
};

/**
 * @param {MdAutocompleteCtrl} ctrl controller from the autocomplete component
 */
MdChipsCtrl.prototype.configureAutocomplete = function(ctrl) {
  if (ctrl) {
    this.autocompleteCtrl = ctrl;
    // Update the default container empty hint when we're inside of an autocomplete.
    if (!this.$element.attr('container-empty-hint')) {
      this.containerEmptyHint = 'Chips container with autocompletion. Enter the text area, ' +
        'type text to search, and then use the up and down arrow keys to select an option. ' +
        'Press enter to add the selected option as a chip.';
      this.setupWrapperAria();
    }

    ctrl.registerSelectedItemWatcher(angular.bind(this, function (item) {
      if (item) {
        // Only append the chip and reset the chip buffer if the max chips limit isn't reached.
        if (this.hasMaxChipsReached()) return;

        this.appendChip(item);
        this.resetChipBuffer();
      }
    }));

    this.$element.find('input')
        .on('focus',angular.bind(this, this.onInputFocus))
        .on('blur', angular.bind(this, this.onInputBlur));
  }
};

/**
 * @returns {boolean} Whether the current chip buffer should be added on input blur or not.
 */
MdChipsCtrl.prototype.shouldAddOnBlur = function() {

  // Update the custom ngModel validators from the chips component.
  this.validateModel();

  var chipBuffer = this.getChipBuffer().trim();
  // If the model value is empty and required is set on the element, then the model will be invalid.
  // In that case, we still want to allow adding the chip. The main (but not only) case we want
  // to disallow is adding a chip on blur when md-max-chips validation fails.
  var isModelValid = this.ngModelCtrl.$isEmpty(this.ngModelCtrl.$modelValue) ||
    this.ngModelCtrl.$valid;
  var isAutocompleteShowing = this.autocompleteCtrl && !this.autocompleteCtrl.hidden;

  if (this.userInputNgModelCtrl) {
    isModelValid = isModelValid && this.userInputNgModelCtrl.$valid;
  }

  return this.addOnBlur && !this.requireMatch && chipBuffer && isModelValid &&
    !isAutocompleteShowing;
};

/**
 * @returns {boolean} true if the input or a chip is focused. False otherwise.
 */
MdChipsCtrl.prototype.hasFocus = function () {
  return this.inputHasFocus || this.selectedChip >= 0;
};

/**
 * @param {number} index location of content id
 * @returns {number} unique id for the aria-owns attribute
 */
MdChipsCtrl.prototype.contentIdFor = function(index) {
  return this.contentIds[index];
};

})();
(function(){
"use strict";

  
  MdChips.$inject = ["$mdTheming", "$mdUtil", "$compile", "$log", "$timeout", "$$mdSvgRegistry"];angular
      .module('material.components.chips')
      .directive('mdChips', MdChips);

  /**
   * @ngdoc directive
   * @name mdChips
   * @module material.components.chips
   *
   * @description
   * `<md-chips>` is an input component for building lists of strings or objects. The list items are
   * displayed as 'chips'. This component can make use of an `<input>` element or an
   * `<md-autocomplete>` element.
   *
   * ### Custom templates
   * A custom template may be provided to render the content of each chip. This is achieved by
   * specifying an `<md-chip-template>` element containing the custom content as a child of
   * `<md-chips>`.
   *
   * Note: Any attributes on
   * `<md-chip-template>` will be dropped as only the innerHTML is used for the chip template. The
   * variables `$chip` and `$index` are available in the scope of `<md-chip-template>`, representing
   * the chip object and its index in the list of chips, respectively.
   * To override the chip delete control, include an element (ideally a button) with the attribute
   * `md-chip-remove`. A click listener to remove the chip will be added automatically. The element
   * is also placed as a sibling to the chip content (on which there are also click listeners) to
   * avoid a nested ng-click situation.
   *
   * <!-- Note: We no longer want to include this in the site docs; but it should remain here for
   * future developers and those looking at the documentation.
   *
   * <h3> Pending Features </h3>
   * <ul style="padding-left:20px;">
   *
   *   <ul>Style
   *     <li>Colours for hover, press states (ripple?).</li>
   *   </ul>
   *
   *   <ul>Validation
   *     <li>allow a validation callback</li>
   *     <li>highlighting style for invalid chips</li>
   *   </ul>
   *
   *   <ul>Item mutation
   *     <li>Support `
   *       <md-chip-edit>` template, show/hide the edit element on tap/click? double tap/double
   *       click?
   *     </li>
   *   </ul>
   *
   *   <ul>Truncation and Disambiguation (?)
   *     <li>Truncate chip text where possible, but do not truncate entries such that two are
   *     indistinguishable.</li>
   *   </ul>
   *
   *   <ul>Drag and Drop
   *     <li>Drag and drop chips between related `<md-chips>` elements.
   *     </li>
   *   </ul>
   * </ul>
   *
   * //-->
   *
   * Sometimes developers want to limit the amount of possible chips.<br/>
   * You can specify the maximum amount of chips by using the following markup.
   *
   * <hljs lang="html">
   *   <md-chips
   *       ng-model="myItems"
   *       placeholder="Add an item"
   *       md-max-chips="5">
   *   </md-chips>
   * </hljs>
   *
   * In some cases, you have an autocomplete inside of the `md-chips`.<br/>
   * When the maximum amount of chips has been reached, you can also disable the autocomplete
   * selection.<br/>
   * Here is an example markup.
   *
   * <hljs lang="html">
   *   <md-chips ng-model="myItems" md-max-chips="5">
   *     <md-autocomplete ng-hide="myItems.length > 5" ...></md-autocomplete>
   *   </md-chips>
   * </hljs>
   *
   * ### Accessibility
   *
   * The `md-chips` component supports keyboard and screen reader users since Version 1.1.2. In
   * order to achieve this, we modified the chips behavior to select newly appended chips for
   * `300ms` before re-focusing the input and allowing the user to type.
   *
   * For most users, this delay is small enough that it will not be noticeable but allows certain
   * screen readers to function properly (JAWS and NVDA in particular).
   *
   * We introduced a new `md-chip-append-delay` option to allow developers to better control this
   * behavior.
   *
   * Please refer to the documentation of this option (below) for more information.
   *
   * @param {expression} ng-model Assignable AngularJS expression to be data-bound to the list of
   *    chips. The expression should evaluate to a `string` or `Object` Array. The type of this
   *    array should align with the return value of `md-transform-chip`.
   * @param {expression=} ng-change AngularJS expression to be executed on chip addition, removal,
   *    or content change.
   * @param {string=} placeholder Placeholder text that will be forwarded to the input.
   * @param {string=} secondary-placeholder Placeholder text that will be forwarded to the input,
   *    displayed when there is at least one item in the list
   * @param {boolean=} md-removable Enables or disables the deletion of chips through the
   *    removal icon or the Delete/Backspace key. Defaults to true.
   * @param {boolean=} readonly Disables list manipulation (deleting or adding list items), hiding
   *    the input and delete buttons. If no `ng-model` is provided, the chips will automatically be
   *    marked as readonly.<br/><br/>
   *    When `md-removable` is not defined, the `md-remove` behavior will be overwritten and
   *    disabled.
   * @param {boolean=} md-enable-chip-edit Set this to `"true"` to enable editing of chip contents.
   *    The user can go into edit mode by pressing the `space` or `enter` keys, or by double
   *    clicking on the chip. Chip editing is only supported for chips using the basic template.
   *    **Note:** This attribute is only evaluated once; it is not watched.
   * @param {boolean=} ng-required Whether ng-model is allowed to be empty or not.
   * @param {number=} md-max-chips The maximum number of chips allowed to add through user input.
   *    <br/><br/>The validation property `md-max-chips` can be used when the max chips
   *    amount is reached.
   * @param {boolean=} md-add-on-blur When set to `"true"`, the remaining text inside of the input
   *    will be converted into a new chip on blur.
   *    **Note:** This attribute is only evaluated once; it is not watched.
   * @param {expression} md-transform-chip An expression of form `myFunction($chip)` that when
   *    called expects one of the following return values:
   *    - an object representing the `$chip` input string
   *    - `undefined` to simply add the `$chip` input string, or
   *    - `null` to prevent the chip from being appended
   * @param {expression=} md-on-add An expression which will be called when a chip has been
   *    added with `$chip` and `$index` available as parameters.
   * @param {expression=} md-on-remove An expression which will be called when a chip has been
   *    removed with `$chip`, `$index`, and `$event` available as parameters.
   * @param {expression=} md-on-select An expression which will be called when a chip is selected.
   * @param {boolean=} md-require-match If true, and the chips template contains an autocomplete,
   *    only allow selection of pre-defined chips (i.e. you cannot add new ones).
   * @param {string=} input-aria-describedby A space-separated list of element IDs. This should
   *     contain the IDs of any elements that describe this autocomplete. Screen readers will read
   *     the content of these elements at the end of announcing that the chips input has been
   *     selected and describing its current state. The descriptive elements do not need to be
   *     visible on the page.
   * @param {string=} input-aria-labelledby A space-separated list of element IDs. The ideal use
   *    case is that this would contain the ID of a `<label>` element that is associated with these
   *    chips.<br><br>
   *    For `<label id="state">US State</label>`, you would set this to
   *    `input-aria-labelledby="state"`.
   * @param {string=} input-aria-label A string read by screen readers to identify the input.
   *    For static chips, this will be applied to the chips container.
   * @param {string=} container-hint A string read by screen readers informing users of how to
   *    navigate the chips when there are chips. Only applies when `ng-model` is defined.
   * @param {string=} container-empty-hint A string read by screen readers informing users of how to
   *    add chips when there are no chips. You will want to use this to override the default when
   *    in a non-English locale. Only applies when `ng-model` is defined.
   * @param {string=} delete-hint A string read by screen readers instructing users that pressing
   *    the delete key will remove the chip. You will want to use this to override the default when
   *    in a non-English locale.
   * @param {string=} delete-button-label <strong>Deprecated</strong> A label for the delete button.
   *    Used to be read by screen readers.
   * @param {string=} md-removed-message Screen readers will announce this message following the
   *    chips contents. The default is `"removed"`. If a chip with the content of "Apple" was
   *    removed, the screen reader would read "Apple removed". You will want to use this to override
   *    the default when in a non-English locale.
   * @param {string=} md-added-message Screen readers will announce this message following the
   *    chips contents. The default is `"added"`. If a chip with the content of "Apple" was
   *    created, the screen reader would read "Apple added". You will want to use this to override
   *    the default when in a non-English locale.
   * @param {expression=} md-separator-keys An array of key codes used to separate chips.
   * @param {string=} md-chip-append-delay The number of milliseconds that the component will select
   *    a newly appended chip before allowing a user to type into the input. This is **necessary**
   *    for keyboard accessibility for screen readers. It defaults to 300ms and any number less than
   *    300 can cause issues with screen readers (particularly JAWS and sometimes NVDA).
   *
   *    _Available since Version 1.1.2._
   *
   *    **Note:** You can safely set this to `0` in one of the following two instances:
   *
   *    1. You are targeting an iOS or Safari-only application (where users would use VoiceOver) or
   *    only ChromeVox users.
   *
   *    2. If you have utilized the `md-separator-keys` to disable the `enter` keystroke in
   *    favor of another one (such as `,` or `;`).
   *
   * @usage
   * <hljs lang="html">
   *   <md-chips
   *       ng-model="myItems"
   *       placeholder="Add an item"
   *       readonly="isReadOnly">
   *   </md-chips>
   * </hljs>
   *
   * <h3>Validation</h3>
   * When using [ngMessages](https://docs.angularjs.org/api/ngMessages), you can show errors based
   * on our custom validators.
   * <hljs lang="html">
   *   <form name="userForm">
   *     <md-chips
   *       name="fruits"
   *       ng-model="myItems"
   *       placeholder="Add an item"
   *       md-max-chips="5">
   *     </md-chips>
   *     <div ng-messages="userForm.fruits.$error" ng-if="userForm.$dirty">
   *       <div ng-message="md-max-chips">You reached the maximum amount of chips</div>
   *    </div>
   *   </form>
   * </hljs>
   *
   */

  // TODO add a way for developers to specify which field of the object should used in the
  // aria-label.
  var MD_CHIPS_TEMPLATE = '\
      <md-chips-wrap\
          id="{{$mdChipsCtrl.wrapperId}}"\
          tabindex="{{$mdChipsCtrl.readonly ? 0 : -1}}"\
          ng-keydown="$mdChipsCtrl.chipKeydown($event)"\
          ng-class="{ \'md-focused\': $mdChipsCtrl.hasFocus(), \
                      \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly,\
                      \'md-removable\': $mdChipsCtrl.isRemovable() }"\
          class="md-chips">\
        <md-chip ng-repeat="$chip in $mdChipsCtrl.items"\
            index="{{$index}}" \
            ng-class="{\'md-focused\': $mdChipsCtrl.selectedChip == $index, \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly}">\
          <div class="md-chip-content"\
              tabindex="{{$mdChipsCtrl.ariaTabIndex === $index ? 0 : -1}}"\
              id="{{$mdChipsCtrl.contentIdFor($index)}}"\
              role="option"\
              aria-selected="{{$mdChipsCtrl.selectedChip === $index}}"\
              aria-setsize="{{$mdChipsCtrl.items.length}}"\
              aria-posinset="{{$index+1}}"\
              ng-click="!$mdChipsCtrl.readonly && $mdChipsCtrl.focusChip($index)"\
              aria-label="{{$mdChipsCtrl._isChipObject($chip) ? \'\' : $chip + \'. \'}}{{$mdChipsCtrl.isRemovable() ? \'\' + $mdChipsCtrl.deleteHint : \'\'}}" \
              ng-focus="!$mdChipsCtrl.readonly && $mdChipsCtrl.selectChip($index)"\
              md-chip-transclude="$mdChipsCtrl.chipContentsTemplate"></div>\
          <div ng-if="$mdChipsCtrl.isRemovable()"\
               class="md-chip-remove-container"\
               tabindex="-1"\
               md-chip-transclude="$mdChipsCtrl.chipRemoveTemplate"></div>\
        </md-chip>\
        <div class="md-chip-input-container" ng-if="!$mdChipsCtrl.readonly && $mdChipsCtrl.ngModelCtrl">\
          <div md-chip-transclude="$mdChipsCtrl.chipInputTemplate"></div>\
        </div>\
      </md-chips-wrap>';

  var CHIP_INPUT_TEMPLATE = '\
        <input\
            class="md-input"\
            tabindex="0"\
            aria-label="{{$mdChipsCtrl.inputAriaLabel}}"\
            placeholder="{{$mdChipsCtrl.getPlaceholder()}}"\
            ng-model="$mdChipsCtrl.chipBuffer"\
            ng-focus="$mdChipsCtrl.onInputFocus()"\
            ng-blur="$mdChipsCtrl.onInputBlur()"\
            ng-keydown="$mdChipsCtrl.inputKeydown($event)">';

  var CHIP_DEFAULT_TEMPLATE = '\
      <span>{{$chip}}</span>';

  var CHIP_REMOVE_TEMPLATE = '\
      <button\
          class="md-chip-remove"\
          ng-if="$mdChipsCtrl.isRemovable()"\
          ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index, $event)"\
          type="button"\
          tabindex="-1"\
          aria-label="{{$mdChipsCtrl.deleteButtonLabel}}{{$mdChipsCtrl._isChipObject($chip) ? \'\' : \' \' + $chip}}">\
        <md-icon md-svg-src="{{$mdChipsCtrl.mdCloseIcon}}" aria-hidden="true"></md-icon>\
      </button>';

  /**
   * MDChips Directive Definition
   */
  function MdChips ($mdTheming, $mdUtil, $compile, $log, $timeout, $$mdSvgRegistry) {
    // Run our templates through $mdUtil.processTemplate() to allow custom start/end symbols
    var templates = getTemplates();

    return {
      template: function(element, attrs) {
        // Clone the element into an attribute. By prepending the attribute
        // name with '$', AngularJS won't write it into the DOM. The cloned
        // element propagates to the link function via the attrs argument,
        // where various contained-elements can be consumed.
        attrs['$mdUserTemplate'] = element.clone();
        return templates.chips;
      },
      require: ['mdChips'],
      restrict: 'E',
      controller: 'MdChipsCtrl',
      controllerAs: '$mdChipsCtrl',
      bindToController: true,
      compile: compile,
      scope: {
        readonly: '=?readonly',
        removable: '=?mdRemovable',
        placeholder: '@?',
        secondaryPlaceholder: '@?',
        maxChips: '@?mdMaxChips',
        transformChip: '&mdTransformChip',
        onAppend: '&?mdOnAppend',
        onAdd: '&?mdOnAdd',
        onRemove: '&?mdOnRemove',
        addedMessage: '@?mdAddedMessage',
        removedMessage: '@?mdRemovedMessage',
        onSelect: '&?mdOnSelect',
        inputAriaDescribedBy: '@?inputAriaDescribedby',
        inputAriaLabelledBy: '@?inputAriaLabelledby',
        inputAriaLabel: '@?',
        containerHint: '@?',
        containerEmptyHint: '@?',
        deleteHint: '@?',
        deleteButtonLabel: '@?',
        separatorKeys: '=?mdSeparatorKeys',
        requireMatch: '=?mdRequireMatch',
        chipAppendDelayString: '@?mdChipAppendDelay',
        ngChange: '&?'
      }
    };

    /**
     * Builds the final template for `md-chips` and returns the postLink function.
     *
     * Building the template involves 3 key components:
     * static chips
     * chip template
     * input control
     *
     * If no `ng-model` is provided, only the static chip work needs to be done.
     *
     * If no user-passed `md-chip-template` exists, the default template is used. This resulting
     * template is appended to the chip content element.
     *
     * The remove button may be overridden by passing an element with an md-chip-remove attribute.
     *
     * If an `input` or `md-autocomplete` element is provided by the caller, it is set aside for
     * transclusion later. The transclusion happens in `postLink` as the parent scope is required.
     * If no user input is provided, a default one is appended to the input container node in the
     * template.
     *
     * Static Chips (i.e. `md-chip` elements passed from the caller) are gathered and set aside for
     * transclusion in the `postLink` function.
     *
     *
     * @param element
     * @param attr
     * @returns {Function}
     */
    function compile(element, attr) {
      // Grab the user template from attr and reset the attribute to null.
      var userTemplate = attr['$mdUserTemplate'];
      attr['$mdUserTemplate'] = null;

      var chipTemplate = getTemplateByQuery('md-chips>md-chip-template');

      var chipRemoveSelector = $mdUtil
        .prefixer()
        .buildList('md-chip-remove')
        .map(function(attr) {
          return 'md-chips>*[' + attr + ']';
        })
        .join(',');

      // Set the chip remove, chip contents and chip input templates. The link function will put
      // them on the scope for transclusion later.
      var chipRemoveTemplate   = getTemplateByQuery(chipRemoveSelector) || templates.remove,
          chipContentsTemplate = chipTemplate || templates.default,
          chipInputTemplate    = getTemplateByQuery('md-chips>md-autocomplete')
              || getTemplateByQuery('md-chips>input')
              || templates.input,
          staticChips = userTemplate.find('md-chip');

      // Warn of malformed template. See #2545
      if (userTemplate[0].querySelector('md-chip-template>*[md-chip-remove]')) {
        $log.warn('invalid placement of md-chip-remove within md-chip-template.');
      }

      function getTemplateByQuery (query) {
        if (!attr.ngModel) return;
        var element = userTemplate[0].querySelector(query);
        return element && element.outerHTML;
      }

      /**
       * Configures controller and transcludes.
       */
      return function postLink(scope, element, attrs, controllers) {
        $mdUtil.initOptionalProperties(scope, attr);

        $mdTheming(element);
        var mdChipsCtrl = controllers[0];
        if (chipTemplate) {
          // Chip editing functionality assumes we are using the default chip template.
          mdChipsCtrl.enableChipEdit = false;
        }

        mdChipsCtrl.chipContentsTemplate = chipContentsTemplate;
        mdChipsCtrl.chipRemoveTemplate   = chipRemoveTemplate;
        mdChipsCtrl.chipInputTemplate    = chipInputTemplate;

        mdChipsCtrl.mdCloseIcon = $$mdSvgRegistry.mdClose;

        element
            .attr({ tabindex: -1 })
            .on('focus', function () { mdChipsCtrl.onFocus(); })
            .on('click', function () {
              if (!mdChipsCtrl.readonly && mdChipsCtrl.selectedChip === -1) {
                mdChipsCtrl.onFocus();
              }
            });

        if (attr.ngModel) {
          mdChipsCtrl.configureNgModel(element.controller('ngModel'));

          // If an `md-transform-chip` attribute was set, tell the controller to use the expression
          // before appending chips.
          if (attrs.mdTransformChip) mdChipsCtrl.useTransformChipExpression();

          // If an `md-on-append` attribute was set, tell the controller to use the expression
          // when appending chips.
          //
          // TODO: Remove this now that 1.0 is long since released
          // DEPRECATED: Will remove in official 1.0 release
          if (attrs.mdOnAppend) mdChipsCtrl.useOnAppendExpression();

          // If an `md-on-add` attribute was set, tell the controller to use the expression
          // when adding chips.
          if (attrs.mdOnAdd) mdChipsCtrl.useOnAddExpression();

          // If an `md-on-remove` attribute was set, tell the controller to use the expression
          // when removing chips.
          if (attrs.mdOnRemove) mdChipsCtrl.useOnRemoveExpression();

          // If an `md-on-select` attribute was set, tell the controller to use the expression
          // when selecting chips.
          if (attrs.mdOnSelect) mdChipsCtrl.useOnSelectExpression();

          // The md-autocomplete and input elements won't be compiled until after this directive
          // is complete (due to their nested nature). Wait a tick before looking for them to
          // configure the controller.
          if (chipInputTemplate !== templates.input) {
            // The autocomplete will not appear until the readonly attribute is not true (i.e.
            // false or undefined), so we have to watch the readonly and then on the next tick
            // after the chip transclusion has run, we can configure the autocomplete and user
            // input.
            scope.$watch('$mdChipsCtrl.readonly', function(readonly) {
              if (!readonly) {

                $mdUtil.nextTick(function(){

                  if (chipInputTemplate.indexOf('<md-autocomplete') === 0) {
                    var autocompleteEl = element.find('md-autocomplete');
                    mdChipsCtrl.configureAutocomplete(autocompleteEl.controller('mdAutocomplete'));
                  }

                  mdChipsCtrl.configureUserInput(element.find('input'));
                });
              }
            });
          }

          // At the next tick, if we find an input, make sure it has the md-input class
          $mdUtil.nextTick(function() {
            var input = element.find('input');

            if (input) {
              mdChipsCtrl.configureInput(input);
              input.toggleClass('md-input', true);
            }
          });
        }

        // Compile with the parent's scope and prepend any static chips to the wrapper.
        if (staticChips.length > 0) {
          var compiledStaticChips = $compile(staticChips.clone())(scope.$parent);
          $timeout(function() { element.find('md-chips-wrap').prepend(compiledStaticChips); });
        }
      };
    }

    function getTemplates() {
      return {
        chips: $mdUtil.processTemplate(MD_CHIPS_TEMPLATE),
        input: $mdUtil.processTemplate(CHIP_INPUT_TEMPLATE),
        default: $mdUtil.processTemplate(CHIP_DEFAULT_TEMPLATE),
        remove: $mdUtil.processTemplate(CHIP_REMOVE_TEMPLATE)
      };
    }
  }

})();
(function(){
"use strict";


MdContactChipsCtrl.$inject = ["$attrs", "$element", "$timeout"];angular
    .module('material.components.chips')
    .controller('MdContactChipsCtrl', MdContactChipsCtrl);

/**
 * Controller for the MdContactChips component
 * @constructor
 */
function MdContactChipsCtrl ($attrs, $element, $timeout) {
  /** @type {$element} */
  this.$element = $element;

  /** @type {$attrs} */
  this.$attrs = $attrs;

  /** @type {Function} */
  this.$timeout = $timeout;

  /** @type {Object} */
  this.selectedItem = null;

  /** @type {string} */
  this.searchText = '';

  /**
   * Collection of functions to call to un-register watchers
   * @type {Array}
   */
  this.deRegister = [];

  this.init();
}

MdContactChipsCtrl.prototype.init = function() {
  var ctrl = this;
  var deRegister = this.deRegister;
  var element = this.$element;

  // Setup a watcher which manages chips a11y messages and autocomplete aria.
  // Timeout required to allow the child elements to be compiled.
  this.$timeout(function() {
    deRegister.push(
      element.find('md-chips').controller('mdChips').$scope.$watchCollection('$mdChipsCtrl.items', function() {
        // Make sure our input and wrapper have the correct ARIA attributes
        ctrl.setupChipsAria();
        ctrl.setupAutocompleteAria();
      })
    );
  });
};

MdContactChipsCtrl.prototype.setupChipsAria = function() {
  var chips = this.$element.find('md-chips');
  var chipsCtrl = chips.controller('mdChips');

  // Configure MdChipsCtrl
  if (this.removedMessage) {
    chipsCtrl.removedMessage = this.removedMessage;
  }
  if (this.containerHint) {
    chipsCtrl.containerHint = this.containerHint;
  }
  if (this.containerEmptyHint) {
    // Apply attribute to avoid the hint being overridden by MdChipsCtrl.configureAutocomplete()
    chips.attr('container-empty-hint', this.containerEmptyHint);
    chipsCtrl.containerEmptyHint = this.containerEmptyHint;
  }
  if (this.deleteHint) {
    chipsCtrl.deleteHint = this.deleteHint;
  }
  if (this.inputAriaLabel) {
    chipsCtrl.inputAriaLabel = this.inputAriaLabel;
  }
};

MdContactChipsCtrl.prototype.setupAutocompleteAria = function() {
  var autocompleteInput = this.$element.find('md-chips-wrap').find('md-autocomplete').find('input');

  // Set attributes on the input of the md-autocomplete
  if (this.inputAriaDescribedBy) {
    autocompleteInput.attr('aria-describedby', this.inputAriaDescribedBy);
  }
  if (this.inputAriaLabelledBy) {
    autocompleteInput.removeAttr('aria-label');
    autocompleteInput.attr('aria-labelledby', this.inputAriaLabelledBy);
  }
};

MdContactChipsCtrl.prototype.queryContact = function(searchText) {
  return this.contactQuery({'$query': searchText});
};

MdContactChipsCtrl.prototype.inputKeydown = function(event) {
  if (!this.separatorKeys || this.separatorKeys.indexOf(event.keyCode) < 0) {
    return;
  }

  event.stopPropagation();
  event.preventDefault();

  var autocompleteCtrl = angular.element(event.target).controller('mdAutocomplete');
  autocompleteCtrl.select(autocompleteCtrl.index);
};

MdContactChipsCtrl.prototype.itemName = function(item) {
  return item[this.contactName];
};

/**
 * Destructor for cleanup
 */
MdContactChipsCtrl.prototype.$onDestroy = function $onDestroy() {
  var $destroyFn;
  while (($destroyFn = this.deRegister.pop())) {
    $destroyFn.call(this);
  }
};

})();
(function(){
"use strict";


MdContactChips.$inject = ["$mdTheming", "$mdUtil"];angular
  .module('material.components.chips')
  .directive('mdContactChips', MdContactChips);

/**
 * @ngdoc directive
 * @name mdContactChips
 * @module material.components.chips
 *
 * @description
 * `<md-contact-chips>` is an input component based on `md-chips` and makes use of an
 * `md-autocomplete` element. The component allows the caller to supply a query expression which
 * returns  a list of possible contacts. The user can select one of these and add it to the list of
 * chips.
 *
 * You may also use the <a ng-href="api/directive/mdHighlightText">md-highlight-flags</a> attribute
 * along with its parameters to control the appearance of the matched text inside of the contacts'
 * autocomplete popup.
 *
 * @param {expression} ng-model Assignable AngularJS expression to be data-bound to the list of
 *    contact chips. The expression should evaluate to an `Object` Array.
 * @param {expression=} ng-change AngularJS expression to be executed on chip addition, removal,
 *    or content change.
 * @param {string=} placeholder Placeholder text that will be forwarded to the input.
 * @param {string=} secondary-placeholder Placeholder text that will be forwarded to the input,
 *    displayed when there is at least on item in the list
 * @param {expression} md-contacts An expression expected to return contacts matching the search
 *    test, `$query`. If this expression involves a promise, a loading bar is displayed while
 *    waiting for it to resolve.
 * @param {string} md-contact-name The field name of the contact object representing the
 *    contact's name.
 * @param {string} md-contact-email The field name of the contact object representing the
 *    contact's email address.
 * @param {string} md-contact-image The field name of the contact object representing the
 *    contact's image.
 * @param {number=} md-min-length Specifies the minimum length of text before autocomplete will
 *    make suggestions
 * @param {string=} input-aria-describedby A space-separated list of element IDs. This should
 *     contain the IDs of any elements that describe this autocomplete. Screen readers will read
 *     the content of these elements at the end of announcing that the chips input has been
 *     selected and describing its current state. The descriptive elements do not need to be
 *     visible on the page.
 * @param {string=} input-aria-labelledby A space-separated list of element IDs. The ideal use
 *    case is that this would contain the ID of a `<label>` element that is associated with these
 *    chips.<br><br>
 *    For `<label id="state">US State</label>`, you would set this to
 *    `input-aria-labelledby="state"`.
 * @param {string=} input-aria-label A string read by screen readers to identify the input.
 *    For static chips, this will be applied to the chips container.
 * @param {string=} container-hint A string read by screen readers informing users of how to
 *    navigate the chips when there are chips.
 * @param {string=} container-empty-hint A string read by screen readers informing users of how to
 *    add chips when there are no chips. You will want to use this to override the default when
 *    in a non-English locale.
 * @param {string=} delete-hint A string read by screen readers instructing users that pressing
 *    the delete key will remove the chip. You will want to use this to override the default when
 *    in a non-English locale.
 * @param {string=} md-removed-message Screen readers will announce this message following the
 *    chips contents. The default is `"removed"`. If a chip with the content of "Apple" was
 *    removed, the screen reader would read "Apple removed". You will want to use this to override
 *    the default when in a non-English locale.
 *
 *
 * @usage
 * <hljs lang="html">
 *   <md-contact-chips
 *       ng-model="ctrl.contacts"
 *       md-contacts="ctrl.querySearch($query)"
 *       md-contact-name="name"
 *       md-contact-image="image"
 *       md-contact-email="email"
 *       placeholder="To">
 *   </md-contact-chips>
 * </hljs>
 *
 */


var MD_CONTACT_CHIPS_TEMPLATE = '\
      <md-chips class="md-contact-chips"\
          ng-model="$mdContactChipsCtrl.contacts"\
          ng-change="$mdContactChipsCtrl.ngChange($mdContactChipsCtrl.contacts)"\
          md-require-match="$mdContactChipsCtrl.requireMatch"\
          md-chip-append-delay="{{$mdContactChipsCtrl.chipAppendDelay}}"\
          md-separator-keys="$mdContactChipsCtrl.separatorKeys"\
          md-autocomplete-snap>\
          <md-autocomplete\
              md-menu-class="md-contact-chips-suggestions"\
              md-selected-item="$mdContactChipsCtrl.selectedItem"\
              md-search-text="$mdContactChipsCtrl.searchText"\
              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)"\
              md-item-text="$mdContactChipsCtrl.itemName(item)"\
              md-no-cache="true"\
              md-min-length="$mdContactChipsCtrl.minLength"\
              md-autoselect\
              ng-keydown="$mdContactChipsCtrl.inputKeydown($event)"\
              placeholder="{{$mdContactChipsCtrl.contacts.length === 0 ?\
                  $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder}}">\
            <div class="md-contact-suggestion">\
              <img \
                  ng-src="{{item[$mdContactChipsCtrl.contactImage]}}"\
                  alt="{{item[$mdContactChipsCtrl.contactName]}}"\
                  ng-if="item[$mdContactChipsCtrl.contactImage]" />\
              <span class="md-contact-name" md-highlight-text="$mdContactChipsCtrl.searchText"\
                    md-highlight-flags="{{$mdContactChipsCtrl.highlightFlags}}">\
                {{item[$mdContactChipsCtrl.contactName]}}\
              </span>\
              <span class="md-contact-email" >{{item[$mdContactChipsCtrl.contactEmail]}}</span>\
            </div>\
          </md-autocomplete>\
          <md-chip-template>\
            <div class="md-contact-avatar">\
              <img \
                  ng-src="{{$chip[$mdContactChipsCtrl.contactImage]}}"\
                  alt="{{$chip[$mdContactChipsCtrl.contactName]}}"\
                  ng-if="$chip[$mdContactChipsCtrl.contactImage]" />\
            </div>\
            <div class="md-contact-name">\
              {{$chip[$mdContactChipsCtrl.contactName]}}\
            </div>\
          </md-chip-template>\
      </md-chips>';


/**
 * MDContactChips Directive Definition
 *
 * @param $mdTheming
 * @param $mdUtil
 * @returns {*}
 * @ngInject
 */
function MdContactChips($mdTheming, $mdUtil) {
  return {
    template: function(element, attrs) {
      return MD_CONTACT_CHIPS_TEMPLATE;
    },
    restrict: 'E',
    controller: 'MdContactChipsCtrl',
    controllerAs: '$mdContactChipsCtrl',
    bindToController: true,
    compile: compile,
    scope: {
      contactQuery: '&mdContacts',
      placeholder: '@?',
      secondaryPlaceholder: '@?',
      contactName: '@mdContactName',
      contactImage: '@mdContactImage',
      contactEmail: '@mdContactEmail',
      contacts: '=ngModel',
      ngChange: '&?',
      requireMatch: '=?mdRequireMatch',
      minLength: '=?mdMinLength',
      highlightFlags: '@?mdHighlightFlags',
      chipAppendDelay: '@?mdChipAppendDelay',
      separatorKeys: '=?mdSeparatorKeys',
      removedMessage: '@?mdRemovedMessage',
      inputAriaDescribedBy: '@?inputAriaDescribedby',
      inputAriaLabelledBy: '@?inputAriaLabelledby',
      inputAriaLabel: '@?',
      containerHint: '@?',
      containerEmptyHint: '@?',
      deleteHint: '@?'
    }
  };

  function compile(element, attr) {
    return function postLink(scope, element, attrs, controllers) {
      var contactChipsController = controllers;

      $mdUtil.initOptionalProperties(scope, attr);
      $mdTheming(element);

      element.attr('tabindex', '-1');

      attrs.$observe('mdChipAppendDelay', function(newValue) {
        contactChipsController.chipAppendDelay = newValue;
      });
    };
  }
}

})();
(function(){
"use strict";

(function () {
  "use strict";

  /**
   *  Use a RegExp to check if the `md-colors="<expression>"` is static string
   *  or one that should be observed and dynamically interpolated.
   */
  MdColorsDirective.$inject = ["$mdColors", "$mdUtil", "$log", "$parse"];
  MdColorsService.$inject = ["$mdTheming", "$mdUtil", "$log"];
  var STATIC_COLOR_EXPRESSION = /^{((\s|,)*?["'a-zA-Z-]+?\s*?:\s*?('|")[a-zA-Z0-9-.]*('|"))+\s*}$/;
  var colorPalettes = null;

  /**
   * @ngdoc module
   * @name material.components.colors
   *
   * @description
   * Define $mdColors service and a `md-colors=""` attribute directive
   */
  angular
    .module('material.components.colors', ['material.core'])
    .directive('mdColors', MdColorsDirective)
    .service('$mdColors', MdColorsService);

  /**
   * @ngdoc service
   * @name $mdColors
   * @module material.components.colors
   *
   * @description
   * By default, defining a theme does not make its colors available for applying to non AngularJS
   * Material elements. The `$mdColors` service is used by the `md-color` directive to convert a
   * set of color expressions to RGBA values and then apply those values to the element as CSS
   * property values.
   *
   * @usage
   * Getting a color based on a theme
   *
   *  <hljs lang="js">
   *    angular.controller('myCtrl', function ($mdColors) {
   *      var color = $mdColors.getThemeColor('myTheme-primary-900-0.5');
   *      ...
   *    });
   *  </hljs>
   *
   * Applying a color from a palette to an element
   * <hljs lang="js">
   *   app.directive('myDirective', function($mdColors) {
   *     return {
   *       ...
   *       link: function (scope, elem) {
   *         $mdColors.applyThemeColors(elem, {color: 'red-A200-0.2'});
   *       }
   *    }
   *   });
   * </hljs>
   */
  function MdColorsService($mdTheming, $mdUtil, $log) {
    colorPalettes = colorPalettes || Object.keys($mdTheming.PALETTES);

    // Publish service instance
    return {
      applyThemeColors: applyThemeColors,
      getThemeColor: getThemeColor,
      hasTheme: hasTheme
    };

    // ********************************************
    // Internal Methods
    // ********************************************

    /**
     * @ngdoc method
     * @name $mdColors#applyThemeColors
     *
     * @description
     * Lookup a set of colors by hue, theme, and palette, then apply those colors
     * with the provided opacity (via `rgba()`) to the specified CSS property.
     *
     * @param {angular.element} element the element to apply the styles to
     * @param {Object} colorExpression Keys are CSS properties and values are strings representing
     * the `theme-palette-hue-opacity` of the desired color. For example:
     * `{'color': 'red-A200-0.3', 'background-color': 'myTheme-primary-700-0.8'}`. Theme, hue, and
     * opacity are optional.
     */
    function applyThemeColors(element, colorExpression) {
      try {
        if (colorExpression) {
          // Assign the calculate RGBA color values directly as inline CSS
          element.css(interpolateColors(colorExpression));
        }
      } catch (e) {
        $log.error(e.message);
      }
    }

    /**
     * @ngdoc method
     * @name $mdColors#getThemeColor
     *
     * @description
     * Get a parsed RGBA color using a string representing the `theme-palette-hue-opacity` of the
     * desired color.
     *
     * @param {string} expression color expression like `'red-A200-0.3'` or
     *  `'myTheme-primary-700-0.8'`. Theme, hue, and opacity are optional.
     * @returns {string} a CSS color value like `rgba(211, 47, 47, 0.8)`
     */
    function getThemeColor(expression) {
      var color = extractColorOptions(expression);

      return parseColor(color);
    }

    /**
     * Return the parsed color
     * @param {{hue: *, theme: any, palette: *, opacity: (*|string|number)}} color hash map of color
     *  definitions
     * @param {boolean=} contrast whether use contrast color for foreground. Defaults to false.
     * @returns {string} rgba color string
     */
    function parseColor(color, contrast) {
      contrast = contrast || false;
      var rgbValues = $mdTheming.PALETTES[color.palette][color.hue];

      rgbValues = contrast ? rgbValues.contrast : rgbValues.value;

      return $mdUtil.supplant('rgba({0}, {1}, {2}, {3})',
        [rgbValues[0], rgbValues[1], rgbValues[2], rgbValues[3] || color.opacity]
      );
    }

    /**
     * Convert the color expression into an object with scope-interpolated values
     * Then calculate the rgba() values based on the theme color parts
     * @param {Object} themeColors json object, keys are css properties and values are string of
     * the wanted color, for example: `{color: 'red-A200-0.3'}`.
     * @return {Object} Hashmap of CSS properties with associated `rgba()` string values
     */
    function interpolateColors(themeColors) {
      var rgbColors = {};

      var hasColorProperty = themeColors.hasOwnProperty('color');

      angular.forEach(themeColors, function (value, key) {
        var color = extractColorOptions(value);
        var hasBackground = key.indexOf('background') > -1;

        rgbColors[key] = parseColor(color);
        if (hasBackground && !hasColorProperty) {
          rgbColors.color = parseColor(color, true);
        }
      });

      return rgbColors;
    }

    /**
     * Check if expression has defined theme
     * For instance:
     *   'myTheme-primary' => true
     *   'red-800' => false
     * @param {string} expression color expression like 'red-800', 'red-A200-0.3',
     *   'myTheme-primary', or 'myTheme-primary-400'
     * @return {boolean} true if the expression has a theme part, false otherwise.
     */
    function hasTheme(expression) {
      return angular.isDefined($mdTheming.THEMES[expression.split('-')[0]]);
    }

    /**
     * For the evaluated expression, extract the color parts into a hash map
     * @param {string} expression color expression like 'red-800', 'red-A200-0.3',
     *   'myTheme-primary', or 'myTheme-primary-400'
     * @returns {{hue: *, theme: any, palette: *, opacity: (*|string|number)}}
     */
    function extractColorOptions(expression) {
      var parts = expression.split('-');
      var hasTheme = angular.isDefined($mdTheming.THEMES[parts[0]]);
      var theme = hasTheme ? parts.splice(0, 1)[0] : $mdTheming.defaultTheme();

      return {
        theme: theme,
        palette: extractPalette(parts, theme),
        hue: extractHue(parts, theme),
        opacity: parts[2] || 1
      };
    }

    /**
     * Calculate the theme palette name
     * @param {Array} parts
     * @param {string} theme name
     * @return {string}
     */
    function extractPalette(parts, theme) {
      // If the next section is one of the palettes we assume it's a two word palette
      // Two word palette can be also written in camelCase, forming camelCase to dash-case

      var isTwoWord = parts.length > 1 && colorPalettes.indexOf(parts[1]) !== -1;
      var palette = parts[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      if (isTwoWord)  palette = parts[0] + '-' + parts.splice(1, 1);

      if (colorPalettes.indexOf(palette) === -1) {
        // If the palette is not in the palette list it's one of primary/accent/warn/background
        var scheme = $mdTheming.THEMES[theme].colors[palette];
        if (!scheme) {
          throw new Error($mdUtil.supplant(
            'mdColors: couldn\'t find \'{palette}\' in the palettes.',
            {palette: palette}));
        }
        palette = scheme.name;
      }

      return palette;
    }

    /**
     * @param {Array} parts
     * @param {string} theme name
     * @return {*}
     */
    function extractHue(parts, theme) {
      var themeColors = $mdTheming.THEMES[theme].colors;

      if (parts[1] === 'hue') {
        var hueNumber = parseInt(parts.splice(2, 1)[0], 10);

        if (hueNumber < 1 || hueNumber > 3) {
          throw new Error($mdUtil.supplant(
            'mdColors: \'hue-{hueNumber}\' is not a valid hue, can be only \'hue-1\', \'hue-2\' and \'hue-3\'',
            {hueNumber: hueNumber}));
        }
        parts[1] = 'hue-' + hueNumber;

        if (!(parts[0] in themeColors)) {
          throw new Error($mdUtil.supplant(
            'mdColors: \'hue-x\' can only be used with [{availableThemes}], but was used with \'{usedTheme}\'',
            {
            availableThemes: Object.keys(themeColors).join(', '),
            usedTheme: parts[0]
          }));
        }

        return themeColors[parts[0]].hues[parts[1]];
      }

      return parts[1] || themeColors[parts[0] in themeColors ? parts[0] : 'primary'].hues['default'];
    }
  }

  /**
   * @ngdoc directive
   * @name mdColors
   * @module material.components.colors
   *
   * @restrict A
   *
   * @description
   * `mdColors` directive will apply the theme-based color expression as RGBA CSS style values.
   *
   *   The format will be similar to the colors defined in the Sass files:
   *
   *   ## `[?theme]-[palette]-[?hue]-[?opacity]`
   *   - [theme]    - default value is the default theme
   *   - [palette]  - can be either palette name or primary/accent/warn/background
   *   - [hue]      - default is 500 (hue-x can be used with primary/accent/warn/background)
   *   - [opacity]  - default is 1
   *
   *
   *   > `?` indicates optional parameter
   *
   * @usage
   * <hljs lang="html">
   *   <div md-colors="{background: 'myTheme-accent-900-0.43'}">
   *     <div md-colors="{color: 'red-A100', 'border-color': 'primary-600'}">
   *       <span>Color demo</span>
   *     </div>
   *   </div>
   * </hljs>
   *
   * The `mdColors` directive will automatically watch for changes in the expression if it recognizes
   * an interpolation expression or a function. For performance options, you can use `::` prefix to
   * the `md-colors` expression to indicate a one-time data binding.
   *
   * <hljs lang="html">
   *   <md-card md-colors="::{background: '{{theme}}-primary-700'}">
   *   </md-card>
   * </hljs>
   */
  function MdColorsDirective($mdColors, $mdUtil, $log, $parse) {
    return {
      restrict: 'A',
      require: ['^?mdTheme'],
      compile: function (tElem, tAttrs) {
        var shouldWatch = shouldColorsWatch();

        return function (scope, element, attrs, ctrl) {
          var mdThemeController = ctrl[0];

          var lastColors = {};

          /**
           * @param {string=} theme
           * @return {Object} colors found in the specified theme
           */
          var parseColors = function (theme) {
            if (typeof theme !== 'string') {
              theme = '';
            }

            if (!attrs.mdColors) {
              attrs.mdColors = '{}';
            }

            /**
             * Json.parse() does not work because the keys are not quoted;
             * use $parse to convert to a hash map
             */
            var colors = $parse(attrs.mdColors)(scope);

            /**
             * If mdTheme is defined higher up the DOM tree,
             * we add mdTheme's theme to the colors which don't specify a theme.
             *
             * @example
             * <hljs lang="html">
             *   <div md-theme="myTheme">
             *     <div md-colors="{background: 'primary-600'}">
             *       <span md-colors="{background: 'mySecondTheme-accent-200'}">Color demo</span>
             *     </div>
             *   </div>
             * </hljs>
             *
             * 'primary-600' will be changed to 'myTheme-primary-600',
             * but 'mySecondTheme-accent-200' will not be changed since it has a theme defined.
             */
            if (mdThemeController) {
              Object.keys(colors).forEach(function (prop) {
                var color = colors[prop];
                if (!$mdColors.hasTheme(color)) {
                  colors[prop] = (theme || mdThemeController.$mdTheme) + '-' + color;
                }
              });
            }

            cleanElement(colors);

            return colors;
          };

          /**
           * @param {Object} colors
           */
          var cleanElement = function (colors) {
            if (!angular.equals(colors, lastColors)) {
              var keys = Object.keys(lastColors);

              if (lastColors.background && !keys.color) {
                keys.push('color');
              }

              keys.forEach(function (key) {
                element.css(key, '');
              });
            }

            lastColors = colors;
          };

          /**
           * Registering for mgTheme changes and asking mdTheme controller run our callback whenever
           * a theme changes.
           */
          var unregisterChanges = angular.noop;

          if (mdThemeController) {
            unregisterChanges = mdThemeController.registerChanges(function (theme) {
              $mdColors.applyThemeColors(element, parseColors(theme));
            });
          }

          scope.$on('$destroy', function () {
            unregisterChanges();
          });

          try {
            if (shouldWatch) {
              scope.$watch(parseColors, angular.bind(this,
                $mdColors.applyThemeColors, element
              ), true);
            }
            else {
              $mdColors.applyThemeColors(element, parseColors());
            }

          }
          catch (e) {
            $log.error(e.message);
          }

        };

        /**
         * @return {boolean}
         */
        function shouldColorsWatch() {
          // Simulate 1x binding and mark mdColorsWatch == false
          var rawColorExpression = tAttrs.mdColors;
          var bindOnce = rawColorExpression.indexOf('::') > -1;
          var isStatic = bindOnce ? true : STATIC_COLOR_EXPRESSION.test(tAttrs.mdColors);

          // Remove it for the postLink...
          tAttrs.mdColors = rawColorExpression.replace('::', '');

          var hasWatchAttr = angular.isDefined(tAttrs.mdColorsWatch);

          return (bindOnce || isStatic) ? false :
            hasWatchAttr ? $mdUtil.parseAttributeBoolean(tAttrs.mdColorsWatch) : true;
        }
      }
    };
  }
})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.content
 *
 * @description
 * Scrollable content
 */
mdContentDirective.$inject = ["$mdTheming"];
angular.module('material.components.content', [
  'material.core'
])
  .directive('mdContent', mdContentDirective);

/**
 * @ngdoc directive
 * @name mdContent
 * @module material.components.content
 *
 * @restrict E
 *
 * @description
 *
 * The `<md-content>` directive is a container element useful for scrollable content. It achieves
 * this by setting the CSS `overflow` property to `auto` so that content can properly scroll.
 *
 * In general, `<md-content>` components are not designed to be nested inside one another. If
 * possible, it is better to make them siblings. This often results in a better user experience as
 * having nested scrollbars may confuse the user.
 *
 * ## Troubleshooting
 *
 * In some cases, you may wish to apply the `md-no-momentum` class to ensure that Safari's
 * momentum scrolling is disabled. Momentum scrolling can cause flickering issues while scrolling
 * SVG icons and some other components.
 *
 * Additionally, we now also offer the `md-no-flicker` class which can be applied to any element
 * and uses a Webkit-specific filter of `blur(0px)` that forces GPU rendering of all elements
 * inside (which eliminates the flicker on iOS devices).
 *
 * _<b>Note:</b> Forcing an element to render on the GPU can have unintended side-effects, especially
 * related to the z-index of elements. Please use with caution and only on the elements needed._
 *
 * @usage
 *
 * Add the `[layout-padding]` attribute to make the content padded.
 *
 * <hljs lang="html">
 *  <md-content layout-padding>
 *      Lorem ipsum dolor sit amet, ne quod novum mei.
 *  </md-content>
 * </hljs>
 */

function mdContentDirective($mdTheming) {
  return {
    restrict: 'E',
    controller: ['$scope', '$element', ContentController],
    link: function(scope, element) {
      element.addClass('_md');     // private md component indicator for styling

      $mdTheming(element);
      scope.$broadcast('$mdContentLoaded', element);

      iosScrollFix(element[0]);
    }
  };

  function ContentController($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
  }
}

function iosScrollFix(node) {
  // IOS FIX:
  // If we scroll where there is no more room for the webview to scroll,
  // by default the webview itself will scroll up and down, this looks really
  // bad.  So if we are scrolling to the very top or bottom, add/subtract one
  angular.element(node).on('$md.pressdown', function(ev) {
    // Only touch events
    if (ev.pointer.type !== 't') return;
    // Don't let a child content's touchstart ruin it for us.
    if (ev.$materialScrollFixed) return;
    ev.$materialScrollFixed = true;

    if (node.scrollTop === 0) {
      node.scrollTop = 1;
    } else if (node.scrollHeight === node.scrollTop + node.offsetHeight) {
      node.scrollTop -= 1;
    }
  });
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.datepicker
 * @description Module for the datepicker component.
 */

angular.module('material.components.datepicker', [
  'material.core',
  'material.components.icon',
  'material.components.virtualRepeat'
]);

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name mdCalendar
   * @module material.components.datepicker
   *
   * @param {Date} ng-model The component's model. Should be a Date object.
   * @param {Object=} ng-model-options Allows tuning of the way in which `ng-model` is being
   *  updated. Also allows for a timezone to be specified.
   *  <a href="https://docs.angularjs.org/api/ng/directive/ngModelOptions#usage">Read more at the
   *  ngModelOptions docs.</a>
   * @param {Date=} md-min-date Expression representing the minimum date.
   * @param {Date=} md-max-date Expression representing the maximum date.
   * @param {(function(Date): boolean)=} md-date-filter Function expecting a date and returning a
   *  boolean whether it can be selected in "day" mode or not.
   * @param {(function(Date): boolean)=} md-month-filter Function expecting a date and returning a
   *  boolean whether it can be selected in "month" mode or not.
   * @param {String=} md-current-view Current view of the calendar. Can be either "month" or "year".
   * @param {String=} md-mode Restricts the user to only selecting a value from a particular view.
   *  This option can be used if the user is only supposed to choose from a certain date type
   *  (e.g. only selecting the month). Can be either "month" or "day". **Note** that this will
   *  overwrite the `md-current-view` value.
   *
   * @description
   * `<md-calendar>` is a component that renders a calendar that can be used to select a date.
   * It is a part of the `<md-datepicker>` pane, however it can also be used on it's own.
   *
   * @usage
   *
   * <hljs lang="html">
   *   <md-calendar ng-model="birthday"></md-calendar>
   * </hljs>
   */
  CalendarCtrl.$inject = ["$element", "$scope", "$$mdDateUtil", "$mdUtil", "$mdConstant", "$mdTheming", "$$rAF", "$attrs", "$mdDateLocale", "$filter"];
  calendarDirective.$inject = ["inputDirective"];
  angular.module('material.components.datepicker')
    .directive('mdCalendar', calendarDirective);

  // TODO(jelbourn): Mac Cmd + left / right == Home / End
  // TODO(jelbourn): Refactor month element creation to use cloneNode (performance).
  // TODO(jelbourn): Define virtual scrolling constants (compactness) users can override.
  // TODO(jelbourn): Animated month transition on ng-model change (virtual-repeat)
  // TODO(jelbourn): Scroll snapping (virtual repeat)
  // TODO(jelbourn): Remove superfluous row from short months (virtual-repeat)
  // TODO(jelbourn): Month headers stick to top when scrolling.
  // TODO(jelbourn): Previous month opacity is lowered when partially scrolled out of view.
  // TODO(jelbourn): Support md-calendar standalone on a page (as a tabstop w/ aria-live
  //     announcement and key handling).
  // TODO Read-only calendar (not just date-picker).

  function calendarDirective(inputDirective) {
    return {
      template: function(tElement, tAttr) {
        // This allows the calendar to work, without a datepicker. This ensures that the virtual
        // repeater scrolls to the proper place on load by deferring the execution until the next
        // digest. It's necessary only if the calendar is used without a datepicker, otherwise it's
        // already wrapped in an ngIf.
        var extraAttrs = tAttr.hasOwnProperty('ngIf') ? '' : 'ng-if="calendarCtrl.isInitialized"';
        return '' +
          '<div ng-switch="calendarCtrl.currentView" ' + extraAttrs + '>' +
            '<md-calendar-year ng-switch-when="year"></md-calendar-year>' +
            '<md-calendar-month ng-switch-default></md-calendar-month>' +
          '</div>';
      },
      scope: {
        minDate: '=mdMinDate',
        maxDate: '=mdMaxDate',
        dateFilter: '=mdDateFilter',
        monthFilter: '=mdMonthFilter',

        // These need to be prefixed, because Angular resets
        // any changes to the value due to bindToController.
        _mode: '@mdMode',
        _currentView: '@mdCurrentView'
      },
      require: ['ngModel', 'mdCalendar'],
      controller: CalendarCtrl,
      controllerAs: 'calendarCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) {
        var ngModelCtrl = controllers[0];
        var mdCalendarCtrl = controllers[1];
        mdCalendarCtrl.configureNgModel(ngModelCtrl, inputDirective);
      }
    };
  }

  /**
   * Occasionally the hideVerticalScrollbar method might read an element's
   * width as 0, because it hasn't been laid out yet. This value will be used
   * as a fallback, in order to prevent scenarios where the element's width
   * would otherwise have been set to 0. This value is the "usual" width of a
   * calendar within a floating calendar pane.
   */
  var FALLBACK_WIDTH = 340;

  /** Next identifier for calendar instance. */
  var nextUniqueId = 0;

  /** Maps the `md-mode` values to their corresponding calendar views. */
  var MODE_MAP = {
    day: 'month',
    month: 'year'
  };

  /**
   * Controller for the mdCalendar component.
   * @ngInject @constructor
   */
  function CalendarCtrl($element, $scope, $$mdDateUtil, $mdUtil,
    $mdConstant, $mdTheming, $$rAF, $attrs, $mdDateLocale, $filter) {

    $mdTheming($element);

    /**
     * @final
     * @type {!JQLite}
     */
    this.$element = $element;

    /**
     * @final
     * @type {!angular.Scope}
     */
    this.$scope = $scope;

    /**
     * @final
     * @type {!angular.$attrs} Current attributes object for the element
     */
    this.$attrs = $attrs;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.$mdUtil = $mdUtil;

    /** @final */
    this.keyCode = $mdConstant.KEY_CODE;

    /** @final */
    this.$$rAF = $$rAF;

    /** @final */
    this.$mdDateLocale = $mdDateLocale;

    /** @final The built-in Angular date filter. */
    this.ngDateFilter = $filter('date');

    /**
     * @final
     * @type {Date}
     */
    this.today = this.dateUtil.createDateAtMidnight();

    /** @type {!ngModel.NgModelController} */
    this.ngModelCtrl = undefined;

    /** @type {string} Class applied to the selected date cell. */
    this.SELECTED_DATE_CLASS = 'md-calendar-selected-date';

    /** @type {string} Class applied to the cell for today. */
    this.TODAY_CLASS = 'md-calendar-date-today';

    /** @type {string} Class applied to the focused cell. */
    this.FOCUSED_DATE_CLASS = 'md-focus';

    /**
     * @final
     * @type {number} Unique ID for this calendar instance.
     */
    this.id = nextUniqueId++;

    /**
     * The date that is currently focused or showing in the calendar. This will initially be set
     * to the ng-model value if set, otherwise to today. It will be updated as the user navigates
     * to other months. The cell corresponding to the displayDate does not necesarily always have
     * focus in the document (such as for cases when the user is scrolling the calendar).
     * @type {Date}
     */
    this.displayDate = null;

    /**
     * Allows restricting the calendar to only allow selecting a month or a day.
     * @type {'month'|'day'|null}
     */
    this.mode = null;

    /**
     * The selected date. Keep track of this separately from the ng-model value so that we
     * can know, when the ng-model value changes, what the previous value was before it's updated
     * in the component's UI.
     *
     * @type {Date}
     */
    this.selectedDate = null;

    /**
     * The first date that can be rendered by the calendar. The default is taken
     * from the mdDateLocale provider and is limited by the mdMinDate.
     * @type {Date}
     */
    this.firstRenderableDate = null;

    /**
     * The last date that can be rendered by the calendar. The default comes
     * from the mdDateLocale provider and is limited by the maxDate.
     * @type {Date}
     */
    this.lastRenderableDate = null;

    /**
     * Used to toggle initialize the root element in the next digest.
     * @type {boolean}
     */
    this.isInitialized = false;

    /**
     * Cache for the  width of the element without a scrollbar. Used to hide the scrollbar later on
     * and to avoid extra reflows when switching between views.
     * @type {number}
     */
    this.width = 0;

    /**
     * Caches the width of the scrollbar in order to be used when hiding it and to avoid extra reflows.
     * @type {number}
     */
    this.scrollbarWidth = 0;

    // Unless the user specifies so, the calendar should not be a tab stop.
    // This is necessary because ngAria might add a tabindex to anything with an ng-model
    // (based on whether or not the user has turned that particular feature on/off).
    if (!$attrs.tabindex) {
      $element.attr('tabindex', '-1');
    }

    var boundKeyHandler = angular.bind(this, this.handleKeyEvent);

    // If use the md-calendar directly in the body without datepicker,
    // handleKeyEvent will disable other inputs on the page.
    // So only apply the handleKeyEvent on the body when the md-calendar inside datepicker,
    // otherwise apply on the calendar element only.

    var handleKeyElement;
    if ($element.parent().hasClass('md-datepicker-calendar')) {
      handleKeyElement = angular.element(document.body);
    } else {
      handleKeyElement = $element;
    }

    // Bind the keydown handler to the body, in order to handle cases where the focused
    // element gets removed from the DOM and stops propagating click events.
    handleKeyElement.on('keydown', boundKeyHandler);

    $scope.$on('$destroy', function() {
      handleKeyElement.off('keydown', boundKeyHandler);
    });

    // For AngularJS 1.4 and older, where there are no lifecycle hooks but bindings are pre-assigned,
    // manually call the $onInit hook.
    if (angular.version.major === 1 && angular.version.minor <= 4) {
      this.$onInit();
    }
  }

  /**
   * AngularJS Lifecycle hook for newer AngularJS versions.
   * Bindings are not guaranteed to have been assigned in the controller, but they are in the
   * $onInit hook.
   */
  CalendarCtrl.prototype.$onInit = function() {
    /**
     * The currently visible calendar view. Note the prefix on the scope value,
     * which is necessary, because the datepicker seems to reset the real one value if the
     * calendar is open, but the `currentView` on the datepicker's scope is empty.
     * @type {String}
     */
    if (this._mode && MODE_MAP.hasOwnProperty(this._mode)) {
      this.currentView = MODE_MAP[this._mode];
      this.mode = this._mode;
    } else {
      this.currentView = this._currentView || 'month';
      this.mode = null;
    }

    if (this.minDate && this.minDate > this.$mdDateLocale.firstRenderableDate) {
      this.firstRenderableDate = this.minDate;
    } else {
      this.firstRenderableDate = this.$mdDateLocale.firstRenderableDate;
    }

    if (this.maxDate && this.maxDate < this.$mdDateLocale.lastRenderableDate) {
      this.lastRenderableDate = this.maxDate;
    } else {
      this.lastRenderableDate = this.$mdDateLocale.lastRenderableDate;
    }
  };

  /**
   * Sets up the controller's reference to ngModelController.
   * @param {!ngModel.NgModelController} ngModelCtrl Instance of the ngModel controller.
   * @param {Object} inputDirective Config for Angular's `input` directive.
   */
  CalendarCtrl.prototype.configureNgModel = function(ngModelCtrl, inputDirective) {
    var self = this;
    self.ngModelCtrl = ngModelCtrl;

    // The component needs to be [type="date"] in order to be picked up by AngularJS.
    this.$attrs.$set('type', 'date');

    // Invoke the `input` directive link function, adding a stub for the element.
    // This allows us to re-use AngularJS' logic for setting the timezone via ng-model-options.
    // It works by calling the link function directly which then adds the proper `$parsers` and
    // `$formatters` to the NgModelController.
    inputDirective[0].link.pre(this.$scope, {
      on: angular.noop,
      val: angular.noop,
      0: {}
    }, this.$attrs, [ngModelCtrl]);

    ngModelCtrl.$render = function() {
      var value = this.$viewValue, convertedDate;

      // In the case where a conversion is needed, the $viewValue here will be a string like
      // "2020-05-10" instead of a Date object.
      if (!self.dateUtil.isValidDate(value)) {
        convertedDate = self.dateUtil.removeLocalTzAndReparseDate(new Date(this.$viewValue));
        if (self.dateUtil.isValidDate(convertedDate)) {
          value = convertedDate;
        }
      }

      // Notify the child scopes of any changes.
      self.$scope.$broadcast('md-calendar-parent-changed', value);

      // Set up the selectedDate if it hasn't been already.
      if (!self.selectedDate) {
        self.selectedDate = value;
      }

      // Also set up the displayDate.
      if (!self.displayDate) {
        self.displayDate = self.selectedDate || self.today;
      }
    };

    self.$mdUtil.nextTick(function() {
      self.isInitialized = true;
    });
  };

  /**
   * Sets the ng-model value for the calendar and emits a change event.
   * @param {Date} date new value for the calendar
   */
  CalendarCtrl.prototype.setNgModelValue = function(date) {
    var timezone = this.$mdUtil.getModelOption(this.ngModelCtrl, 'timezone');
    var value = this.dateUtil.createDateAtMidnight(date);
    this.focusDate(value);
    this.$scope.$emit('md-calendar-change', value);
    this.ngModelCtrl.$setViewValue(this.ngDateFilter(value, 'yyyy-MM-dd', timezone), 'default');
    this.ngModelCtrl.$render();
    return value;
  };

  /**
   * Sets the current view that should be visible in the calendar
   * @param {string} newView View name to be set.
   * @param {number|Date} time Date object or a timestamp for the new display date.
   */
  CalendarCtrl.prototype.setCurrentView = function(newView, time) {
    var self = this;

    self.$mdUtil.nextTick(function() {
      self.currentView = newView;

      if (time) {
        self.displayDate = angular.isDate(time) ? time : new Date(time);
      }
    });
  };

  /**
   * Focus the cell corresponding to the given date.
   * @param {Date=} date The date to be focused.
   */
  CalendarCtrl.prototype.focusDate = function(date) {
    if (this.dateUtil.isValidDate(date)) {
      var previousFocus = this.$element[0].querySelector('.' + this.FOCUSED_DATE_CLASS);
      if (previousFocus) {
        previousFocus.classList.remove(this.FOCUSED_DATE_CLASS);
      }

      var cellId = this.getDateId(date, this.currentView);
      var cell = document.getElementById(cellId);
      if (cell) {
        cell.classList.add(this.FOCUSED_DATE_CLASS);
        cell.focus();
        this.displayDate = date;
      }
    } else {
      var rootElement = this.$element[0].querySelector('[ng-switch]');

      if (rootElement) {
        rootElement.focus();
      }
    }
  };

  /**
   * Highlights a date cell on the calendar and changes the selected date.
   * @param {Date=} date Date to be marked as selected.
   */
  CalendarCtrl.prototype.changeSelectedDate = function(date) {
    var selectedDateClass = this.SELECTED_DATE_CLASS;
    var prevDateCell = this.$element[0].querySelector('.' + selectedDateClass);

    // Remove the selected class from the previously selected date, if any.
    if (prevDateCell) {
      prevDateCell.classList.remove(selectedDateClass);
      prevDateCell.setAttribute('aria-selected', 'false');
    }

    // Apply the select class to the new selected date if it is set.
    if (date) {
      var dateCell = document.getElementById(this.getDateId(date, this.currentView));
      if (dateCell) {
        dateCell.classList.add(selectedDateClass);
        dateCell.setAttribute('aria-selected', 'true');
      }
    }

    this.selectedDate = date;
  };

  /**
   * Normalizes the key event into an action name. The action will be broadcast
   * to the child controllers.
   * @param {KeyboardEvent} event
   * @returns {String} The action that should be taken, or null if the key
   * does not match a calendar shortcut.
   */
  CalendarCtrl.prototype.getActionFromKeyEvent = function(event) {
    var keyCode = this.keyCode;

    switch (event.which) {
      case keyCode.ENTER: return 'select';

      case keyCode.RIGHT_ARROW: return 'move-right';
      case keyCode.LEFT_ARROW: return 'move-left';

      case keyCode.DOWN_ARROW: return event.metaKey ? 'move-page-down' : 'move-row-down';
      case keyCode.UP_ARROW: return event.metaKey ? 'move-page-up' : 'move-row-up';

      case keyCode.PAGE_DOWN: return 'move-page-down';
      case keyCode.PAGE_UP: return 'move-page-up';

      case keyCode.HOME: return 'start';
      case keyCode.END: return 'end';

      default: return null;
    }
  };

  /**
   * Handles a key event in the calendar with the appropriate action. The action will either
   * be to select the focused date or to navigate to focus a new date.
   * @param {KeyboardEvent} event
   */
  CalendarCtrl.prototype.handleKeyEvent = function(event) {
    var self = this;

    this.$scope.$apply(function() {
      // Capture escape and emit back up so that a wrapping component
      // (such as a date-picker) can decide to close.
      if (event.which === self.keyCode.ESCAPE || event.which === self.keyCode.TAB) {
        self.$scope.$emit('md-calendar-close');

        if (event.which === self.keyCode.TAB) {
          event.preventDefault();
        }

        return;
      }

      // Broadcast the action that any child controllers should take.
      var action = self.getActionFromKeyEvent(event);
      if (action) {
        event.preventDefault();
        event.stopPropagation();
        self.$scope.$broadcast('md-calendar-parent-action', action);
      }
    });
  };

  /**
   * Hides the vertical scrollbar on the calendar scroller of a child controller by
   * setting the width on the calendar scroller and the `overflow: hidden` wrapper
   * around the scroller, and then setting a padding-right on the scroller equal
   * to the width of the browser's scrollbar.
   *
   * This will cause a reflow.
   *
   * @param {object} childCtrl The child controller whose scrollbar should be hidden.
   */
  CalendarCtrl.prototype.hideVerticalScrollbar = function(childCtrl) {
    var self = this;
    var element = childCtrl.$element[0];
    var scrollMask = element.querySelector('.md-calendar-scroll-mask');

    if (self.width > 0) {
      setWidth();
    } else {
      self.$$rAF(function() {
        var scroller = childCtrl.calendarScroller;

        self.scrollbarWidth = scroller.offsetWidth - scroller.clientWidth;
        self.width = element.querySelector('table').offsetWidth;
        setWidth();
      });
    }

    function setWidth() {
      var width = self.width || FALLBACK_WIDTH;
      var scrollbarWidth = self.scrollbarWidth;
      var scroller = childCtrl.calendarScroller;

      scrollMask.style.width = width + 'px';
      scroller.style.width = (width + scrollbarWidth) + 'px';
      scroller.style.paddingRight = scrollbarWidth + 'px';
    }
  };

  /**
   * Gets an identifier for a date unique to the calendar instance for internal
   * purposes. Not to be displayed.
   * @param {Date} date The date for which the id is being generated
   * @param {string} namespace Namespace for the id. (month, year etc.)
   * @returns {string}
   */
  CalendarCtrl.prototype.getDateId = function(date, namespace) {
    if (!namespace) {
      throw new Error('A namespace for the date id has to be specified.');
    }

    return [
      'md',
      this.id,
      namespace,
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ].join('-');
  };

  /**
   * Util to trigger an extra digest on a parent scope, in order to to ensure that
   * any child virtual repeaters have updated. This is necessary, because the virtual
   * repeater doesn't update the $index the first time around since the content isn't
   * in place yet. The case, in which this is an issue, is when the repeater has less
   * than a page of content (e.g. a month or year view has a min or max date).
   */
  CalendarCtrl.prototype.updateVirtualRepeat = function() {
    var scope = this.$scope;
    var virtualRepeatResizeListener = scope.$on('$md-resize-enable', function() {
      if (!scope.$$phase) {
        scope.$apply();
      }

      virtualRepeatResizeListener();
    });
  };
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  CalendarMonthCtrl.$inject = ["$element", "$scope", "$animate", "$q", "$$mdDateUtil", "$mdDateLocale"];
  angular.module('material.components.datepicker')
    .directive('mdCalendarMonth', calendarDirective);

  /**
   * Height of one calendar month tbody. This must be made known to the virtual-repeat and is
   * subsequently used for scrolling to specific months.
   */
  var TBODY_HEIGHT = 265;

  /**
   * Height of a calendar month with a single row. This is needed to calculate the offset for
   * rendering an extra month in virtual-repeat that only contains one row.
   */
  var TBODY_SINGLE_ROW_HEIGHT = 45;

  /** Private directive that represents a list of months inside the calendar. */
  function calendarDirective() {
    return {
      template:
        '<table aria-hidden="true" class="md-calendar-day-header"><thead></thead></table>' +
        '<div class="md-calendar-scroll-mask">' +
        '<md-virtual-repeat-container class="md-calendar-scroll-container" ' +
              'md-offset-size="' + (TBODY_SINGLE_ROW_HEIGHT - TBODY_HEIGHT) + '">' +
            '<table role="grid" tabindex="0" class="md-calendar" aria-readonly="true">' +
              '<tbody ' +
                  'md-calendar-month-body ' +
                  'role="rowgroup" ' +
                  'md-virtual-repeat="i in monthCtrl.items" ' +
                  'md-month-offset="$index" ' +
                  'class="md-calendar-month" ' +
                  'md-start-index="monthCtrl.getSelectedMonthIndex()" ' +
                  'md-item-size="' + TBODY_HEIGHT + '">' +

                // The <tr> ensures that the <tbody> will always have the
                // proper height, even if it's empty. If it's content is
                // compiled, the <tr> will be overwritten.
                '<tr aria-hidden="true" md-force-height="\'' + TBODY_HEIGHT + 'px\'"></tr>' +
              '</tbody>' +
            '</table>' +
          '</md-virtual-repeat-container>' +
        '</div>',
      require: ['^^mdCalendar', 'mdCalendarMonth'],
      controller: CalendarMonthCtrl,
      controllerAs: 'monthCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) {
        var calendarCtrl = controllers[0];
        var monthCtrl = controllers[1];
        monthCtrl.initialize(calendarCtrl);
      }
    };
  }

  /**
   * Controller for the calendar month component.
   * @ngInject @constructor
   */
  function CalendarMonthCtrl($element, $scope, $animate, $q,
    $$mdDateUtil, $mdDateLocale) {

    /** @final {!angular.JQLite} */
    this.$element = $element;

    /** @final {!angular.Scope} */
    this.$scope = $scope;

    /** @final {!angular.$animate} */
    this.$animate = $animate;

    /** @final {!angular.$q} */
    this.$q = $q;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.dateLocale = $mdDateLocale;

    /** @final {HTMLElement} */
    this.calendarScroller = $element[0].querySelector('.md-virtual-repeat-scroller');

    /** @type {boolean} */
    this.isInitialized = false;

    /** @type {boolean} */
    this.isMonthTransitionInProgress = false;

    var self = this;

    /**
     * Handles a click event on a date cell.
     * Created here so that every cell can use the same function instance.
     * @this {HTMLTableCellElement} The cell that was clicked.
     */
    this.cellClickHandler = function() {
      var timestamp = $$mdDateUtil.getTimestampFromNode(this);
      self.$scope.$apply(function() {
        // The timestamp has to be converted to a valid date.
        self.calendarCtrl.setNgModelValue(new Date(timestamp));
      });
    };

    /**
     * Handles click events on the month headers. Switches
     * the calendar to the year view.
     * @this {HTMLTableCellElement} The cell that was clicked.
     */
    this.headerClickHandler = function() {
      self.calendarCtrl.setCurrentView('year', $$mdDateUtil.getTimestampFromNode(this));
    };
  }

  /** Initialization **/

  /**
   * Initialize the controller by saving a reference to the calendar and
   * setting up the object that will be iterated by the virtual repeater.
   */
  CalendarMonthCtrl.prototype.initialize = function(calendarCtrl) {
    /**
     * Dummy array-like object for virtual-repeat to iterate over. The length is the total
     * number of months that can be viewed. We add 2 months: one to include the current month
     * and one for the last dummy month.
     *
     * This is shorter than ideal because of a (potential) Firefox bug
     * https://bugzilla.mozilla.org/show_bug.cgi?id=1181658.
     */

    this.items = {
      length: this.dateUtil.getMonthDistance(
        calendarCtrl.firstRenderableDate,
        calendarCtrl.lastRenderableDate
      ) + 2
    };

    this.calendarCtrl = calendarCtrl;
    this.attachScopeListeners();
    calendarCtrl.updateVirtualRepeat();

    // Fire the initial render, since we might have missed it the first time it fired.
    calendarCtrl.ngModelCtrl && calendarCtrl.ngModelCtrl.$render();
  };

  /**
   * Gets the "index" of the currently selected date as it would be in the virtual-repeat.
   * @returns {number} the "index" of the currently selected date
   */
  CalendarMonthCtrl.prototype.getSelectedMonthIndex = function() {
    var calendarCtrl = this.calendarCtrl;

    return this.dateUtil.getMonthDistance(
      calendarCtrl.firstRenderableDate,
      calendarCtrl.displayDate || calendarCtrl.selectedDate || calendarCtrl.today
    );
  };

  /**
   * Change the date that is being shown in the calendar. If the given date is in a different
   * month, the displayed month will be transitioned.
   * @param {Date} date
   */
  CalendarMonthCtrl.prototype.changeDisplayDate = function(date) {
    // Initialization is deferred until this function is called because we want to reflect
    // the starting value of ngModel.
    if (!this.isInitialized) {
      this.buildWeekHeader();
      this.calendarCtrl.hideVerticalScrollbar(this);
      this.isInitialized = true;
      return this.$q.when();
    }

    // If trying to show an invalid date or a transition is in progress, do nothing.
    if (!this.dateUtil.isValidDate(date) || this.isMonthTransitionInProgress) {
      return this.$q.when();
    }

    this.isMonthTransitionInProgress = true;
    var animationPromise = this.animateDateChange(date);

    this.calendarCtrl.displayDate = date;

    var self = this;
    animationPromise.then(function() {
      self.isMonthTransitionInProgress = false;
    });

    return animationPromise;
  };

  /**
   * Animates the transition from the calendar's current month to the given month.
   * @param {Date} date
   * @returns {angular.$q.Promise} The animation promise.
   */
  CalendarMonthCtrl.prototype.animateDateChange = function(date) {
    if (this.dateUtil.isValidDate(date)) {
      var monthDistance = this.dateUtil.getMonthDistance(this.calendarCtrl.firstRenderableDate, date);
      this.calendarScroller.scrollTop = monthDistance * TBODY_HEIGHT;
    }

    return this.$q.when();
  };

  /**
   * Builds and appends a day-of-the-week header to the calendar.
   * This should only need to be called once during initialization.
   */
  CalendarMonthCtrl.prototype.buildWeekHeader = function() {
    var firstDayOfWeek = this.dateLocale.firstDayOfWeek;
    var shortDays = this.dateLocale.shortDays;

    var row = document.createElement('tr');
    for (var i = 0; i < 7; i++) {
      var th = document.createElement('th');
      th.textContent = shortDays[(i + firstDayOfWeek) % 7];
      row.appendChild(th);
    }

    this.$element.find('thead').append(row);
  };

  /**
   * Attaches listeners for the scope events that are broadcast by the calendar.
   */
  CalendarMonthCtrl.prototype.attachScopeListeners = function() {
    var self = this;

    self.$scope.$on('md-calendar-parent-changed', function(event, value) {
      self.calendarCtrl.changeSelectedDate(value);
      self.changeDisplayDate(value);
    });

    self.$scope.$on('md-calendar-parent-action', angular.bind(this, this.handleKeyEvent));
  };

  /**
   * Handles the month-specific keyboard interactions.
   * @param {Object} event Scope event object passed by the calendar.
   * @param {String} action Action, corresponding to the key that was pressed.
   */
  CalendarMonthCtrl.prototype.handleKeyEvent = function(event, action) {
    var calendarCtrl = this.calendarCtrl;
    var displayDate = calendarCtrl.displayDate;

    if (action === 'select') {
      calendarCtrl.setNgModelValue(displayDate);
    } else {
      var date = null;
      var dateUtil = this.dateUtil;

      switch (action) {
        case 'move-right': date = dateUtil.incrementDays(displayDate, 1); break;
        case 'move-left': date = dateUtil.incrementDays(displayDate, -1); break;

        case 'move-page-down': date = dateUtil.incrementMonths(displayDate, 1); break;
        case 'move-page-up': date = dateUtil.incrementMonths(displayDate, -1); break;

        case 'move-row-down': date = dateUtil.incrementDays(displayDate, 7); break;
        case 'move-row-up': date = dateUtil.incrementDays(displayDate, -7); break;

        case 'start': date = dateUtil.getFirstDateOfMonth(displayDate); break;
        case 'end': date = dateUtil.getLastDateOfMonth(displayDate); break;
      }

      if (date) {
        date = this.dateUtil.clampDate(date, calendarCtrl.minDate, calendarCtrl.maxDate);

        this.changeDisplayDate(date).then(function() {
          calendarCtrl.focusDate(date);
        });
      }
    }
  };
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  mdCalendarMonthBodyDirective.$inject = ["$compile", "$$mdSvgRegistry"];
  CalendarMonthBodyCtrl.$inject = ["$element", "$$mdDateUtil", "$mdDateLocale"];
  angular.module('material.components.datepicker')
      .directive('mdCalendarMonthBody', mdCalendarMonthBodyDirective);

  /**
   * Private directive consumed by md-calendar-month. Having this directive lets the calender use
   * md-virtual-repeat and also cleanly separates the month DOM construction functions from
   * the rest of the calendar controller logic.
   * @ngInject
   */
  function mdCalendarMonthBodyDirective($compile, $$mdSvgRegistry) {
    var ARROW_ICON = $compile('<md-icon md-svg-src="' +
      $$mdSvgRegistry.mdTabsArrow + '"></md-icon>')({})[0];

    return {
      require: ['^^mdCalendar', '^^mdCalendarMonth', 'mdCalendarMonthBody'],
      scope: { offset: '=mdMonthOffset' },
      controller: CalendarMonthBodyCtrl,
      controllerAs: 'mdMonthBodyCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) {
        var calendarCtrl = controllers[0];
        var monthCtrl = controllers[1];
        var monthBodyCtrl = controllers[2];

        monthBodyCtrl.calendarCtrl = calendarCtrl;
        monthBodyCtrl.monthCtrl = monthCtrl;
        monthBodyCtrl.arrowIcon = ARROW_ICON.cloneNode(true);

        // The virtual-repeat re-uses the same DOM elements, so there are only a limited number
        // of repeated items that are linked, and then those elements have their bindings updated.
        // Since the months are not generated by bindings, we simply regenerate the entire thing
        // when the binding (offset) changes.
        scope.$watch(function() { return monthBodyCtrl.offset; }, function(offset) {
          if (angular.isNumber(offset)) {
            monthBodyCtrl.generateContent();
          }
        });
      }
    };
  }

  /**
   * Controller for a single calendar month.
   * @ngInject @constructor
   */
  function CalendarMonthBodyCtrl($element, $$mdDateUtil, $mdDateLocale) {
    /**
     * @final
     * @type {!JQLite}
     */
    this.$element = $element;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.dateLocale = $mdDateLocale;

    /** @type {Object} Reference to the month view. */
    this.monthCtrl = null;

    /** @type {Object} Reference to the calendar. */
    this.calendarCtrl = null;

    /**
     * Number of months from the start of the month "items" that the currently rendered month
     * occurs. Set via angular data binding.
     * @type {number|null}
     */
    this.offset = null;

    /**
     * Date cell to focus after appending the month to the document.
     * @type {HTMLElement}
     */
    this.focusAfterAppend = null;
  }

  /** Generate and append the content for this month to the directive element. */
  CalendarMonthBodyCtrl.prototype.generateContent = function() {
    var date = this.dateUtil.incrementMonths(this.calendarCtrl.firstRenderableDate, this.offset);

    this.$element
      .empty()
      .append(this.buildCalendarForMonth(date));

    if (this.focusAfterAppend) {
      this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS);
      this.focusAfterAppend = null;
    }
  };

  /**
   * Creates a single cell to contain a date in the calendar with all appropriate
   * attributes and classes added. If a date is given, the cell content will be set
   * based on the date.
   * @param {Date=} opt_date
   * @returns {HTMLElement}
   */
  CalendarMonthBodyCtrl.prototype.buildDateCell = function(opt_date) {
    var monthCtrl = this.monthCtrl;
    var calendarCtrl = this.calendarCtrl;

    // TODO(jelbourn): cloneNode is likely a faster way of doing this.
    var cell = document.createElement('td');
    cell.tabIndex = -1;
    cell.classList.add('md-calendar-date');
    cell.setAttribute('role', 'gridcell');

    if (opt_date) {
      cell.setAttribute('tabindex', '-1');
      cell.setAttribute('aria-label', this.dateLocale.longDateFormatter(opt_date));
      cell.id = calendarCtrl.getDateId(opt_date, 'month');

      // Use `data-timestamp` attribute because IE10 does not support the `dataset` property.
      cell.setAttribute('data-timestamp', opt_date.getTime());

      // TODO(jelourn): Doing these comparisons for class addition during generation might be slow.
      // It may be better to finish the construction and then query the node and add the class.
      if (this.dateUtil.isSameDay(opt_date, calendarCtrl.today)) {
        cell.classList.add(calendarCtrl.TODAY_CLASS);
      }

      if (this.dateUtil.isValidDate(calendarCtrl.selectedDate) &&
          this.dateUtil.isSameDay(opt_date, calendarCtrl.selectedDate)) {
        cell.classList.add(calendarCtrl.SELECTED_DATE_CLASS);
        cell.setAttribute('aria-selected', 'true');
      }

      var cellText = this.dateLocale.dates[opt_date.getDate()];

      if (this.isDateEnabled(opt_date)) {
        // Add a indicator for select, hover, and focus states.
        var selectionIndicator = document.createElement('span');
        selectionIndicator.classList.add('md-calendar-date-selection-indicator');
        selectionIndicator.textContent = cellText;
        cell.appendChild(selectionIndicator);
        cell.addEventListener('click', monthCtrl.cellClickHandler);

        if (calendarCtrl.displayDate && this.dateUtil.isSameDay(opt_date, calendarCtrl.displayDate)) {
          this.focusAfterAppend = cell;
        }
      } else {
        cell.classList.add('md-calendar-date-disabled');
        cell.textContent = cellText;
      }
    }

    return cell;
  };

  /**
   * Check whether date is in range and enabled
   * @param {Date=} opt_date
   * @return {boolean} Whether the date is enabled.
   */
  CalendarMonthBodyCtrl.prototype.isDateEnabled = function(opt_date) {
    return this.dateUtil.isDateWithinRange(opt_date,
          this.calendarCtrl.minDate, this.calendarCtrl.maxDate) &&
          (!angular.isFunction(this.calendarCtrl.dateFilter)
           || this.calendarCtrl.dateFilter(opt_date));
  };

  /**
   * Builds a `tr` element for the calendar grid.
   * @param rowNumber The week number within the month.
   * @returns {HTMLElement}
   */
  CalendarMonthBodyCtrl.prototype.buildDateRow = function(rowNumber) {
    var row = document.createElement('tr');
    row.setAttribute('role', 'row');

    // Because of an NVDA bug (with Firefox), the row needs an aria-label in order
    // to prevent the entire row being read aloud when the user moves between rows.
    // See http://community.nvda-project.org/ticket/4643.
    row.setAttribute('aria-label', this.dateLocale.weekNumberFormatter(rowNumber));

    return row;
  };

  /**
   * Builds the <tbody> content for the given date's month.
   * @param {Date=} opt_dateInMonth
   * @returns {DocumentFragment} A document fragment containing the <tr> elements.
   */
  CalendarMonthBodyCtrl.prototype.buildCalendarForMonth = function(opt_dateInMonth) {
    var date = this.dateUtil.isValidDate(opt_dateInMonth) ? opt_dateInMonth : new Date();

    var firstDayOfMonth = this.dateUtil.getFirstDateOfMonth(date);
    var firstDayOfTheWeek = this.getLocaleDay_(firstDayOfMonth);
    var numberOfDaysInMonth = this.dateUtil.getNumberOfDaysInMonth(date);

    // Store rows for the month in a document fragment so that we can append them all at once.
    var monthBody = document.createDocumentFragment();

    var rowNumber = 1;
    var row = this.buildDateRow(rowNumber);
    monthBody.appendChild(row);

    // If this is the final month in the list of items, only the first week should render,
    // so we should return immediately after the first row is complete and has been
    // attached to the body.
    var isFinalMonth = this.offset === this.monthCtrl.items.length - 1;

    // Add a label for the month. If the month starts on a Sun/Mon/Tues, the month label
    // goes on a row above the first of the month. Otherwise, the month label takes up the first
    // two cells of the first row.
    var blankCellOffset = 0;
    var monthLabelCell = document.createElement('td');
    var monthLabelCellContent = document.createElement('span');
    var calendarCtrl = this.calendarCtrl;

    monthLabelCellContent.textContent = this.dateLocale.monthHeaderFormatter(date);
    monthLabelCell.appendChild(monthLabelCellContent);
    monthLabelCell.classList.add('md-calendar-month-label');
    // If the entire month is after the max date, render the label as a disabled state.
    if (calendarCtrl.maxDate && firstDayOfMonth > calendarCtrl.maxDate) {
      monthLabelCell.classList.add('md-calendar-month-label-disabled');
    // If the user isn't supposed to be able to change views, render the
    // label as usual, but disable the clicking functionality.
    } else if (!calendarCtrl.mode) {
      monthLabelCell.addEventListener('click', this.monthCtrl.headerClickHandler);
      monthLabelCell.setAttribute('data-timestamp', firstDayOfMonth.getTime());
      monthLabelCell.setAttribute('aria-label', this.dateLocale.monthFormatter(date));
      monthLabelCell.classList.add('md-calendar-label-clickable');
      monthLabelCell.appendChild(this.arrowIcon.cloneNode(true));
    }

    if (firstDayOfTheWeek <= 2) {
      monthLabelCell.setAttribute('colspan', '7');

      var monthLabelRow = this.buildDateRow();
      monthLabelRow.appendChild(monthLabelCell);
      monthBody.insertBefore(monthLabelRow, row);

      if (isFinalMonth) {
        return monthBody;
      }
    } else {
      blankCellOffset = 3;
      monthLabelCell.setAttribute('colspan', '3');
      row.appendChild(monthLabelCell);
    }

    // Add a blank cell for each day of the week that occurs before the first of the month.
    // For example, if the first day of the month is a Tuesday, add blank cells for Sun and Mon.
    // The blankCellOffset is needed in cases where the first N cells are used by the month label.
    for (var i = blankCellOffset; i < firstDayOfTheWeek; i++) {
      row.appendChild(this.buildDateCell());
    }

    // Add a cell for each day of the month, keeping track of the day of the week so that
    // we know when to start a new row.
    var dayOfWeek = firstDayOfTheWeek;
    var iterationDate = firstDayOfMonth;
    for (var d = 1; d <= numberOfDaysInMonth; d++) {
      // If we've reached the end of the week, start a new row.
      if (dayOfWeek === 7) {
        // We've finished the first row, so we're done if this is the final month.
        if (isFinalMonth) {
          return monthBody;
        }
        dayOfWeek = 0;
        rowNumber++;
        row = this.buildDateRow(rowNumber);
        monthBody.appendChild(row);
      }

      iterationDate.setDate(d);
      var cell = this.buildDateCell(iterationDate);
      row.appendChild(cell);

      dayOfWeek++;
    }

    // Ensure that the last row of the month has 7 cells.
    while (row.childNodes.length < 7) {
      row.appendChild(this.buildDateCell());
    }

    // Ensure that all months have 6 rows. This is necessary for now because the virtual-repeat
    // requires that all items have exactly the same height.
    while (monthBody.childNodes.length < 6) {
      var whitespaceRow = this.buildDateRow();
      for (var j = 0; j < 7; j++) {
        whitespaceRow.appendChild(this.buildDateCell());
      }
      monthBody.appendChild(whitespaceRow);
    }

    return monthBody;
  };

  /**
   * Gets the day-of-the-week index for a date for the current locale.
   * @private
   * @param {Date} date
   * @returns {number} The column index of the date in the calendar.
   */
  CalendarMonthBodyCtrl.prototype.getLocaleDay_ = function(date) {
    return (date.getDay() + (7 - this.dateLocale.firstDayOfWeek)) % 7;
  };
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  CalendarYearCtrl.$inject = ["$element", "$scope", "$animate", "$q", "$$mdDateUtil", "$mdUtil"];
  angular.module('material.components.datepicker')
    .directive('mdCalendarYear', calendarDirective);

  /**
   * Height of one calendar year tbody. This must be made known to the virtual-repeat and is
   * subsequently used for scrolling to specific years.
   */
  var TBODY_HEIGHT = 88;

  /** Private component, representing a list of years in the calendar. */
  function calendarDirective() {
    return {
      template:
        '<div class="md-calendar-scroll-mask">' +
          '<md-virtual-repeat-container class="md-calendar-scroll-container">' +
            '<table role="grid" tabindex="0" class="md-calendar" aria-readonly="true">' +
              '<tbody ' +
                  'md-calendar-year-body ' +
                  'role="rowgroup" ' +
                  'md-virtual-repeat="i in yearCtrl.items" ' +
                  'md-year-offset="$index" class="md-calendar-year" ' +
                  'md-start-index="yearCtrl.getFocusedYearIndex()" ' +
                  'md-item-size="' + TBODY_HEIGHT + '">' +
                // The <tr> ensures that the <tbody> will have the proper
                // height, even though it may be empty.
                '<tr aria-hidden="true" md-force-height="\'' + TBODY_HEIGHT + 'px\'"></tr>' +
              '</tbody>' +
            '</table>' +
          '</md-virtual-repeat-container>' +
        '</div>',
      require: ['^^mdCalendar', 'mdCalendarYear'],
      controller: CalendarYearCtrl,
      controllerAs: 'yearCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) {
        var calendarCtrl = controllers[0];
        var yearCtrl = controllers[1];
        yearCtrl.initialize(calendarCtrl);
      }
    };
  }

  /**
   * Controller for the mdCalendar component.
   * @ngInject @constructor
   */
  function CalendarYearCtrl($element, $scope, $animate, $q, $$mdDateUtil, $mdUtil) {

    /** @final {!angular.JQLite} */
    this.$element = $element;

    /** @final {!angular.Scope} */
    this.$scope = $scope;

    /** @final {!angular.$animate} */
    this.$animate = $animate;

    /** @final {!angular.$q} */
    this.$q = $q;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final {HTMLElement} */
    this.calendarScroller = $element[0].querySelector('.md-virtual-repeat-scroller');

    /** @type {boolean} */
    this.isInitialized = false;

    /** @type {boolean} */
    this.isMonthTransitionInProgress = false;

    /** @final */
    this.$mdUtil = $mdUtil;

    var self = this;

    /**
     * Handles a click event on a date cell.
     * Created here so that every cell can use the same function instance.
     * @this {HTMLTableCellElement} The cell that was clicked.
     */
    this.cellClickHandler = function() {
      self.onTimestampSelected($$mdDateUtil.getTimestampFromNode(this));
    };
  }

  /**
   * Initialize the controller by saving a reference to the calendar and
   * setting up the object that will be iterated by the virtual repeater.
   */
  CalendarYearCtrl.prototype.initialize = function(calendarCtrl) {
    /**
     * Dummy array-like object for virtual-repeat to iterate over. The length is the total
     * number of years that can be viewed. We add 1 extra in order to include the current year.
     */

    this.items = {
      length: this.dateUtil.getYearDistance(
        calendarCtrl.firstRenderableDate,
        calendarCtrl.lastRenderableDate
      ) + 1
    };

    this.calendarCtrl = calendarCtrl;
    this.attachScopeListeners();
    calendarCtrl.updateVirtualRepeat();

    // Fire the initial render, since we might have missed it the first time it fired.
    calendarCtrl.ngModelCtrl && calendarCtrl.ngModelCtrl.$render();
  };

  /**
   * Gets the "index" of the currently selected date as it would be in the virtual-repeat.
   * @returns {number}
   */
  CalendarYearCtrl.prototype.getFocusedYearIndex = function() {
    var calendarCtrl = this.calendarCtrl;

    return this.dateUtil.getYearDistance(
      calendarCtrl.firstRenderableDate,
      calendarCtrl.displayDate || calendarCtrl.selectedDate || calendarCtrl.today
    );
  };

  /**
   * Change the date that is highlighted in the calendar.
   * @param {Date} date
   */
  CalendarYearCtrl.prototype.changeDate = function(date) {
    // Initialization is deferred until this function is called because we want to reflect
    // the starting value of ngModel.
    if (!this.isInitialized) {
      this.calendarCtrl.hideVerticalScrollbar(this);
      this.isInitialized = true;
      return this.$q.when();
    } else if (this.dateUtil.isValidDate(date) && !this.isMonthTransitionInProgress) {
      var self = this;
      var animationPromise = this.animateDateChange(date);

      self.isMonthTransitionInProgress = true;
      self.calendarCtrl.displayDate = date;

      return animationPromise.then(function() {
        self.isMonthTransitionInProgress = false;
      });
    }
  };

  /**
   * Animates the transition from the calendar's current month to the given month.
   * @param {Date} date
   * @returns {angular.$q.Promise} The animation promise.
   */
  CalendarYearCtrl.prototype.animateDateChange = function(date) {
    if (this.dateUtil.isValidDate(date)) {
      var monthDistance = this.dateUtil.getYearDistance(this.calendarCtrl.firstRenderableDate, date);
      this.calendarScroller.scrollTop = monthDistance * TBODY_HEIGHT;
    }

    return this.$q.when();
  };

  /**
   * Handles the year-view-specific keyboard interactions.
   * @param {Object} event Scope event object passed by the calendar.
   * @param {String} action Action, corresponding to the key that was pressed.
   */
  CalendarYearCtrl.prototype.handleKeyEvent = function(event, action) {
    var self = this;
    var calendarCtrl = self.calendarCtrl;
    var displayDate = calendarCtrl.displayDate;

    if (action === 'select') {
      self.changeDate(displayDate).then(function() {
        self.onTimestampSelected(displayDate);
      });
    } else {
      var date = null;
      var dateUtil = self.dateUtil;

      switch (action) {
        case 'move-right': date = dateUtil.incrementMonths(displayDate, 1); break;
        case 'move-left': date = dateUtil.incrementMonths(displayDate, -1); break;

        case 'move-row-down': date = dateUtil.incrementMonths(displayDate, 6); break;
        case 'move-row-up': date = dateUtil.incrementMonths(displayDate, -6); break;
      }

      if (date) {
        var min = calendarCtrl.minDate ? dateUtil.getFirstDateOfMonth(calendarCtrl.minDate) : null;
        var max = calendarCtrl.maxDate ? dateUtil.getFirstDateOfMonth(calendarCtrl.maxDate) : null;
        date = dateUtil.getFirstDateOfMonth(self.dateUtil.clampDate(date, min, max));

        self.changeDate(date).then(function() {
          calendarCtrl.focusDate(date);
        });
      }
    }
  };

  /**
   * Attaches listeners for the scope events that are broadcast by the calendar.
   */
  CalendarYearCtrl.prototype.attachScopeListeners = function() {
    var self = this;

    self.$scope.$on('md-calendar-parent-changed', function(event, value) {
      self.calendarCtrl.changeSelectedDate(value ? self.dateUtil.getFirstDateOfMonth(value) : value);
      self.changeDate(value);
    });

    self.$scope.$on('md-calendar-parent-action', angular.bind(self, self.handleKeyEvent));
  };

  /**
   * Handles the behavior when a date is selected. Depending on the `mode`
   * of the calendar, this can either switch back to the calendar view or
   * set the model value.
   * @param {number} timestamp The selected timestamp.
   */
  CalendarYearCtrl.prototype.onTimestampSelected = function(timestamp) {
    var calendarCtrl = this.calendarCtrl;

    if (calendarCtrl.mode) {
      this.$mdUtil.nextTick(function() {
        // The timestamp has to be converted to a valid date.
        calendarCtrl.setNgModelValue(new Date(timestamp));
      });
    } else {
      calendarCtrl.setCurrentView('month', timestamp);
    }
  };
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  CalendarYearBodyCtrl.$inject = ["$element", "$$mdDateUtil", "$mdDateLocale"];
  angular.module('material.components.datepicker')
      .directive('mdCalendarYearBody', mdCalendarYearDirective);

  /**
   * Private component, consumed by the md-calendar-year, which separates the DOM construction logic
   * and allows for the year view to use md-virtual-repeat.
   */
  function mdCalendarYearDirective() {
    return {
      require: ['^^mdCalendar', '^^mdCalendarYear', 'mdCalendarYearBody'],
      scope: { offset: '=mdYearOffset' },
      controller: CalendarYearBodyCtrl,
      controllerAs: 'mdYearBodyCtrl',
      bindToController: true,
      link: function(scope, element, attrs, controllers) {
        var calendarCtrl = controllers[0];
        var yearCtrl = controllers[1];
        var yearBodyCtrl = controllers[2];

        yearBodyCtrl.calendarCtrl = calendarCtrl;
        yearBodyCtrl.yearCtrl = yearCtrl;

        scope.$watch(function() { return yearBodyCtrl.offset; }, function(offset) {
          if (angular.isNumber(offset)) {
            yearBodyCtrl.generateContent();
          }
        });
      }
    };
  }

  /**
   * Controller for a single year.
   * @ngInject @constructor
   */
  function CalendarYearBodyCtrl($element, $$mdDateUtil, $mdDateLocale) {
    /**
     * @final
     * @type {!JQLite}
     */
    this.$element = $element;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.dateLocale = $mdDateLocale;

    /** @type {Object} Reference to the calendar. */
    this.calendarCtrl = null;

    /** @type {Object} Reference to the year view. */
    this.yearCtrl = null;

    /**
     * Number of months from the start of the month "items" that the currently rendered month
     * occurs. Set via angular data binding.
     * @type {number|null}
     */
    this.offset = null;

    /**
     * Date cell to focus after appending the month to the document.
     * @type {HTMLElement}
     */
    this.focusAfterAppend = null;
  }

  /** Generate and append the content for this year to the directive element. */
  CalendarYearBodyCtrl.prototype.generateContent = function() {
    var date = this.dateUtil.incrementYears(this.calendarCtrl.firstRenderableDate, this.offset);

    this.$element
      .empty()
      .append(this.buildCalendarForYear(date));

    if (this.focusAfterAppend) {
      this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS);
      this.focusAfterAppend = null;
    }
  };

  /**
   * Creates a single cell to contain a year in the calendar.
   * @param {number} year Four-digit year.
   * @param {number} month Zero-indexed month.
   * @returns {HTMLElement}
   */
  CalendarYearBodyCtrl.prototype.buildMonthCell = function(year, month) {
    var calendarCtrl = this.calendarCtrl;
    var yearCtrl = this.yearCtrl;
    var cell = this.buildBlankCell();

    // Represent this month/year as a date.
    var firstOfMonth = new Date(year, month, 1);
    cell.setAttribute('aria-label', this.dateLocale.monthFormatter(firstOfMonth));
    cell.id = calendarCtrl.getDateId(firstOfMonth, 'year');

    // Use `data-timestamp` attribute because IE10 does not support the `dataset` property.
    cell.setAttribute('data-timestamp', String(firstOfMonth.getTime()));

    if (this.dateUtil.isSameMonthAndYear(firstOfMonth, calendarCtrl.today)) {
      cell.classList.add(calendarCtrl.TODAY_CLASS);
    }

    if (this.dateUtil.isValidDate(calendarCtrl.selectedDate) &&
        this.dateUtil.isSameMonthAndYear(firstOfMonth, calendarCtrl.selectedDate)) {
      cell.classList.add(calendarCtrl.SELECTED_DATE_CLASS);
      cell.setAttribute('aria-selected', 'true');
    }

    var cellText = this.dateLocale.shortMonths[month];

    if (this.dateUtil.isMonthWithinRange(
          firstOfMonth, calendarCtrl.minDate, calendarCtrl.maxDate) &&
      (!angular.isFunction(calendarCtrl.monthFilter) ||
        calendarCtrl.monthFilter(firstOfMonth))) {
      var selectionIndicator = document.createElement('span');
      selectionIndicator.classList.add('md-calendar-date-selection-indicator');
      selectionIndicator.textContent = cellText;
      cell.appendChild(selectionIndicator);
      cell.addEventListener('click', yearCtrl.cellClickHandler);

      if (calendarCtrl.displayDate &&
          this.dateUtil.isSameMonthAndYear(firstOfMonth, calendarCtrl.displayDate)) {
        this.focusAfterAppend = cell;
      }
    } else {
      cell.classList.add('md-calendar-date-disabled');
      cell.textContent = cellText;
    }

    return cell;
  };

  /**
   * Builds a blank cell.
   * @return {HTMLElement}
   */
  CalendarYearBodyCtrl.prototype.buildBlankCell = function() {
    var cell = document.createElement('td');
    cell.tabIndex = -1;
    cell.classList.add('md-calendar-date');
    cell.setAttribute('role', 'gridcell');

    cell.setAttribute('tabindex', '-1');
    return cell;
  };

  /**
   * Builds the <tbody> content for the given year.
   * @param {Date} date Date for which the content should be built.
   * @returns {DocumentFragment} A document fragment containing the months within the year.
   */
  CalendarYearBodyCtrl.prototype.buildCalendarForYear = function(date) {
    // Store rows for the month in a document fragment so that we can append them all at once.
    var year = date.getFullYear();
    var yearBody = document.createDocumentFragment();

    var monthCell, i;
    // First row contains label and Jan-Jun.
    var firstRow = document.createElement('tr');
    var labelCell = document.createElement('td');
    labelCell.className = 'md-calendar-month-label';
    labelCell.textContent = String(year);
    firstRow.appendChild(labelCell);

    for (i = 0; i < 6; i++) {
      firstRow.appendChild(this.buildMonthCell(year, i));
    }
    yearBody.appendChild(firstRow);

    // Second row contains a blank cell and Jul-Dec.
    var secondRow = document.createElement('tr');
    secondRow.appendChild(this.buildBlankCell());
    for (i = 6; i < 12; i++) {
      secondRow.appendChild(this.buildMonthCell(year, i));
    }
    yearBody.appendChild(secondRow);

    return yearBody;
  };
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name $mdDateLocaleProvider
   * @module material.components.datepicker
   *
   * @description
   * The `$mdDateLocaleProvider` is the provider that creates the `$mdDateLocale` service.
   * This provider that allows the user to specify messages, formatters, and parsers for date
   * internationalization. The `$mdDateLocale` service itself is consumed by AngularJS Material
   * components that deal with dates
   * (i.e. <a ng-href="api/directive/mdDatepicker">mdDatepicker</a>).
   *
   * @property {Array<string>} months Array of month names (in order).
   * @property {Array<string>} shortMonths Array of abbreviated month names.
   * @property {Array<string>} days Array of the days of the week (in order).
   * @property {Array<string>} shortDays Array of abbreviated days of the week.
   * @property {Array<string>} dates Array of dates of the month. Only necessary for locales
   *  using a numeral system other than [1, 2, 3...].
   * @property {Array<string>} firstDayOfWeek The first day of the week. Sunday = 0, Monday = 1,
   *  etc.
   * @property {function(string): Date} parseDate Function that converts a date string to a Date
   *  object (the date portion).
   * @property {function(Date, string): string} formatDate Function to format a date object to a
   *  string. The datepicker directive also provides the time zone, if it was specified.
   * @property {function(Date): string} monthHeaderFormatter Function that returns the label for
   *  a month given a date.
   * @property {function(Date): string} monthFormatter Function that returns the full name of a month
   *  for a given date.
   * @property {function(number): string} weekNumberFormatter Function that returns a label for
   *  a week given the week number.
   * @property {function(Date): string} longDateFormatter Function that formats a date into a long
   *  `aria-label` that is read by the screen reader when the focused date changes.
   * @property {string} msgCalendar Translation of the label "Calendar" for the current locale.
   * @property {string} msgOpenCalendar Translation of the button label "Open calendar" for the
   *  current locale.
   * @property {Date} firstRenderableDate The date from which the datepicker calendar will begin
   *  rendering. Note that this will be ignored if a minimum date is set.
   *  Defaults to January 1st 1880.
   * @property {Date} lastRenderableDate The last date that will be rendered by the datepicker
   *  calendar. Note that this will be ignored if a maximum date is set.
   *  Defaults to January 1st 2130.
   * @property {function(string): boolean} isDateComplete Function to determine whether a string
   *  makes sense to be parsed to a `Date` object. Returns `true` if the date appears to be complete
   *  and parsing should occur. By default, this checks for 3 groups of text or numbers separated
   *  by delimiters. This means that by default, date strings must include a month, day, and year
   *  to be parsed and for the model to be updated.
   *
   * @usage
   * <hljs lang="js">
   * myAppModule.config(function($mdDateLocaleProvider) {
   *
   *     // Example of a French localization.
   *     $mdDateLocaleProvider.months = ['janvier', 'février', 'mars', ...];
   *     $mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', ...];
   *     $mdDateLocaleProvider.days = ['dimanche', 'lundi', 'mardi', ...];
   *     $mdDateLocaleProvider.shortDays = ['Di', 'Lu', 'Ma', ...];
   *
   *     // Can change week display to start on Monday.
   *     $mdDateLocaleProvider.firstDayOfWeek = 1;
   *
   *     // Optional.
   *     $mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, ...];
   *
   *     // Example uses moment.js to parse and format dates.
   *     $mdDateLocaleProvider.parseDate = function(dateString) {
   *       var m = moment(dateString, 'L', true);
   *       return m.isValid() ? m.toDate() : new Date(NaN);
   *     };
   *
   *     $mdDateLocaleProvider.formatDate = function(date) {
   *       var m = moment(date);
   *       return m.isValid() ? m.format('L') : '';
   *     };
   *
   *     // Allow only a day and month to be specified.
   *     // This is required if using the 'M/D' format with moment.js.
   *     $mdDateLocaleProvider.isDateComplete = function(dateString) {
   *       dateString = dateString.trim();
   *
   *       // Look for two chunks of content (either numbers or text) separated by delimiters.
   *       var re = /^(([a-zA-Z]{3,}|[0-9]{1,4})([ .,]+|[/-]))([a-zA-Z]{3,}|[0-9]{1,4})/;
   *       return re.test(dateString);
   *     };
   *
   *     $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
   *       return myShortMonths[date.getMonth()] + ' ' + date.getFullYear();
   *     };
   *
   *     // In addition to date display, date components also need localized messages
   *     // for aria-labels for screen-reader users.
   *
   *     $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
   *       return 'Semaine ' + weekNumber;
   *     };
   *
   *     $mdDateLocaleProvider.msgCalendar = 'Calendrier';
   *     $mdDateLocaleProvider.msgOpenCalendar = 'Ouvrir le calendrier';
   *
   *     // You can also set when your calendar begins and ends.
   *     $mdDateLocaleProvider.firstRenderableDate = new Date(1776, 6, 4);
   *     $mdDateLocaleProvider.lastRenderableDate = new Date(2012, 11, 21);
   * });
   * </hljs>
   *
   */
  angular.module('material.components.datepicker').config(["$provide", function($provide) {
    // TODO(jelbourn): Assert provided values are correctly formatted. Need assertions.

    /** @constructor */
    function DateLocaleProvider() {
      /** Array of full month names. E.g., ['January', 'February', ...] */
      this.months = null;

      /** Array of abbreviated month names. E.g., ['Jan', 'Feb', ...] */
      this.shortMonths = null;

      /** Array of full day of the week names. E.g., ['Monday', 'Tuesday', ...] */
      this.days = null;

      /** Array of abbreviated dat of the week names. E.g., ['M', 'T', ...] */
      this.shortDays = null;

      /** Array of dates of a month (1 - 31). Characters might be different in some locales. */
      this.dates = null;

      /** Index of the first day of the week. 0 = Sunday, 1 = Monday, etc. */
      this.firstDayOfWeek = 0;

      /**
       * Function that converts the date portion of a Date to a string.
       * @type {(function(Date): string)}
       */
      this.formatDate = null;

      /**
       * Function that converts a date string to a Date object (the date portion)
       * @type {function(string): Date}
       */
      this.parseDate = null;

      /**
       * Function that formats a Date into a month header string.
       * @type {function(Date): string}
       */
      this.monthHeaderFormatter = null;

      /**
       * Function that formats a week number into a label for the week.
       * @type {function(number): string}
       */
      this.weekNumberFormatter = null;

      /**
       * Function that formats a date into a long aria-label that is read
       * when the focused date changes.
       * @type {function(Date): string}
       */
      this.longDateFormatter = null;

      /**
       * Function to determine whether a string makes sense to be
       * parsed to a Date object.
       * @type {function(string): boolean}
       */
      this.isDateComplete = null;

      /**
       * ARIA label for the calendar "dialog" used in the datepicker.
       * @type {string}
       */
      this.msgCalendar = '';

      /**
       * ARIA label for the datepicker's "Open calendar" buttons.
       * @type {string}
       */
      this.msgOpenCalendar = '';
    }

    /**
     * Factory function that returns an instance of the dateLocale service.
     * @ngInject
     * @param $locale
     * @param $filter
     * @returns {DateLocale}
     */
    DateLocaleProvider.prototype.$get = function($locale, $filter) {
      /**
       * Default date-to-string formatting function.
       * @param {!Date} date
       * @param {string=} timezone
       * @returns {string}
       */
      function defaultFormatDate(date, timezone) {
        if (!date) {
          return '';
        }

        // All of the dates created through ng-material *should* be set to midnight.
        // If we encounter a date where the localeTime shows at 11pm instead of midnight,
        // we have run into an issue with DST where we need to increment the hour by one:
        // var d = new Date(1992, 9, 8, 0, 0, 0);
        // d.toLocaleString(); // == "10/7/1992, 11:00:00 PM"
        var localeTime = date.toLocaleTimeString();
        var formatDate = date;
        if (date.getHours() === 0 &&
            (localeTime.indexOf('11:') !== -1 || localeTime.indexOf('23:') !== -1)) {
          formatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 0, 0);
        }

        return $filter('date')(formatDate, 'M/d/yyyy', timezone);
      }

      /**
       * Default string-to-date parsing function.
       * @param {string|number} dateString
       * @returns {!Date}
       */
      function defaultParseDate(dateString) {
        return new Date(dateString);
      }

      /**
       * Default function to determine whether a string makes sense to be
       * parsed to a Date object.
       *
       * This is very permissive and is just a basic sanity check to ensure that
       * things like single integers aren't able to be parsed into dates.
       * @param {string} dateString
       * @returns {boolean}
       */
      function defaultIsDateComplete(dateString) {
        dateString = dateString.trim();

        // Looks for three chunks of content (either numbers or text) separated
        // by delimiters.
        var re = /^(([a-zA-Z]{3,}|[0-9]{1,4})([ .,]+|[/-])){2}([a-zA-Z]{3,}|[0-9]{1,4})$/;
        return re.test(dateString);
      }

      /**
       * Default date-to-string formatter to get a month header.
       * @param {!Date} date
       * @returns {string}
       */
      function defaultMonthHeaderFormatter(date) {
        return service.shortMonths[date.getMonth()] + ' ' + date.getFullYear();
      }

      /**
       * Default formatter for a month.
       * @param {!Date} date
       * @returns {string}
       */
      function defaultMonthFormatter(date) {
        return service.months[date.getMonth()] + ' ' + date.getFullYear();
      }

      /**
       * Default week number formatter.
       * @param number
       * @returns {string}
       */
      function defaultWeekNumberFormatter(number) {
        return 'Week ' + number;
      }

      /**
       * Default formatter for date cell aria-labels.
       * @param {!Date} date
       * @returns {string}
       */
      function defaultLongDateFormatter(date) {
        // Example: 'Thursday June 18 2015'
        return [
          service.days[date.getDay()],
          service.months[date.getMonth()],
          service.dates[date.getDate()],
          date.getFullYear()
        ].join(' ');
      }

      // The default "short" day strings are the first character of each day,
      // e.g., "Monday" => "M".
      var defaultShortDays = $locale.DATETIME_FORMATS.SHORTDAY.map(function(day) {
        return day.substring(0, 1);
      });

      // The default dates are simply the numbers 1 through 31.
      var defaultDates = Array(32);
      for (var i = 1; i <= 31; i++) {
        defaultDates[i] = i;
      }

      // Default ARIA messages are in English (US).
      var defaultMsgCalendar = 'Calendar';
      var defaultMsgOpenCalendar = 'Open calendar';

      // Default start/end dates that are rendered in the calendar.
      var defaultFirstRenderableDate = new Date(1880, 0, 1);
      var defaultLastRendereableDate = new Date(defaultFirstRenderableDate.getFullYear() + 250, 0, 1);

      var service = {
        months: this.months || $locale.DATETIME_FORMATS.MONTH,
        shortMonths: this.shortMonths || $locale.DATETIME_FORMATS.SHORTMONTH,
        days: this.days || $locale.DATETIME_FORMATS.DAY,
        shortDays: this.shortDays || defaultShortDays,
        dates: this.dates || defaultDates,
        firstDayOfWeek: this.firstDayOfWeek || 0,
        formatDate: this.formatDate || defaultFormatDate,
        parseDate: this.parseDate || defaultParseDate,
        isDateComplete: this.isDateComplete || defaultIsDateComplete,
        monthHeaderFormatter: this.monthHeaderFormatter || defaultMonthHeaderFormatter,
        monthFormatter: this.monthFormatter || defaultMonthFormatter,
        weekNumberFormatter: this.weekNumberFormatter || defaultWeekNumberFormatter,
        longDateFormatter: this.longDateFormatter || defaultLongDateFormatter,
        msgCalendar: this.msgCalendar || defaultMsgCalendar,
        msgOpenCalendar: this.msgOpenCalendar || defaultMsgOpenCalendar,
        firstRenderableDate: this.firstRenderableDate || defaultFirstRenderableDate,
        lastRenderableDate: this.lastRenderableDate || defaultLastRendereableDate
      };

      return service;
    };
    DateLocaleProvider.prototype.$get.$inject = ["$locale", "$filter"];

    $provide.provider('$mdDateLocale', new DateLocaleProvider());
  }]);
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * Utility for performing date calculations to facilitate operation of the calendar and
   * datepicker.
   */
  angular.module('material.components.datepicker').factory('$$mdDateUtil', ["$mdDateLocale", function($mdDateLocale) {
    return {
      getFirstDateOfMonth: getFirstDateOfMonth,
      getNumberOfDaysInMonth: getNumberOfDaysInMonth,
      getDateInNextMonth: getDateInNextMonth,
      getDateInPreviousMonth: getDateInPreviousMonth,
      isInNextMonth: isInNextMonth,
      isInPreviousMonth: isInPreviousMonth,
      getDateMidpoint: getDateMidpoint,
      isSameMonthAndYear: isSameMonthAndYear,
      getWeekOfMonth: getWeekOfMonth,
      incrementDays: incrementDays,
      incrementMonths: incrementMonths,
      getLastDateOfMonth: getLastDateOfMonth,
      isSameDay: isSameDay,
      getMonthDistance: getMonthDistance,
      isValidDate: isValidDate,
      setDateTimeToMidnight: setDateTimeToMidnight,
      createDateAtMidnight: createDateAtMidnight,
      isDateWithinRange: isDateWithinRange,
      incrementYears: incrementYears,
      getYearDistance: getYearDistance,
      clampDate: clampDate,
      getTimestampFromNode: getTimestampFromNode,
      isMonthWithinRange: isMonthWithinRange,
      removeLocalTzAndReparseDate: removeLocalTzAndReparseDate
    };

    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    function getFirstDateOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns {number}
     */
    function getNumberOfDaysInMonth(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns {Date}
     */
    function getDateInNextMonth(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }

    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns {Date}
     */
    function getDateInPreviousMonth(date) {
      return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }

    /**
     * Gets whether two dates have the same month and year.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    function isSameMonthAndYear(d1, d2) {
      return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    }

    /**
     * Gets whether two dates are the same day (not not necessarily the same time).
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    function isSameDay(d1, d2) {
      return d1.getDate() == d2.getDate() && isSameMonthAndYear(d1, d2);
    }

    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    function isInNextMonth(startDate, endDate) {
      var nextMonth = getDateInNextMonth(startDate);
      return isSameMonthAndYear(nextMonth, endDate);
    }

    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    function isInPreviousMonth(startDate, endDate) {
      var previousMonth = getDateInPreviousMonth(startDate);
      return isSameMonthAndYear(endDate, previousMonth);
    }

    /**
     * Gets the midpoint between two dates.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {Date}
     */
    function getDateMidpoint(d1, d2) {
      return createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    }

    /**
     * Gets the week of the month that a given date occurs in.
     * @param {Date} date
     * @returns {number} Index of the week of the month (zero-based).
     */
    function getWeekOfMonth(date) {
      var firstDayOfMonth = getFirstDateOfMonth(date);
      return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    }

    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {Date} date
     * @param {number} numberOfDays
     * @returns {Date}
     */
    function incrementDays(date, numberOfDays) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays);
    }

    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {Date} date
     * @param {number} numberOfMonths
     * @returns {Date}
     */
    function incrementMonths(date, numberOfMonths) {
      // If the same date in the target month does not actually exist, the Date object will
      // automatically advance *another* month by the number of missing days.
      // For example, if you try to go from Jan. 30 to Feb. 30, you'll end up on March 2.
      // So, we check if the month overflowed and go to the last day of the target month instead.
      var dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1);
      var numberOfDaysInMonth = getNumberOfDaysInMonth(dateInTargetMonth);
      if (numberOfDaysInMonth < date.getDate()) {
        dateInTargetMonth.setDate(numberOfDaysInMonth);
      } else {
        dateInTargetMonth.setDate(date.getDate());
      }

      return dateInTargetMonth;
    }

    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    function getMonthDistance(start, end) {
      return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    }

    /**
     * Gets the last day of the month for the given date.
     * @param {Date} date
     * @returns {Date}
     */
    function getLastDateOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth(), getNumberOfDaysInMonth(date));
    }

    /**
     * Checks whether a date is valid.
     * @param {Date} date
     * @return {boolean} Whether the date is a valid Date.
     */
    function isValidDate(date) {
      return date && date.getTime && !isNaN(date.getTime());
    }

    /**
     * Sets a date's time to midnight.
     * @param {Date} date
     */
    function setDateTimeToMidnight(date) {
      if (isValidDate(date)) {
        date.setHours(0, 0, 0, 0);
      }
    }

    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor via opt_value.
     * @param {number|Date=} opt_value Leave undefined for a Date representing now. Or use a
     *  single value representing the number of seconds since the Unix Epoch or a Date object.
     * @return {Date} New date with time set to midnight.
     */
    function createDateAtMidnight(opt_value) {
      var date;
      if (angular.isDate(opt_value)) {
        date = opt_value;
      } else if (angular.isNumber(opt_value)) {
        date = new Date(opt_value);
      } else {
        date = new Date();
      }
      setDateTimeToMidnight(date);
      return date;
    }

     /**
      * Checks if a date is within a min and max range, ignoring the time component.
      * If minDate or maxDate are not dates, they are ignored.
      * @param {Date} date
      * @param {Date} minDate
      * @param {Date} maxDate
      */
     function isDateWithinRange(date, minDate, maxDate) {
       var dateAtMidnight = createDateAtMidnight(date);
       var minDateAtMidnight = isValidDate(minDate) ? createDateAtMidnight(minDate) : null;
       var maxDateAtMidnight = isValidDate(maxDate) ? createDateAtMidnight(maxDate) : null;
       return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
           (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
     }

    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {Date} date
     * @param {number} numberOfYears
     * @returns {Date}
     */
     function incrementYears(date, numberOfYears) {
       return incrementMonths(date, numberOfYears * 12);
     }

     /**
      * Get the integer distance between two years. This *only* considers the year portion of the
      * Date instances.
      *
      * @param {Date} start
      * @param {Date} end
      * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
      *     chronologically, this number will be negative.
      */
     function getYearDistance(start, end) {
       return end.getFullYear() - start.getFullYear();
     }

     /**
      * Clamps a date between a minimum and a maximum date.
      * @param {Date} date Date to be clamped
      * @param {Date=} minDate Minimum date
      * @param {Date=} maxDate Maximum date
      * @return {Date}
      */
     function clampDate(date, minDate, maxDate) {
       var boundDate = date;
       if (minDate && date < minDate) {
         boundDate = new Date(minDate.getTime());
       }
       if (maxDate && date > maxDate) {
         boundDate = new Date(maxDate.getTime());
       }
       return boundDate;
     }

     /**
      * Extracts and parses the timestamp from a DOM node.
      * @param  {HTMLElement} node Node from which the timestamp will be extracted.
      * @return {number} Time since epoch.
      */
     function getTimestampFromNode(node) {
       if (node && node.hasAttribute('data-timestamp')) {
         return Number(node.getAttribute('data-timestamp'));
       }
     }

     /**
      * Checks if a month is within a min and max range, ignoring the date and time components.
      * If minDate or maxDate are not dates, they are ignored.
      * @param {Date} date
      * @param {Date} minDate
      * @param {Date} maxDate
      */
     function isMonthWithinRange(date, minDate, maxDate) {
       var month = date.getMonth();
       var year = date.getFullYear();

       return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
        (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
     }

    /**
     * @param {Date} value
     * @return {boolean|boolean}
     */
    function removeLocalTzAndReparseDate(value) {
      var dateValue, formattedDate;
      // Remove the local timezone offset before calling formatDate.
      dateValue = new Date(value.getTime() + 60000 * value.getTimezoneOffset());
      formattedDate = $mdDateLocale.formatDate(dateValue);
      // parseDate only works with a date formatted by formatDate when using Moment validation.
      return $mdDateLocale.parseDate(formattedDate);
    }
  }]);
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  // TODO(jelbourn): forward more attributes to the internal input (required, autofocus, etc.)
  // TODO(jelbourn): something better for mobile (calendar panel takes up entire screen?)
  // TODO(jelbourn): input behavior (masking? auto-complete?)

  DatePickerCtrl.$inject = ["$scope", "$element", "$attrs", "$window", "$mdConstant", "$mdTheming", "$mdUtil", "$mdDateLocale", "$$mdDateUtil", "$$rAF", "$filter", "$timeout"];
  datePickerDirective.$inject = ["$$mdSvgRegistry", "$mdUtil", "$mdAria", "inputDirective"];
  angular.module('material.components.datepicker')
      .directive('mdDatepicker', datePickerDirective);

  /**
   * @ngdoc directive
   * @name mdDatepicker
   * @module material.components.datepicker
   *
   * @param {Date} ng-model The component's model. Expects either a JavaScript Date object or a
   *  value that can be parsed into one (e.g. a ISO 8601 string).
   * @param {Object=} ng-model-options Allows tuning of the way in which `ng-model` is being
   *  updated. Also allows for a timezone to be specified.
   *  <a href="https://docs.angularjs.org/api/ng/directive/ngModelOptions#usage">
   *    Read more at the ngModelOptions docs.</a>
   * @param {expression=} ng-change Expression evaluated when the model value changes.
   * @param {expression=} ng-focus Expression evaluated when the input is focused or the calendar
   *  is opened.
   * @param {expression=} ng-blur Expression evaluated when focus is removed from the input or the
   *  calendar is closed.
   * @param {boolean=} ng-disabled Whether the datepicker is disabled.
   * @param {boolean=} ng-required Whether a value is required for the datepicker.
   * @param {Date=} md-min-date Expression representing a min date (inclusive).
   * @param {Date=} md-max-date Expression representing a max date (inclusive).
   * @param {(function(Date): boolean)=} md-date-filter Function expecting a date and returning a
   *  boolean whether it can be selected in "day" mode or not. Returning false will also trigger a
   *  `filtered` model validation error.
   * @param {(function(Date): boolean)=} md-month-filter Function expecting a date and returning a
   *  boolean whether it can be selected in "month" mode or not. Returning false will also trigger a
   *  `filtered` model validation error.
   * @param {String=} md-placeholder The date input placeholder value.
   * @param {String=} md-open-on-focus When present, the calendar will be opened when the input
   *  is focused.
   * @param {Boolean=} md-is-open Expression that can be used to open the datepicker's calendar
   *  on-demand.
   * @param {String=} md-current-view Default open view of the calendar pane. Can be either
   *  "month" or "year".
   * @param {String=} md-mode Restricts the user to only selecting a value from a particular view.
   *  This option can be used if the user is only supposed to choose from a certain date type
   *  (e.g. only selecting the month).
   * Can be either "month" or "day". **Note** that this will overwrite the `md-current-view` value.
   *
   * @param {String=} md-hide-icons Determines which datepicker icons should be hidden. Note that
   *  this may cause the datepicker to not align properly with other components.
   *  **Use at your own risk.** Possible values are:
   * * `"all"` - Hides all icons.
   * * `"calendar"` - Only hides the calendar icon.
   * * `"triangle"` - Only hides the triangle icon.
   * @param {Object=} md-date-locale Allows for the values from the `$mdDateLocaleProvider` to be
   * overwritten on a per-element basis (e.g. `msgOpenCalendar` can be overwritten with
   * `md-date-locale="{ msgOpenCalendar: 'Open a special calendar' }"`).
   *
   * @description
   * `<md-datepicker>` is a component used to select a single date.
   * For information on how to configure internationalization for the date picker,
   * see <a ng-href="api/service/$mdDateLocaleProvider">$mdDateLocaleProvider</a>.
   *
   * This component supports
   * [ngMessages](https://docs.angularjs.org/api/ngMessages/directive/ngMessages).
   * Supported attributes are:
   * * `required`: whether a required date is not set.
   * * `mindate`: whether the selected date is before the minimum allowed date.
   * * `maxdate`: whether the selected date is after the maximum allowed date.
   * * `debounceInterval`: ms to delay input processing (since last debounce reset);
   *    default value 500ms
   *
   * @usage
   * <hljs lang="html">
   *   <md-datepicker ng-model="birthday"></md-datepicker>
   * </hljs>
   *
   */

  function datePickerDirective($$mdSvgRegistry, $mdUtil, $mdAria, inputDirective) {
    return {
      template: function(tElement, tAttrs) {
        // Buttons are not in the tab order because users can open the calendar via keyboard
        // interaction on the text input, and multiple tab stops for one component (picker)
        // may be confusing.
        var hiddenIcons = tAttrs.mdHideIcons;
        var ariaLabelValue = tAttrs.ariaLabel || tAttrs.mdPlaceholder;
        var ngModelOptions = tAttrs.ngModelOptions;

        var calendarButton = (hiddenIcons === 'all' || hiddenIcons === 'calendar') ? '' :
          '<md-button class="md-datepicker-button md-icon-button" type="button" ' +
              'tabindex="-1" aria-hidden="true" ' +
              'ng-click="ctrl.openCalendarPane($event)">' +
            '<md-icon class="md-datepicker-calendar-icon" aria-label="md-calendar" ' +
                     'md-svg-src="' + $$mdSvgRegistry.mdCalendar + '"></md-icon>' +
          '</md-button>';

        var triangleButton = '';

        if (hiddenIcons !== 'all' && hiddenIcons !== 'triangle') {
          triangleButton = '' +
            '<md-button type="button" md-no-ink ' +
              'class="md-datepicker-triangle-button md-icon-button" ' +
              'ng-click="ctrl.openCalendarPane($event)" ' +
              'aria-label="{{::ctrl.locale.msgOpenCalendar}}">' +
            '<div class="md-datepicker-expand-triangle"></div>' +
          '</md-button>';

          tElement.addClass(HAS_TRIANGLE_ICON_CLASS);
        }

        return calendarButton +
        '<div class="md-datepicker-input-container" ng-class="{\'md-datepicker-focused\': ctrl.isFocused}">' +
          '<input ' +
            (ariaLabelValue ? 'aria-label="' + ariaLabelValue + '" ' : '') +
            'class="md-datepicker-input" ' +
            'aria-haspopup="dialog" ' +
            'ng-focus="ctrl.setFocused(true)" ' +
            'ng-blur="ctrl.setFocused(false)"> ' +
            triangleButton +
        '</div>' +

        // This pane will be detached from here and re-attached to the document body.
        '<div class="md-datepicker-calendar-pane md-whiteframe-z1" id="{{::ctrl.calendarPaneId}}">' +
          '<div class="md-datepicker-input-mask">' +
            '<div class="md-datepicker-input-mask-opaque"></div>' +
          '</div>' +
          '<div class="md-datepicker-calendar">' +
            '<md-calendar role="dialog" aria-label="{{::ctrl.locale.msgCalendar}}" ' +
                'md-current-view="{{::ctrl.currentView}}" ' +
                'md-mode="{{::ctrl.mode}}" ' +
                'md-min-date="ctrl.minDate" ' +
                'md-max-date="ctrl.maxDate" ' +
                'md-date-filter="ctrl.dateFilter" ' +
                'md-month-filter="ctrl.monthFilter" ' +
                (ngModelOptions ? 'ng-model-options="' + ngModelOptions + '" ' : '') +
                'ng-model="ctrl.date" ng-if="ctrl.isCalendarOpen">' +
            '</md-calendar>' +
          '</div>' +
        '</div>';
      },
      require: ['ngModel', 'mdDatepicker', '?^mdInputContainer', '?^form'],
      scope: {
        minDate: '=mdMinDate',
        maxDate: '=mdMaxDate',
        placeholder: '@mdPlaceholder',
        currentView: '@mdCurrentView',
        mode: '@mdMode',
        dateFilter: '=mdDateFilter',
        monthFilter: '=mdMonthFilter',
        isOpen: '=?mdIsOpen',
        debounceInterval: '=mdDebounceInterval',
        dateLocale: '=mdDateLocale'
      },
      controller: DatePickerCtrl,
      controllerAs: 'ctrl',
      bindToController: true,
      link: function(scope, element, attr, controllers) {
        var ngModelCtrl = controllers[0];
        var mdDatePickerCtrl = controllers[1];
        var mdInputContainer = controllers[2];
        var parentForm = controllers[3];
        var mdNoAsterisk = $mdUtil.parseAttributeBoolean(attr.mdNoAsterisk);

        mdDatePickerCtrl.configureNgModel(ngModelCtrl, mdInputContainer, inputDirective);

        if (mdInputContainer) {
          // We need to move the spacer after the datepicker itself,
          // because md-input-container adds it after the
          // md-datepicker-input by default. The spacer gets wrapped in a
          // div, because it floats and gets aligned next to the datepicker.
          // There are easier ways of working around this with CSS (making the
          // datepicker 100% wide, change the `display` etc.), however they
          // break the alignment with any other form controls.
          var spacer = element[0].querySelector('.md-errors-spacer');

          if (spacer) {
            element.after(angular.element('<div>').append(spacer));
          }

          mdInputContainer.setHasPlaceholder(attr.mdPlaceholder);
          mdInputContainer.input = element;
          mdInputContainer.element
            .addClass(INPUT_CONTAINER_CLASS)
            .toggleClass(HAS_CALENDAR_ICON_CLASS,
              attr.mdHideIcons !== 'calendar' && attr.mdHideIcons !== 'all');

          if (!mdInputContainer.label) {
            $mdAria.expect(element, 'aria-label', attr.mdPlaceholder);
          } else if (!mdNoAsterisk) {
            attr.$observe('required', function(value) {
              mdInputContainer.label.toggleClass('md-required', !!value);
            });
          }

          scope.$watch(mdInputContainer.isErrorGetter || function() {
            return ngModelCtrl.$invalid && (ngModelCtrl.$touched ||
              (parentForm && parentForm.$submitted));
          }, mdInputContainer.setInvalid);
        } else if (parentForm) {
          // If invalid, highlights the input when the parent form is submitted.
          var parentSubmittedWatcher = scope.$watch(function() {
            return parentForm.$submitted;
          }, function(isSubmitted) {
            if (isSubmitted) {
              mdDatePickerCtrl.updateErrorState();
              parentSubmittedWatcher();
            }
          });
        }
      }
    };
  }

  /** Additional offset for the input's `size` attribute, which is updated based on its content. */
  var EXTRA_INPUT_SIZE = 3;

  /** Class applied to the container if the date is invalid. */
  var INVALID_CLASS = 'md-datepicker-invalid';

  /** Class applied to the datepicker when it's open. */
  var OPEN_CLASS = 'md-datepicker-open';

  /** Class applied to the md-input-container, if a datepicker is placed inside it */
  var INPUT_CONTAINER_CLASS = '_md-datepicker-floating-label';

  /** Class to be applied when the calendar icon is enabled. */
  var HAS_CALENDAR_ICON_CLASS = '_md-datepicker-has-calendar-icon';

  /** Class to be applied when the triangle icon is enabled. */
  var HAS_TRIANGLE_ICON_CLASS = '_md-datepicker-has-triangle-icon';

  /** Default time in ms to debounce input event by. */
  var DEFAULT_DEBOUNCE_INTERVAL = 500;

  /**
   * Height of the calendar pane used to check if the pane is going outside the boundary of
   * the viewport. See calendar.scss for how $md-calendar-height is computed; an extra 20px is
   * also added to space the pane away from the exact edge of the screen.
   *
   *  This is computed statically now, but can be changed to be measured if the circumstances
   *  of calendar sizing are changed.
   */
  var CALENDAR_PANE_HEIGHT = 368;

  /**
   * Width of the calendar pane used to check if the pane is going outside the boundary of
   * the viewport. See calendar.scss for how $md-calendar-width is computed; an extra 20px is
   * also added to space the pane away from the exact edge of the screen.
   *
   *  This is computed statically now, but can be changed to be measured if the circumstances
   *  of calendar sizing are changed.
   */
  var CALENDAR_PANE_WIDTH = 360;

  /** Used for checking whether the current user agent is on iOS or Android. */
  var IS_MOBILE_REGEX = /ipad|iphone|ipod|android/i;

  /**
   * Controller for md-datepicker.
   *
   * @ngInject @constructor
   */
  function DatePickerCtrl($scope, $element, $attrs, $window, $mdConstant, $mdTheming, $mdUtil,
                          $mdDateLocale, $$mdDateUtil, $$rAF, $filter, $timeout) {

    /** @final */
    this.$window = $window;

    /** @final */
    this.dateUtil = $$mdDateUtil;

    /** @final */
    this.$mdConstant = $mdConstant;

    /** @final */
    this.$mdUtil = $mdUtil;

    /** @final */
    this.$$rAF = $$rAF;

    /** @final */
    this.$mdDateLocale = $mdDateLocale;

    /** @final */
    this.$timeout = $timeout;

    /**
     * The root document element. This is used for attaching a top-level click handler to
     * close the calendar panel when a click outside said panel occurs. We use `documentElement`
     * instead of body because, when scrolling is disabled, some browsers consider the body element
     * to be completely off the screen and propagate events directly to the html element.
     * @type {!JQLite}
     */
    this.documentElement = angular.element(document.documentElement);

    /** @type {!ngModel.NgModelController} */
    this.ngModelCtrl = null;

    /** @type {HTMLInputElement} */
    this.inputElement = $element[0].querySelector('input');

    /**
     * @final
     * @type {!JQLite}
     */
    this.ngInputElement = angular.element(this.inputElement);

    /** @type {HTMLElement} */
    this.inputContainer = $element[0].querySelector('.md-datepicker-input-container');

    /** @type {HTMLElement} Floating calendar pane. */
    this.calendarPane = $element[0].querySelector('.md-datepicker-calendar-pane');

    /** @type {HTMLElement} Calendar icon button. */
    this.calendarButton = $element[0].querySelector('.md-datepicker-button');

    /**
     * Element covering everything but the input in the top of the floating calendar pane.
     * @type {!JQLite}
     */
    this.inputMask = angular.element($element[0].querySelector('.md-datepicker-input-mask-opaque'));

    /**
     * @final
     * @type {!JQLite}
     */
    this.$element = $element;

    /**
     * @final
     * @type {!angular.Attributes}
     */
    this.$attrs = $attrs;

    /**
     * @final
     * @type {!angular.Scope}
     */
    this.$scope = $scope;

    /** @type {Date} */
    this.date = null;

    /** @type {boolean} */
    this.isFocused = false;

    /** @type {boolean} */
    this.isDisabled = undefined;
    this.setDisabled($element[0].disabled || angular.isString($attrs.disabled));

    /** @type {boolean} Whether the date-picker's calendar pane is open. */
    this.isCalendarOpen = false;

    /** @type {boolean} Whether the calendar should open when the input is focused. */
    this.openOnFocus = $attrs.hasOwnProperty('mdOpenOnFocus');

    /** @type {Object} Instance of the mdInputContainer controller */
    this.mdInputContainer = null;

    /**
     * Element from which the calendar pane was opened. Keep track of this so that we can return
     * focus to it when the pane is closed.
     * @type {HTMLElement}
     */
    this.calendarPaneOpenedFrom = null;

    /** @type {String} Unique id for the calendar pane. */
    this.calendarPaneId = 'md-date-pane-' + $mdUtil.nextUid();

    /** Pre-bound click handler is saved so that the event listener can be removed. */
    this.bodyClickHandler = angular.bind(this, this.handleBodyClick);

    /**
     * Name of the event that will trigger a close. Necessary to sniff the browser, because
     * the resize event doesn't make sense on mobile and can have a negative impact since it
     * triggers whenever the browser zooms in on a focused input.
     */
    this.windowEventName = IS_MOBILE_REGEX.test(
      navigator.userAgent || navigator.vendor || window.opera
    ) ? 'orientationchange' : 'resize';

    /** Pre-bound close handler so that the event listener can be removed. */
    this.windowEventHandler = $mdUtil.debounce(angular.bind(this, this.closeCalendarPane), 100);

    /** Pre-bound handler for the window blur event. Allows for it to be removed later. */
    this.windowBlurHandler = angular.bind(this, this.handleWindowBlur);

    /** The built-in AngularJS date filter. */
    this.ngDateFilter = $filter('date');

    /** @type {Number} Extra margin for the left side of the floating calendar pane. */
    this.leftMargin = 20;

    /** @type {Number} Extra margin for the top of the floating calendar. Gets determined on the first open. */
    this.topMargin = null;

    // Unless the user specifies so, the datepicker should not be a tab stop.
    // This is necessary because ngAria might add a tabindex to anything with an ng-model
    // (based on whether or not the user has turned that particular feature on/off).
    if ($attrs.tabindex) {
      this.ngInputElement.attr('tabindex', $attrs.tabindex);
      $attrs.$set('tabindex', null);
    } else {
      $attrs.$set('tabindex', '-1');
    }

    $attrs.$set('aria-owns', this.calendarPaneId);

    $mdTheming($element);
    $mdTheming(angular.element(this.calendarPane));

    var self = this;

    $scope.$on('$destroy', function() {
      self.detachCalendarPane();
    });

    if ($attrs.mdIsOpen) {
      $scope.$watch('ctrl.isOpen', function(shouldBeOpen) {
        if (shouldBeOpen) {
          self.openCalendarPane({
            target: self.inputElement
          });
        } else {
          self.closeCalendarPane();
        }
      });
    }

    // For AngularJS 1.4 and older, where there are no lifecycle hooks but bindings are
    // pre-assigned, manually call the $onInit hook.
    if (angular.version.major === 1 && angular.version.minor <= 4) {
      this.$onInit();
    }
  }

  /**
   * AngularJS Lifecycle hook for newer AngularJS versions.
   * Bindings are not guaranteed to have been assigned in the controller, but they are in the
   * $onInit hook.
   */
  DatePickerCtrl.prototype.$onInit = function() {

    /**
     * Holds locale-specific formatters, parsers, labels etc. Allows
     * the user to override specific ones from the $mdDateLocale provider.
     * @type {!Object}
     */
    this.locale = this.dateLocale ? angular.extend({}, this.$mdDateLocale, this.dateLocale)
      : this.$mdDateLocale;

    this.installPropertyInterceptors();
    this.attachChangeListeners();
    this.attachInteractionListeners();
  };

  /**
   * Sets up the controller's reference to ngModelController and
   * applies AngularJS's `input[type="date"]` directive.
   * @param {!angular.NgModelController} ngModelCtrl Instance of the ngModel controller.
   * @param {Object} mdInputContainer Instance of the mdInputContainer controller.
   * @param {Object} inputDirective Config for AngularJS's `input` directive.
   */
  DatePickerCtrl.prototype.configureNgModel = function(ngModelCtrl, mdInputContainer, inputDirective) {
    this.ngModelCtrl = ngModelCtrl;
    this.mdInputContainer = mdInputContainer;

    // The input needs to be [type="date"] in order to be picked up by AngularJS.
    this.$attrs.$set('type', 'date');

    // Invoke the `input` directive link function, adding a stub for the element.
    // This allows us to re-use AngularJS's logic for setting the timezone via ng-model-options.
    // It works by calling the link function directly which then adds the proper `$parsers` and
    // `$formatters` to the ngModel controller.
    inputDirective[0].link.pre(this.$scope, {
      on: angular.noop,
      val: angular.noop,
      0: {}
    }, this.$attrs, [ngModelCtrl]);

    var self = this;

    // Responds to external changes to the model value.
    self.ngModelCtrl.$formatters.push(function(value) {
      var parsedValue = angular.isDefined(value) ? value : null;

      if (!(value instanceof Date)) {
        parsedValue = Date.parse(value);

        // `parsedValue` is the time since epoch if valid or `NaN` if invalid.
        if (!isNaN(parsedValue) && angular.isNumber(parsedValue)) {
          value = new Date(parsedValue);
        }

        if (value && !(value instanceof Date)) {
          throw Error(
            'The ng-model for md-datepicker must be a Date instance or a value ' +
              'that can be parsed into a date. Currently the model is of type: ' + typeof value
          );
        }
      }

      self.onExternalChange(value);

      return value;
    });

    // Responds to external error state changes (e.g. ng-required based on another input).
    ngModelCtrl.$viewChangeListeners.unshift(angular.bind(this, this.updateErrorState));

    // Forwards any events from the input to the root element. This is necessary to get `updateOn`
    // working for events that don't bubble (e.g. 'blur') since AngularJS binds the handlers to
    // the `<md-datepicker>`.
    var updateOn = self.$mdUtil.getModelOption(ngModelCtrl, 'updateOn');

    if (updateOn) {
      this.ngInputElement.on(
        updateOn,
        angular.bind(this.$element, this.$element.triggerHandler, updateOn)
      );
    }
  };

  /**
   * Attach event listeners for both the text input and the md-calendar.
   * Events are used instead of ng-model so that updates don't infinitely update the other
   * on a change. This should also be more performant than using a $watch.
   */
  DatePickerCtrl.prototype.attachChangeListeners = function() {
    var self = this;

    self.$scope.$on('md-calendar-change', function(event, date) {
      self.setModelValue(date);
      self.onExternalChange(date);
      self.closeCalendarPane();
    });

    self.ngInputElement.on('input', angular.bind(self, self.resizeInputElement));

    var debounceInterval = angular.isDefined(this.debounceInterval) ?
        this.debounceInterval : DEFAULT_DEBOUNCE_INTERVAL;
    self.ngInputElement.on('input', self.$mdUtil.debounce(self.handleInputEvent,
        debounceInterval, self));
  };

  /** Attach event listeners for user interaction. */
  DatePickerCtrl.prototype.attachInteractionListeners = function() {
    var self = this;
    var $scope = this.$scope;
    var keyCodes = this.$mdConstant.KEY_CODE;

    // Add event listener through angular so that we can triggerHandler in unit tests.
    self.ngInputElement.on('keydown', function(event) {
      if (event.altKey && event.keyCode === keyCodes.DOWN_ARROW) {
        self.openCalendarPane(event);
        $scope.$digest();
      }
    });

    if (self.openOnFocus) {
      self.ngInputElement.on('focus', angular.bind(self, self.openCalendarPane));
      self.ngInputElement.on('click', function(event) {
        event.stopPropagation();
      });
      self.ngInputElement.on('pointerdown',function(event) {
        if (event.target && event.target.setPointerCapture) {
          event.target.setPointerCapture(event.pointerId);
        }
      });

      angular.element(self.$window).on('blur', self.windowBlurHandler);

      $scope.$on('$destroy', function() {
        angular.element(self.$window).off('blur', self.windowBlurHandler);
      });
    }

    $scope.$on('md-calendar-close', function() {
      self.closeCalendarPane();
    });
  };

  /**
   * Capture properties set to the date-picker and imperatively handle internal changes.
   * This is done to avoid setting up additional $watches.
   */
  DatePickerCtrl.prototype.installPropertyInterceptors = function() {
    var self = this;

    if (this.$attrs.ngDisabled) {
      // The expression is to be evaluated against the directive element's scope and not
      // the directive's isolate scope.
      var scope = this.$scope.$parent;

      if (scope) {
        scope.$watch(this.$attrs.ngDisabled, function(isDisabled) {
          self.setDisabled(isDisabled);
        });
      }
    }

    Object.defineProperty(this, 'placeholder', {
      get: function() { return self.inputElement.placeholder; },
      set: function(value) { self.inputElement.placeholder = value || ''; }
    });
  };

  /**
   * Sets whether the date-picker is disabled.
   * @param {boolean} isDisabled
   */
  DatePickerCtrl.prototype.setDisabled = function(isDisabled) {
    this.isDisabled = isDisabled;
    this.inputElement.disabled = isDisabled;

    if (this.calendarButton) {
      this.calendarButton.disabled = isDisabled;
    }
  };

  /**
   * Sets the custom ngModel.$error flags to be consumed by ngMessages. Flags are:
   *   - mindate: whether the selected date is before the minimum date.
   *   - maxdate: whether the selected flag is after the maximum date.
   *   - filtered: whether the selected date is allowed by the custom filtering function.
   *   - valid: whether the entered text input is a valid date
   *
   * The 'required' flag is handled automatically by ngModel.
   *
   * @param {Date=} opt_date Date to check. If not given, defaults to the datepicker's model value.
   */
  DatePickerCtrl.prototype.updateErrorState = function(opt_date) {
    var date = opt_date || this.date;

    // Clear any existing errors to get rid of anything that's no longer relevant.
    this.clearErrorState();

    if (this.dateUtil.isValidDate(date)) {
      // Force all dates to midnight in order to ignore the time portion.
      date = this.dateUtil.createDateAtMidnight(date);

      if (this.dateUtil.isValidDate(this.minDate)) {
        var minDate = this.dateUtil.createDateAtMidnight(this.minDate);
        this.ngModelCtrl.$setValidity('mindate', date >= minDate);
      }

      if (this.dateUtil.isValidDate(this.maxDate)) {
        var maxDate = this.dateUtil.createDateAtMidnight(this.maxDate);
        this.ngModelCtrl.$setValidity('maxdate', date <= maxDate);
      }

      if (angular.isFunction(this.dateFilter)) {
        this.ngModelCtrl.$setValidity('filtered', this.dateFilter(date));
      }

      if (angular.isFunction(this.monthFilter)) {
        this.ngModelCtrl.$setValidity('filtered', this.monthFilter(date));
      }
    } else {
      // The date is seen as "not a valid date" if there is *something* set
      // (i.e.., not null or undefined), but that something isn't a valid date.
      this.ngModelCtrl.$setValidity('valid', date == null);
    }

    var input = this.inputElement.value;
    var parsedDate = this.locale.parseDate(input);

    if (!this.isInputValid(input, parsedDate) && this.ngModelCtrl.$valid) {
      this.ngModelCtrl.$setValidity('valid', date == null);
    }

    angular.element(this.inputContainer).toggleClass(INVALID_CLASS,
      this.ngModelCtrl.$invalid && (this.ngModelCtrl.$touched || this.ngModelCtrl.$submitted));
  };

  /**
   * Check to see if the input is valid, as the validation should fail if the model is invalid.
   *
   * @param {string} inputString
   * @param {Date} parsedDate
   * @return {boolean} Whether the input is valid
   */
  DatePickerCtrl.prototype.isInputValid = function (inputString, parsedDate) {
    return inputString === '' || (
      this.dateUtil.isValidDate(parsedDate) &&
      this.locale.isDateComplete(inputString) &&
      this.isDateEnabled(parsedDate)
    );
  };

  /** Clears any error flags set by `updateErrorState`. */
  DatePickerCtrl.prototype.clearErrorState = function() {
    this.inputContainer.classList.remove(INVALID_CLASS);
    ['mindate', 'maxdate', 'filtered', 'valid'].forEach(function(field) {
      this.ngModelCtrl.$setValidity(field, true);
    }, this);
  };

  /** Resizes the input element based on the size of its content. */
  DatePickerCtrl.prototype.resizeInputElement = function() {
    this.inputElement.size = this.inputElement.value.length + EXTRA_INPUT_SIZE;
  };

  /**
   * Sets the model value if the user input is a valid date.
   * Adds an invalid class to the input element if not.
   */
  DatePickerCtrl.prototype.handleInputEvent = function() {
    var inputString = this.inputElement.value;
    var parsedDate = inputString ? this.locale.parseDate(inputString) : null;
    this.dateUtil.setDateTimeToMidnight(parsedDate);

    // An input string is valid if it is either empty (representing no date)
    // or if it parses to a valid date that the user is allowed to select.
    var isValidInput = this.isInputValid(inputString, parsedDate);

    // The datepicker's model is only updated when there is a valid input.
    if (isValidInput) {
      this.setModelValue(parsedDate);
      this.date = parsedDate;
    }

    this.updateErrorState(parsedDate);
  };

  /**
   * Check whether date is in range and enabled
   * @param {Date=} opt_date
   * @return {boolean} Whether the date is enabled.
   */
  DatePickerCtrl.prototype.isDateEnabled = function(opt_date) {
    return this.dateUtil.isDateWithinRange(opt_date, this.minDate, this.maxDate) &&
          (!angular.isFunction(this.dateFilter) || this.dateFilter(opt_date)) &&
          (!angular.isFunction(this.monthFilter) || this.monthFilter(opt_date));
  };

  /** Position and attach the floating calendar to the document. */
  DatePickerCtrl.prototype.attachCalendarPane = function() {
    var calendarPane = this.calendarPane;
    var body = document.body;

    calendarPane.style.transform = '';
    this.$element.addClass(OPEN_CLASS);
    this.mdInputContainer && this.mdInputContainer.element.addClass(OPEN_CLASS);
    angular.element(body).addClass('md-datepicker-is-showing');

    var elementRect = this.inputContainer.getBoundingClientRect();
    var bodyRect = body.getBoundingClientRect();

    if (!this.topMargin || this.topMargin < 0) {
      this.topMargin =
        (this.inputMask.parent().prop('clientHeight')
          - this.ngInputElement.prop('clientHeight')) / 2;
    }

    // Check to see if the calendar pane would go off the screen. If so, adjust position
    // accordingly to keep it within the viewport.
    var paneTop = elementRect.top - bodyRect.top - this.topMargin;
    var paneLeft = elementRect.left - bodyRect.left - this.leftMargin;

    // If ng-material has disabled body scrolling (for example, if a dialog is open),
    // then it's possible that the already-scrolled body has a negative top/left. In this case,
    // we want to treat the "real" top as (0 - bodyRect.top). In a normal scrolling situation,
    // though, the top of the viewport should just be the body's scroll position.
    var viewportTop = (bodyRect.top < 0 && document.body.scrollTop === 0) ?
        -bodyRect.top :
        document.body.scrollTop;

    var viewportLeft = (bodyRect.left < 0 && document.body.scrollLeft === 0) ?
        -bodyRect.left :
        document.body.scrollLeft;

    var viewportBottom = viewportTop + this.$window.innerHeight;
    var viewportRight = viewportLeft + this.$window.innerWidth;

    // Creates an overlay with a hole the same size as element. We remove a pixel or two
    // on each end to make it overlap slightly. The overlay's background is added in
    // the theme in the form of a box-shadow with a huge spread.
    this.inputMask.css({
      position: 'absolute',
      left: this.leftMargin + 'px',
      top: this.topMargin + 'px',
      width: (elementRect.width - 1) + 'px',
      height: (elementRect.height - 2) + 'px'
    });

    // If the right edge of the pane would be off the screen and shifting it left by the
    // difference would not go past the left edge of the screen. If the calendar pane is too
    // big to fit on the screen at all, move it to the left of the screen and scale the entire
    // element down to fit.
    if (paneLeft + CALENDAR_PANE_WIDTH > viewportRight) {
      if (viewportRight - CALENDAR_PANE_WIDTH > 0) {
        paneLeft = viewportRight - CALENDAR_PANE_WIDTH;
      } else {
        paneLeft = viewportLeft;
        var scale = this.$window.innerWidth / CALENDAR_PANE_WIDTH;
        calendarPane.style.transform = 'scale(' + scale + ')';
      }

      calendarPane.classList.add('md-datepicker-pos-adjusted');
    }

    // If the bottom edge of the pane would be off the screen and shifting it up by the
    // difference would not go past the top edge of the screen.
    if (paneTop + CALENDAR_PANE_HEIGHT > viewportBottom &&
        viewportBottom - CALENDAR_PANE_HEIGHT > viewportTop) {
      paneTop = viewportBottom - CALENDAR_PANE_HEIGHT;
      calendarPane.classList.add('md-datepicker-pos-adjusted');
    }

    calendarPane.style.left = paneLeft + 'px';
    calendarPane.style.top = paneTop + 'px';
    document.body.appendChild(calendarPane);

    // Add CSS class after one frame to trigger open animation.
    this.$$rAF(function() {
      calendarPane.classList.add('md-pane-open');
    });
  };

  /** Detach the floating calendar pane from the document. */
  DatePickerCtrl.prototype.detachCalendarPane = function() {
    this.$element.removeClass(OPEN_CLASS);
    this.mdInputContainer && this.mdInputContainer.element.removeClass(OPEN_CLASS);
    angular.element(document.body).removeClass('md-datepicker-is-showing');
    this.calendarPane.classList.remove('md-pane-open');
    this.calendarPane.classList.remove('md-datepicker-pos-adjusted');

    if (this.isCalendarOpen) {
      this.$mdUtil.enableScrolling();
    }

    if (this.calendarPane.parentNode) {
      // Use native DOM removal because we do not want any of the
      // angular state of this element to be disposed.
      this.calendarPane.parentNode.removeChild(this.calendarPane);
    }
  };

  /**
   * Open the floating calendar pane.
   * @param {Event} event
   */
  DatePickerCtrl.prototype.openCalendarPane = function(event) {
    if (!this.isCalendarOpen && !this.isDisabled && !this.inputFocusedOnWindowBlur) {
      this.isCalendarOpen = this.isOpen = true;
      this.calendarPaneOpenedFrom = event.target;

      // Because the calendar pane is attached directly to the body, it is possible that the
      // rest of the component (input, etc) is in a different scrolling container, such as
      // an md-content. This means that, if the container is scrolled, the pane would remain
      // stationary. To remedy this, we disable scrolling while the calendar pane is open, which
      // also matches the native behavior for things like `<select>` on Mac and Windows.
      this.$mdUtil.disableScrollAround(this.calendarPane);

      this.attachCalendarPane();
      this.focusCalendar();
      this.evalAttr('ngFocus');

      // Attach click listener inside of a timeout because, if this open call was triggered by a
      // click, we don't want it to be immediately propagated up to the body and handled.
      var self = this;
      this.$mdUtil.nextTick(function() {
        // Use 'touchstart` in addition to click in order to work on iOS Safari, where click
        // events aren't propagated under most circumstances.
        // See http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        self.documentElement.on('click touchstart', self.bodyClickHandler);
      }, false);

      window.addEventListener(this.windowEventName, this.windowEventHandler);
    } else if (this.inputFocusedOnWindowBlur) {
      this.resetInputFocused();
    }
  };

  /** Close the floating calendar pane. */
  DatePickerCtrl.prototype.closeCalendarPane = function() {
    if (this.isCalendarOpen) {
      var self = this;

      self.detachCalendarPane();
      self.ngModelCtrl.$setTouched();
      self.evalAttr('ngBlur');

      self.documentElement.off('click touchstart', self.bodyClickHandler);
      window.removeEventListener(self.windowEventName, self.windowEventHandler);

      self.calendarPaneOpenedFrom.focus();
      self.calendarPaneOpenedFrom = null;

      if (self.openOnFocus) {
        // Ensures that all focus events have fired before resetting
        // the calendar. Prevents the calendar from reopening immediately
        // in IE when md-open-on-focus is set. Also it needs to trigger
        // a digest, in order to prevent issues where the calendar wasn't
        // showing up on the next open.
        self.$timeout(reset);
      } else {
        reset();
      }
    }

    function reset(){
      self.isCalendarOpen = self.isOpen = false;
    }
  };

  /** Gets the controller instance for the calendar in the floating pane. */
  DatePickerCtrl.prototype.getCalendarCtrl = function() {
    return angular.element(this.calendarPane.querySelector('md-calendar')).controller('mdCalendar');
  };

  /** Focus the calendar in the floating pane. */
  DatePickerCtrl.prototype.focusCalendar = function() {
    // Use a timeout in order to allow the calendar to be rendered, as it is gated behind an ng-if.
    var self = this;
    this.$mdUtil.nextTick(function() {
      self.getCalendarCtrl().focusDate();
    }, false);
  };

  /**
   * Sets whether the input is currently focused.
   * @param {boolean} isFocused
   */
  DatePickerCtrl.prototype.setFocused = function(isFocused) {
    if (!isFocused) {
      this.ngModelCtrl.$setTouched();
    }

    // The ng* expressions shouldn't be evaluated when mdOpenOnFocus is on,
    // because they also get called when the calendar is opened/closed.
    if (!this.openOnFocus) {
      this.evalAttr(isFocused ? 'ngFocus' : 'ngBlur');
    }

    this.isFocused = isFocused;
  };

  /**
   * Handles a click on the document body when the floating calendar pane is open.
   * Closes the floating calendar pane if the click is not inside of it.
   * @param {MouseEvent} event
   */
  DatePickerCtrl.prototype.handleBodyClick = function(event) {
    if (this.isCalendarOpen) {
      var isInCalendar = this.$mdUtil.getClosest(event.target, 'md-calendar');

      if (!isInCalendar) {
        this.closeCalendarPane();
      }

      this.$scope.$digest();
    }
  };

  /**
   * Handles the event when the user navigates away from the current tab. Keeps track of
   * whether the input was focused when the event happened, in order to prevent the calendar
   * from re-opening.
   */
  DatePickerCtrl.prototype.handleWindowBlur = function() {
    this.inputFocusedOnWindowBlur = document.activeElement === this.inputElement;
  };

  /**
   * Reset the flag inputFocusedOnWindowBlur to default state, to permit user to open calendar
   * again when he back to tab with calendar focused.
   */
  DatePickerCtrl.prototype.resetInputFocused = function() {
    this.inputFocusedOnWindowBlur = false;
  };

  /**
   * Evaluates an attribute expression against the parent scope.
   * @param {String} attr Name of the attribute to be evaluated.
   */
  DatePickerCtrl.prototype.evalAttr = function(attr) {
    if (this.$attrs[attr]) {
      this.$scope.$parent.$eval(this.$attrs[attr]);
    }
  };

  /**
   * Sets the ng-model value by first converting the date object into a string. Converting it
   * is necessary, in order to pass AngularJS's `input[type="date"]` validations. AngularJS turns
   * the value into a Date object afterwards, before setting it on the model.
   * @param {Date=} value Date to be set as the model value.
   */
  DatePickerCtrl.prototype.setModelValue = function(value) {
    var timezone = this.$mdUtil.getModelOption(this.ngModelCtrl, 'timezone');
    this.ngModelCtrl.$setViewValue(this.ngDateFilter(value, 'yyyy-MM-dd', timezone), 'default');
  };

  /**
   * Updates the datepicker when a model change occurred externally.
   * @param {Date=} value Value that was set to the model.
   */
  DatePickerCtrl.prototype.onExternalChange = function(value) {
    var self = this;
    var timezone = this.$mdUtil.getModelOption(this.ngModelCtrl, 'timezone');

    if (this.dateUtil.isValidDate(value)) {
      this.date = this.dateUtil.removeLocalTzAndReparseDate(value);
    } else {
      this.date = value;
    }
    this.inputElement.value = this.locale.formatDate(value, timezone);
    this.mdInputContainer && this.mdInputContainer.setHasValue(!!value);
    this.resizeInputElement();
    // This is often called from the $formatters section of the $validators pipeline.
    // In that case, we need to delay to let $render and $validate run, so that the checks for
    // error state are accurate.
    this.$mdUtil.nextTick(function() {self.updateErrorState();}, false, self.$scope);
  };
})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.dialog
 */
MdDialogDirective.$inject = ["$$rAF", "$mdTheming", "$mdDialog"];
MdDialogProvider.$inject = ["$$interimElementProvider"];
angular
  .module('material.components.dialog', [
    'material.core',
    'material.components.backdrop'
  ])
  .directive('mdDialog', MdDialogDirective)
  .provider('$mdDialog', MdDialogProvider);

/**
 * @ngdoc directive
 * @name mdDialog
 * @module material.components.dialog
 *
 * @restrict E
 *
 * @description
 * `<md-dialog>` - The dialog's template must be inside this element.
 *
 * Inside, use an `<md-dialog-content>` element for the dialog's content, and use
 * an `<md-dialog-actions>` element for the dialog's actions.
 *
 * ## CSS
 * - `.md-dialog-content` - class that sets the padding on the content as the spec file
 *
 * ## Notes
 * - If you specify an `id` for the `<md-dialog>`, the `<md-dialog-content>` will have the same `id`
 * prefixed with `dialogContent_`.
 *
 * @usage
 * ### Dialog template
 * <hljs lang="html">
 * <md-dialog aria-label="List dialog">
 *   <md-dialog-content>
 *     <md-list>
 *       <md-list-item ng-repeat="item in items">
 *         <p>Number {{item}}</p>
 *       </md-list-item>
 *     </md-list>
 *   </md-dialog-content>
 *   <md-dialog-actions>
 *     <md-button ng-click="closeDialog()" class="md-primary">Close Dialog</md-button>
 *   </md-dialog-actions>
 * </md-dialog>
 * </hljs>
 */
function MdDialogDirective($$rAF, $mdTheming, $mdDialog) {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element.addClass('_md');     // private md component indicator for styling

      $mdTheming(element);
      $$rAF(function() {
        var images;
        var content = element[0].querySelector('md-dialog-content');

        if (content) {
          images = content.getElementsByTagName('img');
          addOverflowClass();
          // delayed image loading may impact scroll height, check after images are loaded
          angular.element(images).on('load', addOverflowClass);
        }

        scope.$on('$destroy', function() {
          $mdDialog.destroy(element);
        });

        /**
         *
         */
        function addOverflowClass() {
          element.toggleClass('md-content-overflow', content.scrollHeight > content.clientHeight);
        }


      });
    }
  };
}

/**
 * @ngdoc service
 * @name $mdDialog
 * @module material.components.dialog
 *
 * @description
 * `$mdDialog` opens a dialog over the app to inform users about critical information or require
 *  them to make decisions. There are two approaches for setup: a simple promise API
 *  and regular object syntax.
 *
 * ## Restrictions
 *
 * - The dialog is always given an isolate scope.
 * - The dialog's template must have an outer `<md-dialog>` element.
 *   Inside, use an `<md-dialog-content>` element for the dialog's content, and use
 *   an `<md-dialog-actions>` element for the dialog's actions.
 * - Dialogs must cover the entire application to keep interactions inside of them.
 * Use the `parent` option to change where dialogs are appended.
 *
 * ## Sizing
 * - Complex dialogs can be sized with `flex="percentage"`, i.e. `flex="66"`.
 * - Default max-width is 80% of the `rootElement` or `parent`.
 *
 * ## CSS
 * - `.md-dialog-content` - class that sets the padding on the content as the spec file
 *
 * @usage
 * <hljs lang="html">
 * <div  ng-app="demoApp" ng-controller="EmployeeController">
 *   <div>
 *     <md-button ng-click="showAlert()" class="md-raised md-warn">
 *       Employee Alert!
 *       </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="showDialog($event)" class="md-raised">
 *       Custom Dialog
 *       </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="closeAlert()" ng-disabled="!hasAlert()" class="md-raised">
 *       Close Alert
 *     </md-button>
 *   </div>
 *   <div>
 *     <md-button ng-click="showGreeting($event)" class="md-raised md-primary" >
 *       Greet Employee
 *       </md-button>
 *   </div>
 * </div>
 * </hljs>
 *
 * ### JavaScript: object syntax
 * <hljs lang="js">
 * (function(angular, undefined){
 *   "use strict";
 *
 *   angular
 *    .module('demoApp', ['ngMaterial'])
 *    .controller('AppCtrl', AppController);
 *
 *   function AppController($scope, $mdDialog) {
 *     var alert;
 *     $scope.showAlert = showAlert;
 *     $scope.showDialog = showDialog;
 *     $scope.items = [1, 2, 3];
 *
 *     // Internal method
 *     function showAlert() {
 *       alert = $mdDialog.alert({
 *         title: 'Attention',
 *         textContent: 'This is an example of how easy dialogs can be!',
 *         ok: 'Close'
 *       });
 *
 *       $mdDialog
 *         .show( alert )
 *         .finally(function() {
 *           alert = undefined;
 *         });
 *     }
 *
 *     function showDialog($event) {
 *        var parentEl = angular.element(document.body);
 *        $mdDialog.show({
 *          parent: parentEl,
 *          targetEvent: $event,
 *          template:
 *            '<md-dialog aria-label="List dialog">' +
 *            '  <md-dialog-content>'+
 *            '    <md-list>'+
 *            '      <md-list-item ng-repeat="item in items">'+
 *            '       <p>Number {{item}}</p>' +
 *            '      </md-item>'+
 *            '    </md-list>'+
 *            '  </md-dialog-content>' +
 *            '  <md-dialog-actions>' +
 *            '    <md-button ng-click="closeDialog()" class="md-primary">' +
 *            '      Close Dialog' +
 *            '    </md-button>' +
 *            '  </md-dialog-actions>' +
 *            '</md-dialog>',
 *          locals: {
 *            items: $scope.items
 *          },
 *          controller: DialogController
 *       });
 *       function DialogController($scope, $mdDialog, items) {
 *         $scope.items = items;
 *         $scope.closeDialog = function() {
 *           $mdDialog.hide();
 *         }
 *       }
 *     }
 *   }
 * })(angular);
 * </hljs>
 *
 * ### Multiple Dialogs
 * Using the `multiple` option for the `$mdDialog` service allows developers to show multiple dialogs
 * at the same time.
 *
 * <hljs lang="js">
 *   // From plain options
 *   $mdDialog.show({
 *     multiple: true
 *   });
 *
 *   // From a dialog preset
 *   $mdDialog.show(
 *     $mdDialog
 *       .alert()
 *       .multiple(true)
 *   );
 *
 * </hljs>
 *
 * ### Pre-Rendered Dialogs
 * By using the `contentElement` option, it is possible to use an already existing element in the DOM.
 *
 * > Pre-rendered dialogs will be not linked to any scope and will not instantiate any new controller.<br/>
 * > You can manually link the elements to a scope or instantiate a controller from the template (`ng-controller`)
 *
 * <hljs lang="js">
 *   $scope.showPrerenderedDialog = function() {
 *     $mdDialog.show({
 *       contentElement: '#myStaticDialog',
 *       parent: angular.element(document.body)
 *     });
 *   };
 * </hljs>
 *
 * When using a string as value, `$mdDialog` will automatically query the DOM for the specified CSS selector.
 *
 * <hljs lang="html">
 *   <div style="visibility: hidden">
 *     <div class="md-dialog-container" id="myStaticDialog">
 *       <md-dialog>
 *         This is a pre-rendered dialog.
 *       </md-dialog>
 *     </div>
 *   </div>
 * </hljs>
 *
 * **Notice**: It is important, to use the `.md-dialog-container` as the content element, otherwise the dialog
 * will not show up.
 *
 * It also possible to use a DOM element for the `contentElement` option.
 * - `contentElement: document.querySelector('#myStaticDialog')`
 * - `contentElement: angular.element(TEMPLATE)`
 *
 * When using a `template` as content element, it will be not compiled upon open.
 * This allows you to compile the element yourself and use it each time the dialog opens.
 *
 * ### Custom Presets
 * Developers are also able to create their own preset, which can be easily used without repeating
 * their options each time.
 *
 * <hljs lang="js">
 *   $mdDialogProvider.addPreset('testPreset', {
 *     options: function() {
 *       return {
 *         template:
 *           '<md-dialog>' +
 *             'This is a custom preset' +
 *           '</md-dialog>',
 *         controllerAs: 'dialog',
 *         bindToController: true,
 *         clickOutsideToClose: true,
 *         escapeToClose: true
 *       };
 *     }
 *   });
 * </hljs>
 *
 * After you created your preset at config phase, you can easily access it.
 *
 * <hljs lang="js">
 *   $mdDialog.show(
 *     $mdDialog.testPreset()
 *   );
 * </hljs>
 *
 * ### JavaScript: promise API syntax, custom dialog template
 * <hljs lang="js">
 * (function(angular, undefined){
 *   "use strict";
 *
 *   angular
 *     .module('demoApp', ['ngMaterial'])
 *     .controller('EmployeeController', EmployeeEditor)
 *     .controller('GreetingController', GreetingController);
 *
 *   // Fictitious Employee Editor to show how to use simple and complex dialogs.
 *
 *   function EmployeeEditor($scope, $mdDialog) {
 *     var alert;
 *
 *     $scope.showAlert = showAlert;
 *     $scope.closeAlert = closeAlert;
 *     $scope.showGreeting = showCustomGreeting;
 *
 *     $scope.hasAlert = function() { return !!alert };
 *     $scope.userName = $scope.userName || 'Bobby';
 *
 *     // Dialog #1 - Show simple alert dialog and cache
 *     // reference to dialog instance
 *
 *     function showAlert() {
 *       alert = $mdDialog.alert()
 *         .title('Attention, ' + $scope.userName)
 *         .textContent('This is an example of how easy dialogs can be!')
 *         .ok('Close');
 *
 *       $mdDialog
 *           .show( alert )
 *           .finally(function() {
 *             alert = undefined;
 *           });
 *     }
 *
 *     // Close the specified dialog instance and resolve with 'finished' flag
 *     // Normally this is not needed, just use '$mdDialog.hide()' to close
 *     // the most recent dialog popup.
 *
 *     function closeAlert() {
 *       $mdDialog.hide( alert, "finished" );
 *       alert = undefined;
 *     }
 *
 *     // Dialog #2 - Demonstrate more complex dialogs construction and popup.
 *
 *     function showCustomGreeting($event) {
 *         $mdDialog.show({
 *           targetEvent: $event,
 *           template:
 *             '<md-dialog>' +
 *
 *             '  <md-dialog-content>Hello {{ employee }}!</md-dialog-content>' +
 *
 *             '  <md-dialog-actions>' +
 *             '    <md-button ng-click="closeDialog()" class="md-primary">' +
 *             '      Close Greeting' +
 *             '    </md-button>' +
 *             '  </md-dialog-actions>' +
 *             '</md-dialog>',
 *           controller: 'GreetingController',
 *           onComplete: afterShowAnimation,
 *           locals: { employee: $scope.userName }
 *         });
 *
 *         // When the 'enter' animation finishes...
 *
 *         function afterShowAnimation(scope, element, options) {
 *            // post-show code here: DOM element focus, etc.
 *         }
 *     }
 *
 *     // Dialog #3 - Demonstrate use of ControllerAs and passing $scope to dialog
 *     //             Here we used ng-controller="GreetingController as vm" and
 *     //             $scope.vm === <controller instance>
 *
 *     function showCustomGreeting() {
 *
 *        $mdDialog.show({
 *           clickOutsideToClose: true,
 *
 *           scope: $scope,        // use parent scope in template
 *           preserveScope: true,  // do not forget this if use parent scope

 *           // Since GreetingController is instantiated with ControllerAs syntax
 *           // AND we are passing the parent '$scope' to the dialog, we MUST
 *           // use 'vm.<xxx>' in the template markup
 *
 *           template: '<md-dialog>' +
 *                     '  <md-dialog-content>' +
 *                     '     Hi There {{vm.employee}}' +
 *                     '  </md-dialog-content>' +
 *                     '</md-dialog>',
 *
 *           controller: function DialogController($scope, $mdDialog) {
 *             $scope.closeDialog = function() {
 *               $mdDialog.hide();
 *             }
 *           }
 *        });
 *     }
 *
 *   }
 *
 *   // Greeting controller used with the more complex 'showCustomGreeting()' custom dialog
 *
 *   function GreetingController($scope, $mdDialog, employee) {
 *     // Assigned from construction <code>locals</code> options...
 *     $scope.employee = employee;
 *
 *     $scope.closeDialog = function() {
 *       // Easily hides most recent dialog shown...
 *       // no specific instance reference is needed.
 *       $mdDialog.hide();
 *     };
 *   }
 *
 * })(angular);
 * </hljs>
 */

/**
 * @ngdoc method
 * @name $mdDialog#alert
 *
 * @description
 * Builds a preconfigured dialog with the specified message.
 *
 * @returns {obj} an `$mdDialogPreset` with the chainable configuration methods:
 *
 * - $mdDialogPreset#title(string) - Sets the alert title.
 * - $mdDialogPreset#textContent(string) - Sets the alert message.
 * - $mdDialogPreset#htmlContent(string) - Sets the alert message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#ok(string) - Sets the alert "Okay" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the alert dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#confirm
 *
 * @description
 * Builds a preconfigured dialog with the specified message. You can call show and the promise
 * returned will be resolved if the user clicks the confirm action on the dialog. The promise will
 * be rejected if the user clicks the cancel action or dismisses the dialog.
 *
 * @returns {obj} an `$mdDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdDialogPreset#title(string) - Sets the confirm title.
 * - $mdDialogPreset#textContent(string) - Sets the confirm message.
 * - $mdDialogPreset#htmlContent(string) - Sets the confirm message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#ok(string) - Sets the confirm "Okay" button text.
 * - $mdDialogPreset#cancel(string) - Sets the confirm "Cancel" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the confirm dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#prompt
 *
 * @description
 * Builds a preconfigured dialog with the specified message and input box. You can call show and the
 * promise returned will be resolved, if the user clicks the prompt action on the dialog, passing
 * the input value as the first argument. The promise will be rejected if the user clicks the cancel
 * action or dismisses the dialog.
 *
 * @returns {obj} an `$mdDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdDialogPreset#title(string) - Sets the prompt title.
 * - $mdDialogPreset#textContent(string) - Sets the prompt message.
 * - $mdDialogPreset#htmlContent(string) - Sets the prompt message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdDialogPreset#placeholder(string) - Sets the placeholder text for the input.
 * - $mdDialogPreset#required(boolean) - Sets the input required value.
 * - $mdDialogPreset#initialValue(string) - Sets the initial value for the prompt input.
 * - $mdDialogPreset#ok(string) - Sets the prompt "Okay" button text.
 * - $mdDialogPreset#cancel(string) - Sets the prompt "Cancel" button text.
 * - $mdDialogPreset#theme(string) - Sets the theme of the prompt dialog.
 * - $mdDialogPreset#targetEvent(DOMClickEvent=) - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *
 */

/**
 * @ngdoc method
 * @name $mdDialog#show
 *
 * @description
 * Show a dialog with the specified options.
 *
 * @param {object} optionsOrPreset Either provide an `$mdDialogPreset` returned from `alert()`, and
 * `confirm()`, or an options object with the following properties:
 *   - `templateUrl` - `{string=}`: The url of a template that will be used as the content
 *   of the dialog.
 *   - `template` - `{string=}`: HTML template to show in the dialog. This **must** be trusted HTML
 *      with respect to Angular's [$sce service](https://docs.angularjs.org/api/ng/service/$sce).
 *      This template should **never** be constructed with any kind of user input or user data.
 *   - `contentElement` - `{string|Element}`: Instead of using a template, which will be compiled each time a
 *     dialog opens, you can also use a DOM element.<br/>
 *     * When specifying an element, which is present on the DOM, `$mdDialog` will temporary fetch the element into
 *       the dialog and restores it at the old DOM position upon close.
 *     * When specifying a string, the string be used as a CSS selector, to lookup for the element in the DOM.
 *   - `autoWrap` - `{boolean=}`: Whether or not to automatically wrap the template with a
 *     `<md-dialog>` tag if one is not provided. Defaults to true. Can be disabled if you provide a
 *     custom dialog directive.
 *   - `targetEvent` - `{DOMClickEvent=}`: A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 *   - `openFrom` - `{string|Element|object}`: The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) from which the Dialog will
 *     originate.
 *   - `closeTo` - `{string|Element|object}`: The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) to which the Dialog will
 *     target.
 *   - `scope` - `{object=}`: the scope to link the template / controller to. If none is specified,
 *     it will create a new isolate scope.
 *     This scope will be destroyed when the dialog is removed unless `preserveScope` is set to true.
 *   - `preserveScope` - `{boolean=}`: whether to preserve the scope when the element is removed. Default is false
 *   - `disableParentScroll` - `{boolean=}`: Whether to disable scrolling while the dialog is open.
 *     Default true.
 *   - `hasBackdrop` - `{boolean=}`: Whether there should be an opaque backdrop behind the dialog.
 *     Default true.
 *   - `clickOutsideToClose` - `{boolean=}`: Whether the user can click outside the dialog to
 *     close it. Default false.
 *   - `escapeToClose` - `{boolean=}`: Whether the user can press escape to close the dialog.
 *     Default true.
 *   - `focusOnOpen` - `{boolean=}`: An option to override focus behavior on open. Only disable if
 *     focusing some other way, as focus management is required for dialogs to be accessible.
 *     Defaults to true.
 *   - `controller` - `{function|string=}`: The controller to associate with the dialog. The controller
 *     will be injected with the local `$mdDialog`, which passes along a scope for the dialog.
 *   - `locals` - `{object=}`: An object containing key/value pairs. The keys will be used as names
 *     of values to inject into the controller. For example, `locals: {three: 3}` would inject
 *     `three` into the controller, with the value 3. If `bindToController` is true, they will be
 *     copied to the controller instead.
 *   - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.
 *   - `resolve` - `{function=}`: Similar to locals, except it takes as values functions that return promises, and the
 *      dialog will not open until all of the promises resolve.
 *   - `controllerAs` - `{string=}`: An alias to assign the controller to on the scope.
 *   - `parent` - `{element=}`: The element to append the dialog to. Defaults to appending
 *     to the root element of the application.
 *   - `onShowing` - `function(scope, element)`: Callback function used to announce the show() action is
 *     starting.
 *   - `onComplete` - `function(scope, element)`: Callback function used to announce when the show() action is
 *     finished.
 *   - `onRemoving` - `function(element, removePromise)`: Callback function used to announce the
 *      close/hide() action is starting. This allows developers to run custom animations
 *      in parallel with the close animations.
 *   - `fullscreen` `{boolean=}`: An option to toggle whether the dialog should show in fullscreen
 *      or not. Defaults to `false`.
 *   - `multiple` `{boolean=}`: An option to allow this dialog to display over one that's currently open.
 * @returns {promise} A promise that can be resolved with `$mdDialog.hide()` or
 * rejected with `$mdDialog.cancel()`.
 */

/**
 * @ngdoc method
 * @name $mdDialog#hide
 *
 * @description
 * Hide an existing dialog and resolve the promise returned from `$mdDialog.show()`.
 *
 * @param {*=} response An argument for the resolved promise.
 *
 * @returns {promise} A promise that is resolved when the dialog has been closed.
 */

/**
 * @ngdoc method
 * @name $mdDialog#cancel
 *
 * @description
 * Hide an existing dialog and reject the promise returned from `$mdDialog.show()`.
 *
 * @param {*=} response An argument for the rejected promise.
 *
 * @returns {promise} A promise that is resolved when the dialog has been closed.
 */

function MdDialogProvider($$interimElementProvider) {
  // Elements to capture and redirect focus when the user presses tab at the dialog boundary.
  MdDialogController.$inject = ["$mdDialog", "$mdConstant"];
  dialogDefaultOptions.$inject = ["$mdDialog", "$mdAria", "$mdUtil", "$mdConstant", "$animate", "$document", "$window", "$rootElement", "$log", "$injector", "$mdTheming", "$interpolate", "$mdInteraction"];
  var topFocusTrap, bottomFocusTrap;

  return $$interimElementProvider('$mdDialog')
    .setDefaults({
      methods: ['disableParentScroll', 'hasBackdrop', 'clickOutsideToClose', 'escapeToClose',
          'targetEvent', 'closeTo', 'openFrom', 'parent', 'fullscreen', 'multiple'],
      options: dialogDefaultOptions
    })
    .addPreset('alert', {
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'theme',
          'css'],
      options: advancedDialogOptions
    })
    .addPreset('confirm', {
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'cancel',
          'theme', 'css'],
      options: advancedDialogOptions
    })
    .addPreset('prompt', {
      methods: ['title', 'htmlContent', 'textContent', 'initialValue', 'content', 'placeholder', 'ariaLabel',
          'ok', 'cancel', 'theme', 'css', 'required'],
      options: advancedDialogOptions
    });

  /* @ngInject */
  function advancedDialogOptions() {
    return {
      template: [
        '<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">',
        '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">',
        '    <h2 class="md-title">{{ dialog.title }}</h2>',
        '    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body" ',
        '        ng-bind-html="::dialog.mdHtmlContent"></div>',
        '    <div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">',
        '      <p>{{::dialog.mdTextContent}}</p>',
        '    </div>',
        '    <md-input-container md-no-float ng-if="::dialog.$type == \'prompt\'" class="md-prompt-input-container">',
        '      <input ng-keypress="dialog.keypress($event)" md-autofocus ng-model="dialog.result" ' +
        '             placeholder="{{::dialog.placeholder}}" ng-required="dialog.required">',
        '    </md-input-container>',
        '  </md-dialog-content>',
        '  <md-dialog-actions>',
        '    <md-button ng-if="dialog.$type === \'confirm\' || dialog.$type === \'prompt\'"' +
        '               ng-click="dialog.abort()" class="md-primary md-cancel-button">',
        '      {{ dialog.cancel }}',
        '    </md-button>',
        '    <md-button ng-click="dialog.hide()" class="md-primary md-confirm-button" md-autofocus="dialog.$type===\'alert\'"' +
        '               ng-disabled="dialog.required && !dialog.result">',
        '      {{ dialog.ok }}',
        '    </md-button>',
        '  </md-dialog-actions>',
        '</md-dialog>'
      ].join('').replace(/\s\s+/g, ''),
      controller: MdDialogController,
      controllerAs: 'dialog',
      bindToController: true,
    };
  }

  /**
   * Controller for the md-dialog interim elements
   * @ngInject
   */
  function MdDialogController($mdDialog, $mdConstant) {
    // For compatibility with AngularJS 1.6+, we should always use the $onInit hook in
    // interimElements. The $mdCompiler simulates the $onInit hook for all versions.
    this.$onInit = function() {
      var isPrompt = this.$type == 'prompt';

      if (isPrompt && this.initialValue) {
        this.result = this.initialValue;
      }

      this.hide = function() {
        $mdDialog.hide(isPrompt ? this.result : true);
      };
      this.abort = function() {
        $mdDialog.cancel();
      };
      this.keypress = function($event) {
        var invalidPrompt = isPrompt && this.required && !angular.isDefined(this.result);

        if ($event.keyCode === $mdConstant.KEY_CODE.ENTER && !invalidPrompt) {
          $mdDialog.hide(this.result);
        }
      };
    };
  }

  /* @ngInject */
  function dialogDefaultOptions($mdDialog, $mdAria, $mdUtil, $mdConstant, $animate, $document, $window, $rootElement,
                                $log, $injector, $mdTheming, $interpolate, $mdInteraction) {

    return {
      hasBackdrop: true,
      isolateScope: true,
      onCompiling: beforeCompile,
      onShow: onShow,
      onShowing: beforeShow,
      onRemove: onRemove,
      clickOutsideToClose: false,
      escapeToClose: true,
      targetEvent: null,
      closeTo: null,
      openFrom: null,
      focusOnOpen: true,
      disableParentScroll: true,
      autoWrap: true,
      fullscreen: false,
      transformTemplate: function(template, options) {
        // Make the dialog container focusable, because otherwise the focus will be always redirected to
        // an element outside of the container, and the focus trap won't work probably..
        // Also the tabindex is needed for the `escapeToClose` functionality, because
        // the keyDown event can't be triggered when the focus is outside of the container.
        var startSymbol = $interpolate.startSymbol();
        var endSymbol = $interpolate.endSymbol();
        var theme = startSymbol + (options.themeWatch ? '' : '::') + 'theme' + endSymbol;
        var themeAttr = (options.hasTheme) ? 'md-theme="'+theme+'"': '';
        return '<div class="md-dialog-container" tabindex="-1" ' + themeAttr + '>' + validatedTemplate(template) + '</div>';

        /**
         * The specified template should contain a <md-dialog> wrapper element....
         */
        function validatedTemplate(template) {
          if (options.autoWrap && !/<\/md-dialog>/g.test(template)) {
            return '<md-dialog>' + (template || '') + '</md-dialog>';
          } else {
            return template || '';
          }
        }
      }
    };

    function beforeCompile(options) {
      // Automatically apply the theme, if the user didn't specify a theme explicitly.
      // Those option changes need to be done, before the compilation has started, because otherwise
      // the option changes will be not available in the $mdCompilers locales.
      options.defaultTheme = $mdTheming.defaultTheme();

      detectTheming(options);
    }

    function beforeShow(scope, element, options, controller) {

      if (controller) {
        var mdHtmlContent = controller.htmlContent || options.htmlContent || '';
        var mdTextContent = controller.textContent || options.textContent ||
            controller.content || options.content || '';

        if (mdHtmlContent && !$injector.has('$sanitize')) {
          throw Error('The ngSanitize module must be loaded in order to use htmlContent.');
        }

        if (mdHtmlContent && mdTextContent) {
          throw Error('md-dialog cannot have both `htmlContent` and `textContent`');
        }

        // Only assign the content if nothing throws, otherwise it'll still be compiled.
        controller.mdHtmlContent = mdHtmlContent;
        controller.mdTextContent = mdTextContent;
      }
    }

    /** Show method for dialogs */
    function onShow(scope, element, options, controller) {
      angular.element($document[0].body).addClass('md-dialog-is-showing');

      var dialogElement = element.find('md-dialog');

      // Once a dialog has `ng-cloak` applied on his template the dialog animation will not work properly.
      // This is a very common problem, so we have to notify the developer about this.
      if (dialogElement.hasClass('ng-cloak')) {
        var message = '$mdDialog: using `<md-dialog ng-cloak>` will affect the dialog opening animations.';
        $log.warn(message, element[0]);
      }

      captureParentAndFromToElements(options);
      configureAria(dialogElement, options);
      showBackdrop(scope, element, options);
      activateListeners(element, options);

      return dialogPopIn(element, options)
        .then(function() {
          lockScreenReader(element, options);
          warnDeprecatedActions();
          focusOnOpen();
        });

      /**
       * Check to see if they used the deprecated .md-actions class and log a warning
       */
      function warnDeprecatedActions() {
        if (element[0].querySelector('.md-actions')) {
          $log.warn('Using a class of md-actions is deprecated, please use <md-dialog-actions>.');
        }
      }

      /**
       * For alerts, focus on content... otherwise focus on
       * the close button (or equivalent)
       */
      function focusOnOpen() {
        if (options.focusOnOpen) {
          var target = $mdUtil.findFocusTarget(element) || findCloseButton() || dialogElement;
          target.focus();
        }

        /**
         * If no element with class dialog-close, try to find the last
         * button child in md-actions and assume it is a close button.
         *
         * If we find no actions at all, log a warning to the console.
         */
        function findCloseButton() {
          return element[0].querySelector('.dialog-close, md-dialog-actions button:last-child');
        }
      }
    }

    /**
     * Remove function for all dialogs
     */
    function onRemove(scope, element, options) {
      options.deactivateListeners();
      options.unlockScreenReader();
      options.hideBackdrop(options.$destroy);

      // Remove the focus traps that we added earlier for keeping focus within the dialog.
      if (topFocusTrap && topFocusTrap.parentNode) {
        topFocusTrap.parentNode.removeChild(topFocusTrap);
      }

      if (bottomFocusTrap && bottomFocusTrap.parentNode) {
        bottomFocusTrap.parentNode.removeChild(bottomFocusTrap);
      }

      // For navigation $destroy events, do a quick, non-animated removal,
      // but for normal closes (from clicks, etc) animate the removal
      return options.$destroy ? detachAndClean() : animateRemoval().then(detachAndClean);

      /**
       * For normal closes, animate the removal.
       * For forced closes (like $destroy events), skip the animations
       */
      function animateRemoval() {
        return dialogPopOut(element, options);
      }

      /**
       * Detach the element
       */
      function detachAndClean() {
        angular.element($document[0].body).removeClass('md-dialog-is-showing');

        // Reverse the container stretch if using a content element.
        if (options.contentElement) {
          options.reverseContainerStretch();
        }

        // Exposed cleanup function from the $mdCompiler.
        options.cleanupElement();

        // Restores the focus to the origin element if the last interaction upon opening was a keyboard.
        if (!options.$destroy && options.originInteraction === 'keyboard') {
          options.origin.focus();
        }
      }
    }

    function detectTheming(options) {
      // Once the user specifies a targetEvent, we will automatically try to find the correct
      // nested theme.
      var targetEl;
      if (options.targetEvent && options.targetEvent.target) {
        targetEl = angular.element(options.targetEvent.target);
      }

      var themeCtrl = targetEl && targetEl.controller('mdTheme');

      options.hasTheme = (!!themeCtrl);

      if (!options.hasTheme) {
        return;
      }

      options.themeWatch = themeCtrl.$shouldWatch;

      var theme = options.theme || themeCtrl.$mdTheme;

      if (theme) {
        options.scope.theme = theme;
      }

      var unwatch = themeCtrl.registerChanges(function (newTheme) {
        options.scope.theme = newTheme;

        if (!options.themeWatch) {
          unwatch();
        }
      });
    }

    /**
     * Capture originator/trigger/from/to element information (if available)
     * and the parent container for the dialog; defaults to the $rootElement
     * unless overridden in the options.parent
     */
    function captureParentAndFromToElements(options) {
          options.origin = angular.extend({
            element: null,
            bounds: null,
            focus: angular.noop
          }, options.origin || {});

          options.parent   = getDomElement(options.parent, $rootElement);
          options.closeTo  = getBoundingClientRect(getDomElement(options.closeTo));
          options.openFrom = getBoundingClientRect(getDomElement(options.openFrom));

          if (options.targetEvent) {
            options.origin = getBoundingClientRect(options.targetEvent.target, options.origin);
            options.originInteraction = $mdInteraction.getLastInteractionType();
          }


          /**
           * Identify the bounding RECT for the target element
           *
           */
          function getBoundingClientRect (element, orig) {
            var source = angular.element((element || {}));
            if (source && source.length) {
              // Compute and save the target element's bounding rect, so that if the
              // element is hidden when the dialog closes, we can shrink the dialog
              // back to the same position it expanded from.
              //
              // Checking if the source is a rect object or a DOM element
              var bounds = {top:0,left:0,height:0,width:0};
              var hasFn = angular.isFunction(source[0].getBoundingClientRect);

              return angular.extend(orig || {}, {
                  element : hasFn ? source : undefined,
                  bounds  : hasFn ? source[0].getBoundingClientRect() : angular.extend({}, bounds, source[0]),
                  focus   : angular.bind(source, source.focus),
              });
            }
          }

          /**
           * If the specifier is a simple string selector, then query for
           * the DOM element.
           */
          function getDomElement(element, defaultElement) {
            if (angular.isString(element)) {
              element = $document[0].querySelector(element);
            }

            // If we have a reference to a raw dom element, always wrap it in jqLite
            return angular.element(element || defaultElement);
          }

        }

    /**
     * Listen for escape keys and outside clicks to auto close
     */
    function activateListeners(element, options) {
      var window = angular.element($window);
      var onWindowResize = $mdUtil.debounce(function() {
        stretchDialogContainerToViewport(element, options);
      }, 60);

      var removeListeners = [];
      var smartClose = function() {
        // Only 'confirm' dialogs have a cancel button... escape/clickOutside will
        // cancel or fallback to hide.
        var closeFn = (options.$type == 'alert') ? $mdDialog.hide : $mdDialog.cancel;
        $mdUtil.nextTick(closeFn, true);
      };

      if (options.escapeToClose) {
        var parentTarget = options.parent;
        var keyHandlerFn = function(ev) {
          if (ev.keyCode === $mdConstant.KEY_CODE.ESCAPE) {
            ev.stopImmediatePropagation();
            ev.preventDefault();

            smartClose();
          }
        };

        // Add keydown listeners
        element.on('keydown', keyHandlerFn);
        parentTarget.on('keydown', keyHandlerFn);

        // Queue remove listeners function
        removeListeners.push(function() {

          element.off('keydown', keyHandlerFn);
          parentTarget.off('keydown', keyHandlerFn);

        });
      }

      // Register listener to update dialog on window resize
      window.on('resize', onWindowResize);

      removeListeners.push(function() {
        window.off('resize', onWindowResize);
      });

      if (options.clickOutsideToClose) {
        var target = element;
        var sourceElem;

        // Keep track of the element on which the mouse originally went down
        // so that we can only close the backdrop when the 'click' started on it.
        // A simple 'click' handler does not work,
        // it sets the target object as the element the mouse went down on.
        var mousedownHandler = function(ev) {
          sourceElem = ev.target;
        };

        // We check if our original element and the target is the backdrop
        // because if the original was the backdrop and the target was inside the dialog
        // we don't want to dialog to close.
        var mouseupHandler = function(ev) {
          if (sourceElem === target[0] && ev.target === target[0]) {
            ev.stopPropagation();
            ev.preventDefault();

            smartClose();
          }
        };

        // Add listeners
        target.on('mousedown', mousedownHandler);
        target.on('mouseup', mouseupHandler);

        // Queue remove listeners function
        removeListeners.push(function() {
          target.off('mousedown', mousedownHandler);
          target.off('mouseup', mouseupHandler);
        });
      }

      // Attach specific `remove` listener handler
      options.deactivateListeners = function() {
        removeListeners.forEach(function(removeFn) {
          removeFn();
        });
        options.deactivateListeners = null;
      };
    }

    /**
     * Show modal backdrop element...
     */
    function showBackdrop(scope, element, options) {

      if (options.disableParentScroll) {
        // !! DO this before creating the backdrop; since disableScrollAround()
        //    configures the scroll offset; which is used by mdBackDrop postLink()
        options.restoreScroll = $mdUtil.disableScrollAround(element, options.parent);
      }

      if (options.hasBackdrop) {
        options.backdrop = $mdUtil.createBackdrop(scope, "md-dialog-backdrop md-opaque");
        $animate.enter(options.backdrop, options.parent);
      }

      /**
       * Hide modal backdrop element...
       */
      options.hideBackdrop = function hideBackdrop($destroy) {
        if (options.backdrop) {
          if ($destroy) options.backdrop.remove();
          else              $animate.leave(options.backdrop);
        }


        if (options.disableParentScroll) {
          options.restoreScroll && options.restoreScroll();
          delete options.restoreScroll;
        }

        options.hideBackdrop = null;
      };
    }

    /**
     * Inject ARIA-specific attributes appropriate for Dialogs
     */
    function configureAria(element, options) {

      var role = (options.$type === 'alert') ? 'alertdialog' : 'dialog';
      var dialogContent = element.find('md-dialog-content');
      var existingDialogId = element.attr('id');
      var dialogContentId = 'dialogContent_' + (existingDialogId || $mdUtil.nextUid());

      element.attr({
        'role': role,
        'tabIndex': '-1'
      });

      if (dialogContent.length === 0) {
        dialogContent = element;
        // If the dialog element already had an ID, don't clobber it.
        if (existingDialogId) {
          dialogContentId = existingDialogId;
        }
      }

      dialogContent.attr('id', dialogContentId);
      element.attr('aria-describedby', dialogContentId);

      if (options.ariaLabel) {
        $mdAria.expect(element, 'aria-label', options.ariaLabel);
      }
      else {
        $mdAria.expectAsync(element, 'aria-label', function() {
          // If dialog title is specified, set aria-label with it
          // See https://github.com/angular/material/issues/10582
          if (options.title) {
            return options.title;
          } else {
            var words = dialogContent.text().split(/\s+/);
            if (words.length > 3) words = words.slice(0, 3).concat('...');
            return words.join(' ');
          }
        });
      }

      // Set up elements before and after the dialog content to capture focus and
      // redirect back into the dialog.
      topFocusTrap = document.createElement('div');
      topFocusTrap.classList.add('md-dialog-focus-trap');
      topFocusTrap.tabIndex = 0;

      bottomFocusTrap = topFocusTrap.cloneNode(false);

      // When focus is about to move out of the dialog, we want to intercept it and redirect it
      // back to the dialog element.
      var focusHandler = function() {
        element.focus();
      };
      topFocusTrap.addEventListener('focus', focusHandler);
      bottomFocusTrap.addEventListener('focus', focusHandler);

      // The top focus trap inserted immeidately before the md-dialog element (as a sibling).
      // The bottom focus trap is inserted at the very end of the md-dialog element (as a child).
      element[0].parentNode.insertBefore(topFocusTrap, element[0]);
      element.after(bottomFocusTrap);
    }

    /**
     * Prevents screen reader interaction behind modal window
     * on swipe interfaces
     */
    function lockScreenReader(element, options) {
      var isHidden = true;

      // get raw DOM node
      walkDOM(element[0]);

      options.unlockScreenReader = function () {
        isHidden = false;
        walkDOM(element[0]);

        options.unlockScreenReader = null;
      };

      /**
       * Get all of an element's parent elements up the DOM tree
       * @return {Array} The parent elements
       */
      function getParents(element) {
        var parents = [];
        while (element.parentNode) {
          if (element === document.body) {
            return parents;
          }
          var children = element.parentNode.children;
          for (var i = 0; i < children.length; i++) {
            // skip over child if it is an ascendant of the dialog
            // a script or style tag, or a live region.
            if (element !== children[i] &&
                !isNodeOneOf(children[i], ['SCRIPT', 'STYLE']) &&
                !children[i].hasAttribute('aria-live')) {
              parents.push(children[i]);
            }
          }
          element = element.parentNode;
        }
        return parents;
      }

      /**
       * Walk DOM to apply or remove aria-hidden on sibling nodes
       * and parent sibling nodes
       */
      function walkDOM(element) {
        var elements = getParents(element);
        for (var i = 0; i < elements.length; i++) {
          elements[i].setAttribute('aria-hidden', isHidden);
        }
      }
    }

    /**
     * Ensure the dialog container fill-stretches to the viewport
     */
    function stretchDialogContainerToViewport(container, options) {
      var isFixed = $window.getComputedStyle($document[0].body).position == 'fixed';
      var backdrop = options.backdrop ? $window.getComputedStyle(options.backdrop[0]) : null;
      var height = backdrop ? Math.min($document[0].body.clientHeight, Math.ceil(Math.abs(parseInt(backdrop.height, 10)))) : 0;

      var previousStyles = {
        top: container.css('top'),
        height: container.css('height')
      };

      // If the body is fixed, determine the distance to the viewport in relative from the parent.
      var parentTop = Math.abs(options.parent[0].getBoundingClientRect().top);

      container.css({
        top: (isFixed ? parentTop : 0) + 'px',
        height: height ? height + 'px' : '100%'
      });

      return function() {
        // Reverts the modified styles back to the previous values.
        // This is needed for contentElements, which should have the same styles after close
        // as before.
        container.css(previousStyles);
      };
    }

    /**
     *  Dialog open and pop-in animation
     */
    function dialogPopIn(container, options) {
      // Add the `md-dialog-container` to the DOM
      options.parent.append(container);
      options.reverseContainerStretch = stretchDialogContainerToViewport(container, options);

      var dialogEl = container.find('md-dialog');
      var animator = $mdUtil.dom.animator;
      var buildTranslateToOrigin = animator.calculateZoomToOrigin;
      var translateOptions = {transitionInClass: 'md-transition-in', transitionOutClass: 'md-transition-out'};
      var from = animator.toTransformCss(buildTranslateToOrigin(dialogEl, options.openFrom || options.origin));
      var to = animator.toTransformCss("");  // defaults to center display (or parent or $rootElement)

      dialogEl.toggleClass('md-dialog-fullscreen', !!options.fullscreen);

      return animator
        .translate3d(dialogEl, from, to, translateOptions)
        .then(function(animateReversal) {

          // Build a reversal translate function synced to this translation...
          options.reverseAnimate = function() {
            delete options.reverseAnimate;

            if (options.closeTo) {
              // Using the opposite classes to create a close animation to the closeTo element
              translateOptions = {transitionInClass: 'md-transition-out', transitionOutClass: 'md-transition-in'};
              from = to;
              to = animator.toTransformCss(buildTranslateToOrigin(dialogEl, options.closeTo));

              return animator
                .translate3d(dialogEl, from, to,translateOptions);
            }

            return animateReversal(
              to = animator.toTransformCss(
                // in case the origin element has moved or is hidden,
                // let's recalculate the translateCSS
                buildTranslateToOrigin(dialogEl, options.origin)
              )
            );

          };

          // Function to revert the generated animation styles on the dialog element.
          // Useful when using a contentElement instead of a template.
          options.clearAnimate = function() {
            delete options.clearAnimate;

            // Remove the transition classes, added from $animateCSS, since those can't be removed
            // by reversely running the animator.
            dialogEl.removeClass([
              translateOptions.transitionOutClass,
              translateOptions.transitionInClass
            ].join(' '));

            // Run the animation reversely to remove the previous added animation styles.
            return animator.translate3d(dialogEl, to, animator.toTransformCss(''), {});
          };

          return true;
        });
    }

    /**
     * Dialog close and pop-out animation
     */
    function dialogPopOut(container, options) {
      return options.reverseAnimate().then(function() {
        if (options.contentElement) {
          // When we use a contentElement, we want the element to be the same as before.
          // That means, that we have to clear all the animation properties, like transform.
          options.clearAnimate();
        }
      });
    }

    /**
     * Utility function to filter out raw DOM nodes
     */
    function isNodeOneOf(elem, nodeTypeArray) {
      if (nodeTypeArray.indexOf(elem.nodeName) !== -1) {
        return true;
      }
    }

  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.divider
 * @description Divider module!
 */
MdDividerDirective.$inject = ["$mdTheming"];
angular.module('material.components.divider', [
  'material.core'
])
  .directive('mdDivider', MdDividerDirective);

/**
 * @ngdoc directive
 * @name mdDivider
 * @module material.components.divider
 * @restrict E
 *
 * @description
 * Dividers group and separate content within lists and page layouts using strong visual and spatial distinctions. This divider is a thin rule, lightweight enough to not distract the user from content.
 *
 * @param {boolean=} md-inset Add this attribute to activate the inset divider style.
 * @usage
 * <hljs lang="html">
 * <md-divider></md-divider>
 *
 * <md-divider md-inset></md-divider>
 * </hljs>
 *
 */
function MdDividerDirective($mdTheming) {
  return {
    restrict: 'E',
    link: $mdTheming
  };
}

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name material.components.fabActions
   */
  MdFabActionsDirective.$inject = ["$mdUtil"];
  angular
    .module('material.components.fabActions', ['material.core'])
    .directive('mdFabActions', MdFabActionsDirective);

  /**
   * @ngdoc directive
   * @name mdFabActions
   * @module material.components.fabActions
   *
   * @restrict E
   *
   * @description
   * The `<md-fab-actions>` directive is used inside of a `<md-fab-speed-dial>` or
   * `<md-fab-toolbar>` directive to mark an element (or elements) as the actions and setup the
   * proper event listeners.
   *
   * @usage
   * See the `<md-fab-speed-dial>` or `<md-fab-toolbar>` directives for example usage.
   */
  function MdFabActionsDirective($mdUtil) {
    return {
      restrict: 'E',

      require: ['^?mdFabSpeedDial', '^?mdFabToolbar'],

      compile: function(element, attributes) {
        var children = element.children();

        var hasNgRepeat = $mdUtil.prefixer().hasAttribute(children, 'ng-repeat');

        // Support both ng-repeat and static content
        if (hasNgRepeat) {
          children.addClass('md-fab-action-item');
        } else {
          // Wrap every child in a new div and add a class that we can scale/fling independently
          children.wrap('<div class="md-fab-action-item">');
        }
      }
    };
  }

})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  MdFabController.$inject = ["$scope", "$element", "$animate", "$mdUtil", "$mdConstant", "$timeout"];
  angular.module('material.components.fabShared', ['material.core'])
    .controller('MdFabController', MdFabController);

  function MdFabController($scope, $element, $animate, $mdUtil, $mdConstant, $timeout) {
    var vm = this;
    var initialAnimationAttempts = 0;

    // NOTE: We use async eval(s) below to avoid conflicts with any existing digest loops

    vm.open = function() {
      $scope.$evalAsync("vm.isOpen = true");
    };

    vm.close = function() {
      // Async eval to avoid conflicts with existing digest loops
      $scope.$evalAsync("vm.isOpen = false");

      // Focus the trigger when the element closes so users can still tab to the next item
      $element.find('md-fab-trigger')[0].focus();
    };

    // Toggle the open/close state when the trigger is clicked
    vm.toggle = function() {
      $scope.$evalAsync("vm.isOpen = !vm.isOpen");
    };

    /*
     * AngularJS Lifecycle hook for newer AngularJS versions.
     * Bindings are not guaranteed to have been assigned in the controller, but they are in the $onInit hook.
     */
    vm.$onInit = function() {
      setupDefaults();
      setupListeners();
      setupWatchers();

      fireInitialAnimations();
    };

    // For AngularJS 1.4 and older, where there are no lifecycle hooks but bindings are pre-assigned,
    // manually call the $onInit hook.
    if (angular.version.major === 1 && angular.version.minor <= 4) {
      this.$onInit();
    }

    function setupDefaults() {
      // Set the default direction to 'down' if none is specified
      vm.direction = vm.direction || 'down';

      // Set the default to be closed
      vm.isOpen = vm.isOpen || false;

      // Start the keyboard interaction at the first action
      resetActionIndex();

      // Add an animations waiting class so we know not to run
      $element.addClass('md-animations-waiting');
    }

    function setupListeners() {
      var eventTypes = [
        'click', 'focusin', 'focusout'
      ];

      // Add our listeners
      angular.forEach(eventTypes, function(eventType) {
        $element.on(eventType, parseEvents);
      });

      // Remove our listeners when destroyed
      $scope.$on('$destroy', function() {
        angular.forEach(eventTypes, function(eventType) {
          $element.off(eventType, parseEvents);
        });

        // remove any attached keyboard handlers in case element is removed while
        // speed dial is open
        disableKeyboard();
      });
    }

    var closeTimeout;
    function parseEvents(event) {
      // If the event is a click, just handle it
      if (event.type == 'click') {
        handleItemClick(event);
      }

      // If we focusout, set a timeout to close the element
      if (event.type == 'focusout' && !closeTimeout) {
        closeTimeout = $timeout(function() {
          vm.close();
        }, 100, false);
      }

      // If we see a focusin and there is a timeout about to run, cancel it so we stay open
      if (event.type == 'focusin' && closeTimeout) {
        $timeout.cancel(closeTimeout);
        closeTimeout = null;
      }
    }

    function resetActionIndex() {
      vm.currentActionIndex = -1;
    }

    function setupWatchers() {
      // Watch for changes to the direction and update classes/attributes
      $scope.$watch('vm.direction', function(newDir, oldDir) {
        // Add the appropriate classes so we can target the direction in the CSS
        $animate.removeClass($element, 'md-' + oldDir);
        $animate.addClass($element, 'md-' + newDir);

        // Reset the action index since it may have changed
        resetActionIndex();
      });

      var trigger, actions;

      // Watch for changes to md-open
      $scope.$watch('vm.isOpen', function(isOpen) {
        // Reset the action index since it may have changed
        resetActionIndex();

        // We can't get the trigger/actions outside of the watch because the component hasn't been
        // linked yet, so we wait until the first watch fires to cache them.
        if (!trigger || !actions) {
          trigger = getTriggerElement();
          actions = getActionsElement();
        }

        if (isOpen) {
          enableKeyboard();
        } else {
          disableKeyboard();
        }

        var toAdd = isOpen ? 'md-is-open' : '';
        var toRemove = isOpen ? '' : 'md-is-open';

        // Set the proper ARIA attributes
        trigger.attr('aria-haspopup', true);
        trigger.attr('aria-expanded', isOpen);
        actions.attr('aria-hidden', !isOpen);

        // Animate the CSS classes
        $animate.setClass($element, toAdd, toRemove);
      });
    }

    function fireInitialAnimations() {
      // If the element is actually visible on the screen
      if ($element[0].scrollHeight > 0) {
        // Fire our animation
        $animate.addClass($element, '_md-animations-ready').then(function() {
          // Remove the waiting class
          $element.removeClass('md-animations-waiting');
        });
      }

      // Otherwise, try for up to 1 second before giving up
      else if (initialAnimationAttempts < 10) {
        $timeout(fireInitialAnimations, 100);

        // Increment our counter
        initialAnimationAttempts = initialAnimationAttempts + 1;
      }
    }

    function enableKeyboard() {
      $element.on('keydown', keyPressed);

      // On the next tick, setup a check for outside clicks; we do this on the next tick to avoid
      // clicks/touches that result in the isOpen attribute changing (e.g. a bound radio button)
      $mdUtil.nextTick(function() {
        angular.element(document).on('click touchend', checkForOutsideClick);
      });

      // TODO: On desktop, we should be able to reset the indexes so you cannot tab through, but
      // this breaks accessibility, especially on mobile, since you have no arrow keys to press
      // resetActionTabIndexes();
    }

    function disableKeyboard() {
      $element.off('keydown', keyPressed);
      angular.element(document).off('click touchend', checkForOutsideClick);
    }

    function checkForOutsideClick(event) {
      if (event.target) {
        var closestTrigger = $mdUtil.getClosest(event.target, 'md-fab-trigger');
        var closestActions = $mdUtil.getClosest(event.target, 'md-fab-actions');

        if (!closestTrigger && !closestActions) {
          vm.close();
        }
      }
    }

    function keyPressed(event) {
      switch (event.which) {
        case $mdConstant.KEY_CODE.ESCAPE: vm.close(); event.preventDefault(); return false;
        case $mdConstant.KEY_CODE.LEFT_ARROW: doKeyLeft(event); return false;
        case $mdConstant.KEY_CODE.UP_ARROW: doKeyUp(event); return false;
        case $mdConstant.KEY_CODE.RIGHT_ARROW: doKeyRight(event); return false;
        case $mdConstant.KEY_CODE.DOWN_ARROW: doKeyDown(event); return false;
      }
    }

    function doActionPrev(event) {
      focusAction(event, -1);
    }

    function doActionNext(event) {
      focusAction(event, 1);
    }

    function focusAction(event, direction) {
      var actions = resetActionTabIndexes();

      // Increment/decrement the counter with restrictions
      vm.currentActionIndex = vm.currentActionIndex + direction;
      vm.currentActionIndex = Math.min(actions.length - 1, vm.currentActionIndex);
      vm.currentActionIndex = Math.max(0, vm.currentActionIndex);

      // Focus the element
      var focusElement =  angular.element(actions[vm.currentActionIndex]).children()[0];
      angular.element(focusElement).attr('tabindex', 0);
      focusElement.focus();

      // Make sure the event doesn't bubble and cause something else
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function resetActionTabIndexes() {
      // Grab all of the actions
      var actions = getActionsElement()[0].querySelectorAll('.md-fab-action-item');

      // Disable all other actions for tabbing
      angular.forEach(actions, function(action) {
        angular.element(angular.element(action).children()[0]).attr('tabindex', -1);
      });

      return actions;
    }

    function doKeyLeft(event) {
      if (vm.direction === 'left') {
        doActionNext(event);
      } else {
        doActionPrev(event);
      }
    }

    function doKeyUp(event) {
      if (vm.direction === 'down') {
        doActionPrev(event);
      } else {
        doActionNext(event);
      }
    }

    function doKeyRight(event) {
      if (vm.direction === 'left') {
        doActionPrev(event);
      } else {
        doActionNext(event);
      }
    }

    function doKeyDown(event) {
      if (vm.direction === 'up') {
        doActionPrev(event);
      } else {
        doActionNext(event);
      }
    }

    function isTrigger(element) {
      return $mdUtil.getClosest(element, 'md-fab-trigger');
    }

    function isAction(element) {
      return $mdUtil.getClosest(element, 'md-fab-actions');
    }

    function handleItemClick(event) {
      if (isTrigger(event.target)) {
        vm.toggle();
      }

      if (isAction(event.target)) {
        vm.close();
      }
    }

    function getTriggerElement() {
      return $element.find('md-fab-trigger');
    }

    function getActionsElement() {
      return $element.find('md-fab-actions');
    }
  }
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * The duration of the CSS animation in milliseconds.
   *
   * @type {number}
   */
  MdFabSpeedDialFlingAnimation.$inject = ["$timeout"];
  MdFabSpeedDialScaleAnimation.$inject = ["$timeout"];
  var cssAnimationDuration = 300;

  /**
   * @ngdoc module
   * @name material.components.fabSpeedDial
   */
  angular
    // Declare our module
    .module('material.components.fabSpeedDial', [
      'material.core',
      'material.components.fabShared',
      'material.components.fabActions'
    ])

    // Register our directive
    .directive('mdFabSpeedDial', MdFabSpeedDialDirective)

    // Register our custom animations
    .animation('.md-fling', MdFabSpeedDialFlingAnimation)
    .animation('.md-scale', MdFabSpeedDialScaleAnimation)

    // Register a service for each animation so that we can easily inject them into unit tests
    .service('mdFabSpeedDialFlingAnimation', MdFabSpeedDialFlingAnimation)
    .service('mdFabSpeedDialScaleAnimation', MdFabSpeedDialScaleAnimation);

  /**
   * @ngdoc directive
   * @name mdFabSpeedDial
   * @module material.components.fabSpeedDial
   *
   * @restrict E
   *
   * @description
   * The `<md-fab-speed-dial>` directive is used to present a series of popup elements (usually
   * `<md-button>`s) for quick access to common actions.
   *
   * There are currently two animations available by applying one of the following classes to
   * the component:
   *
   *  - `md-fling` - The speed dial items appear from underneath the trigger and move into their
   *    appropriate positions.
   *  - `md-scale` - The speed dial items appear in their proper places by scaling from 0% to 100%.
   *
   * You may also easily position the trigger by applying one one of the following classes to the
   * `<md-fab-speed-dial>` element:
   *  - `md-fab-top-left`
   *  - `md-fab-top-right`
   *  - `md-fab-bottom-left`
   *  - `md-fab-bottom-right`
   *
   * These CSS classes use `position: absolute`, so you need to ensure that the container element
   * also uses `position: absolute` or `position: relative` in order for them to work.
   *
   * Additionally, you may use the standard `ng-mouseenter` and `ng-mouseleave` directives to
   * open or close the speed dial. However, if you wish to allow users to hover over the empty
   * space where the actions will appear, you must also add the `md-hover-full` class to the speed
   * dial element. Without this, the hover effect will only occur on top of the trigger.
   *
   * See the demos for more information.
   *
   * ## Troubleshooting
   *
   * If your speed dial shows the closing animation upon launch, you may need to use `ng-cloak` on
   * the parent container to ensure that it is only visible once ready. We have plans to remove this
   * necessity in the future.
   *
   * @usage
   * <hljs lang="html">
   * <md-fab-speed-dial md-direction="up" class="md-fling">
   *   <md-fab-trigger>
   *     <md-button aria-label="Add..."><md-icon md-svg-src="/img/icons/plus.svg"></md-icon></md-button>
   *   </md-fab-trigger>
   *
   *   <md-fab-actions>
   *     <md-button aria-label="Add User">
   *       <md-icon md-svg-src="/img/icons/user.svg"></md-icon>
   *     </md-button>
   *
   *     <md-button aria-label="Add Group">
   *       <md-icon md-svg-src="/img/icons/group.svg"></md-icon>
   *     </md-button>
   *   </md-fab-actions>
   * </md-fab-speed-dial>
   * </hljs>
   *
   * @param {string} md-direction From which direction you would like the speed dial to appear
   * relative to the trigger element.
   * @param {expression=} md-open Programmatically control whether or not the speed-dial is visible.
   */
  function MdFabSpeedDialDirective() {
    return {
      restrict: 'E',

      scope: {
        direction: '@?mdDirection',
        isOpen: '=?mdOpen'
      },

      bindToController: true,
      controller: 'MdFabController',
      controllerAs: 'vm',

      link: FabSpeedDialLink
    };

    function FabSpeedDialLink(scope, element) {
      // Prepend an element to hold our CSS variables so we can use them in the animations below
      element.prepend('<div class="_md-css-variables"></div>');
    }
  }

  function MdFabSpeedDialFlingAnimation($timeout) {
    function delayDone(done) { $timeout(done, cssAnimationDuration, false); }

    function runAnimation(element) {
      // Don't run if we are still waiting and we are not ready
      if (element.hasClass('md-animations-waiting') && !element.hasClass('_md-animations-ready')) {
        return;
      }

      var el = element[0];
      var ctrl = element.controller('mdFabSpeedDial');
      var items = el.querySelectorAll('.md-fab-action-item');

      // Grab our trigger element
      var triggerElement = el.querySelector('md-fab-trigger');

      // Grab our element which stores CSS variables
      var variablesElement = el.querySelector('._md-css-variables');

      // Setup JS variables based on our CSS variables
      var startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

      // Always reset the items to their natural position/state
      angular.forEach(items, function(item, index) {
        var styles = item.style;

        styles.transform = styles.webkitTransform = '';
        styles.transitionDelay = '';
        styles.opacity = 1;

        // Make the items closest to the trigger have the highest z-index
        styles.zIndex = (items.length - index) + startZIndex;
      });

      // Set the trigger to be above all of the actions so they disappear behind it.
      triggerElement.style.zIndex = startZIndex + items.length + 1;

      // If the control is closed, hide the items behind the trigger
      if (!ctrl.isOpen) {
        angular.forEach(items, function(item, index) {
          var newPosition, axis;
          var styles = item.style;

          // Make sure to account for differences in the dimensions of the trigger verses the items
          // so that we can properly center everything; this helps hide the item's shadows behind
          // the trigger.
          var triggerItemHeightOffset = (triggerElement.clientHeight - item.clientHeight) / 2;
          var triggerItemWidthOffset = (triggerElement.clientWidth - item.clientWidth) / 2;

          switch (ctrl.direction) {
            case 'up':
              newPosition = (item.scrollHeight * (index + 1) + triggerItemHeightOffset);
              axis = 'Y';
              break;
            case 'down':
              newPosition = -(item.scrollHeight * (index + 1) + triggerItemHeightOffset);
              axis = 'Y';
              break;
            case 'left':
              newPosition = (item.scrollWidth * (index + 1) + triggerItemWidthOffset);
              axis = 'X';
              break;
            case 'right':
              newPosition = -(item.scrollWidth * (index + 1) + triggerItemWidthOffset);
              axis = 'X';
              break;
          }

          var newTranslate = 'translate' + axis + '(' + newPosition + 'px)';

          styles.transform = styles.webkitTransform = newTranslate;
        });
      }
    }

    return {
      addClass: function(element, className, done) {
        if (element.hasClass('md-fling')) {
          runAnimation(element);
          delayDone(done);
        } else {
          done();
        }
      },
      removeClass: function(element, className, done) {
        runAnimation(element);
        delayDone(done);
      }
    };
  }

  function MdFabSpeedDialScaleAnimation($timeout) {
    function delayDone(done) { $timeout(done, cssAnimationDuration, false); }

    var delay = 65;

    function runAnimation(element) {
      var el = element[0];
      var ctrl = element.controller('mdFabSpeedDial');
      var items = el.querySelectorAll('.md-fab-action-item');

      // Grab our element which stores CSS variables
      var variablesElement = el.querySelector('._md-css-variables');

      // Setup JS variables based on our CSS variables
      var startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

      // Always reset the items to their natural position/state
      angular.forEach(items, function(item, index) {
        var styles = item.style,
          offsetDelay = index * delay;

        styles.opacity = ctrl.isOpen ? 1 : 0;
        styles.transform = styles.webkitTransform = ctrl.isOpen ? 'scale(1)' : 'scale(0)';
        styles.transitionDelay = (ctrl.isOpen ? offsetDelay : (items.length - offsetDelay)) + 'ms';

        // Make the items closest to the trigger have the highest z-index
        styles.zIndex = (items.length - index) + startZIndex;
      });
    }

    return {
      addClass: function(element, className, done) {
        runAnimation(element);
        delayDone(done);
      },

      removeClass: function(element, className, done) {
        runAnimation(element);
        delayDone(done);
      }
    };
  }
})();

})();
(function(){
"use strict";

(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name material.components.fabToolbar
   */
  angular
    // Declare our module
    .module('material.components.fabToolbar', [
      'material.core',
      'material.components.fabShared',
      'material.components.fabActions'
    ])

    // Register our directive
    .directive('mdFabToolbar', MdFabToolbarDirective)

    // Register our custom animations
    .animation('.md-fab-toolbar', MdFabToolbarAnimation)

    // Register a service for the animation so that we can easily inject it into unit tests
    .service('mdFabToolbarAnimation', MdFabToolbarAnimation);

  /**
   * @ngdoc directive
   * @name mdFabToolbar
   * @module material.components.fabToolbar
   *
   * @restrict E
   *
   * @description
   *
   * The `<md-fab-toolbar>` directive is used to present a toolbar of elements (usually `<md-button>`s)
   * for quick access to common actions when a floating action button is activated (via click or
   * keyboard navigation).
   *
   * You may also easily position the trigger by applying one one of the following classes to the
   * `<md-fab-toolbar>` element:
   *  - `md-fab-top-left`
   *  - `md-fab-top-right`
   *  - `md-fab-bottom-left`
   *  - `md-fab-bottom-right`
   *
   * These CSS classes use `position: absolute`, so you need to ensure that the container element
   * also uses `position: absolute` or `position: relative` in order for them to work.
   *
   * @usage
   *
   * <hljs lang="html">
   * <md-fab-toolbar md-direction='left'>
   *   <md-fab-trigger>
   *     <md-button aria-label="Add..."><md-icon md-svg-src="/img/icons/plus.svg"></md-icon></md-button>
   *   </md-fab-trigger>
   *
   *   <md-toolbar>
   *    <md-fab-actions>
   *      <md-button aria-label="Add User">
   *        <md-icon md-svg-src="/img/icons/user.svg"></md-icon>
   *      </md-button>
   *
   *      <md-button aria-label="Add Group">
   *        <md-icon md-svg-src="/img/icons/group.svg"></md-icon>
   *      </md-button>
   *    </md-fab-actions>
   *   </md-toolbar>
   * </md-fab-toolbar>
   * </hljs>
   *
   * @param {string} md-direction From which direction you would like the toolbar items to appear
   * relative to the trigger element. Supports `left` and `right` directions.
   * @param {expression=} md-open Programmatically control whether or not the toolbar is visible.
   */
  function MdFabToolbarDirective() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div class="md-fab-toolbar-wrapper">' +
      '  <div class="md-fab-toolbar-content" ng-transclude></div>' +
      '</div>',

      scope: {
        direction: '@?mdDirection',
        isOpen: '=?mdOpen'
      },

      bindToController: true,
      controller: 'MdFabController',
      controllerAs: 'vm',

      link: link
    };

    function link(scope, element, attributes) {
      // Add the base class for animations
      element.addClass('md-fab-toolbar');

      // Prepend the background element to the trigger's button
      element.find('md-fab-trigger').find('button')
        .prepend('<div class="md-fab-toolbar-background"></div>');
    }
  }

  function MdFabToolbarAnimation() {

    function runAnimation(element, className, done) {
      // If no className was specified, don't do anything
      if (!className) {
        return;
      }

      var el = element[0];
      var ctrl = element.controller('mdFabToolbar');

      // Grab the relevant child elements
      var backgroundElement = el.querySelector('.md-fab-toolbar-background');
      var triggerElement = el.querySelector('md-fab-trigger button');
      var toolbarElement = el.querySelector('md-toolbar');
      var iconElement = el.querySelector('md-fab-trigger button md-icon');
      var actions = element.find('md-fab-actions').children();

      // If we have both elements, use them to position the new background
      if (triggerElement && backgroundElement) {
        // Get our variables
        var color = window.getComputedStyle(triggerElement).getPropertyValue('background-color');
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        // Make it twice as big as it should be since we scale from the center
        var scale = 2 * (width / triggerElement.offsetWidth);

        // Set some basic styles no matter what animation we're doing
        backgroundElement.style.backgroundColor = color;
        backgroundElement.style.borderRadius = width + 'px';

        // If we're open
        if (ctrl.isOpen) {
          // Turn on toolbar pointer events when closed
          toolbarElement.style.pointerEvents = 'inherit';

          backgroundElement.style.width = triggerElement.offsetWidth + 'px';
          backgroundElement.style.height = triggerElement.offsetHeight + 'px';
          backgroundElement.style.transform = 'scale(' + scale + ')';

          // Set the next close animation to have the proper delays
          backgroundElement.style.transitionDelay = '0ms';
          iconElement && (iconElement.style.transitionDelay = '.3s');

          // Apply a transition delay to actions
          angular.forEach(actions, function(action, index) {
            action.style.transitionDelay = (actions.length - index) * 25 + 'ms';
          });
        } else {
          // Turn off toolbar pointer events when closed
          toolbarElement.style.pointerEvents = 'none';

          // Scale it back down to the trigger's size
          backgroundElement.style.transform = 'scale(1)';

          // Reset the position
          backgroundElement.style.top = '0';

          if (element.hasClass('md-right')) {
            backgroundElement.style.left = '0';
            backgroundElement.style.right = null;
          }

          if (element.hasClass('md-left')) {
            backgroundElement.style.right = '0';
            backgroundElement.style.left = null;
          }

          // Set the next open animation to have the proper delays
          backgroundElement.style.transitionDelay = '200ms';
          iconElement && (iconElement.style.transitionDelay = '0ms');

          // Apply a transition delay to actions
          angular.forEach(actions, function(action, index) {
            action.style.transitionDelay = 200 + (index * 25) + 'ms';
          });
        }
      }
    }

    return {
      addClass: function(element, className, done) {
        runAnimation(element, className, done);
        done();
      },

      removeClass: function(element, className, done) {
        runAnimation(element, className, done);
        done();
      }
    };
  }
})();

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.gridList
 */
GridListController.$inject = ["$mdUtil"];
GridLayoutFactory.$inject = ["$mdUtil"];
GridListDirective.$inject = ["$interpolate", "$mdConstant", "$mdGridLayout", "$mdMedia", "$mdUtil"];
GridTileDirective.$inject = ["$mdMedia"];
angular.module('material.components.gridList', ['material.core'])
       .directive('mdGridList', GridListDirective)
       .directive('mdGridTile', GridTileDirective)
       .directive('mdGridTileFooter', GridTileCaptionDirective)
       .directive('mdGridTileHeader', GridTileCaptionDirective)
       .factory('$mdGridLayout', GridLayoutFactory);

/**
 * @ngdoc directive
 * @name mdGridList
 * @module material.components.gridList
 * @restrict E
 * @description
 * Grid lists are an alternative to standard list views. Grid lists are distinct
 * from grids used for layouts and other visual presentations.
 *
 * A grid list is best suited to presenting a homogenous data type, typically
 * images, and is optimized for visual comprehension and differentiating between
 * like data types.
 *
 * A grid list is a continuous element consisting of tessellated, regular
 * subdivisions called cells that contain tiles (`md-grid-tile`).
 *
 * <img src="//material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7OVlEaXZ5YmU1Xzg/components_grids_usage2.png"
 *    style="width: 300px; height: auto; margin-right: 16px;" alt="Concept of grid explained visually">
 * <img src="//material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7VGhsOE5idWlJWXM/components_grids_usage3.png"
 *    style="width: 300px; height: auto;" alt="Grid concepts legend">
 *
 * Cells are arrayed vertically and horizontally within the grid.
 *
 * Tiles hold content and can span one or more cells vertically or horizontally.
 *
 * ### Responsive Attributes
 *
 * The `md-grid-list` directive supports "responsive" attributes, which allow
 * different `md-cols`, `md-gutter` and `md-row-height` values depending on the
 * currently matching media query.
 *
 * In order to set a responsive attribute, first define the fallback value with
 * the standard attribute name, then add additional attributes with the
 * following convention: `{base-attribute-name}-{media-query-name}="{value}"`
 * (ie. `md-cols-lg="8"`)
 *
 * @param {number} md-cols Number of columns in the grid.
 * @param {string} md-row-height One of
 * <ul>
 *   <li>CSS length - Fixed height rows (eg. `8px` or `1rem`)</li>
 *   <li>`{width}:{height}` - Ratio of width to height (eg.
 *   `md-row-height="16:9"`)</li>
 *   <li>`"fit"` - Height will be determined by subdividing the available
 *   height by the number of rows</li>
 * </ul>
 * @param {string=} md-gutter The amount of space between tiles in CSS units
 *     (default 1px)
 * @param {expression=} md-on-layout Expression to evaluate after layout. Event
 *     object is available as `$event`, and contains performance information.
 *
 * @usage
 * Basic:
 * <hljs lang="html">
 * <md-grid-list md-cols="5" md-gutter="1em" md-row-height="4:3">
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Fixed-height rows:
 * <hljs lang="html">
 * <md-grid-list md-cols="4" md-row-height="200px" ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Fit rows:
 * <hljs lang="html">
 * <md-grid-list md-cols="4" md-row-height="fit" style="height: 400px;" ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 *
 * Using responsive attributes:
 * <hljs lang="html">
 * <md-grid-list
 *     md-cols-sm="2"
 *     md-cols-md="4"
 *     md-cols-lg="8"
 *     md-cols-gt-lg="12"
 *     ...>
 *   <md-grid-tile></md-grid-tile>
 * </md-grid-list>
 * </hljs>
 */
function GridListDirective($interpolate, $mdConstant, $mdGridLayout, $mdMedia, $mdUtil) {
  return {
    restrict: 'E',
    controller: GridListController,
    scope: {
      mdOnLayout: '&'
    },
    link: postLink
  };

  function postLink(scope, element, attrs, ctrl) {
    element.addClass('_md');     // private md component indicator for styling

    // Apply semantics
    element.attr('role', 'list');

    // Provide the controller with a way to trigger layouts.
    ctrl.layoutDelegate = layoutDelegate;

    var invalidateLayout = angular.bind(ctrl, ctrl.invalidateLayout),
        unwatchAttrs = watchMedia();
      scope.$on('$destroy', unwatchMedia);

    /**
     * Watches for changes in media, invalidating layout as necessary.
     */
    function watchMedia() {
      for (var mediaName in $mdConstant.MEDIA) {
        $mdMedia(mediaName); // initialize
        $mdMedia.getQuery($mdConstant.MEDIA[mediaName])
            .addListener(invalidateLayout);
      }
      return $mdMedia.watchResponsiveAttributes(
          ['md-cols', 'md-row-height', 'md-gutter'], attrs, layoutIfMediaMatch);
    }

    function unwatchMedia() {
      ctrl.layoutDelegate = angular.noop;

      unwatchAttrs();
      for (var mediaName in $mdConstant.MEDIA) {
        $mdMedia.getQuery($mdConstant.MEDIA[mediaName])
            .removeListener(invalidateLayout);
      }
    }

    /**
     * Performs grid layout if the provided mediaName matches the currently
     * active media type.
     */
    function layoutIfMediaMatch(mediaName) {
      if (mediaName == null) {
        // TODO(shyndman): It would be nice to only layout if we have
        // instances of attributes using this media type
        ctrl.invalidateLayout();
      } else if ($mdMedia(mediaName)) {
        ctrl.invalidateLayout();
      }
    }

    var lastLayoutProps;

    /**
     * Invokes the layout engine, and uses its results to lay out our
     * tile elements.
     *
     * @param {boolean} tilesInvalidated Whether tiles have been
     *    added/removed/moved since the last layout. This is to avoid situations
     *    where tiles are replaced with properties identical to their removed
     *    counterparts.
     */
    function layoutDelegate(tilesInvalidated) {
      var tiles = getTileElements();
      var props = {
        tileSpans: getTileSpans(tiles),
        colCount: getColumnCount(),
        rowMode: getRowMode(),
        rowHeight: getRowHeight(),
        gutter: getGutter()
      };

      if (!tilesInvalidated && angular.equals(props, lastLayoutProps)) {
        return;
      }

      var performance =
        $mdGridLayout(props.colCount, props.tileSpans, tiles)
          .map(function(tilePositions, rowCount) {
            return {
              grid: {
                element: element,
                style: getGridStyle(props.colCount, rowCount,
                    props.gutter, props.rowMode, props.rowHeight)
              },
              tiles: tilePositions.map(function(ps, i) {
                return {
                  element: angular.element(tiles[i]),
                  style: getTileStyle(ps.position, ps.spans,
                      props.colCount, rowCount,
                      props.gutter, props.rowMode, props.rowHeight)
                };
              })
            };
          })
          .reflow()
          .performance();

      // Report layout
      scope.mdOnLayout({
        $event: {
          performance: performance
        }
      });

      lastLayoutProps = props;
    }

    // Use $interpolate to do some simple string interpolation as a convenience.

    var startSymbol = $interpolate.startSymbol();
    var endSymbol = $interpolate.endSymbol();

    // Returns an expression wrapped in the interpolator's start and end symbols.
    function expr(exprStr) {
      return startSymbol + exprStr + endSymbol;
    }

    // The amount of space a single 1x1 tile would take up (either width or height), used as
    // a basis for other calculations. This consists of taking the base size percent (as would be
    // if evenly dividing the size between cells), and then subtracting the size of one gutter.
    // However, since there are no gutters on the edges, each tile only uses a fration
    // (gutterShare = numGutters / numCells) of the gutter size. (Imagine having one gutter per
    // tile, and then breaking up the extra gutter on the edge evenly among the cells).
    var UNIT = $interpolate(expr('share') + '% - (' + expr('gutter') + ' * ' + expr('gutterShare') + ')');

    // The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
    // The position comes the size of a 1x1 tile plus gutter for each previous tile in the
    // row/column (offset).
    var POSITION  = $interpolate('calc((' + expr('unit') + ' + ' + expr('gutter') + ') * ' + expr('offset') + ')');

    // The actual size of a tile, e.g., width or height, taking rowSpan or colSpan into account.
    // This is computed by multiplying the base unit by the rowSpan/colSpan, and then adding back
    // in the space that the gutter would normally have used (which was already accounted for in
    // the base unit calculation).
    var DIMENSION = $interpolate('calc((' + expr('unit') + ') * ' + expr('span') + ' + (' + expr('span') + ' - 1) * ' + expr('gutter') + ')');

    /**
     * Gets the styles applied to a tile element described by the given parameters.
     * @param {{row: number, col: number}} position The row and column indices of the tile.
     * @param {{row: number, col: number}} spans The rowSpan and colSpan of the tile.
     * @param {number} colCount The number of columns.
     * @param {number} rowCount The number of rows.
     * @param {string} gutter The amount of space between tiles. This will be something like
     *     '5px' or '2em'.
     * @param {string} rowMode The row height mode. Can be one of:
     *     'fixed': all rows have a fixed size, given by rowHeight,
     *     'ratio': row height defined as a ratio to width, or
     *     'fit': fit to the grid-list element height, divinding evenly among rows.
     * @param {string|number} rowHeight The height of a row. This is only used for 'fixed' mode and
     *     for 'ratio' mode. For 'ratio' mode, this is the *ratio* of width-to-height (e.g., 0.75).
     * @returns {Object} Map of CSS properties to be applied to the style element. Will define
     *     values for top, left, width, height, marginTop, and paddingTop.
     */
    function getTileStyle(position, spans, colCount, rowCount, gutter, rowMode, rowHeight) {
      // TODO(shyndman): There are style caching opportunities here.

      // Percent of the available horizontal space that one column takes up.
      var hShare = (1 / colCount) * 100;

      // Fraction of the gutter size that each column takes up.
      var hGutterShare = (colCount - 1) / colCount;

      // Base horizontal size of a column.
      var hUnit = UNIT({share: hShare, gutterShare: hGutterShare, gutter: gutter});

      // The width and horizontal position of each tile is always calculated the same way, but the
      // height and vertical position depends on the rowMode.
      var style = (!$mdUtil.isRtl(attrs)) ? {
          left: POSITION({ unit: hUnit, offset: position.col, gutter: gutter }),
          width: DIMENSION({ unit: hUnit, span: spans.col, gutter: gutter }),
          // resets
          paddingTop: '',
          marginTop: '',
          top: '',
          height: ''
        } : {
        right: POSITION({ unit: hUnit, offset: position.col, gutter: gutter }),
        width: DIMENSION({ unit: hUnit, span: spans.col, gutter: gutter }),
        // resets
        paddingTop: '',
        marginTop: '',
        top: '',
        height: ''
      };

      switch (rowMode) {
        case 'fixed':
          // In fixed mode, simply use the given rowHeight.
          style.top = POSITION({ unit: rowHeight, offset: position.row, gutter: gutter });
          style.height = DIMENSION({ unit: rowHeight, span: spans.row, gutter: gutter });
          break;

        case 'ratio':
          // Percent of the available vertical space that one row takes up. Here, rowHeight holds
          // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
          var vShare = hShare / rowHeight;

          // Base veritcal size of a row.
          var vUnit = UNIT({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

          // padidngTop and marginTop are used to maintain the given aspect ratio, as
          // a percentage-based value for these properties is applied to the *width* of the
          // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
          style.paddingTop = DIMENSION({ unit: vUnit, span: spans.row, gutter: gutter});
          style.marginTop = POSITION({ unit: vUnit, offset: position.row, gutter: gutter });
          break;

        case 'fit':
          // Fraction of the gutter size that each column takes up.
          var vGutterShare = (rowCount - 1) / rowCount;

          // Percent of the available vertical space that one row takes up.
          vShare = (1 / rowCount) * 100;

          // Base vertical size of a row.
          vUnit = UNIT({share: vShare, gutterShare: vGutterShare, gutter: gutter});

          style.top = POSITION({unit: vUnit, offset: position.row, gutter: gutter});
          style.height = DIMENSION({unit: vUnit, span: spans.row, gutter: gutter});
          break;
      }

      return style;
    }

    function getGridStyle(colCount, rowCount, gutter, rowMode, rowHeight) {
      var style = {};

      switch (rowMode) {
        case 'fixed':
          style.height = DIMENSION({ unit: rowHeight, span: rowCount, gutter: gutter });
          style.paddingBottom = '';
          break;

        case 'ratio':
          // rowHeight is width / height
          var hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount,
              hShare = (1 / colCount) * 100,
              vShare = hShare * (1 / rowHeight),
              vUnit = UNIT({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

          style.height = '';
          style.paddingBottom = DIMENSION({ unit: vUnit, span: rowCount, gutter: gutter});
          break;

        case 'fit':
          // noop, as the height is user set
          break;
      }

      return style;
    }

    function getTileElements() {
      return [].filter.call(element.children(), function(ele) {
        return ele.tagName == 'MD-GRID-TILE' && !ele.$$mdDestroyed;
      });
    }

    /**
     * Gets an array of objects containing the rowspan and colspan for each tile.
     * @returns {Array<{row: number, col: number}>}
     */
    function getTileSpans(tileElements) {
      return [].map.call(tileElements, function(ele) {
        var ctrl = angular.element(ele).controller('mdGridTile');
        return {
          row: parseInt(
              $mdMedia.getResponsiveAttribute(ctrl.$attrs, 'md-rowspan'), 10) || 1,
          col: parseInt(
              $mdMedia.getResponsiveAttribute(ctrl.$attrs, 'md-colspan'), 10) || 1
        };
      });
    }

    function getColumnCount() {
      var colCount = parseInt($mdMedia.getResponsiveAttribute(attrs, 'md-cols'), 10);
      if (isNaN(colCount)) {
        throw 'md-grid-list: md-cols attribute was not found, or contained a non-numeric value';
      }
      return colCount;
    }

    function getGutter() {
      return applyDefaultUnit($mdMedia.getResponsiveAttribute(attrs, 'md-gutter') || 1);
    }

    function getRowHeight() {
      var rowHeight = $mdMedia.getResponsiveAttribute(attrs, 'md-row-height');
      if (!rowHeight) {
        throw 'md-grid-list: md-row-height attribute was not found';
      }

      switch (getRowMode()) {
        case 'fixed':
          return applyDefaultUnit(rowHeight);
        case 'ratio':
          var whRatio = rowHeight.split(':');
          return parseFloat(whRatio[0]) / parseFloat(whRatio[1]);
        case 'fit':
          return 0; // N/A
      }
    }

    function getRowMode() {
      var rowHeight = $mdMedia.getResponsiveAttribute(attrs, 'md-row-height');
      if (!rowHeight) {
        throw 'md-grid-list: md-row-height attribute was not found';
      }

      if (rowHeight == 'fit') {
        return 'fit';
      } else if (rowHeight.indexOf(':') !== -1) {
        return 'ratio';
      } else {
        return 'fixed';
      }
    }

    function applyDefaultUnit(val) {
      return /\D$/.test(val) ? val : val + 'px';
    }
  }
}

/* @ngInject */
function GridListController($mdUtil) {
  this.layoutInvalidated = false;
  this.tilesInvalidated = false;
  this.$timeout_ = $mdUtil.nextTick;
  this.layoutDelegate = angular.noop;
}

GridListController.prototype = {
  invalidateTiles: function() {
    this.tilesInvalidated = true;
    this.invalidateLayout();
  },

  invalidateLayout: function() {
    if (this.layoutInvalidated) {
      return;
    }
    this.layoutInvalidated = true;
    this.$timeout_(angular.bind(this, this.layout));
  },

  layout: function() {
    try {
      this.layoutDelegate(this.tilesInvalidated);
    } finally {
      this.layoutInvalidated = false;
      this.tilesInvalidated = false;
    }
  }
};


/* @ngInject */
function GridLayoutFactory($mdUtil) {
  var defaultAnimator = GridTileAnimator;

  /**
   * Set the reflow animator callback
   */
  GridLayout.animateWith = function(customAnimator) {
    defaultAnimator = !angular.isFunction(customAnimator) ? GridTileAnimator : customAnimator;
  };

  return GridLayout;

  /**
   * Publish layout function
   */
  function GridLayout(colCount, tileSpans) {
      var self, layoutInfo, gridStyles, layoutTime, mapTime, reflowTime;

      layoutTime = $mdUtil.time(function() {
        layoutInfo = calculateGridFor(colCount, tileSpans);
      });

      return self = {

        /**
         * An array of objects describing each tile's position in the grid.
         */
        layoutInfo: function() {
          return layoutInfo;
        },

        /**
         * Maps grid positioning to an element and a set of styles using the
         * provided updateFn.
         */
        map: function(updateFn) {
          mapTime = $mdUtil.time(function() {
            var info = self.layoutInfo();
            gridStyles = updateFn(info.positioning, info.rowCount);
          });
          return self;
        },

        /**
         * Default animator simply sets the element.css( <styles> ). An alternate
         * animator can be provided as an argument. The function has the following
         * signature:
         *
         *    function({grid: {element: JQLite, style: Object}, tiles: Array<{element: JQLite, style: Object}>)
         */
        reflow: function(animatorFn) {
          reflowTime = $mdUtil.time(function() {
            var animator = animatorFn || defaultAnimator;
            animator(gridStyles.grid, gridStyles.tiles);
          });
          return self;
        },

        /**
         * Timing for the most recent layout run.
         */
        performance: function() {
          return {
            tileCount: tileSpans.length,
            layoutTime: layoutTime,
            mapTime: mapTime,
            reflowTime: reflowTime,
            totalTime: layoutTime + mapTime + reflowTime
          };
        }
      };
    }

  /**
   * Default Gridlist animator simple sets the css for each element;
   * NOTE: any transitions effects must be manually set in the CSS.
   * e.g.
   *
   *  md-grid-tile {
   *    transition: all 700ms ease-out 50ms;
   *  }
   *
   */
  function GridTileAnimator(grid, tiles) {
    grid.element.css(grid.style);
    tiles.forEach(function(t) {
      t.element.css(t.style);
    });
  }

  /**
   * Calculates the positions of tiles.
   *
   * The algorithm works as follows:
   *    An Array<Number> with length colCount (spaceTracker) keeps track of
   *    available tiling positions, where elements of value 0 represents an
   *    empty position. Space for a tile is reserved by finding a sequence of
   *    0s with length <= than the tile's colspan. When such a space has been
   *    found, the occupied tile positions are incremented by the tile's
   *    rowspan value, as these positions have become unavailable for that
   *    many rows.
   *
   *    If the end of a row has been reached without finding space for the
   *    tile, spaceTracker's elements are each decremented by 1 to a minimum
   *    of 0. Rows are searched in this fashion until space is found.
   */
  function calculateGridFor(colCount, tileSpans) {
    var curCol = 0,
        curRow = 0,
        spaceTracker = newSpaceTracker();

    return {
      positioning: tileSpans.map(function(spans, i) {
        return {
          spans: spans,
          position: reserveSpace(spans, i)
        };
      }),
      rowCount: curRow + Math.max.apply(Math, spaceTracker)
    };

    function reserveSpace(spans, i) {
      if (spans.col > colCount) {
        throw 'md-grid-list: Tile at position ' + i + ' has a colspan ' +
            '(' + spans.col + ') that exceeds the column count ' +
            '(' + colCount + ')';
      }

      var start = 0,
          end = 0;

      // TODO(shyndman): This loop isn't strictly necessary if you can
      // determine the minimum number of rows before a space opens up. To do
      // this, recognize that you've iterated across an entire row looking for
      // space, and if so fast-forward by the minimum rowSpan count. Repeat
      // until the required space opens up.
      while (end - start < spans.col) {
        if (curCol >= colCount) {
          nextRow();
          continue;
        }

        start = spaceTracker.indexOf(0, curCol);
        if (start === -1 || (end = findEnd(start + 1)) === -1) {
          start = end = 0;
          nextRow();
          continue;
        }

        curCol = end + 1;
      }

      adjustRow(start, spans.col, spans.row);
      curCol = start + spans.col;

      return {
        col: start,
        row: curRow
      };
    }

    function nextRow() {
      curCol = 0;
      curRow++;
      adjustRow(0, colCount, -1); // Decrement row spans by one
    }

    function adjustRow(from, cols, by) {
      for (var i = from; i < from + cols; i++) {
        spaceTracker[i] = Math.max(spaceTracker[i] + by, 0);
      }
    }

    function findEnd(start) {
      var i;
      for (i = start; i < spaceTracker.length; i++) {
        if (spaceTracker[i] !== 0) {
          return i;
        }
      }

      if (i === spaceTracker.length) {
        return i;
      }
    }

    function newSpaceTracker() {
      var tracker = [];
      for (var i = 0; i < colCount; i++) {
        tracker.push(0);
      }
      return tracker;
    }
  }
}

/**
 * @ngdoc directive
 * @name mdGridTile
 * @module material.components.gridList
 * @restrict E
 * @description
 * Tiles contain the content of an `md-grid-list`. They span one or more grid
 * cells vertically or horizontally, and use `md-grid-tile-{footer,header}` to
 * display secondary content.
 *
 * ### Responsive Attributes
 *
 * The `md-grid-tile` directive supports "responsive" attributes, which allow
 * different `md-rowspan` and `md-colspan` values depending on the currently
 * matching media query.
 *
 * In order to set a responsive attribute, first define the fallback value with
 * the standard attribute name, then add additional attributes with the
 * following convention: `{base-attribute-name}-{media-query-name}="{value}"`
 * (ie. `md-colspan-sm="4"`)
 *
 * @param {number=} md-colspan The number of columns to span (default 1). Cannot
 *    exceed the number of columns in the grid. Supports interpolation.
 * @param {number=} md-rowspan The number of rows to span (default 1). Supports
 *     interpolation.
 *
 * @usage
 * With header:
 * <hljs lang="html">
 * <md-grid-tile>
 *   <md-grid-tile-header>
 *     <h3>This is a header</h3>
 *   </md-grid-tile-header>
 * </md-grid-tile>
 * </hljs>
 *
 * With footer:
 * <hljs lang="html">
 * <md-grid-tile>
 *   <md-grid-tile-footer>
 *     <h3>This is a footer</h3>
 *   </md-grid-tile-footer>
 * </md-grid-tile>
 * </hljs>
 *
 * Spanning multiple rows/columns:
 * <hljs lang="html">
 * <md-grid-tile md-colspan="2" md-rowspan="3">
 * </md-grid-tile>
 * </hljs>
 *
 * Responsive attributes:
 * <hljs lang="html">
 * <md-grid-tile md-colspan="1" md-colspan-sm="3" md-colspan-md="5">
 * </md-grid-tile>
 * </hljs>
 */
function GridTileDirective($mdMedia) {
  return {
    restrict: 'E',
    require: '^mdGridList',
    template: '<figure ng-transclude></figure>',
    transclude: true,
    scope: {},
    // Simple controller that exposes attributes to the grid directive
    controller: ["$attrs", function($attrs) {
      this.$attrs = $attrs;
    }],
    link: postLink
  };

  function postLink(scope, element, attrs, gridCtrl) {
    // Apply semantics
    element.attr('role', 'listitem');

    // If our colspan or rowspan changes, trigger a layout
    var unwatchAttrs = $mdMedia.watchResponsiveAttributes(['md-colspan', 'md-rowspan'],
        attrs, angular.bind(gridCtrl, gridCtrl.invalidateLayout));

    // Tile registration/deregistration
    gridCtrl.invalidateTiles();
    scope.$on('$destroy', function() {
      // Mark the tile as destroyed so it is no longer considered in layout,
      // even if the DOM element sticks around (like during a leave animation)
      element[0].$$mdDestroyed = true;
      unwatchAttrs();
      gridCtrl.invalidateLayout();
    });

    if (angular.isDefined(scope.$parent.$index)) {
      scope.$watch(function() { return scope.$parent.$index; },
        function indexChanged(newIdx, oldIdx) {
          if (newIdx === oldIdx) {
            return;
          }
          gridCtrl.invalidateTiles();
        });
    }
  }
}


function GridTileCaptionDirective() {
  return {
    template: '<figcaption ng-transclude></figcaption>',
    transclude: true
  };
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.icon
 * @description
 * Icon
 */
angular.module('material.components.icon', ['material.core']);

})();
(function(){
"use strict";

angular
  .module('material.components.icon')
  .directive('mdIcon', ['$mdIcon', '$mdTheming', '$mdAria', '$sce', mdIconDirective]);

/**
 * @ngdoc directive
 * @name mdIcon
 * @module material.components.icon
 *
 * @restrict E
 *
 * @description
 * The `md-icon` directive makes it easier to use vector-based icons in your app (as opposed to
 * raster-based icons types like PNG). The directive supports both icon fonts and SVG icons.
 *
 * Icons should be considered view-only elements that should not be used directly as buttons; instead nest a `<md-icon>`
 * inside a `md-button` to add hover and click features.
 *
 * ### Icon fonts
 * Icon fonts are a technique in which you use a font where the glyphs in the font are
 * your icons instead of text. Benefits include a straightforward way to bundle everything into a
 * single HTTP request, simple scaling, easy color changing, and more.
 *
 * `md-icon` lets you consume an icon font by letting you reference specific icons in that font
 * by name rather than character code.
 *
 * When using font-icons, developers must follow three (3) simple steps:
 *
 * <ol>
 * <li>Load the font library. e.g.<br/>
 *    `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
 * </li>
 * <li>
 *   Use either (a) font-icon class names or (b) a fontset and a font ligature to render the font glyph by
 *   using its textual name _or_ numerical character reference. Note that `material-icons` is the default fontset when
 *   none is specified.
 * </li>
 * <li> Use any of the following templates: <br/>
 *   <ul>
 *     <li>`<md-icon md-font-icon="classname"></md-icon>`</li>
 *     <li>`<md-icon md-font-set="font library classname or alias">textual_name</md-icon>`</li>
 *     <li>`<md-icon> numerical_character_reference </md-icon>`</li>
 *     <li>`<md-icon ng_bind="'textual_name'"></md-icon>`</li>
 *     <li>`<md-icon ng-bind="scopeVariable"></md-icon>`</li>
 *   </ul>
 * </li>
 * </ol>
 *
 * Full details for these steps can be found in the
 * <a href="http://google.github.io/material-design-icons/#icon-font-for-the-web" target="_blank">
 * Material Design Icon font for the web docs</a>.
 *
 * You can browse and search the Material Design icon style <code>.material-icons</code>
 * in the <a href="https://material.io/tools/icons/" target="_blank">Material Design Icons tool</a>.
 *
 * ### SVG
 * For SVGs, the problem with using `<img>` or a CSS `background-image` is that you can't take
 * advantage of some SVG features, such as styling specific parts of the icon with CSS or SVG
 * animation.
 *
 * `md-icon` makes it easier to use SVG icons by *inlining* the SVG into an `<svg>` element in the
 * document. The most straightforward way of referencing an SVG icon is via URL, just like a
 * traditional `<img>`. `$mdIconProvider`, as a convenience, lets you _name_ an icon so you can
 * reference it by name instead of URL throughout your templates.
 *
 * Additionally, you may not want to make separate HTTP requests for every icon, so you can bundle
 * your SVG icons together and pre-load them with `$mdIconProvider` as an icon set. An icon set can
 * also be given a name, which acts as a namespace for individual icons, so you can reference them
 * like `"social:cake"`.
 *
 * When using SVGs, both external SVGs (via URLs) or sets of SVGs (from icon sets) can be
 * easily loaded and used.
 *
 * ### Localization
 *
 * Because an `md-icon` element's text content is not intended to be translated, it is recommended
 * to declare the text content for an `md-icon` element in its start tag. Instead of using the HTML
 * text content, consider using `ng-bind` with a scope variable or literal string.
 *
 * Examples:
 *
 * <ul>
 *   <li>`<md-icon ng-bind="myIconVariable"></md-icon>`</li>
 *   <li>`<md-icon ng-bind="'menu'"></md-icon>`
 * </ul>
 *
 * <h2 id="material_design_icons">Material Design Icons tool</h2>
 * Using the Material Design Icons tool, developers can easily and quickly search for a specific
 * open source Material Design icon. The search is in the top left. Below search, you can select
 * from the new icon themes or filter by icon category.
 *
 * <a href="https://material.io/tools/icons/" target="_blank" style="border-bottom:none;">
 * <img src="https://user-images.githubusercontent.com/3506071/41942584-ef0695d0-796d-11e8-9436-44f25023a111.png"
 *      aria-label="Material Design Icons tool" style="max-width:95%">
 * </a>
 *
 * <div class="md-caption" style="text-align: center; margin-bottom: 24px">
 *  Click on the image above to open the
 *  <a href="https://material.io/tools/icons/" target="_blank">Material Design Icons tool</a>.
 * </div>
 *
 * Click on any icon, then click on the "Selected Icon" chevron to see the slide-up
 * information panel with details regarding a SVG download and information on the font-icon's
 * textual name. This panel also allows you to select a black on transparent or white on transparent
 * icon and to change the icon size. These settings only affect the downloaded icons.
 *
 * @param {string} md-font-icon String name of CSS icon associated with the font-face will be used
 * to render the icon. Requires the fonts and the named CSS styles to be preloaded.
 * @param {string} md-font-set CSS style name associated with the font library; which will be assigned as
 * the class for the font-icon ligature. This value may also be an alias that is used to lookup the classname;
 * internally use `$mdIconProvider.fontSet(<alias>)` to determine the style name.
 * @param {string} md-svg-src String URL (or expression) used to load, cache, and display an
 *     external SVG.
 * @param {string} md-svg-icon md-svg-icon String name used for lookup of the icon from the internal cache;
 *     interpolated strings or expressions may also be used. Specific set names can be used with
 *     the syntax `<set name>:<icon name>`.<br/><br/>
 * To use icon sets, developers are required to pre-register the sets using the `$mdIconProvider` service.
 * @param {string=} aria-label Labels icon for accessibility. If an empty string is provided, icon
 * will be hidden from accessibility layer with `aria-hidden="true"`. If there's no aria-label on the icon
 * nor a label on the parent element, a warning will be logged to the console.
 * @param {string=} alt Labels icon for accessibility. If an empty string is provided, icon
 * will be hidden from accessibility layer with `aria-hidden="true"`. If there's no alt on the icon
 * nor a label on the parent element, a warning will be logged to the console.
 *
 * @usage
 * When using SVGs:
 * <hljs lang="html">
 *
 *<!-- Icon ID; may contain optional icon set prefix.
 *     Icons must be registered using $mdIconProvider. -->
 *<md-icon md-svg-icon="social:android"    aria-label="android " ></md-icon>
 *
 *<!-- Icon urls; may be preloaded in templateCache -->
 *<md-icon md-svg-src="/android.svg"       aria-label="android " ></md-icon>
 *<md-icon md-svg-src="{{ getAndroid() }}" aria-label="android " ></md-icon>
 *
 * </hljs>
 *
 * Use the <code>$mdIconProvider</code> to configure your application with
 * SVG icon sets.
 *
 * <hljs lang="js">
 * angular.module('appSvgIconSets', ['ngMaterial'])
 *   .controller('DemoCtrl', function($scope) {})
 *   .config(function($mdIconProvider) {
 *     $mdIconProvider
 *       .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
 *       .defaultIconSet('img/icons/sets/core-icons.svg', 24);
 *    });
 * </hljs>
 *
 *
 * When using Font Icons with classnames:
 * <hljs lang="html">
 *
 * <md-icon md-font-icon="android" aria-label="android" ></md-icon>
 * <md-icon class="icon_home" aria-label="Home"></md-icon>
 *
 * </hljs>
 *
 * When using Material Font Icons with ligatures:
 * <hljs lang="html">
 *  <!--
 *  For Material Design Icons
 *  The class '.material-icons' is auto-added if a style has NOT been specified
 *  since `material-icons` is the default fontset. So your markup:
 *  -->
 *  <md-icon> face </md-icon>
 *  <!-- becomes this at runtime: -->
 *  <md-icon md-font-set="material-icons"> face </md-icon>
 *  <!-- If the fontset does not support ligature names, then we need to use the ligature unicode.-->
 *  <md-icon> &#xE87C; </md-icon>
 *  <!-- The class '.material-icons' must be manually added if other styles are also specified-->
 *  <md-icon class="material-icons md-light md-48"> face </md-icon>
 * </hljs>
 *
 * When using other Font-Icon libraries:
 *
 * <hljs lang="js">
 *  // Specify a font-icon style alias
 *  angular.config(function($mdIconProvider) {
 *    $mdIconProvider.fontSet('md', 'material-icons');
 *  });
 * </hljs>
 *
 * <hljs lang="html">
 *  <md-icon md-font-set="md">favorite</md-icon>
 * </hljs>
 *
 */
function mdIconDirective($mdIcon, $mdTheming, $mdAria, $sce) {

  return {
    restrict: 'E',
    link : postLink
  };


  /**
   * Directive postLink
   * Supports embedded SVGs, font-icons, & external SVGs
   */
  function postLink(scope, element, attr) {
    $mdTheming(element);
    var lastFontIcon = attr.mdFontIcon;
    var lastFontSet = $mdIcon.fontSet(attr.mdFontSet);

    prepareForFontIcon();

    attr.$observe('mdFontIcon', fontIconChanged);
    attr.$observe('mdFontSet', fontIconChanged);

    // Keep track of the content of the svg src so we can compare against it later to see if the
    // attribute is static (and thus safe).
    var originalSvgSrc = element[0].getAttribute(attr.$attr.mdSvgSrc);

    // If using a font-icon, then the textual name of the icon itself
    // provides the aria-label.

    var attrName = attr.$normalize(attr.$attr.mdSvgIcon || attr.$attr.mdSvgSrc || '');

    /* Provide a default accessibility role of img */
    if (!attr.role) {
      $mdAria.expect(element, 'role', 'img');
      /* manually update attr variable */
      attr.role = 'img';
    }

    /* Don't process ARIA if already valid */
    if (attr.role === "img" && !attr.ariaHidden && !$mdAria.hasAriaLabel(element)) {
      var iconName;
      if (attr.alt) {
        /* Use alt text by default if available */
        $mdAria.expect(element, 'aria-label', attr.alt);
      } else if ($mdAria.parentHasAriaLabel(element, 2)) {
        /* Parent has ARIA so we will assume it will describe the image */
        $mdAria.expect(element, 'aria-hidden', 'true');
      } else if (iconName = (attr.mdFontIcon || attr.mdSvgIcon || element.text())) {
        /* Use icon name as aria-label */
        $mdAria.expect(element, 'aria-label', iconName);
      } else {
        /* No label found */
        $mdAria.expect(element, 'aria-hidden', 'true');
      }
    }

    if (attrName) {
      // Use either pre-configured SVG or URL source, respectively.
      attr.$observe(attrName, function(attrVal) {
        element.empty();
        if (attrVal) {
          $mdIcon(attrVal)
            .then(function(svg) {
            element.empty();
            element.append(svg);
          });
        }
      });
    }

    function prepareForFontIcon() {
      if (!attr.mdSvgIcon && !attr.mdSvgSrc) {
        if (attr.mdFontIcon) {
          element.addClass('md-font ' + attr.mdFontIcon);
        }

        element.addClass(lastFontSet);
      }
    }

    function fontIconChanged() {
      if (!attr.mdSvgIcon && !attr.mdSvgSrc) {
        if (attr.mdFontIcon) {
          element.removeClass(lastFontIcon);
          element.addClass(attr.mdFontIcon);

          lastFontIcon = attr.mdFontIcon;
        }

        var fontSet = $mdIcon.fontSet(attr.mdFontSet);

        if (lastFontSet !== fontSet) {
          element.removeClass(lastFontSet);
          element.addClass(fontSet);

          lastFontSet = fontSet;
        }
      }
    }
  }
}

})();
(function(){
"use strict";

  
MdIconService.$inject = ["config", "$templateRequest", "$q", "$log", "$mdUtil", "$sce"];angular
    .module('material.components.icon')
    .constant('$$mdSvgRegistry', {
        'mdTabsArrow':   'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4=',
        'mdClose':       'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xOSA2LjQxbC0xLjQxLTEuNDEtNS41OSA1LjU5LTUuNTktNS41OS0xLjQxIDEuNDEgNS41OSA1LjU5LTUuNTkgNS41OSAxLjQxIDEuNDEgNS41OS01LjU5IDUuNTkgNS41OSAxLjQxLTEuNDEtNS41OS01LjU5eiIvPjwvZz48L3N2Zz4=',
        'mdCancel':      'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xMiAyYy01LjUzIDAtMTAgNC40Ny0xMCAxMHM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTAtNC40Ny0xMC0xMC0xMHptNSAxMy41OWwtMS40MSAxLjQxLTMuNTktMy41OS0zLjU5IDMuNTktMS40MS0xLjQxIDMuNTktMy41OS0zLjU5LTMuNTkgMS40MS0xLjQxIDMuNTkgMy41OSAzLjU5LTMuNTkgMS40MSAxLjQxLTMuNTkgMy41OSAzLjU5IDMuNTl6Ii8+PC9nPjwvc3ZnPg==',
        'mdMenu':        'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0zLDZIMjFWOEgzVjZNMywxMUgyMVYxM0gzVjExTTMsMTZIMjFWMThIM1YxNloiIC8+PC9zdmc+',
        'mdToggleArrow': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGQ9Ik0yNCAxNmwtMTIgMTIgMi44MyAyLjgzIDkuMTctOS4xNyA5LjE3IDkuMTcgMi44My0yLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==',
        'mdCalendar':    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg==',
        'mdChecked':     'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXoiLz48L2c+PC9zdmc+'
    })
    .provider('$mdIcon', MdIconProvider);

/**
 * @ngdoc service
 * @name $mdIconProvider
 * @module material.components.icon
 *
 * @description
 * `$mdIconProvider` is used only to register icon IDs with URLs. These configuration features allow
 * icons and icon sets to be pre-registered and associated with source URLs **before** the `<md-icon />`
 * directives are compiled.
 *
 * If using font-icons, the developer is responsible for loading the fonts.
 *
 * If using SVGs, loading of the actual svg files are deferred to on-demand requests and are loaded
 * internally by the `$mdIcon` service using the `$templateRequest` service. When an SVG is
 * requested by name/ID, the `$mdIcon` service searches its registry for the associated source URL;
 * that URL is used to on-demand load and parse the SVG dynamically.
 *
 * The `$templateRequest` service expects the icons source to be loaded over trusted URLs.<br/>
 * This means, when loading icons from an external URL, you have to trust the URL in the `$sceDelegateProvider`.
 *
 * <hljs lang="js">
 *   app.config(function($sceDelegateProvider) {
 *     $sceDelegateProvider.resourceUrlWhitelist([
 *       // Adding 'self' to the whitelist, will allow requests from the current origin.
 *       'self',
 *       // Using double asterisks here, will allow all URLs to load.
 *       // We recommend to only specify the given domain you want to allow.
 *       '**'
 *     ]);
 *   });
 * </hljs>
 *
 * Read more about the [$sceDelegateProvider](https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider).
 *
 * **Notice:** Most font-icons libraries do not support ligatures (for example `fontawesome`).<br/>
 *  In such cases you are not able to use the icon's ligature name - Like so:
 *
 *  <hljs lang="html">
 *    <md-icon md-font-set="fa">fa-bell</md-icon>
 *  </hljs>
 *
 * You should instead use the given unicode, instead of the ligature name.
 *
 * <p ng-hide="true"> ##// Notice we can't use a hljs element here, because the characters will be escaped.</p>
 *  ```html
 *    <md-icon md-font-set="fa">&#xf0f3</md-icon>
 *  ```
 *
 * All unicode ligatures are prefixed with the `&#x` string.
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultFontSet( 'fa' )                   // This sets our default fontset className.
    *          .defaultIconSet('my/app/icons.svg')       // Register a default set of SVG icons
    *          .iconSet('social', 'my/app/social.svg')   // Register a named icon set of SVGs
    *          .icon('android', 'my/app/android.svg')    // Register a specific icon (by name)
    *          .icon('work:chair', 'my/app/chair.svg');  // Register icon in a specific set
    *   });
 * </hljs>
 *
 * SVG icons and icon sets can be easily pre-loaded and cached using either (a) a build process or (b) a runtime
 * **startup** process (shown below):
 *
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Register a default set of SVG icon definitions
    *     $mdIconProvider.defaultIconSet('my/app/icons.svg')
    *
    *   })
 *   .run(function($templateRequest){
    *
    *     // Pre-fetch icons sources by URL and cache in the $templateCache...
    *     // subsequent $templateRequest calls will look there first.
    *
    *     var urls = [ 'imy/app/icons.svg', 'img/icons/android.svg'];
    *
    *     angular.forEach(urls, function(url) {
    *       $templateRequest(url);
    *     });
    *
    *   });
 *
 * </hljs>
 *
 * > <b>Note:</b> The loaded SVG data is subsequently cached internally for future requests.
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#icon
 *
 * @description
 * Register a source URL for a specific icon name; the name may include optional 'icon set' name prefix.
 * These icons  will later be retrieved from the cache using `$mdIcon( <icon name> )`
 *
 * @param {string} id Icon name/id used to register the icon
 * @param {string} url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param {number=} viewBoxSize Sets the width and height the icon's viewBox.
 * It is ignored for icons with an existing viewBox. Default size is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .icon('android', 'my/app/android.svg')    // Register a specific icon (by name)
    *          .icon('work:chair', 'my/app/chair.svg');  // Register icon in a specific set
    *   });
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#iconSet
 *
 * @description
 * Register a source URL for a 'named' set of icons; group of SVG definitions where each definition
 * has an icon id. Individual icons can be subsequently retrieved from this cached set using
 * `$mdIcon(<icon set name>:<icon name>)`
 *
 * @param {string} id Icon name/id used to register the iconset
 * @param {string} url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param {number=} viewBoxSize Sets the width and height of the viewBox of all icons in the set.
 * It is ignored for icons with an existing viewBox. All icons in the icon set should be the same size.
 * Default value is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .iconSet('social', 'my/app/social.svg')   // Register a named icon set
    *   });
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#defaultIconSet
 *
 * @description
 * Register a source URL for the default 'named' set of icons. Unless explicitly registered,
 * subsequent lookups of icons will failover to search this 'default' icon set.
 * Icon can be retrieved from this cached, default set using `$mdIcon(<name>)`
 *
 * @param {string} url specifies the external location for the data file. Used internally by
 * `$templateRequest` to load the data or as part of the lookup in `$templateCache` if pre-loading
 * was configured.
 * @param {number=} viewBoxSize Sets the width and height of the viewBox of all icons in the set.
 * It is ignored for icons with an existing viewBox. All icons in the icon set should be the same size.
 * Default value is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultIconSet( 'my/app/social.svg' )   // Register a default icon set
    *   });
 * </hljs>
 *
 */
/**
 * @ngdoc method
 * @name $mdIconProvider#defaultFontSet
 *
 * @description
 * When using Font-Icons, AngularJS Material assumes the the Material Design icons will be used and automatically
 * configures the default font-set == 'material-icons'. Note that the font-set references the font-icon library
 * class style that should be applied to the `<md-icon>`.
 *
 * Configuring the default means that the attributes
 * `md-font-set="material-icons"` or `class="material-icons"` do not need to be explicitly declared on the
 * `<md-icon>` markup. For example:
 *
 *  `<md-icon> face </md-icon>`
 *  will render as
 *  `<span class="material-icons"> face </span>`, and
 *
 *  `<md-icon md-font-set="fa"> face </md-icon>`
 *  will render as
 *  `<span class="fa"> face </span>`
 *
 * @param {string} name of the font-library style that should be applied to the md-icon DOM element
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
   *     $mdIconProvider.defaultFontSet( 'fa' );
   *   });
 * </hljs>
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#fontSet
 *
 * @description
 * When using a font set for `<md-icon>` you must specify the correct font classname in the `md-font-set`
 * attribute. If the fonset className is really long, your markup may become cluttered... an easy
 * solution is to define an `alias` for your fontset:
 *
 * @param {string} alias of the specified fontset.
 * @param {string} className of the fontset.
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
   *     // In this case, we set an alias for the `material-icons` fontset.
   *     $mdIconProvider.fontSet('md', 'material-icons');
   *   });
 * </hljs>
 *
 */

/**
 * @ngdoc method
 * @name $mdIconProvider#defaultViewBoxSize
 *
 * @description
 * While `<md-icon />` markup can also be style with sizing CSS, this method configures
 * the default width **and** height used for all icons; unless overridden by specific CSS.
 * The default sizing is (24px, 24px).
 * @param {number=} viewBoxSize Sets the width and height of the viewBox for an icon or an icon set.
 * All icons in a set should be the same size. The default value is 24.
 *
 * @returns {obj} an `$mdIconProvider` reference; used to support method call chains for the API
 *
 * @usage
 * <hljs lang="js">
 *   app.config(function($mdIconProvider) {
    *
    *     // Configure URLs for icons specified by [set:]id.
    *
    *     $mdIconProvider
    *          .defaultViewBoxSize(36)   // Register a default icon size (width == height)
    *   });
 * </hljs>
 *
 */

var config = {
  defaultViewBoxSize: 24,
  defaultFontSet: 'material-icons',
  fontSets: []
};

function MdIconProvider() {
}

MdIconProvider.prototype = {
  icon: function(id, url, viewBoxSize) {
    if (id.indexOf(':') == -1) id = '$default:' + id;

    config[id] = new ConfigurationItem(url, viewBoxSize);
    return this;
  },

  iconSet: function(id, url, viewBoxSize) {
    config[id] = new ConfigurationItem(url, viewBoxSize);
    return this;
  },

  defaultIconSet: function(url, viewBoxSize) {
    var setName = '$default';

    if (!config[setName]) {
      config[setName] = new ConfigurationItem(url, viewBoxSize);
    }

    config[setName].viewBoxSize = viewBoxSize || config.defaultViewBoxSize;

    return this;
  },

  defaultViewBoxSize: function(viewBoxSize) {
    config.defaultViewBoxSize = viewBoxSize;
    return this;
  },

  /**
   * Register an alias name associated with a font-icon library style ;
   */
  fontSet: function fontSet(alias, className) {
    config.fontSets.push({
      alias: alias,
      fontSet: className || alias
    });
    return this;
  },

  /**
   * Specify a default style name associated with a font-icon library
   * fallback to Material Icons.
   *
   */
  defaultFontSet: function defaultFontSet(className) {
    config.defaultFontSet = !className ? '' : className;
    return this;
  },

  defaultIconSize: function defaultIconSize(iconSize) {
    config.defaultIconSize = iconSize;
    return this;
  },

  $get: ['$templateRequest', '$q', '$log', '$mdUtil', '$sce', function($templateRequest, $q, $log, $mdUtil, $sce) {
    return MdIconService(config, $templateRequest, $q, $log, $mdUtil, $sce);
  }]
};

  /**
   * Configuration item stored in the Icon registry; used for lookups
   * to load if not already cached in the `loaded` cache
   * @param {string} url
   * @param {=number} viewBoxSize
   * @constructor
   */
  function ConfigurationItem(url, viewBoxSize) {
    this.url = url;
    this.viewBoxSize = viewBoxSize || config.defaultViewBoxSize;
  }

/**
 * @ngdoc service
 * @name $mdIcon
 * @module material.components.icon
 *
 * @description
 * The `$mdIcon` service is a function used to lookup SVG icons.
 *
 * @param {string} id Query value for a unique Id or URL. If the argument is a URL, then the service will retrieve the icon element
 * from its internal cache or load the icon and cache it first. If the value is not a URL-type string, then an ID lookup is
 * performed. The Id may be a unique icon ID or may include an iconSet ID prefix.
 *
 * For the **id** query to work properly, this means that all id-to-URL mappings must have been previously configured
 * using the `$mdIconProvider`.
 *
 * @returns {angular.$q.Promise} A promise that gets resolved to a clone of the initial SVG DOM element; which was
 * created from the SVG markup in the SVG data file. If an error occurs (e.g. the icon cannot be found) the promise
 * will get rejected.
 *
 * @usage
 * <hljs lang="js">
 * function SomeDirective($mdIcon) {
  *
  *   // See if the icon has already been loaded, if not
  *   // then lookup the icon from the registry cache, load and cache
  *   // it for future requests.
  *   // NOTE: ID queries require configuration with $mdIconProvider
  *
  *   $mdIcon('android').then(function(iconEl)    { element.append(iconEl); });
  *   $mdIcon('work:chair').then(function(iconEl) { element.append(iconEl); });
  *
  *   // Load and cache the external SVG using a URL
  *
  *   $mdIcon('img/icons/android.svg').then(function(iconEl) {
  *     element.append(iconEl);
  *   });
  * };
 * </hljs>
 *
 * > <b>Note:</b> The `<md-icon>` directive internally uses the `$mdIcon` service to query, load,
 *   and instantiate SVG DOM elements.
 */

/* @ngInject */
function MdIconService(config, $templateRequest, $q, $log, $mdUtil, $sce) {
  var iconCache = {};
  var svgCache = {};
  var urlRegex = /[-\w@:%+.~#?&//=]{2,}\.[a-z]{2,4}\b(\/[-\w@:%+.~#?&//=]*)?/i;
  var dataUrlRegex = /^data:image\/svg\+xml[\s*;\w\-=]*?(base64)?,(.*)$/i;

  Icon.prototype = {clone: cloneSVG, prepare: prepareAndStyle};
  getIcon.fontSet = findRegisteredFontSet;

  // Publish service...
  return getIcon;

  /**
   * Actual $mdIcon service is essentially a lookup function
   * @param {*} id $sce trust wrapper over a URL string, URL, icon registry id, or icon set id
   * @returns {angular.$q.Promise}
   */
  function getIcon(id) {
    id = id || '';

    // If the "id" provided is not a string, the only other valid value is a $sce trust wrapper
    // over a URL string. If the value is not trusted, this will intentionally throw an error
    // because the user is attempted to use an unsafe URL, potentially opening themselves up
    // to an XSS attack.
    if (!angular.isString(id)) {
      id = $sce.getTrustedUrl(id);
    }

    // If already loaded and cached, use a clone of the cached icon.
    // Otherwise either load by URL, or lookup in the registry and then load by URL, and cache.

    if (iconCache[id]) {
      return $q.when(transformClone(iconCache[id]));
    }

    if (urlRegex.test(id) || dataUrlRegex.test(id)) {
      return loadByURL(id).then(cacheIcon(id));
    }

    if (id.indexOf(':') === -1) {
      id = '$default:' + id;
    }

    var load = config[id] ? loadByID : loadFromIconSet;
    return load(id)
      .then(cacheIcon(id));
  }

  /**
   * Lookup a registered fontSet style using its alias.
   * @param {string} alias used to lookup the alias in the array of fontSets
   * @returns {*} matching fontSet or the defaultFontSet if that alias does not match
   */
  function findRegisteredFontSet(alias) {
    var useDefault = angular.isUndefined(alias) || !(alias && alias.length);
    if (useDefault) {
      return config.defaultFontSet;
    }

    var result = alias;
    angular.forEach(config.fontSets, function(fontSet) {
      if (fontSet.alias === alias) {
        result = fontSet.fontSet || result;
      }
    });

    return result;
  }

  /**
   * @param {!Icon} cacheElement cached icon from the iconCache
   * @returns {Icon} cloned Icon element with unique ids
   */
  function transformClone(cacheElement) {
    var clone = cacheElement.clone();
    var newUid = $mdUtil.nextUid();
    var cacheSuffix, svgUrlQuerySelector, i, xlinkHrefValue;
    // These are SVG attributes that can reference element ids.
    var svgUrlAttributes = [
      'clip-path', 'color-profile', 'cursor', 'fill', 'filter', 'href', 'marker-start',
      'marker-mid', 'marker-end', 'mask', 'stroke', 'style', 'vector-effect'
    ];
    var isIeSvg = clone.innerHTML === undefined;

    // Verify that the newUid only contains a number and not some XSS content.
    if (!isFinite(Number(newUid))) {
      throw new Error('Unsafe and unexpected non-number result from $mdUtil.nextUid().');
    }
    cacheSuffix = '_cache' + newUid;

    // For each cached icon, we need to modify the id attributes and references.
    // This is needed because SVG ids are treated as normal DOM ids and should not be duplicated on
    // the page.
    if (clone.id) {
      clone.id += cacheSuffix;
    }

    // Do as much as possible with querySelectorAll as it provides much greater performance
    // than RegEx against serialized DOM.
    angular.forEach(clone.querySelectorAll('[id]'), function(descendantElem) {
      svgUrlQuerySelector = '';
      for (i = 0; i < svgUrlAttributes.length; i++) {
        svgUrlQuerySelector += '[' + svgUrlAttributes[i] + '="url(#' + descendantElem.id + ')"]';
        if (i + 1 < svgUrlAttributes.length) {
          svgUrlQuerySelector += ', ';
        }
      }
      // Append the cacheSuffix to references of the element's id within url(#id) calls.
      angular.forEach(clone.querySelectorAll(svgUrlQuerySelector), function(refItem) {
        updateSvgIdReferences(descendantElem, refItem, isIeSvg, newUid);
      });
      // Handle usages of url(#id) in the SVG's stylesheets
      angular.forEach(clone.querySelectorAll('style'), function(refItem) {
        updateSvgIdReferences(descendantElem, refItem, isIeSvg, newUid);
      });

      // Update ids referenced by the deprecated (in SVG v2) xlink:href XML attribute. The now
      // preferred href attribute is handled above. However, this non-standard XML namespaced
      // attribute cannot be handled in the same way. Explanation of this query selector here:
      // https://stackoverflow.com/q/23034283/633107.
      angular.forEach(clone.querySelectorAll('[*|href]:not([href])'), function(refItem) {
        xlinkHrefValue = refItem.getAttribute('xlink:href');
        if (xlinkHrefValue) {
          xlinkHrefValue = xlinkHrefValue.replace("#" + descendantElem.id, "#" + descendantElem.id + cacheSuffix);
          refItem.setAttribute('xlink:href', xlinkHrefValue);
        }
      });

      descendantElem.id += cacheSuffix;
    });

    return clone;
  }

  /**
   * @param {Element} referencedElement element w/ id that needs to be updated
   * @param {Element} referencingElement element that references the original id
   * @param {boolean} isIeSvg true if we're dealing with an SVG in IE11, false otherwise
   * @param {string} newUid the cache id to add as part of the cache suffix
   */
  function updateSvgIdReferences(referencedElement, referencingElement, isIeSvg, newUid) {
    var svgElement, cacheSuffix;

    // Verify that the newUid only contains a number and not some XSS content.
    if (!isFinite(Number(newUid))) {
      throw new Error('Unsafe and unexpected non-number result for newUid.');
    }
    cacheSuffix = '_cache' + newUid;

    // outerHTML of SVG elements is not supported by IE11
    if (isIeSvg) {
      svgElement = $mdUtil.getOuterHTML(referencingElement);
      svgElement = svgElement.replace("url(#" + referencedElement.id + ")",
        "url(#" + referencedElement.id + cacheSuffix + ")");
      referencingElement.textContent = angular.element(svgElement)[0].innerHTML;
    } else {
      // This use of outerHTML should be safe from XSS attack since we are only injecting the
      // cacheSuffix with content from $mdUtil.nextUid which we verify is a finite number above.
      referencingElement.outerHTML = referencingElement.outerHTML.replace(
        "url(#" + referencedElement.id + ")",
        "url(#" + referencedElement.id + cacheSuffix + ")");
    }
  }

  /**
   * Prepare and cache the loaded icon for the specified `id`.
   * @param {string} id icon cache id
   * @returns {function(*=): *}
   */
  function cacheIcon(id) {

    return function updateCache(icon) {
      iconCache[id] = isIcon(icon) ? icon : new Icon(icon, config[id]);

      return transformClone(iconCache[id]);
    };
  }

  /**
   * Lookup the configuration in the registry, if !registered throw an error
   * otherwise load the icon [on-demand] using the registered URL.
   * @param {string} id icon registry id
   * @returns {angular.$q.Promise}
   */
  function loadByID(id) {
    var iconConfig = config[id];
    return loadByURL(iconConfig.url).then(function(icon) {
      return new Icon(icon, iconConfig);
    });
  }

  /**
   * Loads the file as XML and uses querySelector( <id> ) to find the desired node...
   * @param {string} id icon id in icon set
   * @returns {angular.$q.Promise}
   */
  function loadFromIconSet(id) {
    var setName = id.substring(0, id.lastIndexOf(':')) || '$default';
    var iconSetConfig = config[setName];

    return !iconSetConfig ? announceIdNotFound(id) : loadByURL(iconSetConfig.url).then(extractFromSet);

    function extractFromSet(set) {
      var iconName = id.slice(id.lastIndexOf(':') + 1);
      var icon = set.querySelector('#' + iconName);
      return icon ? new Icon(icon, iconSetConfig) : announceIdNotFound(id);
    }

    function announceIdNotFound(id) {
      var msg = 'icon ' + id + ' not found';
      $log.warn(msg);

      return $q.reject(msg || id);
    }
  }

  /**
   * Load the icon by URL (may use the $templateCache).
   * Extract the data for later conversion to Icon
   * @param {string} url icon URL
   * @returns {angular.$q.Promise}
   */
  function loadByURL(url) {
    /* Load the icon from embedded data URL. */
    function loadByDataUrl(url) {
      var results = dataUrlRegex.exec(url);
      var isBase64 = /base64/i.test(url);
      var data = isBase64 ? window.atob(results[2]) : results[2];

      return $q.when(angular.element(data)[0]);
    }

    /* Load the icon by URL using HTTP. */
    function loadByHttpUrl(url) {
      return $q(function(resolve, reject) {
        // Catch HTTP or generic errors not related to incorrect icon IDs.
        var announceAndReject = function(err) {
            var msg = angular.isString(err) ? err : (err.message || err.data || err.statusText);
            $log.warn(msg);
            reject(err);
          },
          extractSvg = function(response) {
            if (!svgCache[url]) {
              svgCache[url] = angular.element('<div>').append(response)[0].querySelector('svg');
            }
            resolve(svgCache[url]);
          };

        $templateRequest(url, true).then(extractSvg, announceAndReject);
      });
    }

    return dataUrlRegex.test(url)
      ? loadByDataUrl(url)
      : loadByHttpUrl(url);
  }

  /**
   * Check target signature to see if it is an Icon instance.
   * @param {Icon|Element} target
   * @returns {boolean} true if the specified target is an Icon object, false otherwise.
   */
  function isIcon(target) {
    return angular.isDefined(target.element) && angular.isDefined(target.config);
  }

  /**
   * Define the Icon class
   * @param {Element} el
   * @param {=ConfigurationItem} config
   * @constructor
   */
  function Icon(el, config) {
    // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>.
    if (el && el.tagName.toLowerCase() === 'symbol') {
      var viewbox = el.getAttribute('viewBox');
      // // Check if innerHTML is supported as IE11 does not support innerHTML on SVG elements.
      if (el.innerHTML) {
        el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">')
          .html(el.innerHTML)[0];
      } else {
        el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">')
          .append($mdUtil.getInnerHTML(el))[0];
      }
      if (viewbox) el.setAttribute('viewBox', viewbox);
    }

    if (el && el.tagName.toLowerCase() !== 'svg') {
      el = angular.element(
        '<svg xmlns="http://www.w3.org/2000/svg">').append(el.cloneNode(true))[0];
    }

    // Inject the namespace if not available...
    if (!el.getAttribute('xmlns')) {
      el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    }

    this.element = el;
    this.config = config;
    this.prepare();
  }

  /**
   *  Prepare the DOM element that will be cached in the
   *  loaded iconCache store.
   */
  function prepareAndStyle() {
    var viewBoxSize = this.config ? this.config.viewBoxSize : config.defaultViewBoxSize;
    angular.forEach({
      'fit': '',
      'height': '100%',
      'width': '100%',
      'preserveAspectRatio': 'xMidYMid meet',
      'viewBox': this.element.getAttribute('viewBox') || ('0 0 ' + viewBoxSize + ' ' + viewBoxSize),
      'focusable': false // Disable IE11s default behavior to make SVGs focusable
    }, function(val, attr) {
      this.element.setAttribute(attr, val);
    }, this);
  }

  /**
   * Clone the Icon DOM element.
   */
  function cloneSVG() {
    // If the element or any of its children have a style attribute, then a CSP policy without
    // 'unsafe-inline' in the style-src directive, will result in a violation.
    return this.element.cloneNode(true);
  }

}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.input
 */
mdInputContainerDirective.$inject = ["$mdTheming", "$parse", "$$rAF"];
inputTextareaDirective.$inject = ["$mdUtil", "$window", "$mdAria", "$timeout", "$mdGesture"];
mdMaxlengthDirective.$inject = ["$animate", "$mdUtil"];
placeholderDirective.$inject = ["$compile"];
ngMessageDirective.$inject = ["$mdUtil"];
mdSelectOnFocusDirective.$inject = ["$document", "$timeout"];
mdInputInvalidMessagesAnimation.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil"];
ngMessagesAnimation.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil"];
ngMessageAnimation.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil", "$log"];
var inputModule = angular.module('material.components.input', [
    'material.core'
  ])
  .directive('mdInputContainer', mdInputContainerDirective)
  .directive('label', labelDirective)
  .directive('input', inputTextareaDirective)
  .directive('textarea', inputTextareaDirective)
  .directive('mdMaxlength', mdMaxlengthDirective)
  .directive('placeholder', placeholderDirective)
  .directive('ngMessages', ngMessagesDirective)
  .directive('ngMessage', ngMessageDirective)
  .directive('ngMessageExp', ngMessageDirective)
  .directive('mdSelectOnFocus', mdSelectOnFocusDirective)

  .animation('.md-input-invalid', mdInputInvalidMessagesAnimation)
  .animation('.md-input-messages-animation', ngMessagesAnimation)
  .animation('.md-input-message-animation', ngMessageAnimation);

// If we are running inside of tests; expose some extra services so that we can test them
if (window._mdMocksIncluded) {
  inputModule.service('$$mdInput', function() {
    return {
      // special accessor to internals... useful for testing
      messages: {
        getElement  : getMessagesElement
      }
    };
  })

  // Register a service for each animation so that we can easily inject them into unit tests
  .service('mdInputInvalidAnimation', mdInputInvalidMessagesAnimation)
  .service('mdInputMessagesAnimation', ngMessagesAnimation)
  .service('mdInputMessageAnimation', ngMessageAnimation);
}

/**
 * @ngdoc directive
 * @name mdInputContainer
 * @module material.components.input
 *
 * @restrict E
 *
 * @description
 * `<md-input-container>` is the parent of any input or textarea element. It can also optionally
 * wrap `<md-select>` elements so that they will be formatted for use in a form.
 *
 * Input and textarea elements will not behave properly unless the md-input-container parent is
 * provided.
 *
 * A single `<md-input-container>` should contain only one `<input>` or `<md-select>` element,
 * otherwise it will throw an error.
 *
 * <b>Exception:</b> Hidden inputs (`<input type="hidden" />`) are ignored and will not throw an
 * error, so you may combine these with other inputs.
 *
 * <b>Note:</b> When using `ngMessages` with your input element, make sure the message and container
 * elements are *block* elements, otherwise animations applied to the messages will not look as
 * intended. Either use a `div` and apply the `ng-message` and `ng-messages` classes respectively,
 * or use the `md-block` class on your element.
 *
 * @param {expression=} md-is-error When the given expression evaluates to `true`, the input
 *   container will go into the error state. Defaults to erroring if the input has been touched and
 *   is invalid.
 * @param {boolean=} md-no-float When present, `placeholder` attributes on the input will not be
 *   converted to floating labels.
 *
 * @usage
 * <hljs lang="html">
 * <md-input-container>
 *   <label>Username</label>
 *   <input type="text" ng-model="user.name">
 * </md-input-container>
 *
 * <md-input-container>
 *   <label>Description</label>
 *   <textarea ng-model="user.description"></textarea>
 * </md-input-container>
 *
 * <md-input-container>
 *   <md-select ng-model="user.state" placeholder="State of Residence">
 *     <md-option ng-value="state" ng-repeat="state in states">{{ state }}</md-option>
 *   </md-select>
 * </md-input-container>
 * </hljs>
 *
 * <h3>When disabling floating labels</h3>
 * <hljs lang="html">
 *
 * <md-input-container md-no-float>
 *   <input type="text" placeholder="Non-Floating Label">
 * </md-input-container>
 * </hljs>
 */
function mdInputContainerDirective($mdTheming, $parse, $$rAF) {

  ContainerCtrl.$inject = ["$scope", "$element", "$attrs", "$animate"];
  var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT', 'MD-SELECT'];

  var LEFT_SELECTORS = INPUT_TAGS.reduce(function(selectors, isel) {
    return selectors.concat(['md-icon ~ ' + isel, '.md-icon ~ ' + isel]);
  }, []).join(",");

  var RIGHT_SELECTORS = INPUT_TAGS.reduce(function(selectors, isel) {
    return selectors.concat([isel + ' ~ md-icon', isel + ' ~ .md-icon']);
  }, []).join(",");

  return {
    restrict: 'E',
    compile: compile,
    controller: ContainerCtrl
  };

  function compile(tElement) {
    // Check for both a left & right icon
    var hasLeftIcon = tElement[0].querySelector(LEFT_SELECTORS);
    var hasRightIcon = tElement[0].querySelector(RIGHT_SELECTORS);

    return function postLink(scope, element) {
      $mdTheming(element);

      if (hasLeftIcon || hasRightIcon) {
        // When accessing the element's contents synchronously, they may not be defined yet because
        // of the use of ng-if. If we wait one frame, then the element should be there if the ng-if
        // resolves to true.
        $$rAF(function() {
          // Handle the case where the md-icon element is initially hidden via ng-if from #9529.
          // We don't want to preserve the space for the icon in the case of ng-if, like we do for
          // ng-show.
          // Note that we can't use the same selectors from above because the elements are no longer
          // siblings for textareas at this point due to the insertion of the md-resize-wrapper.
          var iconNotRemoved = element[0].querySelector('md-icon') ||
            element[0].querySelector('.md-icon');
          if (hasLeftIcon && iconNotRemoved) {
            element.addClass('md-icon-left');
          }
          if (hasRightIcon && iconNotRemoved) {
            element.addClass('md-icon-right');
          }
        });
      }
    };
  }

  function ContainerCtrl($scope, $element, $attrs, $animate) {
    var self = this;

    self.isErrorGetter = $attrs.mdIsError && $parse($attrs.mdIsError);

    self.delegateClick = function() {
      self.input.focus();
    };
    self.element = $element;
    self.setFocused = function(isFocused) {
      $element.toggleClass('md-input-focused', !!isFocused);
    };
    self.setHasValue = function(hasValue) {
      $element.toggleClass('md-input-has-value', !!hasValue);
    };
    self.setHasPlaceholder = function(hasPlaceholder) {
      $element.toggleClass('md-input-has-placeholder', !!hasPlaceholder);
    };
    self.setInvalid = function(isInvalid) {
      if (isInvalid) {
        $animate.addClass($element, 'md-input-invalid');
      } else {
        $animate.removeClass($element, 'md-input-invalid');
      }
    };
    $scope.$watch(function() {
      return self.label && self.input;
    }, function(hasLabelAndInput) {
      if (hasLabelAndInput && !self.label.attr('for')) {
        self.label.attr('for', self.input.attr('id'));
      }
    });
  }
}

function labelDirective() {
  return {
    restrict: 'E',
    require: '^?mdInputContainer',
    link: function(scope, element, attr, containerCtrl) {
      if (!containerCtrl || attr.mdNoFloat || element.hasClass('md-container-ignore')) return;

      containerCtrl.label = element;
      scope.$on('$destroy', function() {
        containerCtrl.label = null;
      });
    }
  };
}

/**
 * @ngdoc directive
 * @name mdInput
 * @restrict E
 * @module material.components.input
 *
 * @description
 * You can use any `<input>` or `<textarea>` element as a child of an `<md-input-container>`. This
 * allows you to build complex forms for data entry.
 *
 * When the input is required and uses a floating label, then the label will automatically contain
 * an asterisk (`*`).<br/>
 * This behavior can be disabled by using the `md-no-asterisk` attribute.
 *
 * @param {number=} md-maxlength The maximum number of characters allowed in this input. If this is
 *   specified, a character counter will be shown underneath the input.<br/><br/>
 *   The purpose of **`md-maxlength`** is exactly to show the max length counter text. If you don't
 *   want the counter text and only need "plain" validation, you can use the "simple" `ng-maxlength`
 *   or maxlength attributes.<br/><br/>
 * @param {boolean=} ng-trim If set to false, the input text will be not trimmed automatically.
 *     Defaults to true.
 * @param {string=} aria-label Aria-label is required when no label is present.  A warning message
 *   will be logged in the console if not present.
 * @param {string=} placeholder An alternative approach to using aria-label when the label is not
 *   PRESENT. The placeholder text is copied to the aria-label attribute.
 * @param {boolean=} md-no-autogrow When present, textareas will not grow automatically.
 * @param {boolean=} md-no-asterisk When present, an asterisk will not be appended to the inputs
 *   floating label.
 * @param {boolean=} md-no-resize Disables the textarea resize handle.
 * @param {number=} max-rows The maximum amount of rows for a textarea.
 * @param {boolean=} md-detect-hidden When present, textareas will be sized properly when they are
 *   revealed after being hidden. This is off by default for performance reasons because it
 *   guarantees a reflow every digest cycle.
 *
 * @usage
 * <hljs lang="html">
 * <md-input-container>
 *   <label>Color</label>
 *   <input type="text" ng-model="color" required md-maxlength="10">
 * </md-input-container>
 * </hljs>
 *
 * <h3>With Errors</h3>
 *
 * `md-input-container` also supports errors using the standard `ng-messages` directives and
 * animates the messages when they become visible using from the `ngEnter`/`ngLeave` events or
 * the `ngShow`/`ngHide` events.
 *
 * By default, the messages will be hidden until the input is in an error state. This is based off
 * of the `md-is-error` expression of the `md-input-container`. This gives the user a chance to
 * fill out the form before the errors become visible.
 *
 * <hljs lang="html">
 * <form name="colorForm">
 *   <md-input-container>
 *     <label>Favorite Color</label>
 *     <input name="favoriteColor" ng-model="favoriteColor" required>
 *     <div ng-messages="colorForm.favoriteColor.$error">
 *       <div ng-message="required">This is required!</div>
 *     </div>
 *   </md-input-container>
 * </form>
 * </hljs>
 *
 * We automatically disable this auto-hiding functionality if you provide any of the following
 * visibility directives on the `ng-messages` container:
 *
 *  - `ng-if`
 *  - `ng-show`/`ng-hide`
 *  - `ng-switch-when`/`ng-switch-default`
 *
 * You can also disable this functionality manually by adding the `md-auto-hide="false"` expression
 * to the `ng-messages` container. This may be helpful if you always want to see the error messages
 * or if you are building your own visibility directive.
 *
 * _<b>Note:</b> The `md-auto-hide` attribute is a static string that is  only checked upon
 * initialization of the `ng-messages` directive to see if it equals the string `false`._
 *
 * <hljs lang="html">
 * <form name="userForm">
 *   <md-input-container>
 *     <label>Last Name</label>
 *     <input name="lastName" ng-model="lastName" required md-maxlength="10" minlength="4">
 *     <div ng-messages="userForm.lastName.$error" ng-show="userForm.lastName.$dirty">
 *       <div ng-message="required">This is required!</div>
 *       <div ng-message="md-maxlength">That's too long!</div>
 *       <div ng-message="minlength">That's too short!</div>
 *     </div>
 *   </md-input-container>
 *   <md-input-container>
 *     <label>Biography</label>
 *     <textarea name="bio" ng-model="biography" required md-maxlength="150"></textarea>
 *     <div ng-messages="userForm.bio.$error" ng-show="userForm.bio.$dirty">
 *       <div ng-message="required">This is required!</div>
 *       <div ng-message="md-maxlength">That's too long!</div>
 *     </div>
 *   </md-input-container>
 *   <md-input-container>
 *     <input aria-label='title' ng-model='title'>
 *   </md-input-container>
 *   <md-input-container>
 *     <input placeholder='title' ng-model='title'>
 *   </md-input-container>
 * </form>
 * </hljs>
 *
 * <h3>Notes</h3>
 *
 * - Requires [ngMessages](https://docs.angularjs.org/api/ngMessages).
 * - Behaves like the [AngularJS input directive](https://docs.angularjs.org/api/ng/directive/input).
 *
 * The `md-input` and `md-input-container` directives use very specific positioning to achieve the
 * error animation effects. Therefore, it is *not* advised to use the Layout system inside of the
 * `<md-input-container>` tags. Instead, use relative or absolute positioning.
 *
 *
 * <h3>Textarea directive</h3>
 * The `textarea` element within a `md-input-container` has the following specific behavior:
 * - By default the `textarea` grows as the user types. This can be disabled via the `md-no-autogrow`
 * attribute.
 * - If a `textarea` has the `rows` attribute, it will treat the `rows` as the minimum height and will
 * continue growing as the user types. For example a textarea with `rows="3"` will be 3 lines of text
 * high initially. If no rows are specified, the directive defaults to 1.
 * - The textarea's height gets set on initialization, as well as while the user is typing. In certain situations
 * (e.g. while animating) the directive might have been initialized, before the element got it's final height. In
 * those cases, you can trigger a resize manually by broadcasting a `md-resize-textarea` event on the scope.
 * - If you want a `textarea` to stop growing at a certain point, you can specify the `max-rows` attribute.
 * - The textarea's bottom border acts as a handle which users can drag, in order to resize the element vertically.
 * Once the user has resized a `textarea`, the autogrowing functionality becomes disabled. If you don't want a
 * `textarea` to be resizeable by the user, you can add the `md-no-resize` attribute.
 */

function inputTextareaDirective($mdUtil, $window, $mdAria, $timeout, $mdGesture) {
  return {
    restrict: 'E',
    require: ['^?mdInputContainer', '?ngModel', '?^form'],
    link: postLink
  };

  function postLink(scope, element, attr, ctrls) {

    var containerCtrl = ctrls[0];
    var hasNgModel = !!ctrls[1];
    var ngModelCtrl = ctrls[1] || $mdUtil.fakeNgModel();
    var parentForm = ctrls[2];
    var isReadonly = angular.isDefined(attr.readonly);
    var mdNoAsterisk = $mdUtil.parseAttributeBoolean(attr.mdNoAsterisk);
    var tagName = element[0].tagName.toLowerCase();


    if (!containerCtrl) return;
    if (attr.type === 'hidden') {
      element.attr('aria-hidden', 'true');
      return;
    } else if (containerCtrl.input) {
      if (containerCtrl.input[0].contains(element[0])) {
        return;
      } else {
        throw new Error("<md-input-container> can only have *one* <input>, <textarea> or <md-select> child element!");
      }
    }
    containerCtrl.input = element;

    setupAttributeWatchers();

    // Add an error spacer div after our input to provide space for the char counter and any ng-messages
    var errorsSpacer = angular.element('<div class="md-errors-spacer">');
    element.after(errorsSpacer);

    var placeholderText = angular.isString(attr.placeholder) ? attr.placeholder.trim() : '';
    if (!containerCtrl.label && !placeholderText.length) {
      $mdAria.expect(element, 'aria-label');
    }

    element.addClass('md-input');
    if (!element.attr('id')) {
      element.attr('id', 'input_' + $mdUtil.nextUid());
    }

    // This works around a Webkit issue where number inputs, placed in a flexbox, that have
    // a `min` and `max` will collapse to about 1/3 of their proper width. Please check #7349
    // for more info. Also note that we don't override the `step` if the user has specified it,
    // in order to prevent some unexpected behaviour.
    if (tagName === 'input' && attr.type === 'number' && attr.min && attr.max && !attr.step) {
      element.attr('step', 'any');
    } else if (tagName === 'textarea') {
      setupTextarea();
    }

    // If the input doesn't have an ngModel, it may have a static value. For that case,
    // we have to do one initial check to determine if the container should be in the
    // "has a value" state.
    if (!hasNgModel) {
      inputCheckValue();
    }

    var isErrorGetter = containerCtrl.isErrorGetter || function() {
      return ngModelCtrl.$invalid && (ngModelCtrl.$touched || (parentForm && parentForm.$submitted));
    };

    scope.$watch(isErrorGetter, containerCtrl.setInvalid);

    // When the developer uses the ngValue directive for the input, we have to observe the attribute, because
    // AngularJS's ngValue directive is just setting the `value` attribute.
    if (attr.ngValue) {
      attr.$observe('value', inputCheckValue);
    }

    ngModelCtrl.$parsers.push(ngModelPipelineCheckValue);
    ngModelCtrl.$formatters.push(ngModelPipelineCheckValue);

    element.on('input', inputCheckValue);

    if (!isReadonly) {
      element
        .on('focus', function(ev) {
          $mdUtil.nextTick(function() {
            containerCtrl.setFocused(true);
          });
        })
        .on('blur', function(ev) {
          $mdUtil.nextTick(function() {
            containerCtrl.setFocused(false);
            inputCheckValue();
          });
        });
    }

    scope.$on('$destroy', function() {
      containerCtrl.setFocused(false);
      containerCtrl.setHasValue(false);
      containerCtrl.input = null;
    });

    /** Gets run through ngModel's pipeline and set the `has-value` class on the container. */
    function ngModelPipelineCheckValue(arg) {
      containerCtrl.setHasValue(!ngModelCtrl.$isEmpty(arg));
      return arg;
    }

    function setupAttributeWatchers() {
      if (containerCtrl.label) {
        attr.$observe('required', function (value) {
          // We don't need to parse the required value, it's always a boolean because of angular's
          // required directive.
          containerCtrl.label.toggleClass('md-required', value && !mdNoAsterisk);
        });
      }
    }

    function inputCheckValue() {
      // An input's value counts if its length > 0,
      // or if the input's validity state says it has bad input (eg string in a number input)
      containerCtrl.setHasValue(element.val().length > 0 || (element[0].validity || {}).badInput);
    }

    function setupTextarea() {
      var isAutogrowing = !attr.hasOwnProperty('mdNoAutogrow');

      attachResizeHandle();

      if (!isAutogrowing) return;

      // Can't check if height was or not explicity set,
      // so rows attribute will take precedence if present
      var minRows = attr.hasOwnProperty('rows') ? parseInt(attr.rows) : NaN;
      var maxRows = attr.hasOwnProperty('maxRows') ? parseInt(attr.maxRows) : NaN;
      var scopeResizeListener = scope.$on('md-resize-textarea', growTextarea);
      var lineHeight = null;
      var node = element[0];

      // This timeout is necessary, because the browser needs a little bit
      // of time to calculate the `clientHeight` and `scrollHeight`.
      $timeout(function() {
        $mdUtil.nextTick(growTextarea);
      }, 10, false);

      // We could leverage ngModel's $parsers here, however it
      // isn't reliable, because AngularJS trims the input by default,
      // which means that growTextarea won't fire when newlines and
      // spaces are added.
      element.on('input', growTextarea);

      // We should still use the $formatters, because they fire when
      // the value was changed from outside the textarea.
      if (hasNgModel) {
        ngModelCtrl.$formatters.push(formattersListener);
      }

      if (!minRows) {
        element.attr('rows', 1);
      }

      angular.element($window).on('resize', growTextarea);
      scope.$on('$destroy', disableAutogrow);

      function growTextarea() {
        // temporarily disables element's flex so its height 'runs free'
        element
          .attr('rows', 1)
          .css('height', 'auto')
          .addClass('md-no-flex');

        var height = getHeight();

        if (!lineHeight) {
          // offsetHeight includes padding which can throw off our value
          var originalPadding = element[0].style.padding || '';
          lineHeight = element.css('padding', 0).prop('offsetHeight');
          element[0].style.padding = originalPadding;
        }

        if (minRows && lineHeight) {
          height = Math.max(height, lineHeight * minRows);
        }

        if (maxRows && lineHeight) {
          var maxHeight = lineHeight * maxRows;

          if (maxHeight < height) {
            element.attr('md-no-autogrow', '');
            height = maxHeight;
          } else {
            element.removeAttr('md-no-autogrow');
          }
        }

        if (lineHeight) {
          element.attr('rows', Math.round(height / lineHeight));
        }

        element
          .css('height', height + 'px')
          .removeClass('md-no-flex');
      }

      function getHeight() {
        var offsetHeight = node.offsetHeight;
        var line = node.scrollHeight - offsetHeight;
        return offsetHeight + Math.max(line, 0);
      }

      function formattersListener(value) {
        $mdUtil.nextTick(growTextarea);
        return value;
      }

      function disableAutogrow() {
        if (!isAutogrowing) return;

        isAutogrowing = false;
        angular.element($window).off('resize', growTextarea);
        scopeResizeListener && scopeResizeListener();
        element
          .attr('md-no-autogrow', '')
          .off('input', growTextarea);

        if (hasNgModel) {
          var listenerIndex = ngModelCtrl.$formatters.indexOf(formattersListener);

          if (listenerIndex > -1) {
            ngModelCtrl.$formatters.splice(listenerIndex, 1);
          }
        }
      }

      function attachResizeHandle() {
        if (attr.hasOwnProperty('mdNoResize')) return;

        var handle = angular.element('<div class="md-resize-handle"></div>');
        var isDragging = false;
        var dragStart = null;
        var startHeight = 0;
        var container = containerCtrl.element;
        var dragGestureHandler = $mdGesture.register(handle, 'drag', { horizontal: false });


        element.wrap('<div class="md-resize-wrapper">').after(handle);
        handle.on('mousedown', onMouseDown);

        container
          .on('$md.dragstart', onDragStart)
          .on('$md.drag', onDrag)
          .on('$md.dragend', onDragEnd);

        scope.$on('$destroy', function() {
          handle
            .off('mousedown', onMouseDown)
            .remove();

          container
            .off('$md.dragstart', onDragStart)
            .off('$md.drag', onDrag)
            .off('$md.dragend', onDragEnd);

          dragGestureHandler();
          handle = null;
          container = null;
          dragGestureHandler = null;
        });

        function onMouseDown(ev) {
          ev.preventDefault();
          isDragging = true;
          dragStart = ev.clientY;
          startHeight = parseFloat(element.css('height')) || element.prop('offsetHeight');
        }

        function onDragStart(ev) {
          if (!isDragging) return;
          ev.preventDefault();
          disableAutogrow();
          container.addClass('md-input-resized');
        }

        function onDrag(ev) {
          if (!isDragging) return;

          element.css('height', (startHeight + ev.pointer.distanceY) + 'px');
        }

        function onDragEnd(ev) {
          if (!isDragging) return;
          isDragging = false;
          container.removeClass('md-input-resized');
        }
      }

      // Attach a watcher to detect when the textarea gets shown.
      if (attr.hasOwnProperty('mdDetectHidden')) {

        var handleHiddenChange = function() {
          var wasHidden = false;

          return function() {
            var isHidden = node.offsetHeight === 0;

            if (isHidden === false && wasHidden === true) {
              growTextarea();
            }

            wasHidden = isHidden;
          };
        }();

        // Check every digest cycle whether the visibility of the textarea has changed.
        // Queue up to run after the digest cycle is complete.
        scope.$watch(function() {
          $mdUtil.nextTick(handleHiddenChange, false);
          return true;
        });
      }
    }
  }
}

function mdMaxlengthDirective($animate, $mdUtil) {
  return {
    restrict: 'A',
    require: ['ngModel', '^mdInputContainer'],
    link: postLink
  };

  function postLink(scope, element, attr, ctrls) {
    var maxlength = parseInt(attr.mdMaxlength);
    if (isNaN(maxlength)) maxlength = -1;
    var ngModelCtrl = ctrls[0];
    var containerCtrl = ctrls[1];
    var charCountEl, errorsSpacer;
    var ngTrim = angular.isDefined(attr.ngTrim) ? $mdUtil.parseAttributeBoolean(attr.ngTrim) : true;
    var isPasswordInput = attr.type === 'password';

    scope.$watch(attr.mdMaxlength, function(value) {
      maxlength = value;
    });

    ngModelCtrl.$validators['md-maxlength'] = function(modelValue, viewValue) {
      if (!angular.isNumber(maxlength) || maxlength < 0) {
        return true;
      }

      // We always update the char count, when the modelValue has changed.
      // Using the $validators for triggering the update works very well.
      renderCharCount();

      var elementVal = element.val() || viewValue;
      if (elementVal === undefined || elementVal === null) {
        elementVal = '';
      }
      elementVal = ngTrim && !isPasswordInput && angular.isString(elementVal) ? elementVal.trim() : elementVal;
      // Force the value into a string since it may be a number,
      // which does not have a length property.
      return String(elementVal).length <= maxlength;
    };

    /**
     * Override the default NgModelController $isEmpty check to take ng-trim, password inputs,
     * etc. into account.
     * @param value {*} the input's value
     * @returns {boolean} true if the input's value should be considered empty, false otherwise
     */
    ngModelCtrl.$isEmpty = function(value) {
      return calculateInputValueLength(value) === 0;
    };

    // Wait until the next tick to ensure that the input has setup the errors spacer where we will
    // append our counter
    $mdUtil.nextTick(function() {
      errorsSpacer = angular.element(containerCtrl.element[0].querySelector('.md-errors-spacer'));
      charCountEl = angular.element('<div class="md-char-counter">');

      // Append our character counter inside the errors spacer
      errorsSpacer.append(charCountEl);

      attr.$observe('ngTrim', function (value) {
        ngTrim = angular.isDefined(value) ? $mdUtil.parseAttributeBoolean(value) : true;
      });

      scope.$watch(attr.mdMaxlength, function(value) {
        if (angular.isNumber(value) && value > 0) {
          if (!charCountEl.parent().length) {
            $animate.enter(charCountEl, errorsSpacer);
          }
          renderCharCount();
        } else {
          $animate.leave(charCountEl);
        }
      });
    });

    /**
     * Calculate the input value's length after coercing it to a string
     * and trimming it if appropriate.
     * @param value {*} the input's value
     * @returns {number} calculated length of the input's value
     */
    function calculateInputValueLength(value) {
      value = ngTrim && !isPasswordInput && angular.isString(value) ? value.trim() : value;
      if (value === undefined || value === null) {
        value = '';
      }
      return String(value).length;
    }

    function renderCharCount() {
      // If we have not been initialized or appended to the body yet; do not render.
      if (!charCountEl || !charCountEl.parent()) {
        return;
      }
      // Force the value into a string since it may be a number,
      // which does not have a length property.
      charCountEl.text(calculateInputValueLength(element.val()) + ' / ' + maxlength);
    }
  }
}

function placeholderDirective($compile) {
  return {
    restrict: 'A',
    require: '^^?mdInputContainer',
    priority: 200,
    link: {
      // Note that we need to do this in the pre-link, as opposed to the post link, if we want to
      // support data bindings in the placeholder. This is necessary, because we have a case where
      // we transfer the placeholder value to the `<label>` and we remove it from the original `<input>`.
      // If we did this in the post-link, AngularJS would have set up the observers already and would be
      // re-adding the attribute, even though we removed it from the element.
      pre: preLink
    }
  };

  function preLink(scope, element, attr, inputContainer) {
    // If there is no input container, just return
    if (!inputContainer) return;

    var label = inputContainer.element.find('label');
    var noFloat = inputContainer.element.attr('md-no-float');

    // If we have a label, or they specify the md-no-float attribute, just return
    if ((label && label.length) || noFloat === '' || scope.$eval(noFloat)) {
      // Add a placeholder class so we can target it in the CSS
      inputContainer.setHasPlaceholder(true);
      return;
    }

    // md-select handles placeholders on it's own
    if (element[0].nodeName !== 'MD-SELECT') {
      // Move the placeholder expression to the label
      var newLabel = angular.element(
        '<label ng-click="delegateClick()" tabindex="-1" aria-hidden="true">' + attr.placeholder +
        '</label>');

      // Note that we unset it via `attr`, in order to get AngularJS
      // to remove any observers that it might have set up. Otherwise
      // the attribute will be added on the next digest.
      attr.$set('placeholder', null);

      // We need to compile the label manually in case it has any bindings.
      // A gotcha here is that we first add the element to the DOM and we compile
      // it later. This is necessary, because if we compile the element beforehand,
      // it won't be able to find the `mdInputContainer` controller.
      inputContainer.element
        .addClass('md-icon-float')
        .prepend(newLabel);

      $compile(newLabel)(scope);
    }
  }
}

/**
 * @ngdoc directive
 * @name mdSelectOnFocus
 * @module material.components.input
 *
 * @restrict A
 *
 * @description
 * The `md-select-on-focus` directive allows you to automatically select the element's input text on focus.
 *
 * <h3>Notes</h3>
 * - The use of `md-select-on-focus` is restricted to `<input>` and `<textarea>` elements.
 *
 * @usage
 * <h3>Using with an Input</h3>
 * <hljs lang="html">
 *
 * <md-input-container>
 *   <label>Auto Select</label>
 *   <input type="text" md-select-on-focus>
 * </md-input-container>
 * </hljs>
 *
 * <h3>Using with a Textarea</h3>
 * <hljs lang="html">
 *
 * <md-input-container>
 *   <label>Auto Select</label>
 *   <textarea md-select-on-focus>This text will be selected on focus.</textarea>
 * </md-input-container>
 *
 * </hljs>
 */
function mdSelectOnFocusDirective($document, $timeout) {

  return {
    restrict: 'A',
    link: postLink
  };

  function postLink(scope, element, attr) {
    if (element[0].nodeName !== 'INPUT' && element[0].nodeName !== "TEXTAREA") return;

    var preventMouseUp = false;

    element
      .on('focus', onFocus)
      .on('mouseup', onMouseUp);

    scope.$on('$destroy', function() {
      element
        .off('focus', onFocus)
        .off('mouseup', onMouseUp);
    });

    function onFocus() {
      preventMouseUp = true;

      $timeout(function() {

        // Use HTMLInputElement#select to fix firefox select issues.
        // The debounce is here for Edge's sake, otherwise the selection doesn't work.
        // Since focus may already have been lost on the input (and because `select()`
        // will re-focus), make sure the element is still active before applying.
        if ($document[0].activeElement === element[0]) {
          element[0].select();
        }

        // This should be reset from inside the `focus`, because the event might
        // have originated from something different than a click, e.g. a keyboard event.
        preventMouseUp = false;
      }, 1, false);
    }

    // Prevents the default action of the first `mouseup` after a focus.
    // This is necessary, because browsers fire a `mouseup` right after the element
    // has been focused. In some browsers (Firefox in particular) this can clear the
    // selection. There are examples of the problem in issue #7487.
    function onMouseUp(event) {
      if (preventMouseUp) {
        event.preventDefault();
      }
    }
  }
}

var visibilityDirectives = ['ngIf', 'ngShow', 'ngHide', 'ngSwitchWhen', 'ngSwitchDefault'];
function ngMessagesDirective() {
  return {
    restrict: 'EA',
    link: postLink,

    // This is optional because we don't want target *all* ngMessage instances, just those inside of
    // mdInputContainer.
    require: '^^?mdInputContainer'
  };

  function postLink(scope, element, attrs, inputContainer) {
    // If we are not a child of an input container, don't do anything
    if (!inputContainer) return;

    // Add our animation class
    element.toggleClass('md-input-messages-animation', true);

    // Add our md-auto-hide class to automatically hide/show messages when container is invalid
    element.toggleClass('md-auto-hide', true);

    // If we see some known visibility directives, remove the md-auto-hide class
    if (attrs.mdAutoHide == 'false' || hasVisibiltyDirective(attrs)) {
      element.toggleClass('md-auto-hide', false);
    }
  }

  function hasVisibiltyDirective(attrs) {
    return visibilityDirectives.some(function(attr) {
      return attrs[attr];
    });
  }
}

function ngMessageDirective($mdUtil) {
  return {
    restrict: 'EA',
    compile: compile,
    priority: 100
  };

  function compile(tElement) {
    if (!isInsideInputContainer(tElement)) {

      // When the current element is inside of a document fragment, then we need to check for an input-container
      // in the postLink, because the element will be later added to the DOM and is currently just in a temporary
      // fragment, which causes the input-container check to fail.
      if (isInsideFragment()) {
        return function (scope, element) {
          if (isInsideInputContainer(element)) {
            // Inside of the postLink function, a ngMessage directive will be a comment element, because it's
            // currently hidden. To access the shown element, we need to use the element from the compile function.
            initMessageElement(tElement);
          }
        };
      }
    } else {
      initMessageElement(tElement);
    }

    function isInsideFragment() {
      var nextNode = tElement[0];
      while (nextNode = nextNode.parentNode) {
        if (nextNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          return true;
        }
      }
      return false;
    }

    function isInsideInputContainer(element) {
      return !!$mdUtil.getClosest(element, "md-input-container");
    }

    function initMessageElement(element) {
      // Add our animation class
      element.toggleClass('md-input-message-animation', true);
    }
  }
}

var $$AnimateRunner, $animateCss, $mdUtil;

function mdInputInvalidMessagesAnimation($$AnimateRunner, $animateCss, $mdUtil) {
  saveSharedServices($$AnimateRunner, $animateCss, $mdUtil);

  return {
    addClass: function(element, className, done) {
      showInputMessages(element, done);
    }

    // NOTE: We do not need the removeClass method, because the message ng-leave animation will fire
  };
}

function ngMessagesAnimation($$AnimateRunner, $animateCss, $mdUtil) {
  saveSharedServices($$AnimateRunner, $animateCss, $mdUtil);

  return {
    enter: function(element, done) {
      showInputMessages(element, done);
    },

    leave: function(element, done) {
      hideInputMessages(element, done);
    },

    addClass: function(element, className, done) {
      if (className == "ng-hide") {
        hideInputMessages(element, done);
      } else {
        done();
      }
    },

    removeClass: function(element, className, done) {
      if (className == "ng-hide") {
        showInputMessages(element, done);
      } else {
        done();
      }
    }
  };
}

function ngMessageAnimation($$AnimateRunner, $animateCss, $mdUtil, $log) {
  saveSharedServices($$AnimateRunner, $animateCss, $mdUtil, $log);

  return {
    enter: function(element, done) {
      var animator = showMessage(element);

      animator.start().done(done);
    },

    leave: function(element, done) {
      var animator = hideMessage(element);

      animator.start().done(done);
    }
  };
}

function showInputMessages(element, done) {
  var animators = [], animator;
  var messages = getMessagesElement(element);
  var children = messages.children();

  if (messages.length == 0 || children.length == 0) {
    done();
    return;
  }

  angular.forEach(children, function(child) {
    animator = showMessage(angular.element(child));

    animators.push(animator.start());
  });

  $$AnimateRunner.all(animators, done);
}

function hideInputMessages(element, done) {
  var animators = [], animator;
  var messages = getMessagesElement(element);
  var children = messages.children();

  if (messages.length == 0 || children.length == 0) {
    done();
    return;
  }

  angular.forEach(children, function(child) {
    animator = hideMessage(angular.element(child));

    animators.push(animator.start());
  });

  $$AnimateRunner.all(animators, done);
}

function showMessage(element) {
  var height = parseInt(window.getComputedStyle(element[0]).height);
  var topMargin = parseInt(window.getComputedStyle(element[0]).marginTop);

  var messages = getMessagesElement(element);
  var container = getInputElement(element);

  // Check to see if the message is already visible so we can skip
  var alreadyVisible = (topMargin > -height);

  // If we have the md-auto-hide class, the md-input-invalid animation will fire, so we can skip
  if (alreadyVisible || (messages.hasClass('md-auto-hide') && !container.hasClass('md-input-invalid'))) {
    return $animateCss(element, {});
  }

  return $animateCss(element, {
    event: 'enter',
    structural: true,
    from: {"opacity": 0, "margin-top": -height + "px"},
    to: {"opacity": 1, "margin-top": "0"},
    duration: 0.3
  });
}

function hideMessage(element) {
  var height = element[0].offsetHeight;
  var styles = window.getComputedStyle(element[0]);

  // If we are already hidden, just return an empty animation
  if (parseInt(styles.opacity) === 0) {
    return $animateCss(element, {});
  }

  // Otherwise, animate
  return $animateCss(element, {
    event: 'leave',
    structural: true,
    from: {"opacity": 1, "margin-top": 0},
    to: {"opacity": 0, "margin-top": -height + "px"},
    duration: 0.3
  });
}

function getInputElement(element) {
  var inputContainer = element.controller('mdInputContainer');

  return inputContainer.element;
}

function getMessagesElement(element) {
  // If we ARE the messages element, just return ourself
  if (element.hasClass('md-input-messages-animation')) {
    return element;
  }

  // If we are a ng-message element, we need to traverse up the DOM tree
  if (element.hasClass('md-input-message-animation')) {
    return angular.element($mdUtil.getClosest(element, function(node) {
      return node.classList.contains('md-input-messages-animation');
    }));
  }

  // Otherwise, we can traverse down
  return angular.element(element[0].querySelector('.md-input-messages-animation'));
}

function saveSharedServices(_$$AnimateRunner_, _$animateCss_, _$mdUtil_) {
  $$AnimateRunner = _$$AnimateRunner_;
  $animateCss = _$animateCss_;
  $mdUtil = _$mdUtil_;
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.list
 * @description
 * List module
 */
MdListController.$inject = ["$scope", "$element", "$mdListInkRipple"];
mdListDirective.$inject = ["$mdTheming"];
mdListItemDirective.$inject = ["$mdAria", "$mdConstant", "$mdUtil", "$timeout"];
angular.module('material.components.list', [
  'material.core'
])
  .controller('MdListController', MdListController)
  .directive('mdList', mdListDirective)
  .directive('mdListItem', mdListItemDirective);

/**
 * @ngdoc directive
 * @name mdList
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * The `<md-list>` directive is a list container for 1..n `<md-list-item>` tags.
 *
 * @usage
 * <hljs lang="html">
 * <md-list>
 *   <md-list-item class="md-2-line" ng-repeat="item in todos">
 *     <md-checkbox ng-model="item.done"></md-checkbox>
 *     <div class="md-list-item-text">
 *       <h3>{{item.title}}</h3>
 *       <p>{{item.description}}</p>
 *     </div>
 *   </md-list-item>
 * </md-list>
 * </hljs>
 */

function mdListDirective($mdTheming) {
  return {
    restrict: 'E',
    compile: function(tEl) {
      tEl[0].setAttribute('role', 'list');
      return $mdTheming;
    }
  };
}
/**
 * @ngdoc directive
 * @name mdListItem
 * @module material.components.list
 *
 * @restrict E
 *
 * @description
 * A `md-list-item` element can be used to represent some information in a row.<br/>
 *
 * @usage
 * ### Single Row Item
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>Single Row Item</span>
 *   </md-list-item>
 * </hljs>
 *
 * ### Multiple Lines
 * By using the following markup, you will be able to have two lines inside of one `md-list-item`.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-2-line">
 *     <div class="md-list-item-text" layout="column">
 *       <p>First Line</p>
 *       <p>Second Line</p>
 *     </div>
 *   </md-list-item>
 * </hljs>
 *
 * It is also possible to have three lines inside of one list item.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-3-line">
 *     <div class="md-list-item-text" layout="column">
 *       <p>First Line</p>
 *       <p>Second Line</p>
 *       <p>Third Line</p>
 *     </div>
 *   </md-list-item>
 * </hljs>
 *
 * ### Secondary Items
 * Secondary items are elements which will be aligned at the end of the `md-list-item`.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>Single Row Item</span>
 *     <md-button class="md-secondary">
 *       Secondary Button
 *     </md-button>
 *   </md-list-item>
 * </hljs>
 *
 * It also possible to have multiple secondary items inside of one `md-list-item`.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>Single Row Item</span>
 *     <md-button class="md-secondary">First Button</md-button>
 *     <md-button class="md-secondary">Second Button</md-button>
 *   </md-list-item>
 * </hljs>
 *
 * ### Proxy Item
 * Proxies are elements, which will execute their specific action on click<br/>
 * Currently supported proxy items are
 * - `md-checkbox` (Toggle)
 * - `md-switch` (Toggle)
 * - `md-menu` (Open)
 *
 * This means, when using a supported proxy item inside of `md-list-item`, the list item will
 * automatically become clickable and executes the associated action of the proxy element on click.
 *
 * It is possible to disable this behavior by applying the `md-no-proxy` class to the list item.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-no-proxy">
 *     <span>No Proxy List</span>
 *     <md-checkbox class="md-secondary"></md-checkbox>
 *   </md-list-item>
 * </hljs>
 *
 * Here are a few examples of proxy elements inside of a list item.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>First Line</span>
 *     <md-checkbox class="md-secondary"></md-checkbox>
 *   </md-list-item>
 * </hljs>
 *
 * The `md-checkbox` element will be automatically detected as a proxy element and will toggle on
 * click.
 *
 * If not provided, an `aria-label` will be applied using the text of the list item.
 * In this case, the following will be applied to the `md-checkbox`:
 * `aria-label="Toggle First Line"`.
 * When localizing your application, you should supply a localized `aria-label`.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <span>First Line</span>
 *     <md-switch class="md-secondary"></md-switch>
 *   </md-list-item>
 * </hljs>
 *
 * The recognized `md-switch` will toggle its state, when the user clicks on the `md-list-item`.
 *
 * It is also possible to have a `md-menu` inside of a `md-list-item`.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <p>Click anywhere to fire the secondary action</p>
 *     <md-menu class="md-secondary">
 *       <md-button class="md-icon-button">
 *         <md-icon md-svg-icon="communication:message"></md-icon>
 *       </md-button>
 *       <md-menu-content width="4">
 *         <md-menu-item>
 *           <md-button>
 *             Redial
 *           </md-button>
 *         </md-menu-item>
 *         <md-menu-item>
 *           <md-button>
 *             Check voicemail
 *           </md-button>
 *         </md-menu-item>
 *         <md-menu-divider></md-menu-divider>
 *         <md-menu-item>
 *           <md-button>
 *             Notifications
 *           </md-button>
 *         </md-menu-item>
 *       </md-menu-content>
 *     </md-menu>
 *   </md-list-item>
 * </hljs>
 *
 * The menu will automatically open, when the users clicks on the `md-list-item`.<br/>
 *
 * If the developer didn't specify any position mode on the menu, the `md-list-item` will
 * automatically detect the position mode and apply it to the `md-menu`.
 *
 * ### Avatars
 * Sometimes you may want to have avatars inside of the `md-list-item `.<br/>
 * You are able to create an optimized icon for the list item, by applying the `.md-avatar` class on
 * the `<img>` element.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <img src="my-avatar.png" class="md-avatar">
 *     <span>Alan Turing</span>
 * </hljs>
 *
 * When using `<md-icon>` for an avatar, you have to use the `.md-avatar-icon` class.
 *
 * <hljs lang="html">
 *   <md-list-item>
 *     <md-icon class="md-avatar-icon" md-svg-icon="social:person"></md-icon>
 *     <span>Timothy Kopra</span>
 *   </md-list-item>
 * </hljs>
 *
 * In cases where you have a `md-list-item`, which doesn't have an avatar,
 * but you want to align it with the other avatar items, you need to use the `.md-offset` class.
 *
 * <hljs lang="html">
 *   <md-list-item class="md-offset">
 *     <span>Jon Doe</span>
 *   </md-list-item>
 * </hljs>
 *
 * ### DOM modification
 * The `md-list-item` component automatically detects if the list item should be clickable.
 *
 * ---
 * If the `md-list-item` is clickable, we wrap all content inside of a `<div>` and create
 * an overlaying button, which will will execute the given actions (like `ng-href`, `ng-click`).
 *
 * We create an overlaying button, instead of wrapping all content inside of the button,
 * because otherwise some elements may not be clickable inside of the button.
 *
 * ---
 * When using a secondary item inside of your list item, the `md-list-item` component will
 * automatically create a secondary container at the end of the `md-list-item`, which contains all
 * secondary items.
 *
 * The secondary item container is not static, because that would cause issues with the overflow
 * of the list item.
 */
function mdListItemDirective($mdAria, $mdConstant, $mdUtil, $timeout) {
  var proxiedTypes = ['md-checkbox', 'md-switch', 'md-menu'];
  return {
    restrict: 'E',
    controller: 'MdListController',

    compile: function(tElement, tAttrs) {

      // Check for proxy controls (no ng-click on parent, and a control inside)
      var secondaryItems = tElement[0].querySelectorAll('.md-secondary');
      var hasProxiedElement;
      var proxyElement;
      var itemContainer = tElement;

      tElement[0].setAttribute('role', 'listitem');

      if (tAttrs.ngClick || tAttrs.ngDblclick ||  tAttrs.ngHref || tAttrs.href || tAttrs.uiSref || tAttrs.ngAttrUiSref) {
        wrapIn('button');
      } else if (!tElement.hasClass('md-no-proxy')) {

        for (var i = 0, type; i < proxiedTypes.length; ++i) {
          proxyElement = tElement[0].querySelector(proxiedTypes[i]);
          if (proxyElement !== null) {
            hasProxiedElement = true;
            break;
          }
        }

        if (hasProxiedElement) {
          wrapIn('div');
        } else {
          tElement.addClass('md-no-proxy');
        }
      }

      wrapSecondaryItems();
      setupToggleAria();

      if (hasProxiedElement && proxyElement.nodeName === "MD-MENU") {
        setupProxiedMenu();
      }

      function setupToggleAria() {
        var toggleTypes = ['md-switch', 'md-checkbox'];
        var toggle;

        for (var i = 0, toggleType; i < toggleTypes.length; ++i) {
          toggle = tElement.find(toggleTypes[i])[0];
          if (toggle) {
            if (!toggle.hasAttribute('aria-label')) {
              var labelElement = tElement.find('p')[0];
              if (!labelElement) {
                labelElement = tElement.find('span')[0];
              }
              if (!labelElement) return;
              toggle.setAttribute('aria-label', 'Toggle ' + labelElement.textContent);
            }
          }
        }
      }

      function setupProxiedMenu() {
        var menuEl = angular.element(proxyElement);

        var isEndAligned = menuEl.parent().hasClass('md-secondary-container') ||
                           proxyElement.parentNode.firstElementChild !== proxyElement;

        var xAxisPosition = 'left';

        if (isEndAligned) {
          // When the proxy item is aligned at the end of the list, we have to set the origin to the end.
          xAxisPosition = 'right';
        }

        // Set the position mode / origin of the proxied menu.
        if (!menuEl.attr('md-position-mode')) {
          menuEl.attr('md-position-mode', xAxisPosition + ' target');
        }

        // Apply menu open binding to menu button
        var menuOpenButton = menuEl.children().eq(0);
        if (!hasClickEvent(menuOpenButton[0])) {
          menuOpenButton.attr('ng-click', '$mdMenu.open($event)');
        }

        if (!menuOpenButton.attr('aria-label')) {
          menuOpenButton.attr('aria-label', 'Open List Menu');
        }
      }

      /**
       * @param {'div'|'button'} type
       */
      function wrapIn(type) {
        if (type === 'div') {
          itemContainer = angular.element('<div class="md-no-style md-list-item-inner">');
          itemContainer.append(tElement.contents());
          tElement.addClass('md-proxy-focus');
        } else {
          // Element which holds the default list-item content.
          itemContainer = angular.element(
            '<div class="md-button md-no-style">' +
            '   <div class="md-list-item-inner"></div>' +
            '</div>'
          );

          // Button which shows ripple and executes primary action.
          var buttonWrap = angular.element(
            '<md-button class="md-no-style"></md-button>'
          );

          moveAttributes(tElement[0], buttonWrap[0]);

          // If there is no aria-label set on the button (previously copied over if present)
          // we determine the label from the content and copy it to the button.
          if (!buttonWrap.attr('aria-label')) {
            buttonWrap.attr('aria-label', $mdAria.getText(tElement));
          }

          // We allow developers to specify the `md-no-focus` class, to disable the focus style
          // on the button executor. Once more classes should be forwarded, we should probably make
          // the class forward more generic.
          if (tElement.hasClass('md-no-focus')) {
            buttonWrap.addClass('md-no-focus');
          }

          // Append the button wrap before our list-item content, because it will overlay in
          // relative.
          itemContainer.prepend(buttonWrap);
          itemContainer.children().eq(1).append(tElement.contents());

          tElement.addClass('_md-button-wrap');
        }

        tElement[0].setAttribute('tabindex', '-1');
        tElement.append(itemContainer);
      }

      function wrapSecondaryItems() {
        var secondaryItemsWrapper = angular.element('<div class="md-secondary-container">');

        angular.forEach(secondaryItems, function(secondaryItem) {
          wrapSecondaryItem(secondaryItem, secondaryItemsWrapper);
        });

        itemContainer.append(secondaryItemsWrapper);
      }

      /**
       * @param {HTMLElement} secondaryItem
       * @param container
       */
      function wrapSecondaryItem(secondaryItem, container) {
        // If the current secondary item is not a button, but contains a ng-click attribute,
        // the secondary item will be automatically wrapped inside of a button.
        if (secondaryItem && !isButton(secondaryItem) && secondaryItem.hasAttribute('ng-click')) {

          $mdAria.expect(secondaryItem, 'aria-label');
          var buttonWrapper = angular.element('<md-button class="md-secondary md-icon-button">');

          // Move the attributes from the secondary item to the generated button.
          // We also support some additional attributes from the secondary item,
          // because some developers may use a ngIf, ngHide, ngShow on their item.
          moveAttributes(secondaryItem, buttonWrapper[0], ['ng-if', 'ng-hide', 'ng-show']);

          secondaryItem.setAttribute('tabindex', '-1');
          buttonWrapper.append(secondaryItem);

          secondaryItem = buttonWrapper[0];
        }

        if (secondaryItem &&
            (!hasClickEvent(secondaryItem) ||
              (!tAttrs.ngClick && isProxiedElement(secondaryItem)))) {
          // In this case we remove the secondary class, so we can identify it later, when searching
          // for the proxy items.
          angular.element(secondaryItem).removeClass('md-secondary');
        }

        tElement.addClass('md-with-secondary');
        container.append(secondaryItem);
      }

      /**
       * Moves attributes from a source element to the destination element.
       * By default, the function will copy the most necessary attributes, supported
       * by the button executor for clickable list items.
       * @param source Element with the specified attributes
       * @param destination Element which will receive the attributes
       * @param extraAttrs Additional attributes, which will be moved over
       */
      function moveAttributes(source, destination, extraAttrs) {
        var copiedAttrs = $mdUtil.prefixer([
          'ng-if', 'ng-click', 'ng-dblclick', 'aria-label', 'ng-disabled', 'ui-sref',
          'href', 'ng-href', 'rel', 'target', 'ng-attr-ui-sref', 'ui-sref-opts', 'download'
        ]);

        if (extraAttrs) {
          copiedAttrs = copiedAttrs.concat($mdUtil.prefixer(extraAttrs));
        }

        angular.forEach(copiedAttrs, function(attr) {
          if (source.hasAttribute(attr)) {
            destination.setAttribute(attr, source.getAttribute(attr));
            source.removeAttribute(attr);
          }
        });
      }

      /**
       * @param {HTMLElement} element
       * @return {boolean} true if the element has one of the proxied tags, false otherwise
       */
      function isProxiedElement(element) {
        return proxiedTypes.indexOf(element.nodeName.toLowerCase()) !== -1;
      }

      /**
       * @param {HTMLElement} element
       * @return {boolean} true if the element is a button or md-button, false otherwise
       */
      function isButton(element) {
        var nodeName = element.nodeName.toUpperCase();

        return nodeName === "MD-BUTTON" || nodeName === "BUTTON";
      }

      /**
       * @param {Element} element
       * @return {boolean} true if the element has an ng-click attribute, false otherwise
       */
      function hasClickEvent(element) {
        var attr = element.attributes;
        for (var i = 0; i < attr.length; i++) {
          if (tAttrs.$normalize(attr[i].name) === 'ngClick') {
            return true;
          }
        }
        return false;
      }

      return postLink;

      function postLink($scope, $element, $attr, ctrl) {
        $element.addClass('_md');     // private md component indicator for styling

        var proxies       = [],
            firstElement  = $element[0].firstElementChild,
            isButtonWrap  = $element.hasClass('_md-button-wrap'),
            clickChild    = isButtonWrap ? firstElement.firstElementChild : firstElement,
            hasClick      = clickChild && hasClickEvent(clickChild),
            noProxies     = $element.hasClass('md-no-proxy');

        computeProxies();
        computeClickable();

        if (proxies.length) {
          angular.forEach(proxies, function(proxy) {
            proxy = angular.element(proxy);

            $scope.mouseActive = false;
            proxy.on('mousedown', function() {
              $scope.mouseActive = true;
              $timeout(function() {
                $scope.mouseActive = false;
              }, 100);
            })
            .on('focus', function() {
              if ($scope.mouseActive === false) { $element.addClass('md-focused'); }
              proxy.on('blur', function proxyOnBlur() {
                $element.removeClass('md-focused');
                proxy.off('blur', proxyOnBlur);
              });
            });
          });
        }

        function computeProxies() {
          if (firstElement && firstElement.children && !hasClick && !noProxies) {

            angular.forEach(proxiedTypes, function(type) {
              // All elements which are not capable of being used as a proxy have the .md-secondary
              // class applied. These items were identified in the secondary wrap function.
              angular.forEach(firstElement.querySelectorAll(type + ':not(.md-secondary)'), function(child) {
                proxies.push(child);
              });
            });
          }
        }

        function computeClickable() {
          if (proxies.length === 1 || hasClick) {
            $element.addClass('md-clickable');

            if (!hasClick) {
              ctrl.attachRipple($scope, angular.element($element[0].querySelector('.md-no-style')));
            }
          }
        }

        /**
         * @param {MouseEvent} event
         * @return {boolean}
         */
        function isEventFromControl(event) {
          var forbiddenControls = ['md-slider'];
          var eventBubblePath = $mdUtil.getEventPath(event);

          // If there is no bubble path, then the event was not bubbled.
          if (!eventBubblePath || eventBubblePath.length === 0) {
            return forbiddenControls.indexOf(event.target.tagName.toLowerCase()) !== -1;
          }

          // We iterate the event bubble path up and check for a possible component.
          // Our maximum index to search, is the list item root.
          var maxPath = eventBubblePath.indexOf($element.children()[0]);

          for (var i = 0; i < maxPath; i++) {
            if (forbiddenControls.indexOf(eventBubblePath[i].tagName.toLowerCase()) !== -1) {
              return true;
            }
          }
          return false;
        }

        /**
         * @param {KeyboardEvent} keypressEvent
         */
        var clickChildKeypressListener = function(keypressEvent) {
          if (keypressEvent.target.nodeName !== 'INPUT' &&
              keypressEvent.target.nodeName !== 'TEXTAREA' &&
              !keypressEvent.target.isContentEditable) {
            var keyCode = keypressEvent.which || keypressEvent.keyCode;
            if (keyCode === $mdConstant.KEY_CODE.SPACE) {
              if (clickChild) {
                clickChild.click();
                keypressEvent.preventDefault();
                keypressEvent.stopPropagation();
              }
            }
          }
        };

        if (!hasClick && !proxies.length) {
          clickChild && clickChild.addEventListener('keypress', clickChildKeypressListener);
        }

        $element.off('click');
        $element.off('keypress');
        // Disable ng-aria's "helpful" keydown event that causes our ng-click handlers to be called
        // twice.
        $element.off('keydown');

        if (proxies.length === 1 && clickChild) {
          $element.children().eq(0).on('click', function(clickEvent) {
            // When the event is coming from a control and it should not trigger the proxied element
            // then we are skipping.
            if (isEventFromControl(clickEvent)) return;

            var parentButton = $mdUtil.getClosest(clickEvent.target, 'BUTTON');
            if (!parentButton && clickChild.contains(clickEvent.target)) {
              angular.forEach(proxies, function(proxy) {
                if (clickEvent.target !== proxy && !proxy.contains(clickEvent.target)) {
                  if (proxy.nodeName === 'MD-MENU') {
                    proxy = proxy.children[0];
                  }
                  angular.element(proxy).triggerHandler('click');
                }
              });
            }
          });
        }

        $scope.$on('$destroy', function () {
          clickChild && clickChild.removeEventListener('keypress', clickChildKeypressListener);
        });
      }
    }
  };
}

/*
 * @private
 * @ngdoc controller
 * @name MdListController
 * @module material.components.list
 */
function MdListController($scope, $element, $mdListInkRipple) {
  var ctrl = this;
  ctrl.attachRipple = attachRipple;

  function attachRipple (scope, element) {
    var options = {};
    $mdListInkRipple.attach(scope, element, options);
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.menu
 */

angular.module('material.components.menu', [
  'material.core',
  'material.components.backdrop'
]);

})();
(function(){
"use strict";



MenuController.$inject = ["$mdMenu", "$attrs", "$element", "$scope", "$mdUtil", "$timeout", "$rootScope", "$q", "$log"];
angular
    .module('material.components.menu')
    .controller('mdMenuCtrl', MenuController);

/**
 * @ngInject
 */
function MenuController($mdMenu, $attrs, $element, $scope, $mdUtil, $timeout, $rootScope, $q, $log) {

  var prefixer = $mdUtil.prefixer();
  var menuContainer;
  var self = this;
  var triggerElement;

  this.nestLevel = parseInt($attrs.mdNestLevel, 10) || 0;

  /**
   * Called by our linking fn to provide access to the menu-content
   * element removed during link
   */
  this.init = function init(setMenuContainer, opts) {
    opts = opts || {};
    menuContainer = setMenuContainer;

    // Default element for ARIA attributes has the ngClick or ngMouseenter expression
    triggerElement = $element[0].querySelector(prefixer.buildSelector(['ng-click', 'ng-mouseenter']));
    triggerElement.setAttribute('aria-expanded', 'false');

    this.isInMenuBar = opts.isInMenuBar;
    this.mdMenuBarCtrl = opts.mdMenuBarCtrl;
    this.nestedMenus = $mdUtil.nodesToArray(menuContainer[0].querySelectorAll('.md-nested-menu'));

    menuContainer.on('$mdInterimElementRemove', function() {
      self.isOpen = false;
      $mdUtil.nextTick(function(){ self.onIsOpenChanged(self.isOpen);});
    });
    $mdUtil.nextTick(function(){ self.onIsOpenChanged(self.isOpen);});

    var menuContainerId = 'menu_container_' + $mdUtil.nextUid();
    menuContainer.attr('id', menuContainerId);
    angular.element(triggerElement).attr({
      'aria-owns': menuContainerId,
      'aria-haspopup': 'true'
    });

    $scope.$on('$destroy', angular.bind(this, function() {
      this.disableHoverListener();
      $mdMenu.destroy();
    }));

    menuContainer.on('$destroy', function() {
      $mdMenu.destroy();
    });
  };

  var openMenuTimeout, menuItems, deregisterScopeListeners = [];
  this.enableHoverListener = function() {
    deregisterScopeListeners.push($rootScope.$on('$mdMenuOpen', function(event, el) {
      if (menuContainer[0].contains(el[0])) {
        self.currentlyOpenMenu = el.controller('mdMenu');
        self.isAlreadyOpening = false;
        self.currentlyOpenMenu.registerContainerProxy(self.triggerContainerProxy.bind(self));
      }
    }));
    deregisterScopeListeners.push($rootScope.$on('$mdMenuClose', function(event, el) {
      if (menuContainer[0].contains(el[0])) {
        self.currentlyOpenMenu = undefined;
      }
    }));
    menuItems = angular.element($mdUtil.nodesToArray(menuContainer[0].children[0].children));
    menuItems.on('mouseenter', self.handleMenuItemHover);
    menuItems.on('mouseleave', self.handleMenuItemMouseLeave);
  };

  this.disableHoverListener = function() {
    while (deregisterScopeListeners.length) {
      deregisterScopeListeners.shift()();
    }
    menuItems && menuItems.off('mouseenter', self.handleMenuItemHover);
    menuItems && menuItems.off('mouseleave', self.handleMenuItemMouseLeave);
  };

  this.handleMenuItemHover = function(event) {
    if (self.isAlreadyOpening) return;
    var nestedMenu = (
      event.target.querySelector('md-menu')
        || $mdUtil.getClosest(event.target, 'MD-MENU')
    );
    openMenuTimeout = $timeout(function() {
      if (nestedMenu) {
        nestedMenu = angular.element(nestedMenu).controller('mdMenu');
      }

      if (self.currentlyOpenMenu && self.currentlyOpenMenu != nestedMenu) {
        var closeTo = self.nestLevel + 1;
        self.currentlyOpenMenu.close(true, { closeTo: closeTo });
        self.isAlreadyOpening = !!nestedMenu;
        nestedMenu && nestedMenu.open();
      } else if (nestedMenu && !nestedMenu.isOpen && nestedMenu.open) {
        self.isAlreadyOpening = !!nestedMenu;
        nestedMenu && nestedMenu.open();
      }
    }, nestedMenu ? 100 : 250);
    var focusableTarget = event.currentTarget.querySelector('.md-button:not([disabled])');
    focusableTarget && focusableTarget.focus();
  };

  this.handleMenuItemMouseLeave = function() {
    if (openMenuTimeout) {
      $timeout.cancel(openMenuTimeout);
      openMenuTimeout = undefined;
    }
  };


  /**
   * Uses the $mdMenu interim element service to open the menu contents
   */
  this.open = function openMenu(ev) {
    ev && ev.stopPropagation();
    ev && ev.preventDefault();
    if (self.isOpen) return;
    self.enableHoverListener();
    self.isOpen = true;
    $mdUtil.nextTick(function(){ self.onIsOpenChanged(self.isOpen);});
    triggerElement = triggerElement || (ev ? ev.target : $element[0]);
    triggerElement.setAttribute('aria-expanded', 'true');
    $scope.$emit('$mdMenuOpen', $element);
    $mdMenu.show({
      scope: $scope,
      mdMenuCtrl: self,
      nestLevel: self.nestLevel,
      element: menuContainer,
      target: triggerElement,
      preserveElement: true,
      parent: 'body'
    }).finally(function() {
      triggerElement.setAttribute('aria-expanded', 'false');
      self.disableHoverListener();
    });
  };

  this.onIsOpenChanged = function(isOpen) {
    if (isOpen) {
      menuContainer.attr('aria-hidden', 'false');
      $element[0].classList.add('md-open');
      angular.forEach(self.nestedMenus, function(el) {
        el.classList.remove('md-open');
      });
    } else {
      menuContainer.attr('aria-hidden', 'true');
      $element[0].classList.remove('md-open');
    }
    $scope.$mdMenuIsOpen = self.isOpen;
  };

  this.focusMenuContainer = function focusMenuContainer() {
    var focusTarget = menuContainer[0]
      .querySelector(prefixer.buildSelector(['md-menu-focus-target', 'md-autofocus']));

    if (!focusTarget) focusTarget = menuContainer[0].querySelector('.md-button:not([disabled])');
    focusTarget.focus();
  };

  this.registerContainerProxy = function registerContainerProxy(handler) {
    this.containerProxy = handler;
  };

  this.triggerContainerProxy = function triggerContainerProxy(ev) {
    this.containerProxy && this.containerProxy(ev);
  };

  this.destroy = function() {
    return self.isOpen ? $mdMenu.destroy() : $q.when(false);
  };

  // Use the $mdMenu interim element service to close the menu contents
  this.close = function closeMenu(skipFocus, closeOpts) {
    if (!self.isOpen) return;
    self.isOpen = false;
    $mdUtil.nextTick(function(){ self.onIsOpenChanged(self.isOpen);});

    var eventDetails = angular.extend({}, closeOpts, { skipFocus: skipFocus });
    $scope.$emit('$mdMenuClose', $element, eventDetails);
    $mdMenu.hide(null, closeOpts);

    if (!skipFocus) {
      var el = self.restoreFocusTo || $element.find('button')[0];
      if (el instanceof angular.element) el = el[0];
      if (el) el.focus();
    }
  };

  /**
   * Build a nice object out of our string attribute which specifies the
   * target mode for left and top positioning
   */
  this.positionMode = function positionMode() {
    var attachment = ($attrs.mdPositionMode || 'target').split(' ');

    // If attachment is a single item, duplicate it for our second value.
    // ie. 'target' -> 'target target'
    if (attachment.length === 1) {
      attachment.push(attachment[0]);
    }

    return {
      left: attachment[0],
      top: attachment[1]
    };
  };

  /**
   * Build a nice object out of our string attribute which specifies
   * the offset of top and left in pixels.
   */
  this.offsets = function offsets() {
    var position = ($attrs.mdOffset || '0 0').split(' ').map(parseFloat);
    if (position.length === 2) {
      return {
        left: position[0],
        top: position[1]
      };
    } else if (position.length === 1) {
      return {
        top: position[0],
        left: position[0]
      };
    } else {
      throw Error('Invalid offsets specified. Please follow format <x, y> or <n>');
    }
  };

  // Functionality that is exposed in the view.
  $scope.$mdMenu = {
    open: this.open,
    close: this.close
  };

  // Deprecated APIs
  $scope.$mdOpenMenu = angular.bind(this, function() {
    $log.warn('mdMenu: The $mdOpenMenu method is deprecated. Please use `$mdMenu.open`.');
    return this.open.apply(this, arguments);
  });
}

})();
(function(){
"use strict";

/**
 * @ngdoc directive
 * @name mdMenu
 * @module material.components.menu
 * @restrict E
 * @description
 *
 * Menus are elements that open when clicked. They are useful for displaying
 * additional options within the context of an action.
 *
 * Every `md-menu` must specify exactly two child elements. The first element is what is
 * left in the DOM and is used to open the menu. This element is called the trigger element.
 * The trigger element's scope has access to `$mdMenu.open($event)`
 * which it may call to open the menu. By passing $event as argument, the
 * corresponding event is stopped from propagating up the DOM-tree. Similarly, `$mdMenu.close()`
 * can be used to close the menu.
 *
 * The second element is the `md-menu-content` element which represents the
 * contents of the menu when it is open. Typically this will contain `md-menu-item`s,
 * but you can do custom content as well.
 *
 * <hljs lang="html">
 * <md-menu>
 *  <!-- Trigger element is a md-button with an icon -->
 *  <md-button ng-click="$mdMenu.open($event)" class="md-icon-button" aria-label="Open sample menu">
 *    <md-icon md-svg-icon="call:phone"></md-icon>
 *  </md-button>
 *  <md-menu-content>
 *    <md-menu-item><md-button ng-click="doSomething()">Do Something</md-button></md-menu-item>
 *  </md-menu-content>
 * </md-menu>
 * </hljs>

 * ## Sizing Menus
 *
 * The width of the menu when it is open may be specified by specifying a `width`
 * attribute on the `md-menu-content` element.
 * See the [Material Design Spec](https://material.io/archive/guidelines/components/menus.html#menus-simple-menus)
 * for more information.
 *
 * ## Menu Density
 *
 * You can use dense menus by adding the `md-dense` class to the `md-menu-content` element.
 * This reduces the height of menu items, their top and bottom padding, and default font size.
 * Without the `md-dense` class, we use the "mobile" height of `48px`. With the `md-dense` class,
 * we use the "desktop" height of `32px`. We do not support the "dense desktop" option in the spec,
 * which uses a height of `24px`, at this time.
 * See the [Menu Specs](https://material.io/archive/guidelines/components/menus.html#menus-specs)
 * section of the Material Design Spec for more information.
 *
 * ## Aligning Menus
 *
 * When a menu opens, it is important that the content aligns with the trigger element.
 * Failure to align menus can result in jarring experiences for users as content
 * suddenly shifts. To help with this, `md-menu` provides several APIs to help
 * with alignment.
 *
 * ### Target Mode
 *
 * By default, `md-menu` will attempt to align the `md-menu-content` by aligning
 * designated child elements in both the trigger and the menu content.
 *
 * To specify the alignment element in the `trigger` you can use the `md-menu-origin`
 * attribute on a child element. If no `md-menu-origin` is specified, the `md-menu`
 * will be used as the origin element.
 *
 * Similarly, the `md-menu-content` may specify a `md-menu-align-target` for a
 * `md-menu-item` to specify the node that it should try and align with.
 *
 * In this example code, we specify an icon to be our origin element, and an
 * icon in our menu content to be our alignment target. This ensures that both
 * icons are aligned when the menu opens.
 *
 * <hljs lang="html">
 * <md-menu>
 *  <md-button ng-click="$mdMenu.open($event)" class="md-icon-button" aria-label="Open some menu">
 *    <md-icon md-menu-origin md-svg-icon="call:phone"></md-icon>
 *  </md-button>
 *  <md-menu-content>
 *    <md-menu-item>
 *      <md-button ng-click="doSomething()" aria-label="Do something">
 *        <md-icon md-menu-align-target md-svg-icon="call:phone"></md-icon>
 *        Do Something
 *      </md-button>
 *    </md-menu-item>
 *  </md-menu-content>
 * </md-menu>
 * </hljs>
 *
 * ### Position Mode
 *
 * We can specify the origin of the menu by using the `md-position-mode` attribute.
 * This attribute allows specifying the positioning by the `x` and `y` axes.
 *
 * The default mode is `target target`. This mode uses the left and top edges of the origin element
 * to position the menu in LTR layouts. The `x` axis modes will adjust when in RTL layouts.
 *
 * Sometimes you want to specify alignment from the right side of a origin element. For example,
 * if we have a menu on the right side a toolbar, we may want to right align our menu content.
 * We can use `target-right target` to specify a right-oriented alignment target.
 * There is a working example of this in the Menu Position Modes demo.
 *
 * #### Horizontal Positioning Options
 * - `target`
 * - `target-left`
 * - `target-right`
 * - `cascade`
 * - `right`
 * - `left`
 *
 * #### Vertical Positioning Options
 * - `target`
 * - `cascade`
 * - `bottom`
 *
 * ### Menu Offsets
 *
 * It is sometimes unavoidable to need to have a deeper level of control for
 * the positioning of a menu to ensure perfect alignment. `md-menu` provides
 * the `md-offset` attribute to allow pixel-level specificity when adjusting
 * menu positioning.
 *
 * This offset is provided in the format of `x y` or `n` where `n` will be used
 * in both the `x` and `y` axis.
 * For example, to move a menu by `2px` down from the top, we can use:
 *
 * <hljs lang="html">
 * <md-menu md-offset="0 2">
 *   <!-- menu-content -->
 * </md-menu>
 * </hljs>
 *
 * Specifying `md-offset="2 2"` would shift the menu two pixels down and two pixels to the right.
 *
 * ### Auto Focus
 * By default, when a menu opens, `md-menu` focuses the first button in the menu content.
 *
 * Sometimes you would like to focus another menu item instead of the first.<br/>
 * This can be done by applying the `md-autofocus` directive on the given element.
 *
 * <hljs lang="html">
 * <md-menu-item>
 *   <md-button md-autofocus ng-click="doSomething()">
 *     Auto Focus
 *   </md-button>
 * </md-menu-item>
 * </hljs>
 *
 *
 * ### Preventing close
 *
 * Sometimes you would like to be able to click on a menu item without having the menu
 * close. To do this, AngularJS Material exposes the `md-prevent-menu-close` attribute which
 * can be added to a button inside a menu to stop the menu from automatically closing.
 * You can then close the menu either by using `$mdMenu.close()` in the template,
 * or programmatically by injecting `$mdMenu` and calling `$mdMenu.hide()`.
 *
 * <hljs lang="html">
 * <md-menu-content ng-mouseleave="$mdMenu.close()">
 *   <md-menu-item>
 *     <md-button ng-click="doSomething()" aria-label="Do something" md-prevent-menu-close="md-prevent-menu-close">
 *       <md-icon md-menu-align-target md-svg-icon="call:phone"></md-icon>
 *       Do Something
 *     </md-button>
 *   </md-menu-item>
 * </md-menu-content>
 * </hljs>
 *
 * @usage
 * <hljs lang="html">
 * <md-menu>
 *  <md-button ng-click="$mdMenu.open($event)" class="md-icon-button">
 *    <md-icon md-svg-icon="call:phone"></md-icon>
 *  </md-button>
 *  <md-menu-content>
 *    <md-menu-item><md-button ng-click="doSomething()">Do Something</md-button></md-menu-item>
 *  </md-menu-content>
 * </md-menu>
 * </hljs>
 *
 * @param {string=} md-position-mode Specify pre-defined position modes for the `x` and `y` axes.
 *  The default modes are `target target`. This positions the origin of the menu using the left and top edges
 *  of the origin element in LTR layouts.<br>
 *  #### Valid modes for horizontal positioning
 * - `target`
 * - `target-left`
 * - `target-right`
 * - `cascade`
 * - `right`
 * - `left`<br>
 *  #### Valid modes for vertical positioning
 * - `target`
 * - `cascade`
 * - `bottom`
 * @param {string=} md-offset An offset to apply to the dropdown on opening, after positioning.
 *  Defined as `x` and `y` pixel offset values in the form of `x y`.<br>
 *  The default value is `0 0`.
 */
MenuDirective.$inject = ["$mdUtil"];
angular
    .module('material.components.menu')
    .directive('mdMenu', MenuDirective);

/**
 * @ngInject
 */
function MenuDirective($mdUtil) {
  var INVALID_PREFIX = 'Invalid HTML for md-menu: ';
  return {
    restrict: 'E',
    require: ['mdMenu', '?^mdMenuBar'],
    controller: 'mdMenuCtrl', // empty function to be built by link
    scope: true,
    compile: compile
  };

  function compile(templateElement) {
    templateElement.addClass('md-menu');

    var triggerEl = templateElement.children()[0];
    var prefixer = $mdUtil.prefixer();

    if (!prefixer.hasAttribute(triggerEl, 'ng-click')) {
      triggerEl = triggerEl
          .querySelector(prefixer.buildSelector(['ng-click', 'ng-mouseenter'])) || triggerEl;
    }

    var isButtonTrigger = triggerEl.nodeName === 'MD-BUTTON' || triggerEl.nodeName === 'BUTTON';

    if (triggerEl && isButtonTrigger && !triggerEl.hasAttribute('type')) {
      triggerEl.setAttribute('type', 'button');
    }

    if (!triggerEl) {
      throw Error(INVALID_PREFIX + 'Expected the menu to have a trigger element.');
    }

    if (templateElement.children().length !== 2) {
      throw Error(INVALID_PREFIX + 'Expected two children elements. The second element must have a `md-menu-content` element.');
    }

    // Default element for ARIA attributes has the ngClick or ngMouseenter expression
    triggerEl && triggerEl.setAttribute('aria-haspopup', 'true');

    var nestedMenus = templateElement[0].querySelectorAll('md-menu');
    var nestingDepth = parseInt(templateElement[0].getAttribute('md-nest-level'), 10) || 0;
    if (nestedMenus) {
      angular.forEach($mdUtil.nodesToArray(nestedMenus), function(menuEl) {
        if (!menuEl.hasAttribute('md-position-mode')) {
          menuEl.setAttribute('md-position-mode', 'cascade');
        }
        menuEl.classList.add('_md-nested-menu');
        menuEl.setAttribute('md-nest-level', nestingDepth + 1);
      });
    }
    return link;
  }

  function link(scope, element, attr, ctrls) {
    var mdMenuCtrl = ctrls[0];
    var isInMenuBar = !!ctrls[1];
    var mdMenuBarCtrl = ctrls[1];
    // Move everything into a md-menu-container and pass it to the controller
    var menuContainer = angular.element('<div class="_md md-open-menu-container md-whiteframe-z2"></div>');
    var menuContents = element.children()[1];

    element.addClass('_md');     // private md component indicator for styling

    if (!menuContents.hasAttribute('role')) {
      menuContents.setAttribute('role', 'menu');
    }
    menuContainer.append(menuContents);

    element.on('$destroy', function() {
      menuContainer.remove();
    });

    element.append(menuContainer);
    menuContainer[0].style.display = 'none';
    mdMenuCtrl.init(menuContainer, { isInMenuBar: isInMenuBar, mdMenuBarCtrl: mdMenuBarCtrl });
  }
}

})();
(function(){
"use strict";


MenuProvider.$inject = ["$$interimElementProvider"];angular
  .module('material.components.menu')
  .provider('$mdMenu', MenuProvider);

/**
 * Interim element provider for the menu.
 * Handles behavior for a menu while it is open, including:
 *    - handling animating the menu opening/closing
 *    - handling key/mouse events on the menu element
 *    - handling enabling/disabling scroll while the menu is open
 *    - handling redrawing during resizes and orientation changes
 *
 */

function MenuProvider($$interimElementProvider) {
  menuDefaultOptions.$inject = ["$mdUtil", "$mdTheming", "$mdConstant", "$document", "$window", "$q", "$$rAF", "$animateCss", "$animate", "$log"];
  var MENU_EDGE_MARGIN = 8;

  return $$interimElementProvider('$mdMenu')
    .setDefaults({
      methods: ['target'],
      options: menuDefaultOptions
    });

  /* @ngInject */
  function menuDefaultOptions($mdUtil, $mdTheming, $mdConstant, $document, $window, $q, $$rAF,
                              $animateCss, $animate, $log) {

    var prefixer = $mdUtil.prefixer();
    var animator = $mdUtil.dom.animator;

    return {
      parent: 'body',
      onShow: onShow,
      onRemove: onRemove,
      hasBackdrop: true,
      disableParentScroll: true,
      skipCompile: true,
      preserveScope: true,
      multiple: true,
      themable: true
    };

    /**
     * Show modal backdrop element...
     * @returns {function(): void} A function that removes this backdrop
     */
    function showBackdrop(scope, element, options) {
      if (options.nestLevel) return angular.noop;

      // If we are not within a dialog...
      if (options.disableParentScroll && !$mdUtil.getClosest(options.target, 'MD-DIALOG')) {
        // !! DO this before creating the backdrop; since disableScrollAround()
        //    configures the scroll offset; which is used by mdBackDrop postLink()
        options.restoreScroll = $mdUtil.disableScrollAround(options.element, options.parent);
      } else {
        options.disableParentScroll = false;
      }

      if (options.hasBackdrop) {
        options.backdrop = $mdUtil.createBackdrop(scope, "md-menu-backdrop md-click-catcher");

        $animate.enter(options.backdrop, $document[0].body);
      }

      /**
       * Hide and destroys the backdrop created by showBackdrop()
       */
      return function hideBackdrop() {
        if (options.backdrop) options.backdrop.remove();
        if (options.disableParentScroll) options.restoreScroll();
      };
    }

    /**
     * Removing the menu element from the DOM and remove all associated event listeners
     * and backdrop
     */
    function onRemove(scope, element, opts) {
      opts.cleanupInteraction();
      opts.cleanupBackdrop();
      opts.cleanupResizing();
      opts.hideBackdrop();

      // Before the menu is closing remove the clickable class.
      element.removeClass('md-clickable');

      // For navigation $destroy events, do a quick, non-animated removal,
      // but for normal closes (from clicks, etc) animate the removal

      return (opts.$destroy === true) ? detachAndClean() : animateRemoval().then(detachAndClean);

      /**
       * For normal closes, animate the removal.
       * For forced closes (like $destroy events), skip the animations
       */
      function animateRemoval() {
        return $animateCss(element, {addClass: 'md-leave'}).start();
      }

      /**
       * Detach the element
       */
      function detachAndClean() {
        element.removeClass('md-active');
        detachElement(element, opts);
        opts.alreadyOpen = false;
      }

    }

    /**
     * Inserts and configures the staged Menu element into the DOM, positioning it,
     * and wiring up various interaction events
     */
    function onShow(scope, element, opts) {
      sanitizeAndConfigure(opts);

      if (opts.menuContentEl[0]) {
        // Inherit the theme from the target element.
        $mdTheming.inherit(opts.menuContentEl, opts.target);
      } else {
        $log.warn(
          '$mdMenu: Menu elements should always contain a `md-menu-content` element,' +
          'otherwise interactivity features will not work properly.',
          element
        );
      }

      // Register various listeners to move menu on resize/orientation change
      opts.cleanupResizing = startRepositioningOnResize();
      opts.hideBackdrop = showBackdrop(scope, element, opts);

      // Return the promise for when our menu is done animating in
      return showMenu()
        .then(function(response) {
          opts.alreadyOpen = true;
          opts.cleanupInteraction = activateInteraction();
          opts.cleanupBackdrop = setupBackdrop();

          // Since the menu finished its animation, mark the menu as clickable.
          element.addClass('md-clickable');

          return response;
        });

      /**
       * Place the menu into the DOM and call positioning related functions
       */
      function showMenu() {
        opts.parent.append(element);
        element[0].style.display = '';

        return $q(function(resolve) {
          var position = calculateMenuPosition(element, opts);

          element.removeClass('md-leave');

          // Animate the menu scaling, and opacity [from its position origin (default == top-left)]
          // to normal scale.
          $animateCss(element, {
            addClass: 'md-active',
            from: animator.toCss(position),
            to: animator.toCss({transform: ''})
          })
          .start()
          .then(resolve);

        });
      }

      /**
       * Check for valid opts and set some sane defaults
       */
      function sanitizeAndConfigure() {
        if (!opts.target) {
          throw Error(
            '$mdMenu.show() expected a target to animate from in options.target'
          );
        }
        angular.extend(opts, {
          alreadyOpen: false,
          isRemoved: false,
          target: angular.element(opts.target), // make sure it's not a naked DOM node
          parent: angular.element(opts.parent),
          menuContentEl: angular.element(element[0].querySelector('md-menu-content'))
        });
      }

      /**
       * Configure various resize listeners for screen changes
       */
      function startRepositioningOnResize() {

        var repositionMenu = (function(target, options) {
          return $$rAF.throttle(function() {
            if (opts.isRemoved) return;
            var position = calculateMenuPosition(target, options);

            target.css(animator.toCss(position));
          });
        })(element, opts);

        $window.addEventListener('resize', repositionMenu);
        $window.addEventListener('orientationchange', repositionMenu);

        return function stopRepositioningOnResize() {

          // Disable resizing handlers
          $window.removeEventListener('resize', repositionMenu);
          $window.removeEventListener('orientationchange', repositionMenu);

        };
      }

      /**
       * Sets up the backdrop and listens for click elements.
       * Once the backdrop will be clicked, the menu will automatically close.
       * @returns {!Function} Function to remove the backdrop.
       */
      function setupBackdrop() {
        if (!opts.backdrop) return angular.noop;

        opts.backdrop.on('click', onBackdropClick);

        return function() {
          opts.backdrop.off('click', onBackdropClick);
        };
      }

      /**
       * Function to be called whenever the backdrop is clicked.
       * @param {!MouseEvent} event
       */
      function onBackdropClick(event) {
        event.preventDefault();
        event.stopPropagation();

        scope.$apply(function() {
          opts.mdMenuCtrl.close(true, { closeAll: true });
        });
      }

      /**
       * Activate interaction on the menu. Resolves the focus target and closes the menu on
       * escape or option click.
       * @returns {!Function} Function to deactivate the interaction listeners.
       */
      function activateInteraction() {
        if (!opts.menuContentEl[0]) return angular.noop;

        // Wire up keyboard listeners.
        // - Close on escape,
        // - focus next item on down arrow,
        // - focus prev item on up
        opts.menuContentEl.on('keydown', onMenuKeyDown);
        opts.menuContentEl[0].addEventListener('click', captureClickListener, true);

        // kick off initial focus in the menu on the first enabled element
        var focusTarget = opts.menuContentEl[0]
          .querySelector(prefixer.buildSelector(['md-menu-focus-target', 'md-autofocus']));

        if (!focusTarget) {
          var childrenLen = opts.menuContentEl[0].children.length;
          for (var childIndex = 0; childIndex < childrenLen; childIndex++) {
            var child = opts.menuContentEl[0].children[childIndex];
            focusTarget = child.querySelector('.md-button:not([disabled])');
            if (focusTarget) {
              break;
            }
            if (child.firstElementChild && !child.firstElementChild.disabled) {
              focusTarget = child.firstElementChild;
              break;
            }
          }
        }

        focusTarget && focusTarget.focus();

        return function cleanupInteraction() {
          opts.menuContentEl.off('keydown', onMenuKeyDown);
          opts.menuContentEl[0].removeEventListener('click', captureClickListener, true);
        };

        // ************************************
        // internal functions
        // ************************************

        function onMenuKeyDown(ev) {
          var handled;
          switch (ev.keyCode) {
            case $mdConstant.KEY_CODE.ESCAPE:
              if (opts.nestLevel) {
                opts.mdMenuCtrl.close();
              } else {
                opts.mdMenuCtrl.close(false, { closeAll: true });
              }
              handled = true;
              break;
            case $mdConstant.KEY_CODE.TAB:
              opts.mdMenuCtrl.close(false, { closeAll: true });
              // Don't prevent default or stop propagation on this event as we want tab
              // to move the focus to the next focusable element on the page.
              handled = false;
              break;
            case $mdConstant.KEY_CODE.UP_ARROW:
              if (!focusMenuItem(ev, opts.menuContentEl, opts, -1) && !opts.nestLevel) {
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              }
              handled = true;
              break;
            case $mdConstant.KEY_CODE.DOWN_ARROW:
              if (!focusMenuItem(ev, opts.menuContentEl, opts, 1) && !opts.nestLevel) {
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              }
              handled = true;
              break;
            case $mdConstant.KEY_CODE.LEFT_ARROW:
              if (opts.nestLevel) {
                opts.mdMenuCtrl.close();
              } else {
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              }
              handled = true;
              break;
            case $mdConstant.KEY_CODE.RIGHT_ARROW:
              var parentMenu = $mdUtil.getClosest(ev.target, 'MD-MENU');
              if (parentMenu && parentMenu != opts.parent[0]) {
                ev.target.click();
              } else {
                opts.mdMenuCtrl.triggerContainerProxy(ev);
              }
              handled = true;
              break;
          }
          if (handled) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
          }
        }

        function onBackdropClick(e) {
          e.preventDefault();
          e.stopPropagation();
          scope.$apply(function() {
            opts.mdMenuCtrl.close(true, { closeAll: true });
          });
        }

        // Close menu on menu item click, if said menu-item is not disabled
        function captureClickListener(e) {
          var target = e.target;
          // Traverse up the event until we get to the menuContentEl to see if
          // there is an ng-click and that the ng-click is not disabled
          do {
            if (target == opts.menuContentEl[0]) return;
            if ((hasAnyAttribute(target, ['ng-click', 'ng-href', 'ui-sref']) ||
                target.nodeName == 'BUTTON' || target.nodeName == 'MD-BUTTON') && !hasAnyAttribute(target, ['md-prevent-menu-close'])) {
              var closestMenu = $mdUtil.getClosest(target, 'MD-MENU');
              if (!target.hasAttribute('disabled') && (!closestMenu || closestMenu == opts.parent[0])) {
                close();
              }
              break;
            }
          } while (target = target.parentNode);

          function close() {
            scope.$apply(function() {
              opts.mdMenuCtrl.close(true, { closeAll: true });
            });
          }

          function hasAnyAttribute(target, attrs) {
            if (!target) return false;

            for (var i = 0, attr; attr = attrs[i]; ++i) {
              if (prefixer.hasAttribute(target, attr)) {
                return true;
              }
            }

            return false;
          }
        }

      }
    }

    /**
     * Takes a keypress event and focuses the next/previous menu
     * item from the emitting element
     * @param {event} e - The origin keypress event
     * @param {angular.element} menuEl - The menu element
     * @param {object} opts - The interim element options for the mdMenu
     * @param {number} direction - The direction to move in (+1 = next, -1 = prev)
     */
    function focusMenuItem(e, menuEl, opts, direction) {
      var currentItem = $mdUtil.getClosest(e.target, 'MD-MENU-ITEM');

      var items = $mdUtil.nodesToArray(menuEl[0].children);
      var currentIndex = items.indexOf(currentItem);

      // Traverse through our elements in the specified direction (+/-1) and try to
      // focus them until we find one that accepts focus
      var didFocus;
      for (var i = currentIndex + direction; i >= 0 && i < items.length; i = i + direction) {
        var focusTarget = items[i].querySelector('.md-button');
        didFocus = attemptFocus(focusTarget);
        if (didFocus) {
          break;
        }
      }
      return didFocus;
    }

    /**
     * Attempts to focus an element. Checks whether that element is the currently
     * focused element after attempting.
     * @param {HTMLElement} el - the element to attempt focus on
     * @returns {boolean} - whether the element was successfully focused
     */
    function attemptFocus(el) {
      if (el && el.getAttribute('tabindex') != -1) {
        el.focus();
        return ($document[0].activeElement == el);
      }
    }

    /**
     * Use browser to remove this element without triggering a $destroy event
     */
    function detachElement(element, opts) {
      if (!opts.preserveElement) {
        if (toNode(element).parentNode === toNode(opts.parent)) {
          toNode(opts.parent).removeChild(toNode(element));
        }
      } else {
        toNode(element).style.display = 'none';
      }
    }

    /**
     * Computes menu position and sets the style on the menu container
     * @param {HTMLElement} el - the menu container element
     * @param {object} opts - the interim element options object
     */
    function calculateMenuPosition(el, opts) {

      var containerNode = el[0],
        openMenuNode = el[0].firstElementChild,
        openMenuNodeRect = openMenuNode.getBoundingClientRect(),
        boundryNode = $document[0].body,
        boundryNodeRect = boundryNode.getBoundingClientRect();

      var menuStyle = $window.getComputedStyle(openMenuNode);

      var originNode = opts.target[0].querySelector(prefixer.buildSelector('md-menu-origin')) || opts.target[0],
        originNodeRect = originNode.getBoundingClientRect();

      var bounds = {
        left: boundryNodeRect.left + MENU_EDGE_MARGIN,
        top: Math.max(boundryNodeRect.top, 0) + MENU_EDGE_MARGIN,
        bottom: Math.max(boundryNodeRect.bottom, Math.max(boundryNodeRect.top, 0) + boundryNodeRect.height) - MENU_EDGE_MARGIN,
        right: boundryNodeRect.right - MENU_EDGE_MARGIN
      };

      var alignTarget, alignTargetRect = { top:0, left : 0, right:0, bottom:0 }, existingOffsets  = { top:0, left : 0, right:0, bottom:0  };
      var positionMode = opts.mdMenuCtrl.positionMode();

      if (positionMode.top === 'target' || positionMode.left === 'target' || positionMode.left === 'target-right') {
        alignTarget = firstVisibleChild();
        if (alignTarget) {
          // TODO: Allow centering on an arbitrary node, for now center on first menu-item's child
          alignTarget = alignTarget.firstElementChild || alignTarget;
          alignTarget = alignTarget.querySelector(prefixer.buildSelector('md-menu-align-target')) || alignTarget;
          alignTargetRect = alignTarget.getBoundingClientRect();

          existingOffsets = {
            top: parseFloat(containerNode.style.top || 0),
            left: parseFloat(containerNode.style.left || 0)
          };
        }
      }

      var position = {};
      var transformOrigin = 'top ';

      switch (positionMode.top) {
        case 'target':
          position.top = existingOffsets.top + originNodeRect.top - alignTargetRect.top;
          break;
        case 'cascade':
          position.top = originNodeRect.top - parseFloat(menuStyle.paddingTop) - originNode.style.top;
          break;
        case 'bottom':
          position.top = originNodeRect.top + originNodeRect.height;
          break;
        default:
          throw new Error('Invalid target mode "' + positionMode.top + '" specified for md-menu on Y axis.');
      }

      var rtl = $mdUtil.isRtl(el);

      switch (positionMode.left) {
        case 'target':
          position.left = existingOffsets.left + originNodeRect.left - alignTargetRect.left;
          transformOrigin += rtl ? 'right'  : 'left';
          break;
        case 'target-left':
          position.left = originNodeRect.left;
          transformOrigin += 'left';
          break;
        case 'target-right':
          position.left = originNodeRect.right - openMenuNodeRect.width + (openMenuNodeRect.right - alignTargetRect.right);
          transformOrigin += 'right';
          break;
        case 'cascade':
          var willFitRight = rtl ? (originNodeRect.left - openMenuNodeRect.width) < bounds.left : (originNodeRect.right + openMenuNodeRect.width) < bounds.right;
          position.left = willFitRight ? originNodeRect.right - originNode.style.left : originNodeRect.left - originNode.style.left - openMenuNodeRect.width;
          transformOrigin += willFitRight ? 'left' : 'right';
          break;
        case 'right':
          if (rtl) {
            position.left = originNodeRect.right - originNodeRect.width;
            transformOrigin += 'left';
          } else {
            position.left = originNodeRect.right - openMenuNodeRect.width;
            transformOrigin += 'right';
          }
          break;
        case 'left':
          if (rtl) {
            position.left = originNodeRect.right - openMenuNodeRect.width;
            transformOrigin += 'right';
          } else {
            position.left = originNodeRect.left;
            transformOrigin += 'left';
          }
          break;
        default:
          throw new Error('Invalid target mode "' + positionMode.left + '" specified for md-menu on X axis.');
      }

      var offsets = opts.mdMenuCtrl.offsets();
      position.top += offsets.top;
      position.left += offsets.left;

      clamp(position);

      var scaleX = Math.round(100 * Math.min(originNodeRect.width / containerNode.offsetWidth, 1.0)) / 100;
      var scaleY = Math.round(100 * Math.min(originNodeRect.height / containerNode.offsetHeight, 1.0)) / 100;

      return {
        top: Math.round(position.top),
        left: Math.round(position.left),
        // Animate a scale out if we aren't just repositioning
        transform: !opts.alreadyOpen ? $mdUtil.supplant('scale({0},{1})', [scaleX, scaleY]) : undefined,
        transformOrigin: transformOrigin
      };

      /**
       * Clamps the repositioning of the menu within the confines of
       * bounding element (often the screen/body)
       */
      function clamp(pos) {
        pos.top = Math.max(Math.min(pos.top, bounds.bottom - containerNode.offsetHeight), bounds.top);
        pos.left = Math.max(Math.min(pos.left, bounds.right - containerNode.offsetWidth), bounds.left);
      }

      /**
       * Gets the first visible child in the openMenuNode
       * Necessary incase menu nodes are being dynamically hidden
       */
      function firstVisibleChild() {
        for (var i = 0; i < openMenuNode.children.length; ++i) {
          if ($window.getComputedStyle(openMenuNode.children[i]).display != 'none') {
            return openMenuNode.children[i];
          }
        }
      }
    }
  }
  function toNode(el) {
    if (el instanceof angular.element) {
      el = el[0];
    }
    return el;
  }
}

})();
(function(){
"use strict";

/**
 * @ngdoc module
 * @name material.components.menuBar
 */

angular.module('material.components.menuBar', [
  'material.core',
  'material.components.icon',
  'material.components.menu'
]);

})();
(function(){
"use strict";


MenuBarController.$inject = ["$scope", "$rootScope", "$element", "$attrs", "$mdConstant", "$document", "$mdUtil", "$timeout"];
angular
  .module('material.components.menuBar')
  .controller('MenuBarController', MenuBarController);

var BOUND_MENU_METHODS = ['handleKeyDown', 'handleMenuHover', 'scheduleOpenHoveredMenu', 'cancelScheduledOpen'];

/**
 * @ngInject
 */
function MenuBarController($scope, $rootScope, $element, $attrs, $mdConstant, $document, $mdUtil, $timeout) {
  this.$element = $element;
  this.$attrs = $attrs;
  this.$mdConstant = $mdConstant;
  this.$mdUtil = $mdUtil;
  this.$document = $document;
  this.$scope = $scope;
  this.$rootScope = $rootScope;
  this.$timeout = $timeout;

  var self = this;
  angular.forEach(BOUND_MENU_METHODS, function(methodName) {
    self[methodName] = angular.bind(self, self[methodName]);
  });
}

MenuBarController.prototype.init = function() {
  var $element = this.$element;
  var $mdUtil = this.$mdUtil;
  var $scope = this.$scope;

  var self = this;
  var deregisterFns = [];
  $element.on('keydown', this.handleKeyDown);
  this.parentToolbar = $mdUtil.getClosest($element, 'MD-TOOLBAR');

  deregisterFns.push(this.$rootScope.$on('$mdMenuOpen', function(event, el) {
    if (self.getMenus().indexOf(el[0]) != -1) {
      $element[0].classList.add('md-open');
      el[0].classList.add('md-open');
      self.currentlyOpenMenu = el.controller('mdMenu');
      self.currentlyOpenMenu.registerContainerProxy(self.handleKeyDown);
      self.enableOpenOnHover();
    }
  }));

  deregisterFns.push(this.$rootScope.$on('$mdMenuClose', function(event, el, opts) {
    var rootMenus = self.getMenus();
    if (rootMenus.indexOf(el[0]) != -1) {
      $element[0].classList.remove('md-open');
      el[0].classList.remove('md-open');
    }

    var ctrl = angular.element(el[0]).controller('mdMenu');
    if (ctrl.isInMenuBar && ctrl.mdMenuBarCtrl === self) {
      var parentMenu = el[0];
      while (parentMenu && rootMenus.indexOf(parentMenu) == -1) {
        parentMenu = $mdUtil.getClosest(parentMenu, 'MD-MENU', true);
      }
      if (parentMenu) {
        if (!opts.skipFocus) parentMenu.querySelector('button:not([disabled])').focus();
        self.currentlyOpenMenu = undefined;
      }
      self.disableOpenOnHover();
      self.setKeyboardMode(true);
    }
  }));

  $scope.$on('$destroy', function() {
    self.disableOpenOnHover();
    while (deregisterFns.length) {
      deregisterFns.shift()();
    }
  });


  this.setKeyboardMode(true);
};

MenuBarController.prototype.setKeyboardMode = function(enabled) {
  if (enabled) this.$element[0].classList.add('md-keyboard-mode');
  else this.$element[0].classList.remove('md-keyboard-mode');
};

MenuBarController.prototype.enableOpenOnHover = function() {
  if (this.openOnHoverEnabled) return;

  var self = this;

  self.openOnHoverEnabled = true;

  if (self.parentToolbar) {
    self.parentToolbar.classList.add('md-has-open-menu');

    // Needs to be on the next tick so it doesn't close immediately.
    self.$mdUtil.nextTick(function() {
      angular.element(self.parentToolbar).on('click', self.handleParentClick);
    }, false);
  }

  angular
    .element(self.getMenus())
    .on('mouseenter', self.handleMenuHover);
};

MenuBarController.prototype.handleMenuHover = function(e) {
  this.setKeyboardMode(false);
  if (this.openOnHoverEnabled) {
    this.scheduleOpenHoveredMenu(e);
  }
};

MenuBarController.prototype.disableOpenOnHover = function() {
  if (!this.openOnHoverEnabled) return;

  this.openOnHoverEnabled = false;

  if (this.parentToolbar) {
    this.parentToolbar.classList.remove('md-has-open-menu');
    angular.element(this.parentToolbar).off('click', this.handleParentClick);
  }

  angular
    .element(this.getMenus())
    .off('mouseenter', this.handleMenuHover);
};

MenuBarController.prototype.scheduleOpenHoveredMenu = function(e) {
  var menuEl = angular.element(e.currentTarget);
  var menuCtrl = menuEl.controller('mdMenu');
  this.setKeyboardMode(false);
  this.scheduleOpenMenu(menuCtrl);
};

MenuBarController.prototype.scheduleOpenMenu = function(menuCtrl) {
  var self = this;
  var $timeout = this.$timeout;
  if (menuCtrl != self.currentlyOpenMenu) {
    $timeout.cancel(self.pendingMenuOpen);
    self.pendingMenuOpen = $timeout(function() {
      self.pendingMenuOpen = undefined;
      if (self.currentlyOpenMenu) {
        self.currentlyOpenMenu.close(true, { closeAll: true });
      }
      menuCtrl.open();
    }, 200, false);
  }
};

MenuBarController.prototype.handleKeyDown = function(e) {
  var keyCodes = this.$mdConstant.KEY_CODE;
  var currentMenu = this.currentlyOpenMenu;
  var wasOpen = currentMenu && currentMenu.isOpen;
  this.setKeyboardMode(true);
  var handled, newMenu, newMenuCtrl;
  switch (e.keyCode) {
    case keyCodes.DOWN_ARROW:
      if (currentMenu) {
        currentMenu.focusMenuContainer();
      } else {
        this.openFocusedMenu();
      }
      handled = true;
      break;
    case keyCodes.UP_ARROW:
      currentMenu && currentMenu.close();
      handled = true;
      break;
    case keyCodes.LEFT_ARROW:
      newMenu = this.focusMenu(-1);
      if (wasOpen) {
        newMenuCtrl = angular.element(newMenu).controller('mdMenu');
        this.scheduleOpenMenu(newMenuCtrl);
      }
      handled = true;
      break;
    case keyCodes.RIGHT_ARROW:
      newMenu = this.focusMenu(+1);
      if (wasOpen) {
        newMenuCtrl = angular.element(newMenu).controller('mdMenu');
        this.scheduleOpenMenu(newMenuCtrl);
      }
      handled = true;
      break;
  }
  if (handled) {
    e && e.preventDefault && e.preventDefault();
    e && e.stopImmediatePropagation && e.stopImmediatePropagation();
  }
};

MenuBarController.prototype.focusMenu = function(direction) {
  var menus = this.getMenus();
  var focusedIndex = this.getFocusedMenuIndex();

  if (focusedIndex == -1) { focusedIndex = this.getOpenMenuIndex(); }

  var changed = false;

  if (focusedIndex == -1) { focusedIndex = 0; changed = true; }
  else if (
    direction < 0 && focusedIndex > 0 ||
    direction > 0 && focusedIndex < menus.length - direction
  ) {
    focusedIndex += direction;
    changed = true;
  }
  if (changed) {
    menus[focusedIndex].querySelector('button').focus();
    return menus[focusedIndex];
  }
};

MenuBarController.prototype.openFocusedMenu = function() {
  var menu = this.getFocusedMenu();
  menu && angular.element(menu).controller('mdMenu').open();
};

MenuBarController.prototype.getMenus = function() {
  var $element = this.$element;
  return this.$mdUtil.nodesToArray($element[0].children)
    .filter(function(el) { return el.nodeName == 'MD-MENU'; });
};

MenuBarController.prototype.getFocusedMenu = function() {
  return this.getMenus()[this.getFocusedMenuIndex()];
};

MenuBarController.prototype.getFocusedMenuIndex = function() {
  var $mdUtil = this.$mdUtil;
  var focusedEl = $mdUtil.getClosest(
    this.$document[0].activeElement,
    'MD-MENU'
  );
  if (!focusedEl) return -1;

  var focusedIndex = this.getMenus().indexOf(focusedEl);
  return focusedIndex;
};

MenuBarController.prototype.getOpenMenuIndex = function() {
  var menus = this.getMenus();
  for (var i = 0; i < menus.length; ++i) {
    if (menus[i].classList.contains('md-open')) return i;
  }
  return -1;
};

MenuBarController.prototype.handleParentClick = function(event) {
  var openMenu = this.querySelector('md-menu.md-open');

  if (openMenu && !openMenu.contains(event.target)) {
    angular.element(openMenu).controller('mdMenu').close(true, {
      closeAll: true
    });
  }
};

})();
(function(){
"use strict";

/**
 * @ngdoc directive
 * @name mdMenuBar
 * @module material.components.menuBar
 * @restrict E
 * @description
 *
 * Menu bars are containers that hold multiple menus. They change the behavior and appearance
 * of the `md-menu` directive to behave similar to an operating system provided menu.
 *
 * @usage
 * <hljs lang="html">
 * <md-menu-bar>
 *   <md-menu>
 *     <button ng-click="$mdMenu.open()">
 *       File
 *     </button>
 *     <md-menu-content>
 *       <md-menu-item>
 *         <md-button ng-click="ctrl.sampleAction('share', $event)">
 *           Share...
 *         </md-button>
 *       </md-menu-item>
 *       <md-menu-divider></md-menu-divider>
 *       <md-menu-item>
 *       <md-menu-item>
 *         <md-menu>
 *           <md-button ng-click="$mdMenu.open()">New</md-button>
 *           <md-menu-content>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Document', $event)">Document</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Spreadsheet', $event)">Spreadsheet</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Presentation', $event)">Presentation</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Form', $event)">Form</md-button></md-menu-item>
 *             <md-menu-item><md-button ng-click="ctrl.sampleAction('New Drawing', $event)">Drawing</md-button></md-menu-item>
 *           </md-menu-content>
 *         </md-menu>
 *       </md-menu-item>
 *     </md-menu-content>
 *   </md-menu>
 * </md-menu-bar>
 * </hljs>
 *
 * ## Menu Bar Controls
 *
 * You may place `md-menu-item`s that function as controls within menu bars.
 * There are two modes that are exposed via the `type` attribute of the `md-menu-item`.
 * `type="checkbox"` will function as a boolean control for the `ng-model` attribute of the
 * `md-menu-item`. `type="radio"` will function like a radio button, setting the `ngModel`
 * to the `string` value of the `value` attribute. If you need non-string values, you can use
 * `ng-value` to provide an expression (this is similar to how angular's native `input[type=radio]`
 * works.
 *
 * If you want either to disable closing the opened menu when clicked, you can add the
 * `md-prevent-menu-close` attribute to the `md-menu-item`. The attribute will be forwarded to the
 * `button` element that is generated.
 *
 * <hljs lang="html">
 * <md-menu-bar>
 *  <md-menu>
 *    <button ng-click="$mdMenu.open()">
 *      Sample Menu
 *    </button>
 *    <md-menu-content>
 *      <md-menu-item type="checkbox" ng-model="settings.allowChanges" md-prevent-menu-close>
 *        Allow changes
 *      </md-menu-item>
 *      <md-menu-divider></md-menu-divider>
 *      <md-menu-item type="radio" ng-model="settings.mode" ng-value="1">Mode 1</md-menu-item>
 *      <md-menu-item type="radio" ng-model="settings.mode" ng-value="2">Mode 2</md-menu-item>
 *      <md-menu-item type="radio" ng-model="settings.mode" ng-value="3">Mode 3</md-menu-item>
 *    </md-menu-content>
 *  </md-menu>
 * </md-menu-bar>
 * </hljs>
 *
 *
 * ### Nesting Menus
 *
 * Menus may be nested within menu bars. This is commonly called cascading menus.
 * To nest a menu place the nested menu inside the content of the `md-menu-item`.
 * <hljs lang="html">
 * <md-menu-item>
 *   <md-menu>
 *     <button ng-click="$mdMenu.open()">New</md-button>
 *     <md-menu-content>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Document', $event)">Document</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Spreadsheet', $event)">Spreadsheet</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Presentation', $event)">Presentation</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Form', $event)">Form</md-button></md-menu-item>
 *       <md-menu-item><md-button ng-click="ctrl.sampleAction('New Drawing', $event)">Drawing</md-button></md-menu-item>
 *     </md-menu-content>
 *   </md-menu>
 * </md-menu-item>
 * </hljs>
 *
 */

MenuBarDirective.$inject = ["$mdUtil", "$mdTheming"];
angular
  .module('material.components.menuBar')
  .directive('mdMenuBar', MenuBarDirective);

/* @ngInject */
function MenuBarDirective($mdUtil, $mdTheming) {
  return {
    restrict: 'E',
    require: 'mdMenuBar',
    controller: 'MenuBarController',

    compile: function compile(templateEl, templateAttrs) {
      if (!templateAttrs.ariaRole) {
        templateEl[0].setAttribute('role', 'menubar');
      }
      angular.forEach(templateEl[0].children, function(menuEl) {
        if (menuEl.nodeName == 'MD-MENU') {
          if (!menuEl.hasAttribute('md-position-mode')) {
            menuEl.setAttribute('md-position-mode', 'left bottom');

            // Since we're in the compile function and actual `md-buttons` are not compiled yet,
            // we need to query for possible `md-buttons` as well.
            menuEl.querySelector('button, a, md-button').setAttribute('role', 'menuitem');
          }
          var contentEls = $mdUtil.nodesToArray(menuEl.querySelectorAll('md-menu-content'));
          angular.forEach(contentEls, function(contentEl) {
            contentEl.classList.add('md-menu-bar-menu');
            contentEl.classList.add('md-dense');
            if (!contentEl.hasAttribute('width')) {
              contentEl.setAttribute('width', 5);
            }
          });
        }
      });

      // Mark the child menu items that they're inside a menu bar. This is necessary,
      // because mnMenuItem has special behaviour during compilation, depending on
      // whether it is inside a mdMenuBar. We can usually figure this out via the DOM,
      // however if a directive that uses documentFragment is applied to the child (e.g. ngRepeat),
      // the element won't have a parent and won't compile properly.
      templateEl.find('md-menu-item').addClass('md-in-menu-bar');

      return function postLink(scope, el, attr, ctrl) {
        el.addClass('_md');     // private md component indicator for styling
        $mdTheming(scope, el);
        ctrl.init();
      };
    }
  };

}

})();
(function(){
"use strict";


angular
  .module('material.components.menuBar')
  .directive('mdMenuDivider', MenuDividerDirective);


function MenuDividerDirective() {
  return {
    restrict: 'E',
    compile: function(templateEl, templateAttrs) {
      if (!templateAttrs.role) {
        templateEl[0].setAttribute('role', 'separator');
      }
    }
  };
}

})();
(function(){
"use strict";


MenuItemController.$inject = ["$scope", "$element", "$attrs"];
angular
  .module('material.components.menuBar')
  .controller('MenuItemController', MenuItemController);


/**
 * @ngInject
 */
function MenuItemController($scope, $element, $attrs) {
  this.$element = $element;
  this.$attrs = $attrs;
  this.$scope = $scope;
}

MenuItemController.prototype.init = function(ngModel) {
  var $element = this.$element;
  var $attrs = this.$attrs;

  this.ngModel = ngModel;
  if ($attrs.type == 'checkbox' || $attrs.type == 'radio') {
    this.mode  = $attrs.type;
    this.iconEl = $element[0].children[0];
    this.buttonEl = $element[0].children[1];
    if (ngModel) {
      // Clear ngAria set attributes
      this.initClickListeners();
    }
  }
};

// ngAria auto sets attributes on a menu-item with a ngModel.
// We don't want this because our content (buttons) get the focus
// and set their own aria attributes appropritately. Having both
// breaks NVDA / JAWS. This undeoes ngAria's attrs.
MenuItemController.prototype.clearNgAria = function() {
  var el = this.$element[0];
  var clearAttrs = ['role', 'tabindex', 'aria-invalid', 'aria-checked'];
  angular.forEach(clearAttrs, function(attr) {
    el.removeAttribute(attr);
  });
};

MenuItemController.prototype.initClickListeners = function() {
  var self = this;
  var ngModel = this.ngModel;
  var $scope = this.$scope;
  var $attrs = this.$attrs;
  var $element = this.$element;
  var mode = this.mode;

  this.handleClick = angular.bind(this, this.handleClick);

  var icon = this.iconEl;
  var button = angular.element(this.buttonEl);
  var handleClick = this.handleClick;

  $attrs.$observe('disabled', setDisabled);
  setDisabled($attrs.disabled);

  ngModel.$render = function render() {
    self.clearNgAria();
    if (isSelected()) {
      icon.style.display = '';
      button.attr('aria-checked', 'true');
    } else {
      icon.style.display = 'none';
      button.attr('aria-checked', 'false');
    }
  };

  $scope.$$postDigest(ngModel.$render);

  function isSelected() {
    if (mode == 'radio') {
      var val = $attrs.ngValue ? $scope.$eval($attrs.ngValue) : $attrs.value;
      return ngModel.$modelValue == val;
    } else {
      return ngModel.$modelValue;
    }
  }

  function setDisabled(disabled) {
    if (disabled) {
      button.off('click', handleClick);
    } else {
      button.on('click', handleClick);
    }
  }
};

MenuItemController.prototype.handleClick = function(e) {
  var mode = this.mode;
  var ngModel = this.ngModel;
  var $attrs = this.$attrs;
  var newVal;
  if (mode == 'checkbox') {
    newVal = !ngModel.$modelValue;
  } else if (mode == 'radio') {
    newVal = $attrs.ngValue ? this.$scope.$eval($attrs.ngValue) : $attrs.value;
  }
  ngModel.$setViewValue(newVal);
  ngM