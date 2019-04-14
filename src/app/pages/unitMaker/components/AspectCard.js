import React from 'react';
import {Card, Form} from "semantic-ui-react";
import AspectDropdown from "./AspectDropdown";

const AspectCard = ({aspect}) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header content={aspect}/>
            </Card.Content>
            <Card.Content extra className={'text-center'}>
                <AspectDropdown aspect={aspect}/>
            </Card.Content>
            <Card.Content>
                <Form>
                    <Form.Input fluid placeholder={'Custom ' + aspect + ' name'}/>
                </Form>
            </Card.Content>
        </Card>
    );
};

export default AspectCard;
