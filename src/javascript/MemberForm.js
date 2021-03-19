import React, { Component } from 'react';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";
// const databaseURL = "https://test-cfc9c-default-rtdb.firebaseio.com/";
let selectYear;
let selectMonth;
let selectDay_type1;
let selectDay_type2;
let selectDay_type3;

class MemberForm extends Component {
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
        selectMonth: '',
        selectDay: '',

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

        idMessage: '4자리 이상의 문자로 입력해주세요.',
        pwMessage: '6자리 이상의 문자로 입력해주세요.',
        nameMessage: '',
        birthMessage: '',
        addrMessage: '',
        phoneMessage: ''
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

    _get(){
        fetch(`${databaseURL}/Member.json`).then(res => {
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(Member => this.setState({Member: Member}));
    }

    componentDidMount(){
        this.calendar();
        this._get();
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
          // login페이지로 이동
          this.props.history.push('/');
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

            //**********주소 자동완성 api로 받은 값 세팅************/
            address1: document.getElementById('address1').value,
            address2: document.getElementById('address2').value,
            address3: document.getElementById('address3').value,
            //****************************************************/

            Address: this.state.zipCode1 + '|' + this.state.zipCode2 + '|'
                + this.state.address1 + '|' + this.state.address2 + '|' + this.state.address3 + '|' 
                + this.state.address4 + '|' + this.state.address5,
            Birth: this.state.birthYear + '-' + this.state.birthMonth + '-' + this.state.birthDay,
            Phone: this.state.phone1 + '-' + this.state.phone2 + '-' + this.state.phone3
        });

        // 생년월일 '월' select box 셋팅
        let birthYear = document.getElementById('birthYear');
        birthYear = birthYear.options[birthYear.selectedIndex].value;
        if(birthYear.length !==0) {
            this.setState({
                selectMonth: selectMonth
            })
        }

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

    // 우편번호로 주소 완성하기
    fillAddr = () => {
        const { AjaxZip3 } = window;
        AjaxZip3.zip2addr(
            'zipCode1',
            'zipCode2',
            'address1',
            'address2',
            'address3'
        );
    }

    validateID = () => {
        if(this.state.UserID.length >= 4) {
            let result = true;

            Object.keys(this.state.Member).map(id => {
                const member = this.state.Member[id];
                if(member.UserID === this.state.UserID) {
                    result = false;
                }
            });
            
            if(result) {
                this.setState({
                    idMessage: '사용가능한 아이디입니다.'
                });
                return true;
            }else {
                this.setState({
                    idMessage: '이미 사용중인 아이디입니다.'
                });
            }
        }else {
            this.setState({
                idMessage: '4자리 이상의 문자로 입력해주세요.'
            })
        }
        return false;
    }

    validatePW = () => {
        if(this.state.UserPW.length < 6) {
            this.setState({
                pwMessage: '비밀번호는 최소 6자리 이상입니다.'
            });
            return false;
        }else {
            this.setState({
                pwMessage: ''
            });
            return true;
        }
    }

    validateName = () => {
        if(this.state.UserName.length === 0) {
            this.setState({
                nameMessage: '이름은 필수항목입니다.'
            });
            return false;
        }else {
            this.setState({
                nameMessage: ''
            })
            return true;
        }
    }
    
    validateBirth = () => {
        let birthYear = this.state.birthYear;
        let birthMonth = this.state.birthMonth;
        let birthDay = this.state.birthDay;

        if(birthYear.length!==0 & birthMonth.length!==0 & birthDay.length!==0) {
            this.setState({
                birthMessage: ''
            });
            return true;
        }else {
            this.setState({
                birthMessage: '생년월일을 입력해주세요.'
            });
            return false;
        }
    }
    
    validateAddr = () => {
        let zipCode1 = this.state.zipCode1;
        let zipCode2 = this.state.zipCode2;
        let address1 = this.state.address1;
        let address2 = this.state.address2;
        let address3 = this.state.address3;
        let address4 = this.state.address4;

        if(zipCode1.length !== 0 & zipCode2.length !==0 &
            address1.length !==0 & address2.length !==0 & address3.length !==0 & address4.length !==0) {
                this.setState({
                    addrMessage: ''
                })
                return true;
        }else {
            this.setState({
                addrMessage: '주소를 입력해주세요.'
            })
            return false;
        }
    }

    validatePhone = () => {
        let phone1 = this.state.phone1;
        let phone2 = this.state.phone2;
        let phone3 = this.state.phone3;

        if(phone1.length !==0 & phone2.length !==0 & phone3.length !==0) {
            this.setState({
                phoneMessage: ''
            });
            return true;
        }else {
            this.setState({
                phoneMessage: '전화번호를 입력해주세요.'
            });
            return false;
        }
    }

    validateAll = () => {
        let checkID = this.validateID();
        let checkPW = this.validatePW();
        let checkName = this.validateName();
        let checkBirth = this.validateBirth();
        let checkAddr = this.validateAddr();
        let checkPhone = this.validatePhone();

        // 전체 유효성 체크
        if(checkID & checkPW & checkName & checkBirth & checkAddr & checkPhone) {
            const Member = {
                UserID: this.state.UserID,
                UserPW: this.state.UserPW,
                UserName: this.state.UserName,
                Birth: this.state.Birth,
                Address: this.state.Address,
                Phone: this.state.Phone
            }
            this._post(Member);
        }
    };

    render() {
        const onChange = this.onChange;
        const validateID = this.validateID;
        const validatePW = this.validatePW;
        const validateName = this.validateName;
        const validateBirth = this.validateBirth;
        const validateAddr = this.validateAddr;
        const validatePhone = this.validatePhone;
        const validateAll = this.validateAll;

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type="text" name="UserID" 
                                    onChange={onChange} 
                                    onKeyUp={validateID}
                                />
                            </td>
                            <td>{this.state.idMessage}</td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type="password" name="UserPW" 
                                    onChange={onChange} 
                                    onKeyUp={validatePW}
                                />
                            </td>
                            <td>{this.state.pwMessage}</td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input 
                                    type="text" name="UserName" 
                                    onChange={onChange} 
                                    onKeyUp={validateName}
                                />
                            </td>
                            <td>{this.state.nameMessage}</td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td>
                                <select name="birthYear" id="birthYear" onChange={onChange} onKeyUp={validateBirth}>
                                    <option value="">年</option>
                                    {selectYear}
                                </select>
                                <select name="birthMonth" id="birthMonth" onChange={onChange} onKeyUp={validateBirth}>
                                    <option value="">月</option>
                                    {this.state.selectMonth}
                                </select>
                                <select name="birthDay" onChange={onChange} onKeyUp={validateBirth}>
                                    <option value="">日</option>
                                    {this.state.selectDay}
                                </select>
                            </td>
                            <td>{this.state.birthMessage}</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <p>郵便番号</p>
                                <input name="zipCode1" size="3" maxLength="3"
                                    value={this.state.zipCode1}
                                    onChange={onChange}
                                    onKeyUp={validateAddr}
                                />
                                -
                                <input name="zipCode2" size="4" maxLength="4"
                                    value={this.state.zipCode2}
                                    onChange={onChange}
                                    onKeyUp={validateAddr}
                                />
                                <button type="button" className="ajaxzip3" onClick={this.fillAddr}>주소검색</button>

                                <p>都道府県</p>
                                <input type="text" name="address1" id="address1" 
                                    value={this.state.address1}
                                    onChange={onChange} 
                                    onKeyUp={validateAddr}
                                />
                                <p>市区町村</p>
                                <input type="text" name="address2" id="address2" 
                                    value={this.state.address2}
                                    onChange={onChange}
                                    onKeyUp={validateAddr}
                                />
                                <p>町名</p>
                                <input type="text" name="address3" id="address3" 
                                    value={this.state.address3}
                                    onChange={onChange}
                                    onKeyUp={validateAddr}
                                />
                                <p>番地</p>
                                <input type="text" name="address4" id="address4" 
                                    value={this.state.address4}
                                    onChange={onChange}
                                    onKeyUp={validateAddr}
                                />
                                <p>マンション名・部屋番号</p>
                                <input type="text" name="address5" id="address5" 
                                    value={this.state.address5}
                                    onChange={onChange}
                                    onKeyUp={validateAddr}
                                />
                            </td>
                            <td>{this.state.addrMessage}</td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input type="text" name="phone1" onChange={onChange} onKeyUp={validatePhone} />-
                                <input type="text" name="phone2" onChange={onChange} onKeyUp={validatePhone} />-
                                <input type="text" name="phone3" onChange={onChange} onKeyUp={validatePhone} />
                                <input type="hidden" />
                            </td>
                            <td>{this.state.phoneMessage}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={validateAll}>회원가입</button>
            </div>
        );
    }
}

export default MemberForm;