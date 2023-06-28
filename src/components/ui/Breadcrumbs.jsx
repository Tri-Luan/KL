import { Breadcrumb } from "flowbite-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import type { CustomFlowbiteTheme } from "flowbite-react";
const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, i, array) => {
      currentLink += `/${crumb}`;
      if (i === array.length - 1)
        return <Breadcrumb.Item>{crumb}</Breadcrumb.Item>;
      else
        return (
          <Breadcrumb.Item href={currentLink}>
            {crumb[0].toUpperCase() + crumb.slice(1)}
          </Breadcrumb.Item>
        );
    });
  // const customTheme: CustomFlowbiteTheme["breadcrumb"] = {
  //   root: {
  //     base: "",
  //     list: "flex items-center",
  //   },
  //   item: {
  //     base: "group flex items-center",
  //     chevron: "mx-1 h-6 w-6 text-gray-400 group-first:hidden md:mx-2",
  //     href: {
  //       off: "flex items-center text-sm font-medium text-gray-500 dark:text-gray-400",
  //       on: "flex items-center text-sm font-medium text-[#2e72e7] hover:text-[#2e72e7] dark:text-gray-400 dark:hover:text-white",
  //     },
  //     icon: "mr-2 h-4 w-4",
  //   },
  // };
  return (
    <Breadcrumb
      //  theme={customTheme}
      aria-label="Default breadcrumb example"
    >
      <Breadcrumb.Item className="" href="/" icon={HomeIcon}>
        <p>Home</p>
      </Breadcrumb.Item>
      {crumbs}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
