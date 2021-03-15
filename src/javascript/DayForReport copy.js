import React, { Component } from 'react';
import '../css/DayForReport.css'

class InOutIncomeColor extends Component{
    render(){
        return(
            <div className="IncomeInOutCode-div">
                {this.props.inOutCode}
            </div>
        );
    }
}

class InOutExpendColor extends Component{
    render(){
        return(
            <div className="ExpendInOutCode-div">
                {this.props.inOutCode}
            </div>
        );
    }
}

class PriceIncomeColor extends Component{
    numberFormat(inputNumber) {
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render(){
        return(
            <div className="ImcomePrice-div">
                {this.numberFormat(this.props.price)}円
            </div>
        );
    }
}

class PriceExpendColor extends Component{
    numberFormat(inputNumber) {
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render(){
        return(
            <div className="ExpendPrice-div">
                {this.numberFormat(this.props.price)}円
            </div>
        );
    }
}

class DayForReport extends Component{
    constructor(){
        super();
        this.state = {
            ManagementForDay:{},
            IdCheck:{},
            UserID:'',//ID
            AssestsCode:'',//자산코드
            DivisionCode:'',//분류코드
            InOutCode:'',//수입지출구분코드(수입:1,지출:2)
            Date:'',//날짜
            Price:'',//금액
            Content:'',//내용
            DetailContent:'',//상세내용
            TotalIncome:0,//총수입
            TotalExpend:0,//총지출
            Total:0,//수입지출 총합
            today:'',//오늘날짜
            year:'', // 년도
            month:'',  // 월
            date:'',  // 날짜
            day:''  // 요일
        };
    }
    checkID(month){
        for(var i = 0; i< this.state.ManagementForDay.length; i++){
            var data = this.state.ManagementForDay[i];
            
            var monthCut = String(data.Date).substr(6,1);

            // console.log(monthCut);

            if(data.UserID === 'master'){
                if(monthCut === String(month)){
                    if(data.InOutCode === '収入'){
                        this.state.TotalIncome += data.Price;
                    }else if(data.InOutCode === '支出'){
                        this.state.TotalExpend += data.Price;
                    }
                    this.state.IdCheck[i] = data;
                }
            }
        }
        this.totalValue();
    }
    _get(){
        fetch(`${this.props.databaseURL}/ManagementForDay.json`).then(res => {  
         if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then((ManagementForDay) => {
            this.timeSetting();
            this.setState({ManagementForDay: ManagementForDay});
        });
    }

    totalValue(){
        this.state.Total = this.state.TotalIncome - this.state.TotalExpend;
    }

    componentDidMount(){
        this._get();
    }
    
    numberFormat(inputNumber) {
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    priceColorDiv(inOutCode, price){
        if(inOutCode === "収入"){
            return <PriceIncomeColor inOutCode = {inOutCode} price = {price}></PriceIncomeColor>
        }else if(inOutCode === "支出"){
            return <PriceExpendColor inOutCode = {inOutCode} price = {price}></PriceExpendColor>
        }

    }

    inoutColorDiv(inOutCode){
        if(inOutCode === "収入"){
            return <InOutIncomeColor inOutCode = {inOutCode}></InOutIncomeColor>
        }else if(inOutCode === "支出"){
            return <InOutExpendColor inOutCode = {inOutCode}></InOutExpendColor>
        }
    }
    
    timeSetting(){
        let today = new Date();//오늘날짜
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let date = today.getDate();  // 날짜
        let day = today.getDay();  // 요일

        this.state.today = today;
        this.state.year = year;
        this.state.month = month;
        this.state.date = date;
        this.state.day = day;
    }

    changeBackMonth = () =>{
        var cMonth = this.state.month-1;
        this.setState({month:cMonth});
    }
    
    changeProvMonth = () =>{
        var cMonth = this.state.month+1;
        this.setState({month:cMonth});
    }
    
    valueSetting(){
        this.state.TotalIncome = 0;
        this.state.TotalExpend = 0;
        this.state.Total = 0;
    }

    render(){
        this.valueSetting();
        this.checkID(this.state.month);
        // console.log("today : " + this.state.today);
        // console.log("year : " + this.state.year);
        // console.log("month : " + this.state.month);
        // console.log("date : " + this.state.date);
        // console.log("day : " + this.state.day);

        // console.log("TotalIncome : " + this.state.TotalIncome);
        // console.log("TotalExpend : " + this.state.TotalExpend);
        // console.log("Total : " + this.state.Total);

        let TotalIncome = this.numberFormat(this.state.TotalIncome);
        let TotalExpend = this.numberFormat(this.state.TotalExpend);
        let Total = this.numberFormat(this.state.Total);

        //console.log(this.state.IdCheck);
        return(
            <div className="dayForReport-page">
                <div className="dayForReport-top-div">
                    <div className="month-div">
                        <div className="month-left-div">
                            <a class="material-icons" onClick={this.changeBackMonth}>
                                keyboard_arrow_left
                            </a>
                        </div>
                        <div className="month-title-div">
                            {this.state.year}年{this.state.month}月
                        </div>
                        <div className="month-right-div">
                            <a class="material-icons" onClick={this.changeProvMonth}>
                                keyboard_arrow_right
                            </a>
                        </div>
                    </div>
                    <div className="total-div">
                        <div className="income-div">
                            <div className="imcome-title">収入</div>
                            <div className="imcome-value">{TotalIncome}円</div>
                        </div>
                        <div className="expend-div">
                            <div className="expend-title">支出</div>
                            <div className="expend-value">{TotalExpend}円</div>
                        </div>
                        <div className="totalvalue-div">
                            <div className="totalvalue-title">合計</div>
                            <div className="totalvalue-value">{Total}円</div>
                        </div>
                    </div>
                </div>
                
                <div className="dayForReport-bottom-div">
                    {Object.keys(this.state.IdCheck).map(id => {
                        const ManagementForDay = this.state.IdCheck[id];
                        return(
                            <div className="ManagementForDay-view-div" key={id}>
                                <div className="AssestsCode-div">
                                    {ManagementForDay.AssestsCode}
                                </div>  
                                <div className="DivisionCode-div">
                                    {ManagementForDay.DivisionCode}
                                </div>  
                                <div className="Date-div">
                                    {ManagementForDay.Date}
                                </div>  
                                {this.inoutColorDiv(ManagementForDay.InOutCode)}
                                {/* <div className="InOutCode-div">
                                    {ManagementForDay.InOutCode}
                                </div>   */}                               
                                
                                {this.priceColorDiv(ManagementForDay.InOutCode, ManagementForDay.Price)}  
                                {/* <div className="Price-div">
                                    {this.numberFormat(ManagementForDay.Price)}円
                                </div>   */}
                                <div className="Content-div">
                                    {ManagementForDay.Content}
                                </div>
                            </div>
                        );
                    })}   
                </div>
            </div>
        );
    }
}

export default DayForReport;