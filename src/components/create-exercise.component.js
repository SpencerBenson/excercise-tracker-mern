import React, { Component } from 'react';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercise extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
    .then(res => {
      console.log(res.data);
      if(res.data.length>0){
        this.setState({
          users: res.data.map(user=> user.username),
          username: res.data[0].username
        })
      }})
    
  }
  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeDuration(e) {
    this.setState({ duration: e.target.value });
  }

  onChangeDate(date) {
    this.setState({ date: date });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }
    console.log(exercise);
    axios.post('http://localhost:5000/exercises/add',exercise)
    .then(res => {
      console.log(res.data)
        window.location='/';
      })
    .catch(err => console.log("error: ", err));

  }


  render() {
    return (
      <div>
        <h3>Create new Excercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label >Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >{
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}</option>
                })
              }
            </select>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Description:</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              placeholder="description" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Duration(in minutes):</label>
            <input type="number"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              placeholder="Time duration" />
          </div>
          <div className="form-group">
            <Datepicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className='form-group'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
