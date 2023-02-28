import axios from "axios";

const buildClient = ({ req }: { req: any }) => {
  //FIXME: CHANGE TYPE OF REQ , SAVE baseUrl in env variable
  if (typeof window === undefined) {
    return axios.create({
      baseURL: "http://ticketing.div",
      headers: req.headers,
    });
  } else {
    // we are in the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
