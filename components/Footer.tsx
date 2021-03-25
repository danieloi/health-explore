import React from "react";

export default function Footer() {
  return (
    <footer className="md:flex bg-white  p-5 sm:p-7 sm:flex-row flex-col">
      <section className="flex-auto p-2">
        <h2 className="text-2xl font-bold py-2">About us</h2>
        <p className="pb-1">
          We are a team of nurses, doctors, technologists and executives{" "}
          dedicated to help nurses find jobs that they love.
        </p>
        <p className="py-1">
          All copyrights reserved &copy; 2020 - Health Explore
        </p>
      </section>
      <section className="flex-auto p-2">
        <h2 className="text-2xl font-bold py-2">Sitemap</h2>
        <ul>
          <li className="pb-1">Nurses</li>
          <li className="py-1">Employers</li>
          <li className="py-1">Social Networking</li>
          <li className="py-1">Jobs</li>
        </ul>
      </section>
      <section className="flex-auto p-2">
        <h2 className="text-2xl font-bold py-2">Privacy</h2>
        <ul>
          <li className="pb-1">Terms of use</li>
          <li className="py-1">Privacy policy</li>
          <li className="py-1">Cookie policy</li>
        </ul>
      </section>
    </footer>
  );
}
