import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginFacebookCallback } from '../../redux/slice/authSlice';
import { useSearchParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const FacebookCallback = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  useEffect(() => {
    code && dispatch(loginFacebookCallback(code))
      .unwrap()
      .then(() => {
        window.close();
      })
  }, [code]);
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default FacebookCallback;