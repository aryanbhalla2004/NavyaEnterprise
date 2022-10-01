import React, {useEffect, useState} from 'react'
import { Route, Navigate, useNavigate, Routes } from 'react-router-dom';
import {firebase, auth, db} from './util/Firebase'
import { AnimatePresence } from 'framer-motion';
import { Login } from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sales from './Pages/Dashboard/Sales/Sales';
import "./App.css";
import SalesAdd from './Pages/Dashboard/Sales/SalesAdd';
import SalesEdit from './Pages/Dashboard/Sales/SalesEdit'
import SaleView from './Pages/Dashboard/Sales/SalesView';
import DashboardHome from './Pages/Dashboard/DashboardHome';

const App = () => {
  const history = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [ExtraInfo, setExtraInfo] = useState();
  const [SalesPost, setSalesPost] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    db.collection("ExtraInfo").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setExtraInfo(tempList[0]);
    });
  }, []);

  useEffect(() => {
    db.collection("Sales").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push({data: doc.data(),id : doc.id});
      });
      setSalesPost(tempList);
    });
  }, [])

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const add = async (type,obj) => {
    try {
      await firebase.firestore().collection(type).doc().set(obj);
    } catch(e) {
      return e.message
    } 
  }

  const edit = async (obj,type,id) => {
    try {
      await firebase.firestore().collection(type).doc(id).update(obj);
    } catch(e) {
      return e.message
    } 
  }

  const del = async (type, id) => {
    try {
      await firebase.firestore().collection(type).doc(id).delete();
    } catch(e) {
      return e.message
    } 
  }

  const getData = async (from) => {
    const cityRef = firebase.firestore().collection(from);
    
    cityRef.onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        let info = doc.data();
        let id = doc.id;
        items.push({...info, id});  
      });
      return items
    });
  }


  const logout = () => {
    auth.signOut().then((res) => {
      setCurrentUser(null);
      history("/");
      return res;
    }).catch((err) => {
      return err;
    });
  };


  return (
    <> 
    {!loading &&
      <AnimatePresence>
        <Routes>
          <Route index element={currentUser ? <Navigate to="/dashboard"/> : <Login Login={login}/>}/>

          <Route path='dashboard' element={<Dashboard currentUser={currentUser} del={del} logout={logout}/>}>
            <Route index element={<DashboardHome SalesPost={SalesPost}/>}/>
            <Route path="bill-of-sale" element={<Sales/>}/>
            <Route path="bill-of-sale/:id" element={<SaleView/>}/>
            <Route path="bill-of-sale/add" element={<SalesAdd ExtraInfo={ExtraInfo} SalesPost={SalesPost} edit={edit} add={add}/>}/>
            <Route path="bill-of-sale/edit/:id" element={<SalesEdit ExtraInfo={ExtraInfo} SalesPost={SalesPost} edit={edit} add={add}/>}/>
            <Route path="setting" element={<h1>Home</h1>}/>
          </Route>

        </Routes>
      </AnimatePresence> 
      }
    </>
  )
}

export default App;