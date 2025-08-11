import './App.css';
import Header from './components/Header.tsx'
import Table from './components/Table.tsx'
import SearchByDate from './components/SearchByYear.tsx'
import PresidentsBarChart from './components/BarChart.tsx'

import { Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from '@chakra-ui/react';


 

function App() {
  return (
    <div >
      <Header />

      <Flex marginLeft={10} marginRight={50} marginTop={2} minWidth={1400}>
        <Tabs variant='enclosed' minWidth={1400}>
          <TabList>
            <Tab fontWeight={"bold"} fontSize={20}>All Presidents</Tab>
            <Tab fontWeight={"bold"} fontSize={20}>Search By Date</Tab>
            <Tab fontWeight={"bold"} fontSize={20}>Age at Inauguration Chart</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Table />
            </TabPanel>
            <TabPanel>
              <SearchByDate />
            </TabPanel>
            <TabPanel>
              <PresidentsBarChart/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </div>
  );
}

export default App;
