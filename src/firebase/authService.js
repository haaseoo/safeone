import {auth, db} from './firebase';

import {createUserWithEmailAndPassword} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';

export const signUpUser = async (email, password) => {
  try {
    console.log('🔥 auth:', auth); // 여기가 undefined이면 firebase.js export 문제

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = userCredential.user.uid;

    await setDoc(doc(db, 'users', uid), {
      email,
      createdAt: new Date(),
    });

    return {success: true};
  } catch (error) {
    console.error('❌ 회원가입 실패:', error.message);
    return {success: false, message: error.message};
  }
};
