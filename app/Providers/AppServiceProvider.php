<?php

namespace App\Providers;

use App\Models\Post;
use Carbon\Carbon;
use Godruoyi\Snowflake\Snowflake;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(Snowflake::class, function () {
            return (new Snowflake())->setStartTimeStamp(strtotime('2025-01-01') * 1000);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
