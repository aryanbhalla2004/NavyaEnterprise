import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../../util/Firebase";
import "./Sales.css";
import { print } from '../../../util/htmlFile';
import moment from 'moment/moment';

const SaleView = () => {
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    firebase.firestore().collection('Sales').doc(id).get()
    .then((docRef) =>  {
      setListing(docRef.data());
    });
  }

  const getSubTotal = () => {

  }

  const getTotal = (gst, pst) => {
    let totalValue = 0;
    
    //! total value before taxes (product + warranty + admin fee)
    listing && listing.products.forEach(element => {
      totalValue += parseInt(element.total);
    });

    //! Total GST tax on total value
    // let gstCost = parseInt(totalValue) * 0.05;
    // //! Total PST tax on total value
    // let pstCost =  parseInt(totalValue) * 0.07;

    // if(gst)
    //   totalValue += gstCost

    // if(pst && listing.pst === "true")
    //   totalValue += pstCost

    return totalValue.toFixed(2);
  }

  const getIGST = () => {
    let totalValue = 0;
    
    //! total value before taxes (product + warranty + admin fee)
    listing && listing.products.forEach(element => {
      totalValue += parseInt(element.total);
    });

    return (totalValue * 0.18).toFixed(2);
  }

  const get9 = () => {
    let totalValue = 0;

    listing && listing.products.forEach(element => {
      totalValue += parseInt(element.total);
    });

    return (totalValue * 0.09).toFixed(2);
  }

  const GenerateFile = () => {
    setLoading(true);
    print()
    setLoading(false);
  }
  
  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>View Sale</h3>
          <div className='d-flex'>
            <Link to="/dashboard/bill-of-sale/" className="btn-general primary-btn mr-3"><i class="bi bi-arrow-left"></i> Back</Link>
            <Link to={`/dashboard/bill-of-sale/edit/${id}`} className="btn-general mr-3">Edit <i class="bi bi-binoculars"></i> </Link>
            <button className="btn-general edit-button" onClick={GenerateFile}>{loading ? <div class="spinner-border text-light" role="status"></div> : <><i class="bi bi-file-arrow-down"></i>  Download</>}</button>
          </div>
        </div>
        <section className="card card-light card-body border-0 shadow-sm p-4 mt-5 pdf-file-download" id="basic-info ">
          <div class="header-continer">
            <div class="content-sizing header-content-wrapper">
              <p className='pdf-edit-title-small'>GSTIN: 03BEBPK2312D1ZG</p>
              <p className='pdf-edit-title-small'>JAI MATA DI</p>
              <p className='pdf-edit-title-small'>M. 70094-70846</p>
            </div>
          </div>
          <div class="logo-tag-line">
            <h1>NAVYA ENTERPRISES</h1>
            <p className='pdf-edit-title-small'>DEALS IN: ALL KINDS OF QUALITY NUTS, BOLTS & WASHERS</p>
          </div>
          <div class="header-title-info">
            <p className='pdf-edit-title-small'>CHOPRA STREET, AHMEDGARH-148021, MALERKOTLA, PUNJAB</p>
          </div>
          <div class="custer-info-box">
            <div class="content-sizing custer-info-wrapper">
              <div class="left-side">
                <h3 className='adGap-Between pdf-edit-title-small remove-tp-b-pad'><div>To M/s. <span>{listing && listing.ms}</span></div> <div>State Code. <span>{listing && listing.stateCode}</span></div></h3>
                <h3 className='adGap-Between pdf-edit-title-small remove-tp-b-pad'><div>Party's GSTIN NO. <span>{listing && listing.partyGST}</span></div> <div>PAN No. <span>{listing && listing.partyGST.slice(2).slice(0, -1).slice(0, -1).slice(0, -1)}</span></div></h3>
              </div>
              <div class="left-side">
                <h3 className='pdf-edit-title-small remove-tp-b-pad'>Bill No. <span>{listing && listing.invoice}</span></h3>
                <h3 className='pdf-edit-title-small remove-tp-b-pad'>Dated: <span>{listing && moment(listing.date).format("YYYY-MM-DD")}</span></h3>
              </div>
            </div>
          </div>
          <div class="custer-info-box remove-border-bottom">
            <div class="content-sizing three-box-fit">
              <div class="transport-side">
                  <p className='pdf-edit-title-small remove-tp-b-pad'>Transport: <span>{listing && listing.transport ? listing.transport : "N/A"}</span></p>
                  <p className='pdf-edit-title-small remove-tp-b-pad'>E-WAY BILL: <span>{listing && listing.ewaybill ? listing.ewaybill : "N/A"}</span></p>
                  <p className='pdf-edit-title-small remove-tp-b-pad'>PVT-MARKA: <span>{listing && listing.pvtMarka ? listing.pvtMarka : "N/A"}</span></p>
              </div>
            </div>
          </div>
          <div class="custer-info-box">
            <div class="content-sizing three-box-fit">
              <div className='full-width-col'>
                <div className='pdf-edit-title-small'>Party's Address. <span>{listing && listing.address}</span></div>
              </div>
            </div>
          </div>
          <div class="custer-info-box">
            <div class="content-sizing custer-info-items remove-padding-tops-item-pdf">
              <ul className='products-bill-of-sale' >
                {listing && listing.products.map((item, index) => (
                  <li className='remove-padding-tops-item-pdf'>
                    <div className='item-size-pdf'>
                      <span>No.</span>
                      {index + 1}
                    </div>
                    <div className='item-size-pdf'> 
                      <span>Name of Product / Service</span>
                      {item && item.name}
                    </div>
                    <div className='item-size-pdf'>
                      <span>HSN Code</span>
                      {item && item.hsn}
                    </div>
                    <div className='item-size-pdf'>
                      <span>Quantity</span>
                      {item && item.qt}
                    </div>
                    <div className='item-size-pdf'>
                      <span>UNIT</span>
                      {item && item.unit ? item.unit : "N/A"}
                    </div>
                    <div className='item-size-pdf'>
                      <span>Rate</span>
                      &#8377; {item && parseFloat(item.rate).toFixed(2)}
                    </div>
                    <div className='item-size-pdf'>
                      <span>Amount</span>
                      &#8377; {item && parseFloat(item.total).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="content-bill-of-sale-info">
            <div class="content-sizing content-bill-of-sale-wrapper">
              <div class="left-side-info">
                <div className='bank-sign'>
                  <div className='bank-info'>
                    <p className='pdf-edit-small-not'><span>BANK:</span> HDFC BANK, AHMEDGARH</p>
                    <p className='pdf-edit-small-not'><span>A/C:</span> 50200035289649</p>
                    <p className='pdf-edit-small-not'><span>IFSC CODE:</span> HDFC 0001836</p>
                  </div>
                  <div className='signature'>
                    <h2 className='pdf-edit-title-small'>For NAVYA ENTERPRISES</h2>
                    <p className='pdf-edit-title-small'>Auth: Signatory</p>
                  </div>
                </div>

                <div className='discla'>
                  <p className='pdf-edit-title-small'>1. Interest will be charged @ 24% if the bill is not paid within 45 days.</p>
                  <p className='pdf-edit-title-small'>2. Our responsibility eases when the goods leave our godown under Rly/TPT receipt.</p>
                  <p className='pdf-edit-title-small'>3. All payment show be made bt A/c Payee's Cheque or draft only.</p>
                  <p className='pdf-edit-title-small'>4. All Disputes arising out of this transaction are subject to Jurisdiction of Malerkotla Courts.</p>
                </div>
              </div>
              <div class="right-side-sale">
                <div class="spacing-top-bottom">
                  <ul class="total-price">
                    <li className='remove-tp-b-pad'>
                      <h3 className='pdf-edit-title-small'>Sub Total</h3>
                      <span className='pdf-edit-title-small'>&#8377; {getTotal(false, false)}</span>
                    </li>
                    <li className='remove-tp-b-pad'>
                      <h3 className='pdf-edit-title-small'>CGST</h3>
                      <span className='pdf-edit-title-small'>&#8377; {listing && listing.stateCode === "03" ? get9() : "0.00"}</span>
                    </li>
                    <li className='remove-tp-b-pad'>
                      <h3 className='pdf-edit-title-small'>SGST</h3>
                      <span className='pdf-edit-title-small'>&#8377; {listing && listing.stateCode === "03" ? get9() : "0.00"}</span>
                    </li>
                    <li className='remove-tp-b-pad'>
                      <h3 className='pdf-edit-title-small'>IGST (18%)</h3>
                      <span className='pdf-edit-title-small'>&#8377; {listing && listing.stateCode !== "03" ? getIGST() : "0.00" }</span>
                    </li>
                    <li className='remove-tp-b-pad'>
                      <h3 className='pdf-edit-title-small'>Cartage:</h3>
                      <span className='pdf-edit-title-small'>0.00</span>
                    </li>
                    <li className='remove-tp-b-pad'>
                      <h2 className='pdf-edit-title-small'>Total:</h2>  
                      <span className='pdf-edit-title-small'>&#8377; {parseFloat(parseFloat(getTotal(false, false)) + parseFloat(listing && listing.stateCode === "03" ? (get9() * 2) : getIGST())).toFixed(2)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


export default SaleView;