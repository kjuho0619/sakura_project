import { Component } from 'react';
import '../css/Main.css';
import Header from './Header.js';

class Main extends Component{
  render(){
    return(
      <div className="Main">
        <Header />

        <main>
          <div className="main_page">

          </div>
        </main>
      </div>
    );
  }
}

export default Main;
