import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useState } from "react";
import { getUserAuthenticated } from "@/actions/user-actions";

export const ProfileMenu = () => {
  // const [user, setUser] = useState(null);
  const user = null;

  // getUserAuthenticated().then(user => setUser(user));

  return (
  <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                // name="Jason Hughes"
                size="sm"
                // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>);
}