// export const targetUrl = "https://dc77-115-93-67-106.ngrok-free.app/api";
 export const targetUrl = "https://allmeditrip.com/api";
// export const weburl = 'https://allmeditrip.com/';
// export const weburl = 'http://localhost:3000';
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
    if (auth_data.data[0]['authority']=="ROLE_GUEST"){
        return ["fail", ""];
    }
    else if (auth_data.data[0]['authority']=="ROLE_MEMBER"){
          window.sessionStorage.setItem('id',auth_data.data[0]['authority'])
          window.sessionStorage.setItem('type',auth_data.data[0]['authority'])
          }else if (auth_data.data[0]['authority']=="ROLE_VENDOR"){
          window.sessionStorage.setItem('id',auth_data.data[0]['authority'])
          window.sessionStorage.setItem('type',auth_data.data[0]['authority'])
    }else {
        window.sessionStorage.setItem('id',auth_data.data[0]['authority'])
        window.sessionStorage.setItem('type',auth_data.data[0]['authority'])
    }
    return ["success", auth_data.data[0]['authority']];
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

  export const getAuth_vendor = async () => {
  const auth = fetch(targetUrl+"/members/auth",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
        .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data.data);
        if (data.status=="success"){
    console.log(data.data[0]['authority'])
    if (data.data[0]['authority']=="ROLE_VENDOR"){
          window.sessionStorage.setItem('id',data.data[0]['authority'])
          window.sessionStorage.setItem('type',data.data[0]['authority'])
    }else {
        window.alert('Please login as Vendor. You do not have permission')
        window.location.href = "/"
    }
    }
   else {
    window.alert('Please login as Vendor. You do not have permission')
    window.location.href = "/"
   }})

  }


export const getAuthInfo = async () => {
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

