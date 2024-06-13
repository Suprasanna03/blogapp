import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center">
      <h1 className="display-4 mt-5">Welcome to EcoBlog!</h1>
      <img
        src="https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=400"
        className="img-fluid mt-4 mb-4 rounded"
        alt="Blog Image"
      />
      <p className="lead">
        Explore insightful articles, tutorials, and news on various topics
        including technology, lifestyle, and more!
      </p>
      <div className="mt-5">
        <Link to="/articles" className="btn btn-success m-3">
          Explore Articles
        </Link>
        <Link to="/write" className="btn btn-outline-secondary m-3">
          Write an Article
        </Link>
      </div>
    </div>
  );
}

export default Home;
