<?php
/**
 * @author Nguyen Huu Phuoc <huuphuoc.me>
 */

include_once dirname(__DIR__) . '/config/application.config.php';

if (!isset($_GET['url']) || !isset($_GET['w']) || !isset($_GET['h'])) {
    die('Invalid request');
}

// The location hash
$hash = implode('|', array($_GET['url'], $_GET['w'], $_GET['h']));

$previewUrl = implode('', array(
    (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 80) ? 'http' : 'https',
    '://',
    $_SERVER['SERVER_NAME'],
    '#u=',
    $hash,
));

$captureJs = dirname(__DIR__) . '/capture/capture.js';

$command = implode(' ', array(
    APP_PHANTOMJS_PATH,
    $captureJs,
    urlencode($previewUrl),
    APP_PREVIEW_ID,
));

$output = exec($command . ' 2>&1');

// Force download png
header('Content-Disposition: attachment;filename="responsivetest.net_screenshot_' . uniqid() . '.png"');
header('Content-Type: application/force-download');
echo base64_decode($output);
exit();
