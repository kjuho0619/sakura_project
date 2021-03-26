import { Component } from "react";

const databaseURL = "https://sakura-project-68d19-default-rtdb.firebaseio.com";

class FixedModal  extends Component {
	constructor() {
		super();
		this.state = {
			ManagementForFixed: {},
			Dialog: false,
			UserID: '',
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
			UserID: this.props.UserID,
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
				UserID: this.props.UserID,
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
						<button value="月給" className="modal-select-btns" name="DivisionCode" label="月給" onClick={clickDivision}>月給</button>
						<button value="お小遣い" className="modal-select-btns" name="DivisionCode" label="お小遣い" onClick={clickDivision} >お小遣い</button>
						<button value="ボーナス" className="modal-select-btns" name="DivisionCode" label="ボーナス" onClick={clickDivision} >ボーナス</button>
						<button value="株式" className="modal-select-btns" name="DivisionCode" label="株式" onClick={clickDivision} >株式</button>
						<button value="その他" className="modal-select-btns" name="DivisionCode" label="その他" onClick={clickDivision}>その他</button>
					</div>
			} else if (this.props.InOutCode === "支出") {
				InOutChoice =
					<div aria-label="DivisionCode" name="DivisionCode" value={this.props.DivisionCode} onChange={this.handleValueChange}>
						<button value="食費" className="modal-select-btns" name="DivisionCode" label="食費" onClick={clickDivision} >食費</button>
						<button value="交通" className="modal-select-btns" name="DivisionCode" label="交通" onClick={clickDivision} >交通</button>
						<button value="文化" className="modal-select-btns" name="DivisionCode" label="文化" onClick={clickDivision} >文化</button>
						<button value="洋服・美容" className="modal-select-btns" name="DivisionCode" label="洋服・美容" onClick={clickDivision} >洋服・美容</button>
						<button value="生活用品" className="modal-select-btns" name="DivisionCode" label="生活用品" onClick={clickDivision} >生活用品</button>
						<div className="modal-select-btns-division"></div>
						<button value="家賃" className="modal-select-btns" name="DivisionCode" label="家賃" onClick={clickDivision} >家賃</button>
						<button value="健康" className="modal-select-btns" name="DivisionCode" label="健康" onClick={clickDivision} >健康</button>
						<button value="光熱" className="modal-select-btns" name="DivisionCode" label="光熱" onClick={clickDivision} >光熱</button>
						<button value="その他" className="modal-select-btns" name="DivisionCode" label="その他" onClick={clickDivision} >その他</button>
					</div>
			} else {
				InOutChoice = '';
			}

			let Day  = 
				<div className="per-month-select-box">
					<label>
						<span className="modal-contents-title modal-content-title-day">Day :</span>
							<select className="PaymentDay modal-content-input" name="PaymentDay" value={this.props.PaymentDay} onChange={this.handleValueChange}>
								<option className="PaymentDay" name="PaymentDay" value="選択">選択</option>
								<option className="PaymentDay" name="PaymentDay" value="1">1</option>
								<option className="PaymentDay" name="PaymentDay" value="2">2</option>
								<option className="PaymentDay" name="PaymentDay" value="3">3</option>
								<option className="PaymentDay" name="PaymentDay" value="4">4</option>
								<option className="PaymentDay" name="PaymentDay" value="5">5</option>
								<option className="PaymentDay" name="PaymentDay" value="6">6</option>
								<option className="PaymentDay" name="PaymentDay" value="7">7</option>
								<option className="PaymentDay" name="PaymentDay" value="8">8</option>
								<option className="PaymentDay" name="PaymentDay" value="9">9</option>
								<option className="PaymentDay" name="PaymentDay" value="10">10</option>
								<option className="PaymentDay" name="PaymentDay" value="11">11</option>
								<option className="PaymentDay" name="PaymentDay" value="12">12</option>
								<option className="PaymentDay" name="PaymentDay" value="13">13</option>
								<option className="PaymentDay" name="PaymentDay" value="14">14</option>
								<option className="PaymentDay" name="PaymentDay" value="15">15</option>
								<option className="PaymentDay" name="PaymentDay" value="16">16</option>
								<option className="PaymentDay" name="PaymentDay" value="17">17</option>
								<option className="PaymentDay" name="PaymentDay" value="18">18</option>
								<option className="PaymentDay" name="PaymentDay" value="19">19</option>
								<option className="PaymentDay" name="PaymentDay" value="20">20</option>
								<option className="PaymentDay" name="PaymentDay" value="21">21</option>
								<option className="PaymentDay" name="PaymentDay" value="22">22</option>
								<option className="PaymentDay" name="PaymentDay" value="23">23</option>
								<option className="PaymentDay" name="PaymentDay" value="24">24</option>
								<option className="PaymentDay" name="PaymentDay" value="25">25</option>
								<option className="PaymentDay" name="PaymentDay" value="26">26</option>
								<option className="PaymentDay" name="PaymentDay" value="27">27</option>
								<option className="PaymentDay" name="PaymentDay" value="28">28</option>
								<option className="PaymentDay" name="PaymentDay" value="29">29</option>
								<option className="PaymentDay" name="PaymentDay" value="30">30</option>
								<option className="PaymentDay" name="PaymentDay" value="31">31</option>
							</select>
					</label>
				</div>
			
			let Month  =
				<div className="per-month-select-box">
					<label>
						<span className="modal-contents-title modal-content-title-month">Month :</span>
							<select className="modal-content-input" name="PaymentMonth" value={this.props.PaymentMonth} onChange={this.handleValueChange}>
								<option className="PaymentMonth" name="PaymentMonth" value="選択">選択</option>
								<option className="PaymentMonth" name="PaymentMonth" value="1">1</option>
								<option className="PaymentMonth" name="PaymentMonth" value="2">2</option>
								<option className="PaymentMonth" name="PaymentMonth" value="3">3</option>
								<option className="PaymentMonth" name="PaymentMonth" value="4">4</option>
								<option className="PaymentMonth" name="PaymentMonth" value="5">5</option>
								<option className="PaymentMonth" name="PaymentMonth" value="6">6</option>
								<option className="PaymentMonth" name="PaymentMonth" value="7">7</option>
								<option className="PaymentMonth" name="PaymentMonth" value="8">8</option>
								<option className="PaymentMonth" name="PaymentMonth" value="9">9</option>
								<option className="PaymentMonth" name="PaymentMonth" value="10">10</option>
								<option className="PaymentMonth" name="PaymentMonth" value="11">11</option>
								<option className="PaymentMonth" name="PaymentMonth" value="12">12</option>
							</select>
					</label>
				</div>

        let ButtonChoice = 
					<div>
						<button variant="contained" className="modal-select-btns" color="primary" onClick={this.handleEdit}>修正</button>
						<button variant="outlined" className="modal-select-btns" name={this.props.indexKey} color="primary" onClick={this._delete}>削除</button>
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
										this.props.FixedModalShow(false);
									}.bind(this)}>
										<span className="material-icons">cancel_presentation</span>
									</a>
								</div>
								<div className="modal-content-body">
									<div className="modal-big-title-container">
										<div>{this.props.TermFlag}{this.props.InOutCode}</div>
									</div>
									<div className="modal-contents-container-box">
										<span className="modal-contents-title">収入・支出</span><input className="modal-content-input modal-in-out-code-content" disabled type="text" placeholder="収入・支出" lable="収入・支出" name="InOutCode" value={this.props.InOutCode} onChange={this.handleValueChange} />
									</div>
									<div className="modal-contents-container-box">
										{Month}
										{Day}
									</div>
									<div className="modal-contents-container-box">
										<div>
											<span className="modal-contents-title">資産</span><input className="modal-content-input modal-assets-code-content" type="text" placeholder="資産" lable="資産" name="AssetsCode" value={this.props.AssetsCode} onChange={this.handleValueChange} />
										</div>
										<div className="btn-group2 modal-btn-container" name="AssetsCode" value={this.props.AssetsCode} onChange={this.handleValueChange}>
											<button value="現金" className="modal-select-btns" name="AssetsCode" onClick={this.clickAsset}>現金</button>
											<button value="カード" className="modal-select-btns" name="AssetsCode" onClick={this.clickAsset}>カード</button>
											<button value="銀行" className="modal-select-btns" name="AssetsCode" onClick={this.clickAsset}>銀行</button>
										</div>
									</div>
									<div className="modal-contents-container-box modal-divison-container">
										<div>
											<span className="modal-contents-title">分類</span><input className="modal-content-input modal-division-code-content" type="text" placeholder="分類" lable="分類" name="DivisionCode" value={this.props.DivisionCode} onChange={this.handleValueChange} />
										</div>
										<div className="btn-group3 modal-btn-container" name="DivisionCode" vlaue={this.props.DivisionCode} onChange={this.DataChangeHandler}>
											{InOutChoice}
										</div>
									</div>
									<div className="modal-contents-container-box modal-contents-detail-container">
										<div className="modal-content-detail-box">
											<span className="modal-contents-title">金額</span><input className="modal-content-input modal-price-contet" type="text" placeholder="金額 : 0 " value="金額" name="Price" value={this.props.Price} onChange={this.handleValueChange} />
										</div>
										<div className="modal-content-detail-box">
											<span className="modal-contents-title">内容</span><input className="modal-content-input modal-content-content" type="text" placeholder="内容" value="内容" name="Content" value={this.props.Content} onChange={this.handleValueChange} />
										</div>
										<div className="modal-content-detail-box">
											<span className="modal-contents-title">詳細内容</span><input className="modal-content-input modal-detail-content-content" type="text" placeholder="詳細内容" value="詳細内容" name="DetailContent" value={this.props.DetailContent} onChange={this.handleValueChange} />
										</div>
									</div>
									<div className="modal-contents-container-box modal-btn-container">
										{ButtonChoice}
									</div>
								</div>
              </div>
            </div>
          )
        }
    }
}

export default FixedModal