/**
 * @author Nguyen Huu Phuoc <huuphuoc.me>
 * @copyright (c) 2013 Nguyen Huu Phuoc
 */

angular
    .module('ResponsiveTest', [])
    .directive('rtBrand', function($compile) {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            link: function ($scope, $element, attrs, ngModel) {
                console.log(ngModel);

                var template = '<li class="dropdown-header">' + ngModel + '</li>';
                var newElement = angular.element(template);
                $compile(newElement)($scope);
                $element.replaceWith(newElement);
            }
        }
    })
    .controller('IndexController', function($rootScope, $scope) {
        /**
         * Supported devices
         * @type {Array}
         */
        $scope.SUPPORTED_DEVICES = [
            {
                type: 'phone',
                title: 'Phone',
                icon: 'icon-mobile-phone',
                brands: [
                    {
                        name: 'Apple',
                        devices: [
                            { name: 'iPhone', w: 320, h: 480 },
                            { name: 'iPhone 4', w: 640, h: 960 },
                            { name: 'iPhone 5', w: 640, h: 1136 }
                        ]
                    },
                    {
                        name: 'BlackBerry',
                        devices: [
                            { name: 'Torch', w: 480, h: 800 },
                            { name: 'Bold Touch', w: 480, h: 640 }
                        ]
                    },
                    {
                        name: 'Samsung',
                        devices: [
                            { name: 'Samsung S2', w: 480, h: 800 },
                            { name: 'Samsung S3', w: 720, h: 1280 },
                            { name: 'Galaxy Note', w: 720, h: 1280 }
                        ]
                    },
                    {
                        name: 'HTC',
                        devices: [
                            { name: 'Desire', w: 320, h: 533 },
                            { name: 'One X', w: 360, h: 640 },
                            { name: 'Touch HD', w: 480, h: 800 },
                            { name: 'Sensation', w: 540, h: 960 }
                        ]
                    }
                ]
            },
            {
                type: 'tablet',
                title: 'Tablet',
                icon: 'icon-tablet'
            },
            {
                type: '',
                title: 'Laptop',
                icon: 'icon-laptop'
            },
            {
                type: '',
                title: 'Desktop',
                icon: 'icon-desktop'
            }
        ]
    });