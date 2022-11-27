

export const register = async (data) =>{

  try {
      const res = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        body: data,
      });
       const result = await res.json();
       return result;
    } catch (err) {
      return err.message || "Unexpected Error!" ;
    }
}

export const login = async (data) => {
  try {
    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{'content-type': 'application/json'}

    });
    const result = await res.json();
    return result;
  } catch (err) {
    return err.message || "Unexpected Error!";
  }
};


