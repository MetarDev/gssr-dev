<?php

declare(strict_types=1);

namespace App\Http\Controllers;

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
        return Inertia::render('CookiePolicy');
    }
}
