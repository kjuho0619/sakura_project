import { Component } from "react"
import '../css/MainPage.css'
import moment from 'moment'
import ModalT from './Modal_1'
import ModalFixed from './FixedModal'
import ModalCopy from './ModalCopy'
import FixedModalCopy from './FixedModalCopy'

// const databaseURL = "https://word-cloud-1c0dd-default-rtdb.firebaseio.com/";
// const databaseURL = "https://firebsae-practice-default-rtdb.firebaseio.com/";
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
            // this.props.moneyCalcul(price);
            // session에서 값 가져오기
            if(indexValue.InOutCode === this.props.InOutCode
              && this.props.Select === "Day"
            // && indexValue.UserID === {sessionStorage.UserID}
            // && indexValue.Date === this.props.CurrentDate
            ) {
              count = count + 1;
            return (
              <li key={keyIndex}>
                <a className="list-link" href="" onClick={function(ev){
                  ev.preventDefault();
                  this.props.ModalShow(true);
                  this.props.KeyChange(keyIndex);
                }.bind(this)}>
                  <div className="index-value-div-code">{indexValue.DivisionCode}</div>
                  <div className="content-asset-box">
                    <div className="index-value-content">{indexValue.Content}</div>
                    <div className="index-value-asset-code">{indexValue.AssestsCode}</div>
                  </div>
                  <div className="index-value-price">
                    {indexValue.Price}
                  </div>
                </a>
              </li>
              );
            } else if(indexValue.InOutCode === this.props.InOutCode
              && this.props.Select === "Fixed"
            // && indexValue.UserID === {sessionStorage.UserID}
            // && indexValue.Date === this.props.CurrentDate
            ) {
              count = count + 1;
            return (
              <li key={keyIndex}>
                <a className="list-link" href="" onClick={function(ev){
                  ev.preventDefault();
                  this.props.ModalShow(true);
                  this.props.KeyChange(keyIndex);
                }.bind(this)}>
                  <div className="index-value-div-code">{indexValue.DivisionCode}</div>
                  <div className="content-asset-box">
                    <div className="index-value-content">{indexValue.Content}</div>
                    <div className="index-value-asset-code">{indexValue.AssestsCode}</div>
                  </div>
                  <div className="index-value-price">
                    {indexValue.Price}
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
      perDayKey: '',
      perFixedKey: '',
      InOutCode: '',
      modalDate: '',
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
    console.log(key);
    this.setState({
      perDayKey: key,
      InOutCode: this.state.managementForDay[key].InOutCode,
      modalDate: this.state.managementForDay[key].Date,
      AssetsCode: this.state.managementForDay[key].AssetsCode,
      DivisionCode: this.state.managementForDay[key].DivisionCode,
      Price: this.state.managementForDay[key].Price,
      Content: this.state.managementForDay[key].Content,
      DetailContent: this.state.managementForDay[key].DetailContent,
      InOutCodeCheck: this.state.managementForDay[key].InOutCodeCheck
    });
  } 

  fixedKeyChange = (key) => {
    console.log(this.state.managementForMonth[key]);
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
    return(
      <div className="main-page">
        <div className="flex-container upper-side">
          <div className="grid-item-upper-left">
            <div className="grid-item-title">
              <span className="item-title">일별 수입</span>
              <span>+ {this.state.calMoney}</span>
            </div>
            <div className="grid-item-content">
              <ul className="in-come-ul">
               <MakeList state={this.state.managementForDay}
                  Select="Day"
                  InOutCode="収入"
                  index={this.state.index}
                  ModalShow={this.modalShow}
                  KeyChange={this.keyChange}
                  CurrentDate={this.state.currentDate}>
                </MakeList>
              </ul>
            </div>
          </div>
          <div className="grid-item-upper-right">
            <p className="grid-item-title">
              <span className="item-title">일별 지출</span>
            </p>
            <div className="grid-item-content">
              <ul className="in-come-ul">
                <span className="item-content">
                  <MakeList state={this.state.managementForDay}
                    Select="Day"
                    InOutCode="支出"
                    ModalShow={this.modalShow}
                    KeyChange={this.keyChange}>
                  </MakeList>
                </span>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-container lower-side">
          <div className="grid-item">
            <p className="grid-item-title">
              <span className="item-title">월별 수입</span>
            </p>
          <div className="grid-item-content">
            <ul>
              <span className="item-content">
                <MakeList 
                state={this.state.managementForMonth}
                Select="Fixed"
                InOutCode="収入"
                ModalShow={this.fixedModalShow}
                KeyChange={this.fixedKeyChange}>
                </MakeList>
              </span>
            </ul>
          </div>
        </div>
        <div className="grid-item">
          <p className="grid-item-title">
            <span className="item-title">월별 지출</span>
          </p>
          <div className="grid-item-content">
            <ul>
              <span className="item-content">
                <MakeList 
                  state={this.state.managementForMonth}
                  Select="Fixed"
                  InOutCode="支出"
                  ModalShow={this.fixedModalShow}
                  KeyChange={this.fixedKeyChange}>
                </MakeList>
              </span>
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
            modalDate={this.state.modalDate}
            AssetsCode={this.state.AssetsCode}
            DivisionCode={this.state.DivisionCode}
            Price={this.state.Price}
            Content={this.state.Content}
            DetailContent={this.state.DetailContent}
            InOutCodeCheck={this.state.InOutCodeCheck}>
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
        DetailContent={this.state.DetailContent}>
      </ModalFixed>

      <ModalCopy 
        flag = {this.state.dayFlag}
        modalShow = {this.dayModal}>
      </ModalCopy>
        
      <FixedModalCopy 
        flag = {this.state.monthFlag}
        modalShow1 = {this.monthModal}>
      </FixedModalCopy>
      <button onClick={e => {
        e.preventDefault();
        if(this.state.dayFlag === false){//일별 지출이 켜졌으면 가만히 있고 월별지출이 켜져있으면 일별지출을 꺼라
          this.dayModal(!this.state.modalShow);
          this.monthModal(false);
        } else if(this.state.dayFlag === true) {
          this.dayModal(!this.state.modalShow);
          this.monthModal(false);
        }}}>
          일별지출
        </button>

        <button name="btnMonth" onClick={e => {
          e.preventDefault();
          console.log(e.target.name);
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
  );
  }
}

export default MainPage;