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
  const [presidents, setPresidents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (presidents.length === 0) {
    return (
      <Center mt={10}>
        <Text>No data available</Text>
      </Center>
    );
  }

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

/*
function Table() {
  const [presidents, setPresidents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/presidents')
      .then(response => response.json())
      .then(data => setPresidents(data))
      .catch(error => console.error(error));
  }, []);

  
  return (
    <div style={{ padding: '10px'}}>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>President</th>
            <th>Number</th>
            <th>Born</th>
            <th>Died</th>
            <th>Birthplace</th>
            <th>Party</th>
            <th>Term Start</th>
            <th>Term End</th>
            <th>Tenure</th>
            <th>Vice President(s)</th>
          </tr>
        </thead>
        <tbody>
          {presidents.map((item, index) => (
            <tr key={index}>
              <td>{item.President}</td>
              <td>{item.Number}</td>
              <td>{item.Born}</td>
              <td>{item.Died}</td>
              <td>{item.Birthplace}</td>
              <td>{item.Party}</td>
              <td>{item['Term Start']}</td>
              <td>{item['Term End']}</td>
              <td>{item['Tenure Length']}</td>
              <td>{item['Vice President']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
*/