import React, { useState } from 'react'


export const Logout = (props) => {
  const [loading, setLoading] = useState(false);

  const Logout = async () => {
    await setLoading(true);
    await props.logout();
    await setLoading(false);
    props.setLogoutBox(false);
  }

  return (
    <div className='overlay-tran-container'>
      <div className='diloag-box-center al-center'>
      {!loading ? <>
      <i class="bi bi-exclamation-circle"></i>
        <h2>Are you sure you want to leave?</h2>
        <p className='mt-2'>You won't be able to recover this item.</p>

        <div className='button-in-dialog mt-4'>
          <a className='btn-general' onClick={() => props.setLogoutBox(false)}>Cancel</a>
          <a className='btn-general btn-danger' onClick={Logout}>Logout</a>
        </div>
        </> : <div className='centering-messages mt-5'><div class="spinner-border" role="status"></div><p>Please Wait</p></div>}
      </div>
      
    </div>
  )
}

export default Logout