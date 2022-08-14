import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        AI CLOSET
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    >
      <footer class="py-3 my-4" style={{ fontSize: "1.1vw" }}>
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          Designed By Nam, You, Lee
        </ul>
        <p class="text-center text-muted">© 2022 AI CLOSET Team</p>
      </footer>
    </Box>
  );
};
export default Footer;
