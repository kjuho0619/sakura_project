import React, { Component } from 'react'
import '../css/Main.css'
import Header from './Header.js'
import MainPage from './MainPage'
import DayForReport from './DayForReport'
import MonthForReport from './MonthForReport'
import Statistic from './Statistic'

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";

class Main extends Component{
  state = {
    page : "/",
    id : localStorage.getItem('sessionID'),
    sessionUser : localStorage.getItem('sessionUser')
  }
  
  parentFunction = (data) => {    
    this.setState({page:data});
  }

  pageMove(){
    console.log(this.state.page);

    if(this.state.page === '/' || this.state.page === 'MainPage'){
      return <MainPage></MainPage>;
    }else if(this.state.page === 'DayForReport'){
      return <DayForReport parentFunction={this.parentFunction} databaseURL={databaseURL} sessionUser={this.state.sessionUser}></DayForReport>;
    }else if(this.state.page === 'MonthForReport'){
      return <MonthForReport databaseURL={databaseURL}></MonthForReport>;
    }else if(this.state.page === 'Statistic'){
      return <Statistic></Statistic>;
    }
  }

  render(){
    return( 
      <div className="Main">
        <Header parentFunction={this.parentFunction} sessionUser={this.state.sessionUser}/>

        <main>
          <div className="page-view">
            {this.pageMove()}
          </div>
        </main>
      </div>
    );
  }
}

export default Main;
