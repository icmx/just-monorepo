import React, { useEffect, useState } from 'react';

import { OrderDto, VehicleDto } from '@just-monorepo/types';

import { createVehiclesApi } from './api';
import { VEHICLES_API, vehicleIcons, vehicleModelNames } from './constants';
import { VehicleComponentProps, VehiclesComponentProps } from './types';

export const Vehicle = ({
  vehicle,
  isSelected,
  onChange,
}: VehicleComponentProps) => (
  <button
    type="button"
    className={`vehicle ${isSelected && 'is-selected'}`}
    onClick={() => onChange({ vehicleId: vehicle.id })}
  >
    <div className="vehicle-icon">{vehicleIcons.get(vehicle.model)}</div>
    <div className="vehicle-data">
      {vehicleModelNames.get(vehicle.model)} from{' '}
      <strong>{vehicle.price.toFixed(2)}</strong>₽
    </div>
    <div className="vehicle-data">⭐ {vehicle.rating.toFixed(1)}</div>
  </button>
);

export const Vehicles = ({ onChange, onLoading }: VehiclesComponentProps) => {
  const api = createVehiclesApi(VEHICLES_API);
  const [vehicles, setVehicles] = useState<VehicleDto[]>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number>(null);

  const findAllVehicles = () => {
    onLoading(true);

    api.findAllVehicles().then((response) => {
      setVehicles(response);
      onLoading(false);
    });
  };

  const handleChange = (change: Partial<OrderDto>) => {
    onChange(change);

    setSelectedVehicleId(change.vehicleId);
  };

  useEffect(() => findAllVehicles(), []);

  return (
    <>
      <header>
        <h1>Rent a car</h1>
        <div>
          <button type="button" value="refresh" onClick={findAllVehicles}>
            🔄
          </button>
        </div>
      </header>
      <section className="vehicles">
        {vehicles &&
          vehicles.map((vehicle) => (
            <Vehicle
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={vehicle.id === selectedVehicleId}
              onChange={handleChange}
            />
          ))}
      </section>
    </>
  );
};
