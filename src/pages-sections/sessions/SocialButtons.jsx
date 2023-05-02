import { Fragment } from "react";
import { Box, Button, Divider } from "@mui/material";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';

// =======================================

// =======================================

const SocialButtons = props => {
  const REST_API_KEY = "17d25a2249fa39f009ca9310359a919a";
  const REDIRECT_URI = "https://ac31-211-178-9-143.ngrok-free.app/login";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  function onClick(){
      console.log('clicked!')
  }
    const componentClicked = () => {
    console.log("clicked");
  };
  const responseFacebook = response => {
    console.log(response);
  };

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

      <Button className="facebookButton" size="medium" onClick={() =>
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
      </Button>

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
    <a href={KAKAO_AUTH_URL}>
          <Button className="kakaoButton" size="medium" onClick={() =>
          console.log('clicked')
        } fullWidth sx={{
      height: 44
    }}>
        <Image style={{ width: 20, height: 20 }} src="/assets/images/icons/kakao2.png" alt="kakao" />
        <Box fontSize="12px" ml={1}>
          카카오톡으로 로그인
        </Box>
      </Button>
      </a>

      <Button className="googleButton" size="medium" fullWidth sx={{
      height: 44
    }}>
        <Image src="/assets/images/icons/google-1.svg" alt="facebook" />
        <Box fontSize="12px" ml={1}>
          구글로 로그인
        </Box>
      </Button>
    </Fragment>;
};
export default SocialButtons;