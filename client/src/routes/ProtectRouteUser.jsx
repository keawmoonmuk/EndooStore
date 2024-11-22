import React, { useState, useEffect } from "react";
import useEcomStore from "../stores/ecom-store";
import { currentUser } from "../api/auth";
import Loading from "./Loading";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  // console.log(user);
  // console.log(token);

  useEffect(() => {
    if (user && token) {
      currentUser(token)
        .then((res) => {
        //   console.log(res);
          setOk(true);
        })
        .catch((err) => {
        //   console.log(err);
          setOk(false);
        });
    }
  }, []);

  return ok ? element : <Loading />
};

export default ProtectRouteUser;
