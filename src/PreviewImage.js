import { useRef, useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "./components/Container";

const useStyles = makeStyles({
  preview: {
    height: "350px",
    display: ({ preview }) => (preview ? "block" : "none"),
  },
  input: {
    display: "none",
  },
  button: {
    display: "inline-block",
    border: "2px solid black",
    padding: "10px 20px",
    cursor: "pointer",
  },
});

export default function PreviewImage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const classes = useStyles({ preview });
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      // onloadend is a callback after image fully load when readAsDataURL is finished
      reader.onloadend = () => {
        setPreview(reader.result); // base64 format image
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const onClickButton = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const onInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") setImage(file);
    else setImage(null);
  };

  return (
    <Container>
      <form>
        <Box onClick={onClickButton} className={classes.button}>
          Button
        </Box>
        <input
          onChange={onInputChange}
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className={classes.input}
        />
        <div className={classes.preview}>
          <img src={preview} height='100%' alt='preview' />
        </div>
      </form>
    </Container>
  );
}
