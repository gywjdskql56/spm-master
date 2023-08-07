import React, { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { H6, Small } from "components/Typography";
import { targetUrl } from "components/config";

// styled components
const Divider = styled(Box)(({
  theme
}) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`
}));
const AccountPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = event => setAnchorEl(event.currentTarget);
  function Logout(){
    console.log('logout')
    fetch(targetUrl+"/logout",{
          method: 'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }}).then((response) =>
        response.json())
        .then((data) =>
        {console.log(data)
        if (data.status=='success'){
            if (typeof window !== "undefined") {
                window.alert("로그아웃에 성공했습니다.")
                window.location.href =  "/"
                sessionStorage.removeItem('id')
            }
        } else {
            if (typeof window !== "undefined") {
                window.alert("로그아웃에 실패했습니다. 다시 시도해주세요.")
                window.location.reload()
            }
        }
        });
  }
  return <Box>
      <IconButton sx={{
      padding: 0
    }} aria-haspopup="true" onClick={handleClick} aria-expanded={open ? "true" : undefined} aria-controls={open ? "account-menu" : undefined}>
        <Avatar alt="Remy Sharp" src="/assets/images/avatars/001-man.svg" />
      </IconButton>

      <Menu open={open} id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose} transformOrigin={{
      horizontal: "right",
      vertical: "top"
    }} anchorOrigin={{
      horizontal: "right",
      vertical: "bottom"
    }} PaperProps={{
      elevation: 0,
      sx: {
        mt: 1,
        boxShadow: 2,
        minWidth: 200,
        borderRadius: "8px",
        overflow: "visible",
        border: "1px solid",
        borderColor: "grey.200",
        "& .MuiMenuItem-root:hover": {
          backgroundColor: "grey.200"
        },
        "&:before": {
          top: 0,
          right: 14,
          zIndex: 0,
          width: 10,
          height: 10,
          content: '""',
          display: "block",
          position: "absolute",
          borderTop: "1px solid",
          borderLeft: "1px solid",
          borderColor: "grey.200",
          bgcolor: "background.paper",
          transform: "translateY(-50%) rotate(45deg)"
        }
      }
    }}>
        <Box px={2} pt={1}>
          <H6>{typeof window !== 'undefined'? sessionStorage.getItem('id') : "USER"}</H6>
          <Small color="grey.500">{typeof window !== 'undefined'? sessionStorage.getItem('type') : "ADMIN"}</Small>
        </Box>

        <Divider />
        {/*<MenuItem>마이 페이지</MenuItem>
        <MenuItem>내 주문</MenuItem>
        <MenuItem>설정</MenuItem>

        <Divider />*/}
        <MenuItem onClick={()=>Logout()}>로그아웃</MenuItem>
      </Menu>
    </Box>;
};
export default AccountPopover;