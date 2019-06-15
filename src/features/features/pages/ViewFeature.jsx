import React, { useEffect, useState } from 'react';
import StandardPage from '../../common/components/StandardPage';
import firebase, { getCurrentUser } from '../../../firebase'
import {
    Container,
    Card,
    CardContent,
    Icon,
    CardGroup,
    Loader,
    Dimmer
} from 'semantic-ui-react';

const ViewFeatures = ({ match }) => {

    const id = match.params.id
    const [feature, setFeature] = useState(false)

    useEffect(() => {
        firebase.firestore().doc('sites/warfare/features/' + id).get().then(
            snapshot => setFeature(snapshot.data())
        )
    }, [id])

    const
        title = !!feature ? feature.name : "Feature Title",
        author = !!feature ? feature.author : "A Great Person",
        type = !!feature ? feature.type : "Action",
        effect = !!feature ? feature.effect : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget est magna. Suspendisse erat justo, condimentum quis nulla vitae, lacinia sagittis lacus.",
        saves = !!feature ? feature.saves : 42

    const currentUserUid = getCurrentUser()

    const titleColor =
        !!feature && currentUserUid
            ? feature.authorId === firebase.auth().getCurrentUser().uid
                ? 'green'
                : feature.saved.indexOf(currentUserUid) !== false
                    ? 'pink'
                    : 'teal'
            : 'teal'

    return (
        <StandardPage
            title={'Unit Maker'}
            subtitle={'Make all those awesome units, yo!'}
            icon={'pencil'}
            canonical={'https://warfare.pikaoku.com/'}
            description={"A unit creator based on Matt Colville's Strongholds & Followers supplament for Dungeons & Dragons 5th Edition"}
            metaTitle={'Unit Maker'}
        >
            <Container text>
                <CardGroup centered>
                    <Card >
                        <Dimmer active={!feature} inverted>
                            <Loader />
                        </Dimmer>
                        <CardContent header={title} meta={<div>by <span style={{ color: '#9c9' }}>{author}</span></div>} />
                        <CardContent>
                            <div style={{ color: '#c96', textTransform: 'capitalize' }}>
                                {type}
                            </div>
                            <div>
                                {effect}
                            </div>
                        </CardContent>
                        <CardContent extra>
                            <div>
                                <Icon name='heart' color='pink' />
                                <span>{saves} saves</span>
                            </div>
                        </CardContent>
                    </Card>
                </CardGroup>
            </Container>
        </StandardPage>
    )

}


export default ViewFeatures