import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/LockedAccount.css';
import sasakiMng from '../images/sasaki_mng.jpg'

class LockedAccount extends Component {

    goToMain = () => {
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div className="LockedAcc">
                <div className="locked-div">
                    <table>
                        <tbody>
                            <tr>
                                <div className="title">アカウントの中止</div>
                                <div className="msg">
                                    <div>アカウントが中止されています。</div>
                                    <div>再開のためお問い合わせくださいませ。</div>
                                    <div className="tanto1">担当 : 佐々木 惠美 マネージャー</div>
                                    <div className="tanto2">(042-333-0003)</div>
                                    <img className="sasaki-mng-img" src={sasakiMng} alt="SAKURA" />
                                </div>
                            </tr>
                            <tr>
                                <div className="btn" onClick={this.goToMain}>
                                    <Link className="a-btn" to="/" >Back</Link>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default LockedAccount;