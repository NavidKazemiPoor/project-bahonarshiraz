import React from 'react'
import './Contact.css'
const Contact = () => {
  return (
    <div className='container mt'>
        <div className="center contact-center">
          <h2>فرم تماس</h2>
            <label htmlFor="">ایمیل:</label>
            <input type="email" />
            <label htmlFor="">پیام:</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button className='send-text'>ارسال</button>
        </div>
    </div>
  )
}

export default Contact