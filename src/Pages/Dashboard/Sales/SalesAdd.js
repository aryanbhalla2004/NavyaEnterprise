import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SalesAdd = (props) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    stateCode: "",
    date: new Date().toLocaleDateString("en-US"),
    ms: "",
    partyGST: '',
    status: "Pending",
    address: "",
    invoice:(parseInt(props.ExtraInfo && props.ExtraInfo.data.totalInvoice) + 1),
    products: [{id: "", name: "", hsn: "", qt: "0", rate: "0", total: "0"}],
    unit: '',
    pvtMarka: '',
    ewaybill: '',
    transport: '',
  });

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  const addRow = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, products: [...userInput.products, {id: "", name: "", hsn: "", qt: "0", rate: "0", total: "0"}]
    }));
  }

  const arrSplicer = (itm) => {
    let arr = userInput.products;

    arr.splice(itm, 1);

    setUserInput(prevInput => ({...prevInput, products: arr}));
  }
  
  const onSubmit = async (e) => {
    //! Required
    e.preventDefault();
    if(userInput.stateCode != "" && userInput.ms != "" && userInput.partyGST != "" && userInput.address != "") {
      var item = userInput;
      updateInvoice();

      try {
        let userDetails = await props.add("Sales", item);
        history('/dashboard/bill-of-sale');
      } catch(e){
        setError(e.message);
      }
    }
    
    
  }

  const updateInvoice = async(e) => {
    console.log(props.ExtraInfo);
    var item = { totalInvoice: userInput.invoice};
    try{
      let d = await props.edit(item,"ExtraInfo",props.ExtraInfo.id);
    }
    catch(e){
      setError(e.message);
    }
  }

  const editSingle = (e) => {
    const arr = userInput.products;
    arr[e.target.id][e.target.name] = e.target.value;
    
    setUserInput(prevInput => ({
      ...prevInput, products: arr
    }));

    
    if(e.target.name == "qt" || e.target.name == "rate") {
      if(arr[e.target.id]["qt"] !== "" && arr[e.target.id]["rate"] !== "") {
        arr[e.target.id]["total"] =  parseInt(arr[e.target.id]["qt"]) * parseInt(arr[e.target.id]["rate"])
      }
    }
    
   
  }
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Create New Sales</h3>
          <Link to="/dashboard/bill-of-sale" className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          <div className="row form-row d-flex">
            <h2 className="h4 mb-2">Sales Details</h2>
            <button type="submit" onClick={onSubmit}className="btn-general primary-btn blue mb-2" href="/dashboard/trucks"> Submit</button>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">To M/s:<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="dealorNum" name="ms" value={userInput.iwe} type="text" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Bill No. #<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="stock" value={userInput.invoice} onChange={updateUserInput} disabled/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Payment Status<span>*</span></label>
              <select className="form-control form-control-md form-control-dark" id="type" name="status" required onChange={updateUserInput}>
                <option value="" disabled selected >Select</option>
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Party GSTIN No.<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="address" name="partyGST" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">State Code<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" name="stateCode" type="text" onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Date<span></span></label>
              <input className="form-control form-control-md form-control-dark" type="date" value={moment(userInput.date).format("YYYY-MM-DD")} name="date" onChange={updateUserInput} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="marka">PVT-MARKA.<span></span></label>
              <input className="form-control form-control-md form-control-dark" id="marka" type="text" name="pvtMarka" value={userInput.pvtMarka} onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="way-bill">E-WAY Bill<span></span></label> 
              <input className="form-control form-control-md form-control-dark" id="way-bill" type="text" name="ewaybill"  value={userInput.ewaybill} onChange={updateUserInput} />
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="tr">Transport<span></span></label>
              <input className="form-control form-control-md form-control-dark" id="tr" type="text" name="transport" value={userInput.transport} onChange={updateUserInput} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="c-name">Party Address<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="address" name="address" onChange={updateUserInput}/>
            </div>
          </div>
          <div className="row form-row mt-3 d-flex">
            <h2 className="h4 mb-2 mt-4">Products Details</h2>
            <button type="button" onClick={addRow} className="btn-general blue primary-btn"> Add Row</button>
          </div>
          {userInput.products && userInput.products.map((item, index) => (
            <div className="row mt-3" key={index}>
              <div className="col-1 special-col">
              <div onClick={() => {arrSplicer(index)}} className="btn-general primary-btn special-trash">X</div>
              <div>
                <label className="form-label text-dark" htmlFor="c-name">No.<span>*</span></label>
                <input className="form-control form-control-md form-control-dark" id={index} value={index + 1} name="id" type="make" onChange={editSingle} disabled/>
                </div></div>
              <div className="col-3">
                <label className="form-label text-dark" htmlFor="c-name">Name of Product / Service<span>*</span></label>
                <input className="form-control form-control-md form-control-dark" id={index} name="name" type="text" value={item.name} onChange={editSingle}/>
              </div>
              <div className="col-2">
                <label className="form-label text-dark" htmlFor="c-name">HSN Code<span>*</span></label>
                <input className="form-control form-control-md form-control-dark" id={index} name="hsn" type="number" value={item.hsn} onChange={editSingle} />
              </div>
              <div className="col-1">
                <label className="form-label text-dark" htmlFor="c-name">Quantity<span>*</span></label>
                <input className="form-control form-control-md form-control-dark" id={index} name="qt" type="number" value={item.qt} onChange={editSingle}  />
              </div>
              <div className="col-1">
                <label className="form-label text-dark" htmlFor="c-name">UNIT<span>*</span></label>
                <input className="form-control form-control-md form-control-dark" id={index} name="unit" type="text" value={item.unit} onChange={editSingle}  />
              </div>
              <div className="col-2">
                <label className="form-label text-dark" htmlFor="c-name">Rate<span>*</span></label>
                <input className="form-control form-control-md form-control-dark" id={index} name="rate" type="number" value={item.rate} onChange={editSingle}  />
              </div>
              <div className="col-2">
                <label className="form-label text-dark" htmlFor="c-name">Amount<span>*</span></label>
                <input className="form-control form-control-md form-control-dark" id={index} name="total" type="number" value={item.total} disabled/>
              </div>
            </div>
          ))}

        </form> 
      </div>
    </div>
  )
}


export default SalesAdd;