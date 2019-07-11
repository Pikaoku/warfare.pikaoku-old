import * as algoliasearch from 'algoliasearch'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Menu, Tab } from 'semantic-ui-react'

import StandardPage from '../../common/components/StandardPage'
import AspectSearchTab from '../components/AspectSearchTab'
import FeatureSearchTab from '../components/FeatureSearchTab'
import UnitSearchTab from '../components/UnitSearchTab'

class Browse extends Component {
    constructor(props) {
        super(props);

        this.searchClient = algoliasearch(
            '4VK9GM16WD',
            'e1786c7de6633fca532d4318f72af2c8'
        )

        this.getIndexForPane = this.getIndexForPane.bind(this)
    }

    getIndexForPane(tab) {
        const tabToIndexMap = {
            'aspects': 0,
            'features': 1,
            'units': 2
        }

        return tabToIndexMap[tab]
    }

    render() {

        const tab = this.getIndexForPane(this.props.match.params.tab.toLowerCase())

        const SearchTabMenuItem = ({ label, index }) =>
            <Menu.Item active={tab === index}>
                <Header
                    as={Link} to={label.toLowerCase()}
                    content={label}
                    className={'capitalize'}
                />
            </Menu.Item>;

        const panes = [
            {
                index: 'aspects',
                menuItem: (
                    <SearchTabMenuItem
                        key={'aspects'}
                        label={'Aspects'}
                    />
                ),
                render: () => <AspectSearchTab searchClient={this.searchClient} />
            },
            {
                menuItem: (
                    <SearchTabMenuItem
                        key={'features'}
                        label={'Features'}
                    />
                ),
                render: () => <FeatureSearchTab searchClient={this.searchClient} />
            },
            {
                menuItem: (
                    <SearchTabMenuItem
                        key={'units'}
                        label={'Units'}
                    />
                ),
                render: () => <UnitSearchTab searchClient={this.searchClient} />
            }
        ];

        console.log('tab', tab)

        return (
            <StandardPage
                title={'Shared'}
                icon={'globe'}
                canonical={'https://warfare.pikaoku.com/shared'}
                description={"Community created and shared assets for Matt Colville's Stronghold & Followers"}
                metaTitle={'Shared'}
            >
                <Tab
                    menu={{ secondary: true, color: 'teal', pointing: true }}
                    defaultActiveIndex={0}
                    activeIndex={tab}
                    panes={panes}
                />
            </StandardPage>
        );
    }
}


export default Browse
