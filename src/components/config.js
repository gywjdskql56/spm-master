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
  const auth_data = await auth.json();
  if (auth_data.status=="success"){
    console.log(auth_data.data[0]['authority'])
    if (auth_data.data[0]['authority']=="ROLE_MEMBER"){
        const res = await fetch(targetUrl+"/members/myinfo",{
              method: 'GET',
              credentials : 'include',
              headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true,
          }})
          const data = await res.json();
          window.sessionStorage.setItem('id',data.data.email)
          window.sessionStorage.setItem('type',auth_data.data[0]['authority'])
          }else if (auth_data.data[0]['authority']=="ROLE_VENDOR"){
         const res = await fetch(targetUrl+"/vendor/myinfo",{
              method: 'GET',
              credentials : 'include',
              headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true,
          }})
          const data = await res.json();
          window.sessionStorage.setItem('id',data.data.email)
          window.sessionStorage.setItem('type',auth_data.data[0]['authority'])
    }else {
        window.sessionStorage.setItem('id',auth_data.data[0]['authority'])
        window.sessionStorage.setItem('type',auth_data.data[0]['authority'])
    }
    return ["success", ...auth_data.data];
    }
   else {
   console.log(auth_data);
   if (typeof window != 'undefined'){
     window.sessionStorage.removeItem('id')
     window.sessionStorage.removeItem('type')
   }
   return ["fail", ""];
   }
  }
