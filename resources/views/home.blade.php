@extends('layouts.app')

@section('content')
<div class="container">
    <div id="root"></div>
</div>
@endsection
@section('scripts')
<script type="text/javascript">
    let following = {!! $following !!} ; 
    let followers = {!! $followers !!} ; 
    let userCanModify = "{{ $userCanModify }}"; 
  
</script>
@endsection
