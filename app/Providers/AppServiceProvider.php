<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureRateLimiters();
    }

    /**
     * Configure named rate limiters for the application.
     *
     * 'comms' — limits the contact form POST to 5 attempts per minute
     * per IP address. Exceeding this returns a 429 Too Many Requests
     * response, which Inertia surfaces as a standard error.
     */
    protected function configureRateLimiters(): void
    {
        RateLimiter::for('comms', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });
    }
}
