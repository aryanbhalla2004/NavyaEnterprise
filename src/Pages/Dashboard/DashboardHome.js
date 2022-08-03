import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {firebase} from "../../util/Firebase";

export const DashboardHome = (props) => {
  const [sales, setSales] = useState();
  useEffect(() => {
    fetch();
  }, [])

  const fetch = async () => {
    const cityRef = firebase.firestore().collection("Sales");
    cityRef.onSnapshot((querySnapShot) => {
      const items = [];
      querySnapShot.forEach((doc) => {
        let info = doc.data();
        let id = doc.id;
        items.push({...info, id});  
      });
      setSales(items)
    });
  }

  const getPending = () => {
    const pendingItems = sales && sales.filter(item => item.status === "Pending");
    return pendingItems && pendingItems.length
  }

  const getPaid = () => {
    const paidItems = sales && sales.filter(item => item.status === "Done");
    return paidItems && paidItems.length;
  }
  
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Welcome to Dashboard</h3>
          <div className='d-flex'>
            <Link to="/" className="btn-general primary-btn mr-3"><i class="bi bi-arrow-left"></i> Back to Home</Link>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 sec-response grid-box-dash" id="basic-info">
          <div className='single-block-dash'>
            <i class="bi bi-cash"></i>
            <div>
              <h3>{sales && sales.length}</h3>
              <p>Total Bill of Sales</p>
            </div>
          </div>

          <div className='single-block-dash'>
          <i class="bi bi-hourglass-split"></i>
            <div>
              <h3>{getPending()}</h3>
              <p>Total Pending Payment Sales</p>
            </div>
          </div>
          <div className='single-block-dash'>
          <i class="bi bi-check2-circle"></i>
            <div>
              <h3>{getPaid()}</h3>
              <p>Total Paid Payment Sales</p>
            </div>
          </div>
          
        </section>
      </div>
    </div>
  )
}

export default DashboardHome;