import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const PER_PAGE = 5;

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    /**
     * current page = 2;
     * itemsPerPage = 10;
     * (2 - 1) * 10 = 10; then slice from 10 to end
     */
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  /**
   * next and prev for standby, not in use for this case
   */
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

  // const controller = new AbortController(); This is for fetch api
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  let [page, setPage] = useState(1);

  const count = Math.ceil(posts.length / PER_PAGE);
  const _DATA = usePagination(posts, PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`${API_URL}`, {
        cancelToken: source.token,
      });
      setPosts(res.data);
      setLoading(false);
    };

    setTimeout(() => {
      fetchData();
    }, 2000);

    //cleanup function
    return () => {
      // controller.abort();  this is for Fetch api
      source.cancel("axios request cancelled");
    };
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
