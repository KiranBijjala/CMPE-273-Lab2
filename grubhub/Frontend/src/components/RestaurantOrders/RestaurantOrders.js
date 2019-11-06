import React, { Component } from 'react'
import '../../App.css'
// import './Orders.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getUserOrder } from '../../actions/index'
import { orderStatus } from '../../actions/index'
import { connect } from 'react-redux'
import DisplayOwnerNav from '../Display/DisplayOwnerNav'
import { Field, reduxForm } from 'redux-form'
var CONST = require('../const/index');

// Define a Login Component
class RestaurantOrders extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      records: ''
    }
  }

  componentWillMount () {
    // let temp =
    let restaurant_name = JSON.parse(sessionStorage.getItem('ownerdata'))
    restaurant_name = restaurant_name[0].restaurant_name;
    console.log(restaurant_name);
    // alert(restaurant_name)
    let data = {
      email: restaurant_name,
      status: 'new',
      person: 'restaurant_name'
    }
    axios.defaults.withCredentials = true

    this.props.getUserOrder({ params: data }, response => {
      // console.log( this.props.user[1])
      console.log(response)
      this.setState(
        {
          records: response.data
        },
        () => {
          // sessionStorage.setItem('records', JSON.stringify(this.state.records))
          // console.log(this.state.restaurantdetails)
          Object.keys(this.state.records).map(row =>
            console.log(this.state.records[row].rating)
          )
        }
      )
      // sessionStorage.setItem('sections', this.state.sections)

      // alert(sessionStorage.getItem('sections'))
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  chageStatus = e => {
    e.preventDefault();
    // alert(e.target.getAttribute('id'))
    // let x = sessionStorage.getItem('selectedRestaurant')
    let data = {
      order_status: e.target.getAttribute('name'),
      order_id: e.target.id
    }
    console.log(data);
    axios.defaults.withCredentials = true

    this.props.orderStatus(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data)
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
    // let itemslist = null
    let items = null
    let total = 0

    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/login' />
    // }

    let redirectVar  = null
    if (sessionStorage.getItem('JWT' === null)){ 
      redirectVar  = <Redirect to='/login'/>
    }


    let itemslist = (items, status) => {
      // console.log('item, status'+ items + status)
      return Object.keys(items).map(item => {
        console.log('List', item)
        total = total + items[item][1] * items[item][0]
        // total = total.toFixed();
        return (
          <div>
            <div className='row'>
              <div className='col-sm-3'>
                <div>{item}</div>
              </div>
              <div className='col-sm-3'>
                <div>{items[item][0]}</div>
              </div>
              {/* <div className='col-sm-3'>
                <div>{status}</div>
              </div> */}
              <div className='col-sm-3'>
                <div>{items[item][1] * items[item][0]}</div>
              </div>
            </div>
          </div>
        )
      })
    }

    let orderRecords = null
    // let list = JSON.parse(sessionStorage.getItem('records'))
    let list = this.state.records
    if (list !== null) {
      orderRecords = Object.keys(list).map(row => {
        console.log(list[row].order_id)

        // Object.keys(list[row]).map(item => {
        //   console.log(list[row][item])
        // console.log('List',list)
        //   total = total + items[item][1] * items[item][0]
        //   // total = total.toFixed();
        return (
          <li class='list-group-item' draggable>
            <div>
              <div>
                <div className='row'>
                  <div className='col-sm-9'>
                    <label
                      style={{
                        marginLeft: '10px',
                        fontSize: '17px',
                        color: 'blue'
                      }}
                    >
                      User : {list[row].user_email}
                    </label>
                  </div>
                  <div className='col-sm-3'>
                  <label
                      style={{
                        marginLeft: '10px',
                        fontSize: '17px',
                        color: 'black'
                      }}
                    >
                      {list[row].order_status}
                    </label>
                  <div class="dropdown">
  <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Change Status
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button name='New' id={list[row].order_id} class="btn btn-light" type="button" onClick={this.chageStatus}>New</button>
    <br/>
    <button name='Preparing' id={list[row].order_id} class="btn btn-light" type="button" onClick={this.chageStatus}>Preparing</button>
    <br/>
    <button name='Ready' id={list[row].order_id} class="btn btn-light" type="button" onClick={this.chageStatus}>Ready</button>
    <br/>
    <button name='Delivered' id={list[row].order_id} class="btn btn-light" type="button" onClick={this.chageStatus}>Delivered</button>
    <br/>
    <button name='Cancel' id={list[row].order_id} class="btn btn-light" type="button" onClick={this.chageStatus}>Cancel</button>
    <br/>
  </div>
</div>
                  </div>
                </div>
                <br />
                <div style={{ marginLeft: '10px' }} className='row'>
                  {itemslist(
                    JSON.parse(list[row].orderlist),
                    list[row].order_status
                  )}
                </div>
                <br />
                <div className='row'>
                  <div className='col-sm-6'>
                    <label style={{ fontSize: '17px', color: 'black' }}>
                      Total
                    </label>
                  </div>
                  {/* <div className='col-sm-3'>
                    <div>*{items[item][0]}</div>
                  </div> */}
                  <div className='col-sm-3'>
                    <label style={{ fontSize: '17px', color: 'black' }}>
                       $ {list[row].total}
                    </label>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </li>
        )
      })
      // })
    }

    // let orderRecords =

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
                {/* <div class='main-div'> */}

                <div class='panel'>
                  <h2>Upcoming Orders</h2>
                  {/* {invalidtag} */}
                </div>

                <br />
                <ul class='list-group'>
                  <br />

                  {/* <li class='list-group-item'>{editname}</li> */}
                  <li class='list-group-item'>
                    <div>
                      <div className='row'>
                        <div className='col-sm-3'>
                          <label style={{ fontSize: '17px' }}>Item</label>
                        </div>
                        <div style={{ fontSize: '17px' }} className='col-sm-3'>
                          <label>Quantity</label>
                        </div>
                        <div style={{ fontSize: '17px' }} className='col-sm-3'>
                          <label>Price</label>
                        </div>
                        <div style={{ fontSize: '17px' }} className='col-sm-3'>
                          <label>Order Status</label>
                        </div>
                      </div>
                    </div>
                  </li>
                  {orderRecords}
                </ul>

                <br />

                <br />
              </div>
            </div>
          </div>
        </div>
        //{' '}
      </div>
    )
  }
}
// export Login Component
// export default BuyerProfile

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { getUserOrder, orderStatus }
)(RestaurantOrders)
