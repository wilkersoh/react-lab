import React, { useState, createContext, useContext } from "react";

import Box from "@material-ui/core/Box";
import Container from "./components/Container";
import { Button, Typography } from "@material-ui/core";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [theme, setTheme] = useState("black");
  const nextTheme = theme === "black" ? "blue" : "black";

  const values = {
    theme,
    setTheme,
    toggleTheme: () => {
      setTheme(nextTheme);
    },
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
};

export default function MemoAndTrick() {
  return (
    <Container>
      <Typography variant='h5'>
        不要用 React.memo也能做到在 Context Provider下 不相關component
        不re-render
      </Typography>
      <Typography variant='h5'>
        We split the MemoAndTrick component in two. The parts that depend on the
        color, together with the color state variable itself, have moved into
        MyProvider. The parts that don’t care about the color stayed in the
        MemoAndTrick component and are passed to MyProvider as JSX content, also
        known as the children prop. When the color changes, MyProvider
        re-renders. But it still has the same children prop it got from the
        MemoAndTrick last time, so React doesn’t visit that subtree.
      </Typography>
      {/*
          和 Memo 一樣效果
          為什麼 它會做到 和Memo一樣呢？ 它明明 也 被change state了
          為什麼 DirectChild 不會 re-render
          首先： 以 沒有Memo 也 沒有 MyProvider的 例子
              它會 re-render 是因為 MemoAndTrick 有 這些state and props
              所以 它被改變了 會影響到 children 畢竟 他算是 parent 有 那些 state和 props
          第一： 用了 MyProvider 我們的 state 和 props在也不是在 MemoAndTrick，
              而是在 MyProvider裡 所以 MyProvider 算是 parent 他負責 re-render
              那為什麼 它的 state 被改變了 DirectChild 不會 re-render呢？

        someone: The reason the second fix works: In both cases, App is responsible for rendering DirectChild, so in both cases, DirectChild will re-render when App re-renders.  After the refactoring, App is no longer being re-rendered when the state changes; only MyProvider is. Because App no longer needs to be re-rendered, DirectChild does not need to be re-rendered.
        */}
      <MyProvider>
        <DirectChild />
      </MyProvider>
    </Container>
  );
}

const DirectChild = () => {
  console.log("direct child re-render");
  return (
    <Box>
      <NestedChild />
    </Box>
  );
};

const NestedChild = () => {
  console.log("nested re-render");
  const { toggleTheme } = useContext(MyContext);
  return (
    <Box>
      <Button variant='outlined' onClick={toggleTheme}>
        Toggle state value
      </Button>
    </Box>
  );
};

/**
 * Use React.memo to 避免 directChild 也re-render
 */
// export default function MemoAndTrick() {
//   const [theme, setTheme] = useState("black");
//   const nextTheme = theme === "black" ? "blue" : "black";

//   const values = {
//     theme,
//     setTheme,
//     toggleTheme: () => {
//       setTheme(nextTheme);
//     },
//   };

//   return (
//     <Container>
//       <Typography variant='h5'>
//         不要用 React.memo也能做到在 Context Provider下 不相關component
//         不re-render
//       </Typography>
//       <MyContext.Provider value={values}>
//         <DirectChild />
//       </MyContext.Provider>
//     </Container>
//   );
// }
// const DirectChild = React.memo(() => {
//   console.log("directChild re-render");
//   return (
//     <Box>
//       <NestedChild />
//     </Box>
//   );
// });

// const NestedChild = () => {
//   console.log("nested re-render");
//   const { toggleTheme } = useContext(MyContext);
//   return (
//     <Box>
//       <Button variant='outlined' onClick={toggleTheme}>
//         Toggle state value
//       </Button>
//     </Box>
//   );
// };
