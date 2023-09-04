<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RestartPhpFpm extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:restart-php-fpm';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Restarts the PHP FPM on Cloudways';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $service = new \Cloudways\Server\Service\Service();
        $service->SetEmail(env('CLOUDWAYS_EMAIL'));
        $service->SetKey(env('CLOUDWAYS_API_KEY'));
        $service->manageServices(env('CLOUDWAYS_SERVER_ID'), 'php8.1-fpm', 'restart');
    }
}
