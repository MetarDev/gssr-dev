<?php

namespace App\Console\Commands\Cloudways;

use App\Console\CloudwaysApi;
use App\Exceptions\CloudwaysApiFailedRequestException;
use Illuminate\Console\Command;

class RestartPhpFpm extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cloudways:restart-php-fpm';

    /**
     * Cloudways API object
     *
     * @var CloudwaysApi
     */
    private CloudwaysApi $cloudwaysApi;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Restarts the PHP FPM on Cloudways';

    /**
     * Constructs object.
     *
     * @param CloudwaysApi $cloudwaysApi
     */
    public function __construct(CloudwaysApi $cloudwaysApi)
    {
        parent::__construct();
        $this->cloudwaysApi = $cloudwaysApi;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $this->cloudwaysApi->call('POST', '/service/state', $this->cloudwaysApi->fetchAccessToken(), [
                'server_id' => env('CLOUDWAYS_SERVER_ID'),
                'service' => 'php8.1-fpm',
                'state' => 'restart'
            ]);
            $this->info('PHP FPM restarted!');
        } catch (CloudwaysApiFailedRequestException $e) {
            $this->error("Cloudways API call failed (clearing php-fpm): {$e->getMessage()}");
        } catch (\Exception $e) {
            $this->error("Unknown error: {$e->getMessage()}");
        }
    }
}
