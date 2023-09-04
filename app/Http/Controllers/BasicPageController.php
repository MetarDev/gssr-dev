<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Helpers\Metadata;
use Inertia\Inertia;

class BasicPageController extends Controller
{

    /**
     * Render for the cookie policy page
     *
     * @return \Inertia\Response
     */
    public function cookiePolicy()
    {
        return Inertia::render('CookiePolicy', [
            'metadata' => Metadata::generatePageMetadata([
                'title' => 'Cookie Policy',
                'description' => 'Cookie policy detailing how cookies are used.',
            ]),
        ]);
    }
}
