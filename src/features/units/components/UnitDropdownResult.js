import React from 'react';
import {Header} from "semantic-ui-react";
import firebase from "firebase/app";
import 'firebase/auth';
import { stringifyUnitObjectStats } from '../../unitmaker/store/unitmakerUtils';

export const createUnitDropdownOptions = units => {
    let options = [];
    units.map(
        u =>
            options.push({
                value: u.id,
                text: u.name,
                content:
                    <UnitDropdownResult
                        key={u.id}
                        name={u.name}
                        cost={u.mapcost}
                        effect={u.effect}
                        author={u.author}
                        hideAuthor={u.official}
                        stats={stringifyUnitObjectStats(u)}
                        color={
                            u.authorId === firebase.auth().currentUser.uid
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
