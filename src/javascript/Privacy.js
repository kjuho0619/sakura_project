import React, { Component } from 'react';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";
// const databaseURL = "https://test-cfc9c-default-rtdb.firebaseio.com/";

let cnt = 0;

class Privacy extends Component {
    state = {
        Member: {},
        UserID: '',
        UserPW: '',
        inputPW: '',
        id : localStorage.getItem('sessionID')
    }

    _get(){
        fetch(`${databaseURL}/Member.json`).then(res => {
            if(res.status !== 200){
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(Member => this.setState({ Member: Member[this.state.id] }));    
    }

    componentDidMount(){
        this._get();
    }

    setInputPW = (e) => {
        this.setState({
            inputPW: e.target.value
        });
    }

    checkPW = () => {
        if(this.state.Member['UserPW'] === this.state.inputPW){
            cnt = 0;
            // 개인정보 페이지로 이동
            this.props.history.push('/myInfo');
        }else{
            ++cnt;
            if(cnt < 5){
                alert('비밀번호를' + cnt + '회 잘못 입력하셨습니다.\n(실패 : ' + cnt + '회/5회)\n\n * 5회 이상 실패할 경우 고객님의 정보 보호를 위해 로그인이 제한됩니다.');
                this.setState({
                    inputPW: ''
                })
            }else{
                // '계정 사용이 정지되었습니다. 관리자에게 문의하세요'  페이지로 이동
            }
        } 
    }
    
    render(){
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                비밀번호 재확인<br />
                                개인정보보호를 위해 회원님의 비밀번호를 다시 한번 확인합니다.
                            </td>
                        </tr>
                        <tr>
                            <td><input type="text" name="UserID" value={this.state.Member['UserID']} readOnly /></td>
                        </tr>
                        <tr>
                            <td><input type="password" name="inputPW" value={this.state.inputPW} onChange={this.setInputPW}/></td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.checkPW}>확인</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Privacy;