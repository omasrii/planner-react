import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import styled from '@emotion/styled'
import SwipeableTemporaryDrawer from './Drawer'
import LoginDialog from './user/LoginDialog'
import SignupDialog from './user/SignupDialog'

const Header = () => {
  return (
    <AppBarContainer>
      <AppBar position="static">
        <Toolbar>
          <SwipeableTemporaryDrawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Training App (TBD)
          </Typography>
          <LoginDialog />
          <SignupDialog />
        </Toolbar>
      </AppBar>
    </AppBarContainer>
  )
}

export default Header

const AppBarContainer = styled.div({
  flexGrow: 1,
  position: 'fixed',
  zIndex: 1000,
  width: '-webkit-fill-available',
})
