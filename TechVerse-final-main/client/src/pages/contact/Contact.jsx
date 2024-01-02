import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_buat08p", "template_kr10lte", form.current, "Rd3-9rYeWa8ROP8h6")
      .then((result) => {
          console.log(result.text);
          if (form.current) {
            form.current.reset();
          }
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name:</label>
      <input type="text" name="user_name" />
      <label>Email:</label>
      <input type="email" name="user_email" />
      <label>Message Admin:</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default Contact;