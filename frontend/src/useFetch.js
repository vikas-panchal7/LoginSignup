import * as React from "react";

const useFetch = (url,type,formData) => {
  const [data, setdata] = React.useState(null);
  const [loading, setloading] = React.useState(true);
  const [error, seterror] = React.useState("");

  React.useEffect(() => {
    fetch(url, {
      method: type,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error);
        setdata(data.joke);
        setloading(false);
      });
  }, [url,formData,type]);

  return { data, loading, error };
};

export default useFetch;
