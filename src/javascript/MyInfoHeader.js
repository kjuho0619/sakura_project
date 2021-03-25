import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/MyInfoHeader.css'
import logo from '../images/sakura_logo.png'

class Header extends Component{
    constructor(){
        super();
        this.state={
            id : localStorage.getItem('sessionID'),//Member Key
            sessionUser : localStorage.getItem('sessionUser'),//Member userid
        }
    }
    logout = () => {
        let result =window.confirm("ログインページに移動します。\nログアウトしますか。");
        if(result) localStorage.clear();
    }

    render(){
        console.log('infoColor: ' + this.props.infoColor);
        console.log('deleteColor: ' + this.props.deleteColor);
        return(
            <div className="myInfoHeader">
                <header>
                    <div className="nav">
                        <a className="sakura-logo-atag" href="/main">
                            <img className="sakura-logo-img" src={logo} alt="SAKURA" />
                        </a>
                        <a className="title-atag" href="/main">さくら正真家計簿</a>

                        <div className="sub-menu">
                            <ul className="menu">
                                <li className="userID">
                                    {this.state.sessionUser}様、ようこそ!
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
                                    <Link to="/privacy" className={this.props.infoColor}>ユーザー情報</Link>
                                </li>
                                <li>
                                    <Link to="/deleteID" className={this.props.deleteColor}>ID削除</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;