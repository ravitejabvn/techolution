import React, { Component } from 'react';
import './App.css';

class StudentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fieldFlags: {
                name: false,
                lastname: false,
                className : false,
                year: false,
                percentage: false
            },
            isValidForm : false,
            fields: [],
            isSubmitted: false
        }
    }

    componentDidMount() {
        document.getElementById("btnSubmit").setAttribute("disabled",true);
    }

    validate = (regex, field, value) => {
        var res = value.match(new RegExp(regex));
        let flag = Object.assign({}, this.state.fieldFlags);
        res === null ? flag[field] = false : flag[field] = true;
        this.setState({fieldFlags : flag},() => {
            this.validateForm();
        });
    }

    validateField = (e, field) => {
        if(this.state.fields.indexOf(field) === -1){
            this.state.fields.push(field);
            this.setState({
                fields: this.state.fields
            })
        }
        var val = e.target.value;
        var regex;
        if(field === 'name' || field === 'lastname') {
            regex = '^[a-zA-Z]+$';
        } else if(field === 'className') {
            regex = '^[a-zA-Z0-9]+$';
        } else if(field === 'year') {
            regex = '';
        } else {
            regex = '^[0-9]+$';
        }
        this.validate(regex, field, val);
    }

    validateForm = () => {
        var flds = this.state.fields;
        var isValid = [];
        for(let v=0; v<flds.length; v++){
            var valid = this.state.fieldFlags[flds[v]];
            isValid.push(valid);
        }
        console.log(isValid);
        if(flds.length === 5 && isValid.indexOf(false) === -1){
            this.setState({isValidForm: false});
            document.getElementById("btnSubmit").removeAttribute("disabled");
        } else if(flds.length === 5 && isValid.indexOf(false) !== -1) {
            this.setState({isValidForm: true});
        }
    }

    submitForm = () => {
        this.setState({isSubmitted: true});
    }


  render() {
    return (
        <div className="App">
        <header className="App-header">
            <div className="verfiy-form">
                <div>
                    <h2>Student registration form</h2>
                    <input type="text" placeholder="Name" maxLength="20" onKeyUp={(e) => this.validateField(e, 'name')}></input>
                    <input type="text" placeholder="Last Name" maxLength="20" onKeyUp={(e) => this.validateField(e, 'lastname')}></input>
                    <input type="text" placeholder="class" onKeyUp={(e) => this.validateField(e, 'className')}></input>
                    <select onChange={(e) => this.validateField(e, 'year')}>
                        <option disabled="disabled" selected>Year Of Passing</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                    </select>
                    <input type="text" placeholder="Percentage" onKeyUp={(e) => this.validateField(e, 'percentage')}></input>
                    <input type="button" value="Submit" id="btnSubmit" onClick={() => this.submitForm()}></input>
                </div>
                <div>
                    {
                        this.state.isValidForm ? 
                        <div className="validation-box">
                                    <p>1. Name (accepts only alphabets a-zA-Z, max character size:20) </p>
                                    <p>2. Last Name (accepts only alphabets a-zA-Z, max character size:20) </p>
                                    <p>3. Class (accepts both numeric and string values, eg. 5A) </p>
                                    <p>4. Year of passing (accepts only number, any year after 2017 should be invalid) </p>
                                    <p>5. Percentage of marks (accepts only number)</p>
                                </div>
                        : ''
                    }
                </div>
            </div>
            {
                this.state.isSubmitted ? <p>Form Submitted Successfully</p> : ''
            }
        </header>
      </div>
    );
  }
}

export default StudentForm;
