import { Component } from "react";
import '../css/Modal_1.css';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com";
// const databaseURL = "https://firebsae-practice-default-rtdb.firebaseio.com/";

class ModalCopy extends Component {
    constructor() {
        super();
        this.state = {
            ManagementForDay: {},
            UserID: 'master',
            Content: '',
            DetailContent: '',
            Date: '',
            Price: '',
            InOutCode: '収入',
            DivisionCode: '',
            AssetsCode: '',
            id: ''
        };
    }
    _post(list) {
        return fetch(`${databaseURL}/ManagementForDay.json`, {
            method: 'POST',
            body: JSON.stringify(list)
        }).then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.ManagementForDay;
            nextState[data.name] = list;
            this.setState({ ManagementForDay: nextState });
        });
    }


    handleSubmit = (e) => {
        const list = {
            UserID: "master",
            Content: this.state.Content,
            DetailContent: this.state.DetailContent,
            Date: this.state.Date,
            Price: Number(this.state.Price),
            InOutCode: this.state.InOutCode,
            DivisionCode: this.state.DivisionCode,
            AssetsCode: this.state.AssetsCode
        }

        if (!list.UserID && !list.Content && !list.DetailContent &&
            !list.Date && !list.Price && !list.InOutCode
            && !list.DivisionCode && !list.AssetsCode) {
            return;
        } else if (list.InOutCode === '') {
            alert('収入又は支出をお選びください。');
            return;
        } else if (list.Date === '') {
            alert("日付をお選びください。");
            return;
        } else if (list.AssetsCode === '') {
            alert("資産をお選びください。");
            return;
        } else if (list.DivisionCode === '') {
            alert("分類をお選びください。");
            return;
        } else {
            this.handleDialogToggle();
            this._post(list);
            alert("追加されました。");
            window.location.reload();
        }
    }

    handleDialogToggle = () => this.setState({
        Content: '',
        DetailContent: '',
        Price: '',
        InOutCode: '収入',
        DivisionCode: '',
        AssetsCode: '',
        Date: ''

    })
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    clickAsset = (e) => {
        this.setState({
            AssetsCode: e.target.value
        });
    }

    clickInOut = (e) => {
        this.setState({
            InOutCode: e.target.value,
            DivisionCode: '',
            AssetsCode: ''
        });
    }
    clickDivision = (e) => {
        this.setState({
            DivisionCode: e.target.value
        });
    }
    render() {
        const clickDivision = this.clickDivision;

        let InOutChoice = '';
        if (this.state.InOutCode === "収入") {
            InOutChoice =
                <div aria-label="DivisionCode" name="DivisionCode" value={this.state.DivisionCode} onChange={this.handleValueChange}>
                    <button value="月給" label="月給" onClick={clickDivision}>月給</button>
                    <button value="お小遣い" label="お小遣い" onClick={clickDivision} >お小遣い</button>
                    <button value="ボーナス" label="ボーナス" onClick={clickDivision} >ボーナス</button>
                    <button value="株式" label="株式" onClick={clickDivision} >株式</button>
                    <br />
                    <button value="その他" label="その他" onClick={clickDivision}>その他</button>
                    <br />
                    <br />
                </div>
        } else if (this.state.InOutCode === "支出") {
            InOutChoice =
                <div aria-label="DivisionCode" name="DivisionCode" value={this.state.DivisionCode} onChange={this.handleValueChange}>
                    <button value="食費" label="食費" onClick={clickDivision} >食費</button>
                    <button value="交通" label="交通" onClick={clickDivision} >交通</button>
                    <button value="文化" label="文化" onClick={clickDivision} >文化</button>
                    <button value="洋服・美容" label="洋服・美容" onClick={clickDivision} >洋服・美容</button>
                        <br />
                    <button value="生活用品" label="生活用品" onClick={clickDivision} >生活用品</button>
                    <button value="家賃" label="家賃" onClick={clickDivision} >家賃</button>
                    <button value="健康" label="健康" onClick={clickDivision} >健康</button>
                    <button value="光熱" label="光熱" onClick={clickDivision} >光熱</button>
                        <br />
                    <button value="その他" label="その他" onClick={clickDivision} >その他</button>
                    <br />
                    <br />
                </div>
        } else {
            InOutChoice = '';
        }

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
                            this.props.modalShow(false);

                        }.bind(this)}>
                            <span className="material-icons">cancel_presentation</span>
                        </a>
                    </div>

                        <input disabled type="text" placeholder="収入・支出" lable="収入・支出" name="InOutCode" value={this.state.InOutCode} onChange={this.handleValueChange} />
                    <div className="btn-group1" name="InOutCode" value={this.state.AssetsCode} onChange={this.handleValueChange}>
                            <br />
                            <br />
                        <button value="収入" id="In" name="InOutCode" onClick={this.clickInOut}>収入</button>
                        <button value="支出" id="Out" name="InOutCode" onClick={this.clickInOut}>支出</button>
                    </div>
                            <br />
                        <input type="Date" name="Date" value={this.state.Date} onChange={this.handleValueChange} />
                            <br />
                            <br />
                    <div className="btn-group" name="AssetCode" value={this.state.AssetsCode} onChange={this.handleValueChange}>
                        <input disabled type="text" placeholder="資産" lable="資産" name="AssetCode" value={this.state.AssetsCode} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        <button value="現金" name="AssetCode" onClick={this.clickAsset}>現金</button>
                        <button value="カード" name="AssetCode" onClick={this.clickAsset}>カード</button>
                        <button value="銀行" name="AssetCode" onClick={this.clickAsset}>銀行</button>
                    </div>
                    <div className="btn-group" name="DivisionCode" vlaue={this.state.DivisionCode} onChange={this.handleValueChange}>
                            <br />
                        <input disabled type="text" placeholder="分類" lable="分類" name="DivisionCode" value={this.state.DivisionCode} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        {InOutChoice}
                    </div>
                        <input type="number" placeholder="金額 : 0 " value="金額" name="Price" value={this.state.Price} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        <input type="text" placeholder="内容" value="内容" name="Content" value={this.state.Content} onChange={this.handleValueChange} />
                            <br />
                            <br />
                        <input type="text" placeholder="詳細内容" value="詳細内容" name="DetailContent" value={this.state.DetailContent} onChange={this.handleValueChange} />
                            <br />
                            <br />
                            <br />
                        <button onClick={this.handleSubmit}>追加</button>
                        <button onClick="">やめる</button>
                    
                </div>
            )
        }
    }

}

export default ModalCopy