class User {
    username;
    id;

    constructor(user) {
       this.withFirebaseData(user)
    }

    withFirebaseData (firebaseUser) {
        this.username = firebaseUser.displayName
        this.id = firebaseUser.uid
    }
}

export default User