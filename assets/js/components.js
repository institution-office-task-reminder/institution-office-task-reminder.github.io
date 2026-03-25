/**
 * Shared Navigation & Footer Injector
 * Injects the same nav and footer into every page automatically.
 */
(function () {
  // ── Navigation HTML ─────────────────────────────────────
  const navHTML = `
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="index.html" class="nav-logo" aria-label="Institution Office Task Reminder Home">
        <img src="assets/images/logo.png" alt="IOTR Logo" onerror="this.style.display='none'">
        <div class="nav-logo-text">
          Institution Office<br>Task Reminder
          <small>Smart Institutional Workflow</small>
        </div>
      </a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="features.html">Features</a>
        <a href="how-it-works.html">How It Works</a>
        <a href="trial.html">Trial &amp; Licensing</a>
        <a href="screenshots.html">Screenshots</a>
        <a href="download.html">Download</a>
        <a href="guide.html">User Guide</a>
        <a href="faq.html">FAQ</a>
        <a href="contact.html" class="btn-nav">Contact</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="nav-mobile" role="menu">
      <a href="index.html" role="menuitem">Home</a>
      <a href="features.html" role="menuitem">Features</a>
      <a href="how-it-works.html" role="menuitem">How It Works</a>
      <a href="trial.html" role="menuitem">Trial &amp; Licensing</a>
      <a href="screenshots.html" role="menuitem">Screenshots</a>
      <a href="download.html" role="menuitem">Download</a>
      <a href="guide.html" role="menuitem">User Guide</a>
      <a href="faq.html" role="menuitem">FAQ</a>
      <a href="contact.html" role="menuitem">Contact Us</a>
    </div>
  </nav>`;

  // ── Footer HTML ─────────────────────────────────────────
  const footerHTML = `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Institution Office Task Reminder</h3>
          <p>Smart task management, reminders, and institutional workflow coordination for colleges, offices, and organizations.</p>
        </div>
        <div class="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="features.html">Features</a></li>
            <li><a href="how-it-works.html">How It Works</a></li>
            <li><a href="trial.html">Trial &amp; Licensing</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Resources</h5>
          <ul>
            <li><a href="screenshots.html">Screenshots</a></li>
            <li><a href="download.html">Download</a></li>
            <li><a href="guide.html">User Guide</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
            <li><a href="sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
        <div class="footer-col footer-contact">
          <h5>Developer</h5>
          <p><span>👤</span> Himadri Biswas</p>
          <p><span>📧</span> youngsunsonsignup@gmail.com</p>
          <p><span>📞</span> +880 9696 196566</p>
          <p><span>💬</span> WhatsApp: +880 1714796566</p>
          <p><span>📍</span> Bangladesh</p>
        </div>
      </div>
      <hr class="footer-divider">
      <div class="footer-bottom">
        <p>&copy; <span id="footer-year"></span> Institution Office Task Reminder. All rights reserved.</p>
        <p>Developed with ♥ by <span>Himadri Biswas</span> &mdash; Bangladesh</p>
      </div>
    </div>
  </footer>`;

  // ── Inject into page ────────────────────────────────────
  const navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.outerHTML = navHTML;

  const footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.outerHTML = footerHTML;

  // Set year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
