<?php

namespace App\Exceptions;

use App\Helpers\Metadata;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

/**
 * Prepare exception for rendering.
 *
 * @param  \Throwable  $e
 * @return \Throwable
 */
public function render($request, Throwable $e)
{
    $response = parent::render($request, $e);

    if (! app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
        \Illuminate\Support\Facades\Log::info(print_r('Rendering', true));
        return Inertia::render('ErrorPage', [
                'status' => $response->getStatusCode(),
                'metadata' => Metadata::generatePageMetadata([
                    'title' => 'Error: ' . $response->getStatusCode(),
                    'description' => 'Error ' . $response->getStatusCode(),
                ]),
            ])
            ->toResponse($request)
            ->setStatusCode($response->getStatusCode());
    } elseif ($response->getStatusCode() === 419) {
        return back()->with([
            'message' => 'The page expired, please try again.',
        ]);
    }

    return $response;
}
}
