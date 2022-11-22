<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'video_url' => $this->video_url,
            'payment_type' => $this->payment_type,
            'enroll_type_id' => $this->enroll_type_id,
            'start_date' => $this->start_date,
            'end_time' => $this->end_time,
            'status' => $this->status,
            'price' => $this->price,
            'age' => $this->age,
            'grade_id' => $this->grade_id,
            'user_id' => $this->user_id

        ];
    }
}
