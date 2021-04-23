// codesandbox.io/embed/usereducer-bookstore-uoppo?file=/App.jsx:577-1958&codemirror=1
import React, { useReducer, useState } from "react";

import { isUndefined } from "lodash";
import { BOOKS } from "./lib/data";
import Container from "./components/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import { makeStyles } from "@material-ui/core/styles";
import TableMeterial from "./components/TableMeterial";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  searchInput: {
    marginLeft: "1rem",
    padding: "0 1rem ",
    display: "flex",
    alignItems: "center",
    minWidth: 120,
    "& .input": {
      minWidth: 120,
      // marginLeft: theme.spacing(1),
    },
    "& .iconButton": {
      display: "inline-block",
    },
  },
}));

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_KEYWORD":
      return {
        ...state,
        filter: { ...state.filter, keyword: action.payload.keyword },
        pagination: { ...state.pagination, current: 1 },
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        filter: { ...state.filter, category: action.payload.category },
        pagination: { ...state.pagination, current: 1 },
      };
    case "CHANGE_PAGINATION":
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload.pagination },
      };
    case "CHANGE_SORT":
      const newVariable = { ...state, sort: action.payload.sort };
      if (isUndefined(newVariable.sort.order)) delete newVariable["sort"];
      return newVariable;
    default:
      throw new Error(`不存在的 action type: ${action.type}`);
  }
};

const CATEGORIES = {
  1: "社會科學",
  2: "商業理財",
};

const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 2,
  showSizeChanger: true,
  pageSizeOptions: [1, 2, 6],
};

const INITIAL_STATE = {
  filter: { keyword: "", category: "0" },
  pagination: DEFAULT_PAGINATION,
};

export default function PaginateReducer() {
  const classes = useStyles();

  const [variables, dispatch] = useReducer(reducer, INITIAL_STATE);
  console.log("variables :>> ", variables);

  const [category, setCategory] = useState("");
  const { data, metadata } = useQuery("/api/books", { variables });

  const handleChangeKeyword = (e) => {
    dispatch({ type: "CHANGE_KEYWORD", payload: { keyword: e.target.value } });
  };

  const handleChangeCategory = (category) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: { category } });
  };

  const hangleTableChange = (_pagination, _filters, _sorter, extra) => {
    const { action } = extra;
    if (action === "paginate") {
      dispatch({
        type: "CHANGE_PAGINATION",
        payload: { pagination: _pagination },
      });
    } else if (action === "sort") {
      dispatch({
        type: "CHANGE_SORT",
        payload: { sort: _sorter },
      });
    }
  };

  const handleChangeSelect = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Container>
      <Box display='flex'>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='demo-simple-select-outlined-label'>種類</InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            label='種類'
            id='demo-simple-select-outlined'
            value={category}
            onChange={handleChangeSelect}>
            <MenuItem value={0}>全部分類</MenuItem>
            {Object.entries(CATEGORIES).map(([key, value]) => (
              <MenuItem value={key}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Paper className={classes.searchInput}>
          <InputBase
            className={classes.input}
            placeholder='search'
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            type='submit'
            className={classes.iconButton}
            aria-label='search'>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <TableMeterial rows={BOOKS} />
    </Container>
  );
}

export const useQuery = (url, params) => {
  const { variables } = params;
  const { filter, pagination, sort } = variables;

  const books = BOOKS.filter((book) => {
    return (
      book.title.indexOf(filter.keyword) !== -1 ||
      book.category.indexOf(filter.keyword) !== -1
    );
  })
    .filter((book) => {
      if (filter.category !== "0")
        return book.category === CATEGORIES[filter.category];

      return true;
    })
    .sort((a, b) => {
      if (!isUndefined(sort)) {
        const { field, order } = sort;
        if (order === "ascend") {
          return a[field] - b[field];
        } else {
          return b[field] - a[field];
        }
      }
      return 0;
    });

  return {
    data: books.slice(
      (pagination.current - 1) * pagination.pageSize,
      (pagination.current - 1) * pagination.pageSize + pagination.pageSize
    ),
    metadata: { totalCount: books.length },
  };
};
