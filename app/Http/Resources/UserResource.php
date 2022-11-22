<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fullname' => $this->name,
            'username' => $this->username,
            'password' => $this->password,
            'email' => $this->email,
            'avatar_image'=> $this->profile_image,
            'address' => $this->address,
            'country' => $this->country,
            'state' => $this->state,
            'zipcode' => $this->zipcode,
            'language_id' => $this->language_id,
            'biography' => $this->biography,
            'verify_token' => $this->verify_token,
            'phone' => $this->phone,
            'youtube_id' => $this->youtube_id,
            'commision_rate' => $this->commision_rate,
            'is_email_verified' => $this->is_email_verified,
            'is_featured' => $this->is_featured,
            'is_phone_verified' => $this->is_phone_verified,
            'in_home_page' => $this->in_home_page,
            'status' => $this->status,
            'action' => $this->action,
            'languages' => $this->languages,
        ];

    }
}
