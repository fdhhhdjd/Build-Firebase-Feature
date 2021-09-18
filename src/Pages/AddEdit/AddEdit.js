import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AddEdit.css";
import fireDb from "../../utils/firebase";
import { useHistory, useParams } from "react-router";
const initialState = {
  name: "",
  email: "",
  contact: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const { name, email, contact } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please Enter Full 🙄");
    } else {
      if (!id) {
        fireDb.child("contacts").push(state, (error) => {
          if (error) {
            toast.error("Add Fail Information 😔");
          } else {
            toast.success("Add Success Information 🥰");
          }
        });
      } else {
        //!edit
        fireDb.child(`contacts/${id}`).set(state, (error) => {
          if (error) {
            toast.error("Edit Fail Information 😔");
          } else {
            toast.success("Edit Success Information 😊");
          }
        });
      }

      setTimeout(() => history.push("/"), 200);
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  //!edit
  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
      return () => {
        setState({});
      };
    });
  }, [id]);
  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({});
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);
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
          value={name || ""}
          onChange={handleChange}
        />
        <label htmlFor="name">Email 📧</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleChange}
        />
        <label htmlFor="name">Contact Phone ☎️</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact Number..."
          value={contact || ""}
          onChange={handleChange}
        />
        <input type="submit" value={id ? "Edit" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
