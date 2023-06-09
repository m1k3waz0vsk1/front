import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
     register,
     handleSubmit,
     setError,
     formState: {errors, isValid}
    } = useForm({
    defaultValues: {
      
      email: 'info@gmail.com',
      password: '111111',
    },
    mode: "onChange",
  });

  if(isAuth) {
    return <Navigate to='/'/>;
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Неможливо авторизуватись!');
    }
    
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  //React.useEffect();

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        error = {Boolean(errors.email?.message)}
        type="email"
        helperText = {errors.email?.message}
        {...register('email', {required: 'Вкажіть пошту!'})}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="Пароль"
        error = {Boolean(errors.password?.message)}
        helperText = {errors.password?.message}
        {...register('password', {required: 'Вкажіть пароль!'})}
        fullWidth />
      <Button type='submit' size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};
