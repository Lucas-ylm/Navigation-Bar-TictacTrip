import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Nav()
{
    const [suggestions, setSuggestions] = useState([]);
    const [listActive, setListActive] = useState(false);

    async function autocompleteCity(query) {
        const response = await fetch(`https://api.comparatrip.eu/cities/autocomplete/?q=${query}`);
        const data = await response.json(); // attente d'une réponse du json depuis le lien de l'api
        if (Array.isArray(data)) { // vérifie si la data que l'on reçoit est une array
          const suggestions = data.map((city) => ({ // on crée un tableau avec la méthode .map qui prend les données des local_name et unique_name puis les stocker dans la const suggestion pour ainsi l'utiliser
            local_name: city.local_name,
            unique_name: city.unique_name
          }));
          setSuggestions(suggestions); // on met à jour avec le hoot "setSuggestions" les données de l'api que l'on reçoit puis on les intègre dans la variable
        } else {
          throw new Error('Invalid response from server'); // erreur si la fonction a de mauvais paramètres ou le lien de l'API n'est pas la bonne
        }
      }
      
      async function autocompletePopularFrom(query) {
        const response = await fetch(`https://api.comparatrip.eu/cities/popular/from/paris/5?${query}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const suggestions = data.map((city) => ({
            local_name: city.local_name,
            unique_name: city.unique_name
          }));
          setSuggestions(suggestions);
        } else {
          throw new Error('Invalid response from server');
        }
      }

    // Stockage de données avec le méthode de hook, useState  

    const [departureDate, setDepartureDate] = useState(new Date()); 
    const [returnDate, setReturnDate] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isClicked1, setIsClicked1] = useState(false);
    const [tripType, setTripType] = useState("One-way");

    const handleClick = () => 
    {
        setToggled(!toggled);
    }

    const handleSVG = () => 
    {
      setIsClicked(!isClicked);
    }

    const handleSVG1 = () => 
    {
      setIsClicked1(!isClicked1);
    }

    const handleTripType = (type) => 
    {
        setTripType(type);
        setIsClicked(false);
      
        const today = new Date();
        setDepartureDate(today);
      
        if (type === "One-way") { // si le type de voyage un aller simple
          setReturnDate(null); // Fais en sorte d'afficher le placeholder
        } else if (type === "Round Trip") { // ou si le type de voyage est un round trip
          const returnDate = new Date(); 
          returnDate.setDate(today.getDate() + 7); // selectionne une date 7 jours après la date actuelle
          setReturnDate(returnDate); // retourne la date dans la date de retour
        }
      }

    return <div className='mainContainer'>

        <div className="ctaContainer">
            <button type="button" className="oneWay" onClick={() => setDropdownVisible(!dropdownVisible)}>

                {tripType}

                <svg onClick={handleSVG} className={isClicked ? "ctaSVGRotated" : "ctaSVG"} 
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M12 14.121l6.364-6.364a1 1 0 0 1 1.414 1.415l-7.07 7.07a.997.997 0 0 1-1.415 0l-7.071-7.07a1 1 0 1 1 1.414-1.415L12 14.121z" 
                    fill="currentColor"/> 
                </svg>

                {dropdownVisible && (

                <div className="dropdownContainer">
                    <div className={`dropdownItem ${tripType === "One-way" ? "selectedItem" : ""}`} 
                    onClick={() => handleTripType("One-way")}>
                        One-way
                    </div>
                    
                    <div className={`dropdownItem ${tripType === "Round Trip" ? "selectedItem" : ""}`} 
                    onClick={() => handleTripType("Round Trip")}>
                        Round Trip
                    </div>
                </div>
                )}

            </button>

            <button type="button" className="passenger">
                <div>
                    <span data="passenger-details">0 Adults, No discount card</span>
                        <svg onClick={handleSVG1} className={isClicked1 ? "ctaSVGRotated" : "ctaSVG"} 
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> 
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

                        <input type="text" onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setListActive(true); // affiche les données
                            } else {
                                setListActive(false); // n'affiche pas les données
                            } 
                            autocompleteCity(e.target.value); // fonction appelée à chaque fois que l'utilisateur écrit un caractère ce qui met la fonction à jour en temps réel
                            autocompletePopularFrom(e.target.value); // même principe que le autocompleteCity
                        }} placeholder="from: City, Station or Airport"/>

                        <ul className={listActive ? "cityList active" : "cityList"} // si listActive est true, la classe active est ajoutée, sinon, elle est n'est pas lue
                        > 
                            {suggestions.map((suggestion, index) => ( // on parcourt le tableau de suggestion avec la méthode .map et créer un élément li pour chaque suggestion
                            <li key={index}>{suggestion.local_name}</li> // on identifie chaque élément de manière unique avec "key"
                            ))}
                        </ul>

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
                            selected={departureDate} // on set la valeur donnée à departureDate avec le useState, donc la date d'aujourd'hui
                            onChange={date => setDepartureDate(date)} // la date choisie se voit remplacée par celle actuelle
                            minDate={new Date()} // impossible de choisir une date qui appartient au passé
                        />
                </div>

                <div className="calenderReturn" role="button" tabIndex={0}>
                        <DatePicker
                            selected={returnDate} // valeur set à null donc au placeholder
                            onChange={date => setReturnDate(date)} // même principe que le departureDate
                            placeholderText="+ Add return"
                            minDate={new Date()} // même principe que le departureDate
                        />
                </div>

                <div>
                    <button className="search" type="submit">
                        Search
                    </button>
                </div>

                    <div className="navFooter">

                        <div
                        className={toggled ? "toggle-btn toggled" : "toggle-btn"} // active ou désactive certaines classes du bouton
                        onClick={ handleClick } // change l'état du bouton en fonction du clic 
                        >  
                        <div className="toggle-thumb"></div>

                        <p>Find my accommodation</p>

                    </div>
                </div>

            </div>
            
        </div>
}