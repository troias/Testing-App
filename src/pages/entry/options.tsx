import React, { useEffect, useState } from "react";
import scoopOptions from "./scoopOptions";
import toppingOptions from "./toppingOptions";

interface Item {
  name: string;
  imagePath: string;
}

export default function Options({ optionType }: { optionType: string }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Get options from server
    try {
      fetch(`http://localhost:3030/${optionType}`)
        .then((response) => response.json())
        .then((json) => {
          setItems(json); // Assuming the response is an array
        });
    } catch (error) {
      throw error;
    }
  }, [optionType]); // Include optionType in the dependency array

  const ItemComponent = optionType === "scoops" ? scoopOptions : toppingOptions;

  const optionItems = items.map((item: { name: string; imagePath: string }) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <div>{optionItems}</div>;
}
