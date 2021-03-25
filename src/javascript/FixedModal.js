import { Component } from "react";
// import '../css/FixedModal.css';
import '../css/Modal_1.css';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com";
// const databaseURL = "https://firebsae-practice-default-rtdb.firebaseio.com/";

class FixedModal  extends Component {
    constructor() {
        super();
        this.state = {
            ManagementForFixed: {},
            Dialog: false,
            UserID: 'user1',
            Content: '',
            DetailContent: '',
            Date: '',
            Price: '',
            InOutCode: '収入',
            DivisionCode: '',
            AssetsCode: '',
            id: '',
            InOutCodeCheck: 0
        };
    }
    _post(list) {
        return fetch(`${databaseURL}/ManagementForFixed.json`, {
            method: 'POST',
            body: JSON.stringify(list)
        }).then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.ManagementForFixed;
            nextState[data.name] = list;
            this.setState({ ManagementForFixed: nextState });
        });
    }

    _delete(id) {
        if(typeof(id) == "string") {
            return fetch(`${databaseURL}/ManagementForFixed/${id}.json`, {
                method: 'DELETE'
            }).then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(() => {
                window.location.reload();
            });
        } else if(typeof(id) == "object") {
            const key = id.target.name;

            return fetch(`${databaseURL}/ManagementForFixed/${key}.json`, {
                method: 'DELETE'
            }).then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(() => {
                window.location.reload();
            });
        }

    }

    handleDialogToggle = () => this.setState({
        Content: '',
        DetailContent: '',
        PaymentMonth: '選択',
        PaymentDay: '選択',
        Price: '',
        InOutCode: '収入',
        DivisionCode: '',
        AssetsCode: '',
        InOutCodeCheck : 0 
    })



    handleSubmit = (e) => {
        const word = {
            UserID: "user1",
            Content: this.state.Content,
            DetailContent: this.state.DetailContent,
            PaymentMonth: this.state.PaymentMonth,
            PaymentDay: this.state.PaymentDay,
            Price: this.state.Price,
            InOutCode: this.state.InOutCode,
            DivisionCode: this.state.DivisionCode,
            AssetsCode: this.state.AssetsCode
        }

        if (!word.UserID && !word.Content && !word.DetailContent && !word.PaymentMonth
            && !word.PaymentDay && !word.Price && !word.InOutCode
            && !word.DivisionCode && !word.AssetsCode) {
            return;
        } else if (word.InOutCode === '') {
            alert('収入又は支出をお選びください。');
            return;
        } else if (word.AssetsCode === '') {
            alert("資産をお選びください。");
            return;
        } else if (word.PaymentDay === '選択' && word.PaymentMonth === '選択') {
            alert("日付をお選びください。");
            return;
        } else if (word.DivisionCode === '') {
            alert("分類をお選びください。");
            return;
        } else {
            this.handleDialogToggle();
            this._post(word);
            alert("追加されました。");
        }
    }

    handleValueChange = (e) => {
        this.props.DataChangeHandler(e);
    }

    handleEdit = () => {

        const list = {
            Content: this.props.Content,
            DetailContent: this.props.DetailContent,
            PaymentMonth: this.props.PaymentMonth,
            PaymentDay: this.props.PaymentDay,
            Price: this.props.Price,
            InOutCode: this.props.InOutCode,
            DivisionCode: this.props.DivisionCode,
            AssetsCode: this.props.AssetsCode
        }

        if (window.confirm("修正しますか?")) {
            this._post(list);
            this._delete(this.props.indexKey);
            this.handleDialogToggle();
            this.props.FixedModalShow(false);
            return;
        } else {
            return;
        }
    }

    handleDelete = (id) => {
        this._delete(id);
    }


    clickAsset = (e) => {
        this.props.DataChangeHandler(e);
    }

    //clickIn이나 ClickOut을 누르면 분류 부분이 뜨게하는 
    clickInOut = (e) => {
        this.props.DataChangeHandler(e);
    }

    clickDivision = (e) => {
        this.props.DataChangeHandler(e);
    }

    
    render() {
        const clickDivision = this.clickDivision;

        let InOutChoice = '';
        if (this.props.InOutCode === "収入") {
            InOutChoice =
                <div aria-label="DivisionCode" name="DivisionCode" value={this.props.DivisionCode} onChange={this.handleValueChange}>
                    <button value="月給" name="DivisionCode" label="月給" onClick={clickDivision}>月給</button>
                    <button value="お小遣い" name="DivisionCode" label="お小遣い" onClick={clickDivision} >お小遣い</button>
                    <button value="ボーナス" name="DivisionCode" label="ボーナス" onClick={clickDivision} >ボーナス</button>
                    <button value="株式" name="DivisionCode" label="株式" onClick={clickDivision} >株式</button>
                    <br />
                    <button value="その他" name="DivisionCode" label="その他" onClick={clickDivision}>その他</button>
                    <br />
                    <br />
                </div>
        } else if (this.props.InOutCode === "支出") {
            InOutChoice =
                <div aria-label="DivisionCode" name="DivisionCode" value={this.props.DivisionCode} onChange={this.handleValueChange}>
                    <button value="食費" name="DivisionCode" label="食費" onClick={clickDivision} >食費</button>
                    <button value="交通" name="DivisionCode" label="交通" onClick={clickDivision} >交通</button>
                    <button value="文化" name="DivisionCode" label="文化" onClick={clickDivision} >文化</button>
                    <button value="洋服・美容" name="DivisionCode" label="洋服・美容" onClick={clickDivision} >洋服・美容</button>
                        <br />  
                    <button value="生活用品" name="DivisionCode" label="生活用品" onClick={clickDivision} >生活用品</button>
                    <button value="家賃" name="DivisionCode" label="家賃" onClick={clickDivision} >家賃</button>
                    <button value="健康" name="DivisionCode" label="健康" onClick={clickDivision} >健康</button>
                    <button value="光熱" name="DivisionCode" label="光熱" onClick={clickDivision} >光熱</button>
                        <br />
                    <button value="その他" name="DivisionCode" label="その他" onClick={clickDivision} >その他</button>
                        <br />
                        <br />
                </div>
        } else {
            InOutChoice = '';
        }

        let Day  = 
            <label>
                Day :
                <select name="PaymentDay" value={this.props.PaymentDay} onChange={this.handleValueChange}>
                    <option name="PaymentDay" value="選択">選択</option>
                    <option name="PaymentDay" value="1">1</option>
                    <option name="PaymentDay" value="2">2</option>
                    <option name="PaymentDay" value="3">3</option>
                    <option name="PaymentDay" value="4">4</option>
                    <option name="PaymentDay" value="5">5</option>
                    <option name="PaymentDay" value="6">6</option>
                    <option name="PaymentDay" value="7">7</option>
                    <option name="PaymentDay" value="8">8</option>
                    <option name="PaymentDay" value="9">9</option>
                    <option name="PaymentDay" value="10">10</option>
                    <option name="PaymentDay" value="11">11</option>
                    <option name="PaymentDay" value="12">12</option>
                    <option name="PaymentDay" value="13">13</option>
                    <option name="PaymentDay" value="14">14</option>
                    <option name="PaymentDay" value="15">15</option>
                    <option name="PaymentDay" value="16">16</option>
                    <option name="PaymentDay" value="17">17</option>
                    <option name="PaymentDay" value="18">18</option>
                    <option name="PaymentDay" value="19">19</option>
                    <option name="PaymentDay" value="20">20</option>
                    <option name="PaymentDay" value="21">21</option>
                    <option name="PaymentDay" value="22">22</option>
                    <option name="PaymentDay" value="23">23</option>
                    <option name="PaymentDay" value="24">24</option>
                    <option name="PaymentDay" value="25">25</option>
                    <option name="PaymentDay" value="26">26</option>
                    <option name="PaymentDay" value="27">27</option>
                    <option name="PaymentDay" value="28">28</option>
                    <option name="PaymentDay" value="29">29</option>
                    <option name="PaymentDay" value="30">30</option>
                    <option name="PaymentDay" value="31">31</option>
                </select>
            </label>
        let Month  =
                <label>
                    Month :
                    <select name="PaymentMonth" value={this.props.PaymentMonth} onChange={this.handleValueChange}>
                        <option name="PaymentMonth" value="選択">選択</option>
                        <option name="PaymentMonth" value="1">1</option>
                        <option name="PaymentMonth" value="2">2</option>
                        <option name="PaymentMonth" value="3">3</option>
                        <option name="PaymentMonth" value="4">4</option>
                        <option name="PaymentMonth" value="5">5</option>
                        <option name="PaymentMonth" value="6">6</option>
                        <option name="PaymentMonth" value="7">7</option>
                        <option name="PaymentMonth" value="8">8</option>
                        <option name="PaymentMonth" value="9">9</option>
                        <option name="PaymentMonth" value="10">10</option>
                        <option name="PaymentMonth" value="11">11</option>
                        <option name="PaymentMonth" value="12">12</option>
                    </select>
                </label>

        let ButtonChoice = 
            <div>
                <button variant="contained" color="primary" onClick={this.handleEdit}>修正</button>
                <button variant="outlined" name={this.props.indexKey} color="primary" onClick={this._delete}>削除</button>
            </div>

        if (!this.props.flag) {
            return (
                <div className="modal-hidden">
                    There isn't Any Data
                </div>
            )
        } else {
            return (
                <div className="modal-frame">
                    <div className="cloase-btn">
                        <a href="" onClick={function (e) {
                            e.preventDefault();
                            this.props.FixedModalShow(false);
                        }.bind(this)}>
                            <span className="material-icons">cancel_presentation</span>
                        </a>
                    </div>
                    <div className="btn-group" name="InOutCode" value={this.props.AssetsCode} onChange={this.handleValueChange}>
                        <input disabled type="text" placeholder="収入・支出" lable="収入・支出" name="InOutCode" value={this.props.InOutCode} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        <button value="収入" name="InOutCode" onClick={this.clickInOut}>収入</button>
                        <button value="支出" name="InOutCode" onClick={this.clickInOut}>支出</button>
                    </div>
                            <br />
                    <div className="btn-group" name="AssetsCode" value={this.props.AssetsCode} onChange={this.handleValueChange}>
                        <input disabled type="text" placeholder="資産" lable="資産" name="AssetsCode" value={this.props.AssetsCode} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        <button value="現金" name="AssetsCode" onClick={this.clickAsset}>現金</button>
                        <button value="カード" name="AssetsCode" onClick={this.clickAsset}>カード</button>
                        <button value="銀行" name="AssetsCode" onClick={this.clickAsset}>銀行</button>
                    </div>
                            <br />
                        {Month}
                            <br />
                            <br />
                        {Day}
                            <br />
                    <div className="btn-group" name="DivisionCode" vlaue={this.props.DivisionCode} onChange={this.handleValueChange}>
                            <br />
                        <input disabled type="text" placeholder="分類" lable="分類" name="DivisionCode" value={this.props.DivisionCode} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        {InOutChoice}
                    </div>
                        <input type="number" placeholder="金額 : 0 " value="金額" name="Price" value={this.props.Price} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        <input type="text" placeholder="内容" value="内容" name="Content" value={this.props.Content} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        <input type="text" placeholder="詳細内容" value="詳細内容" name="DetailContent" value={this.props.DetailContent} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        {ButtonChoice}
                </div>
            )
        }
    }

}

export default FixedModal