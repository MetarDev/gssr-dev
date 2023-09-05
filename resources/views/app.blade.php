<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        {{-- <link rel="preconnect" href="https://fonts.bunny.net"> --}}
        {{-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> --}}

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead

        <meta property="og:title" content="{{ $page['props']['metadata']['title'] }}" />
        <meta property="og:url" content="{{ $page['props']['metadata']['url'] }}" />
        <meta property="og:description" content="{{ $page['props']['metadata']['description'] }}" />
        <meta property="og:image" content="{{ $page['props']['metadata']['ogImage'] ?? $page['props']['metadata']['image'] }}" />
        <meta property="og:type" content="article" />

        <?php /* Twitter */ ?>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{{ $page['props']['metadata']['title'] }}" />
        <meta name="twitter:url" content="{{ $page['props']['metadata']['url'] }}" />
        <meta name="twitter:description" content="{{ $page['props']['metadata']['description'] }}" />
        <meta name="twitter:image" content="{{ $page['props']['metadata']['twitterImage'] ?? $page['props']['metadata']['image'] }}" />

        <?php /* Default meta tags */ ?>
        <meta itemProp="name" content="{{ $page['props']['metadata']['title'] }}" />
        <meta itemProp="description" content="{{ $page['props']['metadata']['description'] }}" />
        <meta itemProp="image" content="{{ $page['props']['metadata']['image'] }}" />

        <?php /* Real Favicon */ ?>
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ed8936" />
        <meta name="msapplication-TileColor" content="#2a2524" />
        <meta name="theme-color" content="#2a2524" />
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
