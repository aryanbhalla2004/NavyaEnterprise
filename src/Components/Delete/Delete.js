import React, { useState } from 'react'
import "./Delete.css";

export const Delete = (props) => {
  const [loading, setLoading] = useState(false);
  const deleteItem = async () => {
    await setLoading(true);
    await props.del(props.deleteId.type, props.deleteId.id);
    await setLoading(false);
    props.setDeleteBox(false);
  }
  return (
    <div className='overlay-tran-container'>
      <div className='diloag-box-center'>
      {!loading ? <>
      <i class="bi bi-exclamation-circle"></i>
        <h2>Are you sure?</h2>
        <p>You won't be able to recover this item.</p>
        <div class="alert alert-warning mt-4 mb-4" role="alert">
          Deleting: {props.deleteId.title ? props.deleteId.title : props.deleteId.id} 
        </div>
        <div className='button-in-dialog'>
          <a className='btn-general' onClick={() => props.setDeleteBox(false)}>Cancel</a>
          <a className='btn-general btn-danger' onClick={deleteItem}>Delete</a>
        </div>
        </> : <div className='centering-messages mt-5'><div class="spinner-border" role="status"></div><p>Please Wait</p></div>}
      </div>
      
    </div>
  )
}

export default Delete;