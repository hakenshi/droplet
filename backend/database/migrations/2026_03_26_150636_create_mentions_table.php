<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mentions', function (Blueprint $table): void {
            $driver = Schema::getConnection()->getDriverName();

            $table->ulid('id')->primary();
            $table->foreignUlid('post_id')->nullable()->constrained('posts')->nullOnDelete();
            $table->foreignUlid('comment_id')->nullable()->constrained('comments')->nullOnDelete();
            $table->foreignUlid('mentioned_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUlid('mentioned_user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('start_position')->nullable();
            $table->integer('end_position')->nullable();
            $table->timestamps();

            $table->unique(
                ['post_id', 'comment_id', 'mentioned_by_user_id', 'mentioned_user_id'],
                'mentions_target_unique'
            );
            $table->index('post_id');
            $table->index('comment_id');
            $table->index('mentioned_by_user_id');
            $table->index('mentioned_user_id');

            if ($driver !== 'sqlite') {
                $table->check('(post_id IS NOT NULL AND comment_id IS NULL) OR (post_id IS NULL AND comment_id IS NOT NULL)');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentions');
    }
};
