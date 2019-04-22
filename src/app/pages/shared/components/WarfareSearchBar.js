import React from 'react';
import {connectSearchBox} from 'react-instantsearch-dom';


const WarfareSearchBar =
    ({
         currentRefinement, isSearchStalled, refine
     }) => {
        return (
            <div className="ui massive icon input fluid">
                <input
                    type="search"
                    placeholder="Search..."
                    value={currentRefinement}
                    onChange={event => refine(event.currentTarget.value)}

                />
                {isSearchStalled ? 'My search is stalled' : ''}
                <i className="search icon"/>
            </div>
        );
    };

export default connectSearchBox(WarfareSearchBar);
