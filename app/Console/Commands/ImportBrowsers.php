<?php

namespace App\Console\Commands;

use App\Logic\CanIUseApi;
use Illuminate\Console\Command;

class ImportBrowsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-browsers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports all browsers from caniuse.com';

    /**
     * CanIUseApi instance.
     *
     * @var CanIUseApi
     */
    private $canIUseApi;

    /**
     * Create a new command instance.
     *
     * @param CanIUseApi $canIUseApi
     */
    public function __construct(CanIUseApi $canIUseApi)
    {
        $this->canIUseApi = $canIUseApi;
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->canIUseApi->importBrowsers();
    }
}
