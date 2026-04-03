<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreReportRequest;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Report;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ReportController extends Controller
{
    public function storePost(StoreReportRequest $request, Post $post): JsonResponse
    {
        return $this->store($request, $post);
    }

    public function storeComment(StoreReportRequest $request, Comment $comment): JsonResponse
    {
        return $this->store($request, $comment);
    }

    private function store(StoreReportRequest $request, Model $reportable): JsonResponse
    {
        $report = Report::query()->firstOrCreate([
            'reporter_id' => $request->user()->id,
            'reportable_type' => $reportable::class,
            'reportable_id' => $reportable->id,
        ], [
            'reason' => $request->string('reason')->toString(),
            'details' => $request->string('details')->toString() ?: null,
            'status' => 'open',
        ]);

        if (! $report->wasRecentlyCreated) {
            return response()->json([
                'message' => 'Report already submitted.',
                'status' => $report->status,
                'report_id' => (string) $report->id,
            ]);
        }

        return response()->json([
            'message' => 'Report submitted.',
            'status' => $report->status,
            'report_id' => (string) $report->id,
        ], Response::HTTP_CREATED);
    }
}
