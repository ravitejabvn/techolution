import React, { Component } from 'react';
import './App.css';
import data from './data.json'

class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      studentData: []
    }
  }

  componentDidMount(){
    for(var v=0; v<data.length; v++){
      data[v].totalMarks = this.calculateMarks(data[v].marks);
      data[v].status = this.qualifiedStatus(data[v].marks);
    }
    var top = data.sort((a,b) =>(a.totalMarks > b.totalMarks) ? 1 : ((b.totalMarks > a.totalMarks) ? -1 : 0))
    var topMark = top[data.length-1].totalMarks;
    var topArr = data.filter(x => x.totalMarks === topMark);
    for(var t=0; t<topArr.length; t++){
      var tNo = topArr[t].rollNumber;
      data.find(x => x.rollNumber === tNo).status = 'Topper';
    }

    data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    console.log(data);
    this.setState({
      studentData: data
    })
  }

  qualifiedStatus = (marks) => {
    var vals = Object.values(marks);
    var status = vals.find( x => x < 20)
    var result = status !== undefined ? 'Fail' : 'Pass';
    return result;
  }

  calculateMarks = (marks) => {
    var vals = Object.values(marks);
    const reducer = (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue);
    return vals.reduce(reducer);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <table>
            <tbody>
            <tr>
              <th>Student Name</th>
              <th>Roll​ ​Number</th>
              <th>Total​ ​Marks</th>
              <th>Status</th>
            </tr>
              {
                this.state.studentData.map((student, index) => (
                  <tr key={index} className={student.status === 'Topper' ? 'color-green' : student.status === 'Fail' ? 'color-red' : ''}>
                    <td className="sutdent-name">{student.name}</td>
                    <td>{student.rollNumber}</td>
                    <td>{student.totalMarks}</td>
                    <td>{student.status}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
