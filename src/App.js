import React, { useRef, useState } from 'react'
import { CSVLink } from "react-csv";
import { getData } from './api';

import './style.css'

const App = () => {

  const sources = [
    {
      id: 'USDOT_Number',
      label: 'USDOT Number',
      type: 'number'
    },
    {
      id: 'Docket_Number',
      label: 'Docket Number',
      type: 'number'
    },
    {
      id: 'Legal_Name',
      label: 'Legal Name',
      type: 'text'
    },
    {
      id: 'DBA__Name',
      label: 'DBA Name',
      type: 'text'
    },
  ];

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [downloadedData, setDownloadedData] = useState([]);
  const [message, setMessage] = useState(null)
  const csvDownloadRef = useRef(null);

  let validate = false;

  if(data.Legal_Name || data.USDOT_Number) {
    validate = true
  };

  const headers = [
    {
      label: '_links/basics/href', key: '_links.basics.href'
    },
    {
      label: '_links/cargo carried/href', key: '_links.cargo carried.href'
    },
    {
      label: '_links/operation classification/href', key: '_links.operation classification.href'
    },
    {
      label: '_links.docket numbers.href', key: '_links.docket numbers.href'
    },
    {
      label: '_links/carrier active-For-hire authority/href', key: '_links.carrier active-For-hire authority.href'
    },
    {
      label: 'carrier/allowedToOperate', key: 'carrier.allowedToOperate'
    },
    {
      label: 'carrier/bipdInsuranceOnFile', key: 'carrier.bipdInsuranceOnFile'
    },
    {
      label: 'carrier/bipdInsuranceRequired', key: 'carrier.bipdInsuranceRequired'
    },
    {
      label: 'carrier/bipdRequiredAmount', key: 'carrier.bipdRequiredAmount'
    },
    {
      label: 'carrier/bondInsuranceOnFile', key: 'carrier.bondInsuranceOnFile'
    },
    {
      label: 'carrier/bondInsuranceRequired', key: 'carrier.bondInsuranceRequired'
    },
    {
      label: 'carrier/brokerAuthorityStatus', key: 'carrier.brokerAuthorityStatus'
    },
    {
      label: 'carrier/cargoInsuranceOnFile', key: 'carrier.cargoInsuranceOnFile'
    },
    {
      label: 'carrier/cargoInsuranceRequired', key: 'carrier.cargoInsuranceRequired'
    },
    {
      label: 'carrier/carrierOperation/carrierOperationCode', key: 'carrier.carrierOperation.carrierOperationCode'
    },
    {
      label: 'carrier/carrierOperation/carrierOperationDesc', key: 'carrier.carrierOperation.carrierOperationDesc'
    },
    {
      label: 'carrier/censusTypeId', key: ''
    },
    {
      label: 'carrier/commonAuthorityStatus', key: 'carrier.commonAuthorityStatus'
    },
    {
      label: 'carrier/contractAuthorityStatus', key: 'carrier.contractAuthorityStatus'
    },
    {
      label: 'carrier/crashTotal', key: 'carrier.crashTotal'
    },
    {
      label: 'carrier/dbaName', key: 'carrier.dbaName'
    },
    {
      label: 'carrier/dotNumber', key: 'carrier.dotNumber'
    },
    {
      label: 'carrier/driverInsp', key: 'carrier.driverInsp'
    },
    {
      label: 'carrier/driverOosInsp', key: 'carrier.driverOosInsp'
    },
    {
      label: 'carrier/driverOosRate', key: 'carrier.driverOosRate'
    },
    {
      label: 'carrier/driverOosRateNationalAverage', key: 'carrier.driverOosRateNationalAverage'
    },
    {
      label: 'carrier/ein', key: 'carrier.ein'
    },
    {
      label: 'carrier/fatalCrash', key: 'carrier.fatalCrash'
    },
    {
      label: 'carrier/hazmatInsp', key: 'carrier.hazmatInsp'
    },
    {
      label: 'carrier/hazmatOosInsp', key: 'carrier.hazmatOosInsp'
    },
    {
      label: 'carrier/hazmatOosRate', key: 'carrier.hazmatOosRate'
    },
    {
      label: 'carrier/hazmatOosRateNationalAverage', key: 'carrier.hazmatOosRateNationalAverage'
    },
    {
      label: 'carrier/injCrash', key: 'carrier.injCrash'
    },
    {
      label: 'carrier/isPassengerCarrier', key: 'carrier.isPassengerCarrier'
    },
    {
      label: 'carrier/issScore', key: 'carrier.issScore'
    },
    {
      label: 'carrier/legalName', key: 'carrier.legalName'
    },
    {
      label: 'carrier/mcs150Outdated', key: 'carrier.mcs150Outdated'
    },
    {
      label: 'carrier/oosDate', key: 'carrier.oosDate'
    },
    {
      label: 'carrier/oosRateNationalAverageYear', key: 'carrier.oosRateNationalAverageYear'
    },
    {
      label: 'carrier/phyCity', key: 'carrier.phyCity'
    },
    {
      label: 'carrier/phyCountry', key: 'carrier.phyCountry'
    },
    {
      label: 'carrier/phyState', key: 'carrier.phyState'
    },
    {
      label: 'carrier/phyStreet', key: 'carrier.phyStreet'
    },
    {
      label: 'carrier/phyZipcode', key: 'carrier.phyZipcode'
    },
    {
      label: 'carrier/reviewDate', key: 'carrier.reviewDate'
    },
    {
      label: 'carrier/reviewType', key: 'carrier.reviewType'
    },
    {
      label: 'carrier/safetyRating', key: 'carrier.safetyRating'
    },
    {
      label: 'carrier/safetyRatingDate', key: 'carrier.safetyRatingDate'
    },
    {
      label: 'carrier/safetyReviewDate', key: 'carrier.safetyReviewDate'
    },
    {
      label: 'carrier/safetyReviewType', key: 'carrier.safetyReviewType'
    },
    {
      label: 'carrier/snapshotDate', key: 'carrier.snapshotDate'
    },
    {
      label: 'carrier/statusCode', key: 'carrier.statusCode'
    },
    {
      label: 'carrier/totalDrivers', key: 'carrier.totalDrivers'
    },
    {
      label: 'carrier/totalPowerUnits', key: 'carrier.totalPowerUnits'
    },
    {
      label: 'carrier/towawayCrash', key: 'carrier.towawayCrash'
    },
    {
      label: 'carrier/vehicleInsp', key: 'carrier.vehicleInsp'
    },
    {
      label: 'carrier/vehicleOosInsp', key: 'carrier.vehicleOosInsp'
    },
    {
      label: 'carrier/vehicleOosRate', key: 'carrier.vehicleOosRate'
    },
    {
      label: 'carrier/vehicleOosRateNationalAverage', key: 'carrier.vehicleOosRateNationalAverage'
    },
    {
      label: 'carrier/censusTypeId/censusType', key: 'carrier.censusTypeId.censusType'
    },
    {
      label: 'carrier/censusTypeId/censusTypeDesc', key: 'carrier.censusTypeId.censusTypeDesc'
    },
    {
      label: 'carrier/censusTypeId/censusTypeId', key: 'carrier.censusTypeId.censusTypeId'
    },
    {
      label: 'carrier/carrierOperation', key: ''
    },
  ];

  const csvLink = {
    filename: 'file.csv',
    headers: headers,
    data: downloadedData
  };

  const exportDataCsv = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let currentData = [];
      if(data.USDOT_Number) {
        currentData = await getData(`${data.USDOT_Number}`);
        currentData && setDownloadedData([currentData]);
        console.log(currentData)
      }
      if(data.Legal_Name) {
        currentData = await getData(`name/${data.Legal_Name}`);
        setDownloadedData(currentData);
      }
      setTimeout(async () => {
        await csvDownloadRef.current.link.click();          
      }, 500)
      setData({});
    } catch (error) {
      setMessage(error.response.data.content)
    }
    setIsLoading(false);
  };


  return (
    <div className='container'>
      <form onSubmit={exportDataCsv}>
        {sources.map(input => (
        <div className='input__controle' key={input.id}>
          <label htmlFor={input.id}>{input.label}:</label>
          {input.id === 'Docket_Number' && (
            <select onChange={e => setData({...data, option: e.target.value})}>
              <option value='MC' defaultChecked>MC</option>
              <option value='FF'>FF</option>
              <option value='MX'>MX</option>
            </select>
          )}
          <input type={input.type} id={input.id} value={data[input.id] || ''} onChange={e => {
            setData({...data, [input.id]: e.target.value})
            setMessage(null)
          }}/>
        </div>))}
        <div className='form__btns'>
            <button disabled={!validate} className={isLoading ? 'loading' : ''} type='submit'>
            <CSVLink className='download__btn' ref={csvDownloadRef} {...csvLink}>
              {isLoading ? <div className='spinner'></div> : 'Scrap'}
            </CSVLink>
            {/* Scrap */}
            </button>
          <button type='button'>Cancel</button>
        </div>
        {message && <p className='error__message'>{message}</p>}
      </form>
    </div>
  )
}

export default App
