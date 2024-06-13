import React from 'react';

function Footer() {
  return (
    <div className="footer bg-success text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About EchoBlog</h5>
            <p>
              EchoBlog is your ultimate destination for discovering captivating articles, insightful guides, and the latest trends on various topics including technology, lifestyle, travel, and more.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/articles" className="text-white">Articles</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address className="text-white">
              Email: contact@echoblog.com<br />
              Phone: +1 (123) 456-7890<br />
              Address: Your City, Your Country
            </address>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} EchoBlog. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
