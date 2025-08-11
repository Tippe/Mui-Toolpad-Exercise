import * as React from "react";
import { Outlet } from "react-router";
import {
    Account,
    DashboardLayout,
    PageContainer,
    ThemeSwitcher,
} from "@toolpad/core";
import CustomMenu from "./CustomMenu";
import ChatDrawer from "../components/ChatDrawer";

export default function Layout() {
    return (
        <DashboardLayout
            slots={{
                toolbarActions: () => <ThemeSwitcher />,
                toolbarAccount: () => (
                    <Account slots={{ popoverContent: CustomMenu }} />
                ),
            }}
        >
            <ChatDrawer />
            <PageContainer title="" breadcrumbs={[]}>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}
