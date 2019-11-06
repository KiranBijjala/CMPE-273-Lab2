import React, { Component } from 'react'
import '../../App.css'
// import './Orders.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getUserPastOrder } from '../../actions'
import { connect } from 'react-redux'
import BuyerOwnerNav from '../Display/BuyerOwnerNav'
import { Field, reduxForm } from 'redux-form'

// Define a Login Component
class PastOrders extends Component {
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
    let data = {
      email: sessionStorage.getItem('email'),
      status: 'new',
      person: 'user_email'
    }
    axios.defaults.withCredentials = true

    this.props.getUserPastOrder({ params: data }, response => {
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
                <div>*{items[item][0]}</div>
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
        console.log(list[row])

        // Object.keys(list[row]).map(item => {
        //   console.log(list[row][item])
        // console.log('List',list)
        //   total = total + items[item][1] * items[item][0]
        //   // total = total.toFixed();
        return (
          <li class='list-group-item'>
            <div>
              <div>
                <div className='row'>
                <div className='col-sm-9'>
                <label
                    style={{
                      marginLeft: '10px',
                      
                      color: 'black'
                    }}
                  >
                    {list[row].restaurant_name}
                  </label>
                  </div>
                  <label style={{
                      
                      color: 'black'
                    }} className='col-sm-3'>
                  {list[row].order_status}
                  </label>
                  
                </div>
                <br />
                <div style={{ marginLeft: '10px' }} className='row'>
                  {itemslist(
                    JSON.parse(list[row].orderlist),
                    list[row].order_status
                  )}
                </div>
                <br />
                {/* <div className='row'>
                  <div className='col-sm-6'>
                    <label style={{
                      color: 'black'}}>Total</label>
                  </div> */}
                  {/* <div className='col-sm-3'>
                    <div>*{items[item][0]}</div>
                  </div> */}
                  {/* <div className='col-sm-3'>
                    <label style={{fontSize: '17px',
                      color: 'black'}}>$ {list[row].total}</label> */}
                  </div>
                </div>
                <br />
              {/* </div> */}
            {/* </div> */}
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
            <BuyerOwnerNav />
          </div>

          <div className='col-sm-10'>
            <div class='container'>
              <div class='login-form'>
                {/* <div class='main-div'> */}

                <div class='panel'>
                  <h2>User Past Orders</h2>
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
                          <label >Item</label>
                        </div>
                        <div  className='col-sm-3'>
                          <label>Quantity</label>
                        </div>
                        <div  className='col-sm-3'>
                          <label>Price</label>
                        </div>
                        <div className='col-sm-3'>
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

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { getUserPastOrder }
)(PastOrders)
