<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $page = Page::all();
            // $search = $request['search'] ?? "";
            // if($search != ""){
            //     $page  = Page::where('name','LIKE',"%$search%")->get();
            // }
            // else{
            //     $page = Page::all();
            //     // $categories = Page::with('Page')->get();
            // }

            return PageResource::collection($page);
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
    public function store(StorePageRequest $request)
    {
        try {

            $page = Page::create($request->all());

            return new PageResource($page);
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
    public function update(StorePageRequest $request, Page $page)
    {
        try {

            $page->update($request->all());

            return new PageResource($page);
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
    public function destroy(Page $page)
    {
        try {
            $page->delete();
            return response()->json(['message' => 'Record deleted successfully']);
        } catch (\Throwable $e) {
            return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }
}
