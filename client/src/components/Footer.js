import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 0.2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}
      style={{
        marginTop: "160px",
        bottom: 0,
        width: "100%",
      }}
    >
      <footer className="py-3 my-4" style={{ fontSize: "22px" }}>
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          Designed By Nam, You, Lee
        </ul>
        <p className="text-center text-muted">© 2022 AI CLOSET Team</p>
      </footer>
    </Box>
  );
};
export default Footer;
