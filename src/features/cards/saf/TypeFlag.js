import React, { useState } from 'react'
import { pure } from "recompose";
import CustomIcon from '../../common/components/CustomIcon';
import firebase from '../../../firebase';

const TypeFlag = pure(
    ({ className, fill, icon }) => {

        const [iconSrc, setIconSrc] = useState(false);

        return (
            <div className={'type-flag'}>
                <img className={'saf-w-40'} src={'https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/warfare%2Fcards%2Fsaf%2Ftype%2Farcher-heavy.png?alt=media&token=664e93b2-c79a-462b-aee0-a75b7cb84cef'} alt={''}/>
            </div>
        )
    }
)

TypeFlag.propTypes = {}

export default TypeFlag