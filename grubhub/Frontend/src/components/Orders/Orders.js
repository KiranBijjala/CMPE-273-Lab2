import React, { Component } from 'react'
import '../../App.css'
// import './Orders.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getUserOrder } from '../../actions/index'
import { connect } from 'react-redux'
import BuyerOwnerNav from '../Display/BuyerOwnerNav'
import { Field, reduxForm } from 'redux-form'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';


// Define a Login Component
class Orders extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      records: '',
      message: "",
      todos: [],
      currentPage: 1,
      todosPerPage: 2,
    }
  }

  componentWillMount() {
    // let temp =
    let data = {
      email: sessionStorage.getItem('email'),
      status: 'new',
      person: 'user_email'
    }
    axios.defaults.withCredentials = true

    this.props.getUserOrder({ params: data }, response => {
      // console.log( this.props.user[1])
      console.log(response)
      this.setState(
        {
          records: response.data,
          todos: response.data
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

  selectOrder = (e) => {
    // console.log(e.target.id);
    let temp = e.target.id;
    console.log(temp);
    // alert(e.target.id);
    sessionStorage.setItem('orderselected', temp)
    // sessionStorage.setItem('clickedrestaurant',temp)
  }




  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = event => {
    this.setState(
      {
        currentPage: Number(event.target.id)
      },
      () => {
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
        <li class="page-item" key={number} onClick={this.handleClick} id={number}><a class="page-link" key={number} onClick={this.handleClick}  id={number} href="#">{number}</a></li>
        
      )
    })



    // redirect based on successful login
    // let redirectVar = null
    let invalidtag = null
    // let itemslist = null
    let items = null
    let total = 0

    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/login' />
    // }

    let redirectVar = null
    if (sessionStorage.getItem('JWT' === null)) {
      redirectVar = <Redirect to='/login' />
    }


    let itemslist = (items, status) => {
      return Object.keys(items).map(item => {
        // console.log('List', item)
        total = total + items[item][1] * items[item][0]
        return (
          <div>
            <Row>
              <Col sm="3">
                <Row style={{ marginLeft: '10px' }}>{item}</Row>
              </Col>
              <Col sm="3">
                <Row style={{ marginLeft: '170px' }}>{items[item][0]}</Row>
              </Col>
              <Col sm="3">
                <Row style={{ marginLeft: '270px' }}>{items[item][1]}</Row>
              </Col>
            </Row>
          </div>
        )
      })
    }

    let orderRecords = null
    // let list = JSON.parse(sessionStorage.getItem('records'))
    let list = currentTodos
    if (list !== null) {
      orderRecords = Object.keys(list).map(row => {
        // console.log(list[row])
        return (


          

          <li class='list-group-item' >
            <div>
              <Card style={{ backgroundColor: "green" }} draggable>
                <Row>
                  {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                  <Col sm="9">
                    <CardTitle
                      style={{
                        marginLeft: '10px',

                        color: 'black'
                      }}
                    >
                      {list[row].restaurant_name}
                    </CardTitle>
                  </Col>
                  <Col sm="3">
                    <CardText style={{
                      color: 'blue'
                    }} >
                      {list[row].order_status}
                    </CardText>
                  </Col>

                </Row>

                <Row style={{ marginLeft: '10px' }} >
                  {itemslist(
                    JSON.parse(list[row].orderlist),
                    list[row].order_status
                  )}
                </Row>

   
                <br />
                <Row>
                  <Col sm="6">
                    <label style={{
                      color: 'black'
                    }}>Total</label>
                  </Col>
                  <Col sm="3">
                    <CardText style={{
                      color: 'black'
                    }}>$ {list[row].total}</CardText>
                  </Col>

                  <Col sm="3">
                    <a
                      id={list[row].order_id}
                      style={{ float: "right", marginRight: "10px", color: "yellow" }}
                      href="/Askquestion"
                      onClick={this.selectOrder}

                    >Edit </a>
                  </Col>
                </Row>

              </Card>
            </div>
            
          </li>
          



        )
      })
      // })
    }


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
                          <label >Item</label>
                        </div>
                        <div className='col-sm-3'>
                          <label>Quantity</label>
                        </div>
                        <div className='col-sm-3'>
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
              <div>
                <nav aria-label="Page navigation example">

                  <ul className="pagination" id='page-numbers'>
                    {renderPageNumbers}
                  </ul>

                </nav>
              </div>
            </div>
          </div>

          {/* <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">Previous</li>
    <li class="page-item">1</li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> */}

          {/* <h3 style={{textAlign : "center"}} >Ask a question</h3>
        <input className="form-control" type = "textarea" value = {this.state.message} onChange = {(event) => {this.setState({ message : event.target.value })}}/>
      <br></br>
        <button onClick={this.postMessage} className="btn btn-primary" style={{width : "160px",marginLeft : "170px"}}>Send Message</button>
                */}
        </div>

      </div>
      // </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { getUserOrder }
)(Orders)
