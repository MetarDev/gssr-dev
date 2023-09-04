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

task('clear_op_cache', function() {
    opcache_reset();
});

after('deploy:vendors', 'buildVite');
after('deploy:publish', 'upload');

after('deploy:failed', 'deploy:unlock');
after('success', 'clear_op_cache');
