export const fetchToLogin = async (
login, password,
) => {
  let response = await fetch("/login", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset = utf-8' },
    body: JSON.stringify({
      login: login,
      password: password
    }),
  })
  let resp = await response.json();
  return resp;
};
