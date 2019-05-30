import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Container, Divider, Header} from "semantic-ui-react";
import {rulesRaw} from "../store/RulesData";
import stringHash from 'string-hash'

class RulesDisplayRaw extends Component {
    state = {
        search: '',
    };

    render() {
        const {search} = this.state;

        const hash = s => stringHash(s);

        const filterBySearch = z => (!search || (search !== '' && z.includes(search)));

        return (
            <Container text>
                <div className="ui large icon input fluid">
                    <input
                        type="search"
                        placeholder="Search..."
                        value={this.state.search}
                        onChange={({target}) => this.setState({search: target.value})}

                    />
                    <i className="search icon"/>
                </div>
                {
                    rulesRaw.map(
                        x => {

                            const xParas = x.paragraphs.filter(filterBySearch);
                            const subs = [];
                            x.subs.forEach(
                                sub => {
                                    let subparas = sub.paragraphs.filter(filterBySearch);
                                    if (subparas.length > 0) {
                                        subs.push({subheader: sub.subheader, paragraphs: subparas})
                                    }
                                }
                            );

                            if ((subs.length > 0) || (xParas.length > 0)) {
                                return (
                                    <Card fluid key={hash(x.header)}>
                                        <Card.Content>
                                            <Card.Header as={'h3'}>{x.header}</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            {
                                                xParas.length > 0 &&
                                                xParas.map(y => <p key={hash(y)}>{y}</p>)
                                            }
                                            {
                                                xParas.length > 0 &&
                                                <Divider hidden/>
                                            }
                                            {
                                                subs.length > 0 &&
                                                subs.map(
                                                    sub => {
                                                        return (
                                                            <div key={hash(sub.subheader)}>
                                                                <Header as={'h4'} content={sub.subheader}/>
                                                                {
                                                                    sub.paragraphs.length > 0 &&
                                                                    sub.paragraphs.map(
                                                                        para =>
                                                                            <p key={hash(para)}>{para}</p>
                                                                    )
                                                                }
                                                                {
                                                                    sub.paragraphs.length > 0 &&
                                                                    <Divider hidden/>
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </Card.Content>
                                    </Card>
                                )
                            }
                        }
                    )
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(RulesDisplayRaw);
