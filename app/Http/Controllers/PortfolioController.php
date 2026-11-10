<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use App\Notifications\NewContactNotification;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Display the main S.E.E.S. Operator Deck (Home).
     */
    public function index(): Response
    {
        return Inertia::render('Terminal/Index', [
            'terminalStatus'       => 'ONLINE',
            'securityLevel'        => config('app.operator_clearance', 'LEVEL 4 S-RANK'),
            'clearedMissionsCount' => 4,
            'timestamp'            => now()->toIso8601String(),
        ]);
    }

    /**
     * Display the Operator Dossier (Profile / About).
     */
    public function dossier(): Response
    {
        return Inertia::render('Terminal/Dossier');
    }

    /**
     * Display Persona Parameters & Technical Arsenal (Skills / Abilities).
     */
    public function skills(): Response
    {
        return Inertia::render('Terminal/Skills');
    }

    /**
     * Display Tartarus Operations & Portfolio Missions (Projects).
     */
    public function operations(): Response
    {
        return Inertia::render('Terminal/Operations');
    }

    /**
     * Display the Operator Records & Experience Chronicle.
     */
    public function records(): Response
    {
        return Inertia::render('Terminal/Records');
    }

    /**
     * Display the Velvet Transceiver & Contact Hub.
     */
    public function comms(): Response
    {
        return Inertia::render('Terminal/Comms', [
            'recentTransmissionsCount' => Contact::count(),
        ]);
    }

    /**
     * Handle an incoming contact form transmission.
     *
     * Security checklist:
     *  ✓ CSRF: enforced by the web middleware group on every POST.
     *  ✓ Validation: StoreContactRequest (FormRequest) validates all fields
     *    server-side including the honeypot before this method is reached.
     *  ✓ Rate limiting: throttle:comms middleware applied in routes/web.php.
     *  ✓ Input sanitization: prepareForValidation() in the FormRequest trims
     *    whitespace; only validated scalar values are passed to Eloquent.
     *  ✓ Mass-assignment protection: Contact::$fillable is explicit.
     *  ✓ Email notification: dispatched only when CONTACT_EMAIL is set;
     *    uses Laravel's MailMessage builder (auto-escapes user content).
     *  ✓ No credentials exposed: ip_address stored internally, never returned.
     */
    public function submitComms(StoreContactRequest $request): \Illuminate\Http\RedirectResponse
    {
        // Persist — validatedContact() excludes the honeypot field.
        $contact = Contact::create(array_merge(
            $request->validatedContact(),
            ['ip_address' => $request->ip()]
        ));

        // Optional email notification — no-ops when CONTACT_EMAIL is unset.
        $notifyAddress = config('app.contact_email');
        if ($notifyAddress) {
            try {
                Notification::route('mail', $notifyAddress)
                    ->notify(new NewContactNotification($contact));
            } catch (\Throwable $e) {
                // Log the failure but don't surface it to the user — the
                // submission was saved; the email failing is not their problem.
                Log::warning('Contact notification failed to send.', [
                    'contact_id' => $contact->id,
                    'error'      => $e->getMessage(),
                ]);
            }
        }

        return back()->with('success', 'TRANSMISSION CONFIRMED // PACKET ENCRYPTED & LOGGED');
    }
}
