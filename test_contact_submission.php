<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$controller = new App\Http\Controllers\PortfolioController();
$request = Illuminate\Http\Request::create('/comms/transmit', 'POST', [
    'sender' => 'Commander Kirijo',
    'frequency' => 'kirijo@sees-hq.net',
    'protocol' => 'APPRENTICESHIP / HIRE',
    'transmission' => 'Hoshi, your technical execution on the Tartarus Terminal has been acknowledged by the S.E.E.S. Directorate. Report for assignment.',
]);

$response = $controller->submitComms($request);
echo "Redirect Status: " . $response->getStatusCode() . PHP_EOL;

$contact = App\Models\Contact::latest()->first();
if ($contact) {
    echo "Latest Contact in DB: ID {$contact->id} | Sender: {$contact->sender} | Protocol: {$contact->protocol}" . PHP_EOL;
}
