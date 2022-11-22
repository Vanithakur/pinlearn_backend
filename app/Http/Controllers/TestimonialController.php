<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $testimonial = Testimonial::all();
            // $search = $request['search'] ?? "";
            // if($search != ""){
            //     $Testimonial  = Testimonial::where('name','LIKE',"%$search%")->get();
            // }
            // else{
            //     $Testimonial = Testimonial::all();
            //     // $categories = Testimonial::with('Testimonial')->get();
            // }
           
            return TestimonialResource::collection($testimonial);
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
    public function store(StoreTestimonialRequest $request)
    {
        try {

            $testimonial = Testimonial::create($request->all());

            return new TestimonialResource($testimonial);
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
    public function update(StoreTestimonialRequest $request, Testimonial $testimonial)
    {
        try {

            $testimonial->update($request->all());

            return new TestimonialResource($testimonial);
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
    public function destroy(Testimonial $testimonial)
    {
        try {
            $testimonial->delete();
            return response()->json(['message' => 'Record deleted successfully']);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
}
