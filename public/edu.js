const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

const heroButton = document.querySelector('.hero button');

heroButton.addEventListener('click', () => {
  alert('Get Started button clicked!');
});

const specializationCards = document.querySelectorAll('.specialization-cards .card');

specializationCards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.classList.add('hover');
  });
  card.addEventListener('mouseout', () => {
    card.classList.remove('hover');
  });
});

const jobCards = document.querySelectorAll('.job-cards .card');

jobCards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.classList.add('hover');
  });
  card.addEventListener('mouseout', () => {
    card.classList.remove('hover');
  });
});

const mentorCards = document.querySelectorAll('.mentor-cards .card');

mentorCards.forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.classList.add('hover');
  });
  card.addEventListener('mouseout', () => {
    card.classList.remove('hover');
  });
});

const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    const section = document.querySelector(target);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
