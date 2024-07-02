import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { ProfileMenu } from "./profile-menu";
import { Select, SelectItem } from "@nextui-org/select";
import { FaBaby, FaBook, FaChair, FaLaptop, FaTshirt } from "react-icons/fa";
import { getUserAuthenticated } from "@/actions/user-actions";
import { useState } from "react";

const categories = [
  { name: 'Electronics', icon: <FaLaptop /> },
  { name: 'Furniture', icon: <FaChair /> },
  { name: 'Clothing', icon: <FaTshirt /> },
  { name: 'Books', icon: <FaBook /> },
  { name: 'Toys', icon: <FaBaby /> }
];

export const Navbar = () => {

  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarBrand>
          <p className="font-bold text-inherit">Marketplace</p>
        </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm w-96 p-2",
              
            }}
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <>
              <Select className="w-36 text-sm disabled:pointer-events-none" placeholder="All categories">
                {categories.map(category => (
                  <SelectItem key={category.name} startContent={category.icon}>{category.name}</SelectItem>
                ))}
              </Select>
              {/* <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" /> */}
              </>
            }
            // type="search"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <ThemeSwitch></ThemeSwitch>
        <ProfileMenu></ProfileMenu>
      </NavbarContent>
    </NextUINavbar>
  );
};
