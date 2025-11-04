// Import necessary styles and assets
import './index.css'; // Imports the main CSS file for styling
import javascriptLogo from './assets/javascript.svg'; // Imports the JavaScript logo SVG
import viteLogo from '/vite.svg'; // Imports the Vite logo SVG
// not using the counter right now
/* import { setupCounter } from './counter.js'; // Imports the counter setup function from counter.js */
import { gsap } from 'gsap'; // Imports the GSAP (GreenSock Animation Platform) library for animations
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Imports the ScrollTrigger plugin for GSAP
import * as Yup from 'yup'; // Yup for form validation

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Select the element with id 'app' and set its inner HTML
document.querySelector('#app').innerHTML = `
  <div>
    <!-- Link to Vite website with Vite logo -->
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <!-- Link to JavaScript MDN docs with JavaScript logo -->
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
  </div>
`;

// Set up the counter functionality on the button with id 'counter'
//setupCounter(document.querySelector('#counter'));

// Add smooth scrolling to all anchor links that start with '#'
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth', // Smooth scroll to the target element
    });
  });
});

// GSAP animations for various elements
// These animations will make elements fade in and slide into place

// Animate the main heading
gsap.from('.hero h1', { opacity: 0, y: -50, duration: 1 });

// Animate the subheading with a slight delay
gsap.from('.hero h2', { opacity: 0, y: 50, duration: 1, delay: 0.5 });

// Animate the paragraph text with a longer delay
gsap.from('.hero p', { opacity: 0, y: 50, duration: 1, delay: 1 });

// Animate the hero image, scaling it up
gsap.from('.hero img', { opacity: 0, scale: 0.5, duration: 1, delay: 1.5 });

// Animate buttons, staggering their appearance
gsap.from('.btn', { opacity: 0, y: 20, duration: 0.5, stagger: 0.2, delay: 2 });

// Form validation schema using Yup
// We're creating a validation schema for our contact form using Yup.
// A schema is like a blueprint that defines what the data should look like.
// In this case, the schema defines the rules for each field in our form.

const ContactSchema = Yup.object().shape({
  // The 'name' field:
  // - It must be a string of text (Yup.string()).
  // - The 'required' method makes sure that the field is not left empty.
  // - If the 'name' field is empty, it will display the message 'Name is required'.
  name: Yup.string().required('Name is required'),

  // The 'email' field:
  // - It must also be a string of text (Yup.string()).
  // - The 'email' method checks that the input is a valid email format.
  // - The 'required' method makes sure that the field is not left empty.
  // - If the email is not in the correct format, it will display 'Invalid email'.
  // - If the 'email' field is empty, it will display 'Email is required'.
  email: Yup.string().email('Invalid email').required('Email is required'),

  // The 'message' field:
  // - This field must be a string of text (Yup.string()).
  // - The 'required' method ensures that the field is not left empty.
  // - If the 'message' field is empty, it will display 'Message is required'.
  message: Yup.string().required('Message is required'),
});

// Now we have a validation schema called 'ContactSchema' that will
// check the 'name', 'email', and 'message' fields in our form.
// Each field has specific rules, and if the user doesn't follow those rules,
// the form will show an error message telling them what went wrong.

// Create the contact form HTML as a string
const formHTML = `
  <form id="contactForm" class="space-y-4">
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" class="mt-1 block w-full p-2 border rounded" placeholder="Your Name">
      <div id="nameError" class="text-red-500"></div>
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" class="mt-1 block w-full p-2 border rounded" placeholder="Your Email">
      <div id="emailError" class="text-red-500"></div>
    </div>
    <div>
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="4" class="mt-1 block w-full p-2 border rounded" placeholder="Your Message"></textarea>
      <div id="messageError" class="text-red-500"></div>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
  </form>
`;

// Insert the form into the contact section
document.querySelector('#contact-form').innerHTML = formHTML;

// Form submission handler
document.querySelector('#contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting before validation

  // Get form values
  const formValues = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    message: document.querySelector('#message').value,
  };

  // Validate the form values using Yup
  ContactSchema.validate(formValues, { abortEarly: false })
    .then(function () {
      // If validation passes, submit the form to Formspree
      event.target.submit(); // This submits the form after validation
    })
    .catch(function (errors) {
      // Clear previous error messages
      document.querySelector('#nameError').innerText = '';
      document.querySelector('#emailError').innerText = '';
      document.querySelector('#messageError').innerText = '';

      // Show error messages
      errors.inner.forEach(function (error) {
        const errorElementId = `${error.path}Error`;
        document.querySelector(`#${errorElementId}`).innerText = error.message;
      });
    });
});

// This JavaScript code makes the mobile menu work on your website

// First, we need to find the important parts of our webpage
// We use 'const' to create variables that won't change

// This finds the button that opens and closes the menu
// 'getElementById' looks for an element with the id 'mobile-menu-button'
const mobileMenuButton = document.getElementById('mobile-menu-button');

// This finds the list of menu items
// 'querySelector' finds the first 'ul' (unordered list) inside a 'nav' element
const mobileMenu = document.querySelector('nav ul');

// This function opens or closes the menu
// A function is like a recipe - it's a set of instructions we can use multiple times
function toggleMobileMenu() {
  // 'classList.toggle' adds a class if it's not there, or removes it if it is
  // 'hidden' hides the menu, 'flex' shows it
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
}

// This tells the button to run our toggleMobileMenu function when clicked
// 'addEventListener' sets up an action to happen when something occurs
mobileMenuButton.addEventListener('click', toggleMobileMenu);

// This part closes the menu when someone clicks a link inside it
// 'querySelectorAll' finds all 'a' elements (links) inside the menu
mobileMenu.querySelectorAll('a').forEach((link) => {
  // For each link, we set up a click action
  link.addEventListener('click', () => {
    // If the menu is visible (not hidden), we close it
    if (!mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu();
    }
  });
});

// This closes the menu if someone clicks outside of it
// We're adding a click action to the whole document (webpage)
document.addEventListener('click', (event) => {
  // We check if the click was inside the menu or on the menu button
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnMenuButton = mobileMenuButton.contains(event.target);

  // If the click wasn't inside the menu or on the button, and the menu is visible, we close it
  if (!isClickInsideMenu && !isClickOnMenuButton && !mobileMenu.classList.contains('hidden')) {
    toggleMobileMenu();
  }
});

// EoF
