import React from "react";

const NoMatch = () => {
    return <div>
        <h1>404 - Not found.</h1>
        <h2>
            We're sorry, but the page you are looking for cannot be found. What should you do at this point? Here are
            some options: </h2>
        <ul>
            <li>If you typed in a URL, check that it is typed in correctly.</li>
            <li>Perhaps it was just a fluke, and if you try again by clicking refresh, it'll pop right up!</li>
            <li>Or head back to our home page <a
                href="/">https://vernal-bloom.com</a> and navigate from there.
            </li>
        </ul>
    </div>
};

export default NoMatch;