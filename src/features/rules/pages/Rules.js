import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Header, Menu, Tab} from "semantic-ui-react";
import StandardPage from "../../common/components/StandardPage";
import RulesDisplayRaw from "../components/RulesDisplayRaw";
import RulesDisplaySimple from "../components/RulesDisplaySimple";

class Rules extends Component {
    state = {
        activeIndex: 0
    };

    render() {
        const SearchTabMenuItem = ({label, index}) =>
            <Menu.Item active={this.state.activeIndex === index}>
                <Header
                    as={'a'}
                    content={label}
                    className={'capitalize'}
                    onClick={() => this.setState({activeIndex: index})}
                />
            </Menu.Item>;

        const panes = [
            {
                menuItem: (
                    <SearchTabMenuItem
                        key={0} index={0} as={'h2'}
                        label={'Rules as Written'}
                    />
                ),
                render: () => <RulesDisplayRaw />
            },
            {
                menuItem: (
                    <SearchTabMenuItem
                        key={1} index={1} as={'h2'}
                        label={'Short Rules'} disabled={true}
                    />
                ),
                render: () => <RulesDisplaySimple />
            }
        ];

        return (
            <StandardPage
                title={'Warfare Rules'}
                icon={'book'} canonical={'https://warfare.pikaoku.com/rules'}
                description={"The warfare rules from Strongholds & Followers by Matt Colville"}
                metaTitle={'Warfare Rules'}
            >
                <Container text>
                    <Tab
                        menu={{secondary: true, color: 'teal', pointing: true}}
                        activeIndex={this.state.activeIndex}
                        panes={panes}
                    />
                </Container>
            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(Rules);
