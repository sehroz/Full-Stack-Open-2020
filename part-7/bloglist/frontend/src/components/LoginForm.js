import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { logout } from '../reducers/loginReducer'
import { addNoti } from '../reducers/notiReducer'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Notifcation } from '.'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?quote)',
    backgroundRepeat: 'no-repeat',
    filter: 'grayscale(100%)',
    backgroundColor: theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    border: '1px solid white',
    color: 'white',
    borderRadius: '50px',
    background: 'silver',
  },
  signin: {
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    background: 'black',
  },
  formf: {
    color: 'white',
    borderRadius: '50px',
    background: 'black',
    display: 'grid',
    justifyContent: 'center',
    '& .Mui-focused': {
      color: 'silver',
      fontWeight: 'bold',
    },
  },
  formT: {
    color: 'white',
  },

  multilineColor: {
    color: 'grey ',
  },
  floatingLabelFocusStyle: {
    color: 'white',
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
    borderRadius: '50px',
  },
}))

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()
  const handleL = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
  }

  const handleLogin = async (login) => {
    try {
      await props.login({
        username: login.username,
        password: login.password,
      })

      props.addNoti('Logged In!', 5)
    } catch (error) {
      props.addNoti(`${error.response.data.error}`, 5)
    }
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={12} md={12} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        component={Paper}
        elevation={6}
        className={classes.signin}
        square
      >
        <div className={classes.paper}>
          <Typography component='h1' variant='h5' className={classes.formT}>
            Welcome!
          </Typography>
          <form className={classes.form} onSubmit={handleL} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              type='text'
              id='username'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
              fullWidth
              label='Username'
              autoFocus
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
                className: classes.multilineColor,
              }}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              className={classes.formf}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              type='password'
              id='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
              label='Password'
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
                className: classes.multilineColor,
              }}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              className={classes.formf}
              autoComplete='current-password'
            />

            <Button
              fullWidth
              id='login-button'
              type='submit'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Notifcation />
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = {
  login,
  logout,
  addNoti,
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm
