import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'
import logo from '../images/sakura_logo.png'

class Header extends Component{
    logout = () => {
        let result =window.confirm("ログインページに移動します。\nログアウトしますか。");
        if(result) localStorage.clear();
    }

    render(){
        return(
            <header>
                <div className="nav">
                    <a className="sakura-logo-atag" href="/main">
                        <img className="sakura-logo-img" src={logo} alt="SAKURA" />
                    </a>
                    <a className="title-atag" href="/main">さくら正真家計簿</a>

                    <div className="sub-menu">
                        <ul className="menu">
                            <li className="userID">
                                {this.props.sessionUser}様、ようこそ!
                            </li>
                            <li>
                                <Link to="/privacy">My Info</Link>
                            </li>
                            <li>
                                <a href="/" onClick={this.logout}>LogOut</a>
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