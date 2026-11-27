<?php
// CreamosTech contact / audit form endpoint for Hostinger shared hosting (PHP mail()).
// Accepts POST from /contact. Answers JSON to fetch() and redirects plain form posts.
declare(strict_types=1);

const TO_EMAIL = 'hola@creamostech.com';
const FROM_EMAIL = 'no-reply@creamostech.com';
const MAX_LEN = 4000;

$wantsJson = isset($_SERVER['HTTP_ACCEPT']) && str_contains($_SERVER['HTTP_ACCEPT'], 'application/json');
$lang = (($_POST['lang'] ?? 'es') === 'en') ? 'en' : 'es';
$back = $lang === 'en' ? '/en/contact/' : '/contact/';

function finish(bool $ok, string $code, bool $json, string $back): void {
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : ($code === 'method' ? 405 : 400));
        echo json_encode(['ok' => $ok, 'code' => $code]);
    } else {
        header('Location: ' . $back . '?' . ($ok ? 'enviado=1' : 'error=' . rawurlencode($code)) . '#auditoria', true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    finish(false, 'method', $wantsJson, $back);
}

// Honeypot: real people never fill this hidden field.
if (!empty($_POST['website'] ?? '')) {
    finish(true, 'ok', $wantsJson, $back);
}

function field(string $key, int $max = 200): string {
    $v = trim((string)($_POST[$key] ?? ''));
    $v = str_replace(["\r", "\n", "\0"], ' ', $v);
    return mb_substr($v, 0, $max);
}

$name = field('name', 120);
$email = field('email', 160);
$phone = field('phone', 40);
$company = field('company', 160);
$service = field('service', 80);
$plan = field('plan', 80);
$message = mb_substr(trim(str_replace("\0", '', (string)($_POST['message'] ?? ''))), 0, MAX_LEN);

if ($name === '' || $message === '') {
    finish(false, 'required', $wantsJson, $back);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    finish(false, 'email', $wantsJson, $back);
}

$subject = '=?UTF-8?B?' . base64_encode('Nueva solicitud web: ' . $name . ($plan !== '' ? ' (' . $plan . ')' : '')) . '?=';
$body = "Nombre: $name\nEmail: $email\nTeléfono: $phone\nEmpresa: $company\nServicio: $service\nPlan: $plan\nIdioma: $lang\n\nMensaje:\n$message\n";
$headers = [
    'From: CreamosTech Web <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = @mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);
finish($sent, $sent ? 'ok' : 'mail', $wantsJson, $back);
