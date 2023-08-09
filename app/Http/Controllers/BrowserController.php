<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Browser;

class BrowserController extends Controller
{
    /**
     * Returns all browsers that have any global usage.
     *
     * @return Collection
     */
    public function getAllUsed()
    {
        return Browser::where('usage_global', '>', 0)
            ->orderBy('usage_global', 'desc')
            ->get();
    }
}
