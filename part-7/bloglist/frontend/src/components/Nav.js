import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'

import Typography from '@material-ui/core/Typography'
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'silver',
  },
  butto: {
    padding: '1rem',
  },
}))

const Nav = ({ handleLogout, user }) => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <Button className={classes.butto} color='inherit'>
            <Link to='/'>blogs</Link>
          </Button>
          <Button className={classes.butto} color='inherit'>
            <Link to='/users'>users</Link>
          </Button>

          <Typography color='inherit'>
            <>{user.username} logged in</>
          </Typography>

          <Button className={classes.butto} onClick={handleLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Nav
