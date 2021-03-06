import React, { Component } from 'react';
import axios from 'axios';
export default class createUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
         username:''
    }
    this.onSubmit= this.onSubmit.bind(this);
    this.onChangeUsername= this.onChangeUsername.bind(this);
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    let user = {
      username: this.state.username
    }
    console.log(user);
    axios.post('http://localhost:5000/users/add',user)
    .then(res => console.log(res.data))
    .catch(err => console.log("error:", err))

  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label >Username: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              placeholder="description" />
            <small id="esername" className="form-text text-muted">Add username.</small>
          </div>
          <div className='form-group'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
