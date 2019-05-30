import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

// FIREBASE STREAMS
import {
    login$,
    coreAspects$,
    userAspects$,
    savedAspects$,
    userSettings$,
    coreFeatures$,
    userFeatures$,
    savedFeatures$,
    userUnits$,
    savedUnits$
} from './firebase';

// REDUX ACTIONS
import { updateCoreAspects, updateUserAspects, updateSavedAspects } from './features/aspects/store/aspectsActions'
import { updateCoreFeatures, updateUserFeatures, updateSavedFeatures } from './features/features/store/featuresActions';
import { onSignIn, onSignOut, updateUserSettings } from "./features/auth/store/authActions";

// Styles
import 'semantic-ui-css/semantic.min.css'
import './App.css';

// Pages
import Home from "./features/common/pages/Home";
import UnitMaker from "./features/unitmaker/pages/UnitMaker";
import Browse from "./features/browse/pages/Browse";
import FourOhFour from "./features/common/pages/FourOhFour";
import SimpleWarfare from "./features/battle/simple/pages/SimpleWarfare";
import Contact from "./features/common/pages/Contact";
import SiteMap from "./features/common/pages/SiteMap";
import Rules from "./features/rules/pages/Rules";
import Account from "./features/auth/pages/Account";

// LAYOUT
import Navigation from "./features/common/components/Navigation";
import Footer from "./features/common/components/Footer";
import { updateUserUnits, updateSavedUnits } from './features/units/store/unitsActions';

class App extends Component {
    componentWillMount() {
        const {
            updateCoreAspects, updateUserAspects, updateSavedAspects,
            updateCoreFeatures, updateUserFeatures, updateSavedFeatures,
            updateUserUnits, updateSavedUnits,
            updateUserSettings
        } = this.props

        login$.subscribe(user => this.props.onSignIn(user))
        userSettings$.subscribe(updateUserSettings)
        coreAspects$.subscribe(updateCoreAspects)
        userAspects$.subscribe(updateUserAspects)
        savedAspects$.subscribe(updateSavedAspects)
        coreFeatures$.subscribe(updateCoreFeatures)
        userFeatures$.subscribe(updateUserFeatures)
        savedFeatures$.subscribe(updateSavedFeatures)
        userUnits$.subscribe(updateUserUnits)
        savedUnits$.subscribe(updateSavedUnits)
    }

    componentWillUnmount() {
        login$.unsubscribe()
        userSettings$.unsubscribe()
        coreAspects$.unsubscribe()
        userAspects$.unsubscribe()
        savedAspects$.unsubscribe()
        coreFeatures$.unsubscribe()
        userFeatures$.unsubscribe()
        savedFeatures$.unsubscribe()
        userUnits$.unsubscribe()
        savedUnits$.unsubscribe()
    }

    render() {
        return (
            <div>
                <Helmet>
                    {/*/!* ALOGOLIA *!/*/}
                    <link rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.1.1/themes/algolia-min.css"
                        integrity="sha256-nkldBwBn2NQqRL1mod7BqHsJ6cEOn6u/ln6F/lI4CFo="
                        crossOrigin="anonymous" />
                </Helmet>
                <BrowserRouter>
                    <Navigation />
                    <Switch>
                        <Route exact path={'/'} component={UnitMaker} />
                        <Route exact path={'/info'} component={Home} />
                        <Route exact path={'/user'} component={Account} />
                        <Route exact path={'/shared'} component={Browse} />
                        <Route exact path={'/rules'} component={Rules} />
                        <Route exact path={'/sitemap'} component={SiteMap} />
                        <Route exact path={'/contact'} component={Contact} />
                        {/* <Route exact path={'/simple'} component={SimpleWarfare} /> */}
                        <Route exact path={'/robots.txt'} />
                        <Route exact path={'/sitemap.xml'} />
                        <Route path={'/'} component={FourOhFour} status={404} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    {
        onSignIn, onSignOut,
        updateCoreAspects, updateUserAspects, updateSavedAspects,
        updateCoreFeatures, updateUserFeatures, updateSavedFeatures,
        updateUserUnits, updateSavedUnits,
        updateUserSettings
    }
)(App);
