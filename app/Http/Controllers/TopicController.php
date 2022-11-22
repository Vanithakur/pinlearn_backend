<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTopicRequest;
use App\Http\Resources\TopicResource;
use App\Models\Category;
use App\Models\SubjectsCategory;
use App\Models\Topic;
use App\Models\TopicsCategory;
use App\Models\TopicsSubject;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/topic",
     *     tags={"Topic"},
     *     summary="get all topic",
     *     description="Multiple status values can be provided with comma separated string",
     *     operationId="indexTopic",
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid status value"
     *     )
     * )
     */
    public function index(Request $request)
    {
        try {

            $search = $request['search'] ?? "";
            if ($search != "") {
                $categories = Topic::whereRelation('category', function (Builder $query) use ($search) {
                    $query->where('name', 'like',  "%$search%");
                })->get();
            } else {
                $categories = Topic::with(['category', 'subject'])->get();
            }

            return TopicResource::collection($categories);
        } catch (\Throwable $e) {

            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    /**
     * Add a new category to the store.
     *
     * @OA\Post(
     *     path="/api/topic",
     *     tags={"Topic"},
     *     operationId="storeTopic",
     * @OA\RequestBody(
     *       required=true,
     *       description="Bulk products Body",
     *       @OA\JsonContent(
     * 			@OA\Property(
     *      			property="topic",
     * 			)
     *       )
     *     ),
     *      @OA\Response(
     *      response=200,
     *       description="Success",
     *   ),
     *     @OA\Response(
     *         response=405,
     *         description="Invalid input"
     *     ),
     * 
     * )
     */
    public function store(StoreTopicRequest $request)
    {
        try {
            $topic = Topic::create($request->all());
            $catId = $request->category_id;

            foreach ($catId as $id) {
                if ($id) {
                    $category = Category::find($id);
                }
                if ($topic && $category) {
                    $categoriestopic = TopicsCategory::create(['topic_id' => $topic->id, 'category_id' => $category->id]);
                }
            }
            $subId = $request->subject_id;
            foreach ($subId as $sid) {
                if ($category->id) {
                    $category_sub = SubjectsCategory::where('category_id', $category->id)->get(['subject_id']);

                    foreach ($category_sub as $sub) {

                        if ($sub->subject_id == $sid) {
                            TopicsSubject::create(['topic_id' => $topic->id, 'subject_id' =>  $sub->subject_id]);
                        }
                    }
                }
            }

            return new TopicResource($topic);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
    /**
     * Update an existing category.
     *
     * @OA\Put(
     *     path="/api/topic/{id}",
     *     tags={"Topic"},
     *     operationId="updateTopic",
     *   @OA\Parameter(
     *          name="id",
     *          description="topic id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     * @OA\RequestBody(
     *       required=true,
     *       description="Bulk products Body",
     *       @OA\JsonContent(
     * 			@OA\Property(
     *      			property="topic",
     * 			)
     *       )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid ID supplied"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Pet not found"
     *     ),
     *     @OA\Response(
     *         response=405,
     *         description="Validation exception"
     *     ),
     *     security={
     *         {"petstore_auth": {"write:category", "read:category"}}
     *     },
     * )
     */
    public function update(
        StoreTopicRequest $request,
        Topic $topic
    ) {
        try {
            $topic->update($request->all());
            $catId = TopicsCategory::where('topic_id', $topic->id)->get();
            $subId = TopicsSubject::where('topic_id', $topic->id)->get();

            foreach ($catId as $cat_id) {
                TopicsCategory::where('category_id', $cat_id->category_id)
                    ->where('topic_id', $topic->id)->delete();
            }

            foreach ($subId as $sub_id) {
                TopicsSubject::where('subject_id', $sub_id->subject_id)
                    ->where('topic_id', $topic->id)->delete();
            }

            foreach ($request->category_id as $cat_id) {
                TopicsCategory::create(['topic_id' => $topic->id, 'category_id' => $cat_id]);
            }

            foreach ($request->subject_id as $sub_id) {
                TopicsSubject::create(['topic_id' => $topic->id, 'subject_id' => $sub_id]);
            }

            return new TopicResource($topic);
        } catch (\Throwable $e) {

            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/topic/{id}",
     *     tags={"Topic"},
     *     summary="Deletes a topic",
     *     operationId="destroyTopic",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="topic id to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid ID supplied",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Pet not found",
     *     ),
     *     security={
     *         {"petstore_auth": {"write:category", "read:category"}}
     *     },
     * )
     */
    public function destroy(Topic $topic)
    {
        try {
            $topic->delete();
            return response()->json(['message' => 'Record deleted successfully']);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
}
