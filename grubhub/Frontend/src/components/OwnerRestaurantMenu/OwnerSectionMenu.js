import React from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getSectionsMenu } from '../../actions'
import { deleteDish } from '../../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../const'

class OwnerSectionMenu extends React.Component {
  State = {
    menulist: '',
    currentSection: '',
    updateflag: false
  }
  componentWillMount () {
    this.setState({updateflag: false})
    axios.defaults.withCredentials = true
    console.log(JSON.parse(sessionStorage.getItem('ownerdata'))[0].restaurant_name)
    this.props.getSectionsMenu(
      {
        params: {
          restaurant_name: JSON.parse(sessionStorage.getItem('ownerdata'))[0]
            .restaurant_name,
          section: this.props.sections
        }
      },
      response => {
        let temp = null
        // console.log("next is temp");
        this.setState(
          {
            menulist: this.props.user
          },
          () => {
            // temp = Object.keys(this.state.menulist).map(menu => {
            console.log(this.state.menulist)
            // })
            let temp = this.props.sections
            // alert('temp:', temp)
            // console.log("Look here", temp)

            // sessionStorage.setItem({ temp  this.state.menulist})
            this.setState({ currentSection: this.state.menulist })
            sessionStorage.setItem(temp, JSON.stringify(this.state.menulist))
            // console.log("Look here",sessionStorage.getItem('Lunch'));
          }
        )
        // console.log(this.state.menulist)
        // sessionStorage.setItem('sections', this.state.sections)
      }
    )
  }

  setSessionStorage = (e) => {
    e.preventDefault()
    sessionStorage.setItem('menuid', e.target.getAttribute('id'))
    this.setState({updateflag: true})
    // window.location.hash = "/updatemenu";
  }

  deleteDish = e => {
    e.preventDefault()
    console.log("hi");
    // alert(e.target.getAttribute('id'))
    // let x = sessionStorage.getItem('selectedRestaurant')
    let data = {
      id: e.target.getAttribute('id')
      // order_id: e.target.id
    }
    console.log("data"+data);
    axios.defaults.withCredentials = true

    this.props.deleteDish(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data)
        this.setState({
          authFlag: true
        })
        // sessionStorage.setItem('email', res.data[0].email)
        // sessionStorage.setItem('username', res.data[0].username)
        // sessionStorage.setItem('cookie', res.data[0].type) // cookies.save('cookie', res.data[0].type, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('userid', res.data[0]._id, {maxAge: 900000, httpOnly: false, path: '/'}); // cookies.save('username', res.data[0].username, {maxAge: 900000, httpOnly: false, path: '/'});
        // this.props.history.push('/home')
        window.location.reload ()
      } else {
        alert('Please enter valid credentials')
      }
    })
  }

  render () {
    // console.log('Display: ', this.props.sections)
    let redirectFalg=null;
    if(this.state.updateflag){
      redirectFalg = <Redirect to='/updatemenu'/>
    }
    
    console.log(this.props.user[0].image)
    let sectionMenu = null
    let temp = JSON.parse(sessionStorage.getItem(this.props.sections))
    console.log('temp', temp);
    if (typeof temp !== 'undefined' && temp != null) {
      sectionMenu = Object.keys(temp).map(menu => {
        // console.log(temp[menu]);
        let img = `${ROOT_URL}/images/menuprofile/`
        if(temp[menu].image){
          img=img + temp[menu].image;
          console.log(img);
        }
        
        else{
          img = img+'pizza.png';
        }
    console.log(this.props.user[0].image)
    
        return (
          <a href='#' class='list-group-item '>
            {redirectFalg}
            <div className='row'>
            <div className='col-sm-4'>
            <img
            class='preview-restaurant-img'
            // src='http://simpleicon.com/wp-content/uploads/account.png'
            src={img}
            alt='Preview Image'
            width='600'
            height='600'
            id={this.props.id}
          />
          </div>
              <div className='col-sm-3'>
                
                <h4 style={{ color: 'blue' }}>{temp[menu].dish_name}</h4>
                <div style={{ color: 'blue' }} >description : {temp[menu].description}</div>
              
              {/* <div className='col-sm-3'> */}
                <label style={{ color: 'blue' }}>Price</label>
                <br />
                <div style={{ color: 'blue' }}>${temp[menu].price}</div>
                <br />
              </div>
              <div className='col-sm-1'>
                <div id={temp[menu].dish_name} />
              </div>
              <div className='col-sm-1'>
              <button
                  id={temp[menu]._id}
                  className='btn btn-primary'
                  onClick={this.deleteDish}
                >
                  Delete
                </button>
                <br />
                <br />
                
                <a
                 onClick={this.setSessionStorage}
                  href = "/updatemenu"
                  id={temp[menu]._id} 
                  style={{ float: 'right' }}
                 
                >
                  Edit
                </a>
                
              </div>
            </div>
          </a>
        )
      })
    }
    

    return <div>{sectionMenu}</div>
  
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { getSectionsMenu, deleteDish }
)(
  reduxForm({
    form: 'streamSelectedsMenu'
    // validate: validate
  })(OwnerSectionMenu)
)
