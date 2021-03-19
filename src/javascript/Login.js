import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";
// const databaseURL = "https://test-cfc9c-default-rtdb.firebaseio.com/";

class Login extends Component {
    state = {
        Member: {},
        UserID: '',
        UserPW: '',
        sessionID : localStorage.getItem('sessionID')
    }

    sessionCheck(){
        if(this.state.sessionID !== null) {
            // 메인페이지로 이동
            this.props.history.push('/main');
        }
    }

    _get(){
        fetch(`${databaseURL}/Member.json`).then(res => {
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(Member => this.setState({Member: Member}));
    }

    componentDidMount(){
        this.sessionCheck();
        this._get();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    logIn = () => {
        let idCheck = false;

        Object.keys(this.state.Member).map(id => {
            const member = this.state.Member[id];

            if(member['UserID'] === this.state.UserID) {
                idCheck = true;

                if(member['UserPW'] === this.state.UserPW) {
                    // 세션에 유저 정보 seq, userID 저장
                    localStorage.setItem('sessionID', id);
                    localStorage.setItem('sessionUser', this.state.UserID);
                    // main page
                    this.props.history.push('/main');
                }
                else alert('비밀번호가 일치하지 않습니다.');
            }
        })
        if(!idCheck) alert('아이디가 존재하지 않습니다.');
    }

    render() {
        return(
            <div>
                <input
                    type="text"
                    name="UserID"
                    placeholder="ID"
                    value={this.state.UserID}
                    onChange={this.onChange}
                />
                <br />
                <input 
                    type="password"
                    name="UserPW"
                    placeholder="Password"
                    value={this.state.UserPW}
                    onChange={this.onChange}
                />
                <br />
                <button onClick={this.logIn}>login</button>
                <Link to="/memberForm">회원가입</Link>
            </div>
        );
    }
}

export default Login;