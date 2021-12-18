import { Search } from '@mui/icons-material';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { City, ListParams } from 'models';
import React, { ChangeEvent } from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (e: SelectChangeEvent<any>) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };

    onChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search By Name"
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              endAdornment={<Search />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" size="small">
            <InputLabel id="filterByCity">Filter By City</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter By City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
