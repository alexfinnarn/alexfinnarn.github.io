
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply the stored theme (or default to light)
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Set initial button state
  if (currentTheme === 'dark') {
    toggleButton.textContent = '☀️'; // Light mode indication
  }

  // Set up click event for button
  toggleButton.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
});