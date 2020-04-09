export const fetchToChangeAccountInfo = async (
  login,
  userName,
  userFamilyName,
  userMiddleName,
  userEmail,
  userInfo,
  userBirthdate
) => {
  let response = await fetch('/changeinfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset = utf-8' },
    body: JSON.stringify({
      login,
      userName,
      userFamilyName,
      userMiddleName,
      userEmail,
      userInfo,
      userBirthdate
    }),
  });
  let resp = await response.json();
  return resp;
};
