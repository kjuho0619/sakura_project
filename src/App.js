import './App.css';
import { Component } from 'react';


const databaseURL = "https://word-cloud-1c0dd-default-rtdb.firebaseio.com/"


class App extends Component {
  constructor(){
    super();
    this.state = {
      words:{},
      word:'',
      weight:''
    };
  }
  _get(){
    fetch(`${databaseURL}/words.json`).then(res => {
      if(res.status !== 200){
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(words => this.setState({words: words}));
  }
  _post(word){
    return fetch(`${databaseURL}/words.json`, {
      method: 'POST',
      body: JSON.stringify(word)
    }).then(res => {
      if(res.status !== 200){
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(data =>{
      let nextState = this.state.words;
      nextState[data.name] = word;
      this.setState({words: nextState});
    });
  }
  _delete(id) {
    return fetch(`${databaseURL}/words/${id}.json`, {
      method: 'DELETE'
    }).then(res =>{
      if(res.status !== 200){
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(() => {
      let nextState = this.state.words;
      delete nextState[id];
      this.setState({words: nextState});
    })
  }

  _update(id) {
    console.log(id);
  }

  componentDidMount(){
    this._get();
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit = () => {
    const word = {
      word: this.state.word,
      weight: this.state.weight
    }
    if(!word.word && !word.weight) {
      return; 
    }
    this._post(word);
  }

  handleUpdate = (id) => {
    this._update(id);
  }

  handleDelete = (id) => {
    this._delete(id);
  }

  render(){
      return(
      <div className="App">
        {Object.keys(this.state.words).map(id => {
          const word = this.state.words[id];
          return(
            <div className="word-div" key={id}>
              <div className="gajungcti-div">
                가중치 : {word.weight}
              </div>  
              <div className="gajungcti-div">
                <h3>단어 : {word.word}</h3>
                <input type="button" value="삭제" onClick={() => this.handleDelete(id)} />
                <input type="button" value="업데이트" onClick={() => this.handleUpdate(id)} />
              </div>  
            </div>
          );
        })}
        <hr/><br/>
        <div>단어추가<br/>
          <input type="text" name="word" value={this.state.word} onChange={this.handleValueChange}></input><br/>
          <input type="text" name="weight" value={this.state.weight} onChange={this.handleValueChange}></input><br/>
          <input type="button" value="추가" onClick={this.handleSubmit} />
        </div>
        <br/><hr/>
      </div>
    );
  }
}

export default App;
