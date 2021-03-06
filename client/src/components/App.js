import React, { useContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import PostContext from '../state/context';
import reducer from '../state/reducer';

import logo from '../assets/logo.svg';

import Posts from './Posts.jsx';


// This is a function that doesn't export from component but is used within it.
const useAPI = endpoint => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => { // This function uses async to grab all things from provided endpoint
    const response = await axios.get(endpoint);
    try {
      setData(response.data); // It then uses the setData hook to set state equal to return from get
    }
    catch (error) { // Tried using this catch to understand why the occassional connection refused error. But didn't work
      console.log(error)
    }
  };

  return data;
};


const App = () => {
  const initialState = useContext(PostContext);
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const savedPosts = useAPI("http://localhost:4000/api/posts");

  useEffect(() => {
    dispatch({
      type: "GET_POSTS",
      payload: savedPosts
    });
  }, [savedPosts]);

  return (
    <PostContext.Provider value={{ state, dispatch }}>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Posts />

        </header>
      </div>

    </PostContext.Provider>
  );
}

export default App;
