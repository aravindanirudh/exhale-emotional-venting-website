import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="mb-8 text-center bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border">
        <h1 className="text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 font-anton">
          About Exhale
        </h1>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 justify-center items-center">
          <div className="flex flex-col text-justify justify-center max-w-2xl">
            <p className="lg:text-lg mb-4">
              Inspired by Reddit, but repelled by its negativity, noise and
              doomer mindset, Exhale is a safe space to vent your thoughts,
              emotions, and experiences anonymously. You can comment advice or
              even some kind words on other posts and support each other. Exhale
              exists because people were never meant to carry everything by
              themselves.
              <br />
              <br />
              'The Contract' is an imaginary arc that changed everything for its
              creator, Aravind A Kamath. For years, ideas were trapped behind
              overthinking - perfection delaying progress, paralysis by analysis. Until one moment forced a decision: stop waiting, stop
              hesitating, and start building. Exhale
              is the result of that arc - proof that the hardest step is
              simply beginning.
              <br />
              <br />
              Sometimes all it takes is one decision to change your life. So
              take a breath. And when you're ready - Exhale!
            </p>
            {/* Link (button) to go to GitHub page of developer, Aravind A Kamath */}
            <Link
              to="https://github.com/aravindanirudh"
              target="_blank"
              className="block text-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-500"
            >
              Contact Developer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
