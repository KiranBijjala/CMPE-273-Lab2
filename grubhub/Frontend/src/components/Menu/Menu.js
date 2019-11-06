import React, { Component } from 'react'
import '../../App.css'
import './Menu.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getProfile } from '../../actions/index'

import { loginuser } from '../../actions/index'
import { restaurantmenu } from '../../actions/index'
import { getUserImage } from '../../actions/index'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../const'

// Define a Login Component
class Menu extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props) // maintain the state required for this component
    this.state = {
      email: '',
      file: '',
      img: '',
      authFlag: false,
      authFailed: false
    } 
  }
  componentWillMount() {
    
    let path = '/images/profile/pizza.png';

    this.setState({
      authFlag: false,
      authFailed: false,
      nameflag: false,
      contactflag: false,
      img: '',
      passwordflag: false
    })
    let temp = sessionStorage.getItem('email')
    let data = { email: temp }
    console.log('Inside will mount: data value is: ' + data.email) // this.props.getProfile({ params: data }, (data)=>{ //   console.log('Redu test: ' + this.props.user) //   this.setState({ //     email: data.email, //     phonenumber: data.phone, //     password: data.password, //     firstname: data.first_name, //     lastname: data.last_name //   }) // });

    
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  imageChangeHandler = e => {
    // console.log('image change handle name: ' + e.target.name)
    // console.log('image change handle value: ' + e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  } // submit Login handler to send a request to the node backend

  uploadImage = e => {
    e.preventDefault()
    const formData = new FormData()

    let email = sessionStorage.getItem('email')
    formData.append('myImage', this.state.file, email)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post('/menu', formData, config)
      .then(response => {
        let data = { 'email': email }
        axios.post(`${ROOT_URL}/menuimage`, data).then(response => {
          console.log('Axios get:', response.data)
          this.setState({
            img: 'data:image/png;base64, ' + response.data
          })
        })

      })
      .catch(error => { })

  }

  
  onSubmit = formValues => {
    
    let val = JSON.parse(sessionStorage.getItem('ownerdata'));
    console.log(val[0]);
    console.log(val[0].restaurant_name)
    let a = val[0];
    let data = {
      dish_name: formValues.dish_name,
      description: formValues.description,
      price: formValues.baseprice,
      section: formValues.section,
      restaurant_zipcode: a.restaurant_zipcode,
      restaurant_name: a.restaurant_name,
      // img : a.image

    }
    axios.defaults.withCredentials = true
    this.props.restaurantmenu(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data[0])
        this.setState({
          authFlag: true
        })

        this.props.history.push('/ownerrestaurantmenu')
      } else {
        alert('Please enter valid credentials')
      }
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
        <input
          className='form-control'
          style={{ marginRight: '10px' }}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  render() {
    // redirect based on successful login
    // let redirectVar = null
    let invalidtag = null
    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/login' />
    // }

    let redirectVar = null
    if (sessionStorage.getItem('JWT' === null)) {
      redirectVar = <Redirect to='/login' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }
    let updatePic = null

    if (this.state.file !== '') {
      updatePic = (
        <button
          style={{ marginLeft: '537px' }}
          className='btn btn-link'
          type='submit'
        >
          Update
        </button>
      )
    }

    return (
      <div>
        {redirectVar}

        <div className='row'>
          <div className='col-sm-2'>
            <DisplayOwnerNav />
          </div>

          <div className='col-sm-10'>

            <div class='login-form'>

              <div class='panel'>
                <h2>Your account</h2>
              </div>
              {/* <div className='row'>
                <div className='col-sm-6'> */}


              <form
                className='ui form error'
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <span class='Error' />
                {updatePic}
                <ul class='list-group'>
                  <li class='list-group-item'>
                    <br />
                    <h2>Add Items</h2>
                    <br></br>
                    <div class='form-group'>
                      <Field
                        class='form-control'
                        name='dish_name'
                        component={this.renderInput}
                        label=' Dish Name'
                      />
                    </div>
                    <Field
                      name='description'
                      type='text'
                      component={this.renderInput}
                      label='Item Description'
                    />
                    <div class='form-group'>
                      <Field
                        name='section'
                        component={this.renderInput}
                        label='Section'
                      />
                    </div>
                    <br />
                    <div class='form-group'>
                      <Field
                        name='baseprice'
                        type='text'
                        component={this.renderInput}
                        label='Price'
                      />
                    </div>
                    <br />
                    <button type='submit' class='btn btn-primary'>
                      Add to Menu
                        </button>
                    <br />
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
      //   </div>
      // </div>
      //       </div>
    )
  }
}
// export Login Component
// export default BuyerProfile

const validate = formValues => {
  const error = {}
  if (!formValues.dishname) {
    error.dishname = 'Enter a valid dish name'
  }
  if (!formValues.description) {
    error.description = 'Enter a valid description'
  }
  if (!formValues.baseprice) {
    error.baseprice = 'Enter a valid baseprice'
  }
  if (!formValues.section) {
    error.section = 'Enter a valid section'
  }
  return error
}

const mapStateToProps = state => {
  return { owner: state.owner }
}

export default connect(
  mapStateToProps,
  { restaurantmenu: restaurantmenu }
)(
  reduxForm({
    form: 'streamMenu',
    validate: validate
  })(Menu)
)
