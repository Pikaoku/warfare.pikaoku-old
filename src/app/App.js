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
import {connect} from "react-redux";
import {fetchAllCoreData} from "../store/actions/firestore";
import {handleAuthStateChange} from "../store/actions/auth";
import Shared from "./pages/shared/Shared";

class App extends Component {
    componentDidMount() {
        this.props.fetchAllCoreData();
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(this.props.handleAuthStateChange)
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        return (
            <div>
                <Helmet>
                    {/*Should always have at least some SEO acceptable meta data*/}
                </Helmet>
                <BrowserRouter>
                    <Navigation/>
                    <Switch>
                        <Route exact path={'/info'} component={Home}/>
                        <Route exact path={'/'} component={UnitMaker}/>
                        <Route exact path={'/user'} component={User}/>
                        <Route exact path={'/shared'} component={Shared}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    {fetchAllCoreData, handleAuthStateChange}
)(App);
