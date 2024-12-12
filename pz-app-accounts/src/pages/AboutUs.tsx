import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div>
      <aside>
        <a href="#section1">Paragraph 1</a>
        <a href="#section2">Paragraph 2</a>
      </aside>
      <main>
        <h1>About Us</h1>
        <p id="section1">This is paragraph 1.</p>
        <p id="section2">This is paragraph 2.</p>
      </main>
    </div>
  );
};

export default AboutUs;
