<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * StoreContactRequest
 *
 * Validates and sanitizes the Comms form submission.
 *
 * Security measures:
 *  - Whitespace trimming via prepareForValidation (prevents bypass with spaces).
 *  - Protocol field validated against an explicit allowlist (no arbitrary values).
 *  - Honeypot field (website) must be empty — bots that fill all fields are blocked.
 *  - Transmission length upper-bounded at 2000 characters (guards against payload flooding).
 *  - All rules are enforced server-side; frontend validation is UX only.
 */
class StoreContactRequest extends FormRequest
{
    /**
     * Any authenticated user (or guest) may submit the contact form.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Strip surrounding whitespace from text fields before validation runs.
     * This prevents trivially bypassing min-length rules with padded spaces.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'sender'       => trim((string) $this->input('sender', '')),
            'frequency'    => trim(strtolower((string) $this->input('frequency', ''))),
            'protocol'     => trim((string) $this->input('protocol', '')),
            'transmission' => trim((string) $this->input('transmission', '')),
        ]);
    }

    /**
     * Validation rules.
     *
     * Field name mapping (P3R thematic names → semantic meaning):
     *   sender       → contact name
     *   frequency    → email address
     *   protocol     → subject / inquiry type
     *   transmission → message body
     *   website      → honeypot (must be left blank by real users)
     */
    public function rules(): array
    {
        return [
            'sender' => [
                'required',
                'string',
                'min:2',
                'max:100',
            ],
            'frequency' => [
                'required',
                'email:rfc',
                'max:150',
            ],
            'protocol' => [
                'required',
                'string',
                'in:GENERAL INQUIRY,PROJECT COLLABORATION,APPRENTICESHIP / HIRE,LSP CERTIFICATION AUDIT',
            ],
            'transmission' => [
                'required',
                'string',
                'min:10',
                'max:2000',
            ],
            // Honeypot: any non-empty value means bot.
            'website' => [
                'present',
                'max:0',
            ],
        ];
    }

    /**
     * Human-readable error messages that fit the P3R thematic UI labels.
     */
    public function messages(): array
    {
        return [
            'sender.required'       => 'SENDER IDENTIFIER is required.',
            'sender.min'            => 'SENDER IDENTIFIER must be at least 2 characters.',
            'sender.max'            => 'SENDER IDENTIFIER must not exceed 100 characters.',
            'frequency.required'    => 'RETURN FREQUENCY (email) is required.',
            'frequency.email'       => 'RETURN FREQUENCY must be a valid email address.',
            'frequency.max'         => 'RETURN FREQUENCY must not exceed 150 characters.',
            'protocol.required'     => 'MISSION PROTOCOL must be selected.',
            'protocol.in'           => 'MISSION PROTOCOL contains an invalid value.',
            'transmission.required' => 'TRANSMISSION BODY is required.',
            'transmission.min'      => 'TRANSMISSION BODY must be at least 10 characters.',
            'transmission.max'      => 'TRANSMISSION BODY must not exceed 2000 characters.',
            'website.max'           => 'Transmission blocked.',
        ];
    }

    /**
     * Return only the fields that are actually stored — excludes the honeypot.
     */
    public function validatedContact(): array
    {
        return $this->only(['sender', 'frequency', 'protocol', 'transmission']);
    }
}
