import './App.css'
import 'semantic-ui-css/semantic.min.css'

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { updateCoreAspects, updateSavedAspects, updateUserAspects } from './features/aspects/store/aspectsActions'
import Account from './features/auth/pages/Account'
import { onSignIn, onSignOut, updateUserSettings } from './features/auth/store/authActions'
import Browse from './features/browse/pages/Browse'
import Footer from './features/common/components/Footer'
import Navigation from './features/common/components/Navigation'
import Contact from './features/common/pages/Contact'
import FourOhFour from './features/common/pages/FourOhFour'
import Home from './features/common/pages/Home'
import SiteMap from './features/common/pages/SiteMap'
import { updateSiteSettingsAction } from './features/common/store/siteSettingsReducer'
import ViewFeature from './features/features/pages/ViewFeature'
import { updateCoreFeatures, updateSavedFeatures, updateUserFeatures } from './features/features/store/featuresActions'
import Rules from './features/rules/pages/Rules'
import UnitMaker from './features/unitmaker/pages/UnitMaker'
import { updateSavedUnits, updateUserUnits } from './features/units/store/unitsActions'
import {
    coreAspects$,
    coreFeatures$,
    login$,
    savedAspects$,
    savedFeatures$,
    savedUnits$,
    siteSettings$,
    userAspects$,
    userFeatures$,
    userSettings$,
    userUnits$,
} from './firebase'

// FIREBASE STREAMS
// REDUX ACTIONS
// Styles
// Pages
// LAYOUT
class App extends Component {
    componentWillMount() {
        const {
            updateCoreAspects, updateUserAspects, updateSavedAspects,
            updateCoreFeatures, updateUserFeatures, updateSavedFeatures,
            updateUserUnits, updateSavedUnits,
            updateUserSettings, updateSiteSettingsAction
        } = this.props

        login$.subscribe(user => this.props.onSignIn(user))
        userSettings$.subscribe(updateUserSettings)
        siteSettings$.subscribe(updateSiteSettingsAction)
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
        siteSettings$.unsubscribe()
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
                        <Route exact path={'/shared/:tab'} component={Browse} />
                        <Route exact path={'/rules'} component={Rules} />
                        <Route exact path={'/sitemap'} component={SiteMap} />
                        <Route exact path={'/contact'} component={Contact} />
                        <Route exact path={'/features/:id'} component={ViewFeature} />
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
        updateUserSettings, updateSiteSettingsAction
    }
)(App);
