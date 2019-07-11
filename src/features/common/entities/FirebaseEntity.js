import firebase, { auth } from '../../../firebase'

class FirebaseEntity {
    id = false
    version = 0
    author = '[null author]'
    authorId = false
    official = false
    saves = 0

    constructor(data) {
        data && this.setData(data)
    }

    setData(data) {
        Object.assign(this, data)
    }

    getData() {
        return { ...this }
    }

    clone() {
        return new this(this.getData())
    }

    prepareCopy() {
        this.id = null
        this.official = false
        this.version = 1
        this.saves = 0
        return this.prepareAdd
    }

    prepareUpdate() {
        this.author = auth.currentUser.displayName
        this.updated = firebase.firestore.FieldValue.serverTimestamp()
        return this
    }

    prepareAdd() {
        this.authorId = auth.currentUser.uid
        this.author = auth.currentUser.displayName
        this.created = firebase.firestore.FieldValue.serverTimestamp()
        this.updated = firebase.firestore.FieldValue.serverTimestamp()
        return this
    }
}

export default FirebaseEntity