<?php

namespace App\Console\Commands;

use App\Logic\questionGenerator;
use Illuminate\Console\Command;

class GenerateQuestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-questions';

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
        $this->questionGenerator->generateFeatureSupportQuestions();
        // $this->questionGenerator->generateBrowserSupportQuestions();
    }
}
