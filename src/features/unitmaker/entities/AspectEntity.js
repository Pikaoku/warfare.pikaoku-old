import FirebaseEntity from '../../common/entities/FirebaseEntity'

const ASPECT_TYPE_ANCESTRY = 'ancestry'
const ASPECT_TYPE_TYPE = 'type'
const ASPECT_TYPE_EXPERIENCE = 'experience'
const ASPECT_TYPE_EQUIPMENT = 'equipment'
const ASPECT_TYPE_CUSTOMIZATION = 'customization'

class AspectEntity extends FirebaseEntity {
    attack = 0
    power = 0
    defense = 0
    toughness = 0
    morale = 0
    cost = 0
    costMod = 1
    name = ''
    features = []
    type = ASPECT_TYPE_ANCESTRY
}

export {
    ASPECT_TYPE_ANCESTRY,
    ASPECT_TYPE_TYPE,
    ASPECT_TYPE_EXPERIENCE,
    ASPECT_TYPE_EQUIPMENT,
    ASPECT_TYPE_CUSTOMIZATION
}

export default AspectEntity