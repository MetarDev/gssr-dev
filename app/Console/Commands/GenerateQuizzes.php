<?php
declare(strict_types=1);

namespace App\Console\Commands;

use App\Logic\QuizGenerator;
use App\Models\Quiz;
use Illuminate\Console\Command;

class GenerateQuizzes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-quizzes {count} {--dry-run}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates a number of quizzes.';

    /**
     * QuizGenerator instance.
     *
     * @var QuizGenerator
     */
    private $quizGenerator;

    /**
     * Create a new command instance.
     *
     * @param QuizGenerator $quizGenerator
     */
    public function __construct(QuizGenerator $quizGenerator)
    {
        $this->quizGenerator = $quizGenerator;
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = (int) $this->argument('count');
        $isDryRun = $this->option('dry-run');
        $timeStart = microtime(true);
        $this->info(sprintf('Starting quiz generation %s', $isDryRun ? '(dry run)' : ''));
        $createdQuizzes = $this->quizGenerator->generateRandom($count, Quiz::DEFAULT_TIMER, $isDryRun);

        $end = round(microtime(true) - $timeStart, 5);
        $this->info("$createdQuizzes quiz created in {$end}s");
    }
}
