import { Box, Flex, Text } from '@chakra-ui/core';
import React, { useContext } from 'react';
import Select, { OptionTypeBase, ValueType } from 'react-select';
import TeamContext from '../../contexts/TeamContext';

interface Props {
  onSelect: (values: ValueType<OptionTypeBase>) => void;
}

const FeedFilter = (props: Props) => {
  const { teams } = useContext(TeamContext);
  const teamOptions = teams.map(team => ({ label: team.shortName, value: team.id }));
  const { onSelect } = props;

  return (
    <Flex mb={4} justifyContent="flex-end" alignItems="center">
      <Text pr={2}>Filter By:</Text>

      <Box minW="250px" maxW="500px">
        <Select
          isMulti
          options={teamOptions}
          placeholder={'Select Team'}
          onChange={(items: ValueType<OptionTypeBase>) => onSelect(items)}
          styles={{
            menu: base => ({ ...base, zIndex: 1000 }),
            clearIndicator: base => ({
              ...base,
              ':hover': { cursor: 'pointer' }
            }),
            multiValueLabel: base => ({
              ...base,
              color: '#007bff',
              backgroundColor: '#e7f4ff'
            }),
            multiValueRemove: base => ({
              ...base,
              color: '#007bff',
              backgroundColor: '#e7f4ff',
              ':hover': {
                backgroundColor: '#007bff',
                color: '#e7f4ff',
                cursor: 'pointer'
              }
            })
          }}
        />
      </Box>
    </Flex>
  );
};

export default FeedFilter;
