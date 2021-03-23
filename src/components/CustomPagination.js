import React, { useState, useEffect } from "react";

import axios from "axios";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "./Container";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const usePaginateStyles = makeStyles((theme) => ({
  ui: {
    display: "flex",
    listStyle: "none",
    alignItems: "center",
    "& li": {
      padding: "0 4px",
      background: "#aeaeae",
      color: "white",
      cursor: "pointer",
      "&.active": {
        background: "#585858",
      },
      "&:hover": {
        color: "black",
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

  const indexOfLastPost = currentPage * postsPerPage; // 10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10 = 0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // (0, 10)

  if (loading) return <h2>loading..</h2>;

  return (
    <Container>
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
        paginateLength={5} // 7 or 5; control show paginate number length
      />
    </Container>
  );
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  paginate,
  currentPage,
  paginateLength,
}) => {
  const classes = usePaginateStyles();
  const pageNumbers = [];
  const pages = Math.ceil(totalPosts / postsPerPage); //  total Page length

  // currentPage = 5; paginateLength = 5; 5 / 2 = 2; maxLeft = 5 - 2 = 3
  let maxLeft = currentPage - Math.floor(paginateLength / 2); // if click 5 then show 3 4, that is 2 mean, the nearest 2 number
  let maxRight = currentPage + Math.floor(paginateLength / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = paginateLength;
  }

  if (maxRight > pages) {
    maxLeft = pages - (paginateLength - 1);

    maxRight = pages;
    if (maxLeft < 1) maxLeft = 1;
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    pageNumbers.push(page);
  }

  // for (let i = 1; i <= pages; i++) {
  // 1 2 3 4 5 ... 10 (default) length 7
  // 1 2 3 4 5 ... 10 (select 4) length 7 前面select 到5 才變化
  // 1 ... 4 5 6 ... 10 (select 5) length 7
  // 1 ... 5 6 7 ... 10 (select 6) length 7
  // 1 ... 15 16 17 ... 20 (select 16) select 到16 才變化
  // 1 ... 16 17 18 19 20 (select 17)
  // 1 ... 14 15 16 ... 20 (select 15)
  // < 1 2 3 4 5 > (default) length 5
  // < 2 3 4 5 6 >  (select 4) length 5
  // < 3 4 5 6 7 >  (select 5) length 5
  // pageNumbers.push(i);
  // }

  const nextPaginate = () => {
    const nextPage = currentPage + 1;
    paginate(nextPage);
  };
  const prevPaginate = () => {
    const prevPage = currentPage - 1;
    paginate(prevPage);
  };

  return (
    <nav>
      <ul className={classes.ui}>
        <li
          style={{ display: currentPage !== 1 ? "block" : "none" }}
          onClick={prevPaginate}>
          <Box>&laquo;</Box>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : null}>
            <Box onClick={() => paginate(number)}>{number}</Box>
          </li>
        ))}
        <li
          style={{ display: currentPage !== pages ? "block" : "none" }}
          onClick={nextPaginate}>
          <Box>&raquo;</Box>
        </li>
      </ul>
    </nav>
  );
};
