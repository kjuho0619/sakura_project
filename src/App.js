import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './javascript/Login';
import MemberForm from './javascript/MemberForm';
import Main from './javascript/Main';
import Privacy from './javascript/Privacy';
import MyInfo from './javascript/MyInfo';
import DayForReport from './javascript/DayForReport'
import MonthForReport from './javascript/MonthForReport'
import AboutUS from './javascript/Statistic'

class App extends Component{
  
  render(){
    return (
     <div>
       <Router>
        <Route path="/" component={Login} exact={true} />
        <Route path="/memberForm" component={MemberForm} />
        <Route path="/main" component={Main} />
        <Route path="/dayForReport" component={DayForReport} />
        <Route path="/monthForReport" component={MonthForReport} />
        <Route path="/aboutas" component={AboutUS} />
        <Route path="/privacy" component={Privacy} />  
        <Route path="/myInfo" component={MyInfo} />
       </Router>
     </div> 
    );
  }
}

export default App;
