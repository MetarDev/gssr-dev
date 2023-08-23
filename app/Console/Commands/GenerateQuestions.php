<?php
declare(strict_types=1);

namespace App\Console\Commands;

use App\Logic\QuestionGenerator;
use Illuminate\Console\Command;

class GenerateQuestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-questions {--dry-run}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates all possible question combinations.';

    /**
     * QuestionGenerator instance.
     *
     * @var QuestionGenerator
     */
    private $questionGenerator;

    /**
     * Create a new command instance.
     *
     * @param QuestionGenerator $questionGenerator
     */
    public function __construct(QuestionGenerator $questionGenerator)
    {
        $this->questionGenerator = $questionGenerator;
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');
        $timeStart = microtime(true);
        $this->info(sprintf('Starting question generation %s', $isDryRun ? '(dry run)' : ''));
        // $createdQuestion = $this->questionGenerator->generateBrowserSupportQuestions($isDryRun);

        $end = round(microtime(true) - $timeStart, 5);
        $this->info("$createdQuestion questions created in {$end}s");
    }
}
