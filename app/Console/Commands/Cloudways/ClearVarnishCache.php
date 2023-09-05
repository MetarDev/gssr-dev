<?php

namespace App\Console\Commands\Cloudways;

use App\Console\CloudwaysApi;
use Illuminate\Console\Command;

class ClearVarnishCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cloudways:clear-varnish-cache';

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
    protected $description = 'Clears the Varnish cache on Cloudways';

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
        $this->cloudwaysApi->call('POST', '/service/varnish', $this->cloudwaysApi->fetchAccessToken(), [
            'server_id' => env('CLOUDWAYS_SERVER_ID'),
            'action' => 'purge',
        ]);
    }
}
