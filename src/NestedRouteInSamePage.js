import React from "react";
import { Route, useRouteMatch, useParams, Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Container from "./components/Container";
import { Typography } from "@material-ui/core";

import Data from "./lib/nestedRoute";

export default function NestedRouteInSamePage() {
  /**
   * url: /nested-routing/React Js
   * path: /nested-routing/:topicId
   */
  const { url, path } = useRouteMatch(); // url use in Link, path use in route

  return (
    <Container>
      <ul>
        <Link style={{ color: "blue" }} to={`${url}/products`}>
          MY PRODUCTS
        </Link>
      </ul>

      <hr />

      <Route path={`${path}/products`} component={Products} />
    </Container>
  );
}

const Products = () => {
  const { url, path } = useRouteMatch();

  return (
    <Box>
      <h1>First page: Products (level 1)</h1>
      <ul>
        {Data.map(({ name, id }) => (
          <li key={id}>
            <Link to={`/nested-routing-same-page/products/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <hr />

      <Route path={`${path}/:productId`} component={ProductId} />
    </Box>
  );
};

const ProductId = ({ match }) => {
  /**
   * useParams 只有 <Route /> 裡面 url 是 :name 的才可以拿到
   * path 是 route 裡面的 string 就是 說 是有 :name 的
   * url 是 顯示 在 browser上面的 string
   */
  const { productId } = useParams();
  let { path, url } = useRouteMatch();

  const productItem = Data.find(({ id }) => id === match.params.productId);

  return (
    <div>
      <h2>ProductId page (level 2)</h2>
      <div>{productItem.name}</div>
      <ul>
        {productItem.resources.map((sub) => (
          <li key={sub.id}>
            <Link to={`${url}/${sub.id}`}>{sub.title}</Link>
          </li>
        ))}
      </ul>
      <hr />

      <Route path={`${path}/:subId`} component={Resource} />
    </div>
  );
};

const Resource = ({ match }) => {
  const { productId, subId } = useParams();

  const productItem = Data.find(({ id }) => id === productId).resources.find(
    ({ id }) => id === subId
  );

  console.log("match :>> ", match);
  console.log("productItem :>> ", productItem);
  return (
    <Box>
      <h2>Product resource page (level 3)</h2>
      <Typography variant={"h3"}>{productItem.name}</Typography>
      <Box>{productItem.description}</Box>
      <a href={productItem.url}>More info</a>
    </Box>
  );
};
