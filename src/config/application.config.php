<?php
/**
 * @author Nguyen Huu Phuoc <huuphuoc.me>
 */

// The application environment defined in Nginx configuration file
define('APP_ENV',             getenv('APPLICATION_ENV') ?: 'dev');

// The ID of preview element in preview page
define('APP_PREVIEW_ID',     'iframe');

// Path to PhantomJS
define('APP_PHANTOMJS_PATH', 'dev' == APP_ENV ? '/opt/local/bin/phantomjs' : '/usr/bin/phantomjs');
