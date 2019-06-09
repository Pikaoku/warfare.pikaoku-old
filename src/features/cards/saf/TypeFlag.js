import React, { useState } from 'react'
import { pure } from "recompose";
import CustomIcon from '../../common/components/CustomIcon';
import firebase from '../../../firebase';

const TypeFlag = pure(
    ({ className, fill, icon, typeSrc }) => {

        const [iconSrc, setIconSrc] = useState(false);

        return (
            <div className={'type-flag'}>
                <img className={'saf-w-40'} src={typeSrc} alt={''}/>
            </div>
        )
    }
)

TypeFlag.propTypes = {}

export default TypeFlag