import React, {Component} from 'react';
import '../css/Blog.css';
import Post from './Post'

class Blog extends Component {
	constructor(){
		super();
		this.state = {
			posts: []
		}
	}

	addPost(){
		this.state.posts.push(
		{
			id: Date.now()
		}
			);
		this.setState(
		{
			posts: this.state.posts
		}
		);
	}

	deletePost(id){
		let newPostArr = this.state.posts;
		newPostArr.map((post, index) => {
			if (id === post.id){
				newPostArr.splice(index,1);
			}
		});
		this.setState(
		{
			posts: newPostArr
		}
		);
	}

	render(){
		return (
      <div className="bodyElement">
        <div className="div-board">
          <div className="row">

          	{
          		this.state.posts.map(post => {
          			return <Post key={post.id} id={post.id} deleteHandler={this.deletePost.bind(this)} />

          		})
          	}


          </div>
        </div>
        <div>
          <button className="btn btn-success add-button" onClick={this.addPost.bind(this)}>Add New Blog Post</button>

        </div>
      </div>
		);
	}

}

export default Blog;