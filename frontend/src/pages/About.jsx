import React from "react";
import founderImage from "../assets/aravind_a_kamath.avif";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="mb-8 text-center bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border">
        <h1 className="text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 font-anton">
          About Exhale
        </h1>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 justify-center items-center">
          <img
            src={founderImage}
            alt="Image of the founder/developer of Exhale, Aravind A Kamath in an picture inspired by Dr. Dre's 'The Contract' in Grand Theft Auto V Online"
            className="max-w-full h-auto rounded-2xl lg:h-125 lg:w-125"
          />
          <div className="flex flex-col text-justify justify-center max-w-2xl">
            <p className="lg:text-lg">
              Inspired by Reddit, but repelled by its negativity and doomer
              mindset, Exhale is a safe space to vent your thoughts, emotions,
              and experiences anonymously. Freely post your experiences, get the
              burden off your chest. You can comment on other posts and support
              each other. Give advice or even just some kind words.
              <br />
              <br />
              'The Contract' is an imaginary arc which inspired the developer,
              Aravind A Kamath to kill his paralysis by analysis and work on
              personal development/skills and finally build something and do the
              things he wanted to do since a very long time. This is the reason
              why Exhale exists!
              <br />
              <br />
            </p>
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
