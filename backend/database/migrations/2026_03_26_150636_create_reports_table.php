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
        Schema::create('reports', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->foreignUlid('reporter_id')->constrained('users')->cascadeOnDelete();
            $table->ulidMorphs('reportable');
            $table->string('reason');
            $table->text('details')->nullable();
            $table->enum('status', ['open', 'in_review', 'resolved', 'dismissed'])
                ->default('open');
            $table->timestamps();

            $table->unique(['reporter_id', 'reportable_type', 'reportable_id']);
            $table->index('reporter_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
