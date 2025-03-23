"use client";

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { SignedIn, useAuth, useClerk } from "@clerk/nextjs";

const items = [{
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
},
{
    title: "Liked Videos",
    url: "playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
},
{
    title: "PLaylists",
    url: "/playlists",
    icon: ListVideoIcon,
},
];

export const PersonalSection = () =>{
    const { isSignedIn } = useAuth();
    const clerk = useClerk();
    return(
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton 
                            tooltip={item.title}
                            asChild
                            isActive={false}//TODO: CHange to look at current pathname
                            onClick={(e) => {
                                if(!isSignedIn && item.auth){
                                    e.preventDefault();
                                    return clerk.openSignIn();
                                }}
                            }
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                <item.icon/>
                                <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}