import React, { useState, useEffect } from 'react';
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const SaveButton = ({ authenticated, alreadySaved, saveFunc, unsaveFunc }) => {

    const [isSaved, setSaved] = useState(alreadySaved)

    useEffect(() => setSaved(alreadySaved), [authenticated, alreadySaved, saveFunc, unsaveFunc])

    const save = () => {
        setSaved(true)
        saveFunc()
    }

    const unsave = () => {
        setSaved(false)
        unsaveFunc()
    }

    return (
        <div className={'grid-center'}>
            {
                !authenticated &&
                <Icon size={'large'} name={'heart outline'} disabled={true} color={'pink'} />
            }
            {
                !!authenticated &&
                <Icon
                    onClick={isSaved ? unsave : save}
                    name={isSaved ? 'heart' : 'heart outline'}
                    fitted={true}
                    size={'large'}
                    color={'pink'}
                />
            }
        </div>
    )
}

SaveButton.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    alreadySaved: PropTypes.bool.isRequired,
    saveFunc: PropTypes.func.isRequired,
    unsaveFunc: PropTypes.func.isRequired,
};

export default SaveButton;
