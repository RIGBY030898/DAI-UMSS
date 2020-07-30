import { firebase } from '../config'
import 'firebase/database'

export default firebase.database().ref()
