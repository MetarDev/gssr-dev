<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Helpers\Metadata;
use Inertia\Inertia;
use Inertia\Response;

class BasicPageController extends Controller
{

    /**
     * Render for the cookie policy page
     *
     * @return \Inertia\Response
     */
    public function cookiePolicy(): Response
    {
        return $this->render('CookiePolicy', [
            'title' => 'Cookie Policy',
            'description' => 'Cookie policy detailing how cookies are used.',
        ]);
    }

    /**
     * Render for the cookie policy page
     *
     * @return Response
     */
    public function about(): Response
    {
        return $this->render('About', [
            'title' => 'About',
            'description' => sprintf('About page for %s.', env('APP_NAME')),
        ]);
    }

    /**
     * Render for the basic pages.
     *
     * @return Response
     */
    private function render(string $templateName, array $metadata, array $additionArgs = []): Response
    {
        return Inertia::render(
            $templateName,
            array_merge(
                [
                    'metadata' => Metadata::generatePageMetadata($metadata),
                ],
                $additionArgs
            )
        );
    }
}
