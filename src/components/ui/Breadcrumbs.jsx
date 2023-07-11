import { Breadcrumb } from "flowbite-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, i, array) => {
      currentLink += `/${crumb}`;
      if (i === array.length - 1)
        return (
          <Breadcrumb.Item>
            {crumb[0].toUpperCase() + crumb.slice(1)}
          </Breadcrumb.Item>
        );
      else
        return (
          <Breadcrumb.Item href={currentLink}>
            {crumb[0].toUpperCase() + crumb.slice(1)}
          </Breadcrumb.Item>
        );
    });
  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item className="" href="/" icon={HomeIcon}>
        <p>Home</p>
      </Breadcrumb.Item>
      {crumbs}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
