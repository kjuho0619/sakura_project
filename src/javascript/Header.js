import React, { Component } from 'react';
import '../css/Header.css'
import logo from '../images/sakura_logo.png'

class Header extends Component{
    render(){
        return(
            <header>
                <div className="nav">
                    <a className="sakura-logo-atag" href="/">
                        <img className="sakura-logo-img" src={logo} alt="SAKURA" />
                    </a>
                    <a className="title-atag" href="/">さくら正真家計簿</a>

                    <div className="sub-menu">
                        <ul className="menu">
                            <li>
                                <a href="#">My Info</a>
                            </li>
                            <li>
                                <a href="#">LogOut</a>
                            </li>
                        </ul>
                    </div>

                    <div className="main-menu">
                        <ul className="menu">
                            <li>
                                <a href="/" onClick={function(ev){
                                    ev.preventDefault();
                                    this.props.parentFunction('MainPage');
                                }.bind(this)}>メインページ</a>
                            </li>
                            <li>
                                <a href="/DayForReport.html" onClick={function(ev){
                                    ev.preventDefault();
                                    this.props.parentFunction('DayForReport');
                                }.bind(this)}>日別詳細</a>
                            </li>
                            <li>
                                <a href="/MonthForReport.html" onClick={function(ev){
                                    ev.preventDefault();
                                    this.props.parentFunction('MonthForReport');
                                }.bind(this)}>月別詳細</a>
                            </li>
                            <li>
                                <a href="#" onClick={function(ev){
                                    ev.preventDefault();
                                    this.props.parentFunction('Statistic');
                                }.bind(this)}>統計</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;