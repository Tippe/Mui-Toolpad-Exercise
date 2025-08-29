import { Box } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <>
            {value === index && (
                <Box
                    role="tabpanel"
                    hidden={value !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                    {...other}
                    sx={{
                        pt: 2,
                        //backgroundColor: "background.default",
                        height: "100%",
                        flexGrow: 1,
                        overflowY: "auto",
                        display: value === index ? "block" : "none",
                    }}
                >
                    {children}
                </Box>
            )}
        </>
    );
}
