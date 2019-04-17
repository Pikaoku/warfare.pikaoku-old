import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import * as algoliasearch from "algoliasearch";
import {Header, Menu, Tab} from "semantic-ui-react";
import AspectSearchTab from "./components/AspectSearchTab";
import FeatureSearchTab from "./components/FeatureSearchTab";
import UnitSearchTab from "./components/UnitSearchTab";

const Hit = ({hit}) => {
    return (
        <>
            <div>{hit.name}</div>
            <div>{hit.author}</div>
            <div>{hit.type}</div>
        </>
    )
}

class Shared extends Component {
    constructor(props) {
        super(props);

        this.searchClient = algoliasearch(
            '4VK9GM16WD',
            'e1786c7de6633fca532d4318f72af2c8'
        )
    }

    render() {

        const SearchTabMenuItem = ({label}) =>
            <Menu.Item>
                <Header as={'h1'} content={label} className={'capitalize'}/>
            </Menu.Item>;

        const panes = [
            {
                menuItem: (<SearchTabMenuItem key={1} label={'Aspects'}/>),
                render: () => <AspectSearchTab searchClient={this.searchClient}/>
            },
            {
                menuItem: (<SearchTabMenuItem key={2} label={'Features'}/>),
                render: () => <FeatureSearchTab searchClient={this.searchClient}/>
            },
            {
                menuItem: (<SearchTabMenuItem key={3} label={'Units'}/>),
                render: () => <UnitSearchTab searchClient={this.searchClient}/>
            }
        ];

        return (
            <StandardPage title={'Shared'} subtitle={'This needs a better name!'} icon={'globe'}>
                <Tab
                    menu={{pointing: true, secondary: true}}
                    panes={panes}
                />
            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(Shared);
