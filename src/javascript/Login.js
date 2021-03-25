import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';
import logo from '../images/sakura_logo.png'

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";

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

    startFoucs(){
        this.idInput.focus();
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
        this.startFoucs();
        this._get();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    idKeyPress = (e) => {
        if(e.key === 'Enter') {
            if(this.state.UserID !== '') this.pwInput.focus();
        }
    }

    pwKeyPress = (e) => {
        if(e.key === 'Enter') {
            if(this.state.UserPW !== '' ) this.logIn();
        }
    }

    logIn = () => {
        let idCheck = false;

        Object.keys(this.state.Member).map(id => {
            const member = this.state.Member[id];
            console.log('unlock: ' + member['Unlock']);

            if(member['UserID'] === this.state.UserID) {
                idCheck = true;

                if(!member['Unlock']) {
                    // 계정잠김 페이지로 이동
                    this.props.history.push('/lockedAcc');

                }else {
                    if(member['UserPW'] === this.state.UserPW) {
                        // 세션에 유저 정보 seq, userID 저장
                        localStorage.setItem('sessionID', id);
                        localStorage.setItem('sessionUser', this.state.UserID);
                        localStorage.setItem('failCnt', 0);
                        // main page
                        this.props.history.push('/main');

                    }else {
                        let cnt = localStorage.getItem('failCnt');
                        if(cnt == null) cnt = 0;
                        ++cnt;

                        if(cnt < 5) {
                            alert('비밀번호를' + cnt + '회 잘못 입력하셨습니다.\n(실패 : ' + cnt + '회/5회)\n\n * 5회 이상 실패할 경우 고객님의 정보 보호를 위해 로그인이 제한됩니다.');
                            this.setState({
                                UserPW: ''
                            });
                            // 비번 틀린 횟수를 세션에 저장. 새로고침해도 횟수 정보가 남아있게 하기 위해.
                            localStorage.setItem('failCnt', cnt);
                        }else {
                            alert("パスワードを5回間違いました。\nアカウントが中止になります。");
                            localStorage.clear();
                            // 5회 비번 틀리면, unlock값을 false로 바꿔서 계정을 정지시킨다.

                            const Member = {
                                UserID: member['UserID'],
                                UserPW: member['UserPW'],
                                UserName: member['UserName'],
                                Birth: member['Birth'],
                                Address: member['Address'],
                                Phone: member['Phone'],
                                Unlock: false
                            }
                            // this._delete(id);
                            // this._post(Member);
                        }
                    }
                }
            }
        })
        if(!idCheck) alert('아이디가 존재하지 않습니다.');
    }

    _delete(id) {
        return fetch(`${databaseURL}/Member/${id}.json`, {
          method: 'DELETE'
        }).then(res =>{
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(() => {
          let nextState = this.state.Member;
          delete nextState[id];
          this.setState({Member: nextState});
        })
    }

    _post(Member){
        return fetch(`${databaseURL}/Member.json`, {
          method: 'POST',
          body: JSON.stringify(Member)
        }).then(res => {
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(data =>{
            let nextState = this.state.Member;
            nextState[data.name] = Member;
            this.setState({Member: nextState});

            // 계정잠김 페이지로 이동
            this.props.history.push('/lockedAcc');
        });
    }

    render() {
        return(
            <div className="Login">
                <div className="Login-Form">
                    <div className="test-div">
                        <div className="logo">
                            <img className="sakura-logo-img" src={logo} alt="SAKURA" />
                            <a className="title-atag" href="/">さくら正真家計簿</a>
                        </div>
                        <input className="UserID-input" type="text" name="UserID" placeholder="ID" value={this.state.UserID}
                            onChange={this.onChange}
                            onKeyPress={this.idKeyPress}
                            ref={(ref) => {this.idInput=ref}}
                        />
                        <input className="UserPW-input" type="password" name="UserPW" placeholder="Password" value={this.state.UserPW}
                            onChange={this.onChange}
                            onKeyPress={this.pwKeyPress}
                            ref={(ref) => {this.pwInput=ref}}
                        />
                        <br />
                        <div className="login-button">
                            <a href="/" className="login-atag" onClick={this.logIn}>ログイン</a>
                        </div>
                        <br />
                        <div className="Linked-div">
                            <Link className="Link-register" to="/memberForm">新規登録</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;