import React from 'react';
import {Header, Tab} from "semantic-ui-react";
import {InstantSearch, SearchBox} from "react-instantsearch-dom";

const FeatureSearchTab = ({searchClient}) => {
    return (
        <Tab.Pane>
            <div className="ais-InstantSearch">
                <Header content={'Features'} size={'large'}/>
                <InstantSearch indexName={'warfare.pikaoku'} searchClient={searchClient}>
                    <div className="right-panel">
                        <SearchBox/>
                        {/*<Hits hitComponent={Hit}/>*/}
                    </div>
                </InstantSearch>
            </div>
            <br/>
        </Tab.Pane>
    );
};

export default FeatureSearchTab;
