import React from 'react'
// import './Button.css'
import ROOT_URL from '../const'
class Display extends React.Component{
  render(){
    console.log(this.props.image)
    let img = `${ROOT_URL}/images/ownerprofile/`
    // console.log(process.env.PUBLIC_URL);
    if(this.props.image){
      img=img + this.props.image;
    }
    else{
      img = img+'restaurant.png';
    }
    return(

      <div id={this.props.id} className='row'>
      
<div id={this.props.id} className='col-sm-1'>
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
          <div id={this.props.id} className='col-sm-5'>
   <div id={this.props.id} style={{ fontSize: '16px',color:'black', fontWeight:'bold',marginLeft:'30px', marginBottom: '5px', marginTop: '12px' }}>{this.props.restaurant_name}</div>
   <div id={this.props.id} style={{ fontSize: '14px',color:'black', marginLeft:'30px', marginBottom: '15px', marginTop: '5px' }}>{this.props.sections}</div>
 </div>

          </div>
);}
  }
 
  

export default Display;