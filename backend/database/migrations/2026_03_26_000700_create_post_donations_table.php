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
        Schema::create('post_donations', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->foreignUlid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUlid('post_id')->constrained('posts')->cascadeOnDelete();
            $table->decimal('amount', 10, 2);
            $table->enum('payment_status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->timestamps();

            $table->index('user_id');
            $table->index('post_id');
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_donations');
    }
};
