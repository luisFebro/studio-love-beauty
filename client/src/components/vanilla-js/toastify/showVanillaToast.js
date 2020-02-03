import Toastify from './toastify';
import './toastify.css';
import { CLIENT_URL } from '../../../config/clientUrl';


export default function showVanillaToast(title, duration, backgroundColor) {
    Toastify({
      text: title || "I am the the toast message",
      duration: duration || 5000,
      className: "toastify",
      fontWeight: 'bolder',
      avatar: `${CLIENT_URL}/favicon/android-chrome-256x256.png`,
      close: true,
      gravity: "bottom",
      position: 'left',
      backgroundColor: backgroundColor || "#34495e", // dark blue
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function(){} // Callback after click
    }).showToast();
}