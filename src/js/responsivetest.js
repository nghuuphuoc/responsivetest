/**
 * ResponsiveTest (http://responsivetest.net)
 *
 * Test responsive layout
 *
 * @link        https://github.com/nghuuphuoc/responsivetest
 * @author      Nguyen Huu Phuoc <huuphuoc.me>
 * @copyright   (c) 2013 Nguyen Huu Phuoc
 * @license     MIT
 */

angular
    .module('ResponsiveTest', [])
    // Show devices
    .directive('rtDevice', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                brands: '='
            },
            link: function(scope, element, attrs) {
                var template = '<ul class="dropdown-menu">', brands = scope.brands, numBrands = brands.length;

                scope.openStatus     = new Array(numBrands);
                scope.openStatus[0]  = true;
                scope.lastHoverBrand = 0;

                scope.toggleBrand = function(i) {
                    scope.openStatus[i] = true;
                    if (i != scope.lastHoverBrand) {
                        scope.openStatus[scope.lastHoverBrand] = false;
                        scope.lastHoverBrand = i;
                    }
                };

                // TODO: Move this to template
                for (var i = 0; i < numBrands; i++) {
                    if (i > 0) {
                        template += '<li class="divider"></li>';
                    }
                    template += '<li class="dropdown-header" ng-mouseover="toggleBrand(' + i + ')">' + brands[i].name + '</li>';
                    for (var j in brands[i].devices) {
                        var pixelDestiny = brands[i].devices[j].pxd ? brands[i].devices[j].pxd : 1;
                        template += '<li ng-show="openStatus[' + i + ']"><a href="javascript: void(0);" ng-click="$parent.resizeTo(' + brands[i].devices[j].w + ', ' + brands[i].devices[j].h + ', ' + pixelDestiny + ')">' + brands[i].devices[j].name;

                        if (brands[i].devices[j].inch) {
                            template += ' <small></small><span>' + brands[i].devices[j].inch + '"</span>';
                        }
                        template += '</a></li>';
                    }
                }
                template += '</ul>';

                var newElement = angular.element(template);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        };
    })
    // Add loading indicator while the frame is loading
    .directive('rtFrameLoading', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var loader = angular.element('<div/>').css({
                    position: 'absolute',
                    top: 0,
                    width: 0,
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%'
                }).addClass('rt-loader').prependTo(element.parent());
                element.on('load', function() {
                    loader.hide();
                });

                // Show the loader indicator when the URL is changed
                scope.$watch('frameSrc', function() {
                    if (scope.frameSrc) {
                        loader.show();
                    }
                });
            }
        };
    })
    // Make the frame resizable
    .directive('rtResizable', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var parentScope = scope.$parent;

                // Cannot move the mouse out of the frame after resizing the frame
                element.css('position', 'relative');
                var mask = angular.element('<div/>').css({
                    position: 'absolute',
                    top: 0,
                    width: 0,
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%'
                }).hide().prependTo(element);

                element.resizable({
                    start: function(event, ui) {
                        mask.show();
                    },
                    stop: function(event, ui) {
                        mask.hide();
                    },
                    resize: function(event, ui) {
                        scope.w = ui.size.width  * scope.pxd;
                        scope.h = ui.size.height * scope.pxd;
                        parentScope.$apply();
                    }
                });
            }
        };
    })
    // Handle the onKeyUp event
    .directive('rtKeyup', function() {
        // Store the URL when user press the Enter key
        return function(scope, element, attrs) {
            var keyupHandler = scope.$eval(attrs.rtKeyup);
            element.bind('keyup', function(evt) {
                scope.$apply(function() {
                    keyupHandler(evt.which);
                });
            });
        };
    })
    // Show the loading indicator when getting the data via an Ajax request
    .config(function($httpProvider) {
        var numLoadings   = 0,
            loadingScreen = angular.element('<div style="position: fixed; top: 0; left: 0; z-index: 1000; width: 100%; height: 100%;"><div style="position: absolute; top: 50%; left: 0; width: 100%;"><div class="row"><div class="col-lg-6 col-lg-offset-3"><div class="progress progress-striped active"><div class="progress-bar" style="width: 100%;"></div></div></div></div></div></div>')
                                   .appendTo(angular.element('body'))
                                   .hide();
        $httpProvider.responseInterceptors.push(function() {
            return function(promise) {
                numLoadings++;
                loadingScreen.show();
                var hide = function(r) {
                    if (!(--numLoadings)) {
                        loadingScreen.hide();
                    }
                    return r;
                };
                return promise.then(hide, hide);
            };
        });
    })
    .controller('IndexController', function($rootScope, $scope, $http, $sce) {
        $scope.loading  = true;
        $scope.w        = 1024;
        $scope.h        = 768;

        // Pixel destiny
        // See http://screensiz.es
        $scope.pxd      = 1;
        $scope.url      = null;
        $scope.frameSrc = null;

        /**
         * Init the controller
         */
        $scope.init = function() {
            $http.get('data/devices.json').success(function(response) {
                $scope.SUPPORTED_DEVICES = response.supportedDevices;

                // Extract the URL and size from location hash if they are available
                if (window.location.hash && '#u=' == window.location.hash.substr(0, 3)) {
                    var query = window.location.hash.substring(3);
                    if (query.indexOf('|') == -1) {
                        $scope.url = query;
                    } else {
                        var array  = query.split('|');
                        $scope.url = array[0];
                        $scope.w   = array[1];
                        $scope.h   = array[2];
                        $scope.pxd = array.length > 3 ? array[3] : 1;
                    }
                } else {
                    // Get the random URL
                    $scope.url = response.randomUrls[Math.floor(Math.random() * response.randomUrls.length)];
                }

                if ($scope.url) {
                    // To make it compatible with Angular 1.2.0, use $sce.trustAsResourceUrl()
                    $scope.frameSrc = $sce.trustAsResourceUrl($scope.normalizeUrl($scope.url));
                }
                $scope.loading  = false;
            });

            $scope.$watch('w + h + url', function() {
                $scope.updateHash();
            });
        };

        /**
         * Rotate the layout
         */
        $scope.rotate = function() {
            if ($scope.w && $scope.h) {
                var tmp = $scope.w;
                $scope.w = $scope.h;
                $scope.h = tmp;
            }
        };

        /**
         * Switch to given size
         *
         * @param {int} width
         * @param {int} height
         * @param {int} pixelDestiny
         */
        $scope.resizeTo = function(width, height, pixelDestiny) {
            $scope.w   = width;
            $scope.h   = height;
            $scope.pxd = pixelDestiny;
        };

        /**
         * Handle the keyup event of URL field
         *
         * @param {int} key The key code
         */
        $scope.onKeyup = function(key) {
            if (key == 13) {
                $scope.frameSrc = $sce.trustAsResourceUrl($scope.normalizeUrl($scope.url));
            }
        };

        /**
         * Normalize input URL
         *
         * @param {String} url
         * @return {String}
         */
        $scope.normalizeUrl = function(url) {
            if (url && 'http://' == url.substr(0, 7) || 'https://' == url.substr(0, 8)) {
                return url;
            } else {
                return 'http://' + url;
            }
        };

        // --- Private methods ---

        /**
         * Update the location hash when any one of URL, width, height are changed
         */
        $scope.updateHash = function() {
            if ($scope.w && $scope.h && $scope.url) {
                // Update the location hash
                window.location.hash = '#u=' + [$scope.url, $scope.w, $scope.h, $scope.pxd].join('|');
            }
        };
    });