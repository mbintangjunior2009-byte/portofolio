<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes — HOSHI // SEES TERMINAL
|--------------------------------------------------------------------------
|
| All routes use named identifiers (terminal.*) for Ziggy compatibility
| and follow Inertia conventions (GET for pages, POST for mutations).
|
*/

// ── Portfolio pages ────────────────────────────────────────────────────────
Route::get('/',           [PortfolioController::class, 'index'])      ->name('terminal.index');
Route::get('/dossier',    [PortfolioController::class, 'dossier'])    ->name('terminal.dossier');
Route::get('/skills',     [PortfolioController::class, 'skills'])     ->name('terminal.skills');
Route::get('/operations', [PortfolioController::class, 'operations']) ->name('terminal.operations');
Route::get('/records',    [PortfolioController::class, 'records'])    ->name('terminal.records');
Route::get('/comms',      [PortfolioController::class, 'comms'])      ->name('terminal.comms');

// ── Contact form submission ────────────────────────────────────────────────
// throttle:comms limits to 5 attempts per minute per IP.
// CSRF, FormRequest validation, and honeypot checks are applied inside
// the controller and FormRequest before any business logic runs.
Route::post('/comms/transmit', [PortfolioController::class, 'submitComms'])
    ->middleware('throttle:comms')
    ->name('terminal.comms.submit');
