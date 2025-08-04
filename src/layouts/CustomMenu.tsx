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
import AddIcon from "@mui/icons-material/Add";

const personas = [
    {
        id: 1,
        name: "Developer",
        image: "https://avatars.githubusercontent.com/u/19550456",
    },
    {
        id: 2,
        name: "Human Resources",
        color: "#3AC513",
    },
];

export default function CustomMenu() {
    return (
        <Stack direction="column">
            <AccountPreview variant="expanded" />
            <Divider />
            <Typography variant="body2" mx={2} mt={1}>
                Persona's
            </Typography>
            <MenuList>
                {personas.map((persona) => (
                    <MenuItem
                        key={persona.id}
                        component="button"
                        sx={{
                            justifyContent: "flex-start",
                            width: "100%",
                            columnGap: 2,
                        }}
                    >
                        <ListItemIcon>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: "0.95rem",
                                    bgcolor: persona.color,
                                }}
                                src={persona.image ?? ""}
                                alt={persona.name ?? ""}
                            >
                                {persona.name[0]}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                            }}
                            primary={persona.name}
                        />
                    </MenuItem>
                ))}
                <Divider />
                <Button
                    variant="text"
                    sx={{
                        textTransform: "capitalize",
                        display: "flex",
                        mx: "auto",
                    }}
                    size="small"
                    startIcon={<AddIcon />}
                    disableElevation
                >
                    Add new
                </Button>
            </MenuList>
            <Divider />
            <AccountPopoverFooter>
                <SignOutButton />
            </AccountPopoverFooter>
        </Stack>
    );
}
