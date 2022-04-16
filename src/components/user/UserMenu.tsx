import { IconButton, Menu, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ApplicationState } from '../../store/types'

const UserMenu = ({ children }: any) => {
  const { user } = useSelector<RootState, ApplicationState>((state) => state.application)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle /> <Typography>{user.name}</Typography>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children({ handleClose })}
      </Menu>
    </div>
  )
}

export default UserMenu
