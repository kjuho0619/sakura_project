import { Component } from "react";
import '../css/DayForReportViewModal.css'

class DayForReportViewModal extends Component{
    constructor(){
        super();
    }

    dayReset(ManagementForDay){
        var year = String(ManagementForDay.Date).substr(0,4);
        var month = Number(String(ManagementForDay.Date).substr(5,2))-1;
        var day = String(ManagementForDay.Date).substr(8,2);
        var yoil = new Date(year,month,day).getDay();
        var yoilText = '';

        if(yoil === 1){
            yoilText = "月";
        }else if(yoil === 2){
            yoilText = "火";
        }else if(yoil === 3){
            yoilText = "水";
        }else if(yoil === 4){
            yoilText = "木";
        }else if(yoil === 5){
            yoilText = "金";
        }else if(yoil === 6){
            yoilText = "土";
        }else if(yoil === 0){
            yoilText = "日";
        }

        if(yoil === 6){
            return(
                <div className="yoilText6-div">
                    {yoilText}
                </div>    
            );
        }else if(yoil === 0){
            return(
                <div className="yoilText0-div">
                    {yoilText}
                </div>
            );    
        }else{
            return(
                <div className="yoilText-div">
                    {yoilText}
                </div> 
            );   
        }
    }

    inOutColor(InOutCode){
        if(InOutCode === "収入"){
            return(
                <div className="ViewModal-income-value">{InOutCode}</div>
            );
        }else if(InOutCode === "支出"){
            return(
                <div className="ViewModal-expend-value">{InOutCode}</div>
            );
        }
        return;
    }

    _delete(id) {
        console.log(id);
        return fetch(`${this.props.databaseURL}/ManagementForDay/${id}.json`, {
           method: 'DELETE'
        }).then(res =>{
        if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(() => {
            this.props.isModalInOut();
            window.location.reload();
        })

    }

    handleDelete = (id) => {
        console.log(id);
        // if(window.confirm(id + "삭제하시겠습니까?")){
        //     this._delete(id);
        // }
        //this._delete(id);
    }

    render(){
        //console.log(this.props.selectKey);
        if(this.props.isModalOn === true){
            return(
                <div className="Modal-background">
                <div className="ViewModal-div">
                    <div className="ViewModal-Header-div">
                        <a class="material-icons" onClick={function(){
                            this.props.isModalInOut();
                        }.bind(this)}>
                            close
                        </a>
                    </div>
                    <div className="ViewModal-Middle-div">
                        {/* <div className="idcheck">{this.props.selectKey}::::</div>
                        <div className="idcheck2">{this.props.selectKey2}</div> */}
                        {/* 資産 */}
                        <div className="ViewModal-AssetsCode-title">資産</div>
                        <div className="ViewModal-AssetsCode-value">{this.props.selectInfo.AssetsCode}</div>
                        {/* 内容 */}
                        <div className="ViewModal-Content-title">内容</div>
                        <div className="ViewModal-Content-value">{this.props.selectInfo.Content}</div>
                        {/* 日時 */}
                        <div className="ViewModal-Date-title">日時</div>
                        <div className="ViewModal-Date-value">{this.props.selectInfo.Date}</div>
                        <div className="ViewModal-yoil-value">{this.dayReset(this.props.selectInfo)}</div>
                        {/* 詳細内容 */}
                        <div className="ViewModal-DetailContent-title">詳細内容</div>
                        <div className="ViewModal-DetailContent-value">{this.props.selectInfo.DetailContent}</div>
                        {/* 分類 */}
                        <div className="ViewModal-DivisionCode-title">分類</div>
                        <div className="ViewModal-DivisionCode-value">{this.props.selectInfo.DivisionCode}</div>
                        {/* 区分 */}
                        <div className="ViewModal-InOutCode-title">区分</div>
                        {this.inOutColor(this.props.selectInfo.InOutCode)}
                        {/* 金額 */}
                        <div className="ViewModal-Price-title">金額</div>
                        <div className="ViewModal-Price-value">{this.props.selectInfo.Price}円</div>
                        {/* <div>{this.props.selectInfo.UserID}</div> */}
                    </div>
                    <div className="ViewModal-Bottom-div">
                        <a className="ViewModal-Button ViewModal-updateButton" disabled='disabled' onClick={function(){
                            this.props.isModalInOut();
                        }.bind(this)}>修整</a>
                        <a className="ViewModal-Button ViewModal-deleteButton" disabled='disabled' onClick={function(){
                            this.handleDelete(this.props.selectKey);
                        }.bind(this)}>削除</a>
                        <a className="ViewModal-Button ViewModal-cancelButton" onClick={function(){
                            this.props.isModalInOut();
                        }.bind(this)}>キャンセル</a>
                    </div>
                </div>
                </div>
            );
        }else{
            return(
                <div className="ViewModal2-div">
                </div>
            );   
        }
    }
}

export default DayForReportViewModal;