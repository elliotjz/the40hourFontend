import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner-container">
        <p className="large-text">
          The 40 hour jammin is being held from the 14th to 15th of November
          2020 in Kin Kin, Noosa Hinterland, New South Wales. To support the
          cause and move your favorite musician up the leaderboard, visit{" "}
          <a href="https://40hourjammin.com/">https://40hourjammin.com/</a>.
        </p>
        <p>
          The leaderboard gets the donation amounts from the facebook donation
          pages every 15 minutes, and will update more frequently once the 40
          hour jammin starts.
        </p>
        <p>
          This website was built by Elliot Zoerner - find the source code{" "}
          <a href="https://github.com/elliotjz/the40hourFontend">here</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
