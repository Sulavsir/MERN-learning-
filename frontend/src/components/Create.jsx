import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();

  console.log(name, email, gender);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, gender };

    try {
      const user = await fetch('http://localhost:5000/api/user/', {
        method: 'POST',
        body: JSON.stringify(addUser),
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      const result = await user.json();

      if (!user.ok) {
        console.log(result.error);
      } else {
        console.log(result);
        setName("")
        setEmail("")
        setGender("")
        navigate("/all")

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='Container my-2'>
      <h2 className='text-center'>Enter the data </h2>

      <div className='mb-3'>
        <label className='form-label'>Name</label>
        <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Email address</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className='mb-3'>
          <label className='form-label'>Gender</label>
          <input type='text' className='form-control' value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
