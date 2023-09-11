import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import MyNavBar from "../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const firebase = useFirebase();
  const [bookme, setBookme] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    console.log(auth, "fdskjh");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user, "useriser");
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    firebase.listAllBookme().then((bookmeData) => {
      const bookmeArray = bookmeData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),  
      }));
      setBookme(bookmeArray);
    });

    return () => unsubscribe();
  }, [firebase]);

  return (
    <div>
      <MyNavBar />
      <div className="container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {bookme.map((item) => {
              console.log(item,"bababa");
              if (currentUser && item.userEmail === currentUser.email) {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
