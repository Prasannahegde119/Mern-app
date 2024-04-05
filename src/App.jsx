// import React from 'react';
// import Navbar from './Components/Navbar/Navbar';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Hero from './Components/Hero/Hero';
// import Contact from './Components/Contact/Contact';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<div><Navbar /><Hero /></div>} />
//         <Route path='/Contact' element={<Contact/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Contact from './Components/Contact/Contact';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div>
            <Helmet>
              <title>Home Page Title</title>
              <meta name="description" content="This is a description of the home page." />
            </Helmet>
            <Navbar />
            <Hero />
          </div>
        } />
        <Route path='/Contact' element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;