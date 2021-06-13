import React, { useEffect, useState } from 'react';
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import UserItem from "../components/UserItem";
import {connect} from "react-redux";
import {addNewUser, removeUser, fetchUsers} from "../redux/actions/users";

function Users({userData, fetchUsers, addNewUser, removeUser}) {

  useEffect(() => {
    fetchUsers();
      }, [fetchUsers]);


  const { url } = useRouteMatch();

  const User = () => {
    const {id} = useParams();
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
        <div className="card" style={{width: '300px'}}>
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <h6 className="card-sub-title mb-2 text-muted">{user.email}</h6>
          </div>
        </div>
    );
  }

  return (
      <div className="users-page">
        <div className="list-group">
          <button onClick={() => addNewUser({id: 500, name: 'Stephen Hawking'})}>Dispatch</button>
          {
            userData && userData.loading ?
                (<h2>...loading</h2>) :
                userData && userData.error ?
                    (<h2>{userData.error}</h2>) :
                    userData && userData.users && userData.users.map((userItem, index) => <div className='list-group-item users'
                                                                                  key={userItem.id}>
                      <Link to={`${url}/${userItem.id}`} className="btn btn-secondary btn-sm">{userItem.name}</Link>
                      <UserItem userItem={userItem}
                                id={userItem.id}
                                index={userItem.id}
                                removeUser={removeUser}
                                key={index}/>
                    </div>)
          }
      </div>
        <Route path="/users/:id">
          <User />
        </Route>
      </div>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    addNewUser: (user) => dispatch(addNewUser(user)),
    removeUser: (id) => dispatch(removeUser(id)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Users);