import { Component } from "react";
import '../css/Modal_1.css';

// const databaseURL = "https://word-cloud-1c0dd-default-rtdb.firebaseio.com/";
 const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";
// const databaseURL = "https://firebsae-practice-default-rtdb.firebaseio.com/";

class Modal extends Component {
    constructor() {
        super();
        this.state = {
            ManagementForDay: {},
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
        return fetch(`${databaseURL}/ManagementForDay.json`, {
            method: 'POST',
            body: JSON.stringify(list)
        }).then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            console.log(data);
            let nextState = this.state.ManagementForDay;
            nextState[data.name] = list;
            this.setState({ ManagementForDay: nextState });
        });
    }

    _delete(id) {
        
        if(typeof(id) == "string") {

            return fetch(`${databaseURL}/ManagementForDay/${id}.json`, {
                method: 'DELETE'
            }).then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(() => {
                window.location.reload();
            });
            
        } else if (typeof(id) === "object") {
            const keyIndex = id.target.name;
            
            return fetch(`${databaseURL}/ManagementForDay/${keyIndex}.json`, {
                method: 'DELETE'
            }).then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then(() => {

                window.location.reload();
                // console.log(this.props.managementForDay);

                // let nextState = this.props.managementForDay;
                // delete nextState[keyIndex];
                // this.setState({ ManagementForDay: nextState });
            });
        }

    }

    handleSubmit = (e) => {
        const list = {
            UserID: "user1",
            Content: this.props.Content,
            DetailContent: this.props.DetailContent,
            Date: this.props.modalDate,
            Price: Number(this.props.Price),
            InOutCode: this.props.InOutCode,
            DivisionCode: this.props.DivisionCode,
            AssetsCode: this.props.AssetsCode
        }

        if (!list.UserID && !list.Content && !list.DetailContent &&
            !list.Date && !list.Price && !list.InOutCode
            && !list.DivisionCode && !list.AssetsCode) {
            return;
        } else if (list.InOutCode === '') {
            alert('収入又は支出をお選びください。');
            return;
        }
        else if (list.Date === '') {
            alert("日付をお選びください。");
            return;
        }
        else if (list.AssetsCode === '') {
            alert("資産をお選びください。");
            return;
        } else if (list.DivisionCode === '') {
            alert("分類をお選びください。");
            return;
        } else {
            this.props.modalShow(false);
            this._post(list);
            alert("추가되었습니다");
        }
    }

    handleDialogToggle = () => this.setState({
        Content: '',
        DetailContent: '',
        Price: 0,
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

    DataChangeHandler = (e) => {
        this.props.DataChangeHandler(e);
    }

    handleEdit = () => {

        const list = {
            Content: this.props.Content,
            DetailContent: this.props.DetailContent,
            Price: Number(this.props.Price),
            InOutCode: this.props.InOutCode,
            DivisionCode: this.props.DivisionCode,
            AssetsCode: this.props.AssetsCode,
            Date: this.props.modalDate
        }

        if (window.confirm("修正しますか?")) {
            this._post(list);
            this._delete(this.props.indexKey);
            this.handleDialogToggle();
            this.props.modalShow(false);
            return;
        } else {
            return;
        }

    }

    clickAsset = (e) => {
        // this.setState({
        //     AssetsCode: e.target.value
        // });

        this.DataChangeHandler(e);
    }
    
    //clickIn이나 ClickOut을 누르면 분류 부분이 뜨게하는 
    clickInOut = (e) => {
        this.props.DataChangeHandler(e);
    }

    clickDivision = (e) => {
        this.DataChangeHandler(e);
    }

    render() {
        const clickDivision = this.clickDivision;

        let InOutChoice = '';
        if (this.state.InOutCode === "収入") {
            InOutChoice =
                <div aria-label="DivisionCode" name="DivisionCode" value={this.props.DivisionCode} onChange={this.DataChangeHandler}>
                    <button value="月給" name="DivisionCode" label="月給" onClick={clickDivision}>月給</button>
                    <button value="お小遣い" name="DivisionCode" label="お小遣い" onClick={clickDivision} >お小遣い</button>
                    <button value="ボーナス" name="DivisionCode" label="ボーナス" onClick={clickDivision} >ボーナス</button>
                    <button value="株式" name="DivisionCode" label="株式" onClick={clickDivision} >株式</button>
                    <br/>
                    <button value="その他" name="DivisionCode" label="その他" onClick={clickDivision}>その他</button>
                    <br/>
                    <br/>
                </div>
        } else if (this.state.InOutCode === "支出") {
            InOutChoice =
                <div aria-label="DivisionCode" name="DivisionCode" value={this.props.DivisionCode} onChange={this.DataChangeHandler}>
                    <button value="食費" name="DivisionCode" label="食費" onClick={clickDivision} >食費</button>
                    <button value="交通" name="DivisionCode" label="交通" onClick={clickDivision} >交通</button>
                    <button value="文化" name="DivisionCode" label="文化" onClick={clickDivision} >文化</button>
                    <button value="洋服・美容" name="DivisionCode" label="洋服・美容" onClick={clickDivision} >洋服・美容</button>
                    <br/>
                    <button value="生活用品" name="DivisionCode" label="生活用品" onClick={clickDivision} >生活用品</button>
                    <button value="家賃" name="DivisionCode" label="家賃" onClick={clickDivision} >家賃</button>
                    <button value="健康" name="DivisionCode" label="健康" onClick={clickDivision} >健康</button>
                    <button value="光熱" name="DivisionCode" label="光熱" onClick={clickDivision} >光熱</button>
                    <br/>
                    <button value="その他" name="DivisionCode" label="その他" onClick={clickDivision} >その他</button>
                    <br/>
                    <br/>
                </div>
        } else {
            InOutChoice = '';
        }

        let ButtonChoice =
            <div>
                <button variant="contained" name={this.props.indexKey} color="primary" onClick={this.handleEdit}>修正</button>
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
                <div className="modal-main-frame">

                    <div className="modal-frame">
                        {/* {this.settingStates(this.props.data[this.props.indexKey])} */}
                        <div className="cloase-btn">
                            <a href="" onClick={function (e) {
                                e.preventDefault();
                                this.props.modalShow(false);
                            }.bind(this)}>
                                <span className="material-icons">cancel_presentation</span>
                            </a>
                        </div>
                        <div className="btn-group" name="InOutCode" value={this.props.InOutCode} onChange={this.DataChangeHandler}>
                            <input disabled type="text" placeholder="収入・支出" lable="収入・支出" name="InOutCode" value={this.props.InOutCode} onChange={this.DataChangeHandler} />
                            <br />
                            <br />
                            <button value="収入" name="InOutCode" onClick={this.clickInOut}>収入</button>
                            <button value="支出" name="InOutCode" onClick={this.clickInOut}>支出</button>
                        </div>
                        <br />
                        <input type="Date" name="Date" value={this.props.modalDate} onChange={this.dateChangeTest} />
                        <br />
                        <br />
                        <div className="btn-group" name="AssetsCode" value={this.props.AssetsCode} onChange={this.DataChangeHandler}>
                            <input disabled type="text" placeholder={this.props.AssetsCode} lable="資産" name="AssetsCode" value={this.props.AssetsCode} onChange={this.DataChangeHandler} />
                            <br />
                            <br />
                            <button value="現金" name="AssetsCode" onClick={this.clickAsset}>現金</button>
                            <button value="カード" name="AssetsCode" onClick={this.clickAsset}>カード</button>
                            <button value="銀行" name="AssetsCode" onClick={this.clickAsset}>銀行</button>
                        </div>
                        <div className="btn-group" name="DivisionCode" vlaue={this.props.DivisionCode} onChange={this.DataChangeHandler}>
                            <br />
                            <input disabled type="text" placeholder="分類" lable="分類" name="DivisionCode" value={this.props.DivisionCode} onChange={this.DataChangeHandler} />
                            <br />
                            <br />
                            {InOutChoice}
                        </div>
                        {/* <input type="number" placeholder="金額 : 0 " value="金額" name="Price" value={this.state.Price} onChange={this.handleValueChange} /> */}
                        <input type="number" placeholder={this.props.Price} value="金額" name="Price" value={this.props.Price} onChange={this.DataChangeHandler} />
                        <br />
                        <input type="text" placeholder="内容" value="内容" name="Content" value={this.props.Content} onChange={this.DataChangeHandler} />
                        <br />
                        {/* <input type="text" placeholder="詳細内容" value="詳細内容" name="DetailContent" value={this.state.DetailContent} onChange={this.handleValueChange} /> */}
                        <input type="text" placeholder="詳細内容" value="詳細内容" name="DetailContent" value={this.props.DetailContent} onChange={this.DataChangeHandler} />
                        <br />
                        <br />

                        {ButtonChoice}

                    </div>
                </div>
            )
        }
    }

}

export default Modal