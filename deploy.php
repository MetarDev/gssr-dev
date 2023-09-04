<?php
namespace Deployer;

require 'recipe/laravel.php';

// Config

set('repository', 'git@github.com:igrginov/support-guesser.git');

set('keep_releases', 7);

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts
host('guess.dev')
    ->set('remote_user', 'ivan.grginov')
    ->set('deploy_path', '~/public_html');

// Hooks

// Tasks
task('buildVite', function () {
    runLocally('npm install');
    runLocally('npm run build');
});

task('upload', function () {
    upload(__DIR__ . "/public/build", '{{release_path}}/public');
});

task('artisan:clear-config-before-restart', artisan('config:clear'));
task('artisan:restart-php-fpm', artisan('app:restart-php-fpm'));

after('deploy:prepare', 'buildVite');
after('deploy:prepare', 'upload');

after('deploy:failed', 'deploy:unlock');
after('deploy:success', 'artisan:clear-config-before-restart');
after('deploy:success', 'artisan:restart-php-fpm');
