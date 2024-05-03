
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter,faTumblr } from '@fortawesome/free-brands-svg-icons';

import './App.css';

function App() {
  const [color,setColor] = useState('');
  const [quote,setQuote] = useState('Loading...');
  const [author,setAuthor] = useState('');

  const getRandomColor =()=>{
    const randomRed = Math.floor(Math.random()*256)
    const randomGreen = Math.floor(Math.random()*256)
    const randomBlue = Math.floor(Math.random()*256)

    const randomColor = `rgb(${randomRed},${randomGreen},${randomBlue})`;
    if(randomColor !== color){
      setColor(randomColor)
    }
    
  };

  useEffect(()=>{
    getRandomColor();
    randomquote();
  },[])

  const randomquote = async ()=>{
      try{
        const res = await fetch("https://type.fit/api/quotes");
        const data = await res.json();
        // const values = Object.values(data);
        // setQuote(values);
        
        const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex].text);
      if(data[randomIndex].author.includes(",")){
        const authorName = data[randomIndex].author.split(',')[0];
        setAuthor(authorName)
      }else{
        setAuthor(data[randomIndex].author)
      }
      // setAuthor(data[randomIndex].author);
      
      }catch(err){
        console.log(err)
      }
  };


  const newQouteBtn = ()=>{
    randomquote();
    getRandomColor();
    
  }

  return (
    <div class="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '100vh',backgroundColor:color}}>
      <div className='d-flex-column border  rounded bg-white p-5' style={{width:'500px',color:color}}>
        <div className=''>
        <h3 className='text-central'><FontAwesomeIcon icon={ faQuoteLeft } size='lg' style={{color:color}} />{quote}</h3>
        
          <p className='text-end'>- {author}</p>
        </div>
        <div className='d-flex justify-content-between'>
          <div>
          <a className='btn btn-light ' style={{backgroundColor:color}}   href='#'><FontAwesomeIcon icon={faTwitter} /></a>
          <a className='btn btn-light' style={{backgroundColor:color}}   href='#'><FontAwesomeIcon icon={faTumblr} /></a>
          </div>
          
          <div className=''><button className="btn btn-light" style={{backgroundColor:color}}  onClick={newQouteBtn}>New Quote</button></div>
        </div>
      </div>
      <div className='mt-2'>
      <p className='text-white'>- by Halladen Coder</p>
    </div>
  </div>
  );
}

export default App;
