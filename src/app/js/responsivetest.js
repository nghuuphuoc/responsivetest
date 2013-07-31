/**
 * @author Nguyen Huu Phuoc <huuphuoc.me>
 * @copyright (c) 2013 Nguyen Huu Phuoc
 */

angular
    .module('ResponsiveTest', [])
    .directive('rtDevice', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                brands: '='
            },
            // templateUrl: 'app/views/device.html',
            link: function($scope, $element, $attrs) {
                // TODO: Move this to template
                var template = '<ul class="dropdown-menu">', brands = $scope.brands, numBrands = brands.length;
                for (var i = 0; i < numBrands; i++) {
                    if (i > 0) {
                        template += '<li class="divider"></li>';
                    }
                    template += '<li class="dropdown-header">' + brands[i].name + '</li>';
                    for (var j in brands[i].devices) {
                        template += '<li><a href="javascript: void(0);" ng-click="$parent.resizeTo(' + brands[i].devices[j].w + ', ' + brands[i].devices[j].h + ')">' + brands[i].devices[j].name;

                        if (brands[i].devices[j].inch) {
                            template += ' <small></small><span>' + brands[i].devices[j].inch + '"</span>';
                        }
                        template += '</a></li>';
                    }
                }
                template += '</ul>';

                var newElement = angular.element(template);
                $compile(newElement)($scope);
                $element.replaceWith(newElement);
            }
        }
    })
    .directive('rtResizable', function() {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                var parent = $scope.$parent;
                $element.resizable({
                    resize: function(event, ui) {
                        $scope.w = ui.size.width;
                        $scope.h = ui.size.height;
                        parent.$apply();
                    }
                });
            }
        }
    })
    .directive('rtKeyup', function() {
        // Handle the onKeyUp event
        // Store the URL when user press the Enter key
        return function(scope, element, attrs) {
            var keyupHandler = scope.$eval(attrs.rtKeyup);
            element.bind('keyup', function(evt) {
                scope.$apply(function() {
                    keyupHandler(evt.which);
                });
            });
        }
    })
    .config(function($httpProvider) {
        var numLoadings = 0;
        var loadingScreen = $('<div style="position: fixed; top: 0; left: 0; z-index: 1000; width: 100%; height: 100%;"><div style="position: absolute; top: 50%; left: 0; width: 100%;"><div class="row"><div class="col-lg-6 col-offset-3"><div class="progress progress-striped active"><div class="progress-bar" style="width: 100%;"></div></div></div></div></div></div>').appendTo($('body')).hide();
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
    .controller('IndexController', function($rootScope, $scope, $http) {
        $scope.loading  = true;
        $scope.w        = 1024;
        $scope.h        = 768;
        $scope.url      = null;
        $scope.frameSrc = null;

        /**
         * Init the controller
         */
        $scope.init = function() {
            $http.get('data/devices.json').success(function(response) {
                $scope.SUPPORTED_DEVICES = response.supportedDevices;
                // Get the random URL
                $scope.url      = response.randomUrls[Math.floor(Math.random() * response.randomUrls.length)];
                $scope.frameSrc = $scope.url;

                $scope.loading  = false;
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
         * @param {int} width
         * @param {int} height
         */
        $scope.resizeTo = function(width, height) {
            $scope.w = width;
            $scope.h = height;
        };

        /**
         * Handle the keyup event of URL field
         * @param {int} key The key code
         */
        $scope.onKeyup = function(key) {
            if (key == 13) {
                $scope.frameSrc = $scope.url;
            }
        };
    });