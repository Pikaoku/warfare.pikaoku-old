import React from 'react';
import {Header} from "semantic-ui-react";
import firebase from "firebase/app";
import 'firebase/auth';
import {stringifyUnitObjectStats} from "../../../utils/unitMakerUtils";

export const createUnitDropdownOptions = units => {
    let options = [];
    units.map(
        u =>
            options.push({
                value: u.id,
                text: u.data().name,
                content:
                    <UnitDropdownResult
                        key={u.id}
                        name={u.data().name}
                        cost={u.data().cost}
                        effect={u.data().effect}
                        author={u.data().author}
                        hideAuthor={u.data().official}
                        stats={stringifyUnitObjectStats(u.data())}
                        color={
                            u.data().authorId === firebase.auth().currentUser.uid
                                ? 'green'
                                : 'pink'
                        }
                    />
            }));
    return options
};

const UnitDropdownResult = ({color, name, author, stats, hideAuthor, lore}) => {
    return (
        <div>
            <Header size={'small'} color={color || 'black'}>
                {name}
                {
                    !hideAuthor &&
                    <Header.Subheader>by <b>{author}</b></Header.Subheader>
                }
                <Header.Subheader><i>{stats}</i></Header.Subheader>
            </Header>
            {lore}
        </div>
    );
};

export default UnitDropdownResult;
