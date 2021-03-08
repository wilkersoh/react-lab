import React, { useState, useEffect } from "react";

import axios from "axios";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const usePaginateStyles = makeStyles((theme) => ({
  ui: {
    display: "flex",
    listStyle: "none",
    alignItems: "center",
    "& li": {
      margin: "0 4px",
      "& a": {
        display: "inline-block",
        padding: "6px",
        textDecoration: "none",
        borderRadius: "4px",
        "&.active": {
          background: "green",
          color: "white",
        },
        "&:hover": {
          color: "black",
        },
      },
    },
  },
}));

export default function CustomPagination() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`${API_URL}`);
      setPosts(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) return <h2>loading..</h2>;

  return (
    <Box>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Box>
  );
}

const Pagination = ({ totalPosts, postsPerPage, paginate, currentPage }) => {
  const classes = usePaginateStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.ui}>
        <li>
          <Box>&laquo;</Box>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <Box
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : null}>
              {number}
            </Box>
          </li>
        ))}
        <li>
          <Box>&raquo;</Box>
        </li>
      </ul>
    </nav>
  );
};
