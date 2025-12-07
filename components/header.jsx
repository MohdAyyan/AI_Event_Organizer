"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { Building, Plus, Ticket } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import useStoreUserEffect from "@/hooks/use-store-user";

const Header = () => {
  // This will automatically store the user in the database when they log in
  useStoreUserEffect();

  

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/spott.png"
            alt="Spott logo"
            width={500}
            height={500}
            className="w-full h-11"
            priority
          />
        </Link>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className={"mr-2"}>
            <Link href="/explore">Explore</Link>
          </Button>
          <Authenticated>
            {/* Create Event Button */}
            <Button size="sm" asChild className="flex gap-2 mr-4">
              <Link href="/create-event">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Event</span>
              </Link>
            </Button>

            {/* User Button */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Tickets"
                  labelIcon={<Ticket size={16} />}
                  href="/my-tickets"
                />
                <UserButton.Link
                  label="My Events"
                  labelIcon={<Building size={16} />}
                  href="/my-events"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </Authenticated>

          <Unauthenticated>
            <SignInButton mode="modal">
              <Button size="sm">Sign In</Button>
            </SignInButton>
          </Unauthenticated>
        </div>
      </div>
    </nav>
  );
};

export default Header;
