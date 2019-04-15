import React from 'react';
import {Card, Form} from "semantic-ui-react";
import AspectDropdown from "./AspectDropdown";
import {connect} from "react-redux";
import {saveUmNestedField} from "../../../../store/actions/unitmaker";
import {blurOnKeyDown} from "../../../../utils/unitMakerUtils";

const AspectCard = ({aspect, saveUmNestedField}) => {

    return (
        <Card>
            <Card.Content>
                <Card.Header className={'capitalize'} content={aspect}/>
            </Card.Content>
            <Card.Content extra className={'text-center'}>
                <AspectDropdown aspect={aspect}/>
            </Card.Content>
            <Card.Content>
                <Form>
                    <Form.Input
                        onBlur={({target: {value}}) => {
                            saveUmNestedField(aspect, 'name', value)
                        }}
                        onKeyDown={blurOnKeyDown}
                        fluid placeholder={'Custom ' + aspect + ' name'}/>
                </Form>
            </Card.Content>
        </Card>
    );
};

export default connect(
    null,
    {saveUmNestedField}
)(AspectCard);
