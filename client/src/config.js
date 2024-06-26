// src/config.js
const api = process.env.REACT_APP_API || 'http://127.0.0.1:8800/api';
const uploads = process.env.REACT_APP_UPLOADS || 'http://127.0.0.1:8800/uploads';


const config = {
  api,
  uploads,
  header: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

  },
  formdataheader: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

  },
  blobheader: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    };

  },
};

export default config;