import React from "react";
import Container from "./components/Container";

const SORT_ARRAY = [1, 4, 6, 8, 9, 12, 15, 18];

export default function BinarySearch() {
  const [number, setNumber] = React.useState();
  const [countBinarySearch, setCountBinarySearch] = React.useState(0);
  const [countLinearSearch, setCountLinearSearch] = React.useState(0);

  const onChangeNumber = (e) => {
    const value = parseInt(e.target.value);
    setNumber(value);

    binarySearch(value);
    linearSearch(value);
  };

  const binarySearch = (target) => {
    let loopCount = 0;
    let lower = 0;
    let upper = SORT_ARRAY.length - 1;
    while (lower <= upper) {
      loopCount += 1;
      const middle = lower + Math.floor((upper - lower) / 2);

      if (target === SORT_ARRAY[middle]) {
        setCountBinarySearch(loopCount);
        return middle;
      }

      if (target < SORT_ARRAY[middle]) {
        upper = middle - 1;
      } else {
        lower = middle + 1;
      }
    }
    return -1;
  };

  const linearSearch = (target) => {
    let count = 0;
    for (let i = 0; i < SORT_ARRAY.length - 1; i++) {
      count += 1;
      if (SORT_ARRAY[i] == target) break;
    }
    setCountLinearSearch(count);
  };

  const SORT_STR = SORT_ARRAY.join(",");

  return (
    <Container>
      <div>
        <ol type='1'>
          <li>需要sorted先</li>
          <li>找lower value (從哪個index開始)， default 是0</li>
          <li>找upper value (最大的index)</li>
          <li>在每個循環中 找出middle value</li>
          <li>
            第一個condition就是 如果剛好中間值是你要的value，那就直接 代表找到了
            就return
          </li>
          <li>
            如果 你要的值是小過 middle的， 那就是說不是右變，所以你的 upper
            會變成 middle - 1
          </li>
          <li>反之，如果你的值在 右邊， 那就是 lower = middle + 1</li>
        </ol>
      </div>
      <br />
      <hr />
      <br />
      <div>Sorted array: [{SORT_STR}]</div>
      <input
        placeholder='Please enter number'
        value={number || ""}
        onChange={onChangeNumber}
      />
      <p>Array length: {SORT_ARRAY.length}</p>
      <p>Binary search loop count: {countBinarySearch}</p>
      <p>Linear search loop count: {countLinearSearch}</p>
    </Container>
  );
}
