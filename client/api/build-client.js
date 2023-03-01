import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    //FIXME: ADD BASE URL TO ENV VARIABLE
    return axios.create({
      baseURL: "http://ticketing.dev",
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default buildClient;
