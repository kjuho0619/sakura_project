import { Component } from 'react';
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
                                <a href="#">メインページ</a>
                            </li>
                            <li>
                                <a href="#">日別詳細</a>
                            </li>
                            <li>
                                <a href="#">月別詳細</a>
                            </li>
                            <li>
                                <a href="#">統計</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;