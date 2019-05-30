import React from 'react';
import {Header} from "semantic-ui-react";

const FeatureDropdownResult = ({name, effect, cost, author, hideAuthor, color}) => (
    <div>
        <Header size={'small'} color={color || 'black'}>
            {name}
            {
                !hideAuthor &&
                <Header.Subheader>by <b>{author}</b></Header.Subheader>
            }
            <Header.Subheader><i>Cost: {cost}</i></Header.Subheader>
        </Header>
        {effect}
    </div>
);

export default FeatureDropdownResult;
