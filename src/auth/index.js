import users from './users';

const SESSION_KEY = 'owt-sess';

function setSession(userUid) {
  sessionStorage.setItem(SESSION_KEY, userUid);
}

export function getSession() {
  return sessionStorage.getItem(SESSION_KEY);
}

export function isLogged() {
  const userUid = getSession();
  if (!userUid) {
    return false;
  }

  return users.find(u => u.uid === userUid);
}

export function login(email, password) {
  const user = users.find(u => u.email === email);
  if (!user) {
    return false;
  }

  if (user.password === password) {
    setSession(user.uid);
    return true;
  }

  return false;
}

export function logout() {
  setSession(null);
}
