import { Typography } from "@mui/material";
import TabPanel from "../../../components/TabPanel";

interface Props {
    tab: number;
}

export default function BrainTab({ tab }: Props) {
    return (
        <TabPanel value={tab} index={2}>
            <Typography>Test 3</Typography>
        </TabPanel>
    );
}
