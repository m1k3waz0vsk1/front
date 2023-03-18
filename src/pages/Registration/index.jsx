import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
     register,
     handleSubmit,
     setError,
     formState: {errors, isValid}
    } = useForm({
    defaultValues: {
      fullName: 'Олекса Гончар',
      email: 'og@gmail.com',
      password: '12345',
    },
    mode: "onChange",
  });

  if(isAuth) {
    return <Navigate to='/'/>;
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Неможливо зареєструватись!');
    }
    
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Реєстрація
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Повне ім'я"
          error = {Boolean(errors.fullname?.message)}
          type="fullname"
          helperText = {errors.fullname?.message}
          {...register('fullName', {required: "Вкажіть ім'я!"})}
          fullWidth
        />
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
          fullWidth
        />
        <Button disabled={ !isValid } type="submit" size="large" variant="contained" fullWidth>
          Зареєструватись
        </Button>
      </form>
    </Paper>
  );
};
