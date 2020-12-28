import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import LayoutApp from "./components/LayoutApp";
import Home from './components/Home';
import NotFound from './components/404/NotFound.js';
import Login from './pages/Login'
import CreatePath from './pages/CreatePath'
import Dash from './pages/Dash'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import DetailsPath from './pages/DetailsPath'
import ContentTopic from './pages/ContentTopic'
import Donate100 from './pages/Donate100'
import Donate200 from './pages/Donate200'
import Donate300 from './pages/Donate300'
import Donate400 from './pages/Donate400'
import Progreso from "./components/progress/Progreso"
import ChooseDonation from './pages/ChooseDonation'
import PrivateRoute from "./components/PrivateRoute"
import PrivDash from "./components/PrivDash"
import ExplorePaths from "./pages/ExplorePaths"
import DetailsExplorePath from "./pages/DetailsExplorePath"
import DetailsTopic from "./pages/DetailsTopic"
import DiscoverPaths from './pages/DiscoverPaths';
import Newsfeed from './pages/Newsfeed';
import ExploreAllOtherPaths from './pages/ExploreAllOtherPaths';

import Suscription from './pages/Suscriptions';
import CyberSecurity from './pages/Categories/CyberSecurity';
import DataScience from './pages/Categories/DataScience';
import DevOps from './pages/Categories/DevOps';
import UxUi from './pages/Categories/UxUi';
import WebDev from './pages/Categories/WebDev';

import MyCyberSecurity from './pages/MyCategories/MyCyberSecurity';
import MyDataScience from './pages/MyCategories/MyDataScience';
import MyDevOps from './pages/MyCategories/MyDevOps';
import MyUxUi from './pages/MyCategories/MyUxUi';
import MyWebDev from './pages/MyCategories/MyWebDev';

import Favorites from './pages/DashboardMenu/Favorites';
import Completed from './pages/DashboardMenu/StatusProgress/Completed';
import InProgress from './pages/DashboardMenu/StatusProgress/InProgress';
import AllMyPaths from './pages/DashboardMenu/AllMyPaths';


const Success = () => <h1>Success Payment</h1>
const Failure = () => <h1>Failure Payment</h1>
const Pending = () => <h1>Pending Payment</h1>

const Router = () => {
  return (
    <BrowserRouter >
    <Switch>
    {/* Auth user */}
       <Route exact path="/" component={Home} />
      <PrivDash path='/login' component={Login} exact/>
      <Route path='/signup' component={Signup} exact/>
      <PrivateRoute path='/profile' component={Profile} exact />

     {/* Routes Menu Top*/}
      <Route path='/discover' component={DiscoverPaths} exact />

     {/* Routes Menu dash*/}
     <PrivateRoute exact path="/dash/:id" component={Dash} />
     <PrivateRoute path='/explore' component={ExplorePaths} exact />

       <PrivateRoute path='/my-paths/:id' component={AllMyPaths} exact />
        <PrivateRoute path='/favorites/:id' component={Favorites} exact />
        <PrivateRoute path='/completed/:id' component={Completed} exact />
        <PrivateRoute path='/progress/:id' component={InProgress} exact />
        <PrivateRoute path='/all-paths/:id' component={ExploreAllOtherPaths} exact />


      {/* Routes helpers */}
     <Route path='/path/create' component={CreatePath} exact />
      <PrivateRoute path='/path/:id' component={DetailsPath} exact />
      <PrivateRoute path='/subs' component={Suscription} exact />
      <PrivateRoute path='/path/explore/:id' component={DetailsExplorePath} exact />      
      <PrivateRoute path='/topic/:id' component={ContentTopic} exact />
      <PrivateRoute path='/topicdetails/:id' component={DetailsTopic} exact />
      <PrivateRoute path='/news' component={Newsfeed} exact/>

      {/* Categories all users*/}
      <PrivateRoute path='/cyber-security' component={CyberSecurity} exact />
      <PrivateRoute path='/data-science' component={DataScience} exact />
      <PrivateRoute path='/dev-ops' component={DevOps} exact />
      <PrivateRoute path='/ux-ui' component={UxUi} exact />
      <PrivateRoute path='/web-dev' component={WebDev} exact />


      {/* Categories user*/}
      <PrivateRoute path='/cyber-security/:id' component={MyCyberSecurity} exact />
      <PrivateRoute path='/data-science/:id' component={MyDataScience} exact />
      <PrivateRoute path='/dev-ops/:id' component={MyDevOps} exact />
      <PrivateRoute path='/ux-ui/:id' component={MyUxUi} exact />
      <PrivateRoute path='/web-dev/:id' component={MyWebDev} exact />

      {/* Donations*/}

      <Route path='/choose-donation' component={ChooseDonation}exact />
      <Route path='/donate100' component={Donate100} exact />
      <Route path='/donate200' component={Donate200} exact />
      <Route path='/donate300' component={Donate300} exact />
      <Route path='/donate400' component={Donate400} exact />
      <Route path='/progreso' component={Progreso} exact />
      <Route exact path="/success" component={Success} />
      <Route exact path="/failure" component={Failure} />
      <Route exact path="/pending" component={Pending} />
      <Route component={NotFound} />
      
    </Switch>
    </BrowserRouter>
  )
}

export default Router
