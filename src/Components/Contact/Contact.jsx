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
      </Helmet>
      <h1>prasanna</h1>
    </div>
  )
}

export default Contact