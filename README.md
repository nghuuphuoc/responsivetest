# Responsive Test

This tool is used to test responsive layout.
You can see the live demo on http://responsivetest.net

The tool is powered by [jQuery](http://jquery.com), [Bootstrap 3](http://getbootstrap.com), and [AngularJS](http://angularjs.org)

![ResponsiveTest screen shot](src/img/screenshot.png)

## Download and run

* Download ResponsiveTest from the [Github page](http://github.com/nghuuphuoc/responsivetest) directly.
It's also possible to download the tool with [bower](http://bower.io):

```bash
$ bower install responsivetest
```

* Point your web server to the ResponsiveTest directory.
You can python to simplify this step by running the following command:

```bash
$ python -m SimpleHTTPServer <port>
```

Then access the browser at ```http://localhost:<port>```

> ResponsiveTest is written in CSS, Javascript, and HTML entirely.
> The tool uses an Ajax request to retrieve the devices data which is stored in an external file (```data/devices.json```).
> As you know, the browser doesn't allow to do it if the file is served locally due to security concern
> ```Origin null is not allowed by Access-Control-Allow-Origin```
> That's why we need to run it with a HTTP server.

## Add more devices

The device sizes are defined in ```data/devices.json``` file.

If you want it to support more devices and screen resolutions, please fork the project and pull a new request.

You don't have to rebuild if you only change the ```data/devices.json``` file.

## Build

The build process finds the CSS, JS files in the ```src``` and compresses them, places compressed files in the ```dist``` directory.

First, use [grunt](http://gruntjs.com) to install the dependent packages:

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
* [Emrehan Tuzun](https://github.com/emrehan)

## License

Copyright (c) 2013 Nguyen Huu Phuoc

ResponsiveTest is licensed under the MIT license.
