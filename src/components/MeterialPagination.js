import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export default function MeterialPagination() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = usePagination(posts, PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`${API_URL}`);
      setPosts(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  if (loading) return <h1>loading...</h1>;

  return (
    <Box>
      <ul>
        {_DATA.currentData().map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <Pagination
        count={count}
        size='large'
        page={page}
        variant='outlined'
        shape='rounded'
        onChange={handleChange}
      />
    </Box>
  );
}
