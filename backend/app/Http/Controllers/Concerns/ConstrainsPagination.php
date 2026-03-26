<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;

trait ConstrainsPagination
{
    private const int DEFAULT_PER_PAGE = 20;

    private const int MIN_PER_PAGE = 1;

    private const int MAX_PER_PAGE = 50;

    private function resolvePerPage(Request $request): int
    {
        $perPage = $request->integer('per_page', self::DEFAULT_PER_PAGE);

        return min(max($perPage, self::MIN_PER_PAGE), self::MAX_PER_PAGE);
    }
}
