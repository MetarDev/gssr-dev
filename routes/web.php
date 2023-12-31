<?php

use App\Helpers\Metadata;
use App\Http\Controllers\BasicPageController;
use App\Http\Controllers\QuizController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Homepage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'metadata' => Metadata::generatePageMetadata([
            'title' => config('app.name'),
            'description' => 'Test your frontend feature support knowledge!',
        ]),
    ]);
});

Route::get('/quiz', function () {
    return redirect('/');
});
Route::get('/quiz', [QuizController::class, 'index'])->name('quiz');
Route::get('/quiz/{slug}', [QuizController::class, 'indexSpecificQuiz'])->name('specific-quiz');

// Basic pages
Route::get('/cookie-policy', [BasicPageController::class, 'cookiePolicy'])->name('cookie-policy');
Route::get('/about', [BasicPageController::class, 'about'])->name('about');

// Not part of MVP
// ---
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
