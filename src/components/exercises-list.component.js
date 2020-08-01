import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
  <td>{props.exercise.username}</td>
  <td>{props.exercise.description}</td>
  <td>{props.exercise.duration}</td>
  <td>{props.exercise.date.substring(0,10)}</td>
  <td> <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <button onClick={() => { props.deleteExercise(props.exercise._id)}}>Delete</button> </td> 
</tr>
)
  


export default class ExercisesList extends Component {
  constructor(props) {
    super(props)

      this.deleteExercise = this.deleteExercise.bind(this);
      this.getExercisesList = this.getExercisesList.bind(this);

    this.state = {
         exercises:[]
    }
  }
  componentDidMount(){
    axios.get('http://localhost:5000/exercises')
    .then(res => {
      console.log(res.data)
      this.setState({
        exercises: res.data
      })
    })
    .catch(err=> console.log(err));
  }
  deleteExercise(id){
    axios.delete('http://localhost:5000/exercises/'+id)
    .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el=> el._id !== id)
    })
  }
  getExercisesList(){

    const exercises = this.state.exercises;
   return exercises.map(exercise=> {
      return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />
    })
  }

  render() {
   
    return (
      <div>
        <table className="table">
  <thead className="thead-light">
    <tr>
      <th scope="col">User</th>
      <th scope="col">Description</th>
      <th scope="col">Date</th>
      <th scope="col">Duration</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   {this.getExercisesList()}
  </tbody>
</table>
      </div>
    )
  }
}
