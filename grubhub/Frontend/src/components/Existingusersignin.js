import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { loginuser } from '../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// Define a Login Component
class Existingusersignin extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authFailed: false
    }

  }

  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
  }
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <label style={{ color: 'red' }}>{error}</label>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}
        </div>
        <div class='form-group'>
          <input class='form-control' {...input} />
          {this.renderError(meta)}
        </div>
      </div>
    )
  }

  

  onSubmit = e => {
    console.log('OnSubmit' + e)
    let data = {
      email: e.email,
      password:e.password,
      token : e.token
    }
    axios.defaults.withCredentials = true
    // this.props.loginuser(e);

    this.props.loginuser(data, response => {
      if (response.status === 200) {
        this.setState({
          authFlag: true
        })
        console.log(response.data);
        sessionStorage.setItem('email',(JSON.parse(response.data.user)[0]).email);
        sessionStorage.setItem('JWT',response.data.token);
        // window.location.reload();
        console.log(JSON.parse(response.data.user)[0]);
        this.props.history.push("/home");
      } else {
        alert('Please enter valid credentials');
      }
    })

  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    let invalidtag = null

    let redirectVar  = null
    if (sessionStorage.getItem('JWT' != null)){ 
      redirectVar  = <Redirect to='/home'/>
    }
  
    // console.log(sessionStorage.getItem("JWT"));

    // let redirecthome = null;
    // if (this.state.authFlag) {
    //   redirecthome  = <Redirect to='/home'/>
    // }

    // let redirectVar = null;
    //     if (cookie.load('cookie')) {
    //         redirectVar = <Redirect to="/home" />
    //     }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    return (
      <div>
      {redirectVar }
     {/* {redirecthome} */}
      <form
        className='ui form error'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div>
          {redirectVar}
          
          <div class='container'>
            <div class='login-form'>
              <div class='main-div'>
                <div class='panel'>
                  <h2>Sign in with your Grubhub account</h2>
                  {invalidtag}
                </div>
                <Field
                  name='email'
                  component={this.renderInput}
                  label='Email'
                />
                <br />
                <Field
                  name='password'
                  type='password'
                  component={this.renderInput}
                  label='Password'
                />
                <br />
                <button style={{backgroundColor:"red"}} type='submit' class='btn btn-primary'>
                  Login
                </button>
                <br />
                
                <div class='form-group'>
                  <div style={{ textAlign: 'center' }}>or</div>
                </div>


                <button type='submit' class='btn btn-primary'>Continue with Facebook</button>
                  <br></br><br />

                <button class="btn btn-primary">Continue with Google</button>
                <br></br>
                <br></br>


                <div style={{ textAlign: 'center' }} class='form-group'>
                  <Link to='/signup'>Create an account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    )
  }
}

const validate = formValues => {
  const error = {}
  if (!formValues.email) {
    error.email = 'Enter a valid email'
  }
  if (!formValues.password) {
    error.password = 'Enter a valid Password'
  }
  return error
}


// export default connect(null,{loginuser:loginuser})(formWrapped)
const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { loginuser }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(Existingusersignin)
)

