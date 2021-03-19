import React from "react";
import {
  Route,
  useRouteMatch,
  useParams,
  Link,
  Switch,
} from "react-router-dom";

import Box from "@material-ui/core/Box";
import Container from "./components/Container";

import Data from "./lib/nestedRoute";
import { Typography } from "@material-ui/core";

export default function NestedRouteOtherPage() {
  const { url, path } = useRouteMatch(); // url use in Link, path use in route

  return (
    <Container>
      <ul>
        {/* Header */}
        <Box>Header</Box>
        <Link style={{ color: "blue" }} to={`${url}/products`}>
          MY PRODUCTS
        </Link>
      </ul>
      <Switch>
        {/*
      注意： router的 特性是 他只要 看到 url/products/xxx 他就會從上面去看 哪個是 match的 他不會管 他到底後面 有沒有 matched 只要有 match 到一部分 他就會 render 那個component
    */}
        <Route
          path={`${url}/products/:productId/:subId`}
          component={Resource}
        />
        <Route path={`${url}/products/:productId`} component={ProductId} />
        <Route path={`${url}/products`} component={Products} />
      </Switch>
    </Container>
  );
}

/**
 * 它會自動有props在裡面
 * 如果用 <Route><Products /></Route> 就會沒有props
 * 需要component={Products}
 */
const Products = (props) => {
  return (
    <div>
      <h1>First page: Products (level 1)</h1>
      <ul>
        {Data.map(({ name, id }) => (
          <li key={id}>
            <Link to={`/nested-routed-page/products/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductId = ({ match }) => {
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
    </div>
  );
};

const Resource = ({ match }) => {
  const { productId, subId } = useParams();

  const productItem = Data.find(({ id }) => id === productId).resources.find(
    ({ id }) => id === subId
  );

  return (
    <div>
      <h2>Resource Page</h2>
      <h3>{productItem.title}</h3>
      <h3>{productItem.price}</h3>
      <a href={productItem.url}> More Info.</a>
    </div>
  );
};
