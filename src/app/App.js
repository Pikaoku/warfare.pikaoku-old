import React, {Component} from 'react';
import Home from "./pages/home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import {Helmet} from "react-helmet";
import 'semantic-ui-css/semantic.min.css'
import UnitMaker from "./pages/unitMaker/UnitMaker";
import User from "./pages/user/User";
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Shared from "./pages/shared/Shared";
import {handleAuthStateChange} from "../store/auth/authActions";
import {connect} from "react-redux";
import {fetchCoreData} from "../store/data/dataActions";
import FourOhFour from "./pages/errors/FourOhFour";

class App extends Component {
    componentWillMount() {
        this.coreDataListeners = [];
    }

    componentDidMount() {
        this.coreDataListeners = this.props.fetchCoreData();
        this.authStateChangeListener = firebase.auth().onAuthStateChanged(this.props.handleAuthStateChange)
    }

    componentWillUnmount() {
        this.coreDataListeners.map(unsubscribe => unsubscribe());
        this.authStateChangeListener();
    }

    render() {
        return (
            <div>
                <Helmet>
                    {/*/!* ALOGOLIA *!/*/}
                    <link rel="stylesheet"
                          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.1/themes/algolia-min.css"
                          integrity="sha256-nkldBwBn2NQqRL1mod7BqHsJ6cEOn6u/ln6F/lI4CFo="
                          crossOrigin="anonymous"></link>
                </Helmet>
                <BrowserRouter>
                    <Navigation/>
                    <Switch>
                        <Route exact path={'/'} component={UnitMaker}/>
                        <Route exact path={'/info'} component={Home}/>
                        <Route exact path={'/user'} component={User}/>
                        <Route exact path={'/shared'} component={Shared}/>
                        <Route exact path={'/sitemap.xml'}/>
                        <Route exact path={'/robots.txt'}/>
                        <Route component={FourOhFour} status={404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    {fetchCoreData, handleAuthStateChange}
)(App);
