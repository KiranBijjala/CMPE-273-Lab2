import axios from 'axios';
export const GET_PROFILE ="get_profile";
export const GET_OWNER_PROFILE ="get_owner_profile";
export const GET_USER_IMAGE ="get_user_image";
export const LOGIN_USER = "login_user";
export const PUT_USERNAME = "put_username";
export const SIGNUP_USER = "signup_user";
export const GET_RESTAURANTS = "get_restaurnats";
export const GET_RESTAURANT_DETAILS = "get_restaurnat_details";
export const GET_RESTAURANT_CONTACT = "get_restaurnat_contact";
export const ADD_RESTAURANT_MENU = "add_restaurant_menu";
export const GET_RESTAURANT_MENU = "get_restaurant_menu";
export const GET_RESTAURANT_SECTIONS = "get_restaurant_sections";
export const GET_SECTIONS_MENU = "get_sections_menu";
export const USER_ORDER = "user_order";
export const GET_USER_ORDER = "get_user_order";
export const GET_USER_PAST_ORDERS = "get_user_past_order";
export const ORDER_STATUS = "order_status";
export const DELETE_DISH = "delete_dish";
export const DELETE_SECTION = "delete_section";
export const UPDATE_RESTAURANT_MENU = "delete_section";
export const GET_MENU_DETAILS = "get_menu_details";

const ROOT_URL = "http://localhost:3001";

// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("JWT") ? sessionStorage.getItem("JWT") : ""; 


export function loginuser(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/login`,values);

    return (dispatch) =>{
        request.then((res)=>{
            console.log(res);
            dispatch({
                type: LOGIN_USER,
                payload: res.data
            });
            // sessionStorage.setItem("JWT",res.data.token)
            // sessionStorage.setItem('email',JSON.parse(res.data.user)[0].email);
            // console.log(JSON.parse(res.data.user));
            callback(res);
        })
    }
    
}

export function getProfile(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/userprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getOwnerProfile(values, callback) {
    console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/ownerprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_OWNER_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getUserImage(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/userimage`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_USER_IMAGE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function signupUser(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/signup`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: SIGNUP_USER,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function searchrestaurants(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/restaurants`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            
            dispatch({
                type: GET_RESTAURANTS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getRestaurantDetails(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/restaurantdetails`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get restaurant details:" + JSON.stringify(res));
            
            dispatch({
                type: GET_RESTAURANT_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function restaurantcontact(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurantcontact`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: GET_RESTAURANT_CONTACT,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function restaurantmenu(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/restaurantmenu`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: ADD_RESTAURANT_MENU,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getrestaurantsections(values,callback) {
    console.log("inside getrestaurantsection action");

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/restaurantsections`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: GET_RESTAURANT_SECTIONS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getSectionsMenu(values,callback) {
    console.log("inside getrestaurantsection action");

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/sectionsmenu`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: GET_SECTIONS_MENU,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function userOrder(values,callback) {
    console.log("inside user order");

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/userorder`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            
            dispatch({
                type: USER_ORDER,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getUserOrder(values,callback) {
    console.log("inside get user order");

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/orderlist`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            
            dispatch({
                type: GET_USER_ORDER,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getUserPastOrder(values,callback) {
    console.log("inside get user order");

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/pastorderlist`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            
            dispatch({
                type: GET_USER_PAST_ORDERS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function orderStatus(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/orderstatus`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: ORDER_STATUS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function deleteDish(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/deletedish`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: DELETE_DISH,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function deleteSection(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/deletesection`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: DELETE_SECTION,
                payload: res.data
            });
            callback(res);
        })
    }
    
}


export function updaterestaurantmenu(values,callback) {
    // console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .post(`${ROOT_URL}/updaterestaurantmenu`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In signup user response:" + JSON.stringify(res));
            
            dispatch({
                type: UPDATE_RESTAURANT_MENU,
                payload: res.data
            });
            callback(res);
        })
    }
    
}




export function menudetails(values, callback) {
    console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/menudetails`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_MENU_DETAILS,
                payload: res.data
            });
            callback(res);
        })
    }
    
}// import axios from "axios";

// export const SUBMIT_LOGIN = "submit_login";

// const ROOT_URL = "http://localhost:3001";

// export function submitlogin(data) {
//     return function (dispatch) {
//         console.log('Inside Action:', data);
//         // axios.defaults.withCredentials = true;
//         axios.post(ROOT_URL + '/login', data)
//             .then(response => {
//                 console.log(response);
//                 if (response.status === 200) {
//                     //   localStorage.setItem("token", response.data.Token);
//                     console.log("useremail", data.Email)
//                     localStorage.setItem('email', data.Email);
//                     console.log(localStorage.getItem('email'))
//                     var resultData = {
//                         UserName: response.data.UserName,
//                         // Accounttype : response.data.Accounttype,
//                         isAuthenticated: true
//                     }
//                     console.log('Result in action: ', resultData)
//                     dispatch({
//                         type: SUBMIT_LOGIN,
//                         payload: resultData
//                     });

//                 }
//                 // else{
//                 //         // if (err.response.status === 401) {
//                 //          let resultData = {
//                 //              isAuthenticated : false
//                 //          }
//                 //             // console.log(err);
//                 //             // console.log('inside res status', err);
//                 //              dispatch({
//                 //                  type: AUTH_LOGIN,
//                 //                  payload: resultData
//                 //              });                        
//                 //          //}
//                 // }                            
//             })
//             .catch((err) => {
//                 // if (err.response.status === 401) {
//                 var resultData = {
//                     isAuthenticated: false
//                 }
//                 console.log(err);
//                 console.log('inside res status', err);
//                 dispatch({
//                     type: SUBMIT_LOGIN,
//                     payload: resultData
//                 });
//                 //}
//             });
//     }
// }
// export function submitlogin(values,callback) {
//     console.log(values);
//     axios.defaults.withCredentials = true;

//     const request = axios
//         .post(`${ROOT_URL}/login`, values);

//     return (dispatch) =>
//     {
//      request.then( (res) => {
//              console.log("In login response is : " + JSON.stringify(res));
//              dispatch(
//                  {
//                      type: SUBMIT_LOGIN,
//                      payload: res.data
//                  });
//              callback(res);
//          }
//      );

//     };
// }

// export function submitsignup(values,callback) {
//     console.log(values);
//     axios.defaults.withCredentials = true;
//     const request = axios
//         .post(`${ROOT_URL}/signup`, values);

//     return (dispatch) =>
//     {
//         request.then( (res) => {
//                 console.log("signup response is : " + JSON.stringify(res));
//                 dispatch(
//                     {
//                         type: CREATE_USER,
//                         payload: res.data
//                     });
//                 callback(res);
//             }
//         );

//     };
// }





