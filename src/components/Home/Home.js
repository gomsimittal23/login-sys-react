import React, { useRef, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, useAuth, updateName, upload } from '../../firebase';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const nameRef = useRef();
  const [currName, setCurrName] = useState();
  const [imgUrl, setImgUrl] = useState('https://mpchsschool.in/wp-content/uploads/2019/10/default-profile-picture.png');
  const [image, setImage] = useState();

  useEffect(() => {
    setCurrName(user?.displayName);
    
    if(user?.photoURL)
    {
      setImgUrl(user.photoURL);
    }
  }, [user])

  async function handleName(){
    setCurrName(nameRef.current.value);
    await updateName(user, nameRef.current.value);
  }

  const handleUploadImage = (e) => {
    if(e.target.files[0])
    {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  }

  const handleUpdateProfile = () => {
    upload(image, user, setImgUrl);
    // setTimeout(() => navigate("/"), 4000);
    // console.log('finish');
    // setImgUrl(user?.photoURL);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      alert("Logout error");
    }
  }

  const handleClick = () => {
    navigate('/signin');
  }

  return (
    <div>
      {
        user ? (
          <div className='contain'>
            <h2>User E-mail - {user?.email}</h2>
            <h2>Username - {currName}</h2>
            <input placeholder='Enter Name' className='name-input' ref={nameRef}/>
            <button onClick={handleName}>Update Name</button>
            <img src={imgUrl} alt='default'/>
            <input type='file' onChange={handleUploadImage} />
            <button onClick={handleUpdateProfile}>Update Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
          ): (
            <div className='contain'>
              <h3>You do not have access to the content. <br/> Please login to continue </h3>
              <button onClick={handleClick}>Login</button>
            </div>
          )
      }
    </div>
  )
}

export default Home;