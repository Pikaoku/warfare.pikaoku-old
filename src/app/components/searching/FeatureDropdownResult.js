import React from 'react';
import {Header} from "semantic-ui-react";
import firebase from 'firebase/app';
import 'firebase/auth'

export const createFeatureDropdownOptions = features => {
    const options = [];
    features.map(
        f =>
            options.push({
                value: f.id,
                text: f.data().name,
                content:
                    <FeatureDropdownResult
                        key={f.id}
                        name={f.data().name}
                        cost={f.data().cost}
                        effect={f.data().effect}
                        author={f.data().author}
                        hideAuthor={f.data().official}
                        color={
                            f.data().official
                                ? 'teal'
                                : (
                                    f.data().authorId === firebase.auth().currentUser.uid
                                        ? 'green'
                                        : 'pink'
                                )
                        }
                    />
            }));
    return options
};

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
