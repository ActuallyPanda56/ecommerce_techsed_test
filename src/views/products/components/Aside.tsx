import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Ensure to import the slider CSS

export default function Aside() {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handlePriceChange = (values: number | number[]) => {
    setPriceRange(values as number[]);
  };

  return (
    <aside className="flex flex-col border p-4 w-full md:w-64">
      <div className="text-xl font-semibold mb-4">Filtros</div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Rango de precio
        </label>
        <Slider
          range
          min={0}
          max={1000}
          step={1}
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div>
          <div className="font-semibold">Ladrillos y bloques</div>
          <ul className="list-disc pl-5 text-sm">
            <li>Ladrillo hueco</li>
            <li>Ladrillo macizo</li>
            <li>Bloques de concreto</li>
            <li>Bloques de arcilla</li>
            <li>Bloques ecológicos o térmicos</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
