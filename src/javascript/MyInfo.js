import React, { Component } from 'react';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";
// const databaseURL = "https://test-cfc9c-default-rtdb.firebaseio.com/";
let selectYear;
let selectMonth;
let selectDay_type1;
let selectDay_type2;
let selectDay_type3;

class MyPage extends Component {
    state = {
        Member: {},
        UserID: '',
        UserPW: '',
        UserName: '',
        Birth: '',
        Address: '',
        Phone: '',

        birthYear: '',
        birthMonth: '',
        birthDay: '',

        zipCode1: '',
        zipCode2: '',
        address1: '',
        address2: '',
        address3: '',
        address4: '',
        address5: '',

        phone1: '',
        phone2: '',
        phone3: '',

        id : localStorage.getItem('sessionID'),
        sessionUser : localStorage.getItem('sessionUser')
    }

    calendar(){
        let year = [];
        let month = [];
        let dayType1 = [];
        let dayType2 = [];
        let dayType3 = [];

        for(let i=2021; i>1920; i--)
            year.push(i);
        for(let i=1; i<=12; i++)
            month.push(i);
        for(let i=1; i<=28; i++)
            dayType1.push(i);
        for(let i=1; i<=30; i++)
            dayType2.push(i);
        for(let i=1; i<=31; i++)
            dayType3.push(i);
        
        selectYear = year.map((year, index) => <option key={index} value={year}>{year}</option>);
        selectMonth = month.map((month, index) => <option key={index} value={month}>{month}</option>);
        selectDay_type1 = dayType1.map((dayType1, index) => <option key={index} value={dayType1}>{dayType1}</option>);
        selectDay_type2 = dayType2.map((dayType2, index) => <option key={index} value={dayType2}>{dayType2}</option>);
        selectDay_type3 = dayType3.map((dayType3, index) => <option key={index} value={dayType3}>{dayType3}</option>);
    }

    componentDidMount(){
        this.calendar();
        this._get();
    }

    _get(){
        fetch(`${databaseURL}/Member.json`).then(res => {
            if(res.status !== 200){
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(Member => {
            this.setState({ 
                Member: Member[this.state.id],
                UserID: Member[this.state.id]['UserID'],
                UserPW: Member[this.state.id]['UserPW'],
                UserName: Member[this.state.id]['UserName'],

                Birth: Member[this.state.id]['Birth'],
                birthYear: Member[this.state.id]['Birth'].split('-')[0],
                birthMonth: Member[this.state.id]['Birth'].split('-')[1],
                birthDay: Member[this.state.id]['Birth'].split('-')[2],

                zipCode1: Member[this.state.id]['Address'].split('|')[0],
                zipCode2: Member[this.state.id]['Address'].split('|')[1],
                address1: Member[this.state.id]['Address'].split('|')[2],
                address2: Member[this.state.id]['Address'].split('|')[3],
                address3: Member[this.state.id]['Address'].split('|')[4],
                address4: Member[this.state.id]['Address'].split('|')[5],
                address5: Member[this.state.id]['Address'].split('|')[6],
                
                Phone: Member[this.state.id]['Phone'],
                phone1: Member[this.state.id]['Phone'].split('-')[0],
                phone2: Member[this.state.id]['Phone'].split('-')[1],
                phone3: Member[this.state.id]['Phone'].split('-')[2]
            });

            // let year = [];
            // let month = [];
            // let dayType1 = [];
            // let dayType2 = [];
            // let dayType3 = [];

            // for(let i=2021; i>1920; i--)
            //     year.push(i);
            // for(let i=1; i<=12; i++)
            //     month.push(i);
            // for(let i=1; i<=28; i++)
            //     dayType1.push(i);
            // for(let i=1; i<=30; i++)
            //     dayType2.push(i);
            // for(let i=1; i<=31; i++)
            //     dayType3.push(i);

            // console.log('db에서 받아온 년도 : ' + Member[this.state.id]['Birth'].split('-')[0]);

            

            // // if문으로 birth 비교해서 맞으면 selected로, 해당생일 아니면 원래대로 출력
            // selectYear = year.map((year, index) => 
            //     {
            //         if(year === 2020){
            //             return <option key={index} value={year} selected>{year}</option>;
            //         }
            //         return <option key={index} value={year}>{year}</option>;;
            //     }
            // );
                
        });          
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
            // 삭제 후 새로 생성된 유저정보의 seq로 세션 아이디를 바꿔준다.
            this.changeSessionID();
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
                    
                    alert('회원정보가 수정되었습니다.');
                    this.props.history.push('/main');
                }
            });
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            Birth: this.state.birthYear + '-' + this.state.birthMonth + '-' + this.state.birthDay,
            Phone: this.state.phone1 + '-' + this.state.phone2 + '-' + this.state.phone3
        })

        // 생년월일 '일' select box 셋팅
        let birthMonth = document.getElementById('birthMonth');
        birthMonth = birthMonth.options[birthMonth.selectedIndex].value;
        switch(birthMonth) {
            case "":
                break;
            case "2":
                this.setState({
                    selectDay: selectDay_type1
                });
                break;
            case "4":
            case "6":
            case "9":
            case "11":
                this.setState({
                    selectDay: selectDay_type2
                });
                break;
            default:
                this.setState({
                    selectDay: selectDay_type3
                });
        }
    }

    modify = () => {
        this._delete(this.state.id);

        const Member = {
            UserID: this.state.UserID,
            UserPW: this.state.UserPW,
            UserName: this.state.UserName,
            Birth: this.state.Birth,
            Address: '東京都府中市',
            Phone: this.state.Phone
        }
        this._post(Member);
    }

    render(){
        const onChange = this.onChange;
        
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>{this.state.UserID}</td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td><input type="password" name="UserPW" value={this.state.UserPW} onChange={onChange}/>{this.state.Member['UserPW']}</td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td><input type="text" name="UserName" value={this.state.UserName} onChange={onChange}/>{this.state.Member['UserName']}</td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td>
                                <select name="birthYear" id="birthYear" onChange={onChange}>
                                    <option value="">年</option>
                                    {selectYear}
                                </select>
                                <select name="birthMonth" id="birthMonth" onChange={onChange}>
                                    <option value="">月</option>
                                    {selectMonth}
                                </select>
                                <select name="birthDay" onChange={onChange}>
                                    <option value="">日</option>
                                    {this.state.selectDay}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input type="text" name="phone1" value={this.state.phone1} onChange={onChange} />-
                                <input type="text" name="phone2" value={this.state.phone2} onChange={onChange} />-
                                <input type="text" name="phone3" value={this.state.phone3} onChange={onChange} />
                            </td>
                        </tr>   
                    </tbody>
                </table>
                <button onClick={this.modify}>수정</button>
            </div>    
        );
    }

}

export default MyPage;