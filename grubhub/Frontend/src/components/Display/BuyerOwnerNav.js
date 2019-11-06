import React from 'react'
// import './Button.css'

class BuyerOwnerNav extends React.Component {
  render () {
    // console.log(this.props)
    return (
      <div>
        <h2>
          <span style={{ marginLeft: '10px', alighText: 'right' }}>
            Your account
          </span>
        </h2>
        <ul style={{ listStyleType: 'none' }}>
          <li className='li-profile'>
            <a href='/userprofile' className='navLink active'>
              <span style={{ color: 'black' }} className='tab'>
                Profile
              </span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='#' className='navLink'>
              <span className='tab'>Address and phone</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='#' className='navLink'>
              <span className='tab'>Payments</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='#' className='navLink'>
              <span className='tab'>Gift cards</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/userpastorder' className='navLink'>
              <span className='tab'>Past orders</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/userorder' className='navLink'>
              <span className='tab'>Upcoming orders</span>
            </a>
          </li>

          <li className='li-profile'>
            <a href='/BuyerMessage' className='navLink'>
              <span className='tab'>Message</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='#' className='navLink'>
              <span className='tab'>Refer a friend</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='#' className='navLink'>
              <span className='tab'>Saved restaurants</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
// console.log("Inside search: ",this.props);

export default BuyerOwnerNav
