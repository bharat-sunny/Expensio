import { API } from "../env";

export const signup = async(username, email, password) => {
    return fetch(`${API}/user`, {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => 
    //res.json());
    console.log(res.json()));
  };

  export const login = (email, password) => {
    return fetch(`${API}/valid/user`, {
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
  };