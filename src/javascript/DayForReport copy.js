import React, { Component } from 'react';
import '../css/DayForReport.css'
import DayForReportViewModal from './DayForReportViewModal'

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

class DayForReportList extends Component{
    constructor(){
        super();
        this.state = {
            listDate : "",  //list의 현재 날짜
            flag:true,  //날자 중복
            index: -1
        };
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

    yoilDiv(yoilText){
        if(yoilText === "日曜日"){
            return (
                <div className="Title-yoil0-div">{yoilText}</div>
            );
        }else if(yoilText === "土曜日"){
            return (
                <div className="Title-yoil6-div">{yoilText}</div>
            );
        }else{
            return (
                <div className="Title-yoil-div">{yoilText}</div>
            );
        }
    }

    titleDayIncome(triger){
        if(triger === "total"){
            return(
                <div className="Title-dayIncome-div">収入:{this.numberFormat(this.props.DayIncomeList[this.state.index])}円</div>
            );
        }else if(triger === "income"){
            return(
                <div className="Title-dayIncome2-div">収入:{this.numberFormat(this.props.DayIncomeList[this.state.index])}円</div>
            );
        }
        return;
    }

    titleDayExpend(triger){
        if(triger === "total"){
            return(
                <div className="Title-dayExpend-div">支出:{this.numberFormat(this.props.DayExpendList[this.state.index])}円</div>
            );
        }else if(triger === "expend"){
            return(
                <div className="Title-dayExpend2-div">支出:{this.numberFormat(this.props.DayExpendList[this.state.index])}円</div>
            );
        }
        return;
    }

    TitleDateDiv(ManagementForDay){
        if(this.state.listDate === ManagementForDay.Date){
            this.state.flag = false;
        }else if(this.state.listDate !== ManagementForDay.Date){
            this.state.listDate = ManagementForDay.Date;
            this.state.flag = true;
        }

        var year = String(ManagementForDay.Date).substr(0,4);
        var month = Number(String(ManagementForDay.Date).substr(6,1))-1;
        var day = String(ManagementForDay.Date).substr(8,2);
        var yoil = new Date(year,month,day).getDay();
        var yoilText = '';

        if(yoil === 1){
            yoilText = "月曜日";
        }else if(yoil === 2){
            yoilText = "火曜日";
        }else if(yoil === 3){
            yoilText = "水曜日";
        }else if(yoil === 4){
            yoilText = "木曜日";
        }else if(yoil === 5){
            yoilText = "金曜日";
        }else if(yoil === 6){
            yoilText = "土曜日";
        }else if(yoil === 0){
            yoilText = "日曜日";
        }

        if(this.state.flag === true){
            this.state.index += 1;
            var triger = this.props.triger;
            return(
                <div className="Title-date-div">
                    <div className="Title-year-div">{year}.</div>
                    <div className="Title-month-div">{month + 1}.</div>
                    <div className="Title-day-div">{day}日</div>
                    {this.titleDayIncome(triger)}
                    {this.titleDayExpend(triger)}
                    {this.yoilDiv(yoilText)}
                </div>
            );
        }
    }

    dayReset(){
        this.state.listDate = "";
    }

    render(){
        this.state.index = -1;
        return(    
            <div className="dayForReport-bottom-div">
            {Object.keys(this.props.IdCheck).map(id => {
                const ManagementForDay = this.props.IdCheck[id];
                
                return(
                    <div className="ManagementForDay-div">
                        {this.TitleDateDiv(ManagementForDay)}

                        <div className="ManagementForDay-view-div" key={id} onClick={function(ev){
                            this.props.isModalInOut();
                            this.props.selectKey(id);
                            this.props.selectInfo(ManagementForDay);
                        }.bind(this)}>
                            <div className="AssetsCode-div">
                                {ManagementForDay.AssetsCode}
                            </div>  
                            <div className="DivisionCode-div">
                                {ManagementForDay.DivisionCode}
                            </div>
                            
                            {this.inoutColorDiv(ManagementForDay.InOutCode)}           
                            
                            {this.priceColorDiv(ManagementForDay.InOutCode, ManagementForDay.Price)}  

                            <div className="Content-div">
                                {ManagementForDay.Content}
                            </div>
                        </div>
                    </div>
                );
            })}   
            {this.dayReset()}
        </div>
        );
    }
}
class DayForReport extends Component{
    constructor(){
        super();
        this.state = {
            ManagementForDay:{}, //파이어베이스
            IdCheck:{},//id체크, 년도, 월체크, 일
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
            day:'',  // 요일
            monthLastDay:'', //마지막 날짜
            lastIndex:0,//배열 index
            triger:'total',//수입,지출,전체 구분 트리거
            listDate : "",  //list의 현재 날짜
            DayIncome:0,//일수입
            DayExpend:0, //일지출
            DayIncomeList:[],//일별 수익 배역
            DayExpendList:[],//일별 지출 배열
            index: -1,
            valueCount:0,
            isModalOn:false,
            selectKey:'',
            selectInfo:''
        };
    }

    getMonthLastDay(year, month){
        let monthLastDay = new Date(year,month,0).getDate();

        this.state.monthLastDay = monthLastDay;

        return monthLastDay;
    }

    DayIncomeExpend(data, dayCut){
        if(this.state.listDate !== dayCut){
            this.state.listDate = dayCut;
            this.state.DayIncomeList[this.state.index] = this.state.DayIncome;
            this.state.DayExpendList[this.state.index] = this.state.DayExpend;
            this.state.index += 1;
            this.state.DayIncome = 0;
            this.state.DayExpend = 0;
        }
        
        if(data.InOutCode === '収入'){
            this.state.DayIncome += data.Price;
        }else if(data.InOutCode === '支出'){
            this.state.DayExpend += data.Price;
        }
    }

    LastDayIncomeExpend(triger){
        if(triger === 'total'){
            this.state.DayIncomeList[this.state.index] = this.state.DayIncome;
            this.state.DayExpendList[this.state.index] = this.state.DayExpend;
            this.state.index = -1;
        }else if(triger === 'income'){
            this.state.DayIncomeList[this.state.index] = this.state.DayIncome;
            this.state.DayExpendList[this.state.index] = 0;
            this.state.index = -1;
        }else if(triger === 'expend'){
            this.state.DayIncomeList[this.state.index] = 0;
            this.state.DayExpendList[this.state.index] = this.state.DayExpend;
            this.state.index = -1;
        }
    }

    checkID(year, month, triger){

        this.state.IdCheck = {};//리스트 초기화
        this.state.listDate = "";
        var index = 0;

        var key = Object.keys(this.state.ManagementForDay);

        for(var i = 0; i< this.state.valueCount; i++){
            
            var data = this.state.ManagementForDay[key[i]];
            
            var yearCut = String(data.Date).substr(0,4);

            var monthCut = String(data.Date).substr(6,1);

            if(data.UserID === this.props.sessionUser){
                if(yearCut === String(year)){
                    if(monthCut === String(month)){

                        if(triger === 'total'){
                            var dayCut = String(data.Date).substr(8,2);

                            this.DayIncomeExpend(data, dayCut);
                            
                            this.state.IdCheck[key[i]] = data;
                            this.state.lastIndex = index;
                            index += 1;
                        }else if(triger === 'income'){
                            if(data.InOutCode === '収入'){
                                var dayCut = String(data.Date).substr(8,2);
                                
                                this.DayIncomeExpend(data, dayCut);

                                this.state.IdCheck[key[i]] = data;
                                this.state.lastIndex = index;
                                index += 1;
                            }
                        }else if(triger === 'expend'){
                            if(data.InOutCode === '支出'){
                                var dayCut = String(data.Date).substr(8,2);
                                
                                this.DayIncomeExpend(data, dayCut);

                                this.state.IdCheck[key[i]] = data;
                                this.state.lastIndex = index;
                                index += 1;
                            }
                        }

                        if(data.InOutCode === '収入'){
                            this.state.TotalIncome += data.Price;
                        }else if(data.InOutCode === '支出'){
                            this.state.TotalExpend += data.Price;
                        }

                    }
                }
            }
        }

        this.LastDayIncomeExpend(triger);

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
            var key = Object.keys(ManagementForDay);

            console.log(ManagementForDay);

            var valueCount = Object.keys(ManagementForDay).length;
            
            for(var i = 0 ; i < valueCount -1 ; i++){
                for(var j = (i+1) ; j< valueCount ; j++){
                    if(Date.parse(ManagementForDay[key[i]].Date) > Date.parse(ManagementForDay[key[j]].Date)){
                        var temp = ManagementForDay[key[i]];
                        ManagementForDay[key[i]] = ManagementForDay[key[j]];
                        ManagementForDay[key[j]] = temp;
                    }
                }
            }

            this.state.valueCount = valueCount;

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

    valueSetting(){
        this.state.TotalIncome = 0;
        this.state.TotalExpend = 0;
        this.state.Total = 0;
    }
    
    isModalInOut = () => {
        this.setState({isModalOn:!this.state.isModalOn});
    }

    dayForReportList(){
        return(
            <DayForReportList 
                selectInfo = {this.selectInfo}
                selectKey = {this.selectKey}
                isModalInOut={this.isModalInOut} 
                triger = {this.state.triger} 
                DayIncomeList = {this.state.DayIncomeList} 
                DayExpendList={this.state.DayExpendList} 
                lastIndex={this.state.lastIndex} 
                IdCheck={this.state.IdCheck} 
                month={this.state.month}/>
        );
    }

    valueReset(){
        this.state.listDate = "";  //list의 현재 날짜
        this.state.DayIncome=0;//일수입
        this.state.DayExpend=0; //일지출
        this.state.DayIncomeList=[];//일별 수익 배역
        this.state.DayExpendList=[];//일별 지출 배열
    }

    valueView(){
        this.valueReset();
        this.state.IdCheck = {};
        this.checkID(this.state.year, this.state.month, this.state.triger);
        this.dayForReportList();
    }

    selectKey = (data) =>{
        //console.log(data);
        this.setState({selectKey:data});
    }

    selectInfo = (data) =>{
        //console.log(data);
        this.setState({selectInfo:data});
    }

    deleteIdCheckList = (data) =>{
        //this.valueView();
        console.log(data);
        //this.setState({checkId:data});
        //window.location.reload('DayForReport');
        //this.props.parentFunction('DayForReport');
    }

    render(){
        this.valueSetting();

        this.checkID(this.state.year, this.state.month, this.state.triger);
        
        let TotalIncome = this.numberFormat(this.state.TotalIncome);
        let TotalExpend = this.numberFormat(this.state.TotalExpend);
        let Total = this.numberFormat(this.state.Total);

        return(
            <div className="dayForReport-Main">
            <div className="dayForReport-page">
                <div className="dayForReport-top-div">
                    <div className="month-div">
                        <div className="month-left-div">
                            <a class="material-icons" onClick={function(){
                                this.valueReset();
                                var cMonth = this.state.month - 1;
                                var cYear = this.state.year - 1;
                                this.setState({triger:'total'});
                                if(cMonth === 0){
                                    this.setState({year:cYear});
                                    this.setState({month:12});
                                }else{
                                    this.setState({month:cMonth});
                                }
                            }.bind(this)}>
                                keyboard_arrow_left
                            </a>
                        </div>
                        <div className="month-title-div">
                            {this.state.year}年{this.state.month}月
                        </div>
                        <div className="month-right-div">
                            <a class="material-icons" onClick={function(){
                                this.valueReset();
                                var cMonth = this.state.month + 1;
                                var cYear = this.state.year + 1;
                                this.setState({triger:'total'});
                                if(cMonth === 13){
                                    this.setState({year:cYear});
                                    this.setState({month:1});  
                                }else{
                                    this.setState({month:cMonth});
                                }
                            }.bind(this)}>
                                keyboard_arrow_right
                            </a>
                        </div>
                    </div>
                    <div className="total-div">
                        <div className="income-div" onClick={function(){
                            this.setState({triger:'income'});
                            this.valueView();
                        }.bind(this)}>
                            <div className="imcome-title">収入</div>
                            <div className="imcome-value">{TotalIncome}円</div>
                        </div>
                        <div className="expend-div" onClick={function(){
                            this.setState({triger:'expend'});
                            this.valueView();
                        }.bind(this)}>
                            <div className="expend-title">支出</div>
                            <div className="expend-value">{TotalExpend}円</div>
                        </div>
                        <div className="totalvalue-div"  onClick={function(){
                            this.setState({triger:'total'});
                            this.valueView();
                        }.bind(this)}>
                            <div className="totalvalue-title">合計</div>
                            <div className="totalvalue-value">{Total}円</div>
                        </div>
                    </div>
                </div>
                {this.dayForReportList()}
            </div>
            <DayForReportViewModal
                isModalOn = {this.state.isModalOn}
                isModalInOut = {this.isModalInOut}
                selectKey = {this.state.selectKey}
                selectInfo = {this.state.selectInfo}
                databaseURL = {this.props.databaseURL}
                IdCheckList = {this.state.IdCheck}
                deleteIdCheckList = {this.deleteIdCheckList}
            /> 
            </div>
        );
    }
}

export default DayForReport;