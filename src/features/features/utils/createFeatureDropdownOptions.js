import React from 'react'
import FeatureDropdownResult from '../components/FeatureDropdownResult'


const createFeatureDropdownOptions = (features, user = false)  =>
    features.map(
        feature => ({
            value: feature.id,
            text: feature.name,
            content:
                <FeatureDropdownResult
                    key={feature.id}
                    name={feature.name}
                    cost={feature.cost}
                    effect={feature.effect}
                    author={feature.author}
                    hideAuthor={feature.official}
                    color={
                        feature.official ? 'teal' : (!!user && feature.authorId === user.id ? 'green' : 'pink')
                    }
                />
        })
    )


export default createFeatureDropdownOptions