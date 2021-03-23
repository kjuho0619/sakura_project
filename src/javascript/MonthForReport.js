import React, { Component } from 'react';
import '../css/MonthForReport.css'
import Header from './Header.js'


class MonthForReport extends Component{
    render(){
        return(
            <div className="Main">
            <Header/>
    
            <main>
              <div className="page-view">
                <div className="monthForReport-page">
                    月別詳細 場面
                </div>
              </div>
            </main>
         </div>
        );
    }
}

export default MonthForReport;