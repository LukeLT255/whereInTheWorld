import { useState, useEffect } from 'react';
import './Header.css';



function Header() {
    const [lightSwitch, setLightSwitch] = useState(JSON.parse(window.localStorage.getItem('lightSwitch')));

    useEffect(() => {
      setLightSwitch(JSON.parse(window.localStorage.getItem('lightSwitch')));
    }, []);
  
    useEffect(() => {
      window.localStorage.setItem('lightSwitch', lightSwitch);
      if (!lightSwitch) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }, [lightSwitch]);



    const handleClick = () => {
      return setLightSwitch(!lightSwitch);
    }

    return (
        <header>
            <div className='left'>
                <h1>Where In The World?</h1>
            </div>
            <div className='right'>
                <button onClick={() => handleClick()}><span>{lightSwitch ? 
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z" fill="white" stroke="#111517" strokeWidth="1.25"/>
                        </svg>
                        :
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z" fill="white"/>
                        </svg>
                    }</span>{lightSwitch ? 'Dark' : 'Light'} Mode</button>
            </div>
        </header>
    )
}

export default Header;