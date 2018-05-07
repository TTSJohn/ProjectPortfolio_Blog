import React, {Component} from 'react';
import { Link } from 'react-router';
import '../css/Blog.css';
import Post from './Post'
import Navbar from './Navbar'
import { isLoggedIn } from '../utils/AuthService';

var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://johnnyy.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://my_api_endpoint',
    issuer: "https://johnnyy.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.listen(port);

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
			<Navbar />
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