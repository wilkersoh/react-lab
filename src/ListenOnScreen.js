import { useState, useEffect, useRef } from "react";

import Box from "@material-ui/core/Box";
import Container from "./components/Container";

// export default function ListenOnScreen() {
//   const [ref, isVisible] = useOnScreen({ threshold: 0.2 }); //  {rootMargin: "-300px" or, threshold: 0.5} 0.5 mean 螢幕的 50% 才顯示 true

//   return (
//     <Container>
//       <div>
//         <div style={{ height: "100vh" }}>
//           <h1>Scroll down to next section 👇</h1>
//         </div>
//         <div
//           ref={ref}
//           style={{
//             height: "100vh",
//             backgroundColor: isVisible ? "#23cebd" : "#efefef",
//           }}>
//           {isVisible ? (
//             <div>
//               <h1>Hey I'm on the screen</h1>
//               <img src='https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif' />
//             </div>
//           ) : (
//             <h1>Scroll down 300px from the top of this section 👇 Also can use
//               react-intersection-observer package</h1>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// }

// function useOnScreen(option) {
//   // State and setter for storing whether element is visible
//   const ref = useRef();
//   const [isVisible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       // Update our state when observer callback fires
//       setVisible(entry.isIntersecting);
//     }, option);

//     if (ref.current) {
//       observer.observe(ref.current);
//     }
//     return () => {
//       observer.unobserve(ref.current);
//     };
//   }, [ref, option]); // Empty array ensures that effect is only run on mount and unmount

//   return [ref, isVisible];
// }

// Way 2
/**
 * ref will call setRef render dom,
 * then trigger useEffect
 */
export default function ListenOnScreen() {
  const [setRef, isVisible] = useOnScreen({ threshold: 0.2 }); //  {rootMargin: "-300px" or, threshold: 0.5} 0.5 mean 螢幕的 50% 才顯示 true

  return (
    <Container>
      <div>
        <div style={{ height: "100vh" }}>
          <h1>Scroll down to next section 👇</h1>
        </div>

        <div
          ref={setRef}
          style={{
            height: "100vh",
            backgroundColor: isVisible ? "#23cebd" : "#efefef",
          }}>
          {isVisible ? (
            <div>
              <h1>Hey I'm on the screen</h1>
              <img src='https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif' />
            </div>
          ) : (
            <h1>
              Scroll down 300px from the top of this section 👇. Also can use
              react-intersection-observer package
            </h1>
          )}
        </div>
        <div style={{ height: "100vh", backgroundColor: "yellow" }}></div>
      </div>
    </Container>
  );
}

function useOnScreen(option) {
  // State and setter for storing whether element is visible
  const [ref, setRef] = useState(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires

      setVisible(entry.isIntersecting);

      // only fire once
      if (entry.intersectionRatio > 0) observer.unobserve(ref);
    }, option);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, option]); // Empty array ensures that effect is only run on mount and unmount

  return [setRef, isVisible];
}
