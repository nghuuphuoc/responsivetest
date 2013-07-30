/**
 * @author Nguyen Huu Phuoc <huuphuoc.me>
 * @copyright (c) 2013 Nguyen Huu Phuoc
 */

angular
    .module('ResponsiveTest', [])
    .directive('rtBrand', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                brand: '=',
                index: '='
            },
            // The brand.html consists of nothing but one empty element
            templateUrl: 'app/views/brand.html',
            link: function ($scope, $element, attrs) {
                var template = '';
                if ($scope.index > 0) {
                    template += '<li class="divider"></li>';
                }
                template += '<li class="dropdown-header">' + $scope.brand.name + '</li>';
                for (var i in $scope.brand.devices) {
                    template += '<li><a href="#" ng-click="$parent.switchDevice(' + $scope.brand.devices[i].w + ', ' + $scope.brand.devices[i].h + ')">' + $scope.brand.devices[i].name + '</a></li>';
                }

                var newElement = angular.element(template);
                $compile(newElement)($scope);
                $element.replaceWith(newElement);
            }
        }
    })
    .controller('IndexController', function($rootScope, $scope) {
        $scope.w = 1280;
        $scope.h = 800;

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
         * Switch to given device
         * @param device
         */
        $scope.switchDevice = function(width, height) {
            $scope.w = width;
            $scope.h = height;
        };

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
                    },
                    {
                        name: 'LG',
                        devices: [
                            { name: 'Optimus 3D', w: 480, h: 800 },
                            { name: 'Optimus 4X HD', w: 720, h: 1280 }
                        ]
                    }
                ]
            },
            {
                type: 'tablet',
                title: 'Tablet',
                icon: 'icon-tablet',
                brands: [
                    {
                        name: 'Apple',
                        devices: [
                            { name: 'iPad Mini', w: 1024, h: 768 },
                            { name: 'iPad 2', w: 1024, h: 768 },
                            { name: 'iPad 3', w: 2048, h: 1536 }
                        ]
                    },
                    {
                        name: 'Amazon',
                        devices: [
                            { name: 'Kindle Fire', w: 1024, h: 600 },
                            { name: 'Kindle Fire HD', w: 1280, h: 800 }
                        ]
                    },
                    {
                        name: 'Asus',
                        devices: [
                            { name: 'Eee 1000', w: 1024, h: 600 },
                            { name: 'Google Nexus 7', w: 1280, h: 800 }
                        ]
                    },
                    {
                        name: 'Barnes & Noble',
                        devices: [
                            { name: 'Nook HD', w: 1440, h: 900 },
                            { name: 'Nook HD+', w: 1920, h: 1280 }
                        ]
                    },
                    {
                        name: 'HP',
                        devices: [
                            { name: 'Touchpad', w: 1024, h: 768 },
                            { name: 'Slate 7', w: 1024, h: 600 }
                        ]
                    },
                    {
                        name: 'Microsoft',
                        devices: [
                            { name: 'Surface', w: 1366, h: 768 }
                        ]
                    },
                    {
                        name: 'Samsung',
                        devices: [
                            { name: 'Galaxy Tab 7.0', w: 1024, h: 600 },
                            { name: 'Galaxy Tab 7.7', w: 1280, h: 800 },
                            { name: 'Galaxy Tab 8.9', w: 1280, h: 800 },
                            { name: 'Galaxy Tab 10.1', w: 1280, h: 800 }
                        ]
                    }
                ]
            },
            {
                type: 'laptop',
                title: 'Laptop',
                icon: 'icon-laptop',
                brands: [
                    {
                        name: 'Apple',
                        devices: [
                            { name: '11" Macbook Air', w: 1366, h: 768 },
                            { name: '13" Macbook Air', w: 1440, h: 900 },
                            { name: '15" Macbook Pro', w: 1440, h: 900 },
                            { name: '15" Macbook Pro Restina', w: 2880, h: 1800 }
                        ]
                    },
                    {
                        name: 'Dell',
                        devices: [
                            { name: 'Alienware M14X', w: 1366, h: 768 },
                            { name: 'Alienware M17X', w: 1920, h: 1080 },
                            { name: 'Alienware M18X', w: 1920, h: 1080 },
                            { name: 'Inspiron 17R SE', w: 1920, h: 1080 }
                        ]
                    },
                    {
                        name: 'Toshiba',
                        devices: [
                            { name: 'Satellite P845-S4200', w: 1366, h: 768 }
                        ]
                    },
                    {
                        name: 'Lenovo',
                        devices: [
                            { name: 'IdeaPad Yoga', w: 1600, h: 900 },
                            { name: 'IdeaPad Y580', w: 1920, h: 1080 },
                            { name: 'ThinkPad X1 Carbon', w: 1600, h: 900 }
                        ]
                    }
                ]
            },
            {
                type: 'desktop',
                title: 'Desktop',
                icon: 'icon-desktop',
                brands: [
                    {
                        name: 'Apple',
                        devices: [
                            { name: '21.5" iMac', w: 1920, h: 1080 },
                            { name: '27" iMac', w: 2560, h: 1440 }
                        ]
                    },
                    {
                        name: 'Dell',
                        devices: [
                            { name: 'XPS One 27 Touch', w: 2560, h: 1440 }
                        ]
                    }
                ]
            }
        ]
    });