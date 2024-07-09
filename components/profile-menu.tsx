import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { getUserAuthenticated } from "@/actions/user-actions";

const LoggedActions = () => {
  return <>
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
        Log Out
      </DropdownItem>
    </>;
}

export const ProfileMenu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserAuthenticated().then(user => {setUser(user)});
  }, [])

  const isLogged = () => {
    return !!user;
  }

  const menuActionsUnloggedUser = () => {
    return (<DropdownMenu aria-label="Profile Actions" variant="flat">
      <DropdownItem key="login">Login</DropdownItem>
    <DropdownItem key="signup">SignUp</DropdownItem>
    </DropdownMenu>)
  };
  const menuActionsLoggedUser = () => {
    return (<DropdownMenu aria-label="Profile Actions" variant="flat">
      <DropdownItem key="asd">dsa</DropdownItem>
    <DropdownItem key="login">321</DropdownItem>
    </DropdownMenu>)
  };

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

          {isLogged() ? (
              menuActionsLoggedUser()
             ) :
             (
              menuActionsUnloggedUser()
             )
          }
        </Dropdown>);
}