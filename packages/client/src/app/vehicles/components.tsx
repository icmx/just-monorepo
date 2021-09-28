import React, { useEffect, useState } from 'react';

import { OrderDto, VehicleDto } from '@just-monorepo/types';

import { createVehiclesApi } from './api';
import { VEHICLES_API, vehicleIcons, vehicleModelNames } from './constants';
import { VehicleComponentProps, VehiclesComponentProps } from './types';

import './styles.css';

export const Vehicle = ({
  vehicle,
  isSelected,
  onChange,
}: VehicleComponentProps): JSX.Element => (
  <button
    type="button"
    className={`vehicle ${isSelected && 'is-selected'} card flex is-column`}
    onClick={() => onChange({ vehicleId: vehicle.id })}
  >
    <div className="vehicle-icon">{vehicleIcons.get(vehicle.model)}</div>
    <div className="vehicle-data">
      {vehicleModelNames.get(vehicle.model)} from{' '}
      <strong>{vehicle.price}¤</strong>
    </div>
    <div className="vehicle-data">⭐ {vehicle.rating.toFixed(1)}</div>
  </button>
);

export const Vehicles = ({
  onChange,
  onLoading,
}: VehiclesComponentProps): JSX.Element => {
  const api = createVehiclesApi(VEHICLES_API);

  const [vehicles, setVehicles] = useState<VehicleDto[]>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number>(null);

  const findAllVehicles = () => {
    onLoading(true);

    api
      .findAllVehicles()
      .then((response) => {
        setVehicles(response);
      })
      .finally(() => onLoading(false));
  };

  const handleChange = (change: Partial<OrderDto>) => {
    onChange(change);

    setSelectedVehicleId(change.vehicleId);
  };

  useEffect(findAllVehicles, []);

  return (
    <>
      <header className="flex is-sides">
        <h1>Rent a car</h1>
        <div>
          <button
            className="button is-small"
            type="button"
            value="refresh"
            onClick={findAllVehicles}
          >
            🔄
          </button>
        </div>
      </header>
      <section className="vehicles flex">
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
