import React, { Component } from 'react'
import '../css/Main.css'
import Header from './Header.js'
import MainPage from './MainPage'
import DayForReport from './DayForReport'
import MonthForReport from './MonthForReport'
import Statistic from './Statistic'

class Main extends Component{
  state = {
    page : "/"
  }
  parentFunction = (data) => {    
    this.setState({page:data});
  }

  pageMove(){
    console.log(this.state.page);

    if(this.state.page === '/' || this.state.page === 'MainPage'){
      return <MainPage></MainPage>;
    }else if(this.state.page === 'DayForReport'){
      return <DayForReport></DayForReport>;
    }else if(this.state.page === 'MonthForReport'){
      return <MonthForReport></MonthForReport>;
    }else if(this.state.page === 'Statistic'){
      return <Statistic></Statistic>;
    }
  }

  render(){
    return( 
      <div className="Main">
        <Header parentFunction={this.parentFunction}/>

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
