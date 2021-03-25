import { Component } from "react";
import { Button, ButtonToolbar, ThemeProvider } from 'react-bootstrap';
import '../css/Modal_1.css';

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com/";

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
            let nextState = this.state.ManagementForDay;
            nextState[data.name] = list;
            this.setState({ ManagementForDay: nextState});
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
            UserID: this.props.UserID,
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
            this.props.modalShow(false);
            return;
        } else {
            return;
        }

    }

    clickAsset = (e) => {
        this.DataChangeHandler(e);
    }
    
    clickInOut = (e) => {
        this.props.DataChangeHandler(e);
    }

    clickDivision = (e) => {
        this.DataChangeHandler(e);
    }

    render() {
        const clickDivision = this.clickDivision;

        let InOutChoice = '';
        if (this.props.InOutCode === "収入") {
            InOutChoice =
                <div aria-label="DivisionCode"  name="DivisionCode" value={this.props.DivisionCode} onChange={this.DataChangeHandler}>

                    <button variant="light" name="DivisionCode" value="月給" label="月給" onClick={clickDivision}>月給</button>
                    <button variant="light" name="DivisionCode" value="お小遣い" label="お小遣い" onClick={clickDivision} >お小遣い</button>
                    <button variant="light" name="DivisionCode" value="ボーナス" label="ボーナス" onClick={clickDivision} >ボーナス</button>
                    <button variant="light" name="DivisionCode" value="株式" label="株式" onClick={clickDivision} >株式</button>
                        <br />
                        <br />
                    <button variant="secondary" name="DivisionCode" value="その他" label="その他" onClick={clickDivision}>その他</button>
                        <br />
                        <br />
                </div>
        } else if (this.props.InOutCode === "支出") {
            InOutChoice =
                <div aria-label="DivisionCode" name="DivisionCode" value={this.props.DivisionCode} onChange={this.DataChangeHandler}>
                    
                    <button variant="light" name="DivisionCode" value="食費" label="食費" onClick={clickDivision} >食費</button>
                    <button variant="light" name="DivisionCode" value="交通" label="交通" onClick={clickDivision} >交通</button>
                    <button variant="light" name="DivisionCode" value="文化" label="文化" onClick={clickDivision} >文化</button>
                    <button variant="light" name="DivisionCode" value="家賃" label="家賃" onClick={clickDivision} >家賃</button>
                        <br />
                        <br />
                    <button variant="light" name="DivisionCode" value="洋服・美容" label="洋服・美容" onClick={clickDivision} >洋服・美容</button>
                    <button variant="light" name="DivisionCode" value="健康" label="健康" onClick={clickDivision} >健康</button>
                    <button variant="light" name="DivisionCode" value="光熱" label="光熱" onClick={clickDivision} >光熱</button>
                        <br />
                        <br />
                    <button variant="light"  name="DivisionCode" value="生活用品" label="生活用品" onClick={clickDivision} >生活用品</button>
                    <button variant="secondary" name="DivisionCode" value="その他" label="その他" onClick={clickDivision} >その他</button>
                        <br />
                        <br />
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
                        <div className="cloase-btn">
                            <a href="" onClick={function (e) {
                                e.preventDefault();
                                this.props.modalShow(false);
                            }.bind(this)}>
                                <span className="material-icons">cancel_presentation</span>
                            </a>
                        </div>
                        <div>
                                <br /> 
                            <input disabled type="text" placeholder="収入・支出" lable="収入・支出" name="InOutCode" value={this.props.InOutCode} onChange={this.DataChangeHandler} />
                                <br /> 
                        </div>
                                <br />

                        <div className="btn-group1" name="InOutCode" value={this.props.InOutCode} onChange={this.DataChangeHandler}>
                            <button variant="primary" value="収入" name="InOutCode" onClick={this.clickInOut}>収入</button>
                            <button variant="danger"  value="支出" name="InOutCode" onClick={this.clickInOut}>支出</button>
                        </div>
                            <br />  
                        <div>
                                <br />
                            <input type="Date" name="Date" value={this.props.modalDate} onChange={this.DataChangeHandler} />
                        </div>
                            <br />
                            <br />
                        <div>
                            <input disabled type="text" placeholder={this.props.AssetsCode} lable="資産" name="AssetsCode" value={this.props.AssetsCode} onChange={this.DataChangeHandler} />
                        </div>
                        <div className="btn-group2" name="AssetsCode" value={this.props.AssetsCode} onChange={this.DataChangeHandler}>
                            <br />
                            <button variant="warning" value="現金"  name="AssetsCode" onClick={this.clickAsset}>現金</button>
                            <button variant="dark" value="カード"  name="AssetsCode" onClick={this.clickAsset}>カード</button>
                            <button variant="success" value="銀行"  name="AssetsCode" onClick={this.clickAsset}>銀行</button>
                        </div>
                                <br />
                                <br />
                        <div>
                            <input disabled type="text" placeholder="分類" lable="分類" name="DivisionCode" value={this.props.DivisionCode} onChange={this.DataChangeHandler} />
                        </div>
                        <div className="btn-group3" name="DivisionCode" vlaue={this.props.DivisionCode} onChange={this.DataChangeHandler}>
                                <br />
                            {InOutChoice}
                                <br />
                        </div>
                                <br />
                                <br />
                        <input type="number" placeholder={this.props.Price} value="金額" name="Price" value={this.props.Price} onChange={this.DataChangeHandler} />
                            <br />
                            <br />
                        <input type="text" placeholder="内容" value="内容" name="Content" value={this.props.Content} onChange={this.DataChangeHandler} />
                            <br />
                            <br />
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