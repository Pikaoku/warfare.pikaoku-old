import React from 'react';
import {Header, Tab} from "semantic-ui-react";
import {InstantSearch, SearchBox} from "react-instantsearch-dom";

const UnitSearchTab = ({searchClient}) => {
    return (
        <Tab.Pane>
            <div className="ais-InstantSearch">
                <Header size={'large'} content={'Units'}/>
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

export default UnitSearchTab;
