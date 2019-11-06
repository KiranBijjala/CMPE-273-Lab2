import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Existingusersignin from './Existingusersignin';
import Buyersignup from './Buyersignup';
import Ownerlogin from './Ownerlogin';
import OwnersignUp from './Ownersignup';
import NavBar from './NavBar';
import Buyerprofile from './Buyerprofile';
import Search from './Search';
import Ownerprofile from './Ownerprofile';
import OwnerDetails from './OwnerDetails/OwnerDetails';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders';
import RestaurantMenu from './RestaurantMenu/RestaurantMenu';
import PastOrders from './PastOrders/PastOrders';
import RestaurantOrders from './RestaurantOrders/RestaurantOrders';
import RestaurantPastOrders from './RestaurantPastOrders/RestaurantPastOrders';
import UpdateMenu from './UpdateMenu/UpdateMenu';
import OwnerRestaurantMenu from './OwnerRestaurantMenu/OwnerRestaurantMenu';
import Home from './Home/Home';
import OwnerMessage from "./OwnerMessage";
import BuyerMessage from "./BuyerMessage";
import Reply from "./Reply";
import Askquestion from "./Askquestion";

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={NavBar}/>
                <Route path="/login" component={Existingusersignin}/>
                <Route path="/search" component={Search}/>
                <Route path="/userprofile" component={Buyerprofile}/>
                <Route path="/signup" component={Buyersignup}/>
                <Route path="/ownerlogin" component={Ownerlogin}/>
                <Route path="/ownersignup" component={OwnersignUp}/>
                <Route path="/ownerprofile" component={Ownerprofile}/>
                <Route path="/ownerdetails" component={OwnerDetails}/>
                <Route path="/menu" component={Menu}/>
                <Route path="/home" component={Home}/>
                <Route path="/restaurantmenu" component={RestaurantMenu}/>
                <Route path="/userorder" component={Orders}/>
                <Route path="/userpastorder" component={PastOrders}/>
                <Route path="/restaurantorders" component={RestaurantOrders}/>
                <Route path="/restaurantpastorders" component={RestaurantPastOrders}/>
                <Route path="/updatemenu" component={UpdateMenu}/>
                <Route path="/ownerrestaurantmenu" component={OwnerRestaurantMenu}/>
                <Route path="/OwnerMessage" component ={OwnerMessage} exact/>  
                <Route path="/BuyerMessage" component ={BuyerMessage} exact/>  
                <Route path="/Reply" component ={Reply} exact/>  
                <Route path="/Askquestion" component ={Askquestion} exact/>  
            </div>
        )
    }
}
//Export The Main Component
export default Main;