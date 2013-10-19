# Responsive Test

This tool is used to test responsive layout.
You can see the live demo on http://responsivetest.net

The tool is powered by [jQuery](http://jquery.com), [Bootstrap 3](http://getbootstrap.com), and [AngularJS](http://angularjs.org)

## Download

You can download ResponsiveTest from [Github page](http://github.com/nghuuphuoc/responsivetest) directly.
It's also possible to download the tool with [bower](http://bower.io):

```bash
$ bower install responsivetest
```

## Add more devices

The device sizes are defined in ```data/devices.json``` file.

If you want it to support more devices and screen resolutions, please fork the project and pull a new request.

## Build

The build process copies the source file (located in ```src```) to the ```dist``` directory, and compresses the CSS, JS files.

First, uses [grunt](http://gruntjs.com) to install dependent packages:

```bash
$ npm install grunt --save-dev
$ npm install grunt-contrib-copy --save-dev
$ npm install grunt-contrib-cssmin --save-dev
$ npm install grunt-contrib-uglify --save-dev
$ npm install grunt-ngmin --save-dev
```

Then, execute the following command to build:

```bash
$ grunt
```

## Author

Nguyen Huu Phuoc ([Email](mailto: phuoc@huuphuoc.me) / [Twitter](http://twitter.com/nghuuphuoc) / [Github](http://github.com/nghuuphuoc))

Big thanks to the contributors:

* [michaseel](https://github.com/michaseel)

## License

Copyright (c) 2013 Nguyen Huu Phuoc

ResponsiveTest is licensed under the MIT license.
