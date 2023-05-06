import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Nav()
{

    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(null);;

    return <div className='mainContainer'>
        <div className="ctaContainer">
            <button type="button" className="oneWay">
                One-way
                <svg className="ctaSVG" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z" 
                    fill="currentColor"> 
                    </path>
                </svg>
            </button>
            <button type="button" className="passenger">
                <div>
                    <span data="passenger-details">0 Adults, No discount card</span>
                    <svg className="ctaSVG" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z" 
                    fill="currentColor"> 
                    </path>
                </svg>
                </div>
            </button>
        </div>
        
        <div className="inputContainer">
            <div className="fromInput">
                    <div color="#ccc" width="24" height="24">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <path id="PinStart__a" d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 4a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
                            </defs>
                            <use fill="currentColor" xlinkHref="#PinStart__a" fillRule="evenodd"></use>
                        </svg>
                    </div>
                <input type="text" placeholder="from: City, Station or Airport" />
            </div>
            

            <div className="toInput">
                <div color="#ccc" width="24" height="24">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <path id="Pin__a" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8-3a8 8 0 1 1 16 0c0 1.842-1.176 4.053-3.53 6.635L12 22l-4.47-5.365C5.175 14.053 4 11.842 4 10z"></path>
                            </defs>
                            <use fill="currentColor" xlinkHref="#Pin__a" fillRule="evenodd"></use>
                        </svg>
                    </div>
                <input type="text" placeholder="To: City, Station or Airport" />
            </div>

            <div className="calenderDepart" role="button">
                <div color="#ccc" width="24" height="24">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a1 1 0 1 1 2 0v1h8V4a1 1 0 0 1 2 0v1zM5 10a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H5z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <DatePicker
                        selected={departureDate}
                        onChange={date => setDepartureDate(date)}
                        minDate={new Date()}
                    />
            </div>

            <div className="calenderReturn" role="button" tabIndex={0}>
                <div color="#ccc" width="24" height="24">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <path id="Pin__a" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8-3a8 8 0 1 1 16 0c0 1.842-1.176 4.053-3.53 6.635L12 22l-4.47-5.365C5.175 14.053 4 11.842 4 10z"></path>
                            </defs>
                            <use fill="currentColor" xlinkHref="#Pin__a" fillRule="evenodd"></use>
                        </svg>
                    </div>
                    <DatePicker
                        selected={returnDate}
                        onChange={date => setReturnDate(date)}
                        placeholderText="Select a date"
                        minDate={new Date()}
                    />
            </div>
            
        </div>

    </div>
}