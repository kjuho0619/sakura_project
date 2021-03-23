import React, { Component } from 'react';
import '../css/Statistic.css'
import Header from './Header.js'

class Statistic extends Component{
    render(){
        return(
            <div className="Main">
            <Header/>
    
            <main>
              <div className="page-view">
            <div className="statistic-page">
                統計 場面
            </div>
            </div>
            </main>
            </div>
        );
    }
}

export default Statistic;