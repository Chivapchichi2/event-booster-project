import refs from './refs';

export default {
  signedUser(url, name) {
    refs.iconOut.style.display = 'none';
      console.log(url, name);
  },
  noSignedUser() {console.log('no user');},
}
// refs.iconOut.style.display = 'none';
// refs.firebaseContainer.style.display = 'none';