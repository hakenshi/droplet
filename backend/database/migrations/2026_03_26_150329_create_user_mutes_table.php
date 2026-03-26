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
        Schema::create('user_mutes', function (Blueprint $table): void {
            $driver = Schema::getConnection()->getDriverName();

            $table->ulid('id')->primary();
            $table->foreignUlid('muter_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUlid('muted_user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['muter_id', 'muted_user_id']);
            $table->index('muter_id');
            $table->index('muted_user_id');

            if ($driver !== 'sqlite') {
                $table->check('muter_id <> muted_user_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_mutes');
    }
};
