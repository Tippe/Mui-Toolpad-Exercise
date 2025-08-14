import * as React from "react";
import {
    MenuItem,
    MenuList,
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
    Stack,
} from "@mui/material";
import {
    AccountPreview,
    SignOutButton,
    AccountPopoverFooter,
} from "@toolpad/core/Account";

export default function CustomMenu() {
    return (
        <Stack direction="column">
            <AccountPreview variant="expanded" />
            <Divider />
            <AccountPopoverFooter>
                <SignOutButton />
            </AccountPopoverFooter>
        </Stack>
    );
}
