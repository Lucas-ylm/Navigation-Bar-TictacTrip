import { createRoot } from 'react-dom/client'
import './App.js'
import './style.css'

const root = createRoot(document.querySelector('#root'))

const toto = 'there'

root.render(
    <>
        <App clickersCount={ 3 } children = 
        {
            <>
                <h1> Content </h1> 
            </>
        } 
        />
    </> 
)