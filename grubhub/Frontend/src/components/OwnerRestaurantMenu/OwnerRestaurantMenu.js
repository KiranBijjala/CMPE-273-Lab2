import React, { Component } from 'react'
import '../../App.css'
import './OwnerRestaurantMenu.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getRestaurantDetails } from '../../actions'
import { getrestaurantsections } from '../../actions'
import { getSectionsMenu } from '../../actions'
import { deleteSection } from '../../actions'
import { loginuser } from '../../actions'
import { getUserImage } from '../../actions'
import OwnerSectionMenu from './OwnerSectionMenu'
import Cart from '../Cart/Cart'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'

import { Field, reduxForm } from 'redux-form'

// Define a Login Component
class OwnerRestaurantMenu extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      file: '',
      img: '',
      sections: '',
      sectionArr: '',
      restaurantimg: '',
      restaurantnames: '',
      restaurantdetails: '',
      authFlag: false,
      authFailed: false
    }
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    let x = JSON.parse(sessionStorage.getItem('ownerdata'))
    console.log(x[0].restaurant_name);
    let data = {
      restaurant_name: x[0].restaurant_name
    }
    axios.defaults.withCredentials = true

    this.props.getrestaurantsections({ params: data }, response => {
      console.log( this.props.user)
      this.setState({
          sections: response.data
        })
      console.log(this.props.user)
      
      sessionStorage.setItem('sections',JSON.stringify(response.data))

    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteSection = e => {
    e.preventDefault();
    let data = {
      section: e.target.getAttribute('section'),
    }
    axios.defaults.withCredentials = true


    this.props.deleteSection(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data[0])
        this.setState({
          authFlag: true
        })
        // sessionStorage.setItem('email', res.data[0].email)
        // sessionStorage.setItem('username', res.data[0].username)
        // sessionStorage.setItem('cookie', res.data[0].type) // cookies.save('cookie', res.data[0].type, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('userid', res.data[0]._id, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('username', res.data[0].username, {maxAge: 900000, httpOnly: false, path: '/'});
        // this.props.history.push('/home')
        window.location.reload();
      } else {
        alert('Please enter valid credentials')
      }
    })
  }

  render () {
    // redirect based on successful login
    // let redirectVar = null
    let invalidtag = null
    let menulist = null
    let resturantslist = null
    let displayCart = null
    if (sessionStorage.getItem('checkout') !== 'new') {
      displayCart = (
        <Cart data={JSON.parse(sessionStorage.getItem('checkout'))} />
      )
    } else {
      displayCart = <div>Add items to your cart</div>
    }

    // let list = sessionStorage.getItem('sections');
    let list = this.state.sections
    console.log(list);
    if (typeof list === 'undefined' && list === null) {
      // console.log('Loading data')
      //  window.location.reload();
      resturantslist = <div>Loading data!</div>
    } else {
      resturantslist = Object.keys(list).map(section => {
        // console.log('List',list)
        return (
          <div>
            <h2 style={{ textAlign:"center", color: 'orange' }}>{list[section]}</h2>
            <button section={list[section]} style={{float:'center'}} className='btn btn-block' onClick={this.deleteSection}>Delete Section</button>
            
           
            <div class='list-group'>
              <br/>
              <OwnerSectionMenu
                sections={list[section]}
                restaurant={sessionStorage.getItem('selectedRestaurant')}
              />
            </div>
          </div>
        )
      })
    }

    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/login' />
    // }

    let redirectVar  = null
    if (sessionStorage.getItem('JWT' === null)){ 
      redirectVar  = <Redirect to='/login'/>
    }


    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }
    let updatePic = null

    if (this.state.file !== '') {
      updatePic = (
        <button
          style={{ marginLeft: '537px' }}
          className='btn btn-link'
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
                <div className='row'>
                </div>
                
              </div>
              {resturantslist}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    user: state.user
  }
}

// export default connect( mapStateToProps , {getProfile: getProfile, getUserImage:getUserImage})(Search);

export default connect(
  mapStateToProps,
  { getrestaurantsections, getSectionsMenu, deleteSection }
)(
  reduxForm({
    form: 'streamSearch'
    // validate: validate
  })(OwnerRestaurantMenu)
)
