@extends('layouts.app')

@section('content')
<div class="container">
    <div >{{ $user->username }}</div>
    @if(auth()->user()->isNotTheUser($user))
        @if(auth()->user()->isFollowing($user))
            <a href="{{route('users.unfollow', $user)}}">unfollow</a>
        @else
            <a href="{{route('users.follow', $user)}}">follow</unfollow>
        @endif
    @endif
</div>
 
@endsection
