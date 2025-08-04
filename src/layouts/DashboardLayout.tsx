import * as React from "react";
import { Outlet } from "react-router";
import { Account, DashboardLayout, PageContainer } from "@toolpad/core";
import CustomMenu from "./CustomMenu";

export default function Layout() {
    return (
        <DashboardLayout
            slots={{
                toolbarAccount: () => (
                    <Account slots={{ popoverContent: CustomMenu }} />
                ),
            }}
        >
            <PageContainer title="" breadcrumbs={[]} maxWidth={false}>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}
