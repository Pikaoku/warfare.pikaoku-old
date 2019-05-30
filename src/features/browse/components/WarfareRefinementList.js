import React from 'react';
import {connectRefinementList} from 'react-instantsearch-dom';
import {Icon, Label, List} from "semantic-ui-react";

const WarfareRefinementList =
    ({
         items,
         isFromSearch,
         refine,
         searchForItems,
         createURL,
     }) =>
        (
            <List horizontal>
                {
                    items.map(
                        item => (
                            <List.Item
                                key={item.label}
                            >
                                <Label
                                    color={item.isRefined ? 'yellow' : 'teal'}
                                    horizontal
                                    as={'a'}
                                    size={'large'}
                                    href={createURL(item.value)}
                                    onClick={
                                        event => {
                                            event.preventDefault();
                                            refine(item.value);
                                        }
                                    }
                                >
                                    {
                                        item.isRefined &&
                                            <Icon name={'check'}/>
                                    }
                                    <span className={'capitalize'}>{item.label}</span>
                                    <Label.Detail>{item.count}</Label.Detail>
                                </Label>
                            </List.Item>
                        )
                    )
                }
            </List>
        );

export default connectRefinementList(WarfareRefinementList);
