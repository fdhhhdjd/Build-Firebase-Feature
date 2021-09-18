import React, { useState, useEffect } from "react";
import fireDb from "../../utils/firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
const Home = () => {
  const [data, setData] = useState({});

  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);
    //!Online Off back
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
      return () => {
        setData({});
      };
    });
  };

  const filterData = (value) => {
    fireDb
      .child("contacts")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snap) => {
        if (snap.val()) {
          const data = snap.val();
          setData(data);
        }
      });
  };

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
      return () => {
        setData({});
      };
    });
  }, []);
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete 🤔")) {
      fireDb.child(`contacts/${id}`).remove((error) => {
        if (error) {
          toast.error("You delete Fail 😑");
        } else {
          toast.success("You delete success 👌 ");
        }
      });
    }
  };
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <td style={{ textAlign: "center" }}>No.</td>
              <td style={{ textAlign: "center" }}>Name</td>
              <td style={{ textAlign: "center" }}>Email</td>
              <td style={{ textAlign: "center" }}>Contact</td>
              <td style={{ textAlign: "center" }}>Status</td>
              {!sort && <td style={{ textAlign: "center" }}>Action</td>}
            </tr>
          </thead>
          {!sort && (
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                    <td>{data[id].status}</td>
                    <td>
                      <Link to={`/update/${id}`}>
                        <button className="bttn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="bttn btn-delete"
                        onClick={() => onDelete(id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${id}`}>
                        <button className="bttn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
          {sort && (
            <tbody>
              {sortedData.map((id, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{id.name}</td>
                    <td>{id.email}</td>
                    <td>{id.contact}</td>
                    <td>{id.status}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        <label>Sort By</label>
        <select className="dropdown" name="colValue" onChange={handleChange}>
          <option value="">Please Select</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="contact">Contact</option>
          <option value="status">Status</option>
        </select>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <br />
        <label htmlFor="">Status:</label>
        <button className="btn btn-active" onClick={() => filterData("Online")}>
          Online
        </button>
        <button
          className="btn btn-inactive"
          onClick={() => filterData("Offline")}
        >
          Offline
        </button>
      </div>
    </>
  );
};

export default Home;
