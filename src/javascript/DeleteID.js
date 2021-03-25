import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyInfoHeader from './MyInfoHeader.js'
import '../css/DeleteID.css';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";

let cnt = 0;

class DeleteID extends Component {
    state = {
        Member: {},
        inputPW: '',
        id: localStorage.getItem('sessionID'), 
        sessionUser : localStorage.getItem('sessionUser'),
        pwConfirm: localStorage.getItem('pwConfirm') // 이 페이지에서 이미 한 번 비밀번호 확인을 거친 적이 있는지 여부. 
                                                    // true이면 비번 확인 안 하고, 바로 myInfo로 이동함.
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
                alert('暗証番号を' + cnt + '回間違いました。\n(失敗 : ' + cnt + '回/5回)\n\n * 5回以上失敗したら、ログインが不可能になります。');
                let nextState = this.state.Member;
                nextState["UserPW"] = '';
                this.setState({Member: nextState});
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

    cancel = () => {
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="DeleteID">
                <MyInfoHeader databaseURL={databaseURL} parentFunction={this.parentFunction} sessionUser={this.state.sessionUser}
                    infoColor="black" deleteColor="red"/>

                <main>
                    <div className="deleteID-div">
                        <table>
                            <tbody>
                                <tr>
                                    <div className="title">下記のことをご確認お願い致します。</div>

                                    <div className="msg-title">個人情報の削除</div>
                                    <div className="msg msg1">お客様のプロフィールや家計簿の内容はなくなります。</div>
                                    <div className="msg-title">どんなことが不便でしたか。</div>
                                    <div className="msg msg2">ご意見を反映してより良いサービスに改善していきます。</div>
                                    
                                    <div className="checkbox">
                                        <input type="checkbox" id="error"/>
                                        <label for="error">システムエラー</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="checkbox" id="difficult"/>
                                        <label for="difficult">書き方が難しい</label><br />
                                        <input type="checkbox" id="function"/>
                                        <label for="function">必要な機能がない</label>&nbsp;&nbsp;
                                        <input type="checkbox" id="cs"/>
                                        <label for="cs">応対が親切ではない</label>
                                    </div>
                                </tr>
                                <tr>
                                    <div className="input_div">
                                        <div className="msg-pw">本人確認のため、もう一度暗証番号を入力してくださいませ。</div>
                                        <input type="text" name="UserID" value={this.state.Member['UserID']} readOnly /><br />
                                        <input 
                                                type="password" name="inputPW" placeholder="Password" value={this.state.inputPW} 
                                                onChange={this.onChange}
                                                onKeyPress={this.pwKeyPress}
                                                ref={(ref) => {this.pwInput=ref}}
                                            />
                                    </div>
                                </tr>
                                <tr>
                                    <div className="btn confirmBtn" onClick={this.checkPW}>
                                        <a href="#" className="a-btn1">確&nbsp;認</a>
                                    </div>
                                    <div className="btn cancelBtn" onClick={this.cancel}>
                                        <Link className="a-btn2" to="/">キャンセル</Link>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        );
    }
}

export default DeleteID;