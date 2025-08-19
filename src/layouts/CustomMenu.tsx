import * as React from "react";
import { Divider, Stack } from "@mui/material";
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
