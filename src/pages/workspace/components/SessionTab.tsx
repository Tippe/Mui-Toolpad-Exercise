import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import TabPanel from "../../../components/TabPanel";
import React from "react";

interface Props {
    tab: number;
}

export default function SessionTab({ tab }: Props) {
    return (
        <TabPanel value={tab} index={0}>
            <List
                sx={{
                    bgcolor: "background.paper",
                }}
            >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{
                                        color: "text.primary",
                                        display: "inline",
                                    }}
                                >
                                    Ali Connors
                                </Typography>
                                {
                                    " — I'll be in your neighborhood doing errands this…"
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{
                                        color: "text.primary",
                                        display: "inline",
                                    }}
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {
                                    " — Wish I could come, but I'm out of town this…"
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cindy Baker"
                            src="/static/images/avatar/3.jpg"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{
                                        color: "text.primary",
                                        display: "inline",
                                    }}
                                >
                                    Sandra Adams
                                </Typography>
                                {
                                    " — Do you have Paris recommendations? Have you ever…"
                                }
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </TabPanel>
    );
}
