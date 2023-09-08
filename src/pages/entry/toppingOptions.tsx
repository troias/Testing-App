import React from "react";

export default function toppingOptions({
  name,
  imagePath,
}: {
  name: string;
  imagePath: string;
}) {
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
    </div>
  );
}
