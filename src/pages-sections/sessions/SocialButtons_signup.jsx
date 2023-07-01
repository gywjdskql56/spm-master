import { Fragment } from "react";
import { Box, Button, Divider } from "@mui/material";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import GoogleLogin from "react-google-login";
import { targetUrl } from "components/config";

//import { GoogleLogin, GoogleOauthProvider } from '@react-oauth/google';
// =======================================

// =======================================

const SocialButtons = props => {
  const REST_API_KEY = "17d25a2249fa39f009ca9310359a919a";
  const REDIRECT_URI = "https://ac31-211-178-9-143.ngrok-free.app/login";
//  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  function onClick(){
      console.log('clicked!')
  }
    const componentClicked = () => {
    console.log("clicked");
  };

  const responseFacebook = (response) => {
    const { id, email } = response; //페이스북 응답객체에서 id와 email을 할당한 후
    oAuthLoginHandler(Number(id), email);  // props로 내려준 oAuthLoginHandler라는 함수에 인자로 넘겨준다.
  };
  const FACEBOOK_APP_ID = '1446552009504968'
  const responseGoogle = async(response) => {
   console.log(response);
   console.log("responseGoogle")
   const { googleId, profileObj : { email, name } } = response;
  }

  return <Fragment>
      <Box mb={3} mt={3.8}>
        <Box width="200px" mx="auto">
          <Divider />
        </Box>

        <FlexBox justifyContent="center" mt={-1.625}>
          <Box color="grey.600" bgcolor="background.paper" px={2}>
            or
          </Box>
        </FlexBox>
      </Box>

      {/*<Button className="facebookButton" size="medium" onClick={() =>
          FacebookLoginClient.login(console.log, {
            scope: 'email',
          })
        } fullWidth sx={{
      height: 44
    }}>
        <Image src="/assets/images/icons/facebook-filled-white.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          페이스북으로 로그인
        </Box>
      </Button>*/}


          <FacebookLogin
      appId={FACEBOOK_APP_ID} // 페이스북 앱 등록 후, 생성되는 앱 아이디를 넣어준다.
      autoLoad={false} // 자동 실행 여부를 정해줄 수 있다.
      fields="name,email,picture" // fields 설정
      callback={responseFacebook}

      render={(renderProps) => (
      <Button className="facebookButton" size="medium" onClick={renderProps.onClick} fullWidth sx={{
      height: 44
    }}>
        <Image src="/assets/images/icons/facebook-filled-white.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          Sign up with Facebook
        </Box>
      </Button>
      )}
    ></FacebookLogin>

    <a href={targetUrl+"/oauth2/authorization/facebook"}>
    <Button className="facebookButton" size="medium" fullWidth sx={{
      height: 44
    }}>
      <Image src="/assets/images/icons/facebook-filled-white.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          Sign up with Facebook
        </Box>
      </Button>
    </a>

{/*<FacebookLogin
  appId="1446552009504968"
  style={{
    backgroundColor: '#4267b2',
    color: '#fff',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
  }}
/>

    {/*<FacebookLogin
      appId="1446552009504968"
      onSuccess={(response) => {
        console.log('Login Success!');
        console.log('id: ', response.id);
      }}
      onFail={(error) => {
        console.log('Login Failed!');
        console.log('status: ', error.status);
      }}
      onProfileSuccess={(response) => {
        console.log('Get Profile Success!');
        console.log('name: ', response.name);
      }}
    />*/}
    {/*<a href={KAKAO_AUTH_URL}>
          <Button className="kakaoButton" size="medium" onClick={() =>
          console.log('clicked')
        } fullWidth sx={{
      height: 44
    }}>
        <Image style={{ width: 20, height: 20 }} src="/assets/images/icons/kakao2.png" alt="kakao" />
        <Box fontSize="12px" ml={1}>
          Sign up with KakaoTalk
        </Box>
      </Button>
      </a>*/}

      {/*<Button className="googleButton" size="medium" fullWidth sx={{
      height: 44
    }}>
        <Image src="/assets/images/icons/google-1.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          Sign up with Google
        </Box>
      </Button>
      {/*<GoogleOauthProvider clientId={'1098622404399-oi7u4rfaa8ri99aj8pknq2lh87d88s14.apps.googleusercontent.com'}>
      <GoogleLogin
         onSuccess={(res)=>{console.log(res)}}
         onFailure={(err)=>{console.log(err)}}
      />
      </GoogleOauthProvider>
      <GoogleLogin
      clientId={'1098622404399-oi7u4rfaa8ri99aj8pknq2lh87d88s14.apps.googleusercontent.com'}
      onSuccess={responseGoogle}
      responseType={"id_token"}
      accessType={"offline"}
      redirectUri={'http://localhost:3000/signup'}
      render={(renderProps) => (
            <Button className="googleButton" size="medium" fullWidth onClick={renderProps.onClick} sx={{
                height: 44
            }}>
        <Image src="/assets/images/icons/google-1.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          Sign up with Google
        </Box>
      </Button>
        )}
  />*/}

  <a href={targetUrl+"/oauth2/authorization/google"}>
    <Button className="googleButton" size="medium" fullWidth sx={{
                height: 44
            }}>
        <Image src="/assets/images/icons/google-1.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          Sign up with Google
        </Box>
    </Button>
  </a>
    </Fragment>;
};
export default SocialButtons;