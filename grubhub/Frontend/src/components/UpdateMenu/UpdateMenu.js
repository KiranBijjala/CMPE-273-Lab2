import React, { Component } from 'react'
import '../../App.css'
import './UpdateMenu.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getProfile } from '../../actions'
import { loginuser } from '../../actions'
import { updaterestaurantmenu } from '../../actions'
import { menudetails } from '../../actions'

import { getUserImage } from '../../actions'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../const'

// Define a Login Component
class Menu extends Component {
  // call the constructor method
  constructor (props) {
    super(props)
    this.state = {
      authFlag: false,
      details: '',
      selectedFile: null,
      img : ''
    }
  }

  componentWillMount () {
    // let path = '/images/menuprofile/pizza.png';
    this.setState({
      authFlag: false
    })
    let data = sessionStorage.getItem('menuid')
    // alert(temp)
    this.props.menudetails({ params: {id: data} }, response => {
      // console.log( this.props.user[1])
      console.log(response.data)
      // console.log(this.props.details)
      this.setState({
        details: response.data,
      })
      
    })

    
  }
  imageChangeHandler = e => {
    this.setState({
        file: e.target.files[0]
    })
}
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = formValues => {
    // let val = JSON.parse(sessionStorage.getItem('ownerdata'))
    let menuid = sessionStorage.getItem('menuid')
    // console.log('temp : ' +val.email)
    let data = {
      dishname: formValues.dishname,
      description: formValues.description,
      price: formValues.baseprice,
      section: formValues.section,
      id: menuid
    }
    axios.defaults.withCredentials = true

    this.props.updaterestaurantmenu(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data[0])
        this.setState({
          authFlag: true
        })

        this.props.history.push('/ownerrestaurantmenu')
      } else {
        alert('Please enter valid credentials')
      }
    }) // ,(response)=>{ //   console.log('Redux test: ' + this.props.user); //   console.log('Redux response: ' + response); // }) // console.log(data); // this.props.login(data, (response)=>{ //   console.log('Redux test: ' + this.props.user) //   this.setState({ //     img: 'data:image/png;base64, ' + response.image //   }) // });
  
  }
  imageChangeHandler = e => {
    this.setState({
        file: e.target.files[0]
    })
}
  uploadImage = e => {
    e.preventDefault()
    console.log("hi")
    const formData = new FormData()

    let menuid = sessionStorage.getItem('menuid');
    console.log(menuid);
    console.log(this.state.file);
    formData.append('myImage', this.state.file, menuid)
    console.log(formData);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios
        .post('/updatemenuimage', formData, config)
        .then(response => {
            let data = { id: menuid }
            console.log(data);
            axios.post(`${ROOT_URL}/menuimage`, data).then(response => {
                console.log('Axios get:', response.data)
                this.setState({
                    img: 'data:image/png;base64, ' + response.data
                })
            })
            
        })
        .catch(error => { })
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

  renderInput = ({ input, label, text, meta}) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}:  {text}
        </div>
        <input
          className='form-control'
          // style={{ marginRight: '10px' }}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  render () {
    // redirect based on successful login
    // let redirectVar = null
    let invalidtag = null
    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/login' />
    // }

    console.log(this.props.owner)

    let redirectVar  = null
    if (sessionStorage.getItem('JWT' === null)){ 
      redirectVar  = <Redirect to='/login'/>
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
            <div class='container'>
              <div class='login-form'>
                {/* <div class='main-div'> */}

                <div className='row'>
                  <div className='col-sm-6'>

                  <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                <div>
                  <img
                    src={this.state.img}
                    width='200'
                    height='200'
                  />
                  <input
                    type='file'
                    onChange={this.imageChangeHandler}
                    name='myImage'
                    id='myImage'
                  />
                  <br />
                  {updatePic}
                </div>
              </form>

                    <form
                      className='ui form error'
                      onSubmit={this.props.handleSubmit(this.onSubmit)}
                    >
                      <ul class='list-group'>
                        <li class='list-group-item'>
                          <br />
                          <h2>Edit menu</h2>
                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              class='form-control'
                              name='dishname'
                              component={this.renderInput}
                              label=' Name'
                              text= {this.props.owner.dish_name}
                            />
                          </div>
                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              name='description'
                              type='text'
                              component={this.renderInput}
                              label='Description'
                              text= {this.props.owner.description}
                            />
                          </div>

                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              name='section'
                              component={this.renderInput}
                              label='Menu Section'
                              text= {this.props.owner.section}
                            />
                          </div>
                          <br />
                          <div
                            style={{ marginRight: '20px' }}
                            class='form-group'
                          >
                            <Field
                              name='baseprice'
                              type='text'
                              component={this.renderInput}
                              label='Base Price'
                              text= {this.props.owner.price}
                            />
                          </div>
                          <Field
                              name='id'
                              type='id'
                              component={this.renderInput}
                              label='menuid '
                              text= {this.props.owner._id}
                            />
                          <br />
                          <button type='submit' class='btn btn-info'>
                            Edit Menu
                          </button>
                          <br />
                        </li>
                      </ul>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  { updaterestaurantmenu, menudetails }
)(
  reduxForm({
    form: 'streamUpdateMenu',
    validate: validate
  })(Menu)
)

