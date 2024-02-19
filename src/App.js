import { Virtuoso } from "react-virtuoso";
import { generateUsers } from "./data";
import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [users, setUsers] = useState(() => []);

  const fetchRandomUsers = async () => {
    const res = await fetch("https://randomuser.me/api/?results=100");
    const data = await res.json();

    setUsers((users) => [...users, ...data.results]);
  };

  const loadMore = useCallback(() => {
    fetchRandomUsers();
    // return setTimeout(() => {
    //   setUsers((users) => [...users, ...generateUsers(100, users.length)]);
    // }, 200);
  }, [setUsers]);

  const onBottomReached = (isAtBottom) => {
    if (isAtBottom) loadMore();
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Virtuoso
      style={{ height: "100dvh" }}
      data={users}
      // endReached={(index) => console.log(index)}
      atBottomStateChange={onBottomReached}
      atBottomThreshold={6000}
      overscan={10}
      itemContent={(index, user) => {
        return (
          <div
            style={{
              backgroundColor: "coral",
              padding: "0.5rem 1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{user.name.first}</h3>
            <p>{user.email}</p>
            <span>{user.phone}</span>
          </div>
        );
      }}
      components={{ Footer }}
    />
  );
}

const Footer = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
};
