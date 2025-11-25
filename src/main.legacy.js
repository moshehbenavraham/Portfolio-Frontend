// Import necessary styles and assets
import './index.css'; // Imports the main CSS file for styling
import { gsap } from 'gsap'; // Imports the GSAP (GreenSock Animation Platform) library for animations
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Imports the ScrollTrigger plugin for GSAP
import * as Yup from 'yup'; // Yup for form validation

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded before setting up event listeners and animations
document.addEventListener('DOMContentLoaded', function () {
  // Add smooth scrolling to all anchor links that start with '#'
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link behavior
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth', // Smooth scroll to the target element
        });
      }
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
    <form id="contactForm" action="https://formspree.io/f/mrbzklwz" method="POST" class="space-y-4">
      <div>
        <label for="name" class="block font-medium">Name</label>
        <input type="text" id="name" name="name" class="mt-1 block w-full p-2 border rounded" placeholder="Your Name" required>
        <div id="nameError" class="text-red-500 text-sm mt-1"></div>
      </div>
      <div>
        <label for="email" class="block font-medium">Email</label>
        <input type="email" id="email" name="email" class="mt-1 block w-full p-2 border rounded" placeholder="Your Email" required>
        <div id="emailError" class="text-red-500 text-sm mt-1"></div>
      </div>
      <div>
        <label for="message" class="block font-medium">Message</label>
        <textarea id="message" name="message" rows="4" class="mt-1 block w-full p-2 border rounded" placeholder="Your Message" required></textarea>
        <div id="messageError" class="text-red-500 text-sm mt-1"></div>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Submit</button>
    </form>
  `;

  // Insert the form into the contact section
  const contactFormContainer = document.querySelector('#contact-form');
  if (contactFormContainer) {
    contactFormContainer.innerHTML = formHTML;

    // Form submission handler
    document.querySelector('#contactForm').addEventListener('submit', function (event) {
      // Clear previous error messages
      document.querySelector('#nameError').innerText = '';
      document.querySelector('#emailError').innerText = '';
      document.querySelector('#messageError').innerText = '';

      // Get form values
      const formValues = {
        name: document.querySelector('#name').value.trim(),
        email: document.querySelector('#email').value.trim(),
        message: document.querySelector('#message').value.trim(),
      };

      // Validate the form values using Yup
      ContactSchema.validate(formValues, { abortEarly: false })
        .then(function () {
          // If validation passes, allow form to submit normally to FormSpree
          // Form will submit naturally since we don't prevent default here
        })
        .catch(function (errors) {
          // Prevent form submission if validation fails
          event.preventDefault();

          // Show error messages
          errors.inner.forEach(function (error) {
            const errorElementId = `${error.path}Error`;
            const errorElement = document.querySelector(`#${errorElementId}`);
            if (errorElement) {
              errorElement.innerText = error.message;
            }
          });
        });
    });
  }

  // This JavaScript code makes the mobile menu work on your website

  // First, we need to find the important parts of our webpage
  // We use 'const' to create variables that won't change

  // This finds the button that opens and closes the menu
  // 'getElementById' looks for an element with the id 'mobile-menu-button'
  const mobileMenuButton = document.getElementById('mobile-menu-button');

  // This finds the list of menu items
  // 'querySelector' finds the first 'ul' (unordered list) inside a 'nav' element
  const mobileMenu = document.querySelector('nav ul');

  // Only set up mobile menu if elements exist
  if (mobileMenuButton && mobileMenu) {
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
  }
});

// EoF
