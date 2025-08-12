import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";

function PresidentsTable() {
  const [presidents, setPresidents] = useState([]); // result of API call to presidents endpoint
  const [loading, setLoading] = useState(true); // boolean for if result is loading

  // Make API call
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/presidents")
      .then((response) => response.json())
      .then((data) => {
        setPresidents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Run spinner if result has not yet loaded
  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  // Display message if there is no data from API call
  if (presidents.length === 0) {
    return (
      <Center mt={10}>
        <Text>No data available</Text>
      </Center>
    );
  }

  // with additional time: make table sortable, filterable
  return (
    <TableContainer p={5}>
      <Table variant="striped" colorScheme="blue" size="sm" >
        <Thead bg="blue.600" >
          <Tr>
            <Th color="white">President</Th>
            <Th color="white">Number</Th>
            <Th color="white">Born</Th>
            <Th color="white">Died</Th>
            <Th color="white">Birthplace</Th>
            <Th color="white">Party</Th>
            <Th color="white">Term Start</Th>
            <Th color="white">Term End</Th>
            <Th color="white">Tenure</Th>
            <Th color="white">Vice President(s)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {presidents.map((item, index) => (
            <Tr key={index}>
              <Td>{item.President}</Td>
              <Td>{item.Number}</Td>
              <Td>{item.Born}</Td>
              <Td>{item.Died}</Td>
              <Td>{item.Birthplace}</Td>
              <Td>{item.Party}</Td>
              <Td>{item["Term Start"]}</Td>
              <Td>{item["Term End"]}</Td>
              <Td>{item["Tenure Length"]}</Td>
              <Td>{item["Vice President"]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PresidentsTable;