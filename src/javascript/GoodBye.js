import React, { Component } from 'react';
import '../css/GoodBye.css';
import sasakiMng from '../images/sasaki_mng.jpg'

class GoodBye extends Component {

    goToMain = () => {
        this.props.history.push('/');
    }
    
    render() {
        return (
            <div className="GoodBye">
                <div className="goodbye-div">
                    <div className="title">お世話になりました！</div>
                    <div className="msg">
                        <div>今までサービスを利用して頂き、ありがとうございました。</div>
                        <div>良いサービスを提供するように頑張ります。</div>
                        {/* <img className="sasaki-mng-img" src={sasakiMng} alt="SAKURA" /> */}
                    </div>
                    <div className="btn" onClick={this.goToMain}>
                        <div className="a-btn">Home</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GoodBye;