import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import {
    AccountBalance,
    AttachMoney,
    Code,
    HeadsetMic,
    LocalShipping,
    People,
    Search,
    Send,
} from "@mui/icons-material";
import { getConnection } from "../utils/signalR";
import TabPanel from "../components/TabPanel";

export default function ChatPage() {
    const [checked] = React.useState(true);
    const [question, setQuestion] = React.useState("");
    const [selectedBrains, setSelectedBrains] = React.useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [tab, setTab] = React.useState(0);
    const [search, setSearch] = React.useState<string>("");

    const brains = [
        { label: "Dev", icon: <Code fontSize="small" /> },
        { label: "Finance", icon: <AccountBalance fontSize="small" /> },
        { label: "HR", icon: <People fontSize="small" /> },
        { label: "Logistic", icon: <LocalShipping fontSize="small" /> },
        { label: "Sales", icon: <AttachMoney fontSize="small" /> },
        { label: "Support", icon: <HeadsetMic fontSize="small" /> },
    ];

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    React.useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error(`No token given, \n ${token}`);

        getConnection("https://10.66.1.97:5101/ChatHub", token);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuestion(value);
        setShowAutocomplete(value.endsWith("@"));
    };

    const handleSelectBrain = (brainLabel: string) => {
        setSelectedBrains((prev) =>
            prev.includes(brainLabel) ? prev : [...prev, brainLabel]
        );
        setQuestion(""); // reset na selectie
        setShowAutocomplete(false);
    };

    const handleDeleteBrain = (brainLabel: string) => {
        setSelectedBrains((prev) => prev.filter((b) => b !== brainLabel));
    };

    const handleSend = () => {
        if (!question.trim() && selectedBrains.length === 0) return;
        console.log("Verstuur:", { question, selectedBrains });
        setQuestion("");
        setSelectedBrains([]);
        setShowAutocomplete(false);
    };

    const [expanded, setExpanded] = React.useState<string | false>("panel1");

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <Card sx={{ borderRadius: 4, p: 2 }}>
                    <Stack
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            color: "secondary",
                            flexGrow: 1,
                            overflow: "auto",
                            mt: { xs: 1, sm: 1, md: 0 },
                        }}
                    >
                        <Typography variant="h6" sx={{ opacity: 0.7 }}>
                            🎉 Welkom!
                            <br />
                            Stel je eerste vraag om te beginnen.
                        </Typography>
                    </Stack>

                    <Stack
                        sx={{
                            position: "sticky",
                            bottom: 0,

                            gap: 1,
                        }}
                    >
                        {showAutocomplete && (
                            <Autocomplete
                                options={brains
                                    .map((b) => b.label)
                                    .filter(
                                        (label) =>
                                            !selectedBrains.includes(label)
                                    )}
                                size="small"
                                autoHighlight
                                open
                                onChange={(e, value) => {
                                    if (value) handleSelectBrain(value);
                                }}
                                renderOption={(props, option) => {
                                    const brain = brains.find(
                                        (b) => b.label === option
                                    );
                                    return (
                                        <li {...props}>
                                            {brain?.icon}
                                            <span style={{ marginLeft: 8 }}>
                                                {option}
                                            </span>
                                        </li>
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Selecteer een Brain"
                                    />
                                )}
                            />
                        )}

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                            }}
                        >
                            {selectedBrains.map((brain) => {
                                const brainData = brains.find(
                                    (b) => b.label === brain
                                );
                                return (
                                    <Chip
                                        key={brain}
                                        label={brain}
                                        icon={brainData?.icon}
                                        onDelete={() =>
                                            handleDeleteBrain(brain)
                                        }
                                    />
                                );
                            })}
                        </Box>

                        <Stack direction="row">
                            <TextField
                                size="small"
                                multiline
                                maxRows={5}
                                placeholder="Wat wil je vragen?"
                                value={question}
                                onChange={handleInputChange}
                                sx={{ ml: 1, flex: 1 }}
                            />
                            <Divider
                                orientation="vertical"
                                sx={{ height: 28, mr: 1 }}
                            />
                            <IconButton
                                aria-label="Send"
                                onClick={handleSend}
                                color="primary"
                                sx={{ p: 1 }}
                            >
                                <Send />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
            <Grid size={4}>
                <Card sx={{ borderRadius: 4 }}>
                    <Tabs
                        value={tab}
                        onChange={(_, newValue) => setTab(newValue)}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Chats" />
                        <Tab label="Actions" />
                        <Tab label="Brains" />
                    </Tabs>

                    <Stack direction="row" sx={{ my: 2, gap: 1 }}>
                        <TextField
                            placeholder="Zoek een Action"
                            size="small"
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton color="primary">
                            <Search />
                        </IconButton>
                    </Stack>
                    <CardContent>
                        <TabPanel value={tab} index={0}>
                            <List
                                sx={{
                                    width: "100%",
                                    maxWidth: 360,
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
                        <TabPanel value={tab} index={1}>
                            <Accordion
                                expanded={expanded === "panel1"}
                                onChange={handleChange("panel1")}
                            >
                                <AccordionSummary
                                    aria-controls="panel1d-content"
                                    id="panel1d-header"
                                >
                                    <Typography component="span">
                                        Text Generators
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                Action 1
                                            </ListItemText>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText>
                                                Action 2
                                            </ListItemText>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText>
                                                Action 3
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expanded === "panel2"}
                                onChange={handleChange("panel2")}
                            >
                                <AccordionSummary
                                    aria-controls="panel2d-content"
                                    id="panel2d-header"
                                >
                                    <Typography component="span">
                                        Analyse
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                Action 4
                                            </ListItemText>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText>
                                                Action 5
                                            </ListItemText>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText>
                                                Action 6
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expanded === "panel3"}
                                onChange={handleChange("panel3")}
                            >
                                <AccordionSummary
                                    aria-controls="panel3d-content"
                                    id="panel3d-header"
                                >
                                    <Typography component="span">
                                        Creatief
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText>
                                                Action 7
                                            </ListItemText>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText>
                                                Action 8
                                            </ListItemText>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText>
                                                Action 9
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            <Typography>Test 3</Typography>
                        </TabPanel>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
