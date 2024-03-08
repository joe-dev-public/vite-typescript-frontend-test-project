function AddReleaseForm({ setDataChanged }) {
  const API_URL = "http://127.0.0.1:8000/releases/";

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputFields = event.target.getElementsByTagName("input");

    const dataToSend = {};

    for (const input of inputFields) {
      dataToSend[input.name] = input.value;
    }

    async function postData() {
      const api_response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const json_response = await api_response.json();
      // console.log(json_response);
      setDataChanged(true);
    }

    postData();
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="artist">Artist</label>
      <input type="text" id="artist" name="artist"></input>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title"></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddReleaseForm;
