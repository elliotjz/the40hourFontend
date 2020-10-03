import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner-container">
        <p className="large-text">
          <a href="https://www.the40hourjammin.com">The 40 hour jammin</a> is
          being held from May 17 until 19 on Magnetic Island, Queensland. To
          support the cause and move your favorite musician up the leaderboard,{" "}
          <a href="https://www.the40hourjammin.com/artists">donate</a>.
        </p>
        <p>
          The leaderboard gets the donation amounts from the facebook donation
          pages every 15 minutes, and will update more frequently once the 40
          hour jammin starts.
        </p>
        <p>
          This project is open source and was made by Elliot Zoerner. Find the
          source code{" "}
          <a href="https://github.com/elliotjz/the40hourFontend">here</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
