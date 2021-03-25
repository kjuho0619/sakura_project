import { Component } from "react"
import '../css/MainPage.css'
import moment from 'moment'
import ModalT from './Modal_1'
import ModalFixed from './FixedModal'
import ModalCopy from './ModalCopy'
import FixedModalCopy from './FixedModalCopy'

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";

class MakeList extends Component {
  test(param) {
    if(param <= 0) {
      return(
        <li>データがありません。</li>
      )
    }
  }

  render(){
    var count = 0;
    if(this.props.state != null) {
      return(
        <span>
          {Object.keys(this.props.state).map(keyIndex => {
            const indexValue = this.props.state[keyIndex];
            
            if(indexValue.InOutCode == this.props.InOutCode
              && this.props.Select == "Day"
              && indexValue.UserID == this.props.UserID
              && indexValue.Date == this.props.CurrentDate
            ) {
              count = count + 1;
            return (
              <li key={keyIndex} className="made-li">
                <a className="list-link" href="" onClick={function(ev){
                  ev.preventDefault();
                  this.props.ModalShow(true);
                  this.props.KeyChange(keyIndex);
                }.bind(this)}>
                  <div className="list-item-container">
                    <div className="item-divisioncode item-content"><p className="item-content-p">{indexValue.DivisionCode}</p></div>
                    <div className="item-content-code item-content"><p className="item-content-p">{indexValue.Content}</p></div>
                    <div className="item-price item-content"><p className="item-content-p">{indexValue.Price}</p></div>
                  </div>                  
                </a>
              </li>
              );
            } else if(indexValue.InOutCode == this.props.InOutCode
              && this.props.Select == "Fixed"
              && indexValue.UserID == this.props.UserID
            ) {
              count = count + 1;
            return (
              <li key={keyIndex} className="made-li">
                <a className="list-link" href="" onClick={function(ev){
                  ev.preventDefault();
                  this.props.ModalShow(true);
                  this.props.KeyChange(keyIndex);
                }.bind(this)}>
                  <div className="list-item-container">
                    <div className="item-divisioncode item-content"><p className="item-content-p">{indexValue.DivisionCode}</p></div>
                    <div className="item-content-code item-content"><p className="item-content-p">{indexValue.Content}</p></div>
                    <div className="item-price item-content"><p className="item-content-p">{indexValue.Price}</p></div>
                  </div>
                </a>
              </li>
              );
            }
          })}
          {this.test(count)}
        </span>
      );
    }
  }
}

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      modalShow: false,
      fixedModalShow: false,
      dayFlag: false,
      monthFlag: false,
      managementForDay: {},
      managementForMonth: {},
      currentDate: moment().format('YYYY-MM-DD'),
      UserID: localStorage.getItem('sessionUser'),
      perDayKey: '',
      perFixedKey: '',
      InOutCode: '',
      Date: '',
      AssetsCode: '',
      DivisionCode: '',
      Price: '',
      Content: '',
      DetailContent: '',
      PaymentDay: '',
      PaymentMonth: ''
    }
  }

  _getPerDay() {
    fetch(`${databaseURL}/ManagementForDay.json`).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(managementForDay => {
      if(managementForDay != null) {
        this.setState({managementForDay: managementForDay})
      } else {
        this.setState({managementForDay: ''})
      }
    });
  }

  _getPerMonth() {
    fetch(`${databaseURL}/ManagementForFixed.json`).then(res => {
      if (res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(managementForFixed => {
      if(managementForFixed != null) {
        this.setState({managementForMonth: managementForFixed})
      }
    });
  }

  componentDidMount() {
    this._getPerDay();
    this._getPerMonth();
  }

  // 모달 키고끄는 것
  modalShow = (flag) => {
    this.setState({modalShow: flag});
  }

  // 월별 모달
  fixedModalShow = (flag) => {
    this.setState({fixedModalShow: flag});
  }

  dayModal = (flag) => {
    this.setState({dayFlag: flag});
  }

  monthModal = (flag) => {
    this.setState({monthFlag: flag});
  }

  keyChange = (key) => {
    this.setState({
      perDayKey: key,
      InOutCode: this.state.managementForDay[key].InOutCode,
      Date: this.state.managementForDay[key].Date,
      AssetsCode: this.state.managementForDay[key].AssetsCode,
      DivisionCode: this.state.managementForDay[key].DivisionCode,
      Price: this.state.managementForDay[key].Price,
      Content: this.state.managementForDay[key].Content,
      DetailContent: this.state.managementForDay[key].DetailContent,
      InOutCodeCheck: this.state.managementForDay[key].InOutCodeCheck
    });
  } 

  fixedKeyChange = (key) => {
    this.setState({
      perFixedKey: key,
      InOutCode: this.state.managementForMonth[key].InOutCode,
      Date: this.state.managementForMonth[key].Date,
      AssetsCode: this.state.managementForMonth[key].AssetsCode,
      DivisionCode: this.state.managementForMonth[key].DivisionCode,
      Price: this.state.managementForMonth[key].Price,
      Content: this.state.managementForMonth[key].Content,
      DetailContent: this.state.managementForMonth[key].DetailContent,
      PaymentDay: this.state.managementForMonth[key].PaymentDay,
      PaymentMonth: this.state.managementForMonth[key].PaymentMonth
    });
  }

  DataChangeHandler = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }

  render(){
    var currentDate = this.state.currentDate;
    var dateList = currentDate.split("-");
    var today = dateList[0] + "年 " + dateList[1] + "月 " + dateList[2] + "日";

    return(
      <div className="main-page">
          <div className="date-title">
            {today}
          </div>
        <div className="flex-container upper-side">
          <div className="grid-item-upper-left">
            <div className="grid-item-title">
              <h1 className="item-title">日別収入{this.state.thatPrice}</h1>
            </div>
            <div className="grid-item-content">
              <ul className="ul-list">
               <MakeList state={this.state.managementForDay}
                  Select="Day"
                  InOutCode="収入"
                  index={this.state.index}
                  ModalShow={this.modalShow}
                  KeyChange={this.keyChange}
                  CurrentDate={this.state.currentDate}
                  ThatPrice={this.ThatPrice}
                  UserID={this.state.UserID}>
                </MakeList>
              </ul>
            </div>
          </div>
          <div className="grid-item-upper-right">
            <div className="grid-item-title">
              <h1 className="item-title day-out-title">日別支出</h1>
            </div>
            <div className="grid-item-content">
              <ul className="ul-list">
                <MakeList state={this.state.managementForDay}
                  Select="Day"
                  InOutCode="支出"
                  ModalShow={this.modalShow}
                  KeyChange={this.keyChange}
                  ThatPrice={this.ThatPrice}
                  UserID={this.state.UserID}>
                </MakeList>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-container lower-side">
          <div className="grid-item-lower-left">
            <div className="grid-item-title">
              <h1 className="item-title">月別収入</h1>
            </div>
          <div className="grid-item-content">
            <ul className="ul-list">
              <MakeList 
                state={this.state.managementForMonth}
                Select="Fixed"
                InOutCode="収入"
                ModalShow={this.fixedModalShow}
                KeyChange={this.fixedKeyChange}
                ThatPrice={this.ThatPrice}
                UserID={this.state.UserID}>
              </MakeList>
            </ul>
          </div>
        </div>
        <div className="grid-item-lower-right">
          <div className="grid-item-title">
            <h1 className="item-title day-out-title">月別支出</h1>
          </div>
          <div className="grid-item-content">
            <ul className="ul-list">
              <MakeList 
                state={this.state.managementForMonth}
                Select="Fixed"
                InOutCode="支出"
                ModalShow={this.fixedModalShow}
                KeyChange={this.fixedKeyChange}
                ThatPrice={this.ThatPrice}
                UserID={this.state.UserID}>
              </MakeList>
            </ul>
          </div>
        </div>
      </div>
      <ModalT 
            modalShow={this.modalShow} 
            DataChangeHandler={this.DataChangeHandler}
            managementForDay={this.state.managementForDay}
            flag={this.state.modalShow} 
            indexKey={this.state.perDayKey}
            InOutCode={this.state.InOutCode}
            modalDate={this.state.Date}
            AssetsCode={this.state.AssetsCode}
            DivisionCode={this.state.DivisionCode}
            Price={this.state.Price}
            Content={this.state.Content}
            DetailContent={this.state.DetailContent}
            InOutCodeCheck={this.state.InOutCodeCheck}
            UserID={this.state.UserID}>
      </ModalT>
      <ModalFixed
        FixedModalShow={this.fixedModalShow}
        DataChangeHandler={this.DataChangeHandler}
        flag={this.state.fixedModalShow}
        managementForFixed={this.state.managementForMonth}
        indexKey={this.state.perFixedKey}
        DivisionCode={this.state.DivisionCode}
        AssetsCode={this.state.AssetsCode}
        PaymentDay={this.state.PaymentDay}
        PaymentMonth={this.state.PaymentMonth}
        InOutCode={this.state.InOutCode}
        Price={this.state.Price}
        Content={this.state.Content}
        DetailContent={this.state.DetailContent}
        UserID={this.state.UserID}>
      </ModalFixed>

      <ModalCopy 
        flag = {this.state.dayFlag}
        modalShow = {this.dayModal}
        UserID = {this.state.UserID}>
      </ModalCopy>
        
      <FixedModalCopy 
        flag = {this.state.monthFlag}
        modalShow1 = {this.monthModal}
        UserID = {this.state.UserID}>
      </FixedModalCopy>

      <div className="add-btn-container">
        <div className="add-btn-div">
          <button className="add-btn-per-day add-btn" onClick={e => {
            e.preventDefault();
            if(this.state.dayFlag === false){
              this.dayModal(!this.state.modalShow);
              this.monthModal(false);
            } else if(this.state.dayFlag === true) {
              this.dayModal(!this.state.modalShow);
              this.monthModal(false);
            }}}>
            일별지출
          </button>
        </div>
        <div className="add-btn-div">
          <button className="add-btn-per-month add-btn" name="btnMonth" onClick={e => {
            e.preventDefault();
            if(this.state.monthFlag === false){
              this.monthModal(!this.state.modalSxhow1);
              this.dayModal(false);
            } else if(this.state.monthFlag ===true){
              this.monthModal(!this.state.modalShow1);
              this.dayModal(false);
            }}}>
            월별지출
          </button>
        </div>
      </div>
    </div>    
  );
  }
}

export default MainPage;