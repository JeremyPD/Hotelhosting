// src/services/addRole.js
import { auth, db } from '../firebase';

const addRole = async (email, role) => {
  try {
    const user = await auth.getUserByEmail(email);
    await db.collection('users').doc(user.uid).set({
      role,
    });
    console.log('Rol agregado exitosamente');
  } catch (error) {
    console.error('Error agregando rol: ', error);
  }
};

export default addRole;
