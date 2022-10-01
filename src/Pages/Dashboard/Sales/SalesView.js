import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {firebase} from "../../../util/Firebase";
import "./Sales.css";
import { print } from '../../../util/htmlFile'

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
              <p>GSTIN: 03BEBPK2312D1ZG</p>
              <p>JAI MATA DI</p>
              <p>M. 70094-70846</p>
            </div>
          </div>
          <div class="logo-tag-line">
            <h1>NAVYA ENTERPRISES</h1>
            <p>DEALS IN: ALL KINDS OF QUALITY NUTS, BOLTS & WASHERS</p>
          </div>
          <div class="header-title-info">
            <p>CHOPRA STREET, AHMEDGARH-148021, MALERKOTLA, PUNJAB</p>
          </div>
          <div class="custer-info-box">
            <div class="content-sizing custer-info-wrapper">
              <div class="left-side">
                <h3 className='adGap-Between'><div>To M/s. <span>{listing && listing.ms}</span></div> <div>State Code. <span>{listing && listing.stateCode}</span></div></h3>
                <h3 className='adGap-Between'><div>Party's GSTIN NO. <span>{listing && listing.partyGST}</span></div> <div>PAN No. <span>{listing && listing.partyGST.slice(2).slice(0, -1).slice(0, -1).slice(0, -1)}</span></div></h3>
              </div>
              <div class="left-side">
                <h3>Bill No. <span>{listing && listing.invoice}</span></h3>
                <h3>Dated: <span>{listing && listing.date}</span></h3>
              </div>
            </div>
          </div>
          <div class="custer-info-box">
            <div class="content-sizing custer-info-items">
              <ul className='products-bill-of-sale'>
                {listing && listing.products.map((item, index) => (
                  <li>
                    <div>
                      <span>No.</span>
                      {index + 1}
                    </div>
                    <div>
                      <span>Name of Product / Service</span>
                      {item && item.name}
                    </div>
                    <div>
                      <span>HSN Code</span>
                      {item && item.hsn}
                    </div>
                    <div>
                      <span>Quantity</span>
                      {item && item.qt}
                    </div>
                    <div>
                      <span>Rate</span>
                      &#8377; {item && parseInt(item.rate).toFixed(2)}
                    </div>
                    <div>
                      <span>Amount</span>
                      &#8377; {item && parseInt(item.total).toFixed(2)}
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
                    <p><span>BANK:</span> HDFC BANK, AHMEDGARH</p>
                    <p><span>A/C:</span> 50200035289649</p>
                    <p><span>IFSC CODE:</span> HDFC 0001836</p>
                  </div>
                  <div className='signature'>
                    <h2>For NAVYA ENTERPRISES</h2>
                    <p>Auth: Signatory</p>
                  </div>
                </div>

                <div className='discla'>
                  <p>1. Interest will be charged @ 24% if the bill is not paid within 45 days.</p>
                  <p>2. Our responsibility eases when the goods leave our godown under Rly/TPT receipt.</p>
                  <p>3. All payment show be made bt A/c Payee's Cheque or draft only.</p>
                  <p>4. All Disputes arising out of this transaction are subject to Jurisdiction of Malerkotla Courts.</p>
                </div>
              </div>
              <div class="right-side-sale">
                <div class="spacing-top-bottom">
                  <ul class="total-price">
                    <li>
                      <h3>Sub Total</h3>
                      <span>&#8377; {getTotal(false, false)}</span>
                    </li>
                    <li>
                      <h3>CGST</h3>
                      <span>&#8377; {listing && listing.stateCode === "03" ? get9() : "0.00"}</span>
                    </li>
                    <li>
                      <h3>SGST</h3>
                      <span>&#8377; {listing && listing.stateCode === "03" ? get9() : "0.00"}</span>
                    </li>
                    <li>
                      <h3>IGST (18%)</h3>
                      <span>&#8377; {listing && listing.stateCode !== "03" ? getIGST() : "0.00" }</span>
                    </li>
                    <li>
                      <h3>Cartage:</h3>
                      <span>0.00</span>
                    </li>
                    <li>
                      <h2>Total:</h2>  
                      <span>&#8377; {parseInt(parseInt(getTotal(false, false)) + parseInt(listing && listing.stateCode === "03" ? (get9() * 2) : getIGST())).toFixed(2)}</span>
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