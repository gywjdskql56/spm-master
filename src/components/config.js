export const targetUrl = "https://a2a3-211-178-9-143.ngrok-free.app/api";
export const weburl = 'http://localhost:3000';

export const getAuth = async () => {
  const auth = await fetch(targetUrl+"/members/auth",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  console.log(auth);
  const auth_data = await auth.json();
  console.log(auth_data.data);

  return [auth.status, auth_data.data];
  }

