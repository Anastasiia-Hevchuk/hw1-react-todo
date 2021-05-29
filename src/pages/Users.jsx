import React, { useEffect, useState } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      const json = await res.json();
      setUsers(json);
    }

    fetchData();
  }, []);

  const { url } = useRouteMatch();

  const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
      async function fetchData() {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const json = await res.json();
        setUser(json);
      }

      fetchData();
    }, [id]);

    return (
      <div className="card" style={{ width: "300px" }}>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <h6 className="card-sub-title mb-2 text-muted">{user.email}</h6>
        </div>
      </div>
    );
  };

  const deleteUser = (id) => {
    const newList = users.filter((item) => item.id !== id);
    setUsers(newList);
  };

  const addUser = (e) => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        id: Date.now(),
        name: newUser,
        username: newUsername,
        email: email,
        address: {
          street: "default",
          suite: "dafeult",
          city: "default",
          zipcode: "default",
          geo: {
            lat: "default",
            lng: "default",
          },
        },
        phone: phone,
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setUsers([...users, json]));
    console.log(users);
  };

  return (
    <div className="users-page">
      <div className="list-group">
        <div class="row">
          <div class="col-sm-8">
            {users.map((user) => (
              <div className="list-group-item users" key={user.id}>
                <Link
                  to={`${url}/${user.id}`}
                  className="btn btn-secondary btn-sm"
                >
                  {user.name}
                </Link>
                <button onClick={() => deleteUser(user.id)}>X</button>
                {user.name}
              </div>
            ))}
          </div>
          <div class="col-sm-4">
            <form onSubmit={addUser} className="form-inline">
              <h4> Please, add new user</h4>
              <div className="form-group mb-2">
                <div>Enter name</div>
                <input
                  id="newUser"
                  type="text"
                  className="form-control"
                  value={newUser}
                  onClick={() =>
                    (document.getElementById("newUser").value = "")
                  }
                  onChange={(e) => setNewUser(e.target.value)}
                />
                <div>Enter username</div>
                <input
                  id="newUsername"
                  type="text"
                  className="form-control"
                  value={newUsername}
                  onClick={() =>
                    (document.getElementById("newUsername").value = "")
                  }
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <div>Enter email</div>
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  value={email}
                  onClick={() => (document.getElementById("email").value = "")}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>Enter phone</div>
                <input
                  id="phone"
                  type="text"
                  className="form-control"
                  value={phone}
                  onClick={() => (document.getElementById("phone").value = "")}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      <Route path="/users/:id">
        <User />
      </Route>
    </div>
  );
}

export default Users;
