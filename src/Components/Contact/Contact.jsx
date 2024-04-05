// import React from 'react'
// import './contact.css'

// const Contact = () => {
//   return (
//     <div className='contact'>
//       <h1>prasanna</h1>
//     </div>
//   )
// }

// export default Contact

import React from 'react'
import { Helmet } from 'react-helmet';
import './contact.css'

const Contact = () => {
  return (
    <div className='contact'>
      <Helmet>
        <title>Contact Page Title</title>
        <meta name="description" content="This is a description of the contact page." />
        <meta property="og:image" content="https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg" />
      </Helmet>
      <h1>prasanna</h1>
    </div>
  )
}

export default Contact