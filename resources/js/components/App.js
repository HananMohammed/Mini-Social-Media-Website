import React, { useState, Component} from 'react';
import axios from 'axios';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            followings: [],
            followers: [],
            body: '',
            posts: [],
            searchposts:[],
            loading:false,
            show:false,
            query:'',
        };

        //bind method to the class
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelEditSubmit = this.handelEditSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
        this.handelDelete = this.handelDelete.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.closeOneModal = this.closeOneModal.bind(this);
        this.hanldeOnInputChange = this.hanldeOnInputChange.bind(this);

    }

    componentDidMount(){
        this.setState({
            followings: [...this.state.followings, following],
            followers: [...this.state.followers, followers]
        })

       // this.interval = setInterval(() => {this.getPosts()}, 1000)
        Echo.private('new-post').listen('PostCreated', (e) => {
             if(window.Laravel.user.following.includes(e.post.user_id )){
                 console.log("from Pusher", e, e.post.user_id);
                 this.setState({posts: [e.post, ...this.state.posts]})
             }
        })
    }

    componentWillUnMount() {
        clearInterval(this.interval);
    }

    componentWillMount(){
        this.getPosts();

    }
    hanldeOnInputChange(event){
        event.preventDefault()
        const query = event.target.value;
        this.setState({query: query});
        axios.post('/search',
            { querySearch: query},
        ).then(response=>{
            this.setState({ searchposts: [response] })
        })

    }

    handleModal(event){
       // event.preventDefault();
        let editPostId = event.target.getAttribute("postid")
        axios.get(`/post/${editPostId}/edit`)
            .then(response => {
                document.getElementById('editposttextarea').innerText = response.data;
                document.getElementById('editposthiddenInput').setAttribute("value", editPostId)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handelSubmit(event){
        event.preventDefault();
        this.postData()
    }

    handelEditSubmit(event){
        event.preventDefault();
        let updateId = document.getElementById('editposthiddenInput').getAttribute('value');

        axios.post(`/postUpdate/${updateId}`, {
            body: this.state.body
        })
            .then(res => {
                this.closeOneModal("exampleModal")

            })
    }
    closeOneModal(modalId) {

        // get modal
        const modal = document.getElementById(modalId);
        const modalBody = document.querySelector('body');
        // change state like in hidden modal
        modal.classList.remove('show');
        modalBody.classList.remove('modal-open');
        modalBody.setAttribute('style', '');

        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('style', 'display: none');

        // get modal backdrop
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');

        // remove opened modal backdrop
        document.body.removeChild(modalBackdrops[0]);
    }
    handleChange(event){
         this.setState({body:event.target.value});

    }
    handelDelete(event){
        event.preventDefault();
        let deletePostId = event.target.getAttribute("postid")
        axios.delete(`/post/${deletePostId}`)
            .then(response => {
                <div className="alert alert-success" id="footer" role="alert">
                    {response.data.success}
                </div>
            })
            .catch(function (error) {
                console.log(error);
            });
     }
    postData(){
        axios.post('/post', {
            body:this.state.body
        })
            .then(response => {
                this.setState({
                    posts: [response.data,...this.state.posts]
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ body: '' })
    }

    getPosts() {

        this.setState({
            loading: true
        });

        axios.get('/posts')
            .then(response => {
                this.setState({
                    posts:[...response.data.posts],
                    loading: false
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    renderPosts(){

       if(this.state.searchposts.length !== 0){
           return this.state.searchposts.map(
               searchpost => searchpost.data.map(
                   post =>
                       <div className="card timelin-post mb-3" key={post.id}>
                           <div className=" card-body post mb-5">
                               {(userCanModify === post.user.username) ?
                                   <div style={{ float: 'right' }}>
                                       <div className="dropdown">
                                           <div className="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                           </div>
                                           <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                               <button id="editbtn" postid={post.id} className="btn btn-primary ml-2" data-toggle="modal" data-target="#exampleModal" onClick={this.handleModal}>Edit Post</button>
                                               <input type="submit" postid={post.id} className="dropdown-item" type="button" value="delete post" onClick={this.handelDelete} />
                                           </div>
                                       </div>
                                   </div>
                                   : ""
                               }
                               <div className="card-title ml-3">
                                   <a href={`/users/${post.user.username}`}><img src={post.user.avatar} className="mr-3" />  {post.user.username}</a>
                                   {'  '}- <small className="text-muted px-1">{moment(post.user.created_at, 'h:m:s').fromNow()}</small>

                               </div>
                               <div className="card-text ml-5">{post.body} </div>
                               <div className="editmodal">
                                   <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                       <div className="modal-dialog modal-dialog-centered">
                                           <div className="modal-content">
                                               <div className="modal-header">
                                                   <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                   <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                       <span aria-hidden="true">&times;</span>
                                                   </button>
                                               </div>
                                               <form onSubmit={this.handelEditSubmit}>
                                                   <div className="modal-body">
                                                       <input type="text" id="editposthiddenInput" name="id" hidden />
                                                       <textarea className="form-control mb-3 mt-3" name="body" id="editposttextarea" rows="6" maxLength="340" onChange={this.handleChange} required />
                                                   </div>
                                                   <div className="modal-footer">
                                                       <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                       <input type="submit" className="btn btn-primary modalSave" value="Save changes" />
                                                   </div>
                                               </form>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>

                   )
           )
       }else{
           return this.state.posts.map(

               post =>
                   <div className="card timelin-post mb-3" key={post.id}>
                       <div className=" card-body post mb-5">
                           {(userCanModify === post.user.username) ?
                               <div style={{ float: 'right' }}>
                                   <div className="dropdown">
                                       <div className="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                       </div>
                                       <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                           <button id="editbtn" postid={post.id} className="btn btn-primary ml-2" data-toggle="modal" data-target="#exampleModal" onClick={this.handleModal}>Edit Post</button>
                                           <input type="submit" postid={post.id} className="dropdown-item" type="button" value="delete post" onClick={this.handelDelete} />
                                       </div>
                                   </div>
                               </div>
                               : ""
                           }
                           <div className="card-title ml-3">
                               <a href={`/users/${post.user.username}`}><img src={post.user.avatar} className="mr-3" />  {post.user.username}</a>
                               {'  '}- <small className="text-muted px-1">{moment(post.user.created_at, 'h:m:s').fromNow()}</small>

                           </div>
                           <div className="card-text ml-5">{post.body} </div>
                           <div className="editmodal">
                               <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                   <div className="modal-dialog modal-dialog-centered">
                                       <div className="modal-content">
                                           <div className="modal-header">
                                               <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                   <span aria-hidden="true">&times;</span>
                                               </button>
                                           </div>
                                           <form onSubmit={this.handelEditSubmit}>
                                               <div className="modal-body">
                                                   <input type="text" id="editposthiddenInput" name="id" hidden />
                                                   <textarea className="form-control mb-3 mt-3" name="body" id="editposttextarea" rows="6" maxLength="340" onChange={this.handleChange} required />
                                               </div>
                                               <div className="modal-footer">
                                                   <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                   <input type="submit" className="btn btn-primary modalSave" value="Save changes" />
                                               </div>
                                           </form>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
           )

       }

    }
    render() {
        const {query} = this.state ;
        return (
                <div className="row">
                    <div className="col-md-8 mt-3">
                        <div className="card">
                            <div className="card-header">TimeLine</div>

                            <div className="card-body">

                                <form onSubmit={this.handelSubmit}>
                                    <textarea className="form-control mb-3 mt-3" id="posttextarea"  onChange={this.handleChange} value={this.state.body} rows="6" maxLength="340" placeholder="What's in Your Mind" required />
                                    <input type="submit" className="form-control btn btn-primary"  id="postbtn" value="Post"/>
                                </form>
                                <div className="container">
                                    <div>
                                        <input type="text"
                                            className="form-control mb-3 mt-3"
                                            placeholder="Search Posts ......"
                                            id="searchFor"
                                            name="querySearch"
                                            value={query}
                                            onChange = {this.hanldeOnInputChange}

                                        />
                                    </div>
                                    <div className="col-md-12 mt-5">
                                        {this.renderPosts()}
                                    </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="col-md-4 mt-3">
                    <div className="row">
                        <div className="card col-md-12">
                            <div className="card-header">Followings</div>
                            <div className="card-body">
                                {this.state.followings.map(following =>

                                    following.map(follow =>
                                        <div className="card mb-3" key={Math.random()}>
                                            <div className=" card-body post">
                                                <div className="card-title">
                                                    <a href={`/users/${follow.username}`}><img src={follow.avatar} className="mr-3" />  {follow.username}</a>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                )}
                            </div>
                        </div>
                        <div className="card col-md-12 mt-3">
                            <div className="card-header">Followers</div>
                            <div className="card-body">
                                {this.state.followers.map(follower =>

                                    follower.map(follow =>
                                        <div className="card mb-3" key={Math.random()}>
                                            <div className=" card-body post">
                                                <div className="card-title">
                                                    <a href={`/users/${follow.username}`}><img src={follow.avatar} className="mr-3" />  {follow.username}</a>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default App ;
