// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import 'bootstrap/dist/css/bootstrap.min.css';


document.addEventListener("DOMContentLoaded", () => {
  let newDiv = document.createElement("div")
  // newDiv.id = "container"
  newDiv.className = "container-fluid"
  ReactDOM.render(
    <App />,
    document.body.appendChild(newDiv)
  );
});
