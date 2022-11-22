<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Category;
use App\Models\Subject;
use App\Models\SubjectsCategory;

class SubjectController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/subject",
     *      operationId="getProjectsList",
     *      tags={"Subject"},
     *      summary="Get list of Subjects",
     *      description="Returns list of Subjects",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *     )
     */
    public function index()
    {
        try {
            $search = $request['search'] ?? "";
            if ($search != "") {
                $categories  = Category::where('name', 'LIKE', "%$search%")->get();
            } else {
                $categories = Subject::with('category')->get();
            }

            return SubjectResource::collection($categories);
        } catch (\Throwable $e) {

            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    /**
     * Add a new category to the store.
     *
     * @OA\Post(
     *     path="/api/subject",
     *     tags={"Subject"},
     *     operationId="storeSubject",
     * @OA\RequestBody(
     *       required=true,
     *       description="Bulk products Body",
     *       @OA\JsonContent(
     * 			@OA\Property(
     *      			property="subject",
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
    public function store(StoreSubjectRequest $request)
    {
        try {
            $subject = Subject::create($request->all());
            $catId = $request->category_id;
            foreach ($catId as $cat) {
                if ($cat) {
                    $category = Category::find($cat);
                }
                if ($subject && $category) {
                    SubjectsCategory::create(['subject_id' => $subject->id, 'category_id' => $category->id]);
                }
            }

            return new SubjectResource($subject);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    /**
     * Update an existing category.
     *
     * @OA\Put(
     *     path="/api/subject/{id}",
     *     tags={"Subject"},
     *     operationId="updateSubject",
     *   @OA\Parameter(
     *          name="id",
     *          description="category id",
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
     *      			property="subject",
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
    public function update(StoreSubjectRequest $request, Subject $subject)
    {

        try {

            $subject->update($request->all());
            $catId = SubjectsCategory::where('subject_id', $subject->id)->get();

            foreach ($catId as $cid) {
                SubjectsCategory::where('category_id', $cid->category_id)
                    ->where('subject_id', $subject->id)->delete();
            }

            foreach ($request->category_id as $cat_id) {
                SubjectsCategory::create(['subject_id' => $subject->id, 'category_id' => $cat_id]);
            }


            return new SubjectResource($subject);
        } catch (\Throwable $e) {

            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

   /**
     * @OA\Delete(
     *     path="/api/subject/{id}",
     *     tags={"Subject"},
     *     summary="Deletes a subject",
     *     operationId="destroySubject",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="subject id to delete",
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
    public function destroy(Subject $Subject)
    {
        try {
            $Subject->delete();
            return response()->json(['message' => 'Record deleted successfully']);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
}
