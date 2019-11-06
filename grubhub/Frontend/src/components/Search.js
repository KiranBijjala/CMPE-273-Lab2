import React, { Component } from 'react'
import '../App.css'
import './Search.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getRestaurantDetails } from '../actions'
import { loginuser } from '../actions'
import { getUserImage } from '../actions'
import Display from './Display/Display'
import { connect } from 'react-redux'
import BuyerOwnerNav from './Display/BuyerOwnerNav'
import { Field, reduxForm } from 'redux-form';


// Define a Login Component
class Search extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      file: '',
      img: '',
      restaurantimg: '',
      restaurantnames: '',
      restaurantdetails: '',
      authFlag: false,
      authFailed: false,
      cuisine: "",
      currentPage: 1,
      currentTodos :''
    }

  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    sessionStorage.setItem('checkout', "new")

    // let path = process.env.PUBLIC_URL
    // let restaurantImgPath = process.env.PUBLIC_URL
    // path = path + '/profile/Grubhub.png'
    // restaurantImgPath = restaurantImgPath+'/profile/Sankranthi.png'
    let restaurantImgPath = '/Users/kirankumarbijjala/Documents/Lab2/grubhub/Backend/profile/Sankranthi.png';
    let path = '/Users/kirankumarbijjala/Documents/Lab2/grubhub/Backend/profile/Avatar.png';
    this.setState({
      authFlag: false,
      authFailed: false,
      img: path,
      restaurantimg: restaurantImgPath,
      restaurantnames: true,
      cuisine: "",
      todos: [],
      currentPage: 1,
      todosPerPage: 2,
    })

    let restaurants = []
    if (sessionStorage.getItem('restaurants') != null) {
      restaurants = sessionStorage.getItem('restaurants');
    }

    let data = {
      details: restaurants
    }
    axios.defaults.withCredentials = true

    this.props.getRestaurantDetails({ params: data }, (response) => {
      console.log(this.props.user)
      this.setState({
        restaurantdetails: this.props.user,
        todos: response.data
      })
        console.log(this.state.todos);
      })

    }
    
  selectRestaurant = (e) => {
    // console.log(e.target.id);
    let temp = e.target.id;
    // alert(e.target.id);
    sessionStorage.setItem('selectedRestaurant', temp)
  }

  OnClickfilter = e => {
    let filterData = null
    let filter = []
    let count = 0
    let filterList = this.state.restaurantdetails
    // console.log(filterList[0].cuisine);
    filterData = Object.keys(filterList).map(restaurant => {
      count += 1
      // console.log(filterList[restaurant].cuisine)
      // console.log(this.state.filter)
      if (typeof filterList[restaurant] !== 'undefined') {
        if (filterList[restaurant].cuisine === this.state.filter) {
          console.log(filterList[restaurant].cuisine)
          filter.push(filterList[restaurant])
          return filterList[restaurant]
        } 
      }
    })
    this.setState({ restaurantdetails: filter,todos:filter })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  imageChangeHandler = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  handleClick = event => {
    this.setState(
      {
        currentPage: Number(event.target.id)
      },
      () => {
        // alert(this.state.currentPage)
      }
    )
  }


  render() {
   
    const { todos, currentPage, todosPerPage } = this.state
    const indexOfLastTodo = currentPage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
    console.log(indexOfFirstTodo, indexOfLastTodo)
    console.log(currentTodos)
    console.log(todos);

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i)
    }
    console.log(pageNumbers);
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li class="page-item active" key={number} onClick={this.handleClick} id={number}><a class="page-link" key={number} onClick={this.handleClick}  id={number} href="#">{number}</a></li>
      )
    })

    let invalidtag = null
    let resturantslist = null
    let list = currentTodos
    resturantslist = Object.keys(list).map((restaurant) => {
      console.log(list[restaurant]);

      return (<a href="/restaurantmenu" id={list[restaurant].restaurant_name} class="list-group-item list-group-item-action" onClick={this.selectRestaurant}>
        <Display id={list[restaurant].restaurant_name} image={list[restaurant].image} restaurant_name={list[restaurant].restaurant_name} sections={list[restaurant].sections} rating={list[restaurant].rating} />
      </a>
      )
    });
    // console.log(resturantslist)
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
       {invalidtag}
        <div className='row'>
          <div className='col-sm-2'>
            <BuyerOwnerNav />
          </div>

          <div className='col-sm-10'>
            <div class='container'>

              <div class='login-form'>
                {/* <div class='main-div'> */}
                
                  <h2>Your account</h2>
                  {/* {invalidtag} */}
                </div>
                <div class="list-group">
                  {resturantslist}
                  <br></br>
                  <div class='panel'>
                
                </div>
                  <input onChange={this.inputChangeHandler} type="filter" name="filter" type="filter" class="form-control" autoFocus  />
                  <button type="button" class="btn btn-primary btn-sm"  onClick={this.OnClickfilter} >Filter</button>
              </div>       
              <nav aria-label="Page navigation example">
                <ul className="pagination" id='page-numbers'>
                {renderPageNumbers}
                </ul>
                </nav> 
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getRestaurantDetails: getRestaurantDetails }
)(
  reduxForm({
    form: 'streamSearch'
    // validate: validate
  })(Search)
)