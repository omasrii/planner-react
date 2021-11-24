import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SwipeableTemporaryDrawer from './Drawer'
import LoginDialog from './user/LoginDialog'
import SignupDialog from './user/SignupDialog'

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
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
    </Box>
  )
}

export default Header
