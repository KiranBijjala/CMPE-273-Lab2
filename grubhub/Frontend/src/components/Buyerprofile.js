import React, { Component } from 'react';
import '../App.css';
import '../css/Buyerprofile.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/new.css';
import { getProfile } from '../actions'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import NavBar from './NavBar.js';
import { getUserImage } from '../actions'
import BuyerOwnerNav from './Display/BuyerOwnerNav'
import ROOT_URL from './const'
//Define a Login Component
class Buyerprofile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            first_name: "",
            last_name: "",
            profilepic: '',
            email: "",
            password: "",
            authFlag: false,
            failuser: false,
            selectedFile: null,
            phone: '',
            newEmail: '',
            // path: ''
        }
    }

    //Call the Will Mount to set the auth Flag to false

    componentWillMount() {

        let path = '/Users/kirankumarbijjala/Documents/Lab2/grubhub/Backend/public/profile/Avatar.png';

        this.setState({
            authFlag: false,
            authFailed: false,
            profilepic: '',
            
        })

        let temp = sessionStorage.getItem('email')

        let data = { email: temp }
        console.log(data.email)

        this.props.getProfile({ params: data }, (response) => {
            console.log(this.props.user)
            // let img = '/Users/kirankumarbijjala/Documents/Lab2/grubhub/Backend/public/profile/'+response.data.image
            // console.log(img);
            console.log(response.data);
            this.setState({
                email: response.data.email,
                phone: response.data.phone,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                // profilepic:data.data.image,
                // profilepic: img

            })
            
        });

        axios.post(`${ROOT_URL}/userimage`, data).then(response => {
                    // console.log('Axios get:', response.data)
                    this.setState({
                        profilepic: 'data:image/png;base64, ' + response.data

                    })
                })
                
}

    update = (e) => {
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: sessionStorage.getItem('email'),
            phone: this.state.phone,
            password: this.state.password,
            // path:this.state.path
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/update`, data)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        password: response.data.password,
                        // email: response.data[0].email,
                        phone: response.data.phone


                    });
                    alert("Profile Update Succefully");
                } else {
                    console.log('Change failed !!! ');

                }
                // this.props.loginuser(data);
            });
           
    }
    imageChangeHandler = e => {
        this.setState({
            file: e.target.files[0]
        })
    }

    uploadImage = e => {
        e.preventDefault()
        console.log(this.state.file);
        const formData = new FormData()

        let email = sessionStorage.getItem('email')
        formData.append('myImage', this.state.file, email)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post('/userprofile', formData, config)
            .then(response => {
                let data = { 'email': email }
                axios.post(`${ROOT_URL}/userimage`, data).then(response => {
                    console.log('Axios get:', response.data)
                    this.setState({
                        profilepic: 'data:image/png;base64, ' + response.data
                    })
                })
                
            })
            .catch(error => { })
    }



    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    onSubmit = (e) => {
        console.log("in submit profile");
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            path :this.state.path
        }
        console.log("in submit profile  data:" + data);
        this.props.getProfile(data
            , (res) => {
                console.log("update profile", res.data);
                if (res.status === 200) {
                    console.log(res.data[0]);
                    // sessionStorage.setItem('Email', res.data[0].Email);
                    // this.props.history.push('/login');
                }
            })
    }

    renderInput = ({ input, label, meta }) => {
        return (<div>
            <div htmlFor='email' style={{ color: 'black' }}>
                {label}
            </div>
            <input className="form-control" {...input} />
            {this.renderError(meta)}
        </div>);
    }

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (<label style={{ color: 'red' }}>{error}</label>)
        }


    }


    render() {
        let updatePic = null

        if (this.state.file !== '') {
            updatePic = (
                <button
                    className='btn btn-link'
                    type='submit'
                >
                    Update
        </button>
            )
        }
        //redirect based on successful login
        // let createlogin = null;

        // if (!cookie.load('cookie')) {
        //     createlogin = <Redirect to="/login" />
        // }

        let redirectVar  = null
    if (sessionStorage.getItem('JWT' === null)){ 
      redirectVar  = <Redirect to='/login'/>
    }


        let createlogin = null;
        if (this.state.authFlag) {
            createlogin = <Redirect to="/login" />
        }

        return (
            <div>
                {createlogin}
                {redirectVar}
                <div className="row">
                    <div className="col-sm-2">
                        <BuyerOwnerNav/>                       
                         </div>

                    <div className="col-sm-10">
                        <div class="container">
                            <div class="login-form">
                                <div className="column-change">
                                    {/* <div class="main-div"> */}
                                    <div class="panel">
                                        <h2 style={{ fontWeight: "bold", color: "black" }}>Your account</h2>
                                    </div>

                                    <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                                        <div>
                                            <img
                                                src={this.state.profilepic}
                                                width='300'
                                                height='300'
                                            />
                                            <input
                                                type='file'
                                                onChange={this.imageChangeHandler}
                                                name='myImage'
                                                id='myImage'
                                            />
                                            <br />
                                        </div>
                                        <span class='Error' />
                                        {updatePic}
                                    </form>


                                    <div className="editname">
                                        <h3>Edit account</h3><br></br>
                                    </div>
                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>First name: {this.props.user.first_name}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" placeholder='Edit first name' />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Last name: {this.props.user.last_name} </div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" autoFocus name="last_name" placeholder='Edit Last name' />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current password : ***** </div>
                                        <div className="boxwidth-change">
                                            <input
                                                onChange={this.inputChangeHandler}
                                                type="password"
                                                placeholder="Edit Password"
                                                class="form-control"
                                                name="password" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current Phone: {this.props.user.phone}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="phone" placeholder='Edit Phone' />
                                        </div>
                                    </div>

                                    <div className="wrapperbutton">
                                        <button type="submit" className="button-edit" onClick={this.update}>update</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
             </div >



        )
    }
}
const validate = (formValues) => {

    const error = {};

    // Validate the inputs from 'values'
    if (!formValues.firstname) {
        error.first_name = "Enter valid first_name";
    }
    if (!formValues.lastname) {
        error.last_name = "Enter valid lastname";
    }
    if (!formValues.email) {
        error.email = "Enter valid email";
    }
    if (!formValues.phone) {
        error.phone = "Enter valid phone";
    }
    if (!formValues.password) {
        error.password = "Enter valid password";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return error;
}


function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  
  export default connect( mapStateToProps , {getProfile: getProfile, getUserImage:getUserImage})(Buyerprofile);