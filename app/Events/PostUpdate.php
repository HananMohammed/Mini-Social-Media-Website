<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PostUpdate implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $posts;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($posts, $user)
    {
        $this->posts = $posts;
        $this->user = $user;
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return [
            new PrivateChannel('update-post'),
            new PrivateChannel('App.Models.User.'.$this->user->id)
        ];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        $posts = ["posts" => []];

        foreach ($this->posts as $post) {
            $post = array_merge($post->toArray(), [
                'user' => $post->user,
            ]);

            array_push($posts["posts"], $post);
        }

        return $posts;

    }
}
