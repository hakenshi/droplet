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
        Schema::create('follow_requests', function (Blueprint $table): void {
            $driver = Schema::getConnection()->getDriverName();

            $table->ulid('id')->primary();
            $table->foreignUlid('requester_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUlid('recipient_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['requester_id', 'recipient_id']);
            $table->index('requester_id');
            $table->index('recipient_id');

            if ($driver !== 'sqlite') {
                $table->check('requester_id <> recipient_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_requests');
    }
};
