import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Privacy.css';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";

let cnt = 0;

class Privacy extends Component {
    state = {
        Member: {},
        inputPW: '',
        id: localStorage.getItem('sessionID'), 
        sessionUser : localStorage.getItem('sessionUser'),
        pwConfirm: localStorage.getItem('pwConfirm') // 이 페이지에서 이미 한 번 비밀번호 확인을 거친 적이 있는지 여부. 
                                                    // true이면 비번 확인 안 하고, 바로 myInfo로 이동함.
    }

    sessionCheck(){
        if(this.state.pwConfirm) {
            // myInfo로 이동
            this.props.history.push('/myInfo');
        }
    }

    startFocus(){
        this.pwInput.focus();
    }
    
    _get(){
        fetch(`${databaseURL}/Member.json`).then(res => {
            if(res.status !== 200){
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(Member => {
            this.unlockCheck(Member[this.state.id]['Unlock']);
            this.setState({ Member: Member[this.state.id] });
        });    
    }

    unlockCheck(unlock){
        if(!unlock) {
            // 계정잠김 페이지로 이동
            this.props.history.push('/lockedAcc');
        }
    }

    componentDidMount(){
        this.sessionCheck();
        this.startFocus();
        this._get();
    }

    onChange = (e) => {
        this.setState({
            inputPW: e.target.value
        });
    }

    pwKeyPress = (e) => {
        if(e.key === 'Enter') {
            if(this.state.inputPW !== '') this.checkPW();
        }
    }

    checkPW = () => {
        if(this.state.Member['UserPW'] === this.state.inputPW){
            cnt=0;
            localStorage.setItem('pwConfirm', true);
            // 개인정보 페이지로 이동
            this.props.history.push('/myInfo');
            
        }else{
            ++cnt;

            if(cnt < 5){
                alert('비밀번호를' + cnt + '회 잘못 입력하셨습니다.\n(실패 : ' + cnt + '회/5회)\n\n * 5회 이상 실패할 경우 고객님의 정보 보호를 위해 로그인이 제한됩니다.');
                this.setState({
                    inputPW: ''
                })
                // 비번 틀린 횟수를 세션에 저장. 새로고침해도 횟수 정보가 남아있게 하기 위해.
                // localStorage.setItem('failCnt', cnt);
            }else{
                alert("パスワードを5回間違いました。\nアカウントが中止になります。");
                // 5회 비번 틀리면, unlock값을 false로 바꿔서 계정을 정지시킨다.
                // 메인 화면 접근하지 못하도록 로그아웃해서 페이지 이동시킴.
                localStorage.clear();

                const Member = {
                    UserID: this.state.Member['UserID'],
                    UserPW: this.state.Member['UserPW'],
                    UserName: this.state.Member['UserName'],
                    Birth: this.state.Member['Birth'],
                    Address: this.state.Member['Address'],
                    Phone: this.state.Member['Phone'],
                    Unlock: false
                }
                this._delete(this.state.id);
                this._post(Member);
            }
        } 
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
            this.props.history.push('/lockedAcc');
            //this.changeSessionID();
        });
    }
    
    changeSessionID(){
        fetch(`${databaseURL}/Member.json`).then(res => {
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(Member => {
            Object.keys(Member).map(id => {
                const member = Member[id];
        
                if(member['UserID'] === this.state.sessionUser) {
                    localStorage.setItem('sessionID', id);
                    
                    // 계정잠김 페이지로 이동
                    this.props.history.push('/lockedAcc');
                }
            });
        });
    }

    render(){
        return(
            <div className="Privacy">
                <div className="privacy-div">
                    <table>
                        <tbody>
                            <tr>
                                <div className="title">暗証番号の確認</div>
                                <div className="msg">個人情報保護のため、お客様の暗証番号をまた確認します。</div>
                            </tr>
                            <tr>
                                <div className="input_div">
                                    <input type="text" name="UserID" value={this.state.Member['UserID']} readOnly />
                                    <input 
                                            type="password" name="inputPW" placeholder="Password" value={this.state.inputPW} 
                                            onChange={this.onChange}
                                            onKeyPress={this.pwKeyPress}
                                            ref={(ref) => {this.pwInput=ref}}
                                        />
                                </div>
                            </tr>
                            <tr>
                                <div className="btn confirmBtn">
                                    <a href="#" className="a-btn1" onClick={this.checkPW}>確&nbsp;認</a>
                                </div>
                                <div className="btn cancelBtn">
                                    <Link className="a-btn2" to="/">キャンセル</Link>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Privacy;