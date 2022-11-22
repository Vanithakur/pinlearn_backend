<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreUserRequest extends FormRequest
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
            'fullname' =>  ['required', 'max:50'],
            'username' => ['required', 'max:50','unique:users,username'],
            'password' => 'required',            
            'email' =>  ['required','email','unique:users,email'],
            'address' => 'required',
            'country' => 'required',
            'state' => 'required',
            'zipcode' => 'required',
            'phone' => 'required',
            'commision_rate' => '',
            'is_email_verified' => '',
            'is_featured' => '',
            'is_phone_verified' => '',
            'in_home_page' => '',
            'status' => '',
            'action' => '',
            'avatar_image' => '',
            'language_id' => '',
            'biography' => '',
            'verify_token' => '',
            'youtube_id' => '',
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
