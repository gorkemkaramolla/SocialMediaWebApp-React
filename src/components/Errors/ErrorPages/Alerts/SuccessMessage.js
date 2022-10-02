import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";

export default function SuccessMessage(props) {
    const { variant, message, color } = props;
    const Alert = React.forwardRef(function Alert(props, ref) {
        return (
            <MuiAlert
                color={color}
                elevation={6}
                ref={ref}
                variant={variant}
                {...props}
            />
        );
    });
    const [open, setOpen] = React.useState(true);

    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: "250px" }}>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={open}
                autoHideDuration={1700}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
