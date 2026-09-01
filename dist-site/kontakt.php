<?php
declare(strict_types=1);

/*
 * Kontakt-Endpoint fuer rokabo.de
 *
 * Liegt in public/ und wandert dadurch bei jedem Build nach dist-site/.
 * Der Static Export bleibt unberuehrt - Next erzeugt weiterhin nur HTML,
 * diese Datei wird von LiteSpeed direkt an PHP uebergeben (die erste
 * Rewrite-Regel in .htaccess liefert existierende Dateien unveraendert aus).
 *
 * Antwortet immer mit JSON: {"ok":true} oder {"ok":false,"error":"..."}.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const EMPFAENGER = 'info@rokabo.de';
/* Absender muss eine Adresse der eigenen Domain sein. Traegt man hier die
   Adresse des Besuchers ein, scheitert SPF/DMARC und die Mail landet im
   Spam oder wird abgewiesen. Der Besucher steht im Reply-To.

   Bewusst dieselbe Adresse wie der Empfaenger: sie existiert garantiert.
   Ein eigenes Postfach wie website@rokabo.de waere sauberer zu filtern -
   dann hier eintragen, nachdem es in Plesk angelegt wurde. */
const ABSENDER = 'info@rokabo.de';
const MIN_SEKUNDEN = 3;
const MAX_LAENGE = 5000;

function fehler(string $text, int $status = 400): void
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $text], JSON_UNESCAPED_UNICODE);
    exit;
}

/* mbstring ist auf den meisten Plesk-Installationen da, aber nicht
   garantiert. Ohne Fallback waere ein fehlendes Modul ein Fatal Error. */
/* Alle Felder ausser Name und E-Mail koennen leer ankommen - '-' statt
   einer Leerstelle, damit Mail und Log lesbar bleiben. Bewusst eine
   benannte Funktion und keine Arrow-Funktion: die gibt es erst ab
   PHP 7.4, und die PHP-Version des Hosters ist hier nicht pruefbar. */
function oder(string $wert): string
{
    return $wert !== '' ? $wert : '-';
}

function laenge(string $wert): int
{
    return function_exists('mb_strlen') ? mb_strlen($wert) : strlen($wert);
}

function kuerzen(string $wert, int $max): string
{
    return function_exists('mb_substr') ? mb_substr($wert, 0, $max) : substr($wert, 0, $max);
}

function feld(string $name, int $maxLaenge = 200): string
{
    $wert = $_POST[$name] ?? '';
    if (!is_string($wert)) {
        return '';
    }
    $wert = trim($wert);
    if (laenge($wert) > $maxLaenge) {
        $wert = kuerzen($wert, $maxLaenge);
    }
    return $wert;
}

/* Alles, was in einen Mail-Header wandert, muss frei von Zeilenumbruechen
   sein - sonst kann jemand eigene Header einschleusen. */
function kopfzeilensicher(string $wert): string
{
    return trim(str_replace(["\r", "\n", "\0"], ' ', $wert));
}

function betreffKodieren(string $betreff): string
{
    return '=?UTF-8?B?' . base64_encode($betreff) . '?=';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fehler('Nur POST erlaubt.', 405);
}

/* Honeypot: ein Feld, das im Browser unsichtbar ist. Menschen fuellen es
   nicht aus, einfache Bots schon. Wir melden trotzdem Erfolg, damit der
   Bot nicht lernt, woran es lag. */
if (feld('fax') !== '') {
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

$vergangen = (int) ($_POST['vergangen'] ?? 0);
if ($vergangen < MIN_SEKUNDEN) {
    fehler('Das ging zu schnell. Bitte versuch es noch einmal.');
}

$name       = feld('name', 120);
$email      = feld('email', 200);
$telefon    = feld('telefon', 60);
$betrieb    = feld('company', 160);
$paket      = feld('package', 80);
$bestehend  = feld('bestehend', 80);
$nachricht  = feld('message', MAX_LAENGE);

/* Pflicht sind nur Name und E-Mail - dieselbe Regel wie im Formular.
   Alles andere klaert das Erstgespraech; es vorab zu verlangen stand im
   Widerspruch zu dem Versprechen, das daneben steht. Werden die Regeln
   hier und in components/contact-form.tsx unterschiedlich, laesst der
   Client durch, was der Server abweist. */
if ($name === '' || $email === '') {
    fehler('Bitte gib deinen Namen und deine E-Mail-Adresse an.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fehler('Diese E-Mail-Adresse sieht nicht gültig aus.');
}

/* Ohne Paketangabe bleibt der Betreff sonst mit einem Doppelpunkt und
   nichts dahinter stehen. */
$betreff = betreffKodieren(
    $paket !== '' ? 'Anfrage über rokabo.de: ' . $paket : 'Anfrage über rokabo.de'
);

$koerper = implode("\n", [
    'Name:            ' . $name,
    'Betrieb:         ' . oder($betrieb),
    'E-Mail:          ' . $email,
    'Telefon:         ' . oder($telefon),
    'Gewähltes Paket: ' . oder($paket),
    'Website bisher:  ' . oder($bestehend),
    '',
    'Nachricht:',
    oder($nachricht),
    '',
    '--',
    'Gesendet am ' . date('d.m.Y H:i') . ' über das Formular auf rokabo.de',
]);

$header = implode("\r\n", [
    'From: rokabo Website <' . ABSENDER . '>',
    'Reply-To: ' . kopfzeilensicher($name) . ' <' . kopfzeilensicher($email) . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
]);

/* Der fuenfte Parameter setzt den Envelope-Absender und hilft gegen
   Spam-Einstufung - manche Hoster sperren ihn aber. Dann ohne. */
$gesendet = @mail(EMPFAENGER, $betreff, $koerper, $header, '-f' . ABSENDER);
if (!$gesendet) {
    $gesendet = @mail(EMPFAENGER, $betreff, $koerper, $header);
}

if (!$gesendet) {
    fehler('Die Nachricht konnte gerade nicht versendet werden.', 502);
}

/*
 * Anfrage-Log: die einzige Zahl, die das Geschaeft steuert - wie viele
 * Anfragen kommen und woher. Bewusst ohne Name, E-Mail und IP; wer die
 * Anfrage gestellt hat, steht in der Mail, nicht in der Statistik.
 *
 * Die Datei liegt eine Ebene ueber dem Docroot und ist damit nicht per
 * URL erreichbar. Schlaegt das Schreiben fehl, ist das kein Grund, dem
 * Besucher einen Fehler zu zeigen - die Mail ist ja raus.
 */
$logZeile = implode("\t", [
    date('c'),
    str_replace("\t", ' ', oder($paket)),
    str_replace("\t", ' ', oder($bestehend)),
    str_replace("\t", ' ', (string) ($_SERVER['HTTP_REFERER'] ?? '-')),
    $telefon !== '' ? 'telefon' : 'nur-mail',
]) . "\n";

@file_put_contents(__DIR__ . '/../rokabo-anfragen.log', $logZeile, FILE_APPEND | LOCK_EX);

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
