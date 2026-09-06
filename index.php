<?php
/**
 * Lobo Travels - Website Router & Server
 * Automatically serves the compiled Next.js website on Apache / WordPress hosting.
 */

// Disable output buffering to prevent memory leaks with large files
while (ob_get_level()) {
    ob_end_clean();
}

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$parsedPath = parse_url($requestUri, PHP_URL_PATH) ?? '/';
$cleanPath = trim($parsedPath, '/');

// Security check: prevent directory traversal
if (strpos($cleanPath, '..') !== false) {
    http_response_code(400);
    exit('Invalid path');
}

// MIME types mapping
$mimeTypes = [
    'html'  => 'text/html; charset=UTF-8',
    'htm'   => 'text/html; charset=UTF-8',
    'css'   => 'text/css; charset=UTF-8',
    'js'    => 'application/javascript; charset=UTF-8',
    'mjs'   => 'application/javascript; charset=UTF-8',
    'json'  => 'application/json; charset=UTF-8',
    'png'   => 'image/png',
    'jpg'   => 'image/jpeg',
    'jpeg'  => 'image/jpeg',
    'webp'  => 'image/webp',
    'gif'   => 'image/gif',
    'svg'   => 'image/svg+xml',
    'ico'   => 'image/x-icon',
    'woff'  => 'font/woff',
    'woff2' => 'font/woff2',
    'ttf'   => 'font/ttf',
    'eot'   => 'application/vnd.ms-fontobject',
    'txt'   => 'text/plain; charset=UTF-8',
    'xml'   => 'application/xml; charset=UTF-8'
];

function serveFile($filePath, $mimeTypes) {
    if (!file_exists($filePath) || is_dir($filePath)) {
        return false;
    }
    
    $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    $contentType = $mimeTypes[$ext] ?? 'application/octet-stream';
    
    // Set headers
    header('Content-Type: ' . $contentType);
    header('Content-Length: ' . filesize($filePath));
    
    // Enable caching for static assets
    if (in_array($ext, ['js', 'mjs', 'css', 'woff2', 'woff', 'ttf', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'ico'])) {
        header('Cache-Control: public, max-age=31536000, immutable');
    } else {
        header('Cache-Control: public, max-age=3600');
    }
    
    readfile($filePath);
    exit;
}

// 1. If requesting a specific file with extension (e.g., _next/static/..., assets/..., favicon.ico)
if (!empty($cleanPath) && pathinfo($cleanPath, PATHINFO_EXTENSION) !== '') {
    $baseName = basename($cleanPath);
    $candidates = [
        __DIR__ . '/' . $cleanPath,
        __DIR__ . '/public/' . $cleanPath,
        __DIR__ . '/out/' . $cleanPath,
        __DIR__ . '/assets/' . $baseName,
        __DIR__ . '/public/assets/' . $baseName,
        __DIR__ . '/out/assets/' . $baseName,
    ];
    foreach ($candidates as $cand) {
        serveFile($cand, $mimeTypes);
    }
}

// 2. If requesting a route (e.g., "", "about", "destinations/jaipur", "packages/golden-triangle-tour")
if (empty($cleanPath)) {
    // Root URL: serve index.html
    $rootCandidates = [
        __DIR__ . '/index.html',
        __DIR__ . '/out/index.html'
    ];
    foreach ($rootCandidates as $cand) {
        serveFile($cand, $mimeTypes);
    }
} else {
    // Sub-route candidates
    $routeCandidates = [
        __DIR__ . '/' . $cleanPath . '/index.html',
        __DIR__ . '/' . $cleanPath . '.html',
        __DIR__ . '/out/' . $cleanPath . '/index.html',
        __DIR__ . '/out/' . $cleanPath . '.html',
        __DIR__ . '/' . $cleanPath
    ];
    foreach ($routeCandidates as $cand) {
        serveFile($cand, $mimeTypes);
    }
}

// 3. Fallback: 404 page or index.html
$fallback404 = [
    __DIR__ . '/404.html',
    __DIR__ . '/out/404.html',
    __DIR__ . '/404/index.html',
    __DIR__ . '/out/404/index.html',
    __DIR__ . '/index.html',
    __DIR__ . '/out/index.html'
];

foreach ($fallback404 as $cand) {
    if (file_exists($cand) && !is_dir($cand)) {
        http_response_code(404);
        serveFile($cand, $mimeTypes);
    }
}

// 4. Ultimate fallback if files are somehow missing
http_response_code(200);
header('Content-Type: text/html; charset=UTF-8');
echo '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/"><title>Lobo Travels</title></head><body>Redirecting to Lobo Travels...</body></html>';
exit;
