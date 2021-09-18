import React, { useState } from "react";
import { toast } from "react-toastify";
import "./AddEdit.css";
import fireDb from "../../utils/firebase";
// import { db } from "../../utils/firebase";
import { useHistory } from "react-router";
const initialState = {
  name: "",
  email: "",
  contact: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const history = useHistory();
  const { name, email, contact } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please Enter Full 🙄");
    } else {
      fireDb.child("contacts").push(state, (error) => {
        if (error) {
          toast.error("Send Fail Information 😔");
        } else {
          toast.success("Send Success Information 🥰");
        }
      });
      setTimeout(() => history.push("/"), 200);
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name 📛</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name}
          onChange={handleChange}
        />
        <label htmlFor="name">Email 📧</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="name">Contact Phone ☎️</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact Number..."
          value={contact}
          onChange={handleChange}
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddEdit;
