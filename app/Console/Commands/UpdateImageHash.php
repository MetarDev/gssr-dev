<?php

namespace App\Console\Commands;

use App\Helpers\Hasher;
use App\Logic\CanIUseApi;
use Illuminate\Console\Command;

class UpdateImageHash extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-image-hash';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates the image hash so we can force a cache refresh. Currently this just changes the hash for all images. Should be called manually each time an existing image changes (not necessarily on each deploy)';

    /**
     * Handles command
     *
     * @return void
     */
    public function handle()
    {
        $hash = Hasher::generateRandomShortHash();
        $this->info('New image hash: ' . $hash);
        $this->setEnvironmentValue('IMAGE_HASH', $hash);
        $this->call('config:clear');
        $this->call('cache:clear');

        if (env('APP_ENV') !== 'local') {
            $this->call('cloudways:restart-php-fpm');
            $this->call('cloudways:clear-varnish-cache');
        }
    }

    /**
     * Sets the value of an environment variable.
     *
     * Source: https://stackoverflow.com/questions/40450162/how-to-set-env-values-in-laravel-programmatically-on-the-fly/52548022#52548022
     *
     * @param string $envKey
     * @param string $envValue
     * @return void
     */
    private function setEnvironmentValue($envKey, $envValue)
    {
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);

        $str .= "\n"; // In case the searched variable is in the last line without \n
        $keyPosition = strpos($str, "{$envKey}=");
        $endOfLinePosition = strpos($str, PHP_EOL, $keyPosition);
        $oldLine = substr($str, $keyPosition, $endOfLinePosition - $keyPosition);
        $str = str_replace($oldLine, "{$envKey}=\"{$envValue}\"", $str);
        $str = substr($str, 0, -1);

        $fp = fopen($envFile, 'w');
        fwrite($fp, $str);
        fclose($fp);
    }
}
