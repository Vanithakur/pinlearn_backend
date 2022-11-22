<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            // $search = $request['search'] ?? "";
            // if ($search != "") {
            //     $categories = Topic::whereRelation('category', function (Builder $query)use ($search) {
            //         $query->where('name', 'like',  "%$search%");
            //     })->get();
                
            // } else {
            //     $categories = Topic::with(['category', 'subject'])->get();
            // }
            $course = Course::all();
           
            return CourseResource::collection($course);
        } catch (\Throwable $e) {

            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCourseRequest $request)
    {
        try {
            $course = Course::create($request->all());
            $catId = $request->category_id;
            // foreach ($catId as $cat) {
            //     if ($cat) {
            //         $category = Category::find($cat);
            //     }
            //     if ($subject && $category) {
            //         SubjectsCategory::create(['subject_id' => $subject->id, 'category_id' => $category->id]);
            //     }
            // }
            return new courseResource($course);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(
        StorecourseRequest $request,
        course $course
    ) {
        try {

            $course->update($request->all());
        
            return new CourseResource($course);
        } catch (\Throwable $e) {

            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        try {
            $course->delete();
            return response()->json(['message' => 'Record deleted successfully']);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
}
