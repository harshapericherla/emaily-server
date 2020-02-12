import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Landing from './Landing';
import DashBoard from './DashBoard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    
    componentDidMount(){
        this.props.fetchUser();
    }

    render()
    {
        return(
            <div className="container">
               <BrowserRouter>
                   <div>
                     <Header />
                     <Route exact path = "/" component = {Landing} />
                     <Route exact path = "/surveys" component = {DashBoard} />
                     <Route path = "/surveys/new" component = {SurveyNew} />
                   </div>
               </BrowserRouter>
            </div>
        );
    }
};

export default connect(null,actions)(App);