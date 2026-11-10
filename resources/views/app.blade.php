<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#020b14">
        <meta name="description" content="HOSHI // SEES TERMINAL - Persona 3 Reload Inspired Portfolio & Tactical Operator Dossier">

        <title inertia>{{ config('app.name', 'HOSHI // SEES TERMINAL') }}</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Theme flash prevention: apply stored theme before React hydrates -->
        <script>
            (function() {
                try {
                    var t = localStorage.getItem('hoshi_theme');
                    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
                } catch(e) {}
            })();
        </script>

        <!-- P3R Inspired Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,600;0,700;1,700&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#020b14] text-slate-100 selection:bg-[#00f0ff] selection:text-[#020b14] overflow-x-hidden">
        @inertia
    </body>
</html>

