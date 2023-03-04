import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server

    return axios.create({
      baseURL:
        //base url
        // "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        "http://www.ticketingapp123.site",
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: "/",
    });
  }
};

//testing workflows+2

export default buildClient;
