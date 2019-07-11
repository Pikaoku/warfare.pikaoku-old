import { firestore } from '../../../firebase'
import FirebaseEntity from '../../common/entities/FirebaseEntity'
import { ASPECT_TYPE_TYPE } from '../store/unitmakerUtils'
import AspectEntity, { ASPECT_TYPE_ANCESTRY, ASPECT_TYPE_EQUIPMENT, ASPECT_TYPE_EXPERIENCE } from './AspectEntity'

class UnitEntity extends FirebaseEntity {
    label = ''
    description = ''
    name = ''
    lore = ''
    commander = ''
    currency = 'GP'
    size = 4
    ancestry = new AspectEntity({ type: ASPECT_TYPE_ANCESTRY })
    type = new AspectEntity({ type: ASPECT_TYPE_TYPE })
    experience = new AspectEntity({ type: ASPECT_TYPE_EXPERIENCE })
    equipment = new AspectEntity({ type: ASPECT_TYPE_EQUIPMENT })
    customization = new AspectEntity({ type: ASPECT_TYPE_ANCESTRY })

    constructor(data = null) {
        super(data)
        if (data) {
            this.ancestry = new AspectEntity(data.ancestry)
            this.experience = new AspectEntity(data.experience)
            this.equipment = new AspectEntity(data.equipment)
            this.type = new AspectEntity(data.type)
            this.customization = new AspectEntity(data.customization)
        }
    }

    getData() {
        return {
            ...this,
            ancestry: new AspectEntity(this.ancestry.getData()),
            experience: new AspectEntity(this.experience.getData()),
            equipment: new AspectEntity(this.equipment.getData()),
            type: new AspectEntity(this.type.getData()),
            customization: new AspectEntity(this.customization.getData())
        }
    }

    save() {
        if (this.id) {
            this.prepareUpdate()
            firestore.collection('sites/warfare/units').add(this.getData)
        } else {
            
        }
    }
}

export default UnitEntity