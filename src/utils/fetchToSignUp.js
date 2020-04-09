export const fetchToSignUp = async (
  login, email, password,
  ) => {
    let response = await fetch("/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset = utf-8' },
      body: JSON.stringify({
        login, email,
        password
      }),
    })
    let resp = await response.json();
    return resp;
  };
