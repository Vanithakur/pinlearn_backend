<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [        
            'title' =>  'required',  
            'description' => 'required', 
            'image' => 'required',            
            'video_url' => 'required',
            'payment_type' => 'required',
            'enroll_type_id' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
            'status' => 'required',
            'price' => 'required',
            'age' => 'required',
            'grade_id' => 'required',
            'user_id' => 'required'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ]));
    }
}
