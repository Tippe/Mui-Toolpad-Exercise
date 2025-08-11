import * as React from "react";
import { Outlet, useLocation } from "react-router";
import {
    Account,
    DashboardLayout,
    PageContainer,
    ThemeSwitcher,
} from "@toolpad/core";
import CustomMenu from "./CustomMenu";
import ChatDrawer from "../components/ChatDrawer";

export default function Layout() {
    const location = useLocation();

    // List of paths where chat should NOT be shown
    const disabledPaths = ["/chat"];

    const isDisabled = disabledPaths.includes(location.pathname);

    return (
        <DashboardLayout
            slots={{
                toolbarActions: () => <ThemeSwitcher />,
                toolbarAccount: () => (
                    <Account slots={{ popoverContent: CustomMenu }} />
                ),
            }}
        >
            {!isDisabled && <ChatDrawer />}
            <PageContainer title="" breadcrumbs={[]} /* maxWidth=*/>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}
