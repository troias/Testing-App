import React, { useEffect, useState } from "react";
import scoopOptions from "./scoopOptions";

interface Item {
  name: string;
  imagePath: string;
}

export default function Options({ optionType }: { optionType: string }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Get options from server
    fetch(`http://localhost:3030/${optionType}`)
      .then((response) => response.json())
      .then((json) => {
        setItems(json); // Assuming the response is an array
      });
  }, [optionType]); // Include optionType in the dependency array

  const optionItems = items.map((item: { name: string; imagePath: string }) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <div>{optionItems}</div>;
}

const ItemComponent = ({ name, imagePath }: Item) => {
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </div>
  );
};
