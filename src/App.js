import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './javascript/Login';
import MemberForm from './javascript/MemberForm';
import Main from './javascript/Main';
import Privacy from './javascript/Privacy';
import MyInfo from './javascript/MyInfo';

class App extends Component{
  
  render(){
    return (
     <div>
       <Route path="/" component={Login} exact={true} />
       <Route path="/memberForm" component={MemberForm} />
       <Route path="/main" component={Main} />
       <Route path="/privacy" component={Privacy} />
       <Route path="/myInfo" component={MyInfo} />
     </div> 
    );
  }
}

export default App;
