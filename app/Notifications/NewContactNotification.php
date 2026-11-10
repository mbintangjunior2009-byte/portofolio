<?php

namespace App\Notifications;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * NewContactNotification
 *
 * Sends a plain-text notification email when a new contact form submission
 * arrives. Designed to be dispatched only when CONTACT_EMAIL is configured
 * in the environment — if it is not set, the controller skips dispatch
 * entirely so the form works without any mail configuration.
 *
 * Uses the standard Laravel MailMessage fluent builder so it works with
 * any MAIL_MAILER driver (log, smtp, sendmail, mailgun, etc.) without
 * any additional dependencies.
 *
 * The email is NOT queued by default (no ShouldQueue) so that validation
 * errors from the mailer surface immediately during development. Add
 * `implements ShouldQueue` to queue it in production.
 */
class NewContactNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly Contact $contact,
    ) {}

    /**
     * Delivery channels — email only.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Build the notification email.
     *
     * All user-supplied content is passed through the MailMessage builder
     * which handles escaping — no raw HTML is constructed from input.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $fromName  = config('app.name', 'HOSHI // SEES TERMINAL');
        $replyTo   = $this->contact->frequency;
        $senderName = $this->contact->sender;
        $protocol  = $this->contact->protocol;
        $body      = $this->contact->transmission;

        return (new MailMessage())
            ->subject("[{$fromName}] New Transmission: {$protocol}")
            ->replyTo($replyTo, $senderName)
            ->greeting("New transmission received via HOSHI // SEES TERMINAL")
            ->line("**From:** {$senderName} <{$replyTo}>")
            ->line("**Protocol:** {$protocol}")
            ->line("**Message:**")
            ->line($body)
            ->line('---')
            ->line("Logged at: " . $this->contact->created_at->toDateTimeString())
            ->salutation("S.E.E.S. TACTICAL OS // AUTO-DISPATCH");
    }
}
