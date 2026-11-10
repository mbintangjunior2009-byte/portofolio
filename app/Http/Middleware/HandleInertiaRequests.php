<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name', 'HOSHI // SEES TERMINAL'),

            // Operator identity — sourced from config/app.php → .env
            // so the frontend never needs to hardcode personal info.
            'operator' => [
                'codename'        => config('app.operator_codename', 'HOSHI'),
                'displayName'     => config('app.operator_name',     'HOSHI'),
                'clearance'       => config('app.operator_clearance', 'LEVEL 4 S-RANK'),
                'hasContactEmail' => (bool) config('app.contact_email'),
            ],

            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
